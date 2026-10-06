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
,
{
  "id": 104,
  "chapter": "Chapter 1: The Big O",
  "tier": "Intermediate",
  "title": "Sliding Window",
  "sticker": "🪟",
  "codeExample": "def sliding_window(arr, k):\n    window_sum = sum(arr[:k])\n    max_sum = window_sum\n    for i in range(len(arr) - k):\n        window_sum = window_sum - arr[i] + arr[i+k]\n        max_sum = max(max_sum, window_sum)\n    return max_sum",
  "gifKeyword": "window",
  "miniQuizQuestion": {
    "question": "What is the primary benefit of the sliding window technique?",
    "options": [
      "O(1) memory usage",
      "Avoiding nested loops to reduce time complexity to O(n)",
      "Sorting the array faster",
      "Finding the minimum value in an array"
    ],
    "correctAnswerIndex": 1
  },
  "examples": [
    {
      "explanation": "Instead of recalculating the sum of k elements every time, just subtract the outgoing element and add the incoming element.",
      "code": "window_sum = window_sum - arr[i] + arr[i+k]"
    }
  ],
  "biteSized": {
    "meaning": "An algorithmic technique for finding a subset of elements in an array or string.",
    "funnyEgGeneral": "Like a magnifying glass sliding across a newspaper.",
    "funnyEgTamil": "Sliding window is like moving your chair to watch the TV when someone stands in front of you."
  }
},
{
  "id": 106,
  "chapter": "Chapter 2: Data Structures",
  "tier": "Intermediate",
  "title": "Sets (Deduplication)",
  "sticker": "🎭",
  "codeExample": "my_set = {1, 2, 2, 3}\nprint(my_set) # {1, 2, 3}\n\nnames = ['Alice', 'Bob', 'Alice']\nunique_names = set(names)",
  "gifKeyword": "unique",
  "miniQuizQuestion": {
    "question": "What is the primary characteristic of a Set?",
    "options": [
      "It keeps elements in insertion order",
      "It only stores unique elements",
      "It is slower than a list",
      "It uses key-value pairs"
    ],
    "correctAnswerIndex": 1
  },
  "examples": [
    {
      "explanation": "Sets automatically remove duplicates.",
      "code": "nums = [1, 1, 2, 2]\nunique = set(nums)"
    }
  ],
  "biteSized": {
    "meaning": "A collection of unique items.",
    "funnyEgGeneral": "A VIP club where no one is allowed to have the same name as anyone else.",
    "funnyEgTamil": "Set is like getting a unique Aadhaar card—nobody can have your number!"
  }
},
{
  "id": 107,
  "chapter": "Chapter 2: Data Structures",
  "tier": "Intermediate",
  "title": "Singly Linked Lists",
  "sticker": "🔗",
  "codeExample": "class Node:\n    def __init__(self, val):\n        self.val = val\n        self.next = None\n\nhead = Node(1)\nhead.next = Node(2)",
  "gifKeyword": "chain",
  "miniQuizQuestion": {
    "question": "In a singly linked list, what does a node contain?",
    "options": [
      "Only the value",
      "The value and a pointer to the next node",
      "The value and pointers to both next and previous",
      "An array of values"
    ],
    "correctAnswerIndex": 1
  },
  "examples": [
    {
      "explanation": "Each node points to the next.",
      "code": "current = head\nwhile current:\n    print(current.val)\n    current = current.next"
    }
  ],
  "biteSized": {
    "meaning": "A linear data structure where elements are not stored contiguously.",
    "funnyEgGeneral": "A treasure hunt where each clue leads to the next clue.",
    "funnyEgTamil": "Linked List is like a scavenger hunt—each clue tells you where to find the next one."
  }
},
{
  "id": 108,
  "chapter": "Chapter 2: Data Structures",
  "tier": "Intermediate",
  "title": "Fast & Slow Pointers (Tortoise & Hare)",
  "sticker": "🐢",
  "codeExample": "def has_cycle(head):\n    slow, fast = head, head\n    while fast and fast.next:\n        slow = slow.next\n        fast = fast.next.next\n        if slow == fast:\n            return True\n    return False",
  "gifKeyword": "rabbit",
  "miniQuizQuestion": {
    "question": "What is the Tortoise and Hare algorithm typically used for?",
    "options": [
      "Sorting a linked list",
      "Finding cycles in a linked list",
      "Reversing a linked list",
      "Finding the minimum value"
    ],
    "correctAnswerIndex": 1
  },
  "examples": [
    {
      "explanation": "If there's a cycle, the fast pointer will eventually overlap the slow one.",
      "code": "fast = fast.next.next"
    }
  ],
  "biteSized": {
    "meaning": "Using two pointers moving at different speeds.",
    "funnyEgGeneral": "Like two runners on a track, if the track is a circle, the faster one will lap the slower one.",
    "funnyEgTamil": "Fast pointer is like a speeding auto, slow pointer is the traffic police catching him eventually in a round-tana."
  }
},
{
  "id": 109,
  "chapter": "Chapter 2: Data Structures",
  "tier": "Intermediate",
  "title": "Stacks (LIFO)",
  "sticker": "🥞",
  "codeExample": "stack = []\nstack.append(1) # Push\nstack.append(2)\ntop = stack.pop() # Pop returns 2",
  "gifKeyword": "pancakes",
  "miniQuizQuestion": {
    "question": "What does LIFO stand for?",
    "options": [
      "Last In, First Out",
      "List In, First Out",
      "Last In, Fast Out",
      "Late In, First Out"
    ],
    "correctAnswerIndex": 0
  },
  "examples": [
    {
      "explanation": "Push to add, pop to remove the latest.",
      "code": "stack.append('A')\nstack.pop()"
    }
  ],
  "biteSized": {
    "meaning": "A Last-In-First-Out data structure.",
    "funnyEgGeneral": "A stack of pancakes. You always eat the top one first.",
    "funnyEgTamil": "Stack is like arranging plates at a wedding buffet—you always pick the top plate."
  }
},
{
  "id": 110,
  "chapter": "Chapter 2: Data Structures",
  "tier": "Intermediate",
  "title": "Queues (FIFO)",
  "sticker": "🧍",
  "codeExample": "from collections import deque\nqueue = deque()\nqueue.append(1) # Enqueue\nqueue.append(2)\nfirst = queue.popleft() # Dequeue returns 1",
  "gifKeyword": "queue",
  "miniQuizQuestion": {
    "question": "What does FIFO stand for?",
    "options": [
      "First In, First Out",
      "Fast In, Fast Out",
      "First In, Fast Out",
      "For In, For Out"
    ],
    "correctAnswerIndex": 0
  },
  "examples": [
    {
      "explanation": "Use deque for O(1) pops from the front.",
      "code": "from collections import deque\nq = deque([1, 2, 3])\nq.popleft()"
    }
  ],
  "biteSized": {
    "meaning": "A First-In-First-Out data structure.",
    "funnyEgGeneral": "A line at the grocery store. First person there gets served first.",
    "funnyEgTamil": "Queue is like a ration shop line—first come, first serve!"
  }
},
{
  "id": 112,
  "chapter": "Chapter 3: Deep Dive",
  "tier": "Intermediate",
  "title": "The Call Stack",
  "sticker": "☎️",
  "codeExample": "def a():\n    print('A')\n    b()\n\ndef b():\n    print('B')\n\na()",
  "gifKeyword": "phone",
  "miniQuizQuestion": {
    "question": "What happens when the call stack gets too large (e.g., infinite recursion)?",
    "options": [
      "The program runs faster",
      "Stack Overflow Error",
      "Memory Leak",
      "Nothing"
    ],
    "correctAnswerIndex": 1
  },
  "examples": [
    {
      "explanation": "Functions are pushed to the stack when called and popped when they return.",
      "code": ""
    }
  ],
  "biteSized": {
    "meaning": "The mechanism the interpreter uses to keep track of function calls.",
    "funnyEgGeneral": "Like placing sticky notes on your monitor for every task you start, and removing them when finished.",
    "funnyEgTamil": "Call stack is like asking your mom where your shirt is, she asks dad, dad asks sister..."
  }
},
{
  "id": 114,
  "chapter": "Chapter 4: Object Oriented Programming",
  "tier": "Intermediate",
  "title": "Classes & Constructors",
  "sticker": "🏗️",
  "codeExample": "class Dog:\n    def __init__(self, name):\n        self.name = name\n\n    def bark(self):\n        return 'Woof!'\n\nd = Dog('Rex')",
  "gifKeyword": "dog",
  "miniQuizQuestion": {
    "question": "What is the constructor method in Python?",
    "options": [
      "__init__",
      "constructor",
      "init",
      "create"
    ],
    "correctAnswerIndex": 0
  },
  "examples": [
    {
      "explanation": "__init__ initializes the object.",
      "code": "def __init__(self): pass"
    }
  ],
  "biteSized": {
    "meaning": "A blueprint for creating objects with properties and methods.",
    "funnyEgGeneral": "A cookie cutter (class) makes many cookies (objects).",
    "funnyEgTamil": "Class is the blueprint, object is the actual house."
  }
},
{
  "id": 115,
  "chapter": "Chapter 4: Object Oriented Programming",
  "tier": "Intermediate",
  "title": "Inheritance",
  "sticker": "🧬",
  "codeExample": "class Animal:\n    def speak(self):\n        return '?'\n\nclass Cat(Animal):\n    def speak(self):\n        return 'Meow'\n\nc = Cat()\nprint(c.speak())",
  "gifKeyword": "cat",
  "miniQuizQuestion": {
    "question": "How does a class inherit from another in Python?",
    "options": [
      "class Cat extends Animal:",
      "class Cat(Animal):",
      "class Cat inherits Animal:",
      "class Cat implements Animal:"
    ],
    "correctAnswerIndex": 1
  },
  "examples": [
    {
      "explanation": "Child class inherits methods from parent class.",
      "code": "class Child(Parent):"
    }
  ],
  "biteSized": {
    "meaning": "A mechanism where a new class derives properties from an existing class.",
    "funnyEgGeneral": "Inheriting your dad's old car, but giving it a custom paint job.",
    "funnyEgTamil": "Inheritance is like getting your older sibling's old textbooks."
  }
},
{
  "id": 116,
  "chapter": "Chapter 4: Object Oriented Programming",
  "tier": "Intermediate",
  "title": "Encapsulation (Private Fields)",
  "sticker": "🔒",
  "codeExample": "class BankAccount:\n    def __init__(self, balance):\n        self.__balance = balance # Private\n\n    def get_balance(self):\n        return self.__balance\n\nacc = BankAccount(100)",
  "gifKeyword": "safe",
  "miniQuizQuestion": {
    "question": "How do you conventionally define a private attribute in Python?",
    "options": [
      "private balance",
      "self.balance = private",
      "self.__balance",
      "self._private_balance"
    ],
    "correctAnswerIndex": 2
  },
  "examples": [
    {
      "explanation": "Prefix with double underscore for name mangling.",
      "code": "self.__secret = 42"
    }
  ],
  "biteSized": {
    "meaning": "Hiding the internal state and requiring all interaction to be performed through an object's methods.",
    "funnyEgGeneral": "Like keeping your diary locked and only reading it aloud yourself.",
    "funnyEgTamil": "Encapsulation is like hiding your diary from your sibling."
  }
},
{
  "id": 117,
  "chapter": "Chapter 4: Object Oriented Programming",
  "tier": "Intermediate",
  "title": "Polymorphism (Overriding)",
  "sticker": "🎭",
  "codeExample": "class Bird:\n    def fly(self):\n        return 'Flying'\n\nclass Penguin(Bird):\n    def fly(self):\n        return 'Cannot fly'\n\np = Penguin()\nprint(p.fly())",
  "gifKeyword": "penguin",
  "miniQuizQuestion": {
    "question": "What is polymorphism?",
    "options": [
      "Classes with the same name",
      "Different objects responding to the same method call in their own way",
      "Variables that change types randomly",
      "A type of loop"
    ],
    "correctAnswerIndex": 1
  },
  "examples": [
    {
      "explanation": "Overriding a method in a subclass.",
      "code": "def fly(self): return 'Flap'"
    }
  ],
  "biteSized": {
    "meaning": "The ability of different objects to respond to the same method call in a way that is appropriate for their type.",
    "funnyEgGeneral": "Pressing 'play' on a remote works for a DVD player, TV, and stereo, but they do different things.",
    "funnyEgTamil": "Polymorphism is like pressing a single button, but your TV does one thing and AC does another."
  }
},
{
  "id": 118,
  "chapter": "Chapter 4: Object Oriented Programming",
  "tier": "Intermediate",
  "title": "Static Methods",
  "sticker": "⚡",
  "codeExample": "class MathUtils:\n    @staticmethod\n    def add(a, b):\n        return a + b\n\nprint(MathUtils.add(5, 10))",
  "gifKeyword": "lightning",
  "miniQuizQuestion": {
    "question": "What decorator is used to define a static method in Python?",
    "options": [
      "@classmethod",
      "@static",
      "@staticmethod",
      "@class"
    ],
    "correctAnswerIndex": 2
  },
  "examples": [
    {
      "explanation": "Static methods don't take a 'self' parameter.",
      "code": "@staticmethod\ndef greet(): return 'Hi'"
    }
  ],
  "biteSized": {
    "meaning": "Methods that belong to a class rather than an instance of the class.",
    "funnyEgGeneral": "A tool that anyone can use without needing to own a house first.",
    "funnyEgTamil": "Static method is like a public tap—anyone can use it, no need to own a house."
  }
}
];
