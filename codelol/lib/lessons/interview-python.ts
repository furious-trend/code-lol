// agent-notes: { ctx: "Interview Python lessons with pure Python syntax and humor", deps: ["./types"], state: active, last: "sato@2026-10-12" }
import { Lesson } from "./types";

export const pythonInterviewLessons: Lesson[] = [
  {
    id: 31,
    chapter: "Chapter 12: Algorithmic Thinking",
    tier: "Interview",
    title: "Two Pointers Technique",
    sticker: "🎯",
    codeExample: "def is_palindrome(text):\n    left, right = 0, len(text) - 1\n    while left < right:\n        if text[left] != text[right]:\n            return False\n        left += 1\n        right -= 1\n    return True\n\nword = \"racecar\"\nprint(f\"{word} is palindrome: {is_palindrome(word)}\")",
    expectedOutput: "racecar is palindrome: True",
    gifKeyword: "laser focus",
    miniQuizQuestion: {
      question: "What is the time complexity of checking a palindrome using two pointers?",
      options: ["O(N^2)", "O(N)", "O(log N)", "O(1)"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "String slicing shortcut", code: "def fast_check(s):\n    return s == s[::-1]\nprint(fast_check(\"malayalam\"))" }
    ],
    verificationChecks: [
      {
        type: "requires_syntax",
        pattern: "while\\s+.*<.*:",
        expectedMessage: "Use a two-pointer while loop comparing indices."
      }
    ],
    biteSized: {
      meaning: "Two pointers move toward each other to solve array and string interview problems in O(N) time.",
      meaningGeneral: "Efficient linear time approach for string validation, reversing, and target sum searches.",
      funnyEgTamil: "Interview-la O(N^2) pottu interviewer kitta adi vaangama, two pointers pottu offer letter vaanguda!",
      funnyEgGeneral: "Stop using nested loops in interviews. Two pointers turns O(N^2) shame into O(N) glory."
    },
    workoutSteps: [
      {
        title: "Step 1: Set Pointers",
        explanation: "Initialize left at 0, right at len - 1.",
        code: "left, right = 0, len(s) - 1",
        lineExplanation: "Shrink boundary every iteration.",
        memeNote: "Two pointers flex."
      }
    ]
  },
  {
    id: 32,
    chapter: "Chapter 13: Data Structures",
    tier: "Interview",
    title: "Frequency Counting with Counter",
    sticker: "🧮",
    codeExample: "from collections import Counter\n\nitems = [\"tea\", \"vada\", \"tea\", \"bonda\", \"tea\", \"vada\"]\ncounts = Counter(items)\nprint(\"Most common item:\", counts.most_common(1)[0][0])",
    expectedOutput: "Most common item: tea",
    gifKeyword: "counting money",
    miniQuizQuestion: {
      question: "From which built-in module is Counter imported?",
      options: ["itertools", "collections", "functools", "math"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "Count character frequencies", code: "from collections import Counter\nprint(Counter(\"mississippi\"))" }
    ],
    verificationChecks: [
      {
        type: "requires_syntax",
        pattern: "from\\s+collections\\s+import\\s+Counter",
        expectedMessage: "Import Counter from Python collections module."
      }
    ],
    biteSized: {
      meaning: "Counter counts element occurrences in an iterable in O(N) time with clean hash-map syntax.",
      meaningGeneral: "A dictionary subclass for counting hashable items.",
      funnyEgTamil: "Tea kada bill podra maari, evlo tea evlo vada nu oru second-la count panni kudukkum!",
      funnyEgGeneral: "Never write manual count loops again. Counter is your best friend in coding rounds."
    },
    workoutSteps: [
      {
        title: "Step 1: Import Counter",
        explanation: "from collections import Counter",
        code: "from collections import Counter",
        lineExplanation: "Fast hashing utility.",
        memeNote: "Standard library power."
      }
    ]
  },
  {
    id: 33,
    chapter: "Chapter 14: Search Algorithms",
    tier: "Interview",
    title: "Binary Search",
    sticker: "🔍",
    codeExample: "def binary_search(arr, target):\n    low, high = 0, len(arr) - 1\n    while low <= high:\n        mid = (low + high) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            low = mid + 1\n        else:\n            high = mid - 1\n    return -1\n\nnums = [2, 5, 8, 12, 16, 23, 38]\nprint(\"Target found at index:\", binary_search(nums, 16))",
    expectedOutput: "Target found at index: 4",
    gifKeyword: "search detective",
    miniQuizQuestion: {
      question: "What is the prerequisite for running binary search on an array?",
      options: ["Must contain unique elements", "Must be sorted", "Must be positive integers", "Must have odd length"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "Python standard bisect", code: "import bisect\nidx = bisect.bisect_left([1, 3, 5, 7], 5)\nprint(idx)" }
    ],
    verificationChecks: [
      {
        type: "requires_syntax",
        pattern: "while\\s+low\\s*<=\\s*high:",
        expectedMessage: "Implement the standard binary search while low <= high loop."
      }
    ],
    biteSized: {
      meaning: "Binary search cuts search space in half each step. Logarithmic O(log N) speed on sorted data.",
      meaningGeneral: "Divides sorted arrays into halves to find target elements with lightning O(log N) speed.",
      funnyEgTamil: "Phone book-la name thedra maari, nadula thirandhu thirandhu pathu oru second-la kandupidichudalam!",
      funnyEgGeneral: "Don not search one by one. Cut it in half and conquer in O(log N) steps."
    },
    workoutSteps: [
      {
        title: "Step 1: Compute Midpoint",
        explanation: "Use integer division // to find mid.",
        code: "mid = (low + high) // 2",
        lineExplanation: "Avoids float indices.",
        memeNote: "Half and half."
      }
    ]
  }
];
