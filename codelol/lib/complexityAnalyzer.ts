import { GoogleGenAI } from '@google/genai';

export interface ComplexityResult {
  timeComplexity: string;
  spaceComplexity: string;
}

export async function analyzeComplexity(code: string): Promise<ComplexityResult> {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
    
    const prompt = `Analyze this JavaScript function. Respond ONLY in valid JSON format with \`timeComplexity\` and \`spaceComplexity\` strings in Big O notation (e.g. "O(N)"). Do not include markdown formatting or backticks.
    
    Code:
    ${code}`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    let text = response.text || '';
    
    // Clean up potential markdown formatting that Gemini sometimes adds despite instructions
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    const parsed = JSON.parse(text);
    
    return {
      timeComplexity: parsed.timeComplexity || "O(?)",
      spaceComplexity: parsed.spaceComplexity || "O(?)"
    };
  } catch (error) {
    console.error('Error analyzing complexity:', error);
    return {
      timeComplexity: "O(?)",
      spaceComplexity: "O(?)"
    };
  }
}
