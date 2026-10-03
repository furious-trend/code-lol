const { Project, SyntaxKind } = require('ts-morph');
const { GoogleGenAI } = require('@google/genai');
const dotenv = require('dotenv');

dotenv.config({ path: './.env.local' });

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function translateText(meaning, funnyEgTamil) {
  const prompt = `You are a translator. I will give you a "Meaning" and a "Funny Example" written in Tanglish (a mix of Tamil and English) about a programming concept.
  
Meaning: "${meaning}"
Funny Example (Tamil): "${funnyEgTamil}"

Your task is to provide an English translation for both that makes sense to a general audience.
The Meaning should just be a literal translation if it's Tanglish, or kept the same if it's already English.
The Funny Example should capture the essence of the joke but localized to a Western/General English audience context (e.g. replacing 'ration shop' with 'grocery store', 'Horlicks' with 'cookie tin', etc).
Do not use any markdown formatting. Return exactly two lines:
Line 1: The general meaning
Line 2: The general funny example`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
  });

  const text = response.text;
  const lines = text.split('\n').filter(l => l.trim() !== '');
  
  // Wait 12 seconds to avoid rate limiting (5 req/min)
  await new Promise(resolve => setTimeout(resolve, 13000));
  if (lines.length >= 2) {
    return {
      meaningGeneral: lines[0].replace(/^Line 1:\s*/i, '').trim(),
      funnyEgGeneral: lines[1].replace(/^Line 2:\s*/i, '').trim()
    };
  }
  return null;
}

async function processFile(filePath) {
  const project = new Project();
  const sourceFile = project.addSourceFileAtPath(filePath);
  
  // Find array of lessons. In beginner.ts it's beginnerLessons
  const arrayDecl = sourceFile.getVariableDeclaration('beginnerLessons') || sourceFile.getVariableDeclaration('pythonLessons');
  
  if (!arrayDecl) {
    console.log(`Could not find lessons array in ${filePath}`);
    return;
  }
  
  const arrayExpr = arrayDecl.getInitializerIfKind(SyntaxKind.ArrayLiteralExpression) 
                    || arrayDecl.getInitializerIfKindOrThrow(SyntaxKind.AsExpression).getExpressionIfKindOrThrow(SyntaxKind.ArrayLiteralExpression);
  
  const lessons = arrayExpr.getElements();
  
  for (const element of lessons) {
    if (element.getKind() !== SyntaxKind.ObjectLiteralExpression) continue;
    
    const obj = element;
    const biteSizedProp = obj.getProperty('biteSized');
    
    if (biteSizedProp && biteSizedProp.getKind() === SyntaxKind.PropertyAssignment) {
      const biteSizedObj = biteSizedProp.getInitializerIfKind(SyntaxKind.ObjectLiteralExpression);
      if (biteSizedObj) {
        const meaningProp = biteSizedObj.getProperty('meaning');
        const funnyEgTamilProp = biteSizedObj.getProperty('funnyEgTamil');
        const meaningGeneralProp = biteSizedObj.getProperty('meaningGeneral');
        const funnyEgGeneralProp = biteSizedObj.getProperty('funnyEgGeneral');
        
        if (meaningProp && funnyEgTamilProp && (!meaningGeneralProp || !funnyEgGeneralProp)) {
          const meaningText = meaningProp.getInitializer().getText().replace(/^["']|["']$/g, '');
          const funnyEgTamilText = funnyEgTamilProp.getInitializer().getText().replace(/^["']|["']$/g, '');
          
          console.log(`Translating: ${meaningText}`);
          const translations = await translateText(meaningText, funnyEgTamilText);
          
          if (translations) {
            console.log(`Result: ${translations.meaningGeneral}`);
            if (!meaningGeneralProp) {
              biteSizedObj.addPropertyAssignment({
                name: 'meaningGeneral',
                initializer: JSON.stringify(translations.meaningGeneral)
              });
            }
            if (!funnyEgGeneralProp) {
              biteSizedObj.addPropertyAssignment({
                name: 'funnyEgGeneral',
                initializer: JSON.stringify(translations.funnyEgGeneral)
              });
            }
          }
          
          // Save every few to avoid losing work
          await sourceFile.save();
        }
      }
    }
  }
  
  await sourceFile.save();
  console.log(`Finished processing ${filePath}`);
}

async function main() {
  await processFile('/home/shafi/projects/code lol/codelol/lib/lessons/beginner.ts');
  await processFile('/home/shafi/projects/code lol/codelol/lib/lessons/beginner-python.ts');
}

main().catch(console.error);
