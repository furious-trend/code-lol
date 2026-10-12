// agent-notes: { ctx: "Intermediate Python lessons with pure Python syntax and humor", deps: ["./types"], state: active, last: "sato@2026-10-12" }
import { Lesson } from './types';

export const pythonIntermediateLessons: Lesson[] = [
  {
    id: 11,
    chapter: "Chapter 5: Advanced Collections",
    tier: "Intermediate",
    title: "List Comprehensions",
    sticker: "🙩",
    codeExample: "numbers = [1, 2, 3, 4, 5]\nsquares = [x ** 2 for x in numbers if x % 2 != 0]\nprint('Odd Squares:', squares)",
    expectedOutput: "Odd Squares: [1, 9, 25]",
    gifKeyword: "mind blown",
    miniQuizQuestion: {
      question: "What is the primary benefit of list comprehensions in Python?",
      options: ["Makes lists immutable", "Concise, readable creation of new lists", "Runs in parallel threads", "Replaces dictionary keys"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "Basic comprehension", code: "doubles = [x * 2 for x in range(4)]\nprint(doubles)" },
      { explanation: "Filtering with if", code: "evens = [x for x in range(10) if x % 2 == 0]\nprint(evens)" }
    ],
    verificationChecks: [
      {
        type: "requires_syntax",
        pattern: "\\[.*for\\s+\\w+\\s+in.*\\]",
        expectedMessage: "Use a list comprehension: [expression for item in sequence]."
      }
    ],
    biteSized: {
      meaning: "Compact one-liner to transform and filter lists in a single readable line.",
      meaningGeneral: "List comprehensions provide a concise way to create lists from existing iterables.",
      funnyEgTamil: "Naalu line loop pottu append panradhuku badhila, ore line-la mass kaatradhu dhaan list comprehension!",
      funnyEgGeneral: "Why write a 4-line loop with .append() when you can flex a one-liner comprehension?"
    },
    workoutSteps: [
      {
        title: "Step 1: Write Comprehension",
        explanation: "Surround with square brackets and include for-in inside.",
        code: "odds = [n for n in nums if n % 2 != 0]",
        lineExplanation: "Filters and transforms on the fly.",
        memeNote: "Ore line-la mudichtom."
      }
    ]
  },
  {
    id: 12,
    chapter: "Chapter 6: Function Magic",
    tier: "Intermediate",
    title: "*args and **kwargs",
    sticker: "🦄",
    codeExample: "def print_order(*dishes, **extras):\n    for dish in dishes:\n        print(f'Dish: {dish}')\n    for k, v in extras.items():\n        print(f'{k}: {v}')\n\nprint_order('Biryani', 'Parotta', spicy=True, qty=2)",
    expectedOutput: "Dish: Biryani\nDish: Parotta\nspicy: True\nqty: 2",
    gifKeyword: "magic hands",
    miniQuizQuestion: {
      question: "What type does *args receive arguments as?",
      options: ["List", "Tuple", "Dict", "Set"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "Sum any count of numbers", code: "def total(*nums):\n    return sum(nums)\nprint(total(10, 20, 30))" }
    ],
    verificationChecks: [
      {
        type: "requires_syntax",
        pattern: "\\[args|\\*\\*kwargs",
        expectedMessage: "Accept variable arguments using *args or **kwargs."
      }
    ],
    biteSized: {
      meaning: "*args captures extra positional arguments as a tuple. *+kwargs captures keyword arguments as a dictionary.",
      meaningGeneral: "Allows functions to accept an arbitrary number of positional or named arguments.",
      funnyEgTamil: "Kalyana veetla evlo per/andhalum sapadu podra maari, evlo arguments vandhalum *args thaangum!",
      funnyEgGeneral: "Feed your function as many arguments as you want without breaking the signature."
    },
    workoutSteps: [
      {
        title: "Step 1: Accept Variable Args",
        explanation: "Use asterisks before parameter names.",
        code: "def feed(*food, **sauces):\n    pass",
        lineExplanation: "Gives ultimate flexibility to function callers.",
        memeNote: "Evlo venalum kudukalam."
      }
    ]
  },
  {
    id: 13,
    chapter: "Chapter 7: Context Managers",
    tier: "Intermediate",
    title: "Context Managers with with",
    sticker: "🖒",
    codeExample: "class SecretVault:\n    def __enter__(self):\n        print('Vault unlocked!')\n        return self\n    def __exit__(self, exc_type, exc_val, exc_tb):\n        print('Vault locked safely!')\n\nwith SecretVault():\n    print('Counting gold coins...')",
    expectedOutput: "Vault unlocked!\nCounting gold coins...\nVault locked safely!",
    gifKeyword: "locked safe",
    miniQuizQuestion: {
      question: "Which statement guarantees cleanup resources even if errors occur?",
      options: ["using", "with", "lock", "guard"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "Safe file reading pattern", code: "# with open('data.txt') as f:\n#     print(f.read())" }
    ],
    verificationChecks: [
      {
        type: "requires_syntax",
        pattern: "with\\s+",
        expectedMessage: "Use the 'with' statement to invoke the context manager."
      }
    ],
    biteSized: {
      meaning: "The 'with' statement automatically acquires and releases resources, preventing memory and file leaks.",
      meaningGeneral: "Context managers guarantee setup and teardown actions like closing files or releasing locks.",
      funnyEgTamil: "Room-ku ulla pona light on, veliya vandha light off... auto cleanup dhaan context manager!",
      funnyEgGeneral: "Never forget to close files again. Python cleans up behind you automatically."
    },
    workoutSteps: [
      {
        title: "Step 1: Use with block",
        explanation: "The with keyword manages the resource lifecycle.",
        code: "with Resource() as r:\n    r.use()",
        lineExplanation: "Executes __enter__ before and __exit__ after.",
        memeNote: "Automatic cleanup."
      }
    ]
  },
  {
    id: 14,
    chapter: "Chapter 8: Object-Oriented Python",
    tier: "Intermediate",
    title: "Classes & __init__",
    sticker: "🏗",
    codeExample: "class Hero:\n    def __init__(self, name, power):\n        self.name = name\n        self.power = power\n    def attack(self):\n        return f\{self.name} unleashes {self.power}!\n\nh = Hero('Super Shafi', 'Lightning Code')\nprint(h.attack())",
    expectedOutput: "Super Shafi unleashes Lightning Code!",
    gifKeyword: "hero entrance",
    miniQuizQuestion: {
      question: "What is the mandatory first argument for instance methods in a Python class?",
      options: ["this", "self", "me", "inst"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "Basic class with constructor", code: "class Car:\n    def __init__(self, brand):\n        self.brand = brand" }
    ],
    verificationChecks: [
      {
        type: "requires_syntax",
        pattern: "class\\s+\qw+:.* def\\s+__init__\\s*\\(self",
        expectedMessage: "Define a class with an __init__(self, ...) constructor."
      }
    ],
    biteSized: {
      meaning: "Classes define blueprints. __init__ is the constructor, and 'self' points to the active instance.",
      meaningGeneral: "OOP in Python: class bundles data attributes and behavior methods together.",
      funnyEgTamil: "JS-la this nu solla vendiyatha, Python-la explicit-ah self nu thalaivan solraan!",
      funnyEgGeneral: "Python keeps it real: you have to explicitly name 'self' in your methods."
    },
    workoutSteps: [
      {
        title: "Step 1: Declare Class",
        explanation: "Define class name, initialize self fields in __init__.",
        code: "class Bot:\n    def __init__(self, id):\n        self.id = id",
        lineExplanation: "Blueprints for objects.",
        memeNote: "Blueprint ready."
      }
    ]
  }
];
