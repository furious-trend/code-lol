import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get('keyword');

  if (!keyword) {
    return NextResponse.json({ error: 'Keyword is required' }, { status: 400 });
  }

  const apiKey = process.env.GIPHY_API_KEY;
  if (!apiKey || apiKey === 'your-giphy-api-key-here') {
    return NextResponse.json({ error: 'GIPHY API Key is not configured.' }, { status: 500 });
  }

  try {
    const searchQuery = 'tamil ' + keyword;
    const res = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(searchQuery)}&limit=15&rating=g`);
    const data = await res.json();

    if (data.data && data.data.length > 0) {
      const randomGif = data.data[Math.floor(Math.random() * data.data.length)];
      if (randomGif.images && randomGif.images.downsized_large) {
        return NextResponse.json({ url: randomGif.images.downsized_large.url });
      }
    }

    // Fallback if the specific search fails: just search 'tamil comedy'
    const fallbackRes = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=tamil%20comedy&limit=20&rating=g`);
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
