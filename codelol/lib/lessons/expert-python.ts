import { Lesson } from './types';

export const pythonExpertLessons: Lesson[] = [
  {
    id: 201,
    chapter: "Chapter 1: Trees",
    tier: "Expert",
    title: "Binary Trees",
    sticker: "🌲",
    codeExample: "class TreeNode {\n  __init__(val) {\n    self.val = val;\n    self.left = None;\n    self.right = None;\n  }\n}",
    gifKeyword: "screaming internally",
    miniQuizQuestion: {
      question: "In a Binary Tree, what is a node with NO children called?",
      options: ["A root", "A leaf", "A stump", "A branch"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "Building a tiny tree.", code: "root = TreeNode(10);\nroot.left = TreeNode(5);\nroot.right = TreeNode(15);" }
    ],
      biteSized: {
                    meaning: "A fundamental concept.",
                    funnyEgTamil: "Binary Trees are like traffic - every route seems efficient until you hit a node and everything comes to a standstill"
                  }
},
  {
    id: 202,
    chapter: "Chapter 1: Trees",
    tier: "Expert",
    title: "Binary Search Trees (BST)",
    sticker: "🔍",
    codeExample: "def searchBST(root, val) {\n  if (!root) return None;\n  if (root.val == val) return root;\n  if (val < root.val) return searchBST(root.left, val);\n  return searchBST(root.right, val);\n}",
    gifKeyword: "screaming internally",
    miniQuizQuestion: {
      question: "In a valid BST, where would a number smaller than the root go?",
      options: ["To the right subtree", "To the left subtree", "It replaces the root", "It goes in the trash"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "BST Lookup is O(log n)... IF the tree is balanced.", code: "foundNode = searchBST(root, 42);" }
    ],
      biteSized: {
                    meaning: "A fundamental concept.",
                    funnyEgTamil: "Binary Search Trees are like phonebooks—you can quickly find a specific name, but good luck inserting a one in the correct spot"
                  }
},
  {
    id: 203,
    chapter: "Chapter 1: Trees",
    tier: "Expert",
    title: "Depth First Search (DFS)",
    sticker: "🤿",
    codeExample: "def dfs(node) {\n  if (!node) return;\n  print(node.val); # Pre-order\n  dfs(node.left);\n  dfs(node.right);\n}",
    gifKeyword: "screaming internally",
    miniQuizQuestion: {
      question: "Which data structure is naturally used by DFS underneath the hood (often via recursion)?",
      options: ["Queue", "Hash Map", "Stack (Call Stack)", "Array"],
      correctAnswerIndex: 2
    },
    examples: [
      { explanation: "In-order traversal (prints BST in sorted order!).", code: "def inOrder(node) {\n  if (!node) return;\n  inOrder(node.left);\n  print(node.val);\n  inOrder(node.right);\n}" }
    ],
      biteSized: {
                    meaning: "A fundamental concept.",
                    funnyEgTamil: "Depth First Search is like trying to find the WiFi password in your notes—you keep digging deeper and deeper until you finally find it"
                  }
},
  {
    id: 204,
    chapter: "Chapter 1: Trees",
    tier: "Expert",
    title: "Breadth First Search (BFS)",
    sticker: "🌊",
    codeExample: "def bfs(root) {\n  queue = [root];\n  while(len(queue)) {\n    node = queue.pop(0)(); # Dequeue\n    print(node.val);\n    if (node.left) queue.append(node.left);\n    if (node.right) queue.append(node.right);\n  }\n}",
    gifKeyword: "why is this happening",
    miniQuizQuestion: {
      question: "Which data structure is REQUIRED to implement BFS iteratively?",
      options: ["Stack", "Queue", "Tree", "Graph"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "Level order traversal using a queue.", code: "q = [root];\n# process nodes level by level..." }
    ],
      biteSized: {
                    meaning: "A fundamental concept.",
                    funnyEgTamil: "Breadth First Search is like searching for a specific text in a long WhatsApp conversation—you have to go through all the irrelevant messages first"
                  }
},
  {
    id: 205,
    chapter: "Chapter 2: Graphs",
    tier: "Expert",
    title: "Graph Basics",
    sticker: "🕸️",
    codeExample: "# Adjacency List\ngraph = {\n  'Alice': ['Bob', 'Charlie'],\n  'Bob': ['Alice'],\n  'Charlie': ['Alice']\n};",
    gifKeyword: "road rage gif",
    miniQuizQuestion: {
      question: "What is the most common way to represent a graph in JavaScript?",
      options: ["A Binary Tree", "An Adjacency List (Object/Map)", "A 1D Array", "A String"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "Adding an edge (undirected).", code: "def addEdge(g, u, v) {\n  g[u].append(v);\n  g[v].append(u);\n}" }
    ],
      biteSized: {
                    meaning: "A fundamental concept.",
                    funnyEgTamil: "Graphs are like traffic—you think you've found the shortest path, but then roadwork happens"
                  }
},
  {
    id: 206,
    chapter: "Chapter 2: Graphs",
    tier: "Expert",
    title: "Graph Traversal",
    sticker: "🧭",
    codeExample: "visited = set();\ndef dfsGraph(node) {\n  if (visited.has(node)) return;\n  visited.add(node);\n  print(node);\n  for (neighbor of graph[node]) dfsGraph(neighbor);\n}",
    gifKeyword: "screaming internally",
    miniQuizQuestion: {
      question: "Why is a `visited` Set crucial when traversing a Graph?",
      options: ["To make it faster", "To prevent infinite loops from cycles", "To save memory", "Because JavaScript requires it"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "BFS on a Graph.", code: "q = [startNode];\nvisited.add(startNode);\nwhile(len(q)) {\n  curr = q.pop(0)();\n  # add unvisited neighbors to queue\n}" }
    ],
      biteSized: {
                    meaning: "A fundamental concept.",
                    funnyEgTamil: "Graph traversal is like trying to escape a traffic circle—you think you're making progress, but you're just ending up back where you started"
                  }
},
  {
    id: 207,
    chapter: "Chapter 3: Dynamic Programming",
    tier: "Expert",
    title: "Memoization (Top-Down)",
    sticker: "🧠",
    codeExample: "memo = {};\ndef fib(n) {\n  if (n <= 1) return n;\n  if (memo[n]) return memo[n]; # Oh yeah, I know this!\n  memo[n] = fib(n-1) + fib(n-2);\n  return memo[n];\n}",
    gifKeyword: "screaming internally",
    miniQuizQuestion: {
      question: "What is the primary purpose of memoization?",
      options: ["To write cleaner code", "To cache expensive def calls", "To reduce memory usage", "To sort arrays"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "Fibonacci goes from O(2^n) to O(n) just by adding a cache object!", code: "# Without memo: runs forever for fib(50)\n# With memo: instant!" }
    ],
      biteSized: {
                    meaning: "A fundamental concept.",
                    funnyEgTamil: "Memoization is like saving your WiFi password so you don't have to remember it every time, but your browser does"
                  }
},
  {
    id: 208,
    chapter: "Chapter 3: Dynamic Programming",
    tier: "Expert",
    title: "Tabulation (Bottom-Up)",
    sticker: "📊",
    codeExample: "def fib(n) {\n  dp = [0, 1];\n  for(i = 2; i <= n; i++) {\n    dp[i] = dp[i-1] + dp[i-2];\n  }\n  return dp[n];\n}",
    gifKeyword: "why is this happening",
    miniQuizQuestion: {
      question: "Which approach uses iteration (loops) instead of recursion?",
      options: ["Memoization", "Tabulation", "DFS", "Backtracking"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "Building an array of results from the ground up.", code: "dp = Array(n+1).fill(0);\n# populate dp array" }
    ],
      biteSized: {
                    meaning: "A fundamental concept.",
                    funnyEgTamil: "Tabulation is like making a grocery list, but with each item, you realize you need to buy something else first"
                  }
},
  {
    id: 209,
    chapter: "Chapter 4: Advanced Sorting",
    tier: "Expert",
    title: "Merge Sort",
    sticker: "🗂️",
    codeExample: "def merge(left, right) {\n  res = [];\n  while(len(left) && len(right)) {\n    if(left[0] < right[0]) res.append(left.pop(0)());\n    else res.append(right.pop(0)());\n  }\n  return [...res, ...left, ...right];\n}",
    gifKeyword: "screaming internally",
    miniQuizQuestion: {
      question: "What is the Time Complexity of Merge Sort?",
      options: ["O(n^2)", "O(n)", "O(n log n)", "O(1)"],
      correctAnswerIndex: 2
    },
    examples: [
      { explanation: "The recursive split.", code: "def mergeSort(arr) {\n  if(len(arr) <= 1) return arr;\n  mid = Math.floor(len(arr)/2);\n  return merge(mergeSort(arr.slice(0,mid)), mergeSort(arr.slice(mid)));\n}" }
    ],
      biteSized: {
                    meaning: "A fundamental concept.",
                    funnyEgTamil: "Merge sort is like sorting laundry, except instead of folding, you're just combining piles until it's all tidy"
                  }
},
    {"id":210,"chapter":"Chapter 10: Advanced Algorithms","tier":"Expert","title":"Quick Sort","sticker":"🧠","codeExample":"print(\"Expert\")","miniQuizQuestion":{"question":"Is this an expert topic?","options":["Yes","No","Maybe","I don't know"],"correctAnswerIndex":0},"examples":[{"explanation":"Example","code":"console.log('Run');"}],"verificationChecks":[{"type":"requires_syntax","pattern":"console","expectedMessage":"Just log it"}],"biteSized":{"meaning":"Advanced algorithm concept.","funnyEgTamil":"Sivaji padathula vara laptop hacker scenes maari puriyadha oru logic!"},"gifKeyword":"success meme"},
    {"id":211,"chapter":"Chapter 10: Advanced Algorithms","tier":"Expert","title":"Advanced Recursion","sticker":"🧠","codeExample":"print(\"Expert\")","miniQuizQuestion":{"question":"Is this an expert topic?","options":["Yes","No","Maybe","I don't know"],"correctAnswerIndex":0},"examples":[{"explanation":"Example","code":"console.log('Run');"}],"verificationChecks":[{"type":"requires_syntax","pattern":"console","expectedMessage":"Just log it"}],"biteSized":{"meaning":"Advanced algorithm concept.","funnyEgTamil":"Sivaji padathula vara laptop hacker scenes maari puriyadha oru logic!"},"gifKeyword":"success meme"},
    {"id":212,"chapter":"Chapter 10: Advanced Algorithms","tier":"Expert","title":"N-Queens Problem","sticker":"🧠","codeExample":"print(\"Expert\")","miniQuizQuestion":{"question":"Is this an expert topic?","options":["Yes","No","Maybe","I don't know"],"correctAnswerIndex":0},"examples":[{"explanation":"Example","code":"console.log('Run');"}],"verificationChecks":[{"type":"requires_syntax","pattern":"console","expectedMessage":"Just log it"}],"biteSized":{"meaning":"Advanced algorithm concept.","funnyEgTamil":"Sivaji padathula vara laptop hacker scenes maari puriyadha oru logic!"},"gifKeyword":"success meme"},
    {"id":213,"chapter":"Chapter 10: Advanced Algorithms","tier":"Expert","title":"Heaps & Priority Queues","sticker":"🧠","codeExample":"print(\"Expert\")","miniQuizQuestion":{"question":"Is this an expert topic?","options":["Yes","No","Maybe","I don't know"],"correctAnswerIndex":0},"examples":[{"explanation":"Example","code":"console.log('Run');"}],"verificationChecks":[{"type":"requires_syntax","pattern":"console","expectedMessage":"Just log it"}],"biteSized":{"meaning":"Advanced algorithm concept.","funnyEgTamil":"Sivaji padathula vara laptop hacker scenes maari puriyadha oru logic!"},"gifKeyword":"success meme"},
    {"id":214,"chapter":"Chapter 10: Advanced Algorithms","tier":"Expert","title":"Heap Sort","sticker":"🧠","codeExample":"print(\"Expert\")","miniQuizQuestion":{"question":"Is this an expert topic?","options":["Yes","No","Maybe","I don't know"],"correctAnswerIndex":0},"examples":[{"explanation":"Example","code":"console.log('Run');"}],"verificationChecks":[{"type":"requires_syntax","pattern":"console","expectedMessage":"Just log it"}],"biteSized":{"meaning":"Advanced algorithm concept.","funnyEgTamil":"Sivaji padathula vara laptop hacker scenes maari puriyadha oru logic!"},"gifKeyword":"success meme"},
    {"id":215,"chapter":"Chapter 10: Advanced Algorithms","tier":"Expert","title":"Tries (Prefix Trees)","sticker":"🧠","codeExample":"print(\"Expert\")","miniQuizQuestion":{"question":"Is this an expert topic?","options":["Yes","No","Maybe","I don't know"],"correctAnswerIndex":0},"examples":[{"explanation":"Example","code":"console.log('Run');"}],"verificationChecks":[{"type":"requires_syntax","pattern":"console","expectedMessage":"Just log it"}],"biteSized":{"meaning":"Advanced algorithm concept.","funnyEgTamil":"Sivaji padathula vara laptop hacker scenes maari puriyadha oru logic!"},"gifKeyword":"success meme"},
    {"id":216,"chapter":"Chapter 10: Advanced Algorithms","tier":"Expert","title":"DP: 1D","sticker":"🧠","codeExample":"print(\"Expert\")","miniQuizQuestion":{"question":"Is this an expert topic?","options":["Yes","No","Maybe","I don't know"],"correctAnswerIndex":0},"examples":[{"explanation":"Example","code":"console.log('Run');"}],"verificationChecks":[{"type":"requires_syntax","pattern":"console","expectedMessage":"Just log it"}],"biteSized":{"meaning":"Advanced algorithm concept.","funnyEgTamil":"Sivaji padathula vara laptop hacker scenes maari puriyadha oru logic!"},"gifKeyword":"success meme"},
    {"id":217,"chapter":"Chapter 10: Advanced Algorithms","tier":"Expert","title":"DP: 2D","sticker":"🧠","codeExample":"print(\"Expert\")","miniQuizQuestion":{"question":"Is this an expert topic?","options":["Yes","No","Maybe","I don't know"],"correctAnswerIndex":0},"examples":[{"explanation":"Example","code":"console.log('Run');"}],"verificationChecks":[{"type":"requires_syntax","pattern":"console","expectedMessage":"Just log it"}],"biteSized":{"meaning":"Advanced algorithm concept.","funnyEgTamil":"Sivaji padathula vara laptop hacker scenes maari puriyadha oru logic!"},"gifKeyword":"success meme"},
    {"id":218,"chapter":"Chapter 10: Advanced Algorithms","tier":"Expert","title":"DP: LCS","sticker":"🧠","codeExample":"print(\"Expert\")","miniQuizQuestion":{"question":"Is this an expert topic?","options":["Yes","No","Maybe","I don't know"],"correctAnswerIndex":0},"examples":[{"explanation":"Example","code":"console.log('Run');"}],"verificationChecks":[{"type":"requires_syntax","pattern":"console","expectedMessage":"Just log it"}],"biteSized":{"meaning":"Advanced algorithm concept.","funnyEgTamil":"Sivaji padathula vara laptop hacker scenes maari puriyadha oru logic!"},"gifKeyword":"success meme"},
    {"id":219,"chapter":"Chapter 10: Advanced Algorithms","tier":"Expert","title":"Graphs: Dijkstra","sticker":"🧠","codeExample":"print(\"Expert\")","miniQuizQuestion":{"question":"Is this an expert topic?","options":["Yes","No","Maybe","I don't know"],"correctAnswerIndex":0},"examples":[{"explanation":"Example","code":"console.log('Run');"}],"verificationChecks":[{"type":"requires_syntax","pattern":"console","expectedMessage":"Just log it"}],"biteSized":{"meaning":"Advanced algorithm concept.","funnyEgTamil":"Sivaji padathula vara laptop hacker scenes maari puriyadha oru logic!"},"gifKeyword":"success meme"},
    {"id":220,"chapter":"Chapter 10: Advanced Algorithms","tier":"Expert","title":"Graphs: Topo Sort","sticker":"🧠","codeExample":"print(\"Expert\")","miniQuizQuestion":{"question":"Is this an expert topic?","options":["Yes","No","Maybe","I don't know"],"correctAnswerIndex":0},"examples":[{"explanation":"Example","code":"console.log('Run');"}],"verificationChecks":[{"type":"requires_syntax","pattern":"console","expectedMessage":"Just log it"}],"biteSized":{"meaning":"Advanced algorithm concept.","funnyEgTamil":"Sivaji padathula vara laptop hacker scenes maari puriyadha oru logic!"},"gifKeyword":"success meme"},
    {"id":221,"chapter":"Chapter 10: Advanced Algorithms","tier":"Expert","title":"Disjoint Set","sticker":"🧠","codeExample":"print(\"Expert\")","miniQuizQuestion":{"question":"Is this an expert topic?","options":["Yes","No","Maybe","I don't know"],"correctAnswerIndex":0},"examples":[{"explanation":"Example","code":"console.log('Run');"}],"verificationChecks":[{"type":"requires_syntax","pattern":"console","expectedMessage":"Just log it"}],"biteSized":{"meaning":"Advanced algorithm concept.","funnyEgTamil":"Sivaji padathula vara laptop hacker scenes maari puriyadha oru logic!"},"gifKeyword":"success meme"},
    {"id":222,"chapter":"Chapter 10: Advanced Algorithms","tier":"Expert","title":"Minimum Spanning Trees","sticker":"🧠","codeExample":"print(\"Expert\")","miniQuizQuestion":{"question":"Is this an expert topic?","options":["Yes","No","Maybe","I don't know"],"correctAnswerIndex":0},"examples":[{"explanation":"Example","code":"console.log('Run');"}],"verificationChecks":[{"type":"requires_syntax","pattern":"console","expectedMessage":"Just log it"}],"biteSized":{"meaning":"Advanced algorithm concept.","funnyEgTamil":"Sivaji padathula vara laptop hacker scenes maari puriyadha oru logic!"},"gifKeyword":"success meme"},
    {"id":223,"chapter":"Chapter 10: Advanced Algorithms","tier":"Expert","title":"Advanced Sliding Window","sticker":"🧠","codeExample":"print(\"Expert\")","miniQuizQuestion":{"question":"Is this an expert topic?","options":["Yes","No","Maybe","I don't know"],"correctAnswerIndex":0},"examples":[{"explanation":"Example","code":"console.log('Run');"}],"verificationChecks":[{"type":"requires_syntax","pattern":"console","expectedMessage":"Just log it"}],"biteSized":{"meaning":"Advanced algorithm concept.","funnyEgTamil":"Sivaji padathula vara laptop hacker scenes maari puriyadha oru logic!"},"gifKeyword":"success meme"},
    {"id":224,"chapter":"Chapter 10: Advanced Algorithms","tier":"Expert","title":"Advanced Bit Manipulation","sticker":"🧠","codeExample":"print(\"Expert\")","miniQuizQuestion":{"question":"Is this an expert topic?","options":["Yes","No","Maybe","I don't know"],"correctAnswerIndex":0},"examples":[{"explanation":"Example","code":"console.log('Run');"}],"verificationChecks":[{"type":"requires_syntax","pattern":"console","expectedMessage":"Just log it"}],"biteSized":{"meaning":"Advanced algorithm concept.","funnyEgTamil":"Sivaji padathula vara laptop hacker scenes maari puriyadha oru logic!"},"gifKeyword":"success meme"}
];
