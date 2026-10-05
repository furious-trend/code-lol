import { NextResponse } from 'next/server';
import { analyzeComplexity } from '@/lib/complexityAnalyzer';

export async function POST(req: Request) {
  try {
    const { code, language = 'javascript' } = await req.json();
    
    if (!code) {
      return NextResponse.json({ error: 'Code is required' }, { status: 400 });
    }
    
    const result = analyzeComplexity(code, language);
    return NextResponse.json(result);
  } catch (error) {
    console.error('API /analyze-complexity error:', error);
    return NextResponse.json({ 
      timeComplexity: "O(?)",
      spaceComplexity: "O(?)"
    }, { status: 500 });
  }
}
