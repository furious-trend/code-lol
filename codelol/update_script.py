import os

new_content = """import { Project, SyntaxKind, ObjectLiteralExpression } from "ts-morph";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("Gemini API Key is not configured. Add GEMINI_API_KEY to your environment.");
  process.exit(1);
}

const project = new Project();
project.addSourceFilesAtPaths("lib/lessons/*.ts");

const styleGuide = `Style guide:
1. MAXIMUM 20 words, MINIMUM 10 words for the joke — no exceptions.
2. PUNCHLINE REQUIRED: The joke must set up a relatable comparison AND land on a specific funny detail or twist — not just state the comparison flatly.
3. The joke must directly reference the ACTUAL concept — no random unrelated pop culture characters, no invented scenarios, no multi-step stories.
4. Use ONE simple, universally-understood comparison per joke — not layered metaphors.
5. Ban vague/obscure references entirely — stick to everyday, instantly-recognizable things: food, WiFi, phone notifications, exams, traffic, common daily annoyances.

Examples of BAD (flat comparison):
- "Constants are like your WiFi password." (No punchline)
- "Variables are like WiFi signals - they fluctuate." (Flat)
- "Class is menu, instance is meal." (No humor)

Examples of GOOD (punchline/twist):
- "Constants are like your WiFi password—you set it once and then you're stuck with it forever." (Has twist)
- "A loop is like refreshing a delivery app—you keep doing it hoping your food arrives faster, but it never does." (Has punchline)
- "An array is like your family WhatsApp group—everyone is in a specific order and you can't easily escape." (Has punchline)

Keep gifKeyword fields aligned with this tone — trending reaction GIF searches like "this is fine fire", "screaming internally", "why is this happening", "delulu", "mind blown" etc.`;

async function generateNewFields(topic: string, currentExplanation: string, currentKeyword: string) {
  const prompt = `${styleGuide}

Topic: ${topic}
Current Explanation: ${currentExplanation}
Current Keyword: ${currentKeyword}

Generate a new funnyExplanation and gifKeyword for this topic following the style guide. Respond with ONLY valid JSON and no markdown formatting or other text.
Format:
{
  "funnyExplanation": "...",
  "gifKeyword": "..."
}`;

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
        temperature: 0.7,
        responseMimeType: "application/json"
      }
    })
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Gemini API error: ${response.status} - ${errorBody}`);
  }

  const data = await response.json();
  const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;
  
  if (!responseText) throw new Error("No response text");

  return JSON.parse(responseText);
}

async function run() {
  const sourceFiles = project.getSourceFiles();

  for (const sourceFile of sourceFiles) {
    if (sourceFile.getBaseName() === 'index.ts' || sourceFile.getBaseName() === 'types.ts') {
      continue;
    }
    console.log(`Processing ${sourceFile.getBaseName()}...`);

    const varDecls = sourceFile.getVariableDeclarations();

    for (const varDecl of varDecls) {
      const initializer = varDecl.getInitializerIfKind(SyntaxKind.ArrayLiteralExpression);

      if (initializer) {
        const elements = initializer.getElements();

        for (const element of elements) {
          if (element.getKind() === SyntaxKind.ObjectLiteralExpression) {
            const obj = element as ObjectLiteralExpression;
            const titleProp = obj.getProperty("title")?.asKind(SyntaxKind.PropertyAssignment);
            const funnyExplanationProp = obj.getProperty("funnyExplanation")?.asKind(SyntaxKind.PropertyAssignment);
            const gifKeywordProp = obj.getProperty("gifKeyword")?.asKind(SyntaxKind.PropertyAssignment);

            if (titleProp && funnyExplanationProp && gifKeywordProp) {
              const title = titleProp.getInitializer()?.getText().replace(/^['"`]|['"`]$/g, '') || "";
              const currentExplanation = funnyExplanationProp.getInitializer()?.getText().replace(/^['"`]|['"`]$/g, '') || "";
              const currentKeyword = gifKeywordProp.getInitializer()?.getText().replace(/^['"`]|['"`]$/g, '') || "";

              console.log(`  Generating for: ${title}`);
              const wordCount = currentExplanation.split(/\s+/).length;
              if (wordCount >= 11) {
                console.log(`    Skipping: already ${wordCount} words (${currentExplanation})`);
                continue;
              }
              console.log(`    Needs regeneration! Current: ${currentExplanation}`);

              try {
                const { funnyExplanation, gifKeyword } = await generateNewFields(title, currentExplanation, currentKeyword);
                
                funnyExplanationProp.setInitializer(JSON.stringify(funnyExplanation));
                gifKeywordProp.setInitializer(JSON.stringify(gifKeyword));
                
                console.log(`    Done: ${gifKeyword}`);
              } catch (e) {
                console.error(`Failed for ${title}:`, e);
              }
            }
          }
        }
      }
    }
    
    sourceFile.saveSync();
    console.log(`Saved ${sourceFile.getBaseName()}`);
  }
}

run().catch(console.error);
"""

with open("scripts/update-lessons.ts", "w") as f:
    f.write(new_content)
print("updated update-lessons.ts")
