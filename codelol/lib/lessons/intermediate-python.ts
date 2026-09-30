import { Lesson } from './types';

export const pythonIntermediateLessons: Lesson[] = [
  {
    id: 101,
    chapter: "Chapter 1: The Big O",
    tier: "Intermediate",
    title: "Time Complexity",
    sticker: "⏱️",
    funnyExplanationGeneral: "Time complexity is like rush hour traffic—you think you're making progress, but you're actually just moving in slow motion",
    funnyExplanationTamil: "Time complexity is like rush hour traffic—you think you're making progress, but you're actually just moving in slow motion",
    codeExample: "# O(1) - Instant\ndef getFirst(arr) { return arr[0]; }\n\n# O(n) - Linear (Depends on size)\ndef logAll(arr) { arr.forEach(x => print(x)); }",
    gifKeyword: "why is this happening",
    miniQuizQuestion: {
      question: "If an algorithm takes longer to run proportionally to the exact size of the input, what is its Time Complexity?",
      options: ["O(1)", "O(n)", "O(n^2)", "O(log n)"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "O(1) Constant Time. It takes the same amount of time no matter how big the input is.", code: "arr = [1, 2, 3, 4, 5];\nprint(arr[0]);" },
      { explanation: "O(n) Linear Time. You have to check every single item.", code: "items = ['A', 'B', 'C'];\nfor(i=0; i<len(items); i++) {\n  print(items[i]);\n}" }
    ]
  },
  {
    id: 102,
    chapter: "Chapter 1: The Big O",
    tier: "Intermediate",
    title: "Space Complexity",
    sticker: "💾",
    funnyExplanationGeneral: "Space complexity is like your phone storage—you think you have enough until you download one more app",
    funnyExplanationTamil: "Space complexity is like your phone storage—you think you have enough until you download one more app",
    codeExample: "# O(1) Space - Using a single variable\nsum = 0;\n\n# O(n) Space - Creating a array based on input\nnewArr = originalArr.map(x => x * 2);",
    gifKeyword: "screaming internally",
    miniQuizQuestion: {
      question: "If your def creates a array that is the exact same size as the input array, what is its Space Complexity?",
      options: ["O(1)", "O(n)", "O(n^2)", "O(infinity)"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "O(1) Space. You're just storing a couple of numbers, regardless of input size.", code: "total = 0;\nfor (i = 0; i < len(nums); i++) {\n  total += nums[i];\n}" },
      { explanation: "O(n) Space. You're building a massive data structure in memory.", code: "copies = [];\nfor (i = 0; i < len(nums); i++) {\n  copies.append(nums[i]);\n}" }
    ]
  },
  {
    id: 103,
    chapter: "Chapter 2: Two Pointers & Sliding Window",
    tier: "Intermediate",
    title: "Two Pointers",
    sticker: "✌️",
    funnyExplanationGeneral: "Two Pointers is like trying to get two WiFi signals to connect at the same time—you think it's a good idea until it gets complicated",
    funnyExplanationTamil: "Two Pointers is like trying to get two WiFi signals to connect at the same time—you think it's a good idea until it gets complicated",
    codeExample: "left = 0;\nright = len(arr) - 1;\nwhile(left < right) {\n  # Do something smart\n  left++; right--;\n}",
    gifKeyword: "this is fine fire",
    miniQuizQuestion: {
      question: "In the Two Pointer technique, where do the pointers usually start for an array?",
      options: ["Both at index 0", "One at start, one at end", "Both in the middle", "At random indexes"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "Reversing an array using two pointers.", code: "arr = [1, 2, 3];\nl = 0, r = len(arr) - 1;\nwhile(l < r) {\n  temp = arr[l];\n  arr[l] = arr[r];\n  arr[r] = temp;\n  l++; r--;\n}" },
      { explanation: "Finding a pair that sums to a target (in a sorted array).", code: "while(l < r) {\n  sum = arr[l] + arr[r];\n  if (sum == target) return True;\n  if (sum < target) l++; else r--;\n}" }
    ]
  },
  {
    id: 104,
    chapter: "Chapter 2: Two Pointers & Sliding Window",
    tier: "Intermediate",
    title: "Sliding Window",
    sticker: "🪟",
    funnyExplanationGeneral: "Sliding Window is like your phone's WiFi range—you move a bit too far and everything just drops",
    funnyExplanationTamil: "Sliding Window is like your phone's WiFi range—you move a bit too far and everything just drops",
    codeExample: "windowSum = 0;\n# Add first k elements\nfor(i=0; i<k; i++) windowSum += arr[i];\n# Slide the window\nfor(i=k; i<len(arr); i++) {\n  windowSum += arr[i] - arr[i-k];\n}",
    gifKeyword: "why is this happening",
    miniQuizQuestion: {
      question: "What is the primary benefit of the Sliding Window technique?",
      options: ["It makes the array smaller", "It avoids nested loops (O(n^2)) by reusing previous work", "It sorts the array automatically", "It looks cool on a resume"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "Finding the maximum sum of a subarray of size K.", code: "max = sum;\nfor (i = k; i < len(arr); i++) {\n  sum = sum - arr[i-k] + arr[i];\n  max = max(max, sum);\n}" }
    ]
  },
  {
    id: 105,
    chapter: "Chapter 3: Hash Maps & Sets",
    tier: "Intermediate",
    title: "Hash Maps (Objects)",
    sticker: "🗺️",
    funnyExplanationGeneral: "Hash Maps are like phone contacts—you think you're organized, but duplicates always sneak in and cause chaos",
    funnyExplanationTamil: "Hash Maps are like phone contacts—you think you're organized, but duplicates always sneak in and cause chaos",
    codeExample: "map = {};\nmap.update('Shafiq', 'Cool Guy');\nprint(map.get('Shafiq')); # O(1) Instant lookup!",
    gifKeyword: "why is this happening",
    miniQuizQuestion: {
      question: "What is the time complexity of looking up a value by its key in a Hash Map?",
      options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
      correctAnswerIndex: 0
    },
    examples: [
      { explanation: "Using a plain object as a map.", code: "frequencies = {};\nfrequencies['apple'] = (frequencies['apple'] || 0) + 1;" },
      { explanation: "Using the ES6 Map class.", code: "m = {};\nm.update('key1', 'value1');\nprint(m.get('key1'));" }
    ]
  },
  {
    id: 106,
    chapter: "Chapter 3: Hash Maps & Sets",
    tier: "Intermediate",
    title: "Sets (Deduplication)",
    sticker: "🚫",
    funnyExplanationGeneral: "Sets are like your phone contacts – they automatically remove duplicates, so you don't have to deal with multiple versions of your mom",
    funnyExplanationTamil: "Sets are like your phone contacts – they automatically remove duplicates, so you don't have to deal with multiple versions of your mom",
    codeExample: "mySet = set([1, 2, 2, 3, 3, 3]);\nprint([...mySet]); # [1, 2, 3]",
    gifKeyword: "screaming internally",
    miniQuizQuestion: {
      question: "If you do `set([1, 1, 1, 2, 2])`, how many items are in the Set?",
      options: ["5", "3", "2", "0"],
      correctAnswerIndex: 2
    },
    examples: [
      { explanation: "Removing duplicates from an array instantly.", code: "arr = [5, 5, 5, 1, 2];\nuniqueArr = [...set(arr)];\nprint(uniqueArr);" },
      { explanation: "Checking for existence (O(1) time).", code: "s = set(['apple', 'banana']);\nprint(s.has('apple')); # True" }
    ]
  },
  {
    id: 107,
    chapter: "Chapter 4: Linked Lists",
    tier: "Intermediate",
    title: "Singly Linked Lists",
    sticker: "🔗",
    funnyExplanationGeneral: "Singly Linked Lists are like phone notifications—you can only delete them one by one, but they just keep coming",
    funnyExplanationTamil: "Singly Linked Lists are like phone notifications—you can only delete them one by one, but they just keep coming",
    codeExample: "class Node {\n  __init__(val) {\n    self.val = val;\n    self.next = None;\n  }\n}",
    gifKeyword: "why is this happening",
    miniQuizQuestion: {
      question: "What does the `next` property in a Singly Linked List Node do?",
      options: ["Goes back in time", "Points to the next node in the chain", "Stores the data value", "Deletes the list"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "Creating nodes.", code: "head = Node(1);\nsecond = Node(2);\nhead.next = second;" },
      { explanation: "Traversing a linked list.", code: "curr = head;\nwhile(curr != None) {\n  print(curr.val);\n  curr = curr.next;\n}" }
    ]
  },
  {
    id: 108,
    chapter: "Chapter 4: Linked Lists",
    tier: "Intermediate",
    title: "Fast & Slow Pointers (Tortoise & Hare)",
    sticker: "🐢",
    funnyExplanationGeneral: "Fast and slow pointers are like a tortoise and hare, where the fast one leaves the slow one in the dust, only to realize it's been going in circles",
    funnyExplanationTamil: "Fast and slow pointers are like a tortoise and hare, where the fast one leaves the slow one in the dust, only to realize it's been going in circles",
    codeExample: "slow = head, fast = head;\nwhile (fast && fast.next) {\n  slow = slow.next;\n  fast = fast.next.next;\n  if (slow == fast) return True; # CYCLE!\n}",
    gifKeyword: "mind blown",
    miniQuizQuestion: {
      question: "In the Tortoise and Hare algorithm, how many steps does the 'Hare' (fast pointer) take per loop?",
      options: ["1", "2", "3", "It teleports"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "Finding the middle of a linked list (when fast reaches the end, slow is exactly in the middle).", code: "while (fast && fast.next) {\n  slow = slow.next;\n  fast = fast.next.next;\n}\nreturn slow; # Middle node!" }
    ]
  },
  {
    id: 109,
    chapter: "Chapter 5: Stacks & Queues",
    tier: "Intermediate",
    title: "Stacks (LIFO)",
    sticker: "🥞",
    funnyExplanationGeneral: "Stacks are like phone notifications—you think you're done with the last one, but another pops up demanding attention",
    funnyExplanationTamil: "Stacks are like phone notifications—you think you're done with the last one, but another pops up demanding attention",
    codeExample: "stack = [];\nstack.append('Bottom');\nstack.append('Top');\nprint(stack.pop()); # 'Top' comes off first",
    gifKeyword: "why is this happening",
    miniQuizQuestion: {
      question: "What does LIFO stand for?",
      options: ["Look Inside First Object", "Last In, First Out", "Late Input, Fast Output", "Learn It For Once"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "Validating parentheses (classic stack problem).", code: "for (char of str) {\n  if (char == '(') stack.append(char);\n  else if (char == ')') stack.pop();\n}" }
    ]
  },
  {
    id: 110,
    chapter: "Chapter 5: Stacks & Queues",
    tier: "Intermediate",
    title: "Queues (FIFO)",
    sticker: "🚶",
    funnyExplanationGeneral: "Queues are like lines at the grocery store—you wait forever and then someone cuts in front of you",
    funnyExplanationTamil: "Queues are like lines at the grocery store—you wait forever and then someone cuts in front of you",
    codeExample: "queue = [];\nqueue.append('First Guy');\nqueue.append('Second Guy');\nprint(queue.pop(0)()); # First Guy gets served",
    gifKeyword: "why is this happening",
    miniQuizQuestion: {
      question: "Which array method is used to remove the FIRST item (dequeue) in JavaScript?",
      options: ["pop()", "push()", "shift()", "slice()"],
      correctAnswerIndex: 2
    },
    examples: [
      { explanation: "Enqueue (add) and Dequeue (remove).", code: "queue.append(1); # Enqueue\nfirst = queue.pop(0)(); # Dequeue" }
    ]
  },
  {
    id: 111,
    chapter: "Chapter 6: Recursion",
    tier: "Intermediate",
    title: "Intro to Recursion",
    sticker: "🪞",
    funnyExplanationGeneral: "Recursion is like your phone autocorrect—it keeps calling itself to fix the same mistake, but makes it worse",
    funnyExplanationTamil: "Recursion is like your phone autocorrect—it keeps calling itself to fix the same mistake, but makes it worse",
    codeExample: "def inception(n) {\n  if (n == 0) return 'Wake up!'; # Base case\n  return inception(n - 1);\n}",
    gifKeyword: "mind blown",
    miniQuizQuestion: {
      question: "What is the crucial part of a recursive def that stops it from running forever?",
      options: ["The return keyword", "The Base Case", "A break statement", "Ctrl+C"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "Factorial def using recursion.", code: "def factorial(n) {\n  if (n == 1) return 1;\n  return n * factorial(n - 1);\n}" }
    ]
  },
  {
    id: 112,
    chapter: "Chapter 6: Recursion",
    tier: "Intermediate",
    title: "The Call Stack",
    sticker: "📚",
    funnyExplanationGeneral: "The call stack is like a traffic jam—you think you're making progress, but really you're just waiting for something to unwind",
    funnyExplanationTamil: "The call stack is like a traffic jam—you think you're making progress, but really you're just waiting for something to unwind",
    codeExample: "def crashMe() {\n  crashMe();\n}\n# crashMe(); # RangeError: Maximum call stack size exceeded",
    gifKeyword: "screaming internally",
    miniQuizQuestion: {
      question: "What error do you get if your recursion never stops?",
      options: ["SyntaxError", "Stack Overflow / Maximum Call Stack Exceeded", "Network Error", "Timeout Error"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "Understanding execution order.", code: "def count(n) {\n  if (n==0) return;\n  print(n); # Prints going down\n  count(n-1);\n  print(n); # Prints coming back up the stack!\n}" }
    ]
  },
  {
    id: 113,
    chapter: "Chapter 7: Object-Oriented Programming (OOP)",
    tier: "Intermediate",
    title: "Classes & Instances",
    sticker: "🏗️",
    funnyExplanationGeneral: "Classes are like restaurant menus, instances are meals—each meal is a unique version of the same menu item",
    funnyExplanationTamil: "Classes are like restaurant menus, instances are meals—each meal is a unique version of the same menu item",
    codeExample: "class Car {\n  drive() { print('Vroom!'); }\n}\nmyCar = Car(); # myCar is the Instance!\nmyCar.drive();",
    gifKeyword: "why is this happening",
    miniQuizQuestion: {
      question: "What keyword is used to create a Instance of a Class?",
      options: ["create", "build", "new", "make"],
      correctAnswerIndex: 2
    },
    examples: [
      { explanation: "Defining a class.", code: "class Dog {\n  bark() { print('Woof'); }\n}" },
      { explanation: "Instantiating (creating) an object from the class.", code: "fido = Dog();\nfido.bark();" }
    ]
  },
  {
    id: 114,
    chapter: "Chapter 7: Object-Oriented Programming (OOP)",
    tier: "Intermediate",
    title: "The Constructor & 'this'",
    sticker: "👷",
    funnyExplanationGeneral: "The __init__ is like setting up your profile, and 'this' ensures the food gets delivered specifically to you.",
    funnyExplanationTamil: "The __init__ is like setting up your profile, and 'this' ensures the food gets delivered specifically to you.",
    codeExample: "class User {\n  __init__(name) {\n    self.name = name; # Setting up THIS specific user\n  }\n}\nu1 = User('Shafiq');\nprint(u1.name);",
    gifKeyword: "wrong delivery",
    miniQuizQuestion: {
      question: "When does the __init__ def run?",
      options: ["Every time you call a method", "Only when you use the 'new' keyword to create an instance", "When the page loads", "Never"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "Using __init__ arguments.", code: "class Phone {\n  __init__(brand) {\n    self.brand = brand;\n  }\n}\np = Phone('Apple');" }
    ]
  },
  {
    id: 115,
    chapter: "Chapter 7: Object-Oriented Programming (OOP)",
    tier: "Intermediate",
    title: "Inheritance (extends)",
    sticker: "🧬",
    funnyExplanationGeneral: "Inheritance is like copying homework from a friend who barely passed the class",
    funnyExplanationTamil: "Inheritance is like copying homework from a friend who barely passed the class",
    codeExample: "class Animal {\n  breathe() { print('Breathing...'); }\n}\nclass Dog extends Animal {\n  bark() { print('Woof!'); }\n}\nd = Dog();\nd.breathe(); d.bark();",
    gifKeyword: "why is this happening",
    miniQuizQuestion: {
      question: "Which keyword makes one class inherit from another?",
      options: ["inherits", "copies", "extends", "clones"],
      correctAnswerIndex: 2
    },
    examples: [
      { explanation: "Inheriting methods.", code: "class Bird extends Animal {\n  fly() { print('Flying'); }\n}" },
      { explanation: "Using super() to call the parent's __init__.", code: "class Cat extends Animal {\n  __init__(name) {\n    super(); # Must call this first!\n    self.name = name;\n  }\n}" }
    ]
  },
  {
    id: 116,
    chapter: "Chapter 7: Object-Oriented Programming (OOP)",
    tier: "Intermediate",
    title: "Encapsulation (Private Fields)",
    sticker: "🔒",
    funnyExplanationGeneral: "Encapsulation is like a cluttered room—you hide the mess from outsiders but still know it's a disaster inside",
    funnyExplanationTamil: "Encapsulation is like a cluttered room—you hide the mess from outsiders but still know it's a disaster inside",
    codeExample: "class BankAccount {\n  #balance = 0;\n  deposit(amt) { self.#balance += amt; }\n  getBalance() { return self.#balance; }\n}\naccount = BankAccount();\n# account.#balance; # ERROR! Private!",
    gifKeyword: "why is this happening",
    miniQuizQuestion: {
      question: "In modern JavaScript, how do you mark a class property as strictly private?",
      options: ["private keyword", "_ (underscore prefix)", "# (hash prefix)", "hidden keyword"],
      correctAnswerIndex: 2
    },
    examples: [
      { explanation: "Private properties cannot be accessed outside the class.", code: "class Secret {\n  #code = 1234;\n  checkCode(c) { return c == self.#code; }\n}" }
    ]
  },
  {
    id: 117,
    chapter: "Chapter 7: Object-Oriented Programming (OOP)",
    tier: "Intermediate",
    title: "Polymorphism (Overriding)",
    sticker: "🎭",
    funnyExplanationGeneral: "Polymorphism is like having multiple browser tabs open – they all look similar but behave differently",
    funnyExplanationTamil: "Polymorphism is like having multiple browser tabs open – they all look similar but behave differently",
    codeExample: "class Parent {\n  speak() { print('Hello'); }\n}\nclass Teenager extends Parent {\n  speak() { print('Whatever'); } # Overriding!\n}\nTeenager().speak();",
    gifKeyword: "mind blown",
    miniQuizQuestion: {
      question: "What does it mean to 'override' a method in a child class?",
      options: ["Deleting the method entirely", "Writing a method with the exact same name to replace the parent's version", "Running the parent method twice", "Hiding the method"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "Overriding a method.", code: "class Shape {\n  area() { return 0; }\n}\nclass Square extends Shape {\n  area() { return 100; }\n}" }
    ]
  },
  {
    id: 118,
    chapter: "Chapter 7: Object-Oriented Programming (OOP)",
    tier: "Intermediate",
    title: "Static Methods",
    sticker: "⚡",
    funnyExplanationGeneral: "Static methods are like highway rest stops - they're shared by everyone and always in the same place",
    funnyExplanationTamil: "Static methods are like highway rest stops - they're shared by everyone and always in the same place",
    codeExample: "class MathHelper {\n  static add(a, b) { return a + b; }\n}\n# No 'new' keyword needed!\nprint(MathHelper.add(5, 5));",
    gifKeyword: "mind blown",
    miniQuizQuestion: {
      question: "Do you need to use the `new` keyword to call a `static` method?",
      options: ["Yes", "No, you call it directly on the Class itself", "Only on Tuesdays", "Yes, but you pass no arguments"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "Static utility methods.", code: "class Utils {\n  static capitalize(str) { return str.toUpperCase(); }\n}\nprint(Utils.capitalize('hi'));" }
    ]
  }
];
