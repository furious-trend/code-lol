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
    const res = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&tag=${encodeURIComponent(keyword)}&rating=pg-13`);
    const data = await res.json();

    if (data.data && data.data.images && data.data.images.downsized_large) {
      return NextResponse.json({ url: data.data.images.downsized_large.url });
    }

    return NextResponse.json({ error: 'No GIF found' }, { status: 404 });
  } catch (error) {
    console.error('Error fetching GIF:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
