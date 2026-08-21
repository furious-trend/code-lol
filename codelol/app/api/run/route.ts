import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // We only support in-browser execution now.
  return NextResponse.json(
    { error: 'External execution is disabled. Use in-browser execution.' },
    { status: 400 }
  );
}
