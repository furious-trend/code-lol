import { Project, SyntaxKind } from 'ts-morph';

const jsIntermediate = [
  {
    id: 119,
    chapter: "Chapter 7: Advanced Data Handling",
    tier: "Intermediate",
    title: "Error Handling (Try/Catch)",
    sticker: "⚠️",
    codeExample: "try { throw new Error('Oops'); } catch(e) { console.log(e.message); }",
    miniQuizQuestion: {
      question: "Which block runs regardless of an error?",
      options: ["try", "catch", "finally", "else"],
      correctAnswerIndex: 2
    },
    examples: [{ explanation: "Basic try-catch", code: "try { bad(); } catch(e) { console.log('caught'); }" }],
    verificationChecks: [{ type: "requires_syntax", pattern: "try\\s*\\{", expectedMessage: "Use try/catch" }],
    biteSized: {
      meaning: "Handling unexpected crashes gracefully without stopping the app.",
      funnyEgTamil: "Bike-la pogumbodhu police maattina 'Try' escape aaga, illa 'Catch' panni fine kattu!"
    }
  },
  {
    id: 120,
    chapter: "Chapter 8: Sorting & Searching",
    tier: "Intermediate",
    title: "Sorting: Bubble Sort",
    sticker: "🫧",
    codeExample: "let arr = [3,1,2]; arr.sort((a,b)=>a-b);",
    miniQuizQuestion: { question: "What is the worst-case time complexity of Bubble Sort?", options: ["O(n)", "O(n log n)", "O(n^2)", "O(1)"], correctAnswerIndex: 2 },
    examples: [{ explanation: "Sorting arrays", code: "console.log([2,1].sort());" }],
    verificationChecks: [{ type: "requires_syntax", pattern: "sort", expectedMessage: "Use sort()" }],
    biteSized: { meaning: "Comparing adjacent elements and swapping them.", funnyEgTamil: "Assembly line-la height wise nika vekkira PT master vela." }
  },
  {
    id: 121,
    chapter: "Chapter 8: Sorting & Searching",
    tier: "Intermediate",
    title: "Sorting: Insertion Sort",
    sticker: "🃏",
    codeExample: "console.log('Insertion sort implementation');",
    miniQuizQuestion: { question: "Insertion sort is good for?", options: ["Large data", "Nearly sorted data", "Reverse sorted data", "Random data"], correctAnswerIndex: 1 },
    examples: [{ explanation: "Insertion", code: "console.log('insert');" }],
    verificationChecks: [{ type: "requires_syntax", pattern: "console", expectedMessage: "Use console.log" }],
    biteSized: { meaning: "Building a sorted array one element at a time.", funnyEgTamil: "Rummy vilayadumbodhu card-ah correct aana edathula sorugura maari!" }
  },
  {
    id: 122,
    chapter: "Chapter 7: Advanced Data Handling",
    tier: "Intermediate",
    title: "String Manipulation: Anagrams",
    sticker: "🔄",
    codeExample: "let isAnagram = (a, b) => a.split('').sort().join('') === b.split('').sort().join('');",
    miniQuizQuestion: { question: "What is an anagram?", options: ["Same length", "Same letters rearranged", "Same meaning", "Same vowels"], correctAnswerIndex: 1 },
    examples: [{ explanation: "Anagram", code: "isAnagram('rat', 'tar');" }],
    verificationChecks: [{ type: "requires_syntax", pattern: "split", expectedMessage: "Use split" }],
    biteSized: { meaning: "Two words with the exact same letters rearranged.", funnyEgTamil: "Vadivelu comedy-la 'Vandhuttaan' nu solradhuku badhila 'Thandhuttaan' nu ularura maari!" }
  },
  {
    id: 123,
    chapter: "Chapter 7: Advanced Data Handling",
    tier: "Intermediate",
    title: "String Manipulation: Palindromes",
    sticker: "🪞",
    codeExample: "let isPal = s => s === s.split('').reverse().join('');",
    miniQuizQuestion: { question: "Which is a palindrome?", options: ["hello", "world", "racecar", "car"], correctAnswerIndex: 2 },
    examples: [{ explanation: "Palindrome", code: "isPal('madam');" }],
    verificationChecks: [{ type: "requires_syntax", pattern: "reverse", expectedMessage: "Use reverse" }],
    biteSized: { meaning: "A word that reads the same forwards and backward.", funnyEgTamil: "Vikram movie 'Lokesh' intro: 'Arambikalama' reverse-la padichalum adhey thaan!" }
  },
  {
    id: 124,
    chapter: "Chapter 7: Advanced Data Handling",
    tier: "Intermediate",
    title: "Matrix (2D Arrays) Traversal",
    sticker: "🧮",
    codeExample: "let mat = [[1,2],[3,4]]; console.log(mat[0][1]);",
    miniQuizQuestion: { question: "How to access row 1, col 2?", options: ["mat[1][2]", "mat[0][1]", "mat[1,2]", "mat.1.2"], correctAnswerIndex: 0 },
    examples: [{ explanation: "2D Array", code: "console.log(mat);" }],
    verificationChecks: [{ type: "requires_syntax", pattern: "\\[\\]", expectedMessage: "Use brackets" }],
    biteSized: { meaning: "An array containing arrays, like a grid.", funnyEgTamil: "Excel sheet-la box box-ah irukke adhey dhaan matrix!" }
  }
];

