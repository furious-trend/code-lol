import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(request: Request) {
  try {
    const { code, output, isSuccess } = await request.json();

    if (!code) {
      return NextResponse.json({ error: 'Code is required' }, { status: 400 });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Groq API Key is not configured. Add GROQ_API_KEY to your environment.' }, { status: 500 });
    }

    let prompt = '';
    if (isSuccess) {
      prompt = `You are a hilarious, over-the-top Tamil comedy mentor. The user just successfully ran or solved this code!
1. CRITICAL RULE: Keep the 'roast' field strictly as an empty string (""). No dialogue at all!
2. Keep the 'fix' field strictly as an empty string ("").
3. Provide a 'gifKeyword' that specifically searches for a happy funny excited meme gif (e.g. 'vadivelu excited meme', 'santhanam happy meme').
4. At the end, output one word only on a new line labeled 'MOOD:' summarizing the vibe — must be exactly one of: party, genius, happy.

Format the response strictly as a JSON object with this exact shape:
{
  "roast": "",
  "fix": "",
  "mood": "the single word mood from the list above",
  "gifKeyword": "the search term for the GIF"
}`;
    } else {
      prompt = `You are an absolutely savage, relentless, and hilariously unhinged Tamil comedy mentor who violently roasts bugs. Look at this code and its error output and:
1. Identify the bug or issue based on the output/code.
2. CRITICAL RULE: Keep the 'roast' field strictly as an empty string (""). No dialogue at all!
3. Explain the mistake clearly and provide the corrected code in the 'fix' field.
4. STRICT RULE: Keep it 100% clean, family-friendly, and PG! No adult jokes, no bad words. Roast the CODE, not the person in a mean way.
5. Provide a 'gifKeyword' that specifically searches for a famous funny sad gif (e.g. 'vadivelu crying funny', 'goundamani sad meme').
6. At the end, output one word only on a new line labeled 'MOOD:' summarizing the vibe — must be exactly one of: facepalm, mind_blown, dead, screaming, crying_laughing, done, disaster, relief.

Format the response strictly as a JSON object with this exact shape:
{
  "roast": "",
  "fix": "Explanation of the mistake followed by the corrected code",
  "mood": "the single word mood from the list above",
  "gifKeyword": "the search term for the GIF"
}`;
    }

    prompt += `
Code to review:
\`\`\`
${code}
\`\`\`
Execution Output:
\`\`\`
${output || 'None'}
\`\`\`

(IMPORTANT: Make this roast 100% unique! Do not repeat standard jokes. Pick a random, obscure, or different Tamil comedy reference! Random seed to force uniqueness: ${Math.random()})`;

    let text = "";
    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            { role: "user", content: prompt }
          ],
          max_tokens: 500,
          temperature: 0.8,
          response_format: { type: "json_object" }
        })
      });

      if (!response.ok) {
        if (response.status === 429 || response.status === 503) {
          console.warn('Groq API quota exceeded or overloaded. Returning fallback roast.');
          return NextResponse.json({
            roast: "Aiyo, the roasting servers are overloaded with too many requests! Give me a minute to cool down before I judge your code again.",
            fix: code,
            mood: "dead"
          });
        }
        const errorBody = await response.text();
        console.error("Groq Error Response:", errorBody);
        throw new Error(`Groq API error: ${response.status} ${response.statusText} - ${errorBody}`);
      }

      const result = await response.json();
      text = result.choices[0].message.content.trim();
    } catch (apiError) {
      if (apiError instanceof Error && (apiError.message.includes('429') || apiError.message.includes('Quota') || apiError.message.includes('503'))) {
        console.warn('Groq API quota exceeded or overloaded. Returning fallback roast.');
        return NextResponse.json({
          roast: "Aiyo, the roasting servers are overloaded with too many requests! Give me a minute to cool down before I judge your code again.",
          fix: code,
          mood: "dead"
        });
      }
      throw apiError;
    }

    // Strip markdown formatting if the model included it
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

    // Forcefully remove the dialogue from the response
    parsedResponse.roast = "";

    return NextResponse.json(parsedResponse);
  } catch (error) {
    console.error('Error roasting code:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed to roast code' }, { status: 500 });
  }
}
