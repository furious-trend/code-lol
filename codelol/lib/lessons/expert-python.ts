// agent-notes: { ctx: "Expert Python lessons with pure Python syntax and humor", deps: ["./types"], state: active, last: "sato@2026-10-12" }
import { Lesson } from "./types";

export const pythonExpertLessons: Lesson[] = [
  {
    id: 21,
    chapter: "Chapter 9: Advanced Iteration",
    tier: "Expert",
    title: "Generators and Yield",
    sticker: "⚡",
    codeExample: "def countdown(n):\n    while n > 0:\n        yield n\n        n -= 1\n\nfor val in countdown(3):\n    print(f\"T-minus {val}...\")",
    expectedOutput: "T-minus 3...\nT-minus 2...\nT-minus 1...",
    gifKeyword: "rocket launch",
    miniQuizQuestion: {
      question: "What does the yield keyword do inside a function?",
      options: ["Terminates the program", "Pauses function execution and produces a value lazily", "Throws a StopIteration exception", "Clears RAM memory"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "Infinite stream generator", code: "def counter():\n    i = 0\n    while True:\n        yield i\n        i += 1" }
    ],
    verificationChecks: [
      {
        type: "requires_syntax",
        pattern: "yield\\s+",
        expectedMessage: "Use the yield keyword to make it a generator."
      }
    ],
    biteSized: {
      meaning: "Generators produce values on demand instead of loading everything into memory at once. Super memory efficient.",
      meaningGeneral: "Functions containing yield return a generator object, producing items one at a time on demand.",
      funnyEgTamil: "Orey nerathula 100 plate briyani vaangama, theva padum podhu oru oru plate-ah yield panra alavu memory smart!",
      funnyEgGeneral: "Do not load 10 GB into RAM. Yield it row by row and watch your computer breathe easy."
    },
    workoutSteps: [
      {
        title: "Step 1: Use yield",
        explanation: "Replace return with yield to pause execution.",
        code: "def gen():\n    yield 1",
        lineExplanation: "Emits values lazily.",
        memeNote: "Lazy evaluation magic."
      }
    ]
  },
  {
    id: 22,
    chapter: "Chapter 10: Metaprogramming",
    tier: "Expert",
    title: "Decorators",
    sticker: "🎀",
    codeExample: "def loud_announcement(func):\n    def wrapper(*args, **kwargs):\n        print(\"ATTENTION EVERYONE!\")\n        res = func(*args, **kwargs)\n        print(\"THANK YOU!\")\n        return res\n    return wrapper\n\n@loud_announcement\ndef say_hello(name):\n    print(f\"Hello {name}!\")\n\nsay_hello(\"Pythonista\")",
    expectedOutput: "ATTENTION EVERYONE!\nHello Pythonista!\nTHANK YOU!",
    gifKeyword: "microphone loud",
    miniQuizQuestion: {
      question: "What syntax is used to apply a decorator to a Python function?",
      options: ["#decorator", "@decorator", ":decorator", "*decorator"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "Timing decorator pattern", code: "def timer(f):\n    def w():\n        return f()\n    return w" }
    ],
    verificationChecks: [
      {
        type: "requires_syntax",
        pattern: "@\\w+",
        expectedMessage: "Apply your decorator using the @ symbol above the function."
      }
    ],
    biteSized: {
      meaning: "Decorators wrap functions to extend or modify their behavior without changing their original code.",
      meaningGeneral: "Decorators take a function as input, enhance it with a wrapper, and return the modified function.",
      funnyEgTamil: "Function-ku mela @ potta, adhuku special VIP entrance pass kedacha maari extra powers vandhurum!",
      funnyEgGeneral: "Wrap your functions in fancy gift wrap that executes bonus code before and after."
    },
    workoutSteps: [
      {
        title: "Step 1: Write Decorator",
        explanation: "Return an inner wrapper function.",
        code: "def my_dec(f):\n    return f",
        lineExplanation: "Higher order functions at work.",
        memeNote: "VIP wrapper."
      }
    ]
  },
  {
    id: 23,
    chapter: "Chapter 11: Magic Methods",
    tier: "Expert",
    title: "Special Dunder Methods",
    sticker: "🎩",
    codeExample: "class Money:\n    def __init__(self, amount):\n        self.amount = amount\n    def __add__(self, other):\n        return Money(self.amount + other.amount)\n    def __repr__(self):\n        return f\"Rs. {self.amount}\"\n\nm1 = Money(50)\nm2 = Money(75)\nprint(m1 + m2)",
    expectedOutput: "Rs. 125",
    gifKeyword: "money rain",
    miniQuizQuestion: {
      question: "Which dunder method overloads the + operator in Python?",
      options: ["__plus__", "__add__", "__sum__", "__operator_add__"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "Length dunder method", code: "class Box:\n    def __len__(self): return 10" }
    ],
    verificationChecks: [
      {
        type: "requires_syntax",
        pattern: "def\\s+__add__\\s*\\(self",
        expectedMessage: "Implement the __add__ special dunder method."
      }
    ],
    biteSized: {
      meaning: "Dunder (double underscore) methods like __add__ let your custom objects support built-in syntax like +.",
      meaningGeneral: "Operator overloading and Python data model hooks using double underscore methods.",
      funnyEgTamil: "Pluss-ah potta un custom class direct-ah kootum... idhuku dhaan dunder __add__ nu peru!",
      funnyEgGeneral: "Teach your custom objects how to behave like native Python types using dunder magic."
    },
    workoutSteps: [
      {
        title: "Step 1: Overload + Operator",
        explanation: "Define __add__(self, other) inside the class.",
        code: "def __add__(self, o):\n    return self.val + o.val",
        lineExplanation: "Enables + syntax for your objects.",
        memeNote: "Magic method ready."
      }
    ]
  }
];