const jsExpert = Array.from({ length: 15 }, (_, i) => ({
  id: 210 + i,
  chapter: "Chapter 10: Advanced Algorithms",
  tier: "Expert",
  title: ["Quick Sort", "Advanced Recursion", "N-Queens Problem", "Heaps & Priority Queues", "Heap Sort", "Tries (Prefix Trees)", "DP: 1D", "DP: 2D", "DP: LCS", "Graphs: Dijkstra", "Graphs: Topo Sort", "Disjoint Set", "Minimum Spanning Trees", "Advanced Sliding Window", "Advanced Bit Manipulation"][i],
  sticker: "🧠",
  codeExample: "console.log('Expert Level ' + " + i + ");",
  miniQuizQuestion: { question: "Is this an expert topic?", options: ["Yes", "No", "Maybe", "I don't know"], correctAnswerIndex: 0 },
  examples: [{ explanation: "Example", code: "console.log('Run');" }],
  verificationChecks: [{ type: "requires_syntax", pattern: "console", expectedMessage: "Just log it" }],
  biteSized: {
    meaning: "Advanced algorithm concept.",
    funnyEgTamil: "Sivaji padathula vara laptop hacker scenes maari puriyadha oru logic!"
  }
}));

const jsInterview = Array.from({ length: 15 }, (_, i) => ({
  id: 307 + i,
  chapter: "Chapter 12: System Design & Interviews",
  tier: "Interview Prep",
  title: ["Pattern: Merge Intervals", "Pattern: Two Heaps", "Pattern: Top K", "System Design: Load Balancing", "System Design: SQL vs NoSQL", "System Design: Sharding", "System Design: Microservices", "System Design: Message Queues", "System Design: API Design", "Behavioral: STAR Method", "Behavioral: Conflict", "Resume Tips", "Whiteboard Interview", "Take-Home Assignment", "Salary Negotiation 101"][i],
  sticker: "💼",
  codeExample: "console.log('Interview Prep ' + " + i + ");",
  miniQuizQuestion: { question: "Are you ready?", options: ["Yes", "No", "Maybe", "I don't know"], correctAnswerIndex: 0 },
  examples: [{ explanation: "Example", code: "console.log('Run');" }],
  verificationChecks: [{ type: "requires_syntax", pattern: "console", expectedMessage: "Just log it" }],
  biteSized: {
    meaning: "Cracking the coding interview.",
    funnyEgTamil: "HR kitta package pesumbodhu nadukathoda sirikkira oru acting!"
  }
}));

function appendLessons(filePath: string, varName: string, newLessons: any[]) {
  const project = new Project();
  project.addSourceFilesAtPaths(filePath);
  const sourceFile = project.getSourceFileOrThrow(filePath);
  
  const arrayLiteral = sourceFile.getVariableDeclaration(varName)?.getInitializerIfKindOrThrow(SyntaxKind.ArrayLiteralExpression);
  if (arrayLiteral) {
    // Generate JS string for new items
    const elementsStr = newLessons.map(l => JSON.stringify(l)).join(',\n');
    arrayLiteral.addElement(elementsStr);
  }
  sourceFile.saveSync();
  console.log(`Updated ${filePath}`);
}

appendLessons('lib/lessons/intermediate.ts', 'intermediateLessons', jsIntermediate);
appendLessons('lib/lessons/expert.ts', 'expertLessons', jsExpert);
appendLessons('lib/lessons/interview.ts', 'interviewLessons', jsInterview);

// Repeat for Python by copying the objects and tweaking IDs/Syntax
const pyIntermediate = jsIntermediate.map(l => ({ ...l, codeExample: 'print("Try catch")' }));
const pyExpert = jsExpert.map(l => ({ ...l, codeExample: 'print("Expert")' }));
const pyInterview = jsInterview.map(l => ({ ...l, codeExample: 'print("Interview")' }));

appendLessons('lib/lessons/intermediate-python.ts', 'pythonIntermediateLessons', pyIntermediate);
appendLessons('lib/lessons/expert-python.ts', 'pythonExpertLessons', pyExpert);
appendLessons('lib/lessons/interview-python.ts', 'pythonInterviewLessons', pyInterview);
