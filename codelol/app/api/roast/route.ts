import { NextResponse } from 'next/server';
import { getRandomFallback } from '@/lib/fallbackRoasts';
import { checkRateLimit } from '@/lib/rateLimit';

export async function POST(request: Request) {
  try {
    const { code, output, isSuccess, humorPref = 'general' } = await request.json();
    console.log("RECEIVED HUMOR PREF:", humorPref);

    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    const rateLimit = checkRateLimit(ip);
    if (!rateLimit.success) {
      return NextResponse.json({ error: rateLimit.error }, { status: 429 });
    }

    if (!code) {
      return NextResponse.json({ error: 'Code is required' }, { status: 400 });
    }

    // Always use fallback roasts as requested by the user
    return NextResponse.json(getRandomFallback(isSuccess, humorPref));
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
