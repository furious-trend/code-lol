// agent-notes: { ctx: "Beginner Python lessons with pure Python syntax and humor", deps: ["./types"], state: active, last: "sato@2026-10-12" }
import { Lesson } from "./types";

export const pythonBeginnerLessons: Lesson[] = [
  {
    id: 1,
    chapter: "Chapter 1: The Absolute Basics",
    tier: "Beginner",
    title: "Variables & Print",
    sticker: "🐍",
    codeExample: "biryani_count = 2\nfood = \"Ambur Biryani\"\nprint(f\"I ate {biryani_count} plates of {food}!\")",
    expectedOutput: "I ate 2 plates of Ambur Biryani!",
    gifKeyword: "eating food",
    miniQuizQuestion: {
      question: "Which function is used to output text in Python?",
      options: ["console.log()", "print()", "printf()", "System.out.println()"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "Assign a variable and print it", code: "snack = \"Samosa\"\nprint(snack)" },
      { explanation: "Using f-strings for formatting", code: "price = 20\nprint(f\"Price is Rs. {price}\")" },
      { explanation: "Multiple variable assignments", code: "tea, bun = \"Chai\", \"Maskabun\"\nprint(tea, \"with\", bun)" }
    ],
    verificationChecks: [
      {
        type: "requires_syntax",
        pattern: "print\\s*\\(",
        expectedMessage: "You need to use Python\x27s print() function."
      }
    ],
    biteSized: {
      meaning: "In Python, variables don\x27t need let, const, or semicolons. Just name it, assign it, and print() it.",
      meaningGeneral: "Variables store data. Python automatically detects the type without any let, const, or semicolons.",
      funnyEgTamil: "Let illa, const illa, semicolon illa... direct-ah biryani_count = 2 nu potutu poitte irukalam!",
      funnyEgGeneral: "No let, no const, no semicolons. In Python, you just assign and live your best life."
    },
    workoutSteps: [
      {
        title: "Step 1: Declare Variable",
        explanation: "Assign values directly with the equals operator.",
        code: "biryani_count = 2",
        lineExplanation: "In Python, no keyword like let or var is needed.",
        memeNote: "Simple-ah mudinjidhum da."
      },
      {
        title: "Step 2: Print using f-string",
        explanation: "f-strings let you inject variables into text easily.",
        code: "print(f\"I ate {biryani_count} plates!\")",
        lineExplanation: "Prefix with f and use curly braces for variables.",
        memeNote: "f-string dhaan Python-oda mass feature."
      }
    ]
  },
  {
    id: 2,
    chapter: "Chapter 1: The Absolute Basics",
    tier: "Beginner",
    title: "Data Types & Type Checking",
    sticker: "📊",
    codeExample: "hero = \"Kaipulla\"\nage = 28\nis_legend = True\nheight = 5.9\nprint(type(hero).__name__, type(age).__name__, type(is_legend).__name__)",
    expectedOutput: "str int bool",
    gifKeyword: "confused math",
    miniQuizQuestion: {
      question: "Which keyword gives the type of a variable in Python?",
      options: ["typeof", "type()", "getType()", "is_a()"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "String and Integer", code: "name = \"Vikram\"\nlevel = 99\nprint(type(name), type(level))" },
      { explanation: "Boolean and Float", code: "passed = True\nscore = 98.5\nprint(type(passed), type(score))" }
    ],
    verificationChecks: [
      {
        type: "requires_syntax",
        pattern: "type\\s*\\(",
        expectedMessage: "Use type() to inspect variable data types."
      }
    ],
    biteSized: {
      meaning: "Python has str, int, float, bool. Booleans start with capital True and False.",
      meaningGeneral: "Core primitives: strings, integers, floating-point numbers, and booleans.",
      funnyEgTamil: "true nu chinna t pottu compiler kitta thittu vaangadha... Capital True dhaan Python-oda rule!",
      funnyEgGeneral: "Don\x27t use lowercase true like in JS—Python demands capital True and False!"
    },
    workoutSteps: [
      {
        title: "Step 1: Understand Types",
        explanation: "Python is dynamically typed but strongly typed.",
        code: "x = \"Hello\"\nprint(type(x))",
        lineExplanation: "Inspect type at runtime using type().",
        memeNote: "Type therinjikonga first."
      }
    ]
  },
  {
    id: 3,
    chapter: "Chapter 2: Control Flow",
    tier: "Beginner",
    title: "If, Elif, Else & Indentation",
    sticker: "🔀",
    codeExample: "marks = 85\nif marks >= 90:\n    print(\"Grade: S\")\nelif marks >= 80:\n    print(\"Grade: A\")\nelse:\n    print(\"Keep pushing!\")",
    expectedOutput: "Grade: A",
    gifKeyword: "thinking hard",
    miniQuizQuestion: {
      question: "How does Python define code blocks inside an if statement?",
      options: ["Curly braces {}", "Indentation whitespace", "begin...end", "Parentheses ()"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "Simple if condition", code: "is_raining = True\nif is_raining:\n    print(\"Take umbrella\")" },
      { explanation: "If-else check", code: "battery = 15\nif battery > 20:\n    print(\"Good\")\nelse:\n    print(\"Low battery\")" }
    ],
    verificationChecks: [
      {
        type: "requires_syntax",
        pattern: "if\\s+.*:\\n\\s+",
        expectedMessage: "Make sure you write an if statement with a colon and indented block."
      }
    ],
    biteSized: {
      meaning: "No braces! Python uses colons (:) and 4-space indentation to define blocks.",
      meaningGeneral: "Python uses indentation instead of curly brackets {} to delineate code blocks.",
      funnyEgTamil: "Indentation thappa pottu IndentationError vandha, laptop-ah mooditu thoonga vendiyadhu dhaan!",
      funnyEgGeneral: "Forget curly braces. Your whitespace is your syntax now."
    },
    workoutSteps: [
      {
        title: "Step 1: Write Condition",
        explanation: "End the if header with a colon :",
        code: "if marks >= 80:\n    print(\"Pass\")",
        lineExplanation: "Notice the colon and 4 spaces indentation.",
        memeNote: "Indent pannu da."
      }
    ]
  },
  {
    id: 4,
    chapter: "Chapter 2: Control Flow",
    tier: "Beginner",
    title: "Lists & For Loops",
    sticker: "��",
    codeExample: "items = [\"Chai\", \"Bonda\", \"Bajji\"]\nfor item in items:\n    print(f\"Eating {item}\")",
    expectedOutput: "Eating Chai\nEating Bonda\nEating Bajji",
    gifKeyword: "eating food",
    miniQuizQuestion: {
      question: "Which loop construct iterates over a list in Python?",
      options: ["for item in list:", "foreach(list as item)", "for(i=0; i<len; i++)", "loop item from list"],
      correctAnswerIndex: 0
    },
    examples: [
      { explanation: "Loop with range", code: "for i in range(3):\n    print(i)" },
      { explanation: "Append to list", code: "colors = []\ncolors.append(\"Purple\")\nprint(colors)" }
    ],
    verificationChecks: [
      {
        type: "requires_syntax",
        pattern: "for\\s+\\w+\\s+in\\s+",
        expectedMessage: "Use Python\x27s \x27for item in sequence:\x27 loop."
      }
    ],
    biteSized: {
      meaning: "Lists [] store ordered items. The \x27for in\x27 loop walks through them seamlessly.",
      meaningGeneral: "Lists are dynamic arrays. For-in loops iterate across each item with clean readable syntax.",
      funnyEgTamil: "Array-ku length paathu i++ pottu alayara kaalam pochu... Python-la direct-ah for item in list!",
      funnyEgGeneral: "No indexing, no i++, just clean pythonic iteration."
    },
    workoutSteps: [
      {
        title: "Step 1: Iterate List",
        explanation: "Use for item in list:",
        code: "for item in items:\n    print(item)",
        lineExplanation: "Loops each element without index boilerplate.",
        memeNote: "Direct loop."
      }
    ]
  },
  {
    id: 5,
    chapter: "Chapter 3: Collections",
    tier: "Beginner",
    title: "Dictionaries",
    sticker: "📖",
    codeExample: "profile = {\"name\": \"Shafi\", \"role\": \"Coder\", \"points\": 100}\nprint(profile[\"name\"], \"has\", profile[\"points\"], \"points\")",
    expectedOutput: "Shafi has 100 points",
    gifKeyword: "typing fast",
    miniQuizQuestion: {
      question: "Which syntax creates a dictionary in Python?",
      options: ["{}", "[]", "()", "<>"],
      correctAnswerIndex: 0
    },
    examples: [
      { explanation: "Access with get", code: "d = {\"a\": 1}\nprint(d.get(\"b\", \"default\"))" },
      { explanation: "Add key value", code: "d = {}\nd[\"status\"] = \"active\"\nprint(d)" }
    ],
    verificationChecks: [
      {
        type: "requires_syntax",
        pattern: "\\{[^}]*:[^}]*\\}",
        expectedMessage: "Create a dictionary using {key: value} pairs."
      }
    ],
    biteSized: {
      meaning: "Dictionaries store key-value pairs (like JSON objects in JavaScript).",
      meaningGeneral: "Dictionaries are hash tables with O(1) key lookups.",
      funnyEgTamil: "Dictionary dhaan namma vadivelu dictionary maari—ellathukkum oru meaning vechirukkum!",
      funnyEgGeneral: "Fast key-value lookups. Python\x27s Swiss Army knife."
    },
    workoutSteps: [
      {
        title: "Step 1: Create Dict",
        explanation: "Define keys and values with colons inside braces.",
        code: "user = {\"name\": \"Shafi\"}",
        lineExplanation: "Keys and values linked cleanly.",
        memeNote: "Key-value pair dhaan."
      }
    ]
  },
  {
    id: 6,
    chapter: "Chapter 4: Functions",
    tier: "Beginner",
    title: "Functions & Def",
    sticker: "⚡",
    codeExample: "def add_powers(a, b):\n    return a + b\n\nresult = add_powers(15, 25)\nprint(f\"Combined Power: {result}\")",
    expectedOutput: "Combined Power: 40",
    gifKeyword: "power up",
    miniQuizQuestion: {
      question: "Which keyword defines a function in Python?",
      options: ["function", "def", "func", "define"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "Basic function", code: "def greet(name):\n    return f\"Vanakkam, {name}!\"\nprint(greet(\"Tamil\"))" },
      { explanation: "Default arguments", code: "def power(x, exp=2):\n    return x ** exp\nprint(power(4))" }
    ],
    verificationChecks: [
      {
        type: "requires_syntax",
        pattern: "def\\s+\\w+\\s*\\(",
        expectedMessage: "Define a function using the \x27def\x27 keyword."
      }
    ],
    biteSized: {
      meaning: "def creates a function. Return passes the result back.",
      meaningGeneral: "Functions package reusable logic. Use def function_name(args):",
      funnyEgTamil: "Function nu perusa type panna thevai illa... just \x27def\x27 nu podunga boss!",
      funnyEgGeneral: "Why type \x27function\x27 when you can just type \x27def\x27?"
    },
    workoutSteps: [
      {
        title: "Step 1: Define Function",
        explanation: "def name(param): then indent the body.",
        code: "def solve(x):\n    return x * 2",
        lineExplanation: "Clean callable logic block.",
        memeNote: "Reusable magic."
      }
    ]
  }
];
