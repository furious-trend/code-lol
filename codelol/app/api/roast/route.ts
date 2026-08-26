import { NextResponse } from 'next/server';
import { getRandomFallback } from '@/lib/fallbackRoasts';
import { checkRateLimit } from '@/lib/rateLimit';

export async function POST(request: Request) {
  try {
    const { code, output, isSuccess } = await request.json();

    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    const rateLimit = checkRateLimit(ip);
    if (!rateLimit.success) {
      return NextResponse.json({ error: rateLimit.error }, { status: 429 });
    }

    if (!code) {
      return NextResponse.json({ error: 'Code is required' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Gemini API Key is not configured. Add GEMINI_API_KEY to your environment.' }, { status: 500 });
    }

    let prompt = '';
    if (isSuccess) {
      prompt = `You are a hilarious, over-the-top comedy mentor. The user just successfully ran or solved this code!
1. CRITICAL RULE: Keep the 'roast' field strictly as an empty string ("").
2. Keep the 'fix' field strictly as an empty string ("") since there are no errors.
3. Provide a 'gifKeyword' that specifically searches for a happy funny excited meme gif (e.g. 'excited meme', 'happy meme').
4. At the end, output one word only on a new line labeled 'MOOD:' summarizing the vibe — must be exactly one of: party, genius, happy.

Format the response strictly as a JSON object with this exact shape:
{
  "roast": "",
  "fix": "",
  "mood": "the single word mood from the list above",
  "gifKeyword": "the search term for the GIF"
}`;
    } else {
      prompt = `You are a witty, ruthless coding mentor. Look at this code and the execution error. You MUST find the actual bug or issue causing the error.

Respond in this exact format:
ROAST: [ONE short punchy sentence, under 20 words, comparing the SPECIFIC bug/error to a simple everyday annoyance. Be brutal, funny, and accurate to the error.]
FIX: [the corrected code]
MOOD: [one word: facepalm, mind_blown, dead, screaming, crying_laughing, done, disaster, or relief]

Example of GOOD roasts (Specific to the error):
- Error: ReferenceError: consol is not defined
  Roast: 'consol.log? Did you mean console, or are you trying to invent a new JavaScript framework?'
- Error: SyntaxError: Unexpected token ')'
  Roast: 'An unexpected parenthesis—it's like adding a closing bracket to a hug nobody asked for.'
- Error: TypeError: Cannot read properties of undefined
  Roast: 'Reading properties of undefined is like asking a ghost for their phone number.'
- Error: missing variable declaration
  Roast: 'Using a variable without declaring it first? Who do you think you are, JavaScript in 1995?'

Example of BAD roasts (Too generic, do NOT do this):
- 'Your code is broken like a cracked screen.' (Doesn't mention the actual error)
- 'You forgot to compile your code.' (Generic and often wrong)
- 'Please check your syntax.' (Boring)

The roast must strictly relate to the specific error seen in the Execution Output. It must be ONE sentence, under 20 words.`;
    }

    prompt += `
Code to review:
\`\`\`
${code}
\`\`\`
Execution Output:
\`\`\`
${output || 'None'}
\`\`\``;

    let text = "";
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2500);

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt }]
          }],
          generationConfig: {
            temperature: 0.8,
            maxOutputTokens: 500,
            ...(isSuccess ? { responseMimeType: "application/json" } : {})
          }
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        console.warn(`Gemini API error: ${response.status}. Using fallback roast.`);
        return NextResponse.json(getRandomFallback(isSuccess));
      }

      const result = await response.json();
      text = result.candidates[0].content.parts[0].text.trim();
    } catch (apiError) {
      console.warn('Gemini API fetch failed or timed out. Using fallback roast.', apiError);
      return NextResponse.json(getRandomFallback(isSuccess));
    }

    let parsedResponse;
    
    if (isSuccess) {
      // Strip markdown formatting if the model included it
      let jsonText = text;
      if (jsonText.startsWith('```json')) {
        jsonText = jsonText.replace(/^```json\n/, '').replace(/\n```$/, '');
      } else if (jsonText.startsWith('```')) {
        jsonText = jsonText.replace(/^```\n/, '').replace(/\n```$/, '');
      }
      try {
        parsedResponse = JSON.parse(jsonText);
      } catch {
        console.error('Failed to parse success JSON response:', jsonText);
        return NextResponse.json(getRandomFallback(isSuccess));
      }
    } else {
      // Parse the custom text format
      const roastMatch = text.match(/ROAST:\s*([\s\S]*?)(?=\nFIX:|$)/i);
      const fixMatch = text.match(/FIX:\s*([\s\S]*?)(?=\nMOOD:|$)/i);
      const moodMatch = text.match(/MOOD:\s*([\s\S]*?)(?=\n|$)/i);
      let parsedMood = moodMatch ? moodMatch[1].trim().toLowerCase() : "facepalm";
      
      const allowedMoods = ['facepalm', 'mind_blown', 'dead', 'screaming', 'crying_laughing', 'done', 'disaster', 'relief'];
      if (!allowedMoods.includes(parsedMood)) {
        parsedMood = 'facepalm'; // fallback
      }

      parsedResponse = {
        roast: roastMatch ? roastMatch[1].trim().replace(/^ROAST:\s*/i, '') : text.trim().replace(/^ROAST:\s*/i, ''),
        fix: fixMatch ? fixMatch[1].trim().replace(/^FIX:\s*/i, '') : "",
        mood: parsedMood,
        gifKeyword: ""
      };
    }

    return NextResponse.json(parsedResponse);
  } catch (error) {
    console.error('Error roasting code:', error);
    // If the top-level handler fails, at least return a valid roast shape.
    const fallback = {
      roast: "Something went completely wrong, but honestly your code probably did too.",
      fix: "",
      mood: "dead",
      gifKeyword: "explosion"
    };
    return NextResponse.json(fallback);
  }
}
