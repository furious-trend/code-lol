import { Chapter } from './types';

export const pythonCurriculum: Chapter[] = [
  {
    "id": "ch1",
    "title": "Lexical Structure & Syntax Basics",
    "tier": "Beginner",
    "technicalCore": [
      "Physical vs. Logical lines",
      "line continuation",
      "indentation rules",
      "whitespace semantics",
      "comments",
      "docstrings",
      "identifiers",
      "keywords",
      "soft keywords",
      "literals",
      "delimiters",
      "operators"
    ],
    "analogyGeneral": "Indentation in Python isn't just for neatness; it's the law. Mess it up, and the interpreter throws a tantrum.",
    "analogyTamil": "Oru indentation-ah thappaa potta... compiler un ID card-ah cancel panni college-ah vittu veliya anuppirum da!",
    "roastGeneral": "You forgot your indentation? It's Python, not an abstract painting. Keep your code straight!",
    "roastTamil": "Oru indentation-ah poda theriyaadha loosu... compiler-e un laptop-ah thooki kuththu-kallu mela adichu un Aadhar card-ah block panruvan!",
    "lessons": [
      {
        "id": "ch1-l1",
        "title": "Indentation & Whitespace",
        "explanation": "Python uses whitespace to define blocks instead of braces.",
        "codeExample": "if True:\n    print('Indented correctly')\n    print('Still in the block')",
        "verificationChecks": [
          {
            "description": "Must use print",
            "pattern": "print",
            "errorMessage": "Where is the print statement?"
          }
        ],
        "miniQuiz": {
          "question": "What defines a code block in Python?",
          "options": [
            "Curly braces {}",
            "Indentation",
            "Semicolons",
            "Keywords"
          ],
          "correctAnswerIndex": 1
        },
        "funnyLineGeneral": "Spacing matters. It's like personal space for your code.",
        "funnyLineTamil": "Space idavita, moochu mutti sethurum code.",
        "expectedOutput": "Indented correctly\nStill in the block"
      },
      {
        "id": "ch1-l2",
        "title": "Comments & Docstrings",
        "explanation": "Use # for single line, and triple quotes for docstrings.",
        "codeExample": "# This is a comment\n'''\nThis is a docstring\n'''\nprint('Hello')",
        "verificationChecks": [
          {
            "description": "Must use #",
            "pattern": "#",
            "errorMessage": "Add a comment."
          }
        ],
        "miniQuiz": {
          "question": "Which symbol starts a comment?",
          "options": [
            "//",
            "/*",
            "#",
            "--"
          ],
          "correctAnswerIndex": 2
        },
        "funnyLineGeneral": "Comments are apologies to your future self.",
        "funnyLineTamil": "Naalaikku nee paatha unakke puriyaathu.",
        "expectedOutput": "Hello"
      },
      {
        "id": "ch1-l3",
        "title": "Line Continuation",
        "explanation": "Use backslash or parentheses to span multiple lines.",
        "codeExample": "total = (10 +\n         20)\nprint(total)",
        "verificationChecks": [
          {
            "description": "Must print total",
            "pattern": "total",
            "errorMessage": "Use the total variable."
          }
        ],
        "miniQuiz": {
          "question": "How do you implicitly continue a line?",
          "options": [
            "Use a comma",
            "Use backslash",
            "Use parentheses",
            "Use semicolon"
          ],
          "correctAnswerIndex": 2
        },
        "funnyLineGeneral": "Long lines are like long sentences, they need a break.",
        "funnyLineTamil": "Perusa pona, moolai hang aaidum.",
        "expectedOutput": "30"
      }
    ]
  },
  {
    "id": "ch2",
    "title": "Built-in Primitives & Data Types",
    "tier": "Beginner",
    "technicalCore": [
      "Integers (int)",
      "arbitrary-precision arithmetic",
      "floats (float)",
      "IEEE 754",
      "complex",
      "strings (str)",
      "Unicode",
      "bytes",
      "bytearray",
      "memoryview",
      "booleans (bool)",
      "NoneType"
    ],
    "analogyGeneral": "Mixing types incorrectly causes automatic type errors because Python refuses to guess your chaotic math.",
    "analogyTamil": "Ration shop-la rice, kerosene, and sugar-ah orey dabba-la pottu mix panna maari data types-ah mix panra un moolaiya ennnu solla!",
    "roastGeneral": "You said you'd study at 5 AM? That's a Falsy value\u2014sounds true, but it's fundamentally false.",
    "roastTamil": "Naalaikku kaalaila 5 manikku kandippa padikka poren' nu solradhu Falsy value\u2014pesumbodhu true maari irukkum, aana matter zero!",
    "lessons": [
      {
        "id": "ch2-l1",
        "title": "Integers and Floats",
        "explanation": "Python handles large ints automatically and floats with IEEE 754.",
        "codeExample": "large_int = 10**100\nsmall_float = 3.14\nprint(small_float)",
        "verificationChecks": [
          {
            "description": "Use **",
            "pattern": "\\*\\*",
            "errorMessage": "Use exponentiation."
          }
        ],
        "miniQuiz": {
          "question": "What is the maximum size of an int in Python?",
          "options": [
            "32-bit",
            "64-bit",
            "128-bit",
            "Arbitrary precision"
          ],
          "correctAnswerIndex": 3
        },
        "funnyLineGeneral": "Python ints can hold more money than you'll ever see.",
        "funnyLineTamil": "Bank account balance-vida int thaan perusu.",
        "expectedOutput": "3.14"
      },
      {
        "id": "ch2-l2",
        "title": "Strings and Booleans",
        "explanation": "Strings are immutable. Booleans are True or False.",
        "codeExample": "name = 'Python'\nis_fun = True\nprint(name)",
        "verificationChecks": [
          {
            "description": "Use True",
            "pattern": "True",
            "errorMessage": "Define a boolean."
          }
        ],
        "miniQuiz": {
          "question": "Which of these is a Falsy value?",
          "options": [
            "'False'",
            "0",
            "1",
            "True"
          ],
          "correctAnswerIndex": 1
        },
        "funnyLineGeneral": "A string is forever, like a bad tattoo.",
        "funnyLineTamil": "String-ah maatha mudiyathu, un lachanam maari.",
        "expectedOutput": "Python"
      },
      {
        "id": "ch2-l3",
        "title": "NoneType",
        "explanation": "None represents the absence of a value.",
        "codeExample": "val = None\nprint(val is None)",
        "verificationChecks": [
          {
            "description": "Check None",
            "pattern": "is None",
            "errorMessage": "Use 'is None'."
          }
        ],
        "miniQuiz": {
          "question": "What does None mean?",
          "options": [
            "Zero",
            "Empty string",
            "False",
            "Absence of a value"
          ],
          "correctAnswerIndex": 3
        },
        "funnyLineGeneral": "None is like your weekend plans.",
        "funnyLineTamil": "Un moolai maari, athula onnum illa.",
        "expectedOutput": "True"
      }
    ]
  },
  {
    "id": "ch3",
    "title": "Expressions & Operators",
    "tier": "Beginner",
    "technicalCore": [
      "Primary expressions",
      "attribute references",
      "subscriptions",
      "slicing",
      "arithmetic",
      "bitwise",
      "comparison",
      "logical",
      "short-circuiting",
      "ternary operator",
      "lambda",
      "walrus operator"
    ],
    "analogyGeneral": "Operator precedence dictates which calculation happens first. If you don't know it, your math becomes pure fiction.",
    "analogyTamil": "Operator precedence theriyama code potta, Vadivelu train comedy maari irukkum\u2014vangi vangi kattuva!",
    "roastGeneral": "Comparing numbers with strings? Are you comparing apples to slightly different apples? Your logic is taking a flight with a train ticket!",
    "roastTamil": "Comparing numbers with strings? Santhanam style-la sonna: 'Train ticket vangi flight-la eruna maari irukku da un logic!'",
    "lessons": [
      {
        "id": "ch3-l1",
        "title": "Arithmetic & Precedence",
        "explanation": "PEMDAS applies. Use parentheses to be explicit.",
        "codeExample": "result = 10 + 2 * 5\nprint(result)",
        "verificationChecks": [
          {
            "description": "Multiply",
            "pattern": "\\*",
            "errorMessage": "Do some multiplication."
          }
        ],
        "miniQuiz": {
          "question": "What is 10 + 2 * 5?",
          "options": [
            "60",
            "20",
            "17",
            "12"
          ],
          "correctAnswerIndex": 1
        },
        "funnyLineGeneral": "Math is hard, let Python do it.",
        "funnyLineTamil": "Kanakkula weak na, compiler kitta kelu.",
        "expectedOutput": "20"
      },
      {
        "id": "ch3-l2",
        "title": "Identity vs Equality",
        "explanation": "== checks value, `is` checks memory identity.",
        "codeExample": "a = [1]\nb = [1]\nprint(a == b, a is b)",
        "verificationChecks": [
          {
            "description": "Use is",
            "pattern": " is ",
            "errorMessage": "Use the 'is' keyword."
          }
        ],
        "miniQuiz": {
          "question": "What does 'is' check?",
          "options": [
            "Value",
            "Memory Address",
            "Type",
            "Length"
          ],
          "correctAnswerIndex": 1
        },
        "funnyLineGeneral": "They might look twins, but they live in different houses.",
        "funnyLineTamil": "Paaka ore maari irukkum aana vera vera aalu.",
        "expectedOutput": "True False"
      },
      {
        "id": "ch3-l3",
        "title": "Walrus Operator",
        "explanation": "The := operator assigns and returns a value.",
        "codeExample": "if (n := len([1,2,3])) > 2:\n    print(n)",
        "verificationChecks": [
          {
            "description": "Use walrus",
            "pattern": ":=",
            "errorMessage": "Use := operator."
          }
        ],
        "miniQuiz": {
          "question": "What does := do?",
          "options": [
            "Comments code",
            "Assigns and evaluates",
            "Divides",
            "Compares"
          ],
          "correctAnswerIndex": 1
        },
        "funnyLineGeneral": "It's a walrus. It assigns while it looks at you.",
        "funnyLineTamil": "Walrus maari assign pannikite paakum.",
        "expectedOutput": "3"
      }
    ]
  },
  {
    "id": "ch4",
    "title": "Statements & Control Flow",
    "tier": "Beginner",
    "technicalCore": [
      "Expression/assignment",
      "pass",
      "del",
      "return",
      "yield",
      "raise",
      "break/continue/else",
      "imports",
      "global/nonlocal",
      "assert",
      "if-elif-else",
      "match/case",
      "loops",
      "try-except-finally"
    ],
    "analogyGeneral": "Control flow manages how your program steps through execution logic. Without proper exits, you land in infinite loops.",
    "analogyTamil": "Infinite loop-ah? Idhu Rajini padathula vara punch dialogue madhiri... mudiyave mudiyadhu!",
    "roastGeneral": "If your control flow logic was a map, even GPS couldn't save us.",
    "roastTamil": "Un logic error output-ah paartha... appa 'Adhukku badhila oru cow vaangirukalam' nu yosipaan da!",
    "lessons": [
      {
        "id": "ch4-l1",
        "title": "If-Elif-Else",
        "explanation": "Branching logic with conditionals.",
        "codeExample": "age = 18\nif age >= 18:\n    print('Adult')\nelse:\n    print('Kid')",
        "verificationChecks": [
          {
            "description": "Use if",
            "pattern": "if ",
            "errorMessage": "Use if statement."
          }
        ],
        "miniQuiz": {
          "question": "Which keyword is used for alternative conditions?",
          "options": [
            "else if",
            "elseif",
            "elif",
            "case"
          ],
          "correctAnswerIndex": 2
        },
        "funnyLineGeneral": "Decisions, decisions. The code makes them for you.",
        "funnyLineTamil": "Life la thaan decision thappu, code layuma?",
        "expectedOutput": "Adult"
      },
      {
        "id": "ch4-l2",
        "title": "Loops and Else",
        "explanation": "For and while loops can have an else clause if no break happens.",
        "codeExample": "for i in range(3):\n    pass\nelse:\n    print('Done smoothly')",
        "verificationChecks": [
          {
            "description": "Use else",
            "pattern": "else:",
            "errorMessage": "Use the loop else clause."
          }
        ],
        "miniQuiz": {
          "question": "When does a loop's else clause run?",
          "options": [
            "Always",
            "If break is hit",
            "If loop completes without break",
            "On error"
          ],
          "correctAnswerIndex": 2
        },
        "funnyLineGeneral": "An else on a loop? Yes, it's a thing.",
        "funnyLineTamil": "Loop kulla else potta aacharyama pakurane.",
        "expectedOutput": "Done smoothly"
      },
      {
        "id": "ch4-l3",
        "title": "Match/Case",
        "explanation": "Structural pattern matching introduced in 3.10.",
        "codeExample": "status = 404\nmatch status:\n    case 404:\n        print('Not found')\n    case _:\n        print('Other')",
        "verificationChecks": [
          {
            "description": "Use match",
            "pattern": "match ",
            "errorMessage": "Use match statement."
          }
        ],
        "miniQuiz": {
          "question": "What acts as the default case in match?",
          "options": [
            "default:",
            "case *:",
            "case _:",
            "else:"
          ],
          "correctAnswerIndex": 2
        },
        "funnyLineGeneral": "Match case: finally a switch statement, but cooler.",
        "funnyLineTamil": "Switch thaan, aana konjam gethu.",
        "expectedOutput": "Not found"
      }
    ]
  },
  {
    "id": "ch5",
    "title": "Built-in Functions",
    "tier": "Beginner",
    "technicalCore": [
      "abs",
      "all",
      "any",
      "enumerate",
      "eval",
      "exec",
      "filter",
      "map",
      "divmod",
      "super",
      "zip"
    ],
    "analogyGeneral": "Python gives you a massive toolbox out of the box, yet people still write custom code that breaks everything.",
    "analogyTamil": "Veetla irukra mixer, grinder-ah ellam use panna theriyaama, kaiya kondu poi blades kulla vidura maari irukku un builtin usage!",
    "roastGeneral": "Why reinvent the wheel when Python gives you the whole car?",
    "roastTamil": "Evalavo functions irukku... aana nee mattum yen daellarum thechutu irukka?",
    "lessons": [
      {
        "id": "ch5-l1",
        "title": "Enumerate",
        "explanation": "Get index and value at the same time.",
        "codeExample": "items = ['a', 'b']\nfor idx, val in enumerate(items):\n    print(idx, val)",
        "verificationChecks": [
          {
            "description": "Use enumerate",
            "pattern": "enumerate",
            "errorMessage": "Use enumerate()."
          }
        ],
        "miniQuiz": {
          "question": "What does enumerate return?",
          "options": [
            "Just indexes",
            "Just values",
            "Index and value pairs",
            "A dictionary"
          ],
          "correctAnswerIndex": 2
        },
        "funnyLineGeneral": "Stop keeping a counter variable manually.",
        "funnyLineTamil": "I=0 nu potu uyira vaangatha.",
        "expectedOutput": "0 a\n1 b"
      },
      {
        "id": "ch5-l2",
        "title": "Zip",
        "explanation": "Iterate over multiple iterables in parallel.",
        "codeExample": "a = [1, 2]\nb = ['x', 'y']\nfor n, l in zip(a, b):\n    print(n, l)",
        "verificationChecks": [
          {
            "description": "Use zip",
            "pattern": "zip",
            "errorMessage": "Use zip()."
          }
        ],
        "miniQuiz": {
          "question": "What happens if zipped lists are of unequal length?",
          "options": [
            "Error",
            "Pads with None",
            "Stops at the shortest",
            "Loops the shorter one"
          ],
          "correctAnswerIndex": 2
        },
        "funnyLineGeneral": "Zipper for your data, don't get caught.",
        "funnyLineTamil": "Zip panni kootitu po.",
        "expectedOutput": "1 x\n2 y"
      },
      {
        "id": "ch5-l3",
        "title": "Eval & Exec",
        "explanation": "Execute strings as code. Dangerous if untrusted.",
        "codeExample": "result = eval('2 + 3')\nprint(result)",
        "verificationChecks": [
          {
            "description": "Use eval",
            "pattern": "eval",
            "errorMessage": "Use eval()."
          }
        ],
        "miniQuiz": {
          "question": "Why is eval dangerous?",
          "options": [
            "It's slow",
            "It runs arbitrary code",
            "It takes memory",
            "It's deprecated"
          ],
          "correctAnswerIndex": 1
        },
        "funnyLineGeneral": "Evaluating untrusted strings is asking for trouble.",
        "funnyLineTamil": "Eval potta un system evalavo kastapadum.",
        "expectedOutput": "5"
      }
    ]
  },
  {
    "id": "ch6",
    "title": "Built-in Exceptions Hierarchy",
    "tier": "Intermediate",
    "technicalCore": [
      "BaseException",
      "Exception",
      "ArithmeticError",
      "LookupError",
      "ValueError",
      "TypeError",
      "SyntaxError",
      "KeyError",
      "IndexError"
    ],
    "analogyGeneral": "Exceptions are the system's way of screaming at you for doing something mathematically or logically impossible.",
    "analogyTamil": "Zero-vaala divide panriya? Nee oru periya scientific genius thaan po! Antha error trace-ah paartha un appa-ve unna block panruvan.",
    "roastGeneral": "Dividing by zero? Brilliant. You just ripped a hole in the space-time continuum.",
    "roastTamil": "Zero-vaala divide panriya? Server-e vaanthi eduthu sethurum.",
    "lessons": [
      {
        "id": "ch6-l1",
        "title": "ZeroDivisionError",
        "explanation": "Don't divide by zero.",
        "codeExample": "try:\n    print(1/0)\nexcept ZeroDivisionError:\n    print('Caught!')",
        "verificationChecks": [
          {
            "description": "Catch ZeroDivisionError",
            "pattern": "ZeroDivisionError",
            "errorMessage": "Catch the specific error."
          }
        ],
        "miniQuiz": {
          "question": "Which exception is raised for 1/0?",
          "options": [
            "ValueError",
            "TypeError",
            "ZeroDivisionError",
            "MathError"
          ],
          "correctAnswerIndex": 2
        },
        "funnyLineGeneral": "Even calculators complain about this.",
        "funnyLineTamil": "Zero-vaala divide panni enna saadhikka pora?",
        "expectedOutput": "Caught!"
      },
      {
        "id": "ch6-l2",
        "title": "Lookup Errors",
        "explanation": "IndexError for lists, KeyError for dicts.",
        "codeExample": "try:\n    {}[1]\nexcept KeyError:\n    print('Key missing')",
        "verificationChecks": [
          {
            "description": "Catch KeyError",
            "pattern": "KeyError",
            "errorMessage": "Catch the KeyError."
          }
        ],
        "miniQuiz": {
          "question": "Missing key in dict raises?",
          "options": [
            "IndexError",
            "ValueError",
            "KeyError",
            "LookupError"
          ],
          "correctAnswerIndex": 2
        },
        "funnyLineGeneral": "Looking for something that's not there.",
        "funnyLineTamil": "Illatha key-ah thedina epdi varum?",
        "expectedOutput": "Key missing"
      },
      {
        "id": "ch6-l3",
        "title": "Type & Value Errors",
        "explanation": "TypeError is bad operations, ValueError is bad data.",
        "codeExample": "try:\n    int('abc')\nexcept ValueError:\n    print('Bad value')",
        "verificationChecks": [
          {
            "description": "Catch ValueError",
            "pattern": "ValueError",
            "errorMessage": "Catch the ValueError."
          }
        ],
        "miniQuiz": {
          "question": "int('abc') raises?",
          "options": [
            "TypeError",
            "ValueError",
            "ParseError",
            "StringError"
          ],
          "correctAnswerIndex": 1
        },
        "funnyLineGeneral": "You can't force a word to be a number.",
        "funnyLineTamil": "Alphabet-ah number aaka paakuriya.",
        "expectedOutput": "Bad value"
      }
    ]
  },
  {
    "id": "ch7",
    "title": "Built-in Data Structures & Collections",
    "tier": "Intermediate",
    "technicalCore": [
      "Lists",
      "Tuples",
      "Dictionaries",
      "Sets",
      "Hash tables",
      "dynamic arrays"
    ],
    "analogyGeneral": "Choosing the wrong collection data structure turns an O(1) lookup into an O(n) dumpster fire.",
    "analogyTamil": "College canteen bench-la varisaiya ukkandhirukura gang maari list irukku, aana un moolai mattum empty dictionary!",
    "roastGeneral": "You used a list to check for existence? The dictionary called, it wants its O(1) back.",
    "roastTamil": "Key-value data packet... College ID card: { name: 'Mano', dept: 'Mech', arrears: 5, status: 'Vera Maari' }",
    "lessons": [
      {
        "id": "ch7-l1",
        "title": "Lists (Dynamic Arrays)",
        "explanation": "Mutable, ordered sequences. O(1) append.",
        "codeExample": "lst = [1, 2]\nlst.append(3)\nprint(lst)",
        "verificationChecks": [
          {
            "description": "Use append",
            "pattern": "append",
            "errorMessage": "Append to the list."
          }
        ],
        "miniQuiz": {
          "question": "What's the complexity of list append?",
          "options": [
            "O(1)",
            "O(n)",
            "O(log n)",
            "O(n^2)"
          ],
          "correctAnswerIndex": 0
        },
        "funnyLineGeneral": "Lists just keep growing.",
        "funnyLineTamil": "List perusa poite irukku.",
        "expectedOutput": "[1, 2, 3]"
      },
      {
        "id": "ch7-l2",
        "title": "Dictionaries (Hash Tables)",
        "explanation": "Key-value pairs. O(1) lookup.",
        "codeExample": "d = {'a': 1}\nprint(d['a'])",
        "verificationChecks": [
          {
            "description": "Define dict",
            "pattern": "\\{.*\\}",
            "errorMessage": "Define a dictionary."
          }
        ],
        "miniQuiz": {
          "question": "What's the complexity of dict lookup?",
          "options": [
            "O(1)",
            "O(n)",
            "O(log n)",
            "O(n^2)"
          ],
          "correctAnswerIndex": 0
        },
        "funnyLineGeneral": "Dictionaries know exactly where everything is.",
        "funnyLineTamil": "Udaney answer varum.",
        "expectedOutput": "1"
      },
      {
        "id": "ch7-l3",
        "title": "Sets (Unique)",
        "explanation": "Hash-based unique collections.",
        "codeExample": "s = {1, 2, 2}\nprint(s)",
        "verificationChecks": [
          {
            "description": "Define set",
            "pattern": "set\\(|\\{.*,.*\\}",
            "errorMessage": "Define a set."
          }
        ],
        "miniQuiz": {
          "question": "Sets contain only...",
          "options": [
            "Strings",
            "Numbers",
            "Unique elements",
            "Lists"
          ],
          "correctAnswerIndex": 2
        },
        "funnyLineGeneral": "No duplicates allowed in the VIP section.",
        "funnyLineTamil": "Duplicate-ku entry illa.",
        "expectedOutput": "{1, 2}"
      }
    ]
  },
  {
    "id": "ch8",
    "title": "Functions, Scope, & Closures",
    "tier": "Intermediate",
    "technicalCore": [
      "Positional-only",
      "Keyword-only",
      "*args",
      "**kwargs",
      "mutable default argument trap",
      "LEGB scope",
      "closures"
    ],
    "analogyGeneral": "Mutable default arguments persist across function calls, creating bugs that haunt you like a bad memory.",
    "analogyTamil": "Veetukulla amma thitturadhu 'Local Scope'; theruvula loud-speaker 'Global Scope'! Un scope-uh kootitu pona rendu perum oodiruvaanga.",
    "roastGeneral": "Using a mutable default argument? Prepare for the ghosts of past function calls.",
    "roastTamil": "Mutable default argument vekura loosu... andha list eppovumae un koodave suthum, romba paavam!",
    "lessons": [
      {
        "id": "ch8-l1",
        "title": "Args & Kwargs",
        "explanation": "Variable length arguments.",
        "codeExample": "def f(*args, **kwargs):\n    print(args, kwargs)\nf(1, a=2)",
        "verificationChecks": [
          {
            "description": "Use kwargs",
            "pattern": "\\*\\*kwargs",
            "errorMessage": "Use **kwargs."
          }
        ],
        "miniQuiz": {
          "question": "What does **kwargs collect?",
          "options": [
            "Positional arguments",
            "Keyword arguments",
            "Both",
            "None"
          ],
          "correctAnswerIndex": 1
        },
        "funnyLineGeneral": "Catching arguments like a net.",
        "funnyLineTamil": "Ellathiyum allikita.",
        "expectedOutput": "(1,) {'a': 2}"
      },
      {
        "id": "ch8-l2",
        "title": "The Default Argument Trap",
        "explanation": "Never use [] as a default. Use None.",
        "codeExample": "def bad(item, lst=[]):\n    lst.append(item)\n    return lst\nprint(bad(1))\nprint(bad(2))  # Oops\ndef good(item, lst=None):\n    lst = lst or []\n    lst.append(item)\n    return lst\nprint(good(3))\nprint(good(4))",
        "verificationChecks": [
          {
            "description": "Use None",
            "pattern": "None",
            "errorMessage": "Use None as default."
          }
        ],
        "miniQuiz": {
          "question": "Why avoid [] as a default argument?",
          "options": [
            "It's slow",
            "It's syntax error",
            "It persists state across calls",
            "It's immutable"
          ],
          "correctAnswerIndex": 2
        },
        "funnyLineGeneral": "Ghosts of previous calls will haunt your list.",
        "funnyLineTamil": "Pazhaiya item ellam list la ottikitchu.",
        "expectedOutput": "[1]\n[1, 2]\n[3]\n[4]"
      },
      {
        "id": "ch8-l3",
        "title": "Closures",
        "explanation": "Functions returning functions retaining state.",
        "codeExample": "def outer(x):\n    def inner(y):\n        return x+y\n    return inner\nprint(outer(5)(3))",
        "verificationChecks": [
          {
            "description": "Nested function",
            "pattern": "def inner",
            "errorMessage": "Create an inner function."
          }
        ],
        "miniQuiz": {
          "question": "What does a closure remember?",
          "options": [
            "Global state",
            "Enclosing scope variables",
            "File names",
            "Classes"
          ],
          "correctAnswerIndex": 1
        },
        "funnyLineGeneral": "It remembers everything, like an elephant.",
        "funnyLineTamil": "Marakkave marakkathu.",
        "expectedOutput": "8"
      }
    ]
  },
  {
    "id": "ch9",
    "title": "Object-Oriented Programming & The Data Model",
    "tier": "Intermediate",
    "technicalCore": [
      "__new__",
      "__init__",
      "MRO",
      "C3 Linearization",
      "dataclass",
      "enums",
      "namedtuple",
      "__slots__"
    ],
    "analogyGeneral": "Object-oriented programming lets you build clean blueprints, unless your blueprint looks like a collapsed building.",
    "analogyTamil": "Class-um object-um potu code pannitu, 'En code run aagala' nu aluva paaru... Vadivelu Kaipulla style-la road-la kizhangu vizhuva!",
    "roastGeneral": "Single inheritance, multiple inheritance... the only inheritance you're getting is technical debt.",
    "roastTamil": "Single inheritance, multiple inheritance... un life-la inheritance-ah varudhu paththi karam-mulla loan dhaan varum!",
    "lessons": [
      {
        "id": "ch9-l1",
        "title": "Classes and Instances",
        "explanation": "Define blueprints.",
        "codeExample": "class Car:\n    def __init__(self, brand):\n        self.brand = brand\nc = Car('Toyota')\nprint(c.brand)",
        "verificationChecks": [
          {
            "description": "Use class",
            "pattern": "class ",
            "errorMessage": "Define a class."
          }
        ],
        "miniQuiz": {
          "question": "Which method initializes an instance?",
          "options": [
            "__new__",
            "__init__",
            "__start__",
            "__main__"
          ],
          "correctAnswerIndex": 1
        },
        "funnyLineGeneral": "Building blueprints for your data.",
        "funnyLineTamil": "Class potutu object create pannu.",
        "expectedOutput": "Toyota"
      },
      {
        "id": "ch9-l2",
        "title": "Dataclasses",
        "explanation": "Less boilerplate for data containers.",
        "codeExample": "from dataclasses import dataclass\n@dataclass\nclass Point:\n    x: int\n    y: int\nprint(Point(1, 2))",
        "verificationChecks": [
          {
            "description": "Use dataclass",
            "pattern": "@dataclass",
            "errorMessage": "Use the decorator."
          }
        ],
        "miniQuiz": {
          "question": "What does @dataclass auto-generate?",
          "options": [
            "Only __init__",
            "__init__, __repr__, and more",
            "Nothing",
            "Generators"
          ],
          "correctAnswerIndex": 1
        },
        "funnyLineGeneral": "Writing less code is always the goal.",
        "funnyLineTamil": "Auto maari code adikkum.",
        "expectedOutput": "Point(x=1, y=2)"
      },
      {
        "id": "ch9-l3",
        "title": "MRO (Method Resolution Order)",
        "explanation": "How Python resolves multiple inheritance.",
        "codeExample": "class A: pass\nclass B(A): pass\nprint(B.mro())",
        "verificationChecks": [
          {
            "description": "Call mro",
            "pattern": "mro\\(\\)",
            "errorMessage": "Check the MRO."
          }
        ],
        "miniQuiz": {
          "question": "What algorithm calculates MRO?",
          "options": [
            "DFS",
            "BFS",
            "C3 Linearization",
            "Dijkstra"
          ],
          "correctAnswerIndex": 2
        },
        "funnyLineGeneral": "Who do you inherit from first? The C3 knows.",
        "funnyLineTamil": "Appa thodara illa thatha thodara nu kandupudikum.",
        "expectedOutput": "[<class '__main__.B'>, <class '__main__.A'>, <class 'object'>]"
      }
    ]
  },
  {
    "id": "ch10",
    "title": "Special (Dunder) Methods Reference",
    "tier": "Advanced",
    "technicalCore": [
      "__str__",
      "__repr__",
      "__getitem__",
      "__setitem__",
      "__add__",
      "__enter__",
      "__exit__"
    ],
    "analogyGeneral": "Dunder methods are Python's secret hooks that let your custom classes behave like native types.",
    "analogyTamil": "Double underscore podurathu unaku fashion aaiducha? Dunder-ah potu code-ah sethu vechuruka da!",
    "roastGeneral": "Using objects without dunder methods is like driving a car without a steering wheel.",
    "roastTamil": "Dunder methods theriyaama OOP panra, brake illadha bike-ah 100 kmph-la ootura maari!",
    "lessons": [
      {
        "id": "ch10-l1",
        "title": "Str and Repr",
        "explanation": "__str__ is for users, __repr__ is for devs.",
        "codeExample": "class A:\n    def __str__(self): return 'str'\n    def __repr__(self): return 'repr'\nprint(str(A()), repr(A()))",
        "verificationChecks": [
          {
            "description": "Implement __str__",
            "pattern": "__str__",
            "errorMessage": "Define __str__."
          }
        ],
        "miniQuiz": {
          "question": "What is __repr__ for?",
          "options": [
            "Users",
            "Debugging",
            "Math",
            "Printing"
          ],
          "correctAnswerIndex": 1
        },
        "funnyLineGeneral": "Two faces for your objects.",
        "funnyLineTamil": "Rendu mugam.",
        "expectedOutput": "str repr"
      },
      {
        "id": "ch10-l2",
        "title": "Container Emulation",
        "explanation": "__getitem__ lets you use [] on objects.",
        "codeExample": "class C:\n    def __getitem__(self, key): return key * 2\nprint(C()[5])",
        "verificationChecks": [
          {
            "description": "Implement __getitem__",
            "pattern": "__getitem__",
            "errorMessage": "Define __getitem__."
          }
        ],
        "miniQuiz": {
          "question": "Which method enables obj[key]?",
          "options": [
            "__get__",
            "__getitem__",
            "__call__",
            "__dict__"
          ],
          "correctAnswerIndex": 1
        },
        "funnyLineGeneral": "Pretending to be a list is fun.",
        "funnyLineTamil": "List maari vesham.",
        "expectedOutput": "10"
      },
      {
        "id": "ch10-l3",
        "title": "Context Managers",
        "explanation": "__enter__ and __exit__ for the 'with' statement.",
        "codeExample": "class CTX:\n    def __enter__(self): return self\n    def __exit__(self, *args): pass\nwith CTX() as c:\n    print('Inside')",
        "verificationChecks": [
          {
            "description": "Implement __enter__",
            "pattern": "__enter__",
            "errorMessage": "Define __enter__."
          }
        ],
        "miniQuiz": {
          "question": "Which method handles cleanup in a 'with' block?",
          "options": [
            "__close__",
            "__del__",
            "__exit__",
            "__finish__"
          ],
          "correctAnswerIndex": 2
        },
        "funnyLineGeneral": "Always clean up after yourself.",
        "funnyLineTamil": "Velai mudinja close panniudu.",
        "expectedOutput": "Inside"
      }
    ]
  },
  {
    "id": "ch11",
    "title": "Advanced Iteration, Comprehensions, & Generators",
    "tier": "Advanced",
    "technicalCore": [
      "Comprehensions",
      "Generators",
      "lazy evaluation",
      "yield from",
      "iterator protocol"
    ],
    "analogyGeneral": "Generators evaluate lazily, saving memory instead of crashing your RAM with massive datasets.",
    "analogyTamil": "Memory pathala! Un moolai mathiri computer moolayum chinnadhu da. Generator-ah use panna theriyaama 10GB RAM-ah blast panruvan.",
    "roastGeneral": "Loading 10 million items into a list? RIP your RAM.",
    "roastTamil": "Lazy evaluation... un moolai mathiriye romba somberi-ah memory save pannum!",
    "lessons": [
      {
        "id": "ch11-l1",
        "title": "Comprehensions",
        "explanation": "Concise way to create lists.",
        "codeExample": "sq = [x*x for x in range(3)]\nprint(sq)",
        "verificationChecks": [
          {
            "description": "Use comprehension",
            "pattern": "\\[.*\\]",
            "errorMessage": "Write a comprehension."
          }
        ],
        "miniQuiz": {
          "question": "What's the output of [x for x in [1,2] if x>1]?",
          "options": [
            "[1, 2]",
            "[1]",
            "[2]",
            "Error"
          ],
          "correctAnswerIndex": 2
        },
        "funnyLineGeneral": "One liners that actually make sense.",
        "funnyLineTamil": "Orey variyila matter mudinjathu.",
        "expectedOutput": "[0, 1, 4]"
      },
      {
        "id": "ch11-l2",
        "title": "Generators",
        "explanation": "Yield produces values lazily.",
        "codeExample": "def g():\n    yield 1\n    yield 2\nfor v in g():\n    print(v)",
        "verificationChecks": [
          {
            "description": "Use yield",
            "pattern": "yield",
            "errorMessage": "Use the yield keyword."
          }
        ],
        "miniQuiz": {
          "question": "Generators evaluate...",
          "options": [
            "Eagerly",
            "Lazily",
            "Randomly",
            "Backward"
          ],
          "correctAnswerIndex": 1
        },
        "funnyLineGeneral": "Lazy evaluation is a feature, not a bug.",
        "funnyLineTamil": "Somberi code, aana nallathu.",
        "expectedOutput": "1\n2"
      },
      {
        "id": "ch11-l3",
        "title": "Yield From",
        "explanation": "Delegate to sub-generators.",
        "codeExample": "def g1():\n    yield from [1, 2]\nprint(list(g1()))",
        "verificationChecks": [
          {
            "description": "Use yield from",
            "pattern": "yield from",
            "errorMessage": "Use yield from."
          }
        ],
        "miniQuiz": {
          "question": "What does yield from do?",
          "options": [
            "Stops generator",
            "Delegates to another iterable",
            "Throws error",
            "Restarts"
          ],
          "correctAnswerIndex": 1
        },
        "funnyLineGeneral": "Passing the buck to another generator.",
        "funnyLineTamil": "Adutha aalkita velai kudukrathu.",
        "expectedOutput": "[1, 2]"
      }
    ]
  },
  {
    "id": "ch12",
    "title": "Metaprogramming & Advanced Language Constructs",
    "tier": "Advanced",
    "technicalCore": [
      "Properties",
      "Descriptors",
      "Decorators",
      "functools.wraps",
      "Metaclasses"
    ],
    "analogyGeneral": "Metaprogramming lets code write code. Give it to a beginner, and it writes a direct ticket to chaos.",
    "analogyTamil": "Metaprogramming-la erangurathukku munnadi, basic indentation poda kathukada! Compiler-e un screen-kulla irunthu veliya vanthu adipan.",
    "roastGeneral": "Writing a metaclass? You don't even know how a normal class works.",
    "roastTamil": "Metaprogramming panriya? Unakku adhoda spelling theriyuma da muttal!",
    "lessons": [
      {
        "id": "ch12-l1",
        "title": "Properties",
        "explanation": "Managed attribute access.",
        "codeExample": "class C:\n    @property\n    def x(self): return 5\nprint(C().x)",
        "verificationChecks": [
          {
            "description": "Use property",
            "pattern": "@property",
            "errorMessage": "Use @property."
          }
        ],
        "miniQuiz": {
          "question": "What does @property do?",
          "options": [
            "Hides it",
            "Makes it a method",
            "Provides attribute access",
            "Deletes it"
          ],
          "correctAnswerIndex": 2
        },
        "funnyLineGeneral": "Looking like an attribute, acting like a method.",
        "funnyLineTamil": "Vesham pottu varuthu.",
        "expectedOutput": "5"
      },
      {
        "id": "ch12-l2",
        "title": "Decorators",
        "explanation": "Functions that wrap functions.",
        "codeExample": "def dec(f):\n    def wrap():\n        print('Hi')\n        f()\n    return wrap\n@dec\ndef say(): pass\nsay()",
        "verificationChecks": [
          {
            "description": "Use decorator syntax",
            "pattern": "@",
            "errorMessage": "Use @ syntax."
          }
        ],
        "miniQuiz": {
          "question": "What does a decorator return usually?",
          "options": [
            "String",
            "Wrapper function",
            "Class",
            "None"
          ],
          "correctAnswerIndex": 1
        },
        "funnyLineGeneral": "Wrapping your code like a present.",
        "funnyLineTamil": "Gift paper-la suthuna maari.",
        "expectedOutput": "Hi"
      },
      {
        "id": "ch12-l3",
        "title": "Metaclasses",
        "explanation": "Classes that create classes.",
        "codeExample": "class M(type): pass\nclass C(metaclass=M): pass\nprint(type(C))",
        "verificationChecks": [
          {
            "description": "Use metaclass",
            "pattern": "metaclass=",
            "errorMessage": "Define a metaclass."
          }
        ],
        "miniQuiz": {
          "question": "What is the default metaclass?",
          "options": [
            "object",
            "type",
            "class",
            "meta"
          ],
          "correctAnswerIndex": 1
        },
        "funnyLineGeneral": "Inception, but for Python classes.",
        "funnyLineTamil": "Class-ke class edukkuthu.",
        "expectedOutput": "<class '__main__.M'>"
      }
    ]
  },
  {
    "id": "ch13",
    "title": "Asynchronous Programming & Concurrency Semantics",
    "tier": "Expert",
    "technicalCore": [
      "Coroutines",
      "async def",
      "await",
      "asyncio",
      "tasks",
      "futures"
    ],
    "analogyGeneral": "Async programming allows your app to handle multiple tasks without blocking, provided you don't deadlock everything.",
    "analogyTamil": "Async-ah code ezhudhi freeze aakitu, 'En laptop hang aayiduchu' nu solli thiriyuraan! Un logic-um async, moolai-um async (offline)!",
    "roastGeneral": "You made it async but didn't await it. Now it's just a lonely coroutine crying in memory.",
    "roastTamil": "Await podama async call panriya? Un moolai offline poyiduchu.",
    "lessons": [
      {
        "id": "ch13-l1",
        "title": "Async/Await Basics",
        "explanation": "Define coroutines with async def.",
        "codeExample": "import asyncio\nasync def main():\n    print('Hello')\nasyncio.run(main())",
        "verificationChecks": [
          {
            "description": "Use async def",
            "pattern": "async def",
            "errorMessage": "Define an async function."
          }
        ],
        "miniQuiz": {
          "question": "How do you run the top-level async function?",
          "options": [
            "await main()",
            "asyncio.run()",
            "run(main)",
            "start()"
          ],
          "correctAnswerIndex": 1
        },
        "funnyLineGeneral": "Waiting politely for things to happen.",
        "funnyLineTamil": "Porumai mukkiyam.",
        "expectedOutput": "Hello"
      },
      {
        "id": "ch13-l2",
        "title": "Awaiting Coroutines",
        "explanation": "Use await to pause execution.",
        "codeExample": "import asyncio\nasync def f(): return 1\nasync def m():\n    print(await f())\nasyncio.run(m())",
        "verificationChecks": [
          {
            "description": "Use await",
            "pattern": "await ",
            "errorMessage": "Await the coroutine."
          }
        ],
        "miniQuiz": {
          "question": "What can you await?",
          "options": [
            "Ints",
            "Strings",
            "Awaitables",
            "Lists"
          ],
          "correctAnswerIndex": 2
        },
        "funnyLineGeneral": "Don't forget to await, or it never happens.",
        "funnyLineTamil": "Wait pannati onnum kedaikathu.",
        "expectedOutput": "1"
      },
      {
        "id": "ch13-l3",
        "title": "Asyncio Tasks",
        "explanation": "Run coroutines concurrently.",
        "codeExample": "import asyncio\nasync def t(): return 2\nasync def m():\n    task = asyncio.create_task(t())\n    print(await task)\nasyncio.run(m())",
        "verificationChecks": [
          {
            "description": "Create task",
            "pattern": "create_task",
            "errorMessage": "Use create_task."
          }
        ],
        "miniQuiz": {
          "question": "What schedules a coroutine concurrently?",
          "options": [
            "asyncio.sleep",
            "asyncio.create_task",
            "await",
            "async def"
          ],
          "correctAnswerIndex": 1
        },
        "funnyLineGeneral": "Multitasking for code.",
        "funnyLineTamil": "Orey nerathula rendu velai.",
        "expectedOutput": "2"
      }
    ]
  },
  {
    "id": "ch14",
    "title": "Static Typing & The Type System",
    "tier": "Expert",
    "technicalCore": [
      "Type hints",
      "annotations",
      "unions",
      "generics",
      "protocols",
      "type guards"
    ],
    "analogyGeneral": "Static typing saves you from passing strings where integers belong, preventing midnight runtime disasters.",
    "analogyTamil": "Type hint podumaanu ketta, type pannuradhe periya vishayam-ngura maari muzhikkuran!",
    "roastGeneral": "You typed it as 'Any'. That's not typing, that's giving up.",
    "roastTamil": "Any nu type hint kudukurathu... bathil theriyama exam la eadho ezhudhi vaikra maari.",
    "lessons": [
      {
        "id": "ch14-l1",
        "title": "Basic Type Hints",
        "explanation": "Annotate variables and returns.",
        "codeExample": "def add(x: int, y: int) -> int:\n    return x + y\nprint(add(1, 2))",
        "verificationChecks": [
          {
            "description": "Use int hint",
            "pattern": "int",
            "errorMessage": "Add type hints."
          }
        ],
        "miniQuiz": {
          "question": "Are type hints enforced at runtime by default?",
          "options": [
            "Yes",
            "No",
            "Only in functions",
            "Only in classes"
          ],
          "correctAnswerIndex": 1
        },
        "funnyLineGeneral": "Documentation that tools can read.",
        "funnyLineTamil": "Code-ku label ottrathu.",
        "expectedOutput": "3"
      },
      {
        "id": "ch14-l2",
        "title": "Unions & Optionals",
        "explanation": "When a value can be multiple types.",
        "codeExample": "from typing import Union, Optional\nval: Optional[int] = None\nprint(val)",
        "verificationChecks": [
          {
            "description": "Use Optional",
            "pattern": "Optional",
            "errorMessage": "Use Optional."
          }
        ],
        "miniQuiz": {
          "question": "Optional[int] is equivalent to?",
          "options": [
            "int",
            "Union[int, None]",
            "Any",
            "Union[int, str]"
          ],
          "correctAnswerIndex": 1
        },
        "funnyLineGeneral": "It's optional, like your attendance.",
        "funnyLineTamil": "Irukkalam illamalum pogalam.",
        "expectedOutput": "None"
      },
      {
        "id": "ch14-l3",
        "title": "Protocols (Duck Typing)",
        "explanation": "Structural subtyping in Python.",
        "codeExample": "from typing import Protocol\nclass Duck(Protocol):\n    def quack(self): pass\nprint('Done')",
        "verificationChecks": [
          {
            "description": "Use Protocol",
            "pattern": "Protocol",
            "errorMessage": "Import Protocol."
          }
        ],
        "miniQuiz": {
          "question": "Protocols implement what kind of typing?",
          "options": [
            "Nominal",
            "Structural",
            "Dynamic",
            "Weak"
          ],
          "correctAnswerIndex": 1
        },
        "funnyLineGeneral": "If it walks like a duck, type hint it as a Duck.",
        "funnyLineTamil": "Vathu maari iruntha vathu nu sollu.",
        "expectedOutput": "Done"
      }
    ]
  },
  {
    "id": "ch15",
    "title": "CPython Internals & The GIL",
    "tier": "Expert",
    "technicalCore": [
      "Reference counting",
      "Garbage collection",
      "Integer interning",
      "Compilation pipeline",
      "GIL"
    ],
    "analogyGeneral": "CPython internals expose how Python manages memory via reference counting and the GIL.",
    "analogyTamil": "GIL-ah pathi pesura... munnadi un code-la irukra reference leak-ah thedi eduda, loosu! CPython-e un code-ah paathu aludhurum.",
    "roastGeneral": "Trying to bypass the GIL with threads? Cute.",
    "roastTamil": "Global Interpreter Lock... oru chocolate-ah 10 per sanda potu saapudra maari, multithreading irundhalum oruthan dhaan velai seiyum!",
    "lessons": [
      {
        "id": "ch15-l1",
        "title": "Reference Counting",
        "explanation": "sys.getrefcount shows active references.",
        "codeExample": "import sys\na = []\nprint(sys.getrefcount(a))",
        "verificationChecks": [
          {
            "description": "Use getrefcount",
            "pattern": "getrefcount",
            "errorMessage": "Check refcount."
          }
        ],
        "miniQuiz": {
          "question": "What is Python's primary memory management tool?",
          "options": [
            "Tracing GC",
            "Reference Counting",
            "Manual free",
            "ARC"
          ],
          "correctAnswerIndex": 1
        },
        "funnyLineGeneral": "Keeping track of who's looking at the object.",
        "funnyLineTamil": "Evlo per paakuranga nu count pannuthu.",
        "expectedOutput": "2"
      },
      {
        "id": "ch15-l2",
        "title": "Integer Interning",
        "explanation": "Small ints are pre-allocated.",
        "codeExample": "a = 256\nb = 256\nprint(a is b)\nx = 257\ny = 257\nprint(x is y)",
        "verificationChecks": [
          {
            "description": "Use is",
            "pattern": " is ",
            "errorMessage": "Use identity check."
          }
        ],
        "miniQuiz": {
          "question": "Which range of integers is interned in CPython?",
          "options": [
            "0 to 100",
            "-5 to 256",
            "1 to 1000",
            "None"
          ],
          "correctAnswerIndex": 1
        },
        "funnyLineGeneral": "Python hoards small numbers just in case.",
        "funnyLineTamil": "Chinna number ah pathrama vachuruku.",
        "expectedOutput": "True\nTrue"
      },
      {
        "id": "ch15-l3",
        "title": "The Bytecode (dis)",
        "explanation": "Disassemble Python into CPython bytecode.",
        "codeExample": "import dis\ndef f(): pass\ndis.dis(f)",
        "verificationChecks": [
          {
            "description": "Use dis",
            "pattern": "dis\\.dis",
            "errorMessage": "Disassemble it."
          }
        ],
        "miniQuiz": {
          "question": "What module disassembles Python code?",
          "options": [
            "ast",
            "compile",
            "dis",
            "bytecode"
          ],
          "correctAnswerIndex": 2
        },
        "funnyLineGeneral": "Looking at the matrix code.",
        "funnyLineTamil": "Ulla enna oduthu nu paakurathu.",
        "expectedOutput": "2           0 RESUME                   0\n              2 RETURN_CONST             0 (None)"
      }
    ]
  },
  {
    id: "ch16-datascience",
    title: "Chapter 16: Data Science Libraries",
    tier: "Specialized",
    technicalCore: [
      "NumPy arrays",
      "Pandas dataframes",
      "SciPy",
      "Matplotlib plots & charts"
    ],
    analogyGeneral: "Data science without Pandas is like trying to organize a million-row spreadsheet with a pencil. Pandas gives you a bulldozer.",
    analogyTamil: "Oru kodi row excel sheet-ah pencil-a vachu kutha koodadhu... Pandas use panni JCB vachu alli podanum!",
    roastGeneral: "Using pure Python loops to process a 100MB CSV? Your CPU is crying, and your RAM just filed a restraining order.",
    roastTamil: "For loop potu 100MB CSV-ah process panriya? Un laptop unna thooki adichutu sethurum da!",
    lessons: [
      {
        id: "ch16-l1",
        title: "NumPy & Pandas Basics",
        explanation: "Introduction to vectorized operations and DataFrames.",
        codeExample: "import pandas as pd\ndf = pd.DataFrame({'Roasts': [100, 200]})\nprint(df)",
        expectedOutput: "   Roasts\n0     100\n1     200",
        verificationChecks: [
          {
            description: "Check if the code executed successfully.",
            pattern: ".*",
            errorMessage: "Make sure you wrote the code."
          }
        ],
        miniQuiz: {
          question: "What is Pandas?",
          options: [
            "A bear",
            "A data manipulation library",
            "A database",
            "A web framework"
          ],
          correctAnswerIndex: 1
        },
        funnyLineGeneral: "Pandas: Making Excel obsolete since 2008.",
        funnyLineTamil: "Pandas: Excel-ah close panna vandha master-u."
      },
      {
        id: "ch16-l2",
        title: "Vectorized Operations",
        explanation: "NumPy arrays allow you to apply mathematical operations across an entire array without writing explicit loops.",
        codeExample: "import numpy as np\narr = np.array([1, 2, 3])\nprint(arr * 10)",
        expectedOutput: "[10 20 30]",
        verificationChecks: [
          {
            description: "Check if the code executed successfully.",
            pattern: ".*",
            errorMessage: "Make sure you wrote the code."
          }
        ],
        miniQuiz: {
          question: "Why is NumPy faster than Python lists for math?",
          options: [
            "Magic",
            "Vectorized C operations",
            "It runs on the GPU",
            "It skips checks"
          ],
          correctAnswerIndex: 1
        },
        funnyLineGeneral: "Looping through NumPy is like walking next to your Ferrari.",
        funnyLineTamil: "Ferrari-ah vachikitu adhu pakathula nadanthu pora mari da."
      },
      {
        id: "ch16-l3",
        title: "Data Visualization",
        explanation: "Visualizing data is crucial. Matplotlib creates plots to understand data distributions.",
        codeExample: "import matplotlib\nprint('Matplotlib is ready to plot!')",
        expectedOutput: "Matplotlib is ready to plot!",
        verificationChecks: [
          {
            description: "Check if the code executed successfully.",
            pattern: ".*",
            errorMessage: "Make sure you wrote the code."
          }
        ],
        miniQuiz: {
          question: "What does Matplotlib do?",
          options: [
            "Cooks meth",
            "Plots graphs and charts",
            "Cleans data",
            "Builds neural networks"
          ],
          correctAnswerIndex: 1
        },
        funnyLineGeneral: "A chart is worth a thousand CSV rows.",
        funnyLineTamil: "Oru graph aayiram varthaikum samam."
      }
    ]
  },
  {
    id: "ch17-machinelearning",
    title: "Chapter 17: Machine Learning Engine",
    tier: "Specialized",
    technicalCore: [
      "Mean/Median/Mode",
      "Standard Deviation",
      "Regression trees",
      "K-means",
      "Train/Test split",
      "Confusion matrix"
    ],
    analogyGeneral: "Machine Learning is just finding the line of best fit... on steroids. And with billions of parameters.",
    analogyTamil: "ML-na periya magic illa, namma area josiyar mari, palaiya data vachu pudhusa solluvaan, aana idhu math.",
    roastGeneral: "Calling yourself an AI engineer because you imported scikit-learn is like calling yourself a chef because you microwaved pizza.",
    roastTamil: "Scikit-learn import panni AI engineer-nu scene podatha, Maggie podra mathiri thaan idhuvum.",
    lessons: [
      {
        id: "ch17-l1",
        title: "Train/Test Split",
        explanation: "You must divide your data to train the model on one chunk and test it on unseen data to prevent overfitting.",
        codeExample: "print('Training Data: 80% | Testing Data: 20%')",
        expectedOutput: "Training Data: 80% | Testing Data: 20%",
        verificationChecks: [
          {
            description: "Check if the code executed successfully.",
            pattern: ".*",
            errorMessage: "Make sure you wrote the code."
          }
        ],
        miniQuiz: {
          question: "Why do we split data?",
          options: [
            "To save space",
            "To prevent the model from memorizing the answers",
            "To make it run faster",
            "Because 80/20 is a cool rule"
          ],
          correctAnswerIndex: 1
        },
        funnyLineGeneral: "Don't test on your training data. That's cheating on an open book test.",
        funnyLineTamil: "Exam paper munnadiye therinju eluthna mari da adhu."
      },
      {
        id: "ch17-l2",
        title: "Regression vs Classification",
        explanation: "Regression predicts a continuous number. Classification predicts a category.",
        codeExample: "print('Regression: 100.5 | Classification: Cat')",
        expectedOutput: "Regression: 100.5 | Classification: Cat",
        verificationChecks: [
          {
            description: "Check if the code executed successfully.",
            pattern: ".*",
            errorMessage: "Make sure you wrote the code."
          }
        ],
        miniQuiz: {
          question: "Predicting house prices is what type of problem?",
          options: [
            "Classification",
            "Clustering",
            "Regression",
            "Dimensionality Reduction"
          ],
          correctAnswerIndex: 2
        },
        funnyLineGeneral: "If it's a number, regress. If it's a dog, classify.",
        funnyLineTamil: "Kaasa irundha regression, naiyaa irundha classification."
      },
      {
        id: "ch17-l3",
        title: "Confusion Matrix",
        explanation: "A confusion matrix shows True Positives, False Positives, True Negatives, and False Negatives.",
        codeExample: "print('True Positive: 10 | False Positive: 2')",
        expectedOutput: "True Positive: 10 | False Positive: 2",
        verificationChecks: [
          {
            description: "Check if the code executed successfully.",
            pattern: ".*",
            errorMessage: "Make sure you wrote the code."
          }
        ],
        miniQuiz: {
          question: "What does a False Positive mean?",
          options: [
            "Model correctly predicted true",
            "Model incorrectly predicted true",
            "Model correctly predicted false",
            "Model incorrectly predicted false"
          ],
          correctAnswerIndex: 1
        },
        funnyLineGeneral: "It's called a confusion matrix because it confuses beginners.",
        funnyLineTamil: "Pera paathiya, Unna confuse panna ve irukku."
      }
    ]
  },
  {
    id: "ch18-dsa",
    title: "Chapter 18: Python Data Structures & Algorithms",
    tier: "Specialized",
    technicalCore: [
      "Stacks",
      "Queues",
      "Linked Lists",
      "Trees",
      "Binary Search",
      "Sorting"
    ],
    analogyGeneral: "DSA is how you organize your closet so you can find a shirt in O(1) time instead of tearing the room apart in O(N).",
    analogyTamil: "DSA-na entha porula enga vecha udane edukkalam-nu yosikkarathu. Adha vittu kuppai la thedatha.",
    roastGeneral: "If your solution to everything is a nested for-loop, LeetCode is going to eat you alive.",
    roastTamil: "Ellathukum O(N^2) pottu, interview-la poyee muthikaatha da.",
    lessons: [
      {
        id: "ch18-l1",
        title: "Stacks (LIFO)",
        explanation: "A Stack follows Last-In-First-Out. In Python, you can just use a list with append() and pop().",
        codeExample: "stack = []\nstack.append(1)\nstack.append(2)\nprint(stack.pop())",
        expectedOutput: "2",
        verificationChecks: [
          {
            description: "Check if the code executed successfully.",
            pattern: ".*",
            errorMessage: "Make sure you wrote the code."
          }
        ],
        miniQuiz: {
          question: "Which principle does a Stack follow?",
          options: [
            "FIFO",
            "LIFO",
            "Random Access",
            "LILO"
          ],
          correctAnswerIndex: 1
        },
        funnyLineGeneral: "Like a stack of plates. Wash the top one first.",
        funnyLineTamil: "Mela iruka plate-ah mudhalla edukkanum, keela irunthu ilutha setharam."
      },
      {
        id: "ch18-l2",
        title: "Queues (FIFO)",
        explanation: "A Queue follows First-In-First-Out. Use collections.deque for O(1) pops from the left.",
        codeExample: "from collections import deque\nq = deque([1, 2, 3])\nq.popleft()\nprint(q[0])",
        expectedOutput: "2",
        verificationChecks: [
          {
            description: "Check if the code executed successfully.",
            pattern: ".*",
            errorMessage: "Make sure you wrote the code."
          }
        ],
        miniQuiz: {
          question: "What is the best way to implement a queue in Python?",
          options: [
            "list",
            "set",
            "collections.deque",
            "dict"
          ],
          correctAnswerIndex: 2
        },
        funnyLineGeneral: "Just a line at the grocery store. No cutting.",
        funnyLineTamil: "Ration kade line la mudhalla vanthavan mudhalla povan."
      },
      {
        id: "ch18-l3",
        title: "Binary Search",
        explanation: "Finds an item in a sorted array in O(log N) time by repeatedly dividing the search interval in half.",
        codeExample: "def bin_search(arr, val):\n    return 'Found' if val in arr else 'Not Found'\nprint(bin_search([1,2,3,4,5], 3))",
        expectedOutput: "Found",
        verificationChecks: [
          {
            description: "Check if the code executed successfully.",
            pattern: ".*",
            errorMessage: "Make sure you wrote the code."
          }
        ],
        miniQuiz: {
          question: "What is the time complexity of Binary Search?",
          options: [
            "O(N)",
            "O(log N)",
            "O(1)",
            "O(N^2)"
          ],
          correctAnswerIndex: 1
        },
        funnyLineGeneral: "Don't read the whole dictionary to find one word.",
        funnyLineTamil: "Dictionary-la oru word theda mudhalla paathi-ah pirippa la, adhe thaan."
      }
    ]
  },
  {
    id: "ch19-databases",
    title: "Chapter 19: Databases (SQL & NoSQL)",
    tier: "Specialized",
    technicalCore: [
      "Connecting",
      "CRUD operations",
      "Queries",
      "Joins",
      "Collections"
    ],
    analogyGeneral: "A database is just a highly-organized, searchable file cabinet that multiple people can access without catching fire.",
    analogyTamil: "Database-ngurathu namma ooru register office mari, ellam theliva pathiram panni vechurpaanga.",
    roastGeneral: "If you are storing user passwords in plain text in a text file, please disconnect your router immediately.",
    roastTamil: "Text file la password store pandriya? Un laptop-a thooki kadal la podu da.",
    lessons: [
      {
        id: "ch19-l1",
        title: "Relational vs NoSQL",
        explanation: "SQL databases use tables and strict schemas. NoSQL databases use flexible JSON-like documents.",
        codeExample: "print('SQL: Tables | NoSQL: Documents')",
        expectedOutput: "SQL: Tables | NoSQL: Documents",
        verificationChecks: [
          {
            description: "Check if the code executed successfully.",
            pattern: ".*",
            errorMessage: "Make sure you wrote the code."
          }
        ],
        miniQuiz: {
          question: "Which of these is a NoSQL database?",
          options: [
            "PostgreSQL",
            "MySQL",
            "MongoDB",
            "SQLite"
          ],
          correctAnswerIndex: 2
        },
        funnyLineGeneral: "SQL is a strict parent, NoSQL is the cool uncle.",
        funnyLineTamil: "SQL-na strict officer, NoSQL-na jolly ana aalu."
      },
      {
        id: "ch19-l2",
        title: "CRUD Operations",
        explanation: "CRUD stands for Create, Read, Update, Delete. These are the four basic functions of persistent storage.",
        codeExample: "print('Create, Read, Update, Delete')",
        expectedOutput: "Create, Read, Update, Delete",
        verificationChecks: [
          {
            description: "Check if the code executed successfully.",
            pattern: ".*",
            errorMessage: "Make sure you wrote the code."
          }
        ],
        miniQuiz: {
          question: "What does the 'U' in CRUD stand for?",
          options: [
            "Upload",
            "Undo",
            "Update",
            "User"
          ],
          correctAnswerIndex: 2
        },
        funnyLineGeneral: "Without CRUD, your app is just an amnesiac calculator.",
        funnyLineTamil: "CRUD illana un app oru memory loss patient thaan."
      },
      {
        id: "ch19-l3",
        title: "SQL Injections (Security)",
        explanation: "Never concatenate user input directly into a SQL query. Always use parameterized queries.",
        codeExample: "print('Always sanitize user inputs!')",
        expectedOutput: "Always sanitize user inputs!",
        verificationChecks: [
          {
            description: "Check if the code executed successfully.",
            pattern: ".*",
            errorMessage: "Make sure you wrote the code."
          }
        ],
        miniQuiz: {
          question: "How do you prevent SQL injection?",
          options: [
            "Ask hackers nicely",
            "Use parameterized queries",
            "Hide the database URL",
            "Store data in txt files"
          ],
          correctAnswerIndex: 1
        },
        funnyLineGeneral: "Bobby Tables says hi.",
        funnyLineTamil: "Input-ah sanitize pannalana app kali da."
      }
    ]
  }
];
