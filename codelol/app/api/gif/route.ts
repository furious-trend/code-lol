import { NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/rateLimit';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get('keyword');

  const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
  const rateLimit = checkRateLimit(ip);
  if (!rateLimit.success) {
    return NextResponse.json({ error: rateLimit.error }, { status: 429 });
  }

  if (!keyword) {
    return NextResponse.json({ error: 'Keyword is required' }, { status: 400 });
  }

  const apiKey = process.env.GIPHY_API_KEY;
  if (!apiKey || apiKey === 'your-giphy-api-key-here') {
    return NextResponse.json({ error: 'GIPHY API Key is not configured.' }, { status: 500 });
  }

  try {
    const TAMIL_BIAS_RATIO = 0.5;
    const isTamilSearch = Math.random() < TAMIL_BIAS_RATIO;
    const searchQuery = isTamilSearch ? 'tamil ' + keyword : keyword;
    
    const res = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(searchQuery)}&limit=15&rating=g`);
    const data = await res.json();

    if (data.data && data.data.length > 0) {
      const randomGif = data.data[Math.floor(Math.random() * data.data.length)];
      if (randomGif.images && randomGif.images.downsized_large) {
        return NextResponse.json({ url: randomGif.images.downsized_large.url });
      }
    }

    // Fallback if the specific search fails: just search a general funny reaction
    const fallbackRes = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=funny%20reaction&limit=20&rating=g`);
    const fallbackData = await fallbackRes.json();
    if (fallbackData.data && fallbackData.data.length > 0) {
       const randomFallback = fallbackData.data[Math.floor(Math.random() * fallbackData.data.length)];
       return NextResponse.json({ url: randomFallback.images.downsized_large.url });
    }

    return NextResponse.json({ error: 'No GIF found' }, { status: 404 });
  } catch (error) {
    console.error('Error fetching GIF:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
