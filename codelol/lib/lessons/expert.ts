import { Lesson } from './types';

export const expertLessons: Lesson[] = [
  {
    id: 201,
    chapter: "Chapter 1: Trees",
    tier: "Expert",
    title: "Binary Trees",
    sticker: "🌲",
    funnyExplanation: "A Binary Tree is like a family tree, except everyone is strictly allowed exactly two children. No exceptions. It's a very rigid, weird society. Node has a left child and a right child.",
    codeExample: "class TreeNode {\n  constructor(val) {\n    this.val = val;\n    this.left = null;\n    this.right = null;\n  }\n}",
    gifKeyword: "family tree branches",
    miniQuizQuestion: {
      question: "In a Binary Tree, what is a node with NO children called?",
      options: ["A root", "A leaf", "A stump", "A branch"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "Building a tiny tree.", code: "let root = new TreeNode(10);\nroot.left = new TreeNode(5);\nroot.right = new TreeNode(15);" }
    ]
  },
  {
    id: 202,
    chapter: "Chapter 1: Trees",
    tier: "Expert",
    title: "Binary Search Trees (BST)",
    sticker: "🔍",
    funnyExplanation: "A BST is a Binary Tree for control freaks. Everything smaller than the parent MUST go left. Everything bigger MUST go right. Searching for a number is like playing 'Higher or Lower'.",
    codeExample: "function searchBST(root, val) {\n  if (!root) return null;\n  if (root.val === val) return root;\n  if (val < root.val) return searchBST(root.left, val);\n  return searchBST(root.right, val);\n}",
    gifKeyword: "guessing higher lower",
    miniQuizQuestion: {
      question: "In a valid BST, where would a number smaller than the root go?",
      options: ["To the right subtree", "To the left subtree", "It replaces the root", "It goes in the trash"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "BST Lookup is O(log n)... IF the tree is balanced.", code: "let foundNode = searchBST(root, 42);" }
    ]
  },
  {
    id: 203,
    chapter: "Chapter 1: Trees",
    tier: "Expert",
    title: "Depth First Search (DFS)",
    sticker: "🤿",
    funnyExplanation: "DFS means diving as deep as humanly possible down one branch until you hit a dead end, then backing up. It's the 'explore one cave tunnel entirely before checking the others' strategy.",
    codeExample: "function dfs(node) {\n  if (!node) return;\n  console.log(node.val); // Pre-order\n  dfs(node.left);\n  dfs(node.right);\n}",
    gifKeyword: "scuba diving deep",
    miniQuizQuestion: {
      question: "Which data structure is naturally used by DFS underneath the hood (often via recursion)?",
      options: ["Queue", "Hash Map", "Stack (Call Stack)", "Array"],
      correctAnswerIndex: 2
    },
    examples: [
      { explanation: "In-order traversal (prints BST in sorted order!).", code: "function inOrder(node) {\n  if (!node) return;\n  inOrder(node.left);\n  console.log(node.val);\n  inOrder(node.right);\n}" }
    ]
  },
  {
    id: 204,
    chapter: "Chapter 1: Trees",
    tier: "Expert",
    title: "Breadth First Search (BFS)",
    sticker: "🌊",
    funnyExplanation: "BFS checks everything on level 1, then everything on level 2, like a slowly rising flood. It guarantees finding the shortest path, but uses a lot of memory.",
    codeExample: "function bfs(root) {\n  let queue = [root];\n  while(queue.length) {\n    let node = queue.shift(); // Dequeue\n    console.log(node.val);\n    if (node.left) queue.push(node.left);\n    if (node.right) queue.push(node.right);\n  }\n}",
    gifKeyword: "water flood rising",
    miniQuizQuestion: {
      question: "Which data structure is REQUIRED to implement BFS iteratively?",
      options: ["Stack", "Queue", "Tree", "Graph"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "Level order traversal using a queue.", code: "let q = [root];\n// process nodes level by level..." }
    ]
  },
  {
    id: 205,
    chapter: "Chapter 2: Graphs",
    tier: "Expert",
    title: "Graph Basics",
    sticker: "🕸️",
    funnyExplanation: "A Graph is just a bunch of dots (nodes/vertices) connected by lines (edges). It's literally Facebook: You are a node, your friends are connected nodes. If you have no friends, you are an 'isolated vertex'. Sad.",
    codeExample: "// Adjacency List\nconst graph = {\n  'Alice': ['Bob', 'Charlie'],\n  'Bob': ['Alice'],\n  'Charlie': ['Alice']\n};",
    gifKeyword: "spider web connected",
    miniQuizQuestion: {
      question: "What is the most common way to represent a graph in JavaScript?",
      options: ["A Binary Tree", "An Adjacency List (Object/Map)", "A 1D Array", "A String"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "Adding an edge (undirected).", code: "function addEdge(g, u, v) {\n  g[u].push(v);\n  g[v].push(u);\n}" }
    ]
  },
  {
    id: 206,
    chapter: "Chapter 2: Graphs",
    tier: "Expert",
    title: "Graph Traversal",
    sticker: "🧭",
    funnyExplanation: "Traversing a graph is like walking a maze. BUT graphs can have cycles (loops). If you don't keep a list of 'visited' nodes, you will walk in circles forever until the browser crashes.",
    codeExample: "let visited = new Set();\nfunction dfsGraph(node) {\n  if (visited.has(node)) return;\n  visited.add(node);\n  console.log(node);\n  for (let neighbor of graph[node]) dfsGraph(neighbor);\n}",
    gifKeyword: "walking in circles lost",
    miniQuizQuestion: {
      question: "Why is a `visited` Set crucial when traversing a Graph?",
      options: ["To make it faster", "To prevent infinite loops from cycles", "To save memory", "Because JavaScript requires it"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "BFS on a Graph.", code: "let q = [startNode];\nvisited.add(startNode);\nwhile(q.length) {\n  let curr = q.shift();\n  // add unvisited neighbors to queue\n}" }
    ]
  },
  {
    id: 207,
    chapter: "Chapter 3: Dynamic Programming",
    tier: "Expert",
    title: "Memoization (Top-Down)",
    sticker: "🧠",
    funnyExplanation: "Memoization is just writing down the answers so you don't have to do math again. If I ask you 100 * 100, you calculate 10,000. If I ask you again a second later, you don't calculate it, you just remember it. That's DP.",
    codeExample: "let memo = {};\nfunction fib(n) {\n  if (n <= 1) return n;\n  if (memo[n]) return memo[n]; // Oh yeah, I know this!\n  memo[n] = fib(n-1) + fib(n-2);\n  return memo[n];\n}",
    gifKeyword: "remembering writing notes",
    miniQuizQuestion: {
      question: "What is the primary purpose of memoization?",
      options: ["To write cleaner code", "To cache expensive function calls", "To reduce memory usage", "To sort arrays"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "Fibonacci goes from O(2^n) to O(n) just by adding a cache object!", code: "// Without memo: runs forever for fib(50)\n// With memo: instant!" }
    ]
  },
  {
    id: 208,
    chapter: "Chapter 3: Dynamic Programming",
    tier: "Expert",
    title: "Tabulation (Bottom-Up)",
    sticker: "📊",
    funnyExplanation: "Tabulation is DP without recursion. Instead of starting at the end and asking 'what were the previous answers?', you start at 0 and build a giant table of answers until you reach the end. No call stack limits!",
    codeExample: "function fib(n) {\n  let dp = [0, 1];\n  for(let i = 2; i <= n; i++) {\n    dp[i] = dp[i-1] + dp[i-2];\n  }\n  return dp[n];\n}",
    gifKeyword: "filling excel spreadsheet",
    miniQuizQuestion: {
      question: "Which approach uses iteration (loops) instead of recursion?",
      options: ["Memoization", "Tabulation", "DFS", "Backtracking"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "Building an array of results from the ground up.", code: "let dp = new Array(n+1).fill(0);\n// populate dp array" }
    ]
  },
  {
    id: 209,
    chapter: "Chapter 4: Advanced Sorting",
    tier: "Expert",
    title: "Merge Sort",
    sticker: "🗂️",
    funnyExplanation: "Merge sort splits an array in half until it's just single items, then zippers them back together in order. It's the 'divide and conquer' method that always takes exactly O(n log n) time.",
    codeExample: "function merge(left, right) {\n  let res = [];\n  while(left.length && right.length) {\n    if(left[0] < right[0]) res.push(left.shift());\n    else res.push(right.shift());\n  }\n  return [...res, ...left, ...right];\n}",
    gifKeyword: "zipper merging zipper",
    miniQuizQuestion: {
      question: "What is the Time Complexity of Merge Sort?",
      options: ["O(n^2)", "O(n)", "O(n log n)", "O(1)"],
      correctAnswerIndex: 2
    },
    examples: [
      { explanation: "The recursive split.", code: "function mergeSort(arr) {\n  if(arr.length <= 1) return arr;\n  let mid = Math.floor(arr.length/2);\n  return merge(mergeSort(arr.slice(0,mid)), mergeSort(arr.slice(mid)));\n}" }
    ]
  }
];
