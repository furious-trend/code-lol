// script to patch app/problems/[id]/page.tsx
const fs = require('fs');

const path = 'app/problems/[id]/page.tsx';
let content = fs.readFileSync(path, 'utf-8');

// Replace learningLanguage state with a new state for active language in the problem
content = content.replace(
  "const [learningLanguage, setLearningLanguage] = useState<string>('javascript');",
  "const [learningLanguage, setLearningLanguage] = useState<string>('javascript');\n  const [activeLang, setActiveLang] = useState<string>('javascript');"
);

// Update loadPref to set activeLang
content = content.replace(
  "setLearningLanguage(storedLang);",
  "setLearningLanguage(storedLang); setActiveLang(storedLang);"
);
content = content.replace(
  "setLearningLanguage(profile.learning_language);",
  "setLearningLanguage(profile.learning_language); setActiveLang(profile.learning_language);"
);

// Update useEffect for problem load to use activeLang
content = content.replace(
  "if (learningLanguage === 'python' && problem.starterCodePython) {",
  "if (activeLang === 'python' && problem.starterCodePython) {"
);
content = content.replace(
  "}, [problem, learningLanguage]);",
  "}, [problem, activeLang]);"
);

// In handleSubmit, use activeLang instead of learningLanguage
content = content.replace(/learningLanguage/g, "activeLang");
// except where we need to update the profile... well actually activeLang is what we want for everything in handleSubmit (e.g. execution, saveProblemCompletion)

// Now, add the language dropdown next to the title
const dropdownHTML = `
            <div className="flex items-center gap-4 mt-2">
              <h1 className="text-3xl font-bold">{problem.title}</h1>
              <span className={\`px-3 py-1 rounded-full text-xs font-bold border \${badgeColor}\`}>
                {problem.difficulty}
              </span>
              <select 
                value={activeLang}
                onChange={(e) => {
                  const newLang = e.target.value;
                  // Set new starter code based on selection if available
                  if (newLang === 'python' && problem.starterCodePython) {
                    setCode(problem.starterCodePython);
                  } else if (newLang === 'javascript') {
                    setCode(problem.starterCode);
                  } else {
                    // For C/C++/Java, provide a basic starter if not defined
                    const starters = {
                      c: '#include <stdio.h>\\n\\nint main() {\\n    // Write your code here\\n    return 0;\\n}',
                      cpp: '#include <iostream>\\n\\nint main() {\\n    // Write your code here\\n    return 0;\\n}',
                      java: 'public class Main {\\n    public static void main(String[] args) {\\n        // Write your code here\\n    }\\n}'
                    };
                    setCode(starters[newLang] || '');
                  }
                  setActiveLang(newLang);
                }}
                className="bg-zinc-900 border border-zinc-800 rounded-lg p-2 text-sm text-zinc-400 focus:outline-none focus:border-blue-500 cursor-pointer ml-auto"
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="c">C</option>
                <option value="cpp">C++</option>
                <option value="java">Java</option>
              </select>
            </div>
`;

content = content.replace(
  /<div className="flex items-center gap-4 mt-2">[\s\S]*?<\/div>/,
  dropdownHTML
);

