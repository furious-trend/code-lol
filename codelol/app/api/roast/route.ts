import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(request: Request) {
  try {
    const { code } = await request.json();

    if (!code) {
      return NextResponse.json({ error: 'Code is required' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'your-gemini-api-key-here') {
      return NextResponse.json({ error: 'Gemini API Key is not configured. Get one at https://aistudio.google.com' }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-3.6-flash' });

    const prompt = `You are a hilarious, savage-but-supportive coding mentor who roasts bugs like a stand-up comedian. Look at this code and:
1. Identify the bug or issue.
2. Roast it in 1-2 short, punchy sentences — use exaggeration, sarcasm, or a funny comparison (e.g. comparing the bug to everyday chaos, relatable frustrations, or dramatic overreactions). Keep it PG, never mean-spirited toward the person, only the bug.
3. Immediately follow the roast with the actual fix, clearly labeled 'THE FIX:' with corrected code.
4. At the end, output one word only on a new line labeled 'MOOD:' summarizing the vibe — must be exactly one of: facepalm, mind_blown, dead, screaming, crying_laughing, done, disaster, relief.

Format the response strictly as a JSON object with this exact shape:
{
  "roast": "the 1-2 sentence funny roast",
  "fix": "the code fix string",
  "mood": "the single word mood from the list above"
}

Code to review:
\`\`\`
${code}
\`\`\``;

    let text = "";
    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      text = response.text().trim();
    } catch (apiError) {
      if (apiError instanceof Error && (apiError.message.includes('429 Too Many Requests') || apiError.message.includes('Quota exceeded'))) {
        console.warn('Gemini API quota exceeded. Returning fallback roast.');
        return NextResponse.json({
          roast: "My roasting circuits are overheated from too many requests! Give me a minute to cool down before I judge your code again.",
          fix: code,
          mood: "dead"
        });
      }
      throw apiError;
    }

    // Strip markdown formatting if Gemini included it
    let jsonText = text;
    if (jsonText.startsWith('\`\`\`json')) {
      jsonText = jsonText.replace(/^\`\`\`json\n/, '').replace(/\n\`\`\`$/, '');
    } else if (jsonText.startsWith('\`\`\`')) {
      jsonText = jsonText.replace(/^\`\`\`\n/, '').replace(/\n\`\`\`$/, '');
    }

    let parsedResponse;
    try {
      parsedResponse = JSON.parse(jsonText);
    } catch {
      console.error('Failed to parse Gemini roast response:', jsonText);
      return NextResponse.json({ 
        error: 'Failed to process roast response. The engine returned invalid JSON.'
      }, { status: 500 });
    }

    return NextResponse.json(parsedResponse);
  } catch (error) {
    console.error('Error roasting code:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed to roast code' }, { status: 500 });
  }
}
