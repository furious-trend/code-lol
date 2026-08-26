import os

new_content = """import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { code, output, isSuccess } = await request.json();

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
      prompt = `You are a witty coding mentor. Look at this code and find the bug or issue.

Respond in this exact format:
ROAST: [ONE short punchy sentence, under 20 words, comparing the bug to a simple everyday annoyance — no cartoon characters, no invented stories, no multi-part metaphors. Just one clear, instantly funny line.]
FIX: [the corrected code]
MOOD: [one word: facepalm, mind_blown, dead, screaming, crying_laughing, done, disaster, or relief]

Example of GOOD roast: 'Forgot a semicolon — classic case of ordering food and forgetting to pay.'
Example of BAD roast (too long/confusing, do not do this): 'You're baking a cake without flour, you know, like when Cookie Monster made a mess in that one episode...'`;
    }

    prompt += `\nCode to review:\n\`\`\`\n${code}\n\`\`\`\nExecution Output:\n\`\`\`\n${output || 'None'}\n\`\`\``;

    let text = "";
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
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
            maxOutputTokens: 500
          }
        })
      });

      if (!response.ok) {
        if (response.status === 429 || response.status === 503) {
          console.warn('Gemini API quota exceeded or overloaded. Returning fallback roast.');
          return NextResponse.json({
            roast: "Aiyo, the roasting servers are overloaded with too many requests! Give me a minute to cool down before I judge your code again.",
            fix: code,
            mood: "dead"
          });
        }
        const errorBody = await response.text();
        console.error("Gemini Error Response:", errorBody);
        throw new Error(`Gemini API error: ${response.status} ${response.statusText} - ${errorBody}`);
      }

      const result = await response.json();
      text = result.candidates[0].content.parts[0].text.trim();
    } catch (apiError) {
      if (apiError instanceof Error && (apiError.message.includes('429') || apiError.message.includes('Quota') || apiError.message.includes('503'))) {
        console.warn('Gemini API quota exceeded or overloaded. Returning fallback roast.');
        return NextResponse.json({
          roast: "Aiyo, the roasting servers are overloaded with too many requests! Give me a minute to cool down before I judge your code again.",
          fix: code,
          mood: "dead"
        });
      }
      throw apiError;
    }

    let parsedResponse;
    
    if (isSuccess) {
      // Strip markdown formatting if the model included it
      let jsonText = text;
      if (jsonText.startsWith('```json')) {
        jsonText = jsonText.replace(/^```json\\n/, '').replace(/\\n```$/, '');
      } else if (jsonText.startsWith('```')) {
        jsonText = jsonText.replace(/^```\\n/, '').replace(/\\n```$/, '');
      }
      try {
        parsedResponse = JSON.parse(jsonText);
      } catch {
        console.error('Failed to parse success JSON response:', jsonText);
        return NextResponse.json({ 
          error: 'Failed to process success response.'
        }, { status: 500 });
      }
    } else {
      // Parse the custom text format
      const roastMatch = text.match(/ROAST:\s*([\s\S]*?)(?=\\nFIX:|$)/i);
      const fixMatch = text.match(/FIX:\s*([\s\S]*?)(?=\\nMOOD:|$)/i);
      const moodMatch = text.match(/MOOD:\s*([\s\S]*?)(?=\\n|$)/i);
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
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed to roast code' }, { status: 500 });
  }
}
"""

with open("app/api/roast/route.ts", "w") as f:
    f.write(new_content)
print("updated route.ts")
