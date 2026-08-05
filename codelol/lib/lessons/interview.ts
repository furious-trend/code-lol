import { Lesson } from './types';

export const interviewLessons: Lesson[] = [
  {
    id: 301,
    chapter: "Chapter 1: The CTCI Framework",
    tier: "Interview",
    title: "The 5-Step Process",
    sticker: "🧠",
    funnyExplanation: "Cracking the Coding Interview says you can't just start typing like a maniac. You must 1) Ask questions, 2) Design an algorithm, 3) Write pseudo-code, 4) Write real code, 5) Test it. If you skip to step 4, the interviewer will secretly hate you.",
    codeExample: "// Step 1: Clarify\n// 'Can the array have negative numbers?'\n\n// Step 2 & 3: Pseudo-code\n/* \n  Loop through array\n  Keep track of max sum\n  Return max\n*/\n\n// Step 4: Code\nfunction getMax(arr) {\n  return Math.max(...arr);\n}",
    gifKeyword: "typing fast maniac",
    miniQuizQuestion: {
      question: "According to standard interview frameworks, what is the VERY FIRST thing you should do when given a problem?",
      options: ["Start writing a for-loop", "Ask clarifying questions about edge cases", "Write pseudo-code", "Panic"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "Always ask about edge cases (empty arrays, negative numbers, nulls).", code: "function findMax(arr) {\n  // What if arr is empty?\n  if (!arr.length) return null;\n}" }
    ]
  },
  {
    id: 302,
    chapter: "Chapter 2: Bit Manipulation",
    tier: "Interview",
    title: "AND, OR, XOR",
    sticker: "🤖",
    funnyExplanation: "Bit manipulation is basically hacking at the microscopic level. You look directly at the 1s and 0s. XOR (^) is the magic operator: a ^ a = 0. It deletes duplicates instantly.",
    codeExample: "// AND (&) - Both must be 1\nconsole.log(5 & 1); // 1 (Is it odd?)\n\n// XOR (^) - Must be DIFFERENT\nconsole.log(5 ^ 5); // 0 (Destroys itself)",
    gifKeyword: "matrix code hacking",
    miniQuizQuestion: {
      question: "What does the XOR (^) operator do if you XOR a number by itself? (e.g., `x ^ x`)",
      options: ["It doubles the number", "It returns the number squared", "It returns 0", "It crashes"],
      correctAnswerIndex: 2
    },
    examples: [
      { explanation: "Finding the only non-duplicate number in an array.", code: "let arr = [2, 3, 2, 4, 4];\nlet single = 0;\nfor (let n of arr) single ^= n;\nconsole.log(single); // 3!" }
    ]
  },
  {
    id: 303,
    chapter: "Chapter 2: Bit Manipulation",
    tier: "Interview",
    title: "Bit Shifting",
    sticker: "⏩",
    funnyExplanation: "Shifting bits left (`<<`) multiplies by 2. Shifting right (`>>`) divides by 2. It's how you do math without actually using the math operators, just to show off to the interviewer.",
    codeExample: "let num = 5;\nconsole.log(num << 1); // 10 (Multiplied by 2!)\nconsole.log(num >> 1); // 2 (Divided by 2 and floored!)",
    gifKeyword: "sliding right fast",
    miniQuizQuestion: {
      question: "What is the equivalent mathematical operation of Left Shift (`x << 1`)?",
      options: ["x + 1", "x * 2", "x / 2", "x ^ 2"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "Multiplying by 8 quickly.", code: "let x = 5;\nconsole.log(x << 3); // 5 * 2^3 = 40" }
    ]
  },
  {
    id: 304,
    chapter: "Chapter 3: System Design",
    tier: "Interview",
    title: "Scalability 101",
    sticker: "📈",
    funnyExplanation: "System design is figuring out how to stop your server from exploding when more than 3 people use your app at the same time. Vertical scaling is buying a bigger computer. Horizontal scaling is buying 100 cheap computers.",
    codeExample: "// Vertical Scaling: \n// Server.upgradeRAM('128GB');\n\n// Horizontal Scaling:\n// LoadBalancer.distribute([Server1, Server2, Server3]);",
    gifKeyword: "server rack fire",
    miniQuizQuestion: {
      question: "What is 'Horizontal Scaling'?",
      options: ["Adding more RAM and CPU to one machine", "Adding more machines to a cluster", "Making your monitor wider", "Compressing database files"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "A simple load balancer concept.", code: "function loadBalance(requests, servers) {\n  return requests.map((req, i) => servers[i % servers.length]);\n}" }
    ]
  },
  {
    id: 305,
    chapter: "Chapter 3: System Design",
    tier: "Interview",
    title: "Caching (Redis/Memcached)",
    sticker: "⚡",
    funnyExplanation: "A cache is your system's short-term memory. Instead of asking the database 'What is 5x5?' a million times, you ask it once, write '25' on a sticky note, and just read the sticky note. That sticky note is Redis.",
    codeExample: "let cache = {};\nasync function getUser(id) {\n  if (cache[id]) return cache[id]; // FAST!\n  let user = await db.query('...'); // SLOW\n  cache[id] = user;\n  return user;\n}",
    gifKeyword: "sticky notes everywhere",
    miniQuizQuestion: {
      question: "Why do we use caching in System Design?",
      options: ["To permanently store critical user data", "To reduce load on the primary database by serving frequent requests from memory", "To encrypt passwords", "To sort arrays faster"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "Basic Memoization (caching function results).", code: "const memo = {};\nfunction expensive(n) {\n  if(memo[n]) return memo[n];\n  // ...do math...\n}" }
    ]
  },
  {
    id: 306,
    chapter: "Chapter 4: Logic & Math",
    tier: "Interview",
    title: "Brain Teasers",
    sticker: "🤯",
    funnyExplanation: "Brain teasers are those annoying Google-style questions like 'How many golf balls fit in a school bus?' They don't want the exact number, they just want to see if you panic or if you can estimate logically.",
    codeExample: "// Step 1: Volume of Bus = Length * Width * Height\n// Step 2: Volume of Golf Ball = 4/3 * PI * r^3\n// Step 3: Divide Bus by Ball\n// Step 4: Subtract 20% for seats and empty space",
    gifKeyword: "calculating meme math",
    miniQuizQuestion: {
      question: "When an interviewer asks an impossible estimation question (like golf balls in a bus), what are they actually testing?",
      options: ["Your knowledge of bus dimensions", "Your ability to structure a logical estimation process", "Your exact math skills", "If you play golf"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "Always break the big problem into smaller, logical formulas.", code: "const busVol = 2000000; // cubic inches\nconst ballVol = 2.5;\nconst balls = (busVol / ballVol) * 0.8;" }
    ]
  }
];
