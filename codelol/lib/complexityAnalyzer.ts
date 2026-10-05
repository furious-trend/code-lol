export interface ComplexityResult {
  timeComplexity: string;
  spaceComplexity: string;
}

export function analyzeComplexity(code: string, language: string = 'javascript'): ComplexityResult {
  if (!code) return { timeComplexity: "O(1)", spaceComplexity: "O(1)" };

  let maxLoopDepth = 0;
  let hasRecursion = false;
  
  // Clean up code by removing strings and single-line/multi-line comments
  let cleanCode = code
    .replace(/"(?:[^"\\]|\\.)*"/g, '""')
    .replace(/'(?:[^'\\]|\\.)*'/g, "''")
    .replace(/`(?:[^`\\]|\\.)*`/g, "``");
    
  if (language === 'python') {
    cleanCode = cleanCode.replace(/#.*$/gm, '');
  } else {
    cleanCode = cleanCode.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '');
  }

  // 1. Detect Recursion
  // First, find function names
  let funcNames: string[] = [];
  if (language === 'python') {
    const defRegex = /def\s+([a-zA-Z0-9_]+)\s*\(/g;
    let match;
    while ((match = defRegex.exec(cleanCode)) !== null) {
      funcNames.push(match[1]);
    }
  } else if (language === 'javascript') {
    const fnRegex = /function\s+([a-zA-Z0-9_]+)\s*\(|(const|let|var)\s+([a-zA-Z0-9_]+)\s*=\s*(\(.*?\)|[a-zA-Z0-9_]+)\s*=>/g;
    let match;
    while ((match = fnRegex.exec(cleanCode)) !== null) {
      if (match[1]) funcNames.push(match[1]);
      if (match[3]) funcNames.push(match[3]);
    }
  } else {
    // C, C++, Java
    const fnRegex = /(?:public|private|protected|static|inline|virtual|\s)*\s+[a-zA-Z0-9_<>\[\]]+\s+([a-zA-Z0-9_]+)\s*\([^)]*\)\s*\{/g;
    let match;
    while ((match = fnRegex.exec(cleanCode)) !== null) {
      // Exclude control flow keywords masquerading as functions
      if (!['if', 'for', 'while', 'switch', 'catch', 'main'].includes(match[1])) {
        funcNames.push(match[1]);
      }
    }
  }

  // Check if any function name is called inside its own body (basic heuristic: just check if it's called multiple times or anywhere after declaration)
  for (const name of funcNames) {
    const calls = cleanCode.split(new RegExp(`\\b${name}\\s*\\(`, 'g')).length - 1;
    if (calls > 1) { // 1 for declaration (or 0 if declaration doesn't use parens identically), >1 means called
      hasRecursion = true;
      break;
    }
  }

  // 2. Detect Loop Depth
  if (language === 'python') {
    const lines = cleanCode.split('\n');
    let currentDepth = 0;
    const depths: number[] = [];

    // Track active loop indentations
    const activeLoopIndents: number[] = [];

    for (const line of lines) {
      if (!line.trim()) continue;
      
      const indentMatch = line.match(/^(\s*)/);
      const indentStr = indentMatch ? indentMatch[1] : '';
      const indent = indentStr.length;
      
      // Pop loops that have ended (current line indent <= loop indent)
      while (activeLoopIndents.length > 0 && indent <= activeLoopIndents[activeLoopIndents.length - 1]) {
        activeLoopIndents.pop();
      }
      
      // Is it a loop?
      if (line.trim().match(/^(for|while)\b/)) {
        activeLoopIndents.push(indent);
      }
      
      if (activeLoopIndents.length > maxLoopDepth) {
        maxLoopDepth = activeLoopIndents.length;
      }
    }
  } else {
    // C-style languages (JS, C, C++, Java)
    let currentDepth = 0;
    
    // We'll iterate through tokens to properly track {} depth within loops
    let depthTokens = [];
    const loopRegex = /\b(for|while)\b/g;
    
    // Create a simplified token stream of { } and loop keywords
    const regex = /\b(for|while)\b|\{|\}/g;
    let match;
    
    const blockStack: ('loop' | 'block')[] = [];
    
    while ((match = regex.exec(cleanCode)) !== null) {
      const token = match[0];
      
      if (token === 'for' || token === 'while') {
        // We encountered a loop. We expect a '{' soon.
        // For simplicity, we just push a 'loop' pending state that will attach to the next '{'
        blockStack.push('loop');
        
        let loopCount = 0;
        for (const item of blockStack) {
          if (item === 'loop') loopCount++;
        }
        if (loopCount > maxLoopDepth) maxLoopDepth = loopCount;
      } else if (token === '{') {
        // If the last item was not a loop, push a regular block
        if (blockStack.length > 0 && blockStack[blockStack.length - 1] === 'loop') {
          // keep it as loop
        } else {
          blockStack.push('block');
        }
      } else if (token === '}') {
        if (blockStack.length > 0) {
          blockStack.pop();
        }
      }
    }
  }

  let timeComplexity = "O(1)";
  if (hasRecursion) {
    // Basic heuristic: recursive = O(2^n) or O(N), we'll output O(2^N) for dramatic effect / common recursive problems
    timeComplexity = "O(2^n) or O(n)";
  } else if (maxLoopDepth === 1) {
    timeComplexity = "O(n)";
  } else if (maxLoopDepth === 2) {
    timeComplexity = "O(n^2)";
  } else if (maxLoopDepth >= 3) {
    timeComplexity = "O(n^3)";
  }

  // Space complexity heuristics
  let spaceComplexity = "O(1)";
  
  // Checking for array/list/object/map instantiations
  const createsDataStructure = language === 'python'
    ? /\[\]|\{\}|list\(|dict\(|set\(/g.test(cleanCode)
    : /\[\]|\{\}|new\s+(Array|Map|Set|List|ArrayList|HashMap|vector|unordered_map)/g.test(cleanCode) || /malloc|calloc/g.test(cleanCode);

  if (hasRecursion) {
    spaceComplexity = "O(n)"; // Stack frame space
  } else if (createsDataStructure) {
    spaceComplexity = "O(n)";
  }

  return { timeComplexity, spaceComplexity };
}
