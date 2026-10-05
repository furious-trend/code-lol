import { Lesson } from './types';

export const pythonIntermediateLessons: Lesson[] = [
  {
    id: 101,
    chapter: "Chapter 1: The Big O",
    tier: "Intermediate",
    title: "Time Complexity",
    sticker: "⏱️",
    codeExample: "# O(1) - Instant\ndef get_first(arr):\n    return arr[0]\n\n# O(n) - Linear (Depends on size)\ndef log_all(arr):\n    for x in arr:\n        print(x)",
    gifKeyword: "why is this happening",
    miniQuizQuestion: {
      question: "If an algorithm takes longer to run proportionally to the exact size of the input, what is its Time Complexity?",
      options: ["O(1)", "O(n)", "O(n^2)", "O(log n)"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "O(1) Constant Time. It takes the same amount of time no matter how big the input is.", code: "arr = [1, 2, 3, 4, 5]\nprint(arr[0])" },
      { explanation: "O(n) Linear Time. You have to check every single item.", code: "items = ['A', 'B', 'C']\nfor item in items:\n    print(item)" }
    ],
    biteSized: {
      meaning: "A fundamental concept.",
      funnyEgTamil: "Time complexity is like rush hour traffic—you think you're making progress, but you're actually just moving in slow motion",
      meaningGeneral: "How the runtime of an algorithm grows as the input size grows.",
      funnyEgGeneral: "Time complexity is like the DMV line—you think it's fast until 50 more people walk in."
    }
  },
  {
    id: 102,
    chapter: "Chapter 1: The Big O",
    tier: "Intermediate",
    title: "Space Complexity",
    sticker: "💾",
    codeExample: "# O(1) Space - Using a single variable\ntotal = 0\n\n# O(n) Space - Creating a list based on input\nnew_arr = [x * 2 for x in original_arr]",
    gifKeyword: "screaming internally",
    miniQuizQuestion: {
      question: "If your function creates a list that is the exact same size as the input list, what is its Space Complexity?",
      options: ["O(1)", "O(n)", "O(n^2)", "O(infinity)"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "O(1) Space. You're just storing a couple of numbers, regardless of input size.", code: "total = 0\nfor num in nums:\n    total += num" },
      { explanation: "O(n) Space. You're building a massive data structure in memory.", code: "copies = []\nfor num in nums:\n    copies.append(num)" }
    ],
    biteSized: {
      meaning: "A fundamental concept.",
      funnyEgTamil: "Space complexity is like your phone storage—you think you have enough until you download one more app",
      meaningGeneral: "How much extra memory an algorithm needs as the input grows.",
      funnyEgGeneral: "Space complexity is like your phone storage—you think you have plenty until you take one more video."
    }
  },
  {
    id: 103,
    chapter: "Chapter 2: Two Pointers & Sliding Window",
    tier: "Intermediate",
    title: "Two Pointers",
    sticker: "✌️",
    codeExample: "left = 0\nright = len(arr) - 1\nwhile left < right:\n    # Do something smart\n    left += 1\n    right -= 1",
    gifKeyword: "this is fine fire",
    miniQuizQuestion: {
      question: "In the Two Pointer technique, where do the pointers usually start for an array?",
      options: ["Both at index 0", "One at start, one at end", "Both in the middle", "At random indexes"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "Reversing a list using two pointers.", code: "arr = [1, 2, 3]\nl, r = 0, len(arr) - 1\nwhile l < r:\n    arr[l], arr[r] = arr[r], arr[l]\n    l += 1\n    r -= 1" }
    ],
    biteSized: {
      meaning: "A fundamental concept.",
      funnyEgTamil: "Two Pointers is like trying to get two WiFi signals to connect at the same time—you think it's a good idea until it gets complicated",
      meaningGeneral: "Using two indices to traverse a data structure efficiently.",
      funnyEgGeneral: "Two Pointers is like trying to read a book from both ends to finish it faster."
    }
  },
  {
    id: 105,
    chapter: "Chapter 3: Hash Maps & Sets",
    tier: "Intermediate",
    title: "Hash Maps (Dictionaries)",
    sticker: "🗺️",
    codeExample: "hash_map = {}\nhash_map['Shafiq'] = 'Cool Guy'\nprint(hash_map.get('Shafiq')) # O(1) Instant lookup!",
    gifKeyword: "why is this happening",
    miniQuizQuestion: {
      question: "What is the time complexity of looking up a value by its key in a Hash Map (Dictionary)?",
      options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
      correctAnswerIndex: 0
    },
    examples: [
      { explanation: "Using a dict to count frequencies.", code: "frequencies = {}\nfrequencies['apple'] = frequencies.get('apple', 0) + 1" }
    ],
    biteSized: {
      meaning: "Key-value data packet.",
      funnyEgTamil: "Contractor biodata: { name: \"Nesamani\", weakness: \"Spanner\" }.",
      meaningGeneral: "A data structure that stores key-value pairs for instant lookups.",
      funnyEgGeneral: "Hash maps are like a coat check—give them a ticket (key), get your coat (value) instantly."
    }
  },
  {
    id: 111,
    chapter: "Chapter 6: Recursion",
    tier: "Intermediate",
    title: "Intro to Recursion",
    sticker: "🪞",
    codeExample: "def inception(n):\n    if n == 0:\n        return 'Wake up!' # Base case\n    return inception(n - 1)",
    gifKeyword: "mind blown",
    miniQuizQuestion: {
      question: "What is the crucial part of a recursive function that stops it from running forever?",
      options: ["The return keyword", "The Base Case", "A break statement", "Ctrl+C"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "Factorial function using recursion.", code: "def factorial(n):\n    if n == 1:\n        return 1\n    return n * factorial(n - 1)" }
    ],
    biteSized: {
      meaning: "A fundamental concept.",
      funnyEgTamil: "Recursion is like your phone autocorrect—it keeps calling itself to fix the same mistake, but makes it worse",
      meaningGeneral: "A function that calls itself until it reaches a stopping point.",
      funnyEgGeneral: "Recursion is like putting two mirrors face-to-face—it goes on forever until someone breaks one."
    }
  },
  {
    id: 113,
    chapter: "Chapter 7: Object-Oriented Programming (OOP)",
    tier: "Intermediate",
    title: "Classes & Instances",
    sticker: "🏗️",
    codeExample: "class Car:\n    def drive(self):\n        print('Vroom!')\n\nmy_car = Car() # my_car is the Instance!\nmy_car.drive()",
    gifKeyword: "why is this happening",
    miniQuizQuestion: {
      question: "How do you create an instance of a Class in Python?",
      options: ["create Car()", "build Car()", "new Car()", "Car()"],
      correctAnswerIndex: 3
    },
    examples: [
      { explanation: "Defining a class and instantiating it.", code: "class Dog:\n    def bark(self):\n        print('Woof')\n\nfido = Dog()\nfido.bark()" }
    ],
    biteSized: {
      meaning: "A fundamental concept.",
      funnyEgTamil: "Classes are like restaurant menus, instances are meals—each meal is a unique version of the same menu item",
      meaningGeneral: "A class is a blueprint, an instance is an object built from it.",
      funnyEgGeneral: "Classes are like cookie cutters; instances are the actual cookies."
    }
  }
];
