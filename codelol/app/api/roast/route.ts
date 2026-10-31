// agent-notes: { ctx: "API route providing language-specific bug roasts and engineering applause", deps: ["@/lib/fallbackRoasts", "@/lib/rateLimit"], state: active, last: "sato@2026-10-31" }

import { NextResponse } from 'next/server';
import { getRandomFallback, SupportedLanguage } from '@/lib/fallbackRoasts';
import { checkRateLimit } from '@/lib/rateLimit';

export async function POST(request: Request) {
  try {
    const { code, output, isSuccess, humorPref = 'general', language } = await request.json();
    console.log("RECEIVED HUMOR PREF:", humorPref, "LANGUAGE:", language);

    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    const rateLimit = checkRateLimit(ip);
    if (!rateLimit.success) {
      return NextResponse.json({ error: rateLimit.error }, { status: 429 });
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
