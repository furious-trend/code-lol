import fetch from 'node-fetch';

const testCases = [
  {
    language: 'python',
    tests: [
      { type: 'error - div by zero', code: 'print(1/0)' },
      { type: 'error - index out of bounds', code: 'arr = [1, 2]\nprint(arr[5])' }
    ]
  },
  {
    language: 'java',
    tests: [
      { type: 'error - div by zero', code: 'public class Main {\n  public static void main(String[] args) {\n    System.out.println(1/0);\n  }\n}' },
      { type: 'error - index out of bounds', code: 'public class Main {\n  public static void main(String[] args) {\n    int[] arr = {1, 2};\n    System.out.println(arr[5]);\n  }\n}' }
    ]
  }
];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function runTests() {
  for (const lang of testCases) {
    console.log(`\n========================================`);
    console.log(`Testing Language: ${lang.language.toUpperCase()}`);
    console.log(`========================================`);

    for (const test of lang.tests) {
      console.log(`\n--- Test Type: ${test.type} ---`);
      
      try {
        const runRes = await fetch('http://localhost:3000/api/run', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ language: lang.language, code: test.code })
        });
        const runData = await runRes.json();
        const isSuccess = !runData.error;
        const outputOrError = isSuccess ? runData.output : runData.error;
        
        console.log(`[Execution Output]`);
        console.log(outputOrError);

        const roastRes = await fetch('http://localhost:3000/api/roast', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            code: test.code, 
            output: outputOrError, 
            isSuccess: isSuccess 
          })
        });
        const roastData = await roastRes.json();
        
        console.log(`[Roast Generator]`);
        if (isSuccess) {
            console.log(`Mood: ${roastData.mood}`);
        } else {
            console.log(`Roast: ${roastData.roast}`);
            console.log(`Mood: ${roastData.mood}`);
        }
        console.log("Waiting 15 seconds to avoid Gemini 429...");
        await delay(15000);
      } catch (e) {
        console.error('Error hitting local endpoints:', e.message);
      }
    }
  }
}

runTests();
