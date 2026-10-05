import { Lesson } from './types';

export const pythonInterviewLessons: Lesson[] = [
  {
    id: 301,
    chapter: "Chapter 1: The CTCI Framework",
    tier: "Interview",
    title: "The 5-Step Process",
    sticker: "🧠",
    codeExample: "# Step 1: Clarify\n# 'Can the array have negative numbers?'\n\n# Step 2 & 3: Pseudo-code\n/* \n  Loop through array\n  Keep track of max sum\n  Return max\n*/\n\n# Step 4: Code\ndef getMax(arr) {\n  return max(arr);\n}",
    gifKeyword: "screaming internally",
    miniQuizQuestion: {
      question: "According to standard interview frameworks, what is the VERY FIRST thing you should do when given a problem?",
      options: ["Start writing a for-loop", "Ask clarifying questions about edge cases", "Write pseudo-code", "Panic"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "Always ask about edge cases (empty arrays, negative numbers, Nones).", code: "def findMax(arr) {\n  # What if arr is empty?\n  if (!len(arr)) return None;\n}" }
    ],
      biteSized: {
                    meaning: "A fundamental concept.",
                    funnyEgTamil: "The 5-Step Process is like a phone notification—you think you've cleared all the steps, but another one pops up"
                  }
},
  {
    id: 302,
    chapter: "Chapter 2: Bit Manipulation",
    tier: "Interview",
    title: "AND, OR, XOR",
    sticker: "🤖",
    codeExample: "# AND (&) - Both must be 1\nprint(5 & 1); # 1 (Is it odd?)\n\n# XOR (^) - Must be DIFFERENT\nprint(5 ^ 5); # 0 (Destroys itself)",
    gifKeyword: "mind blown",
    miniQuizQuestion: {
      question: "What does the XOR (^) operator do if you XOR a number by itself? (e.g., `x ^ x`)",
      options: ["It doubles the number", "It returns the number squared", "It returns 0", "It crashes"],
      correctAnswerIndex: 2
    },
    examples: [
      { explanation: "Finding the only non-duplicate number in an array.", code: "arr = [2, 3, 2, 4, 4];\nsingle = 0;\nfor (n of arr) single ^= n;\nprint(single); # 3!" }
    ],
      biteSized: {
                    meaning: "A fundamental concept.",
                    funnyEgTamil: "AND needs coffee and sleep, OR needs pizza or a burger, XOR forces you to choose iPhone or Android."
                  }
},
  {
    id: 303,
    chapter: "Chapter 2: Bit Manipulation",
    tier: "Interview",
    title: "Bit Shifting",
    sticker: "⏩",
    codeExample: "num = 5;\nprint(num << 1); # 10 (Multiplied by 2!)\nprint(num >> 1); # 2 (Divided by 2 and floored!)",
    gifKeyword: "scrolling forever",
    miniQuizQuestion: {
      question: "What is the equivalent mathematical operation of Left Shift (`x << 1`)?",
      options: ["x + 1", "x * 2", "x / 2", "x ^ 2"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "Multiplying by 8 quickly.", code: "x = 5;\nprint(x << 3); # 5 * 2^3 = 40" }
    ],
      biteSized: {
                    meaning: "A fundamental concept.",
                    funnyEgTamil: "Bit shifting is like skipping songs on a playlist—you rapidly click next until you hit the right spot."
                  }
},
  {
    id: 304,
    chapter: "Chapter 3: System Design",
    tier: "Interview",
    title: "Scalability 101",
    sticker: "📈",
    codeExample: "# Vertical Scaling: \n# Server.upgradeRAM('128GB');\n\n# Horizontal Scaling:\n# LoadBalancer.distribute([Server1, Server2, Server3]);",
    gifKeyword: "traffic jam meme",
    miniQuizQuestion: {
      question: "What is 'Horizontal Scaling'?",
      options: ["Adding more RAM and CPU to one machine", "Adding more machines to a cluster", "Making your monitor wider", "Compressing database files"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "A simple load balancer concept.", code: "def loadBalance(requests, servers) {\n  return requests.map((req, i) => servers[i % len(servers)]);\n}" }
    ],
      biteSized: {
                    meaning: "A fundamental concept.",
                    funnyEgTamil: "Scalability is like adding lanes to a highway—you think it'll reduce traffic, but it just invites more cars"
                  }
},
  {
    id: 305,
    chapter: "Chapter 3: System Design",
    tier: "Interview",
    title: "Caching (Redis/Memcached)",
    sticker: "⚡",
    codeExample: "cache = {};\nasync def getUser(id) {\n  if (cache[id]) return cache[id]; # FAST!\n  user = await db.query('...'); # SLOW\n  cache[id] = user;\n  return user;\n}",
    gifKeyword: "why is this happening",
    miniQuizQuestion: {
      question: "Why do we use caching in System Design?",
      options: ["To permanently store critical user data", "To reduce load on the primary database by serving frequent requests from memory", "To encrypt passwords", "To sort arrays faster"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "Basic Memoization (caching def results).", code: "memo = {};\ndef expensive(n) {\n  if(memo[n]) return memo[n];\n  # ...do math...\n}" }
    ],
      biteSized: {
                    meaning: "A fundamental concept.",
                    funnyEgTamil: "Caching is like having snacks nearby—but they're stale after a while and you still have to go grocery shopping"
                  }
},
  {
    id: 306,
    chapter: "Chapter 4: Logic & Math",
    tier: "Interview",
    title: "Brain Teasers",
    sticker: "🤯",
    codeExample: "# Step 1: Volume of Bus = Length * Width * Height\n# Step 2: Volume of Golf Ball = 4/3 * PI * r^3\n# Step 3: Divide Bus by Ball\n# Step 4: Subtract 20% for seats and empty space",
    gifKeyword: "mind blown",
    miniQuizQuestion: {
      question: "When an interviewer asks an impossible estimation question (like golf balls in a bus), what are they actually testing?",
      options: ["Your knowledge of bus dimensions", "Your ability to structure a logical estimation process", "Your exact math skills", "If you play golf"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "Always break the big problem into smaller, logical formulas.", code: "busVol = 2000000; # cubic inches\nballVol = 2.5;\nballs = (busVol / ballVol) * 0.8;" }
    ],
      biteSized: {
                    meaning: "A fundamental concept.",
                    funnyEgTamil: "Brain teasers are like trying to merge lanes in heavy traffic—you think you've figured it out, but then everything changes"
                  }
},
    {"id":307,"chapter":"Chapter 12: System Design & Interviews","tier":"Interview","title":"Pattern: Merge Intervals","sticker":"💼","codeExample":"print(\"Interview\")","miniQuizQuestion":{"question":"Are you ready?","options":["Yes","No","Maybe","I don't know"],"correctAnswerIndex":0},"examples":[{"explanation":"Example","code":"console.log('Run');"}],"verificationChecks":[{"type":"requires_syntax","pattern":"console","expectedMessage":"Just log it"}],"biteSized":{"meaning":"Cracking the coding interview.","funnyEgTamil":"HR kitta package pesumbodhu nadukathoda sirikkira oru acting!"},"gifKeyword":"success meme"},
    {"id":308,"chapter":"Chapter 12: System Design & Interviews","tier":"Interview","title":"Pattern: Two Heaps","sticker":"💼","codeExample":"print(\"Interview\")","miniQuizQuestion":{"question":"Are you ready?","options":["Yes","No","Maybe","I don't know"],"correctAnswerIndex":0},"examples":[{"explanation":"Example","code":"console.log('Run');"}],"verificationChecks":[{"type":"requires_syntax","pattern":"console","expectedMessage":"Just log it"}],"biteSized":{"meaning":"Cracking the coding interview.","funnyEgTamil":"HR kitta package pesumbodhu nadukathoda sirikkira oru acting!"},"gifKeyword":"success meme"},
    {"id":309,"chapter":"Chapter 12: System Design & Interviews","tier":"Interview","title":"Pattern: Top K","sticker":"💼","codeExample":"print(\"Interview\")","miniQuizQuestion":{"question":"Are you ready?","options":["Yes","No","Maybe","I don't know"],"correctAnswerIndex":0},"examples":[{"explanation":"Example","code":"console.log('Run');"}],"verificationChecks":[{"type":"requires_syntax","pattern":"console","expectedMessage":"Just log it"}],"biteSized":{"meaning":"Cracking the coding interview.","funnyEgTamil":"HR kitta package pesumbodhu nadukathoda sirikkira oru acting!"},"gifKeyword":"success meme"},
    {"id":310,"chapter":"Chapter 12: System Design & Interviews","tier":"Interview","title":"System Design: Load Balancing","sticker":"💼","codeExample":"print(\"Interview\")","miniQuizQuestion":{"question":"Are you ready?","options":["Yes","No","Maybe","I don't know"],"correctAnswerIndex":0},"examples":[{"explanation":"Example","code":"console.log('Run');"}],"verificationChecks":[{"type":"requires_syntax","pattern":"console","expectedMessage":"Just log it"}],"biteSized":{"meaning":"Cracking the coding interview.","funnyEgTamil":"HR kitta package pesumbodhu nadukathoda sirikkira oru acting!"},"gifKeyword":"success meme"},
    {"id":311,"chapter":"Chapter 12: System Design & Interviews","tier":"Interview","title":"System Design: SQL vs NoSQL","sticker":"💼","codeExample":"print(\"Interview\")","miniQuizQuestion":{"question":"Are you ready?","options":["Yes","No","Maybe","I don't know"],"correctAnswerIndex":0},"examples":[{"explanation":"Example","code":"console.log('Run');"}],"verificationChecks":[{"type":"requires_syntax","pattern":"console","expectedMessage":"Just log it"}],"biteSized":{"meaning":"Cracking the coding interview.","funnyEgTamil":"HR kitta package pesumbodhu nadukathoda sirikkira oru acting!"},"gifKeyword":"success meme"},
    {"id":312,"chapter":"Chapter 12: System Design & Interviews","tier":"Interview","title":"System Design: Sharding","sticker":"💼","codeExample":"print(\"Interview\")","miniQuizQuestion":{"question":"Are you ready?","options":["Yes","No","Maybe","I don't know"],"correctAnswerIndex":0},"examples":[{"explanation":"Example","code":"console.log('Run');"}],"verificationChecks":[{"type":"requires_syntax","pattern":"console","expectedMessage":"Just log it"}],"biteSized":{"meaning":"Cracking the coding interview.","funnyEgTamil":"HR kitta package pesumbodhu nadukathoda sirikkira oru acting!"},"gifKeyword":"success meme"},
    {"id":313,"chapter":"Chapter 12: System Design & Interviews","tier":"Interview","title":"System Design: Microservices","sticker":"💼","codeExample":"print(\"Interview\")","miniQuizQuestion":{"question":"Are you ready?","options":["Yes","No","Maybe","I don't know"],"correctAnswerIndex":0},"examples":[{"explanation":"Example","code":"console.log('Run');"}],"verificationChecks":[{"type":"requires_syntax","pattern":"console","expectedMessage":"Just log it"}],"biteSized":{"meaning":"Cracking the coding interview.","funnyEgTamil":"HR kitta package pesumbodhu nadukathoda sirikkira oru acting!"},"gifKeyword":"success meme"},
    {"id":314,"chapter":"Chapter 12: System Design & Interviews","tier":"Interview","title":"System Design: Message Queues","sticker":"💼","codeExample":"print(\"Interview\")","miniQuizQuestion":{"question":"Are you ready?","options":["Yes","No","Maybe","I don't know"],"correctAnswerIndex":0},"examples":[{"explanation":"Example","code":"console.log('Run');"}],"verificationChecks":[{"type":"requires_syntax","pattern":"console","expectedMessage":"Just log it"}],"biteSized":{"meaning":"Cracking the coding interview.","funnyEgTamil":"HR kitta package pesumbodhu nadukathoda sirikkira oru acting!"},"gifKeyword":"success meme"},
    {"id":315,"chapter":"Chapter 12: System Design & Interviews","tier":"Interview","title":"System Design: API Design","sticker":"💼","codeExample":"print(\"Interview\")","miniQuizQuestion":{"question":"Are you ready?","options":["Yes","No","Maybe","I don't know"],"correctAnswerIndex":0},"examples":[{"explanation":"Example","code":"console.log('Run');"}],"verificationChecks":[{"type":"requires_syntax","pattern":"console","expectedMessage":"Just log it"}],"biteSized":{"meaning":"Cracking the coding interview.","funnyEgTamil":"HR kitta package pesumbodhu nadukathoda sirikkira oru acting!"},"gifKeyword":"success meme"},
    {"id":316,"chapter":"Chapter 12: System Design & Interviews","tier":"Interview","title":"Behavioral: STAR Method","sticker":"💼","codeExample":"print(\"Interview\")","miniQuizQuestion":{"question":"Are you ready?","options":["Yes","No","Maybe","I don't know"],"correctAnswerIndex":0},"examples":[{"explanation":"Example","code":"console.log('Run');"}],"verificationChecks":[{"type":"requires_syntax","pattern":"console","expectedMessage":"Just log it"}],"biteSized":{"meaning":"Cracking the coding interview.","funnyEgTamil":"HR kitta package pesumbodhu nadukathoda sirikkira oru acting!"},"gifKeyword":"success meme"},
    {"id":317,"chapter":"Chapter 12: System Design & Interviews","tier":"Interview","title":"Behavioral: Conflict","sticker":"💼","codeExample":"print(\"Interview\")","miniQuizQuestion":{"question":"Are you ready?","options":["Yes","No","Maybe","I don't know"],"correctAnswerIndex":0},"examples":[{"explanation":"Example","code":"console.log('Run');"}],"verificationChecks":[{"type":"requires_syntax","pattern":"console","expectedMessage":"Just log it"}],"biteSized":{"meaning":"Cracking the coding interview.","funnyEgTamil":"HR kitta package pesumbodhu nadukathoda sirikkira oru acting!"},"gifKeyword":"success meme"},
    {"id":318,"chapter":"Chapter 12: System Design & Interviews","tier":"Interview","title":"Resume Tips","sticker":"💼","codeExample":"print(\"Interview\")","miniQuizQuestion":{"question":"Are you ready?","options":["Yes","No","Maybe","I don't know"],"correctAnswerIndex":0},"examples":[{"explanation":"Example","code":"console.log('Run');"}],"verificationChecks":[{"type":"requires_syntax","pattern":"console","expectedMessage":"Just log it"}],"biteSized":{"meaning":"Cracking the coding interview.","funnyEgTamil":"HR kitta package pesumbodhu nadukathoda sirikkira oru acting!"},"gifKeyword":"success meme"},
    {"id":319,"chapter":"Chapter 12: System Design & Interviews","tier":"Interview","title":"Whiteboard Interview","sticker":"💼","codeExample":"print(\"Interview\")","miniQuizQuestion":{"question":"Are you ready?","options":["Yes","No","Maybe","I don't know"],"correctAnswerIndex":0},"examples":[{"explanation":"Example","code":"console.log('Run');"}],"verificationChecks":[{"type":"requires_syntax","pattern":"console","expectedMessage":"Just log it"}],"biteSized":{"meaning":"Cracking the coding interview.","funnyEgTamil":"HR kitta package pesumbodhu nadukathoda sirikkira oru acting!"},"gifKeyword":"success meme"},
    {"id":320,"chapter":"Chapter 12: System Design & Interviews","tier":"Interview","title":"Take-Home Assignment","sticker":"💼","codeExample":"print(\"Interview\")","miniQuizQuestion":{"question":"Are you ready?","options":["Yes","No","Maybe","I don't know"],"correctAnswerIndex":0},"examples":[{"explanation":"Example","code":"console.log('Run');"}],"verificationChecks":[{"type":"requires_syntax","pattern":"console","expectedMessage":"Just log it"}],"biteSized":{"meaning":"Cracking the coding interview.","funnyEgTamil":"HR kitta package pesumbodhu nadukathoda sirikkira oru acting!"},"gifKeyword":"success meme"},
    {"id":321,"chapter":"Chapter 12: System Design & Interviews","tier":"Interview","title":"Salary Negotiation 101","sticker":"💼","codeExample":"print(\"Interview\")","miniQuizQuestion":{"question":"Are you ready?","options":["Yes","No","Maybe","I don't know"],"correctAnswerIndex":0},"examples":[{"explanation":"Example","code":"console.log('Run');"}],"verificationChecks":[{"type":"requires_syntax","pattern":"console","expectedMessage":"Just log it"}],"biteSized":{"meaning":"Cracking the coding interview.","funnyEgTamil":"HR kitta package pesumbodhu nadukathoda sirikkira oru acting!"},"gifKeyword":"success meme"}
];
