// agent-notes: { ctx: "Zero-to-Hero 20-chapter master Python curriculum with beginner-friendly Chapters 1 & 2", deps: ["./types"], state: active, last: "sato@2026-10-31" }
import { Chapter, PythonLesson } from './types';

export const pythonCurriculum: Chapter[] = [
  {
    "id": "ch1",
    "title": "Python Basics: Your First Code & Printing",
    "tier": "Beginner",
    "technicalCore": [
      "print() function",
      "strings and quotes",
      "single vs double quotes",
      "comments (#)",
      "top-to-bottom execution"
    ],
    "analogyGeneral": "Teaching a computer to speak using print(). If you forget quotes around your words, Python panics and assumes you are referencing an imaginary variable named after your feelings. Like shouting at a toaster without pressing the lever down and wondering why breakfast isn't ready.",
    "analogyTamil": "Computer-ku vaai pesa kathukudukuradhu dhaan printing. String-ku quotes podama vittu, 'Yen da output varala?' nu ketta, tea kadai master kitta poi vaaya mattum asachutu tea kekkura maari! Indentation-ah thappa potta compiler un ID card-ah cancel panni veliya thurathidum!",
    "roastGeneral": "Teaching a computer to speak using print(). If you forget quotes around your words, Python panics and assumes you are referencing an imaginary variable named after your feelings. Like shouting at a toaster without pressing the lever down and wondering why breakfast isn't ready.",
    "roastTamil": "Computer-ku vaai pesa kathukudukuradhu dhaan printing. String-ku quotes podama vittu, 'Yen da output varala?' nu ketta, tea kadai master kitta poi vaaya mattum asachutu tea kekkura maari! Indentation-ah thappa potta compiler un ID card-ah cancel panni veliya thurathidum!",
    "lessons": [
      {
        "id": "ch1-l1",
        "title": "Printing Text",
        "explanation": "Python reads code from top to bottom. Use print() to display text, and always wrap your words inside single or double quotes.",
        "codeExample": "print(\"Hello, CodeLOL!\")",
        "verificationChecks": [
          {
            "description": "Must use print",
            "pattern": "print",
            "errorMessage": "Where is the print statement?"
          }
        ],
        "miniQuiz": {
          "question": "What function do you use to display text in Python?",
          "options": [
            "echo()",
            "print()",
            "console.log()",
            "display()"
          ],
          "correctAnswerIndex": 1,
          "answerIndex": 1
        },
        "funnyLineGeneral": "Spacing matters. It's like personal space for your code.",
        "funnyLineTamil": "Space idavita, moochu mutti sethurum code.",
        "expectedOutput": "Hello, CodeLOL!",
        "practicePrompt": "Run and verify your first print statement in the interactive arena.",
        "proudSuccessGeneral": "First Python steps unlocked without a single SyntaxError!",
        "proudSuccessTamil": "Bloody sweet... output vandhuruchu da!",
        "chapterId": "ch1",
        "englishExplanation": "Python reads code from top to bottom. Use print() to display text, and always wrap your words inside single or double quotes.",
        "tamilRoast": "Quotes podaama text ezhudha nenaikuriye... unakku arive illaya da?"
      },
      {
        "id": "ch1-l2",
        "title": "Comments & Quotes",
        "explanation": "In Python, words go inside quotes. Use '#' to write notes (comments) that Python ignores when running.",
        "codeExample": "# This is a friendly note\nprint('Python is easy!')",
        "verificationChecks": [
          {
            "description": "Must use #",
            "pattern": "#",
            "errorMessage": "Add a comment starting with #."
          }
        ],
        "miniQuiz": {
          "question": "Which symbol starts a comment in Python?",
          "options": [
            "//",
            "/*",
            "#",
            "--"
          ],
          "correctAnswerIndex": 2,
          "answerIndex": 2
        },
        "funnyLineGeneral": "Comments are apologies to your future self.",
        "funnyLineTamil": "Naalaikku nee paatha unakke puriyaathu.",
        "expectedOutput": "Python is easy!",
        "practicePrompt": "Run and verify Comments & Quotes in the interactive arena.",
        "proudSuccessGeneral": "First Python steps unlocked without a single SyntaxError!",
        "proudSuccessTamil": "Bloody sweet... indentation sariya pochuda, Kaipulla thappichitan!",
        "chapterId": "ch1",
        "englishExplanation": "In Python, words go inside quotes. Use '#' to write notes (comments) that Python ignores when running.",
        "tamilRoast": "Naalaikku nee paatha unakke puriyaathu."
      },
      {
        "id": "ch1-l3",
        "title": "Top to Bottom Execution",
        "explanation": "Python runs each line one by one from top to bottom. Write statements in the order you want them executed.",
        "codeExample": "print('Step 1: Start')\nprint('Step 2: Finish')",
        "verificationChecks": [
          {
            "description": "Must print both lines",
            "pattern": "print",
            "errorMessage": "Print both lines."
          }
        ],
        "miniQuiz": {
          "question": "How does Python execute lines of code by default?",
          "options": [
            "Bottom to top",
            "Random order",
            "Top to bottom",
            "All at once"
          ],
          "correctAnswerIndex": 2,
          "answerIndex": 2
        },
        "funnyLineGeneral": "Order matters—Python won't skip ahead for you!",
        "funnyLineTamil": "Perusa pona, moolai hang aaidum.",
        "expectedOutput": "Step 1: Start\nStep 2: Finish",
        "practicePrompt": "Run and verify Top to Bottom Execution in the interactive arena.",
        "proudSuccessGeneral": "First Python steps unlocked without a single SyntaxError!",
        "proudSuccessTamil": "Bloody sweet... output vandhuruchu da!",
        "chapterId": "ch1",
        "englishExplanation": "Python runs each line one by one from top to bottom. Write statements in the order you want them executed.",
        "tamilRoast": "Perusa pona, moolai hang aaidum."
      }
    ],
    "proudSuccessGeneral": "First Python steps unlocked without a single SyntaxError!",
    "proudSuccessTamil": "Bloody sweet... indentation sariya pochuda, Kaipulla thappichitan!"
  },
  {
    "id": "ch2",
    "title": "Variables: Named Boxes for Your Data",
    "tier": "Beginner",
    "technicalCore": [
      "Variables",
      "assignment (=)",
      "integers",
      "strings",
      "dynamic typing",
      "updating values"
    ],
    "analogyGeneral": "Variables are just sticky notes slapped onto cardboard boxes in memory. Python has commitment issues: you can store an integer, dump it out, and replace it with a paragraph of text two seconds later without batting an eye.",
    "analogyTamil": "Appa kudukura pocket money-ah oru dabba-la pottu vekkura maari dhaan variable. Ration shop-la kerosene-aiyum sarkkarai-aiyum orey thalaila kottura maari, integer-aiyum string-aiyum mix panna... un appa kattina college fees-ku compiler un mark sheet-ah direct-ah appa kitte kaatidum!",
    "roastGeneral": "Variables are just sticky notes slapped onto cardboard boxes in memory. Python has commitment issues: you can store an integer, dump it out, and replace it with a paragraph of text two seconds later without batting an eye.",
    "roastTamil": "Appa kudukura pocket money-ah oru dabba-la pottu vekkura maari dhaan variable. Ration shop-la kerosene-aiyum sarkkarai-aiyum orey thalaila kottura maari, integer-aiyum string-aiyum mix panna... un appa kattina college fees-ku compiler un mark sheet-ah direct-ah appa kitte kaatidum!",
    "lessons": [
      {
        "id": "ch2-l1",
        "title": "Creating Variables",
        "explanation": "A variable is just a labeled box to store numbers or text using the '=' sign. No need to declare data types manually.",
        "codeExample": "name = \"Mano\"\nage = 21\nprint(name)\nprint(age)",
        "verificationChecks": [
          {
            "description": "Define name and age",
            "pattern": "name.*=.*age.*=",
            "errorMessage": "Define variables name and age."
          }
        ],
        "miniQuiz": {
          "question": "Which symbol is used to assign a value to a variable in Python?",
          "options": [
            "==",
            ":=",
            "=",
            "->"
          ],
          "correctAnswerIndex": 2,
          "answerIndex": 2
        },
        "funnyLineGeneral": "Python ints can hold more money than you'll ever see.",
        "funnyLineTamil": "Bank account balance-vida int thaan perusu.",
        "expectedOutput": "Mano\n21",
        "practicePrompt": "Run and verify Creating Variables in the interactive arena.",
        "proudSuccessGeneral": "Variables and types mastered with pristine memory safety.",
        "proudSuccessTamil": "Appa, unga pulla urupputturuchu pa! Bloody sweet... output vandhuruchu da!",
        "chapterId": "ch2",
        "englishExplanation": "A variable is just a labeled box to store numbers or text using the '=' sign. No need to declare data types manually.",
        "tamilRoast": "Bank account balance-vida int thaan perusu."
      },
      {
        "id": "ch2-l2",
        "title": "Text in Variables",
        "explanation": "Variables can hold text (strings inside quotes) or numbers. Python automatically figures out the data type.",
        "codeExample": "name = \"Mano\"\nprint(\"Hello, \" + name)",
        "verificationChecks": [
          {
            "description": "Use name variable",
            "pattern": "name",
            "errorMessage": "Print with the name variable."
          }
        ],
        "miniQuiz": {
          "question": "How do you store text like Mano into a variable called name?",
          "options": [
            "name = Mano",
            "name = \"Mano\"",
            "var name = Mano",
            "string name = Mano"
          ],
          "correctAnswerIndex": 1,
          "answerIndex": 1
        },
        "funnyLineGeneral": "A string is forever, like a bad tattoo.",
        "funnyLineTamil": "String-ah maatha mudiyathu, un lachanam maari.",
        "expectedOutput": "Hello, Mano",
        "practicePrompt": "Run and verify Text in Variables in the interactive arena.",
        "proudSuccessGeneral": "Variables and types mastered with pristine memory safety.",
        "proudSuccessTamil": "Adra sakka! Dynamic typing unakulla irangi velai seiyudhu!",
        "chapterId": "ch2",
        "englishExplanation": "Variables can hold text (strings inside quotes) or numbers. Python automatically figures out the data type.",
        "tamilRoast": "String-ah maatha mudiyathu, un lachanam maari."
      },
      {
        "id": "ch2-l3",
        "title": "Updating Variables",
        "explanation": "You can change what is inside the box anytime by assigning a new value using '='.",
        "codeExample": "age = 21\nage = age + 1\nprint(age)",
        "verificationChecks": [
          {
            "description": "Update age",
            "pattern": "age",
            "errorMessage": "Update age and print it."
          }
        ],
        "miniQuiz": {
          "question": "What happens when you assign a new value to an existing variable in Python?",
          "options": [
            "It causes an error",
            "The old value is replaced",
            "It creates a second variable",
            "Python asks for confirmation"
          ],
          "correctAnswerIndex": 1,
          "answerIndex": 1
        },
        "funnyLineGeneral": "Variables can change—that's why they are called variables!",
        "funnyLineTamil": "Un moolai maari, athula onnum illa.",
        "expectedOutput": "22",
        "practicePrompt": "Run and verify Updating Variables in the interactive arena.",
        "proudSuccessGeneral": "Variables and types mastered with pristine memory safety.",
        "proudSuccessTamil": "Adra sakka! Dynamic typing unakulla irangi velai seiyudhu!",
        "chapterId": "ch2",
        "englishExplanation": "You can change what is inside the box anytime by assigning a new value using '='.",
        "tamilRoast": "Un moolai maari, athula onnum illa."
      }
    ],
    "proudSuccessGeneral": "Variables and types mastered with pristine memory safety.",
    "proudSuccessTamil": "Appa, unga pulla urupputturuchu pa! Dynamic typing unakulla irangi velai seiyudhu!"
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
    "analogyGeneral": "Using == checks if two people are wearing identical clothes; using 'is' checks if they are literally the exact same clone standing in physical space. Confusing them is how you accidentally marry your twin's reflection.",
    "analogyTamil": "Santhanam style-la sonna: 'Train ticket vangi flight-la eruna maari irukku da un logic!' Duplicate mobile-ah paathu original Apple phone nu nambi vangunavan maari, value onna irukkuradhukkum orey memory location-la irukkuradhukkum vidhiyasame theriyaama muzhikka koodadhu.",
    "roastGeneral": "Using == checks if two people are wearing identical clothes; using 'is' checks if they are literally the exact same clone standing in physical space. Confusing them is how you accidentally marry your twin's reflection.",
    "roastTamil": "Santhanam style-la sonna: 'Train ticket vangi flight-la eruna maari irukku da un logic!' Duplicate mobile-ah paathu original Apple phone nu nambi vangunavan maari, value onna irukkuradhukkum orey memory location-la irukkuradhukkum vidhiyasame theriyaama muzhikka koodadhu.",
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
          "correctAnswerIndex": 1,
          "answerIndex": 1
        },
        "funnyLineGeneral": "Math is hard, let Python do it.",
        "funnyLineTamil": "Kanakkula weak na, compiler kitta kelu.",
        "expectedOutput": "20",
        "practicePrompt": "Run and verify Arithmetic & Precedence in the interactive arena.",
        "proudSuccessGeneral": "Expressions and operators evaluated like a seasoned compiler.",
        "proudSuccessTamil": "Walrus operator-eh adichu thovachitiye da!",
        "chapterId": "ch3",
        "englishExplanation": "PEMDAS applies. Use parentheses to be explicit.",
        "tamilRoast": "Kanakkula weak na, compiler kitta kelu."
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
          "correctAnswerIndex": 1,
          "answerIndex": 1
        },
        "funnyLineGeneral": "They might look twins, but they live in different houses.",
        "funnyLineTamil": "Paaka ore maari irukkum aana vera vera aalu.",
        "expectedOutput": "True False",
        "practicePrompt": "Run and verify Identity vs Equality in the interactive arena.",
        "proudSuccessGeneral": "Expressions and operators evaluated like a seasoned compiler.",
        "proudSuccessTamil": "Walrus operator-eh adichu thovachitiye da!",
        "chapterId": "ch3",
        "englishExplanation": "== checks value, `is` checks memory identity.",
        "tamilRoast": "Paaka ore maari irukkum aana vera vera aalu."
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
          "correctAnswerIndex": 1,
          "answerIndex": 1
        },
        "funnyLineGeneral": "It's a walrus. It assigns while it looks at you.",
        "funnyLineTamil": "Walrus maari assign pannikite paakum.",
        "expectedOutput": "3",
        "practicePrompt": "Run and verify Walrus Operator in the interactive arena.",
        "proudSuccessGeneral": "Expressions and operators evaluated like a seasoned compiler.",
        "proudSuccessTamil": "Walrus operator-eh adichu thovachitiye da!",
        "chapterId": "ch3",
        "englishExplanation": "The := operator assigns and returns a value.",
        "tamilRoast": "Walrus maari assign pannikite paakum."
      }
    ],
    "proudSuccessGeneral": "Expressions and operators evaluated like a seasoned compiler.",
    "proudSuccessTamil": "Walrus operator-eh adichu thovachitiye da!"
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
    "analogyGeneral": "Decisions and loops dictate execution traffic. An infinite while loop with no exit condition is your brain at 3:00 AM replaying an awkward conversation from 2017 on an endless, un-skippable loop until your battery dies.",
    "analogyTamil": "Katuna college fees-ku naalu cow vangirukalam da! Loop-ku exit condition vaikala na, Rajini punch dialogue maari: 'Naan oru thadava sonna...' nu mudive illama terminal moochu mutti sethuradhukulla suthikitte irukkum! Condition thappa pottu logic eludhina, Vadivelu 'Keezha vizhundhalum meesaila man ottala' nu solra maari dhaan irukkum.",
    "roastGeneral": "Decisions and loops dictate execution traffic. An infinite while loop with no exit condition is your brain at 3:00 AM replaying an awkward conversation from 2017 on an endless, un-skippable loop until your battery dies.",
    "roastTamil": "Katuna college fees-ku naalu cow vangirukalam da! Loop-ku exit condition vaikala na, Rajini punch dialogue maari: 'Naan oru thadava sonna...' nu mudive illama terminal moochu mutti sethuradhukulla suthikitte irukkum! Condition thappa pottu logic eludhina, Vadivelu 'Keezha vizhundhalum meesaila man ottala' nu solra maari dhaan irukkum.",
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
          "correctAnswerIndex": 2,
          "answerIndex": 2
        },
        "funnyLineGeneral": "Decisions, decisions. The code makes them for you.",
        "funnyLineTamil": "Life la thaan decision thappu, code layuma?",
        "expectedOutput": "Adult",
        "practicePrompt": "Run and verify If-Elif-Else in the interactive arena.",
        "proudSuccessGeneral": "Control flow conquered with zero infinite loops.",
        "proudSuccessTamil": "Pattern match aagi output vandhuruchu... Singam da nee!",
        "chapterId": "ch4",
        "englishExplanation": "Branching logic with conditionals.",
        "tamilRoast": "Life la thaan decision thappu, code layuma?"
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
          "correctAnswerIndex": 2,
          "answerIndex": 2
        },
        "funnyLineGeneral": "An else on a loop? Yes, it's a thing.",
        "funnyLineTamil": "Loop kulla else potta aacharyama pakurane.",
        "expectedOutput": "Done smoothly",
        "practicePrompt": "Run and verify Loops and Else in the interactive arena.",
        "proudSuccessGeneral": "Control flow conquered with zero infinite loops.",
        "proudSuccessTamil": "Pattern match aagi output vandhuruchu... Singam da nee!",
        "chapterId": "ch4",
        "englishExplanation": "For and while loops can have an else clause if no break happens.",
        "tamilRoast": "Loop kulla else potta aacharyama pakurane."
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
          "correctAnswerIndex": 2,
          "answerIndex": 2
        },
        "funnyLineGeneral": "Match case: finally a switch statement, but cooler.",
        "funnyLineTamil": "Switch thaan, aana konjam gethu.",
        "expectedOutput": "Not found",
        "practicePrompt": "Run and verify Match/Case in the interactive arena.",
        "proudSuccessGeneral": "Control flow conquered with zero infinite loops.",
        "proudSuccessTamil": "Pattern match aagi output vandhuruchu... Singam da nee!",
        "chapterId": "ch4",
        "englishExplanation": "Structural pattern matching introduced in 3.10.",
        "tamilRoast": "Switch thaan, aana konjam gethu."
      }
    ],
    "proudSuccessGeneral": "Control flow conquered with zero infinite loops.",
    "proudSuccessTamil": "Pattern match aagi output vandhuruchu... Singam da nee!"
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
    "analogyGeneral": "Python bundles a Swiss Army knife so you don't rebuild basic counting using rocks and sticks. Running eval() on raw user input is the digital equivalent of leaving your front door unlocked, inviting a burglar in, and handing them your bank PIN.",
    "analogyTamil": "Python-e zip(), enumerate(), range() nu ready-made-ah function thandhalum, nee innum manual counter pottu cycle chain suthura maari while loop thechutu irukka. Vadivelu auto-va thallikitte madurai pora maari irukku da un manual iteration logic!",
    "roastGeneral": "Python bundles a Swiss Army knife so you don't rebuild basic counting using rocks and sticks. Running eval() on raw user input is the digital equivalent of leaving your front door unlocked, inviting a burglar in, and handing them your bank PIN.",
    "roastTamil": "Python-e zip(), enumerate(), range() nu ready-made-ah function thandhalum, nee innum manual counter pottu cycle chain suthura maari while loop thechutu irukka. Vadivelu auto-va thallikitte madurai pora maari irukku da un manual iteration logic!",
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
          "correctAnswerIndex": 2,
          "answerIndex": 2
        },
        "funnyLineGeneral": "Stop keeping a counter variable manually.",
        "funnyLineTamil": "I=0 nu potu uyira vaangatha.",
        "expectedOutput": "0 a\n1 b",
        "practicePrompt": "Run and verify Enumerate in the interactive arena.",
        "proudSuccessGeneral": "Built-in functions running at native C-speed.",
        "proudSuccessTamil": "Enumerate, zip ellam un viral nunila aadura maari aaiduchu!",
        "chapterId": "ch5",
        "englishExplanation": "Get index and value at the same time.",
        "tamilRoast": "I=0 nu potu uyira vaangatha."
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
          "correctAnswerIndex": 2,
          "answerIndex": 2
        },
        "funnyLineGeneral": "Zipper for your data, don't get caught.",
        "funnyLineTamil": "Zip panni kootitu po.",
        "expectedOutput": "1 x\n2 y",
        "practicePrompt": "Run and verify Zip in the interactive arena.",
        "proudSuccessGeneral": "Built-in functions running at native C-speed.",
        "proudSuccessTamil": "Enumerate, zip ellam un viral nunila aadura maari aaiduchu!",
        "chapterId": "ch5",
        "englishExplanation": "Iterate over multiple iterables in parallel.",
        "tamilRoast": "Zip panni kootitu po."
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
          "correctAnswerIndex": 1,
          "answerIndex": 1
        },
        "funnyLineGeneral": "Evaluating untrusted strings is asking for trouble.",
        "funnyLineTamil": "Eval potta un system evalavo kastapadum.",
        "expectedOutput": "5",
        "practicePrompt": "Run and verify Eval & Exec in the interactive arena.",
        "proudSuccessGeneral": "Built-in functions running at native C-speed.",
        "proudSuccessTamil": "Enumerate, zip ellam un viral nunila aadura maari aaiduchu!",
        "chapterId": "ch5",
        "englishExplanation": "Execute strings as code. Dangerous if untrusted.",
        "tamilRoast": "Eval potta un system evalavo kastapadum."
      }
    ],
    "proudSuccessGeneral": "Built-in functions running at native C-speed.",
    "proudSuccessTamil": "Enumerate, zip ellam un viral nunila aadura maari aaiduchu!"
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
    "analogyGeneral": "An airbag for your application. Dividing by zero and expecting Python to solve it is like asking a calculator to perform magic tricks. Exceptions catch the runtime disaster before your server crashes and burns down the cloud infrastructure.",
    "analogyTamil": "Zero-vaala divide pannitu answer edhirpaakura periya Albert Einstein nee! Server vaanthi eduthu terminal crash aaguradhukulla try...except potu thappichuko. Illana un arrears count maari unhandled error screen full-ah red color-la katti bayamuruthidum.",
    "roastGeneral": "An airbag for your application. Dividing by zero and expecting Python to solve it is like asking a calculator to perform magic tricks. Exceptions catch the runtime disaster before your server crashes and burns down the cloud infrastructure.",
    "roastTamil": "Zero-vaala divide pannitu answer edhirpaakura periya Albert Einstein nee! Server vaanthi eduthu terminal crash aaguradhukulla try...except potu thappichuko. Illana un arrears count maari unhandled error screen full-ah red color-la katti bayamuruthidum.",
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
          "correctAnswerIndex": 2,
          "answerIndex": 2
        },
        "funnyLineGeneral": "Even calculators complain about this.",
        "funnyLineTamil": "Zero-vaala divide panni enna saadhikka pora?",
        "expectedOutput": "Caught!",
        "practicePrompt": "Run and verify ZeroDivisionError in the interactive arena.",
        "proudSuccessGeneral": "All errors caught and handled gracefully before production.",
        "proudSuccessTamil": "Bloody sweet... Exception-ah catch panni adichan paaru sixer-u!",
        "chapterId": "ch6",
        "englishExplanation": "Don't divide by zero.",
        "tamilRoast": "Zero-vaala divide panni enna saadhikka pora?"
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
          "correctAnswerIndex": 2,
          "answerIndex": 2
        },
        "funnyLineGeneral": "Looking for something that's not there.",
        "funnyLineTamil": "Illatha key-ah thedina epdi varum?",
        "expectedOutput": "Key missing",
        "practicePrompt": "Run and verify Lookup Errors in the interactive arena.",
        "proudSuccessGeneral": "All errors caught and handled gracefully before production.",
        "proudSuccessTamil": "Bloody sweet... Exception-ah catch panni adichan paaru sixer-u!",
        "chapterId": "ch6",
        "englishExplanation": "IndexError for lists, KeyError for dicts.",
        "tamilRoast": "Illatha key-ah thedina epdi varum?"
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
          "correctAnswerIndex": 1,
          "answerIndex": 1
        },
        "funnyLineGeneral": "You can't force a word to be a number.",
        "funnyLineTamil": "Alphabet-ah number aaka paakuriya.",
        "expectedOutput": "Bad value",
        "practicePrompt": "Run and verify Type & Value Errors in the interactive arena.",
        "proudSuccessGeneral": "All errors caught and handled gracefully before production.",
        "proudSuccessTamil": "Bloody sweet... Exception-ah catch panni adichan paaru sixer-u!",
        "chapterId": "ch6",
        "englishExplanation": "TypeError is bad operations, ValueError is bad data.",
        "tamilRoast": "Alphabet-ah number aaka paakuriya."
      }
    ],
    "proudSuccessGeneral": "All errors caught and handled gracefully before production.",
    "proudSuccessTamil": "Bloody sweet... Exception-ah catch panni adichan paaru sixer-u!"
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
    "analogyGeneral": "Lists are chaotic gym bags where you dump everything together. Tuples are sealed glass display cases you can never change. Dictionaries are labeled shelves that give you instant O(1) lookups instead of rifling through dirty laundry.",
    "analogyTamil": "List na hostel bag: book, parotta, assignment ellam orey idathula kedaikkum. Dict na un college ID card: peru, department, arrears count ellam neat-ah label pottu vekka mudiyum. Set na Vadivelu dialogue maari: 'Repeat-u aaga koodadhu!' Duplicate item-ah kanda automatic-ah thooki veliya potrum.",
    "roastGeneral": "Lists are chaotic gym bags where you dump everything together. Tuples are sealed glass display cases you can never change. Dictionaries are labeled shelves that give you instant O(1) lookups instead of rifling through dirty laundry.",
    "roastTamil": "List na hostel bag: book, parotta, assignment ellam orey idathula kedaikkum. Dict na un college ID card: peru, department, arrears count ellam neat-ah label pottu vekka mudiyum. Set na Vadivelu dialogue maari: 'Repeat-u aaga koodadhu!' Duplicate item-ah kanda automatic-ah thooki veliya potrum.",
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
          "correctAnswerIndex": 0,
          "answerIndex": 0
        },
        "funnyLineGeneral": "Lists just keep growing.",
        "funnyLineTamil": "List perusa poite irukku.",
        "expectedOutput": "[1, 2, 3]",
        "practicePrompt": "Run and verify Lists (Dynamic Arrays) in the interactive arena.",
        "proudSuccessGeneral": "O(1) lookups achieved across all data structures.",
        "proudSuccessTamil": "Hash table-la collision illama data save aaiduchu da!",
        "chapterId": "ch7",
        "englishExplanation": "Mutable, ordered sequences. O(1) append.",
        "tamilRoast": "List perusa poite irukku."
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
          "correctAnswerIndex": 0,
          "answerIndex": 0
        },
        "funnyLineGeneral": "Dictionaries know exactly where everything is.",
        "funnyLineTamil": "Udaney answer varum.",
        "expectedOutput": "1",
        "practicePrompt": "Run and verify Dictionaries (Hash Tables) in the interactive arena.",
        "proudSuccessGeneral": "O(1) lookups achieved across all data structures.",
        "proudSuccessTamil": "Hash table-la collision illama data save aaiduchu da!",
        "chapterId": "ch7",
        "englishExplanation": "Key-value pairs. O(1) lookup.",
        "tamilRoast": "Udaney answer varum."
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
          "correctAnswerIndex": 2,
          "answerIndex": 2
        },
        "funnyLineGeneral": "No duplicates allowed in the VIP section.",
        "funnyLineTamil": "Duplicate-ku entry illa.",
        "expectedOutput": "{1, 2}",
        "practicePrompt": "Run and verify Sets (Unique) in the interactive arena.",
        "proudSuccessGeneral": "O(1) lookups achieved across all data structures.",
        "proudSuccessTamil": "Hash table-la collision illama data save aaiduchu da!",
        "chapterId": "ch7",
        "englishExplanation": "Hash-based unique collections.",
        "tamilRoast": "Duplicate-ku entry illa."
      }
    ],
    "proudSuccessGeneral": "O(1) lookups achieved across all data structures.",
    "proudSuccessTamil": "Hash table-la collision illama data save aaiduchu da!"
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
    "analogyGeneral": "Functions package reusable work. The mutable default argument trap (def add(x=[])) means whoever visited the factory yesterday left their dirty dishes behind, and every new visitor is forced to eat off them because the default object never resets.",
    "analogyTamil": "Oru velaikku oruthana fix panradhu dhaan function. Default argument-la empty list vecha... un veetu fridge-ah nadu theruvula vecha maari, oorla irukura ellarum pazhaya meedhi sapattaye dump panni un function memory-ah naara adipaanga!",
    "roastGeneral": "Functions package reusable work. The mutable default argument trap (def add(x=[])) means whoever visited the factory yesterday left their dirty dishes behind, and every new visitor is forced to eat off them because the default object never resets.",
    "roastTamil": "Oru velaikku oruthana fix panradhu dhaan function. Default argument-la empty list vecha... un veetu fridge-ah nadu theruvula vecha maari, oorla irukura ellarum pazhaya meedhi sapattaye dump panni un function memory-ah naara adipaanga!",
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
          "correctAnswerIndex": 1,
          "answerIndex": 1
        },
        "funnyLineGeneral": "Catching arguments like a net.",
        "funnyLineTamil": "Ellathiyum allikita.",
        "expectedOutput": "(1,) {'a': 2}",
        "practicePrompt": "Run and verify Args & Kwargs in the interactive arena.",
        "proudSuccessGeneral": "LEGB scope mastered without mutable default traps.",
        "proudSuccessTamil": "Closure-um scope-um theliva purinjuruchu, ini bug varadhu!",
        "chapterId": "ch8",
        "englishExplanation": "Variable length arguments.",
        "tamilRoast": "Ellathiyum allikita."
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
          "correctAnswerIndex": 2,
          "answerIndex": 2
        },
        "funnyLineGeneral": "Ghosts of previous calls will haunt your list.",
        "funnyLineTamil": "Pazhaiya item ellam list la ottikitchu.",
        "expectedOutput": "[1]\n[1, 2]\n[3]\n[4]",
        "practicePrompt": "Run and verify The Default Argument Trap in the interactive arena.",
        "proudSuccessGeneral": "LEGB scope mastered without mutable default traps.",
        "proudSuccessTamil": "Closure-um scope-um theliva purinjuruchu, ini bug varadhu!",
        "chapterId": "ch8",
        "englishExplanation": "Never use [] as a default. Use None.",
        "tamilRoast": "Pazhaiya item ellam list la ottikitchu."
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
          "correctAnswerIndex": 1,
          "answerIndex": 1
        },
        "funnyLineGeneral": "It remembers everything, like an elephant.",
        "funnyLineTamil": "Marakkave marakkathu.",
        "expectedOutput": "8",
        "practicePrompt": "Run and verify Closures in the interactive arena.",
        "proudSuccessGeneral": "LEGB scope mastered without mutable default traps.",
        "proudSuccessTamil": "Closure-um scope-um theliva purinjuruchu, ini bug varadhu!",
        "chapterId": "ch8",
        "englishExplanation": "Functions returning functions retaining state.",
        "tamilRoast": "Marakkave marakkathu."
      }
    ],
    "proudSuccessGeneral": "LEGB scope mastered without mutable default traps.",
    "proudSuccessTamil": "Closure-um scope-um theliva purinjuruchu, ini bug varadhu!"
  },
  {
    "id": "ch9",
    "title": "File Handling & System Integration",
    "tier": "Intermediate",
    "technicalCore": [
      "open() file modes (r, w, a, r+)",
      "Context managers with",
      "pathlib.Path navigation",
      "JSON serialization & parsing",
      "CSV operations",
      "statistics module metrics"
    ],
    "analogyGeneral": "Accessing storage on disk. Opening a file without the 'with' context manager is like checking into a hotel room, leaving the door wide open with your passport on the table, and boarding a plane to another country.",
    "analogyTamil": "Xerox kadaila poi Aadhar card-ah copy edukka kuduthutu marandhu vechitu veetuku pora maari dhaan file-ah open pannitu close pannama vidradhu. Context manager 'with' use panna, velai mudinja udane automatic-ah kadhava pootitu safe-ah veliya anuppidum.",
    "roastGeneral": "Accessing storage on disk. Opening a file without the 'with' context manager is like checking into a hotel room, leaving the door wide open with your passport on the table, and boarding a plane to another country.",
    "roastTamil": "Xerox kadaila poi Aadhar card-ah copy edukka kuduthutu marandhu vechitu veetuku pora maari dhaan file-ah open pannitu close pannama vidradhu. Context manager 'with' use panna, velai mudinja udane automatic-ah kadhava pootitu safe-ah veliya anuppidum.",
    "proudSuccessGeneral": "Files read, parsed, and safely closed with zero leaked resources.",
    "proudSuccessTamil": "Bloody sweet... file safe-ah close aagi output vandhuruchu da!",
    "lessons": [
      {
        "id": "ch9-l1",
        "title": "Context Managers & File I/O",
        "explanation": "Always open files using the with context manager. It guarantees the file descriptor is closed automatically, even if exceptions occur.",
        "codeExample": "import tempfile\nwith tempfile.NamedTemporaryFile(mode='w+', delete=True) as f:\n    f.write('File saved safely!')\n    f.seek(0)\n    print(f.read())",
        "expectedOutput": "File saved safely!",
        "verificationChecks": [
          {
            "description": "Use with statement",
            "pattern": "with ",
            "errorMessage": "Use a with context manager."
          }
        ],
        "miniQuiz": {
          "question": "Why should you always open files using 'with'?",
          "options": [
            "It runs faster",
            "It guarantees closing file descriptors",
            "It encrypts files",
            "It bypasses the OS"
          ],
          "correctAnswerIndex": 1,
          "answerIndex": 1
        },
        "funnyLineGeneral": "Forget to close a file and your OS will hold a grudge.",
        "funnyLineTamil": "File-ah open pannitu close panna marandha OS kadasi varaikum kobama irukkum.",
        "practicePrompt": "Open a temporary file and write and read safely using 'with'.",
        "proudSuccessGeneral": "Resource safely cleaned up on exit!",
        "proudSuccessTamil": "Bloody sweet... context manager clean-ah close panniruchu!",
        "chapterId": "ch9",
        "englishExplanation": "Always open files using the with context manager. It guarantees the file descriptor is closed automatically, even if exceptions occur.",
        "tamilRoast": "File-ah open pannitu close panna marandha OS kadasi varaikum kobama irukkum."
      },
      {
        "id": "ch9-l2",
        "title": "Modern Paths with Pathlib",
        "explanation": "Replace brittle string concatenation with pathlib.Path for cross-platform file path manipulation.",
        "codeExample": "from pathlib import Path\np = Path('codelol') / 'lessons' / 'data.json'\nprint(p.name, p.suffix)",
        "expectedOutput": "data.json .json",
        "verificationChecks": [
          {
            "description": "Import Path",
            "pattern": "from pathlib import Path",
            "errorMessage": "Import Path from pathlib."
          }
        ],
        "miniQuiz": {
          "question": "What operator does pathlib use to join paths?",
          "options": [
            "+",
            "/",
            "\\",
            "."
          ],
          "correctAnswerIndex": 1,
          "answerIndex": 1
        },
        "funnyLineGeneral": "String concatenation for paths is a crime against operating systems.",
        "funnyLineTamil": "Path concat panna slash podadha, pathlib / operator use pannu.",
        "practicePrompt": "Build a Path with the / operator and print name and suffix.",
        "proudSuccessGeneral": "Cross-platform path handling achieved!",
        "proudSuccessTamil": "Windows-um Linux-um ippo un friend-u da!",
        "chapterId": "ch9",
        "englishExplanation": "Replace brittle string concatenation with pathlib.Path for cross-platform file path manipulation.",
        "tamilRoast": "Path concat panna slash podadha, pathlib / operator use pannu."
      },
      {
        "id": "ch9-l3",
        "title": "JSON & Statistics Standard Library",
        "explanation": "The standard library includes json for structured data serialization and statistics for instant metrics.",
        "codeExample": "import json, statistics\ndata = json.loads('{\"scores\": [80, 90, 100]}')\nprint(statistics.mean(data['scores']))",
        "expectedOutput": "90",
        "verificationChecks": [
          {
            "description": "Import json",
            "pattern": "import json",
            "errorMessage": "Import json."
          }
        ],
        "miniQuiz": {
          "question": "Which function converts JSON strings to Python dicts?",
          "options": [
            "json.dumps()",
            "json.loads()",
            "json.parse()",
            "json.read()"
          ],
          "correctAnswerIndex": 1,
          "answerIndex": 1
        },
        "funnyLineGeneral": "Why calculate averages manually when statistics.mean() exists?",
        "funnyLineTamil": "Loop potu average kandupudikaama statistics.mean() podu da!",
        "practicePrompt": "Load JSON data and compute its mean using the statistics module.",
        "proudSuccessGeneral": "Data deserialized and metrics computed instantly!",
        "proudSuccessTamil": "Bloody sweet... output vandhuruchu da!",
        "chapterId": "ch9",
        "englishExplanation": "The standard library includes json for structured data serialization and statistics for instant metrics.",
        "tamilRoast": "Loop potu average kandupudikaama statistics.mean() podu da!"
      }
    ]
  },
  {
    "id": "ch10",
    "title": "Object-Oriented Programming (OOP)",
    "tier": "Advanced",
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
    "analogyGeneral": "Classes are blueprints for houses; objects are the questionable structures built from them. Inheriting from four classes at once without understanding Method Resolution Order (MRO) is how you summon an architectural monstrosity that barks, drives, and crashes your database.",
    "analogyTamil": "Class na building plan, object na kattina veedu. Single inheritance, multiple inheritance nu solli perusa scene poduvom... aana unmai enna na appan sothu varaathu, bank loan dhaan varum! super() olunga theriyala na appan yaaru thaatha yaaru nu class-e confuse aagi thalaila thunda potrum.",
    "roastGeneral": "Classes are blueprints for houses; objects are the questionable structures built from them. Inheriting from four classes at once without understanding Method Resolution Order (MRO) is how you summon an architectural monstrosity that barks, drives, and crashes your database.",
    "roastTamil": "Class na building plan, object na kattina veedu. Single inheritance, multiple inheritance nu solli perusa scene poduvom... aana unmai enna na appan sothu varaathu, bank loan dhaan varum! super() olunga theriyala na appan yaaru thaatha yaaru nu class-e confuse aagi thalaila thunda potrum.",
    "lessons": [
      {
        "id": "ch10-l1",
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
          "correctAnswerIndex": 1,
          "answerIndex": 1
        },
        "funnyLineGeneral": "Building blueprints for your data.",
        "funnyLineTamil": "Class potutu object create pannu.",
        "expectedOutput": "Toyota",
        "practicePrompt": "Run and verify Classes and Instances in the interactive arena.",
        "proudSuccessGeneral": "OOP principles and C3 linearization mastered with clean architecture.",
        "proudSuccessTamil": "Class-um object-um pottu getha ninnutiye da Kaipulla!",
        "chapterId": "ch10",
        "englishExplanation": "Define blueprints.",
        "tamilRoast": "Class potutu object create pannu."
      },
      {
        "id": "ch10-l2",
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
          "correctAnswerIndex": 1,
          "answerIndex": 1
        },
        "funnyLineGeneral": "Writing less code is always the goal.",
        "funnyLineTamil": "Auto maari code adikkum.",
        "expectedOutput": "Point(x=1, y=2)",
        "practicePrompt": "Run and verify Dataclasses in the interactive arena.",
        "proudSuccessGeneral": "OOP principles and C3 linearization mastered with clean architecture.",
        "proudSuccessTamil": "Class-um object-um pottu getha ninnutiye da Kaipulla!",
        "chapterId": "ch10",
        "englishExplanation": "Less boilerplate for data containers.",
        "tamilRoast": "Auto maari code adikkum."
      },
      {
        "id": "ch10-l3",
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
          "correctAnswerIndex": 2,
          "answerIndex": 2
        },
        "funnyLineGeneral": "Who do you inherit from first? The C3 knows.",
        "funnyLineTamil": "Appa thodara illa thatha thodara nu kandupudikum.",
        "expectedOutput": "[<class '__main__.B'>, <class '__main__.A'>, <class 'object'>]",
        "practicePrompt": "Run and verify MRO (Method Resolution Order) in the interactive arena.",
        "proudSuccessGeneral": "OOP principles and C3 linearization mastered with clean architecture.",
        "proudSuccessTamil": "Class-um object-um pottu getha ninnutiye da Kaipulla!",
        "chapterId": "ch10",
        "englishExplanation": "How Python resolves multiple inheritance.",
        "tamilRoast": "Appa thodara illa thatha thodara nu kandupudikum."
      }
    ],
    "proudSuccessGeneral": "OOP principles and C3 linearization mastered with clean architecture.",
    "proudSuccessTamil": "Class-um object-um pottu getha ninnutiye da Kaipulla!"
  },
  {
    "id": "ch11",
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
    "analogyGeneral": "Secret handshake hooks that teach Python how to treat your custom objects like native types. If you don't define __repr__, Python refers to your object as an anonymous memory hexadecimal address, essentially saying: 'I exist, but I have zero self-respect.'",
    "analogyTamil": "Dunder methods theriyama OOP panradhu, accelerator irukku aana brake-um handle bar-um illadha bike-ah 100 kmph-la ootura maari! Plus symbol potta rendu object eppadi react aaganum nu class-ku solli thara secret mantra dhaan indha double underscore methods.",
    "roastGeneral": "Secret handshake hooks that teach Python how to treat your custom objects like native types. If you don't define __repr__, Python refers to your object as an anonymous memory hexadecimal address, essentially saying: 'I exist, but I have zero self-respect.'",
    "roastTamil": "Dunder methods theriyama OOP panradhu, accelerator irukku aana brake-um handle bar-um illadha bike-ah 100 kmph-la ootura maari! Plus symbol potta rendu object eppadi react aaganum nu class-ku solli thara secret mantra dhaan indha double underscore methods.",
    "lessons": [
      {
        "id": "ch11-l1",
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
          "correctAnswerIndex": 1,
          "answerIndex": 1
        },
        "funnyLineGeneral": "Two faces for your objects.",
        "funnyLineTamil": "Rendu mugam.",
        "expectedOutput": "str repr",
        "practicePrompt": "Run and verify Str and Repr in the interactive arena.",
        "proudSuccessGeneral": "Custom classes behaving seamlessly as first-class Python citizens.",
        "proudSuccessTamil": "Dunder magic hooks unlocked... native type maari aaiduchu da!",
        "chapterId": "ch11",
        "englishExplanation": "__str__ is for users, __repr__ is for devs.",
        "tamilRoast": "Rendu mugam."
      },
      {
        "id": "ch11-l2",
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
          "correctAnswerIndex": 1,
          "answerIndex": 1
        },
        "funnyLineGeneral": "Pretending to be a list is fun.",
        "funnyLineTamil": "List maari vesham.",
        "expectedOutput": "10",
        "practicePrompt": "Run and verify Container Emulation in the interactive arena.",
        "proudSuccessGeneral": "Custom classes behaving seamlessly as first-class Python citizens.",
        "proudSuccessTamil": "Dunder magic hooks unlocked... native type maari aaiduchu da!",
        "chapterId": "ch11",
        "englishExplanation": "__getitem__ lets you use [] on objects.",
        "tamilRoast": "List maari vesham."
      },
      {
        "id": "ch11-l3",
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
          "correctAnswerIndex": 2,
          "answerIndex": 2
        },
        "funnyLineGeneral": "Always clean up after yourself.",
        "funnyLineTamil": "Velai mudinja close panniudu.",
        "expectedOutput": "Inside",
        "practicePrompt": "Run and verify Context Managers in the interactive arena.",
        "proudSuccessGeneral": "Custom classes behaving seamlessly as first-class Python citizens.",
        "proudSuccessTamil": "Dunder magic hooks unlocked... native type maari aaiduchu da!",
        "chapterId": "ch11",
        "englishExplanation": "__enter__ and __exit__ for the 'with' statement.",
        "tamilRoast": "Velai mudinja close panniudu."
      }
    ],
    "proudSuccessGeneral": "Custom classes behaving seamlessly as first-class Python citizens.",
    "proudSuccessTamil": "Dunder magic hooks unlocked... native type maari aaiduchu da!"
  },
  {
    "id": "ch12",
    "title": "Advanced Iteration & Generators",
    "tier": "Advanced",
    "technicalCore": [
      "Comprehensions",
      "Generators",
      "lazy evaluation",
      "yield from",
      "iterator protocol"
    ],
    "analogyGeneral": "Loading a 20GB dataset directly into a Python list feeds your RAM into a burning furnace. Generators practice weaponized laziness using 'yield': they produce one single crumb of data only when you knock on the door and ask for it.",
    "analogyTamil": "10 lakh items-ah orey dharavala memory-la load panna laptop fan helicopter maari parakkum. Generator oru somberi madhiri: kitta poi thirumba ketta mattum oru piece tharum, illana peaceful-ah thoongum. Memory-um safe, laptop-um safe!",
    "roastGeneral": "Loading a 20GB dataset directly into a Python list feeds your RAM into a burning furnace. Generators practice weaponized laziness using 'yield': they produce one single crumb of data only when you knock on the door and ask for it.",
    "roastTamil": "10 lakh items-ah orey dharavala memory-la load panna laptop fan helicopter maari parakkum. Generator oru somberi madhiri: kitta poi thirumba ketta mattum oru piece tharum, illana peaceful-ah thoongum. Memory-um safe, laptop-um safe!",
    "lessons": [
      {
        "id": "ch12-l1",
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
          "correctAnswerIndex": 2,
          "answerIndex": 2
        },
        "funnyLineGeneral": "One liners that actually make sense.",
        "funnyLineTamil": "Orey variyila matter mudinjathu.",
        "expectedOutput": "[0, 1, 4]",
        "practicePrompt": "Run and verify Comprehensions in the interactive arena.",
        "proudSuccessGeneral": "Lazy iteration streaming infinite data on minimal RAM.",
        "proudSuccessTamil": "Generators-la memory save panni mass kaatita da!",
        "chapterId": "ch12",
        "englishExplanation": "Concise way to create lists.",
        "tamilRoast": "Orey variyila matter mudinjathu."
      },
      {
        "id": "ch12-l2",
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
          "correctAnswerIndex": 1,
          "answerIndex": 1
        },
        "funnyLineGeneral": "Lazy evaluation is a feature, not a bug.",
        "funnyLineTamil": "Somberi code, aana nallathu.",
        "expectedOutput": "1\n2",
        "practicePrompt": "Run and verify Generators in the interactive arena.",
        "proudSuccessGeneral": "Lazy iteration streaming infinite data on minimal RAM.",
        "proudSuccessTamil": "Generators-la memory save panni mass kaatita da!",
        "chapterId": "ch12",
        "englishExplanation": "Yield produces values lazily.",
        "tamilRoast": "Somberi code, aana nallathu."
      },
      {
        "id": "ch12-l3",
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
          "correctAnswerIndex": 1,
          "answerIndex": 1
        },
        "funnyLineGeneral": "Passing the buck to another generator.",
        "funnyLineTamil": "Adutha aalkita velai kudukrathu.",
        "expectedOutput": "[1, 2]",
        "practicePrompt": "Run and verify Yield From in the interactive arena.",
        "proudSuccessGeneral": "Lazy iteration streaming infinite data on minimal RAM.",
        "proudSuccessTamil": "Generators-la memory save panni mass kaatita da!",
        "chapterId": "ch12",
        "englishExplanation": "Delegate to sub-generators.",
        "tamilRoast": "Adutha aalkita velai kudukrathu."
      }
    ],
    "proudSuccessGeneral": "Lazy iteration streaming infinite data on minimal RAM.",
    "proudSuccessTamil": "Generators-la memory save panni mass kaatita da!"
  },
  {
    "id": "ch13",
    "title": "Metaprogramming & Advanced Language Constructs",
    "tier": "Advanced",
    "technicalCore": [
      "Properties",
      "Descriptors",
      "Decorators",
      "functools.wraps",
      "Metaclasses"
    ],
    "analogyGeneral": "Syntactic plastic surgery. A decorator intercepts a function, wraps it in logging, timing, or security bubble-wrap, and sends it on its way without touching the code inside the function itself.",
    "analogyTamil": "Oru function velai seiyum bodhu munnadiyum pinnadiyum BGM podura maari! Hero entry aaguradhukku munnadi crackers vedichu, entry aanadhukku aprom whistle adikura maari function-ah muthukula kai vechu extra velai paaka vekkuradhu dhaan decorator.",
    "roastGeneral": "Syntactic plastic surgery. A decorator intercepts a function, wraps it in logging, timing, or security bubble-wrap, and sends it on its way without touching the code inside the function itself.",
    "roastTamil": "Oru function velai seiyum bodhu munnadiyum pinnadiyum BGM podura maari! Hero entry aaguradhukku munnadi crackers vedichu, entry aanadhukku aprom whistle adikura maari function-ah muthukula kai vechu extra velai paaka vekkuradhu dhaan decorator.",
    "lessons": [
      {
        "id": "ch13-l1",
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
          "correctAnswerIndex": 2,
          "answerIndex": 2
        },
        "funnyLineGeneral": "Looking like an attribute, acting like a method.",
        "funnyLineTamil": "Vesham pottu varuthu.",
        "expectedOutput": "5",
        "practicePrompt": "Run and verify Properties in the interactive arena.",
        "proudSuccessGeneral": "Metaprogramming mastered at the interpreter level.",
        "proudSuccessTamil": "Metaclass and decorators pottu code-aye dominate pannitiye da!",
        "chapterId": "ch13",
        "englishExplanation": "Managed attribute access.",
        "tamilRoast": "Vesham pottu varuthu."
      },
      {
        "id": "ch13-l2",
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
          "correctAnswerIndex": 1,
          "answerIndex": 1
        },
        "funnyLineGeneral": "Wrapping your code like a present.",
        "funnyLineTamil": "Gift paper-la suthuna maari.",
        "expectedOutput": "Hi",
        "practicePrompt": "Run and verify Decorators in the interactive arena.",
        "proudSuccessGeneral": "Metaprogramming mastered at the interpreter level.",
        "proudSuccessTamil": "Metaclass and decorators pottu code-aye dominate pannitiye da!",
        "chapterId": "ch13",
        "englishExplanation": "Functions that wrap functions.",
        "tamilRoast": "Gift paper-la suthuna maari."
      },
      {
        "id": "ch13-l3",
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
          "correctAnswerIndex": 1,
          "answerIndex": 1
        },
        "funnyLineGeneral": "Inception, but for Python classes.",
        "funnyLineTamil": "Class-ke class edukkuthu.",
        "expectedOutput": "<class '__main__.M'>",
        "practicePrompt": "Run and verify Metaclasses in the interactive arena.",
        "proudSuccessGeneral": "Metaprogramming mastered at the interpreter level.",
        "proudSuccessTamil": "Metaclass and decorators pottu code-aye dominate pannitiye da!",
        "chapterId": "ch13",
        "englishExplanation": "Classes that create classes.",
        "tamilRoast": "Class-ke class edukkuthu."
      }
    ],
    "proudSuccessGeneral": "Metaprogramming mastered at the interpreter level.",
    "proudSuccessTamil": "Metaclass and decorators pottu code-aye dominate pannitiye da!"
  },
  {
    "id": "ch14",
    "title": "Asynchronous Programming & Concurrency",
    "tier": "Expert",
    "technicalCore": [
      "Coroutines",
      "async def",
      "await",
      "asyncio",
      "tasks",
      "futures"
    ],
    "analogyGeneral": "Synchronous code stands at the coffee counter staring blankly at the barista until the cup is handed over. Asynchronous code takes a buzzer token, sits down, answers emails, and only walks back when the buzzer vibrates.",
    "analogyTamil": "Tea stall-la token vangi nikkaama kaiya kattitu muzhikkuradhu synchronous blocking. Token vangitu pakkathu kadaila poi vadai saaptu buzzer adicha odi vandhu tea edukkuradhu asynchronous non-blocking I/O da!",
    "roastGeneral": "Synchronous code stands at the coffee counter staring blankly at the barista until the cup is handed over. Asynchronous code takes a buzzer token, sits down, answers emails, and only walks back when the buzzer vibrates.",
    "roastTamil": "Tea stall-la token vangi nikkaama kaiya kattitu muzhikkuradhu synchronous blocking. Token vangitu pakkathu kadaila poi vadai saaptu buzzer adicha odi vandhu tea edukkuradhu asynchronous non-blocking I/O da!",
    "lessons": [
      {
        "id": "ch14-l1",
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
          "correctAnswerIndex": 1,
          "answerIndex": 1
        },
        "funnyLineGeneral": "Waiting politely for things to happen.",
        "funnyLineTamil": "Porumai mukkiyam.",
        "expectedOutput": "Hello",
        "practicePrompt": "Run and verify Async/Await Basics in the interactive arena.",
        "proudSuccessGeneral": "Concurrency and coroutines executing without blocking the event loop.",
        "proudSuccessTamil": "Async/await deadlocks illama rocket maari fly pannudhu da!",
        "chapterId": "ch14",
        "englishExplanation": "Define coroutines with async def.",
        "tamilRoast": "Porumai mukkiyam."
      },
      {
        "id": "ch14-l2",
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
          "correctAnswerIndex": 2,
          "answerIndex": 2
        },
        "funnyLineGeneral": "Don't forget to await, or it never happens.",
        "funnyLineTamil": "Wait pannati onnum kedaikathu.",
        "expectedOutput": "1",
        "practicePrompt": "Run and verify Awaiting Coroutines in the interactive arena.",
        "proudSuccessGeneral": "Concurrency and coroutines executing without blocking the event loop.",
        "proudSuccessTamil": "Async/await deadlocks illama rocket maari fly pannudhu da!",
        "chapterId": "ch14",
        "englishExplanation": "Use await to pause execution.",
        "tamilRoast": "Wait pannati onnum kedaikathu."
      },
      {
        "id": "ch14-l3",
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
          "correctAnswerIndex": 1,
          "answerIndex": 1
        },
        "funnyLineGeneral": "Multitasking for code.",
        "funnyLineTamil": "Orey nerathula rendu velai.",
        "expectedOutput": "2",
        "practicePrompt": "Run and verify Asyncio Tasks in the interactive arena.",
        "proudSuccessGeneral": "Concurrency and coroutines executing without blocking the event loop.",
        "proudSuccessTamil": "Async/await deadlocks illama rocket maari fly pannudhu da!",
        "chapterId": "ch14",
        "englishExplanation": "Run coroutines concurrently.",
        "tamilRoast": "Orey nerathula rendu velai."
      }
    ],
    "proudSuccessGeneral": "Concurrency and coroutines executing without blocking the event loop.",
    "proudSuccessTamil": "Async/await deadlocks illama rocket maari fly pannudhu da!"
  },
  {
    "id": "ch15",
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
    "analogyGeneral": "Sticking label tags onto your code variables. Python ignores them at runtime anyway, but your IDE uses them to scream at you in red squiggly lines before you embarrass yourself in front of senior engineers.",
    "analogyTamil": "Type hint podra nu sonna, type panna therinjaale periya vishayam nu muzhikkura maari. Production-la poi server crash aagi appa kattina fees nyaabagam varadhukku munnadiye un code-ah discipline panna indha typing warning theva.",
    "roastGeneral": "Sticking label tags onto your code variables. Python ignores them at runtime anyway, but your IDE uses them to scream at you in red squiggly lines before you embarrass yourself in front of senior engineers.",
    "roastTamil": "Type hint podra nu sonna, type panna therinjaale periya vishayam nu muzhikkura maari. Production-la poi server crash aagi appa kattina fees nyaabagam varadhukku munnadiye un code-ah discipline panna indha typing warning theva.",
    "lessons": [
      {
        "id": "ch15-l1",
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
          "correctAnswerIndex": 1,
          "answerIndex": 1
        },
        "funnyLineGeneral": "Documentation that tools can read.",
        "funnyLineTamil": "Code-ku label ottrathu.",
        "expectedOutput": "3",
        "practicePrompt": "Run and verify Basic Type Hints in the interactive arena.",
        "proudSuccessGeneral": "Type checker approves with zero errors and bulletproof protocols.",
        "proudSuccessTamil": "Any podama strict static types vechu production-ready aakita!",
        "chapterId": "ch15",
        "englishExplanation": "Annotate variables and returns.",
        "tamilRoast": "Code-ku label ottrathu."
      },
      {
        "id": "ch15-l2",
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
          "correctAnswerIndex": 1,
          "answerIndex": 1
        },
        "funnyLineGeneral": "It's optional, like your attendance.",
        "funnyLineTamil": "Irukkalam illamalum pogalam.",
        "expectedOutput": "None",
        "practicePrompt": "Run and verify Unions & Optionals in the interactive arena.",
        "proudSuccessGeneral": "Type checker approves with zero errors and bulletproof protocols.",
        "proudSuccessTamil": "Any podama strict static types vechu production-ready aakita!",
        "chapterId": "ch15",
        "englishExplanation": "When a value can be multiple types.",
        "tamilRoast": "Irukkalam illamalum pogalam."
      },
      {
        "id": "ch15-l3",
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
          "correctAnswerIndex": 1,
          "answerIndex": 1
        },
        "funnyLineGeneral": "If it walks like a duck, type hint it as a Duck.",
        "funnyLineTamil": "Vathu maari iruntha vathu nu sollu.",
        "expectedOutput": "Done",
        "practicePrompt": "Run and verify Protocols (Duck Typing) in the interactive arena.",
        "proudSuccessGeneral": "Type checker approves with zero errors and bulletproof protocols.",
        "proudSuccessTamil": "Any podama strict static types vechu production-ready aakita!",
        "chapterId": "ch15",
        "englishExplanation": "Structural subtyping in Python.",
        "tamilRoast": "Vathu maari iruntha vathu nu sollu."
      }
    ],
    "proudSuccessGeneral": "Type checker approves with zero errors and bulletproof protocols.",
    "proudSuccessTamil": "Any podama strict static types vechu production-ready aakita!"
  },
  {
    "id": "ch16",
    "title": "CPython Internals, Memory Management & The GIL",
    "tier": "Expert",
    "technicalCore": [
      "Reference counting",
      "Garbage collection",
      "Integer interning",
      "Compilation pipeline",
      "GIL"
    ],
    "analogyGeneral": "The Global Interpreter Lock (GIL) is a stubborn security bouncer that only allows one thread to execute Python bytecode at a time, turning your expensive 16-core CPU into a single-lane toll booth.",
    "analogyTamil": "Oru chocolate-ah 10 per sanda potu saapudra maari, multithreading irundhalum GIL oru thread-ah mattum dhaan velai seiya vidum. CPython chinna numbers-ah (-5 to 256) memory-la reuse panra kanja-pisinari!",
    "roastGeneral": "The Global Interpreter Lock (GIL) is a stubborn security bouncer that only allows one thread to execute Python bytecode at a time, turning your expensive 16-core CPU into a single-lane toll booth.",
    "roastTamil": "Oru chocolate-ah 10 per sanda potu saapudra maari, multithreading irundhalum GIL oru thread-ah mattum dhaan velai seiya vidum. CPython chinna numbers-ah (-5 to 256) memory-la reuse panra kanja-pisinari!",
    "lessons": [
      {
        "id": "ch16-l1",
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
          "correctAnswerIndex": 1,
          "answerIndex": 1
        },
        "funnyLineGeneral": "Keeping track of who's looking at the object.",
        "funnyLineTamil": "Evlo per paakuranga nu count pannuthu.",
        "expectedOutput": "2",
        "practicePrompt": "Run and verify Reference Counting in the interactive arena.",
        "proudSuccessGeneral": "CPython internals and reference counting understood down to C structures.",
        "proudSuccessTamil": "CPython bytecode and GIL-eh adichu thookita, nee thaan real Python Guru!",
        "chapterId": "ch16",
        "englishExplanation": "sys.getrefcount shows active references.",
        "tamilRoast": "Evlo per paakuranga nu count pannuthu."
      },
      {
        "id": "ch16-l2",
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
          "correctAnswerIndex": 1,
          "answerIndex": 1
        },
        "funnyLineGeneral": "Python hoards small numbers just in case.",
        "funnyLineTamil": "Chinna number ah pathrama vachuruku.",
        "expectedOutput": "True\nTrue",
        "practicePrompt": "Run and verify Integer Interning in the interactive arena.",
        "proudSuccessGeneral": "CPython internals and reference counting understood down to C structures.",
        "proudSuccessTamil": "CPython bytecode and GIL-eh adichu thookita, nee thaan real Python Guru!",
        "chapterId": "ch16",
        "englishExplanation": "Small ints are pre-allocated.",
        "tamilRoast": "Chinna number ah pathrama vachuruku."
      },
      {
        "id": "ch16-l3",
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
          "correctAnswerIndex": 2,
          "answerIndex": 2
        },
        "funnyLineGeneral": "Looking at the matrix code.",
        "funnyLineTamil": "Ulla enna oduthu nu paakurathu.",
        "expectedOutput": "2           0 RESUME                   0\n              2 RETURN_CONST             0 (None)",
        "practicePrompt": "Run and verify The Bytecode (dis) in the interactive arena.",
        "proudSuccessGeneral": "CPython internals and reference counting understood down to C structures.",
        "proudSuccessTamil": "CPython bytecode and GIL-eh adichu thookita, nee thaan real Python Guru!",
        "chapterId": "ch16",
        "englishExplanation": "Disassemble Python into CPython bytecode.",
        "tamilRoast": "Ulla enna oduthu nu paakurathu."
      }
    ],
    "proudSuccessGeneral": "CPython internals and reference counting understood down to C structures.",
    "proudSuccessTamil": "CPython bytecode and GIL-eh adichu thookita, nee thaan real Python Guru!"
  },
  {
    "id": "ch17-datascience",
    "title": "Data Science Libraries",
    "tier": "Specialized",
    "technicalCore": [
      "NumPy arrays",
      "Pandas dataframes",
      "SciPy",
      "Matplotlib plots & charts"
    ],
    "analogyGeneral": "Running loops over 5 million numbers in plain Python takes 4 business days. NumPy and Pandas bypass Python entirely, firing raw C-level arrays directly into memory at lightning speed.",
    "analogyTamil": "10 lakh rows-ku python-la for loop potta room heating oven aayidum. Pandas DataFrame oru turbo-charged Excel sheet maari: vectorized calculation panni sekandla mudichutu tea kudikka poirum!",
    "roastGeneral": "Running loops over 5 million numbers in plain Python takes 4 business days. NumPy and Pandas bypass Python entirely, firing raw C-level arrays directly into memory at lightning speed.",
    "roastTamil": "10 lakh rows-ku python-la for loop potta room heating oven aayidum. Pandas DataFrame oru turbo-charged Excel sheet maari: vectorized calculation panni sekandla mudichutu tea kudikka poirum!",
    "lessons": [
      {
        "id": "ch17-l1",
        "title": "NumPy & Pandas Basics",
        "explanation": "Introduction to vectorized operations and DataFrames.",
        "codeExample": "import pandas as pd\ndf = pd.DataFrame({'Roasts': [100, 200]})\nprint(df)",
        "expectedOutput": "   Roasts\n0     100\n1     200",
        "verificationChecks": [
          {
            "description": "Check if the code executed successfully.",
            "pattern": ".*",
            "errorMessage": "Make sure you wrote the code."
          }
        ],
        "miniQuiz": {
          "question": "What is Pandas?",
          "options": [
            "A bear",
            "A data manipulation library",
            "A database",
            "A web framework"
          ],
          "correctAnswerIndex": 1,
          "answerIndex": 1
        },
        "funnyLineGeneral": "Pandas: Making Excel obsolete since 2008.",
        "funnyLineTamil": "Pandas: Excel-ah close panna vandha master-u.",
        "practicePrompt": "Run and verify NumPy & Pandas Basics in the interactive arena.",
        "proudSuccessGeneral": "Vectorized operations processing millions of rows in milliseconds.",
        "proudSuccessTamil": "Pandas and NumPy JCB maari data-vai alli potturuchu da!",
        "chapterId": "ch17-datascience",
        "englishExplanation": "Introduction to vectorized operations and DataFrames.",
        "tamilRoast": "Pandas: Excel-ah close panna vandha master-u."
      },
      {
        "id": "ch17-l2",
        "title": "Vectorized Operations",
        "explanation": "NumPy arrays allow you to apply mathematical operations across an entire array without writing explicit loops.",
        "codeExample": "import numpy as np\narr = np.array([1, 2, 3])\nprint(arr * 10)",
        "expectedOutput": "[10 20 30]",
        "verificationChecks": [
          {
            "description": "Check if the code executed successfully.",
            "pattern": ".*",
            "errorMessage": "Make sure you wrote the code."
          }
        ],
        "miniQuiz": {
          "question": "Why is NumPy faster than Python lists for math?",
          "options": [
            "Magic",
            "Vectorized C operations",
            "It runs on the GPU",
            "It skips checks"
          ],
          "correctAnswerIndex": 1,
          "answerIndex": 1
        },
        "funnyLineGeneral": "Looping through NumPy is like walking next to your Ferrari.",
        "funnyLineTamil": "Ferrari-ah vachikitu adhu pakathula nadanthu pora mari da.",
        "practicePrompt": "Run and verify Vectorized Operations in the interactive arena.",
        "proudSuccessGeneral": "Vectorized operations processing millions of rows in milliseconds.",
        "proudSuccessTamil": "Pandas and NumPy JCB maari data-vai alli potturuchu da!",
        "chapterId": "ch17-datascience",
        "englishExplanation": "NumPy arrays allow you to apply mathematical operations across an entire array without writing explicit loops.",
        "tamilRoast": "Ferrari-ah vachikitu adhu pakathula nadanthu pora mari da."
      },
      {
        "id": "ch17-l3",
        "title": "Data Visualization",
        "explanation": "Visualizing data is crucial. Matplotlib creates plots to understand data distributions.",
        "codeExample": "import matplotlib\nprint('Matplotlib is ready to plot!')",
        "expectedOutput": "Matplotlib is ready to plot!",
        "verificationChecks": [
          {
            "description": "Check if the code executed successfully.",
            "pattern": ".*",
            "errorMessage": "Make sure you wrote the code."
          }
        ],
        "miniQuiz": {
          "question": "What does Matplotlib do?",
          "options": [
            "Cooks meth",
            "Plots graphs and charts",
            "Cleans data",
            "Builds neural networks"
          ],
          "correctAnswerIndex": 1,
          "answerIndex": 1
        },
        "funnyLineGeneral": "A chart is worth a thousand CSV rows.",
        "funnyLineTamil": "Oru graph aayiram varthaikum samam.",
        "practicePrompt": "Run and verify Data Visualization in the interactive arena.",
        "proudSuccessGeneral": "Vectorized operations processing millions of rows in milliseconds.",
        "proudSuccessTamil": "Pandas and NumPy JCB maari data-vai alli potturuchu da!",
        "chapterId": "ch17-datascience",
        "englishExplanation": "Visualizing data is crucial. Matplotlib creates plots to understand data distributions.",
        "tamilRoast": "Oru graph aayiram varthaikum samam."
      }
    ],
    "proudSuccessGeneral": "Vectorized operations processing millions of rows in milliseconds.",
    "proudSuccessTamil": "Pandas and NumPy JCB maari data-vai alli potturuchu da!"
  },
  {
    "id": "ch18-machinelearning",
    "title": "Machine Learning Engine",
    "tier": "Specialized",
    "technicalCore": [
      "Mean/Median/Mode",
      "Standard Deviation",
      "Regression trees",
      "K-means",
      "Train/Test split",
      "Confusion matrix"
    ],
    "analogyGeneral": "Teaching a program by showing it examples rather than rules. Evaluating a model on the exact data it trained on is like giving an exam paper to a student the night before—100% score on the test, but total failure when real life happens.",
    "analogyTamil": "Exam question paper-ah munnaadiye pathukittu poi 100 mark eduthutu, 'En pulla Einstein' nu solra maari overfitting! Real-world test data vandha arrears dhaan varum. Confusion matrix un life confusion vida perisa irukkum.",
    "roastGeneral": "Teaching a program by showing it examples rather than rules. Evaluating a model on the exact data it trained on is like giving an exam paper to a student the night before—100% score on the test, but total failure when real life happens.",
    "roastTamil": "Exam question paper-ah munnaadiye pathukittu poi 100 mark eduthutu, 'En pulla Einstein' nu solra maari overfitting! Real-world test data vandha arrears dhaan varum. Confusion matrix un life confusion vida perisa irukkum.",
    "lessons": [
      {
        "id": "ch18-l1",
        "title": "Train/Test Split",
        "explanation": "You must divide your data to train the model on one chunk and test it on unseen data to prevent overfitting.",
        "codeExample": "print('Training Data: 80% | Testing Data: 20%')",
        "expectedOutput": "Training Data: 80% | Testing Data: 20%",
        "verificationChecks": [
          {
            "description": "Check if the code executed successfully.",
            "pattern": ".*",
            "errorMessage": "Make sure you wrote the code."
          }
        ],
        "miniQuiz": {
          "question": "Why do we split data?",
          "options": [
            "To save space",
            "To prevent the model from memorizing the answers",
            "To make it run faster",
            "Because 80/20 is a cool rule"
          ],
          "correctAnswerIndex": 1,
          "answerIndex": 1
        },
        "funnyLineGeneral": "Don't test on your training data. That's cheating on an open book test.",
        "funnyLineTamil": "Exam paper munnadiye therinju eluthna mari da adhu.",
        "practicePrompt": "Run and verify Train/Test Split in the interactive arena.",
        "proudSuccessGeneral": "Machine learning pipeline trained and evaluated with high accuracy.",
        "proudSuccessTamil": "Confusion matrix-la false positive zero! ML model train aaiduchu!",
        "chapterId": "ch18-machinelearning",
        "englishExplanation": "You must divide your data to train the model on one chunk and test it on unseen data to prevent overfitting.",
        "tamilRoast": "Exam paper munnadiye therinju eluthna mari da adhu."
      },
      {
        "id": "ch18-l2",
        "title": "Regression vs Classification",
        "explanation": "Regression predicts a continuous number. Classification predicts a category.",
        "codeExample": "print('Regression: 100.5 | Classification: Cat')",
        "expectedOutput": "Regression: 100.5 | Classification: Cat",
        "verificationChecks": [
          {
            "description": "Check if the code executed successfully.",
            "pattern": ".*",
            "errorMessage": "Make sure you wrote the code."
          }
        ],
        "miniQuiz": {
          "question": "Predicting house prices is what type of problem?",
          "options": [
            "Classification",
            "Clustering",
            "Regression",
            "Dimensionality Reduction"
          ],
          "correctAnswerIndex": 2,
          "answerIndex": 2
        },
        "funnyLineGeneral": "If it's a number, regress. If it's a dog, classify.",
        "funnyLineTamil": "Kaasa irundha regression, naiyaa irundha classification.",
        "practicePrompt": "Run and verify Regression vs Classification in the interactive arena.",
        "proudSuccessGeneral": "Machine learning pipeline trained and evaluated with high accuracy.",
        "proudSuccessTamil": "Confusion matrix-la false positive zero! ML model train aaiduchu!",
        "chapterId": "ch18-machinelearning",
        "englishExplanation": "Regression predicts a continuous number. Classification predicts a category.",
        "tamilRoast": "Kaasa irundha regression, naiyaa irundha classification."
      },
      {
        "id": "ch18-l3",
        "title": "Confusion Matrix",
        "explanation": "A confusion matrix shows True Positives, False Positives, True Negatives, and False Negatives.",
        "codeExample": "print('True Positive: 10 | False Positive: 2')",
        "expectedOutput": "True Positive: 10 | False Positive: 2",
        "verificationChecks": [
          {
            "description": "Check if the code executed successfully.",
            "pattern": ".*",
            "errorMessage": "Make sure you wrote the code."
          }
        ],
        "miniQuiz": {
          "question": "What does a False Positive mean?",
          "options": [
            "Model correctly predicted true",
            "Model incorrectly predicted true",
            "Model correctly predicted false",
            "Model incorrectly predicted false"
          ],
          "correctAnswerIndex": 1,
          "answerIndex": 1
        },
        "funnyLineGeneral": "It's called a confusion matrix because it confuses beginners.",
        "funnyLineTamil": "Pera paathiya, Unna confuse panna ve irukku.",
        "practicePrompt": "Run and verify Confusion Matrix in the interactive arena.",
        "proudSuccessGeneral": "Machine learning pipeline trained and evaluated with high accuracy.",
        "proudSuccessTamil": "Confusion matrix-la false positive zero! ML model train aaiduchu!",
        "chapterId": "ch18-machinelearning",
        "englishExplanation": "A confusion matrix shows True Positives, False Positives, True Negatives, and False Negatives.",
        "tamilRoast": "Pera paathiya, Unna confuse panna ve irukku."
      }
    ],
    "proudSuccessGeneral": "Machine learning pipeline trained and evaluated with high accuracy.",
    "proudSuccessTamil": "Confusion matrix-la false positive zero! ML model train aaiduchu!"
  },
  {
    "id": "ch19-dsa",
    "title": "Python Data Structures & Algorithms (DSA)",
    "tier": "Specialized",
    "technicalCore": [
      "Stacks",
      "Queues",
      "Linked Lists",
      "Trees",
      "Binary Search",
      "Sorting"
    ],
    "analogyGeneral": "A Stack is Last-In-First-Out, exactly like your browser tabs—the last silly article you opened is the first one you slam shut when your boss walks by. A Queue is First-In-First-Out, like waiting in line at the DMV hoping your ticket gets called before you die of old age.",
    "analogyTamil": "Stack na plate adukki vekkura maari, kadisiyil vechatha modhalla edukanum. Queue na ration shop line, modhalla ninnadhukku dhaan kerosine kedaikkum! Binary search theriyama 1-la irundhu linear search panna, madurai bus stand-la aal theduradha maari tholanjiruva.",
    "roastGeneral": "A Stack is Last-In-First-Out, exactly like your browser tabs—the last silly article you opened is the first one you slam shut when your boss walks by. A Queue is First-In-First-Out, like waiting in line at the DMV hoping your ticket gets called before you die of old age.",
    "roastTamil": "Stack na plate adukki vekkura maari, kadisiyil vechatha modhalla edukanum. Queue na ration shop line, modhalla ninnadhukku dhaan kerosine kedaikkum! Binary search theriyama 1-la irundhu linear search panna, madurai bus stand-la aal theduradha maari tholanjiruva.",
    "lessons": [
      {
        "id": "ch19-l1",
        "title": "Stacks (LIFO)",
        "explanation": "A Stack follows Last-In-First-Out. In Python, you can just use a list with append() and pop().",
        "codeExample": "stack = []\nstack.append(1)\nstack.append(2)\nprint(stack.pop())",
        "expectedOutput": "2",
        "verificationChecks": [
          {
            "description": "Check if the code executed successfully.",
            "pattern": ".*",
            "errorMessage": "Make sure you wrote the code."
          }
        ],
        "miniQuiz": {
          "question": "Which principle does a Stack follow?",
          "options": [
            "FIFO",
            "LIFO",
            "Random Access",
            "LILO"
          ],
          "correctAnswerIndex": 1,
          "answerIndex": 1
        },
        "funnyLineGeneral": "Like a stack of plates. Wash the top one first.",
        "funnyLineTamil": "Mela iruka plate-ah mudhalla edukkanum, keela irunthu ilutha setharam.",
        "practicePrompt": "Run and verify Stacks (LIFO) in the interactive arena.",
        "proudSuccessGeneral": "Classic data structures and algorithms optimized to optimal Big-O bounds.",
        "proudSuccessTamil": "Binary search log(N)-la target-ah thookiruchu, LeetCode bayapadum!",
        "chapterId": "ch19-dsa",
        "englishExplanation": "A Stack follows Last-In-First-Out. In Python, you can just use a list with append() and pop().",
        "tamilRoast": "Mela iruka plate-ah mudhalla edukkanum, keela irunthu ilutha setharam."
      },
      {
        "id": "ch19-l2",
        "title": "Queues (FIFO)",
        "explanation": "A Queue follows First-In-First-Out. Use collections.deque for O(1) pops from the left.",
        "codeExample": "from collections import deque\nq = deque([1, 2, 3])\nq.popleft()\nprint(q[0])",
        "expectedOutput": "2",
        "verificationChecks": [
          {
            "description": "Check if the code executed successfully.",
            "pattern": ".*",
            "errorMessage": "Make sure you wrote the code."
          }
        ],
        "miniQuiz": {
          "question": "What is the best way to implement a queue in Python?",
          "options": [
            "list",
            "set",
            "collections.deque",
            "dict"
          ],
          "correctAnswerIndex": 2,
          "answerIndex": 2
        },
        "funnyLineGeneral": "Just a line at the grocery store. No cutting.",
        "funnyLineTamil": "Ration kade line la mudhalla vanthavan mudhalla povan.",
        "practicePrompt": "Run and verify Queues (FIFO) in the interactive arena.",
        "proudSuccessGeneral": "Classic data structures and algorithms optimized to optimal Big-O bounds.",
        "proudSuccessTamil": "Binary search log(N)-la target-ah thookiruchu, LeetCode bayapadum!",
        "chapterId": "ch19-dsa",
        "englishExplanation": "A Queue follows First-In-First-Out. Use collections.deque for O(1) pops from the left.",
        "tamilRoast": "Ration kade line la mudhalla vanthavan mudhalla povan."
      },
      {
        "id": "ch19-l3",
        "title": "Binary Search",
        "explanation": "Finds an item in a sorted array in O(log N) time by repeatedly dividing the search interval in half.",
        "codeExample": "def bin_search(arr, val):\n    return 'Found' if val in arr else 'Not Found'\nprint(bin_search([1,2,3,4,5], 3))",
        "expectedOutput": "Found",
        "verificationChecks": [
          {
            "description": "Check if the code executed successfully.",
            "pattern": ".*",
            "errorMessage": "Make sure you wrote the code."
          }
        ],
        "miniQuiz": {
          "question": "What is the time complexity of Binary Search?",
          "options": [
            "O(N)",
            "O(log N)",
            "O(1)",
            "O(N^2)"
          ],
          "correctAnswerIndex": 1,
          "answerIndex": 1
        },
        "funnyLineGeneral": "Don't read the whole dictionary to find one word.",
        "funnyLineTamil": "Dictionary-la oru word theda mudhalla paathi-ah pirippa la, adhe thaan.",
        "practicePrompt": "Run and verify Binary Search in the interactive arena.",
        "proudSuccessGeneral": "Classic data structures and algorithms optimized to optimal Big-O bounds.",
        "proudSuccessTamil": "Binary search log(N)-la target-ah thookiruchu, LeetCode bayapadum!",
        "chapterId": "ch19-dsa",
        "englishExplanation": "Finds an item in a sorted array in O(log N) time by repeatedly dividing the search interval in half.",
        "tamilRoast": "Dictionary-la oru word theda mudhalla paathi-ah pirippa la, adhe thaan."
      }
    ],
    "proudSuccessGeneral": "Classic data structures and algorithms optimized to optimal Big-O bounds.",
    "proudSuccessTamil": "Binary search log(N)-la target-ah thookiruchu, LeetCode bayapadum!"
  },
  {
    "id": "ch20-databases",
    "title": "Databases (SQL & NoSQL)",
    "tier": "Specialized",
    "technicalCore": [
      "Connecting",
      "CRUD operations",
      "Queries",
      "Joins",
      "Collections"
    ],
    "analogyGeneral": "The permanent storage layer. Putting raw user text directly into an SQL query string is like leaving your front door wide open with a giant neon sign that says: 'Free real estate for hackers to drop all tables.'",
    "analogyTamil": "Database na un permanent ledger book. Query-la direct string pottu SQL Injection invite panradhu, veetu lock-ah open panni 'Thiruda, unakku thevaiyana jewels eduthuko' nu board maatura maari dangerous!",
    "roastGeneral": "The permanent storage layer. Putting raw user text directly into an SQL query string is like leaving your front door wide open with a giant neon sign that says: 'Free real estate for hackers to drop all tables.'",
    "roastTamil": "Database na un permanent ledger book. Query-la direct string pottu SQL Injection invite panradhu, veetu lock-ah open panni 'Thiruda, unakku thevaiyana jewels eduthuko' nu board maatura maari dangerous!",
    "lessons": [
      {
        "id": "ch20-l1",
        "title": "Relational vs NoSQL",
        "explanation": "SQL databases use tables and strict schemas. NoSQL databases use flexible JSON-like documents.",
        "codeExample": "print('SQL: Tables | NoSQL: Documents')",
        "expectedOutput": "SQL: Tables | NoSQL: Documents",
        "verificationChecks": [
          {
            "description": "Check if the code executed successfully.",
            "pattern": ".*",
            "errorMessage": "Make sure you wrote the code."
          }
        ],
        "miniQuiz": {
          "question": "Which of these is a NoSQL database?",
          "options": [
            "PostgreSQL",
            "MySQL",
            "MongoDB",
            "SQLite"
          ],
          "correctAnswerIndex": 2,
          "answerIndex": 2
        },
        "funnyLineGeneral": "SQL is a strict parent, NoSQL is the cool uncle.",
        "funnyLineTamil": "SQL-na strict officer, NoSQL-na jolly ana aalu.",
        "practicePrompt": "Run and verify Relational vs NoSQL in the interactive arena.",
        "proudSuccessGeneral": "Parameterized queries and database transactions committed safely.",
        "proudSuccessTamil": "Bloody sweet... SQL injection block aagi database secure aaiduchu da!",
        "chapterId": "ch20-databases",
        "englishExplanation": "SQL databases use tables and strict schemas. NoSQL databases use flexible JSON-like documents.",
        "tamilRoast": "SQL-na strict officer, NoSQL-na jolly ana aalu."
      },
      {
        "id": "ch20-l2",
        "title": "CRUD Operations",
        "explanation": "CRUD stands for Create, Read, Update, Delete. These are the four basic functions of persistent storage.",
        "codeExample": "print('Create, Read, Update, Delete')",
        "expectedOutput": "Create, Read, Update, Delete",
        "verificationChecks": [
          {
            "description": "Check if the code executed successfully.",
            "pattern": ".*",
            "errorMessage": "Make sure you wrote the code."
          }
        ],
        "miniQuiz": {
          "question": "What does the 'U' in CRUD stand for?",
          "options": [
            "Upload",
            "Undo",
            "Update",
            "User"
          ],
          "correctAnswerIndex": 2,
          "answerIndex": 2
        },
        "funnyLineGeneral": "Without CRUD, your app is just an amnesiac calculator.",
        "funnyLineTamil": "CRUD illana un app oru memory loss patient thaan.",
        "practicePrompt": "Run and verify CRUD Operations in the interactive arena.",
        "proudSuccessGeneral": "Parameterized queries and database transactions committed safely.",
        "proudSuccessTamil": "Bloody sweet... SQL injection block aagi database secure aaiduchu da!",
        "chapterId": "ch20-databases",
        "englishExplanation": "CRUD stands for Create, Read, Update, Delete. These are the four basic functions of persistent storage.",
        "tamilRoast": "CRUD illana un app oru memory loss patient thaan."
      },
      {
        "id": "ch20-l3",
        "title": "SQL Injections (Security)",
        "explanation": "Never concatenate user input directly into a SQL query. Always use parameterized queries.",
        "codeExample": "print('Always sanitize user inputs!')",
        "expectedOutput": "Always sanitize user inputs!",
        "verificationChecks": [
          {
            "description": "Check if the code executed successfully.",
            "pattern": ".*",
            "errorMessage": "Make sure you wrote the code."
          }
        ],
        "miniQuiz": {
          "question": "How do you prevent SQL injection?",
          "options": [
            "Ask hackers nicely",
            "Use parameterized queries",
            "Hide the database URL",
            "Store data in txt files"
          ],
          "correctAnswerIndex": 1,
          "answerIndex": 1
        },
        "funnyLineGeneral": "Bobby Tables says hi.",
        "funnyLineTamil": "Input-ah sanitize pannalana app kali da.",
        "practicePrompt": "Run and verify SQL Injections (Security) in the interactive arena.",
        "proudSuccessGeneral": "Parameterized queries and database transactions committed safely.",
        "proudSuccessTamil": "Bloody sweet... SQL injection block aagi database secure aaiduchu da!",
        "chapterId": "ch20-databases",
        "englishExplanation": "Never concatenate user input directly into a SQL query. Always use parameterized queries.",
        "tamilRoast": "Input-ah sanitize pannalana app kali da."
      }
    ],
    "proudSuccessGeneral": "Parameterized queries and database transactions committed safely.",
    "proudSuccessTamil": "Bloody sweet... SQL injection block aagi database secure aaiduchu da!"
  }
];

export const pythonLessons: PythonLesson[] = pythonCurriculum.flatMap(chapter =>
  chapter.lessons.map(lesson => ({
    id: lesson.id,
    chapterId: chapter.id,
    title: lesson.title,
    tier: chapter.tier.toLowerCase() as 'beginner' | 'intermediate' | 'advanced' | 'expert' | 'specialized',
    technicalCore: chapter.technicalCore,
    englishExplanation: lesson.englishExplanation || lesson.explanation,
    tamilRoast: lesson.tamilRoast || lesson.funnyLineTamil || chapter.roastTamil,
    codeExample: lesson.codeExample,
    expectedOutput: lesson.expectedOutput,
    verificationChecks: lesson.verificationChecks.map(vc => vc.description || vc.pattern),
    miniQuiz: {
      question: lesson.miniQuiz.question,
      options: lesson.miniQuiz.options,
      answerIndex: lesson.miniQuiz.answerIndex ?? lesson.miniQuiz.correctAnswerIndex
    }
  }))
);
