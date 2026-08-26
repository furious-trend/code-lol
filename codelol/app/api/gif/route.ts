import { NextResponse } from 'next/server';
import manifest from '@/lib/gifManifest.json';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mood = searchParams.get('mood'); // 'right' | 'wrong'
  const preference = searchParams.get('preference'); // 'general' | 'tamil'

  if (!mood || !preference) {
    return NextResponse.json({ error: 'mood and preference required' }, { status: 400 });
  }

  try {
    const category = manifest[preference as keyof typeof manifest];
    if (!category) throw new Error("Invalid preference");
    
    const gifs = category[mood as keyof typeof category];
    if (!gifs || gifs.length === 0) {
      // Fallback if local gifs don't exist
      return NextResponse.json({ url: '/default-meme.gif' });
    }

    const randomGif = gifs[Math.floor(Math.random() * gifs.length)];
    return NextResponse.json({ url: randomGif });
  } catch (error) {
    console.error('Error in GIF API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
