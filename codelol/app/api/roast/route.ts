// agent-notes: { ctx: "API route providing language-specific bug roasts with auth and guest rate limiting", deps: ["@/lib/fallbackRoasts", "@/lib/rateLimit", "@/lib/supabase/server"], state: "active", last: "sato@2026-11-26" }

import { NextResponse } from 'next/server';
import { getRandomFallback, SupportedLanguage } from '@/lib/fallbackRoasts';
import { checkRateLimit, checkGuestRateLimit } from '@/lib/rateLimit';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const { code, output, isSuccess, humorPref = 'general', language } = await request.json();
    console.log("RECEIVED HUMOR PREF:", humorPref, "LANGUAGE:", language);

    const supabase = await createClient();
    const hasAuth = typeof (supabase as any)?.auth?.getUser === 'function';
    let user: { id: string } | null = null;
    if (hasAuth) {
      const { data } = await supabase.auth.getUser();
      user = data?.user ?? null;
    }

    if (!hasAuth || user) {
      const rateLimit = await checkRateLimit(supabase, '/api/roast', 10, 60);
      if (!rateLimit.success) {
        return NextResponse.json({ error: rateLimit.error }, { status: 429 });
      }
    } else {
      const forwardedFor = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
      const guestIp = forwardedFor || request.headers.get('x-real-ip') || 'anonymous-guest';
      const guestLimit = checkGuestRateLimit(`roast:${guestIp}`, 20, 60_000);
      if (!guestLimit.allowed) {
        return NextResponse.json({ error: guestLimit.error }, { status: 429 });
      }
    }

    if (!code) {
      return NextResponse.json({ error: 'Code is required' }, { status: 400 });
    }

    // Return language-specific technical roast or engineering applause
    return NextResponse.json(
      getRandomFallback(isSuccess, humorPref, undefined, language as SupportedLanguage, output)
    );
  } catch (error) {
    console.error('Error roasting code:', error);
    const fallback = {
      roast: "Something went completely wrong, but honestly your code probably did too.",
      fix: "",
      mood: "dead",
      gifKeyword: "explosion"
    };
    return NextResponse.json(fallback);
  }
}