// Update handleSubmit to handle C/C++/Java without tests
const submitReplacement = `
    let testSuite = '';
    
    if (activeLang === 'python' || activeLang === 'javascript') {
      if (activeLang === 'python') {
        testSuite = \`
\${code}

import json
_tc = json.loads('\${JSON.stringify(problem.testCases).replace(/'/g, "\\\\'")}')
_passed = 0
_log = []

for i, tc in enumerate(_tc):
    try:
        if '\${functionName}' not in globals():
            _log.append("Test " + str(i+1) + ": ERROR (Function '\${functionName}' not found. Did you rename it or change its definition?)")
            continue
            
        fn = globals()['\${functionName}']
        result = fn(*tc['input'])
        
        if result == tc['expected']:
            _passed += 1
            _log.append("Test " + str(i+1) + ": PASS")
        else:
            _log.append("Test " + str(i+1) + ": FAIL (Expected " + json.dumps(tc['expected']) + ", got " + json.dumps(result) + ")")
    except Exception as e:
        _log.append("Test " + str(i+1) + ": ERROR (" + str(e) + ")")

print('===TEST_RESULTS===')
print(json.dumps({'passed': _passed, 'total': len(_tc), 'log': _log}))
\`;
      } else {
        testSuite = \`
\${code}

const _tc = \${JSON.stringify(problem.testCases)};
let _passed = 0;
let _log = [];

(async () => {
  for (let i = 0; i < _tc.length; i++) {
    try {
      let fn;
      try {
        fn = eval('typeof ' + '\${functionName}' + " !== 'undefined' ? " + '\${functionName}' + ' : undefined');
      } catch(e) {
        fn = undefined;
      }
      if (typeof fn !== 'function') {
        _log.push('Test ' + (i+1) + ': ERROR (Function \\\\'\${functionName}\\\\' not found. Did you rename it or change its definition?)');
        continue;
      }
      
      const result = await Promise.race([
        Promise.resolve(fn(..._tc[i].input)),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Test case timed out (async hang)')), 2000))
      ]);
      
      if (result === undefined) {
        _log.push('Test ' + (i+1) + ': FAIL (No return value detected. Did you forget to use \\\\'return\\\\'?)');
        continue;
      }
      
      if (JSON.stringify(result) === JSON.stringify(_tc[i].expected)) {
        _passed++;
        _log.push('Test ' + (i+1) + ': PASS');
      } else {
        _log.push('Test ' + (i+1) + ': FAIL (Expected ' + JSON.stringify(_tc[i].expected) + ', got ' + JSON.stringify(result) + ')');
      }
    } catch(e) {
      if (e instanceof ReferenceError && e.message.includes('\${functionName}')) {
        _log.push('Test ' + (i+1) + ': ERROR (Function \\\\'\${functionName}\\\\' not found. Ensure you did not rename the function!)');
      } else {
        _log.push('Test ' + (i+1) + ': ERROR (' + e.message + ')');
      }
    }
  }
  console.log('===TEST_RESULTS===');
  console.log(JSON.stringify({ passed: _passed, total: _tc.length, log: _log }));
})();
\`;
      }
    } else {
      // For C, C++, Java, we simply run the code and do not auto-test right now.
      testSuite = code;
    }
`;

content = content.replace(
  /let testSuite = '';[\s\S]*?testSuite = \`[\s\S]*?console.log\(JSON.stringify\({ passed: _passed, total: _tc.length, log: _log }\)\);\n\}\)\(\);\n\`;\n    \}/,
  submitReplacement
);

// We also need to handle the output when it doesn't contain ===TEST_RESULTS===
// Find the resultsIdx checking part
const resultHandling = `
      if (activeLang !== 'javascript' && activeLang !== 'python') {
        // Just show output
        setRawOutput(data.output || "Code ran successfully with no output.");
        setSuccessMsg("Executed Successfully!");
        setTestResults({ passed: 1, total: 1, log: ["Execution Output:", ...(data.output || "No output").split('\\n')] });
        
        // Wait for roast and GIF to fully load
        const playedSound = playMemeSound(true, humorPref);
        handleRoast(code, data.output || "Code ran successfully with no output.", true, playedSound, humorPref);
        
        setIsSubmitting(false);
        return;
      }

      // Parse the output to find our test results
      const resultsIdx = outputLines.findIndex((l: string) => l === '===TEST_RESULTS===');
`;

content = content.replace(
  /\/\/ Parse the output to find our test results\n\s*const resultsIdx = outputLines\.findIndex\(\(l: string\) => l === '===TEST_RESULTS==='\);/,
  resultHandling
);

fs.writeFileSync(path, content, 'utf-8');
console.log('Done patching');
