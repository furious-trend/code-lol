import { Lesson } from './types'

export const pythonBeginnerLessons: Lesson[] = [
  {
    id: 1,
    chapter: "Chapter 1: The Absolute Basics",
    tier: "Beginner",
    title: "Variables",
    sticker: "📦",
    codeExample: "fridgeLabel = 'Leftover Biryani'\nactualFood = 'Frozen Dal'\nprint('Label says:', fridgeLabel)\nprint('Mom actually put:', actualFood)",
    gifKeyword: "screaming internally",
    miniQuizQuestion: {
      question: "What keyword do we use to declare a variable that can change later?",
      options: ["const", "let", "make", "variable"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "Variables can change, like Amma's Horlicks dabba.", code: "horlicksDabba = 'Horlicks'\nprint('Outside:', horlicksDabba)\nhorlicksDabba = 'Sambar Thool'\nprint('Inside:', horlicksDabba)" },
      { explanation: "Constants (ALL_CAPS) shouldn't change, like Appa's TV remote.", code: "APPA_REMOTE = 'News Channel'\nprint('Watching:', APPA_REMOTE)\n# APPA_REMOTE = 'Cartoon Network' # Python won't stop you, but Appa will." },
      { explanation: "Declaring multiple items for a local tea stall.", code: "item1, item2, parcel = 'Tea', 'Vada', 'Bonda'\nprint(item1, item2, parcel)" }
    ],
      verificationChecks: [
            {
              type: "requires_syntax",
              pattern: "^[a-zA-Z_]\\\\w*\\\\s*=",
              expectedMessage: "Your code runs, but it doesn't actually declare a variable. Use variable assignment."
            }
          ],
      biteSized: {
                    meaning: "Value-va store panni vekkura memory dabba (Storage box with a label).",
                    meaningGeneral: "A memory box to store values (like a storage box with a label).",
                    funnyEgTamil: "Amma vechirukra Horlicks dabba maari—veliya label paatha \"Horlicks\", aana ulla eduthu paatha eppovume sambar thool dhaan irukkum!",
                    funnyEgGeneral: "Like a cookie tin your mom keeps—outside the label says 'Butter Cookies', but if you open it, it's always filled with sewing supplies!"
                  }
},
  {
    id: 2,
    chapter: "Chapter 1: The Absolute Basics",
    tier: "Beginner",
    title: "Data Types",
    sticker: "📊",
    codeExample: "status = 'It\\'s Complicated'\nsingles = 1\nisHappy = False\nprint(type(status), type(singles), type(isHappy))",
    gifKeyword: "screaming internally",
    miniQuizQuestion: {
      question: "Which of these is a Boolean?",
      options: ["'True'", "42", "False", "[]"],
      correctAnswerIndex: 2
    },
    examples: [
      { explanation: "Strings for text.", code: "name = 'Batman'\nprint(name)" },
      { explanation: "Numbers for math.", code: "price = 99.99\nprint(price * 2)" },
      { explanation: "Booleans for logic.", code: "isHungry = True\nif isHungry:\n  print('Eat!')" }
    ],
      verificationChecks: [
            {
              type: "requires_syntax",
              pattern: "type\\\\(",
              expectedMessage: "Your code runs, but doesn't seem to check any data types. Try using the 'type()' function!"
            }
          ],
      biteSized: {
                    meaning: "A fundamental concept.",
                    funnyEgTamil: "Data types are like the cast in a Hari movie—you've got the hero (string), the comedian (boolean), and a hundred side actors (numbers) doing their own thing.",
          meaningGeneral: "Different categories of data like numbers, strings, and booleans that the computer handles differently.",
          funnyEgGeneral: "Data types are like the cast in an action movie—you've got the hero (string), the comic relief (boolean), and a hundred side characters (numbers) doing their own thing."
    }
},
  {
    id: 3,
    chapter: "Chapter 3: Data Structures",
    tier: "Beginner",
    title: "Arrays",
    sticker: "📚",
    codeExample: "family = ['Uncle', 'Aunty', 'Cousin']\nprint(family[0]) # Uncle is at index 0",
    gifKeyword: "why is this happening",
    miniQuizQuestion: {
      question: "If `arr = [10, 20, 30]`, what is `arr[1]`?",
      options: ["10", "20", "30", "None"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "Accessing items by index.", code: "colors = ['Red', 'Green', 'Blue']\nprint(colors[1]) # Green" },
      { explanation: "Updating an item in an array.", code: "scores = [10, 20]\nscores[1] = 99\nprint(scores)" },
      { explanation: "Getting the length of an array.", code: "pets = ['Dog', 'Cat', 'Fish']\nprint(len(pets)) # 3" }
    ],
      verificationChecks: [
            {
              type: "requires_syntax",
              pattern: "\\[.*\\]",
              expectedMessage: "Your code runs, but it doesn't look like you created or used an array [] yet."
            }
          ],
      biteSized: {
                    meaning: "Ordered list of items.",
                    funnyEgTamil: "Ration kadai queue—first person index 0!",
          meaningGeneral: "An ordered collection of items, starting at index 0.",
          funnyEgGeneral: "A deli line—the first person is index 0!"
    }
},
  {
    id: 4,
    chapter: "Chapter 3: Data Structures",
    tier: "Beginner",
    title: "Objects",
    sticker: "🏷️",
    codeExample: "person = {\n  name: 'Shafiq',\n  age: 21,\n  patience: 0\n}\nprint(person.name)",
    gifKeyword: "why is this happening",
    miniQuizQuestion: {
      question: "How do you access the 'age' property of the 'person' object?",
      options: ["person[age]", "person.age", "person->age", "person:age"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "Dot notation to access properties.", code: "car = { make: 'Ford', speed: 100 }\nprint(car.speed)" },
      { explanation: "Bracket notation (useful for dynamic keys).", code: "user = { 'first name': 'John' }\nprint(user['first name'])" },
      { explanation: "Adding new properties.", code: "robot = {}\nrobot.power = 'Laser'\nprint(robot)" }
    ],
      verificationChecks: [
            {
              type: "requires_syntax",
              pattern: "\\{[\\s\\S]*\\}",
              expectedMessage: "Your code runs, but you didn't define an object {} yet."
            }
          ],
      biteSized: {
                    meaning: "Key-value data packet.",
                    funnyEgTamil: "Contractor biodata: { name: \\\"Nesamani\\\", weakness: \\\"Spanner\\\" }."
                  }
},
  {
    id: 5,
    chapter: "Chapter 2: Logic & Control Flow",
    tier: "Beginner",
    title: "For Loops",
    sticker: "🔁",
    codeExample: "for minutes in range(1, 6):\n  print('Scrolling reel #' + str(minutes))",
    gifKeyword: "screaming internally",
    miniQuizQuestion: {
      question: "What are the three parts of a standard for loop?",
      options: ["start, stop, pause", "initialization, condition, increment", "begin, middle, end", "let, const, var"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "Basic counting loop.", code: "for i in range(3):\n  print(i)" },
      { explanation: "Looping over an array.", code: "items = ['A', 'B', 'C']\nfor item in items:\n  print(item)" },
      { explanation: "Counting backwards.", code: "for i in range(3, 0, -1):\n  print('Countdown:', i)" }
    ],
      verificationChecks: [
            {
              type: "requires_syntax",
              pattern: "for\\s+",
              expectedMessage: "Your code runs, but it doesn't actually use a 'for' loop yet — give it another shot!"
            },
            {
              type: "requires_call_count",
              expectedMessage: "Your loop didn't seem to iterate multiple times. Make sure your loop condition allows it to run more than once!"
            }
          ],
      biteSized: {
                    meaning: "Code repeating until told to stop.",
                    funnyEgTamil: "Kaipulla in Winner: \\\"Naanum evvalo dhaan adivaanguradhu...\\\" without a break."
                  }
},
  {
    id: 6,
    chapter: "Chapter 2: Logic & Control Flow",
    tier: "Beginner",
    title: "While Loops",
    sticker: "☕",
    codeExample: "broke = False\ncups = 0\nwhile not broke and cups < 3:\n  print('One more chai!')\n  cups += 1",
    gifKeyword: "waiting forever",
    miniQuizQuestion: {
      question: "When does a while loop stop executing?",
      options: ["When it gets tired", "When the condition becomes False", "After 10 iterations", "When the page reloads"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "Basic while loop.", code: "count = 0\nwhile count < 3:\n  print(count)\n  count += 1" },
      { explanation: "Waiting for a condition.", code: "ready = False\nchecks = 0\nwhile not ready:\n  checks += 1\n  if checks > 2: ready = True\n  print('Checking...')" },
      { explanation: "Do-while (runs at least once).", code: "x = 10\nwhile True:\n  print('Ran once!')\n  if x >= 5: break" }
    ],
      verificationChecks: [
            {
              type: "requires_syntax",
              pattern: "while\\s+",
              expectedMessage: "Your code runs, but it doesn't actually use a 'while' loop yet — give it another shot!"
            },
            {
              type: "requires_call_count",
              expectedMessage: "Your loop didn't seem to iterate multiple times. Check your condition!"
            }
          ],
      biteSized: {
                    meaning: "Code repeating until told to stop.",
                    funnyEgTamil: "Kaipulla in Winner: \\\"Naanum evvalo dhaan adivaanguradhu...\\\" without a break."
                  }
},
  {
    id: 7,
    chapter: "Chapter 2: Logic & Control Flow",
    tier: "Beginner",
    title: "Conditionals (if/else)",
    sticker: "🔀",
    codeExample: "isBored = True\nif isBored:\n  print('Opening Insta...')\nelse:\n  print('Writing code!')",
    gifKeyword: "why is this happening",
    miniQuizQuestion: {
      question: "What happens if the condition in an `if` statement is False?",
      options: ["The code crashes", "It runs the `else` block (if it exists)", "It runs the `if` block anyway", "The computer shuts down"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "Basic if statement.", code: "if 5 > 3:\n  print('Math works!')" },
      { explanation: "If / Else.", code: "rain = True\nif rain:\n  print('Umbrella')\nelse:\n  print('Sunglasses')" },
      { explanation: "Else If chain.", code: "score = 85\nif score > 90:\n  print('A')\nelif score > 80:\n  print('B')\nelse:\n  print('C')" }
    ],
      verificationChecks: [
            {
              type: "requires_syntax",
              pattern: "if\\s+",
              expectedMessage: "Your code runs, but you didn't use an 'if' statement to make a decision."
            }
          ],
      biteSized: {
                    meaning: "A fundamental concept.",
                    funnyEgTamil: "Conditionals are like dealing with a strict dad: 'If (marks > 90) get a bike, Else get an umbrella for walking'.",
          meaningGeneral: "Executing different code blocks based on conditions.",
          funnyEgGeneral: "Conditionals are like dealing with strict parents: 'If (grades > 90) get a car, Else get a bus pass'."
    }
},
  {
    id: 8,
    chapter: "Chapter 4: Functions & Scope",
    tier: "Beginner",
    title: "Functions",
    sticker: "🤖",
    codeExample: "def orderBiryani(isSpicy):\n  if isSpicy:\n    return '🔥 Spicy Biryani'\n  return 'Normal Biryani'\nprint(orderBiryani(True))",
    gifKeyword: "screaming internally",
    miniQuizQuestion: {
      question: "What keyword is used to send a value back out of a function?",
      options: ["give", "send", "return", "output"],
      correctAnswerIndex: 2
    },
    examples: [
      { explanation: "Basic function declaration.", code: "def sayHi():\n  print('Hi!')\nsayHi()" },
      { explanation: "Function with parameters.", code: "def add(a, b):\n  return a + b\nprint(add(2, 3))" },
      { explanation: "Function expression (assigned to a variable).", code: "greet = lambda name: 'Hello ' + name\nprint(greet('John'))" }
    ],
      verificationChecks: [
            {
              type: "requires_syntax",
              pattern: "def\\s+",
              expectedMessage: "Your code runs, but you need to define a function to complete this lesson."
            },
            {
              type: "requires_syntax",
              pattern: "return\\s+",
              expectedMessage: "Make sure your function returns a value using the 'return' keyword."
            }
          ],
      biteSized: {
                    meaning: "Reusable task machine.",
                    funnyEgTamil: "Madurai tea master: Milk & sugar in, hot tea return.",
          meaningGeneral: "A reusable block of code that takes inputs and returns an output.",
          funnyEgGeneral: "Barista: Espresso and milk in, hot latte return."
    }
},
  {
    id: 9,
    chapter: "Chapter 6: Essential Syntax",
    tier: "Beginner",
    title: "Operators",
    sticker: "➕",
    codeExample: "score = 95\ncousinScore = '95'\nprint(score == cousinScore) # True (loose)\nprint(score == cousinScore) # False (strict!)",
    gifKeyword: "why is this happening",
    miniQuizQuestion: {
      question: "What is the difference between `==` and `==`?",
      options: ["No difference", "`==` checks value AND type", "`==` is faster", "`==` is only for numbers"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "Arithmetic operators.", code: "print(10 + 5)\nprint(10 - 2)\nprint(10 * 3)\nprint(10 / 2)" },
      { explanation: "Comparison operators.", code: "print(5 > 3) # True\nprint(10 <= 10) # True\nprint(1 != 2) # True" },
      { explanation: "Logical operators (AND / OR).", code: "print(True and False) # False\nprint(True or False) # True" }
    ],
      verificationChecks: [
            {
              type: "requires_syntax",
              pattern: "(?:==|==|!=|!=|>|<|>=|<=)",
              expectedMessage: "Try using a comparison operator like == or == to compare values."
            }
          ],
      biteSized: {
                    meaning: "A fundamental concept.",
                    funnyEgTamil: "Operators are like the fight scene gravity in Boyapati movies—they push, pull, and multiply things in ways that defy logic.",
          meaningGeneral: "Symbols that perform operations on variables and values.",
          funnyEgGeneral: "Operators are like physics in action movies—they push, pull, and multiply things in ways that defy logic."
    }
},
  {
    id: 10,
    chapter: "Chapter 6: Essential Syntax",
    tier: "Beginner",
    title: "String Basics",
    sticker: "🧵",
    codeExample: "msg = 'Hello'\nname = \"Shafiq\"\nprint(msg + ' ' + name) # concatenation",
    gifKeyword: "facepalm",
    miniQuizQuestion: {
      question: "How do you combine two strings together (concatenation)?",
      options: ["With the `+` operator", "With the `&` operator", "With the `concat` keyword", "You can't"],
      correctAnswerIndex: 0
    },
    examples: [
      { explanation: "Single vs Double quotes.", code: "single = 'Hi'\ndouble = \"Hello\"\nprint(single, double)" },
      { explanation: "String length.", code: "word = 'JavaScript'\nprint(len(word)) # 10" },
      { explanation: "Getting a specific character.", code: "text = 'Code'\nprint(text[0]) # C" }
    ],
      verificationChecks: [
            {
              type: "requires_syntax",
              pattern: "\\+",
              expectedMessage: "Try concatenating (adding) two strings together using the + operator."
            }
          ],
      biteSized: {
                    meaning: "A fundamental concept.",
                    funnyEgTamil: "Strings are like Dhanush singing 'Why This Kolaveri Di'—you just keep adding words together until it becomes a massive hit.",
          meaningGeneral: "Text data that can be concatenated and manipulated.",
          funnyEgGeneral: "Strings are like a pop song chorus—you just keep adding words together until it becomes a massive hit."
    }
},
  {
    id: 11,
    chapter: "Chapter 1: The Absolute Basics",
    tier: "Beginner",
    title: "Comments",
    sticker: "🤫",
    codeExample: "# This is a single line comment\nx = 10 /* This is a \nmulti-line comment */\nprint(x)",
    gifKeyword: "screaming internally",
    miniQuizQuestion: {
      question: "Which of these is NOT a valid way to write a comment in JavaScript?",
      options: ["# comment", "/* comment */", "<!-- comment -->", "Both A and B are valid"],
      correctAnswerIndex: 2
    },
    examples: [
      { explanation: "Single line comment.", code: "a = 1 # This is one\nprint(a)" },
      { explanation: "Multi line comment.", code: "/* \n  Big block \n  of text \n*/\nb = 2" },
      { explanation: "Commenting out code to disable it temporarily.", code: "c = 3\n# c = 4\nprint(c) # still 3" }
    ],
      verificationChecks: [
            {
              type: "requires_syntax",
              pattern: "(?:\\/\\/|\\/\\*)",
              expectedMessage: "Your code runs, but it looks like you forgot to write a comment!"
            }
          ],
      biteSized: {
                    meaning: "A fundamental concept.",
                    funnyEgTamil: "Comments are like the director's cut explanations—nobody reads them during the movie, but without them, you have no idea what's happening.",
          meaningGeneral: "Text in code intended for humans, ignored by the computer.",
          funnyEgGeneral: "Comments are like the director's commentary track—nobody listens to them during the movie, but without them, you have no idea why things happened."
    }
},
  {
    id: 12,
    chapter: "Chapter 5: The Weird Parts",
    tier: "Beginner",
    title: "Type Conversion",
    sticker: "🔄",
    codeExample: "a = '5' + 1\nb = '5' - 1\nprint('a = ' + a + ', b = ' + b)",
    gifKeyword: "why is this happening",
    miniQuizQuestion: {
      question: "What is the output of `'3' + 2` in JavaScript?",
      options: ["5", "32", "NaN", "Error"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "Converting string to number safely.", code: "num = Number('42')\nprint(type(num) # number" },
      { explanation: "Converting number to string.", code: "str = String(100)\nprint(type(str) # string" },
      { explanation: "Implicit coercion (JS doing weird things automatically).", code: "print('5' * 2) # 10 (string becomes number for math)" }
    ],
      verificationChecks: [
            {
              type: "requires_syntax",
              pattern: "(?:Number\\(|String\\()",
              expectedMessage: "Try explicitly converting a type using Number() or String()."
            }
          ],
      biteSized: {
                    meaning: "A fundamental concept.",
                    funnyEgTamil: "Type conversion is like Kamal Haasan's Dasavatharam—suddenly a number dresses up as a string and you're just confused about who is who.",
          meaningGeneral: "Converting data from one type to another.",
          funnyEgGeneral: "Type conversion is like an actor in a spy movie—suddenly a number dresses up as a string and you're confused about who is who."
    }
},
  {
    id: 13,
    chapter: "Chapter 1: The Absolute Basics",
    tier: "Beginner",
    title: "Input/Output Basics",
    sticker: "🖨️",
    codeExample: "secret = 'I love coding'\nprint('The secret is:', secret)",
    gifKeyword: "this is fine fire",
    miniQuizQuestion: {
      question: "Which method is used to print messages to the browser console?",
      options: ["print()", "console.print()", "print()", "document.write()"],
      correctAnswerIndex: 2
    },
    examples: [
      { explanation: "Basic logging.", code: "print('Just testing!')" },
      { explanation: "Logging errors and warnings.", code: "console.warn('Careful!')\nconsole.error('Too late!')" },
      { explanation: "Logging tables for objects/arrays.", code: "arr = [{id: 1}, {id: 2}]\nconsole.table(arr)" }
    ],
      verificationChecks: [
            {
              type: "requires_syntax",
              pattern: "console\\.(?:log|warn|error|table)",
              expectedMessage: "You need to print something using print() or similar."
            }
          ],
      biteSized: {
                    meaning: "A fundamental concept.",
                    funnyEgTamil: "Input/Output is like a press meet—you throw a question (input) and get a pre-planned political answer (output) on the console.",
          meaningGeneral: "Taking data in from the user and printing results back out.",
          funnyEgGeneral: "Input/Output is like a press conference—you throw a question (input) and get a pre-planned political answer (output) on the screen."
    }
},
  {
    id: 14,
    chapter: "Chapter 4: Functions & Scope",
    tier: "Beginner",
    title: "Variable Scope",
    sticker: "🔭",
    codeExample: "globalGossip = 'Everyone knows'\ndef myHouse():\n  secret = 'Only I know'\n  print(globalGossip)\nmyHouse()",
    gifKeyword: "screaming internally",
    miniQuizQuestion: {
      question: "If a variable is declared inside a function using `let`, can it be accessed outside?",
      options: ["Yes, always", "No, it is locally scoped", "Only if you use `var`", "Only on Tuesdays"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "Global Scope.", code: "x = 10\ndef show(): print(x) }\nshow()" },
      { explanation: "Local/Function Scope.", code: "def local():\n  y = 5\n# print(y) # Error! y is not defined" },
      { explanation: "Block Scope (and const).", code: "if (True) {\n  z = 100\n}\n# print(z) # Error! z is trapped in the block" }
    ],
      verificationChecks: [
            {
              type: "requires_syntax",
              pattern: "let\\s+",
              expectedMessage: "Try declaring a local variable using 'let' inside a function or block."
            }
          ],
      biteSized: {
                    meaning: "A fundamental concept.",
                    funnyEgTamil: "Variable scope is like local rowdy vs international don—a local 'let' has no power outside its own street (block).",
          meaningGeneral: "The context in which a variable is accessible.",
          funnyEgGeneral: "Variable scope is like a local gang vs an international syndicate—a local variable has no power outside its own neighborhood."
    }
},
  {
    id: 15,
    chapter: "Chapter 4: Functions & Scope",
    tier: "Beginner",
    title: "Constants vs Variables",
    sticker: "🛑",
    codeExample: "PI = 3.14159\n# PI = 3 # This would cause an error!\nprint('PI is', PI)",
    gifKeyword: "wifi not working",
    miniQuizQuestion: {
      question: "What happens if you try to reassign a `const` variable?",
      options: ["It updates successfully", "It shows a warning but works", "It throws a TypeError", "The browser crashes"],
      correctAnswerIndex: 2
    },
    examples: [
      { explanation: "Cannot reassign primitives.", code: "speedOfLight = 299792458\n# speedOfLight = 0 # TypeError" },
      { explanation: "Objects in CAN be mutated!", code: "obj = { name: 'A' }\nobj.name = 'B' # Allowed!\nprint(obj)" },
      { explanation: "Arrays in CAN be mutated!", code: "arr = [1]\narr.append(2) # Allowed!\nprint(arr)" }
    ],
      verificationChecks: [
            {
              type: "requires_syntax",
              pattern: "const\\s+",
              expectedMessage: "Make sure you declare a constant using 'const'."
            }
          ],
      biteSized: {
                    meaning: "Locked forever value.",
                    funnyEgTamil: "Appa-oda TV remote—touch panna TypeError adi vizhum!",
          meaningGeneral: "Values that cannot be changed after creation (like tuples).",
          funnyEgGeneral: "Dad's TV remote—if you touch it, you'll get a TypeError slap!"
    }
},
  {
    id: 16,
    chapter: "Chapter 6: Essential Syntax",
    tier: "Beginner",
    title: "Basic Math Operations",
    sticker: "🧮",
    codeExample: "slices = 5\nfriends = 2\nleftover = slices % friends\nprint('Leftover slices:', leftover)",
    gifKeyword: "salty reaction",
    miniQuizQuestion: {
      question: "What does the `%` (modulo) operator do?",
      options: ["Calculates percentages", "Returns the remainder of division", "Multiplies numbers", "Rounds numbers down"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "Addition and Subtraction.", code: "print(10 + 5)\nprint(10 - 5)" },
      { explanation: "Multiplication and Division.", code: "print(10 * 5)\nprint(10 / 5)" },
      { explanation: "Modulo (Remainder).", code: "print(10 % 3) # 1" }
    ],
      verificationChecks: [
            {
              type: "requires_syntax",
              pattern: "%",
              expectedMessage: "Use the modulo operator (%) to find the remainder."
            }
          ],
      biteSized: {
                    meaning: "A fundamental concept.",
                    funnyEgTamil: "Division is like sharing biryani with friends—someone always takes the 'leg piece' (remainder) and you use modulo to find who took it.",
          meaningGeneral: "Mathematical division and finding the remainder.",
          funnyEgGeneral: "Division is like sharing pizza with friends—someone always takes the last slice (remainder) and you use modulo to find out how many are left."
    }
},
  {
    id: 17,
    chapter: "Chapter 6: Essential Syntax",
    tier: "Beginner",
    title: "Ternary Operator",
    sticker: "❓",
    codeExample: "marks = 85\nresult = 'Pass 🎉' if marks > 40 else 'Fail 💀'\nprint(result)",
    gifKeyword: "why is this happening",
    miniQuizQuestion: {
      question: "Which symbol separates the 'True' outcome from the 'False' outcome in a ternary operator?",
      options: ["?", "!", ":", ""],
      correctAnswerIndex: 2
    },
    examples: [
      { explanation: "Basic ternary.", code: "isRaining = True\naction = 'Stay inside' if isRaining else 'Go outside'\nprint(action)" },
      { explanation: "Inline rendering (common in React).", code: "loggedIn = False\nprint('Welcome!' if loggedIn else 'Please log in')" },
      { explanation: "Nested ternaries (please don't do this).", code: "score = 90\ngrade = 'A' if score > 80 else ('B' if score > 60 else 'C')\nprint(grade)" }
    ],
      verificationChecks: [
            {
              type: "requires_syntax",
              pattern: "if\\s+.*\\s+else",
              expectedMessage: "Your code runs, but you need to use the ternary operator (? :) for this exercise."
            }
          ],
      biteSized: {
                    meaning: "A fundamental concept.",
                    funnyEgTamil: "Ternary operator is like a quick punch dialogue—short, sharp, and hits you with either 'Success' or 'Failure' in one line.",
          meaningGeneral: "A shorthand one-line if-else statement.",
          funnyEgGeneral: "A ternary operator is like a quick action movie one-liner—short, sharp, and hits you with either 'Success' or 'Failure' instantly."
    }
},
  {
    id: 18,
    chapter: "Chapter 6: Essential Syntax",
    tier: "Beginner",
    title: "Template Literals",
    sticker: "📝",
    codeExample: "name = 'Batman'\ncity = 'Gotham'\nprint(f'{name} protects {city}')",
    gifKeyword: "why is this happening",
    miniQuizQuestion: {
      question: "Which character is used to create a template literal?",
      options: ["' (single quote)", "\" (double quote)", "` (backtick)", "~ (tilde)"],
      correctAnswerIndex: 2
    },
    examples: [
      { explanation: "Basic interpolation.", code: "age = 30\nprint(f'I am {age} years old')" },
      { explanation: "Math inside interpolation.", code: "print(f'2 + 2 is {2 + 2}')" },
      { explanation: "Multi-line strings without \\n.", code: "poem = `Roses are red\nViolets are blue`\nprint(poem)" }
    ],
      verificationChecks: [
            {
              type: "requires_syntax",
              pattern: "\\`.*\\$\\{.*\\}.*\\`",
              expectedMessage: "Try using backticks (`) and ${} to insert a variable into your string."
            }
          ],
      biteSized: {
                    meaning: "A fundamental concept.",
                    funnyEgTamil: "Template literals are like a Harris Jayaraj song—you just plug in some random English words \\`\\${here}\\` and it sounds beautiful."
                  }
},
  {
    id: 19,
    chapter: "Chapter 5: The Weird Parts",
    tier: "Beginner",
    title: "Null vs Undefined",
    sticker: "🕳️",
    codeExample: "forgotToAssign\nemptyOnPurpose = None\nprint(forgotToAssign, emptyOnPurpose)",
    gifKeyword: "mind blown",
    miniQuizQuestion: {
      question: "If you declare a variable but don't assign a value, what is its value?",
      options: ["0", "None", "None", "False"],
      correctAnswerIndex: 2
    },
    examples: [
      { explanation: "Undefined by default.", code: "x\nprint(x) # None" },
      { explanation: "Setting None explicitly.", code: "user = None\nprint(user) # None" },
      { explanation: "They are loose equals but not strict equals.", code: "print(None == None) # True\nprint(None == None) # False" }
    ],
      verificationChecks: [
            {
              type: "requires_syntax",
              pattern: "(?:None|None)",
              expectedMessage: "Try explicitly using 'None' or checking for 'None'."
            }
          ],
      biteSized: {
                    meaning: "A fundamental concept.",
                    funnyEgTamil: "Null is like saying 'I have no money', None is like opening your waland finding a moth flying out.",
          meaningGeneral: "Representing the intentional absence of any value.",
          funnyEgGeneral: "Null is like saying 'I have no cash', None is like opening your wallet and finding a moth flying out."
    }
},
  {
    id: 20,
    chapter: "Chapter 5: The Weird Parts",
    tier: "Beginner",
    title: "Truthy/Falsy Values",
    sticker: "🎭",
    codeExample: "if 'False':\n  print('This runs because string is truthy!')\nif 0:\n  print('This won\\'t run')",
    gifKeyword: "why is this happening",
    miniQuizQuestion: {
      question: "Which of the following is considered a 'truthy' value?",
      options: ["0", "\"\" (empty string)", "None", "\"0\" (string zero)"],
      correctAnswerIndex: 3
    },
    examples: [
      { explanation: "Falsy values.", code: "if (not 0 and not '') {\n  print('Both are falsy')\n}" },
      { explanation: "Truthy values (even empty arrays!).", code: "if ([] and {}) {\n  print('Objects and arrays are ALWAYS truthy')\n}" },
      { explanation: "Using OR (||) for default values.", code: "name = ''\ndisplayName = name || 'Anonymous'\nprint(displayName)" }
    ],
      verificationChecks: [
            {
              type: "requires_syntax",
              pattern: "if\\s+",
              expectedMessage: "Use an 'if' statement to test if a value is truthy or falsy."
            }
          ],
      biteSized: {
                    meaning: "A fundamental concept.",
                    funnyEgTamil: "Truthy values are like a 'mass' hero entry—everyone believes it. Falsy values are like the villain's henchmen—completely useless.",
          meaningGeneral: "Values that evaluate to true or false in a boolean context.",
          funnyEgGeneral: "Truthy values are like the hero's entrance—everyone believes it. Falsy values are like the villain's henchmen—completely useless."
    }
},
  {
    id: 21,
    chapter: "Chapter 5: The Weird Parts",
    tier: "Beginner",
    title: "Basic Debugging",
    sticker: "🐛",
    codeExample: "codeWorks = False\n# print('Trying to find the bug...')\nprint('Found it! Typo.')",
    gifKeyword: "screaming internally",
    miniQuizQuestion: {
      question: "What is the most common tool beginners use to debug JavaScript?",
      options: ["A debugger statement", "print()", "Try/Catch", "Stack trace analysis"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "Using print.", code: "total = 50\nprint('Total is:', total)" },
      { explanation: "Using the debugger keyword.", code: "def test():\n  debugger # Browser will pause here!\n  return 1\n}\ntest()" },
      { explanation: "Typo example.", code: "myName = 'Alice'\n# print(myname) # ReferenceError!" }
    ],
      verificationChecks: [
            {
              type: "requires_syntax",
              pattern: "(?:console\\.log|debugger)",
              expectedMessage: "Try using print() to debug!"
            }
          ],
      biteSized: {
                    meaning: "Broken code crash.",
                    funnyEgTamil: "Vadivelu dialogue: \\\"Build-up bayangarama irukku... aana output varala!\\\""
                  }
},
  {
    id: 22,
    chapter: "Chapter 2: Logic & Control Flow",
    tier: "Beginner",
    title: "Switch Statements",
    sticker: "🕹️",
    codeExample: "day = 3\nmatch day:\n  case 1:\n    print('Monday')\n  case 3:\n    print('Wednesday')\n  case _:\n    print('Other day')",
    gifKeyword: "screaming internally",
    miniQuizQuestion: {
      question: "What keyword is used to stop a `switch` statement from executing the next cases?",
      options: ["stop", "halt", "end", "break"],
      correctAnswerIndex: 3
    },
    examples: [
      { explanation: "Basic Switch.", code: "fruit = 'Apple'\nmatch fruit:\n  case 'Apple':\n    print('Red')\n  case 'Banana':\n    print('Yellow')" },
      { explanation: "Default case (fallback).", code: "color = 'Purple'\nmatch color:\n  case 'Red':\n    print('Stop')\n  case _:\n    print('Go')" },
      { explanation: "Fall-through (forgetting break).", code: "val = 1\nmatch val:\n  case 1 | 2:\n    print('1 or 2')" }
    ],
      verificationChecks: [
            {
              type: "requires_syntax",
              pattern: "match\\s+",
              expectedMessage: "Your code runs, but it doesn't use a 'switch' statement."
            },
            {
              type: "requires_syntax",
              pattern: "case\\s+",
              expectedMessage: "Make sure you have at least one 'case' in your switch block."
            }
          ],
      biteSized: {
                    meaning: "A fundamental concept.",
                    funnyEgTamil: "Switch statements are like going to a Saravana Bhavan—you have 10 cases (idli, dosa, pongal) and a default (just coffee).",
          meaningGeneral: "A control structure for selecting one of many code blocks to execute.",
          funnyEgGeneral: "Switch statements are like going to a diner—you have 10 cases (burger, fries, shake) and a default (just water)."
    }
},
  {
    id: 23,
    chapter: "Chapter 6: Essential Syntax",
    tier: "Beginner",
    title: "Nested Loops",
    sticker: "🪆",
    codeExample: "for i in range(1, 3):\n  for j in range(1, 3):\n    print(f'i={i}, j={j}')",
    gifKeyword: "going in circles",
    miniQuizQuestion: {
      question: "If an outer loop runs 3 times and an inner loop runs 4 times, how many total times does the inner code run?",
      options: ["7", "12", "34", "Infinite"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "Basic nested loop.", code: "for i in range(2):\n  for j in range(2):\n    print(i, j)" },
      { explanation: "Creating a grid.", code: "grid = ''\nfor r in range(3):\n  for c in range(3):\n    grid += '* '\n  grid += '\\n'\nprint(grid)" },
      { explanation: "Nested loop over an array of arrays.", code: "matrix = [[1, 2], [3, 4]]\nfor row in matrix:\n  for col in row:\n    print(col)" }
    ],
      verificationChecks: [
            {
              type: "requires_syntax",
              pattern: "(?:for|while).*\\{.*(?:for|while)",
              expectedMessage: "You need a loop inside another loop for this exercise."
            }
          ],
      biteSized: {
                    meaning: "A fundamental concept.",
                    funnyEgTamil: "Nested loops are like a Tamil serial plot—loops inside loops inside loops, and it runs for 5 years.",
          meaningGeneral: "A loop inside another loop.",
          funnyEgGeneral: "Nested loops are like a soap opera plot—loops inside loops inside loops, and it runs for 5 years."
    }
},
  {
    id: 24,
    chapter: "Chapter 3: Data Structures",
    tier: "Beginner",
    title: "Array Push/Pop Methods",
    sticker: "🛒",
    codeExample: "cart = ['Apples', 'Milk']\ncart.append('Cookies') # Add to end\ncart.pop() # Remove last (Cookies)\nprint(cart)",
    gifKeyword: "screaming internally",
    miniQuizQuestion: {
      question: "Which array method removes the LAST element from an array?",
      options: ["shift()", "remove()", "pop()", "append()"],
      correctAnswerIndex: 2
    },
    examples: [
      { explanation: "Pushing items.", code: "arr = []\narr.append(1)\narr.append(2, 3)\nprint(arr) # [1, 2, 3]" },
      { explanation: "Popping items.", code: "arr = [1, 2, 3]\nlast = arr.pop()\nprint(last) # 3\nprint(arr) # [1, 2]" },
      { explanation: "Combining both for a Stack (LIFO).", code: "stack = []\nstack.append('A')\nstack.append('B')\nprint(stack.pop()) # B" }
    ],
      verificationChecks: [
            {
              type: "requires_syntax",
              pattern: "\\.(?:push|pop)\\s*\\(",
              expectedMessage: "Try using the .append() or .pop() methods on an array."
            }
          ],
      biteSized: {
                    meaning: "A fundamental concept.",
                    funnyEgTamil: "Push/Pop is like boarding a crowded Chennai local train—someone gets pushed in at the back, and someone else pops out at the next station.",
          meaningGeneral: "Adding and removing items from the end of an array.",
          funnyEgGeneral: "Push/Pop is like boarding a crowded subway train—someone gets pushed in at the back, and someone else pops out at the next stop."
    }
},
  {
    id: 25,
    chapter: "Chapter 3: Data Structures",
    tier: "Beginner",
    title: "String Slice/Split Methods",
    sticker: "🔪",
    codeExample: "word = 'JavaScript'\nprint(word.slice(0, 4)) # Java\nprint(word.split('S')) # ['Java', 'cript']",
    gifKeyword: "screaming internally",
    miniQuizQuestion: {
      question: "What does `split()` return?",
      options: ["A number", "A new string", "An array of strings", "A boolean"],
      correctAnswerIndex: 2
    },
    examples: [
      { explanation: "Slice a piece of string.", code: "str = 'Hello World'\nprint(str.slice(0, 5)) # Hello" },
      { explanation: "Split a string by spaces.", code: "sentence = 'I love code'\nwords = sentence.split(' ')\nprint(words) # ['I', 'love', 'code']" },
      { explanation: "Split by every character.", code: "word = 'Cat'\nprint(word.split('')) # ['C', 'a', 't']" }
    ],
      verificationChecks: [
            {
              type: "requires_syntax",
              pattern: "\\.(?:slice|split)\\s*\\(",
              expectedMessage: "Use the .slice() or .split() methods on a string."
            }
          ],
      biteSized: {
                    meaning: "A fundamental concept.",
                    funnyEgTamil: "String slice/split methods are like autocorrecting a text message—you think you're fixing it, but now it's worse",
          meaningGeneral: "Extracting parts of a string or breaking it into a list.",
          funnyEgGeneral: "String slice/split methods are like autocorrecting a text message—you think you're slicing out the bad part, but now it's worse."
    }
},
  {
    id: 101,
    chapter: "Chapter 1: The Absolute Basics",
    tier: "Beginner",
    title: "Workout: Basics Builder",
    sticker: "🏋️",
    codeExample: "# Create a variable 'playerName' and print a greeting.",
    gifKeyword: "why is this happening",
    miniQuizQuestion: {
      question: "Are you ready for the Chapter 1 workout?",
      options: ["Yes", "No", "Maybe", "I want my mommy"],
      correctAnswerIndex: 0
    },
    examples: [
      { explanation: "Step 1: Declare a variable for a player's name.", code: "playerName = 'NoobMaster69'" },
      { explanation: "Step 2: Declare a constant for their starting health.", code: "STARTING_HEALTH = 100" },
      { explanation: "Step 3: Print a welcome message.", code: "print('Welcome ' + playerName + '! Health: ' + STARTING_HEALTH)" }
    ],
      verificationChecks: [
            {
              type: "requires_syntax",
              pattern: "(?:let|const)\\s+",
              expectedMessage: "Start by declaring a variable using or const."
            },
            {
              type: "requires_syntax",
              pattern: "console\\.log",
              expectedMessage: "Don't forget to print the greeting using print."
            }
          ],
      biteSized: {
                    meaning: "A fundamental concept.",
                    funnyEgTamil: "Coding is like climbing the Palani steps—you start with energy, but halfway through you're wondering why you started.",
          meaningGeneral: "The perseverance required to write and debug code.",
          funnyEgGeneral: "Coding is like climbing a mountain—you start with energy, but halfway through you're wondering why you even started."
    }
},
  {
    id: 102,
    chapter: "Chapter 2: Logic & Control Flow",
    tier: "Beginner",
    title: "Workout: Logic & Flow",
    sticker: "🏋️",
    codeExample: "# Write a loop that counts down from 3, then says 'GO!'",
    gifKeyword: "why is this happening",
    miniQuizQuestion: {
      question: "Are you ready for the Chapter 2 workout?",
      options: ["Yes", "No", "Maybe", "I want my mommy"],
      correctAnswerIndex: 0
    },
    examples: [
      { explanation: "Step 1: Setup a loop that counts backwards.", code: "for i in range(3, 0, -1):\n  print(i)" },
      { explanation: "Step 2: Add an if statement inside the loop.", code: "for i in range(3, 0, -1):\n  if i == 1:\n    print('Almost there...')\n  print(i)" },
      { explanation: "Step 3: Print GO! at the end.", code: "print('GO!')" }
    ],
      verificationChecks: [
            {
              type: "requires_syntax",
              pattern: "for\\s+",
              expectedMessage: "Use a for loop to count down."
            },
            {
              type: "requires_syntax",
              pattern: "if\\s+",
              expectedMessage: "Use an if statement inside the loop."
            },
            {
              type: "requires_call_count",
              expectedMessage: "Make sure your loop runs multiple times."
            }
          ],
      biteSized: {
                    meaning: "A fundamental concept.",
                    funnyEgTamil: "Workout logic is like a Surya training montage—lots of sweat, background music, and eventually you get the six-pack (solution).",
          meaningGeneral: "Applying problem-solving logic to code.",
          funnyEgGeneral: "Coding logic is like a sports training montage—lots of sweat, background music, and eventually you get the trophy (solution)."
    }
},
  {
    id: 103,
    chapter: "Chapter 3: Data Structures",
    tier: "Beginner",
    title: "Workout: Data Mastery",
    sticker: "🏋️",
    codeExample: "# Create an inventory array and add items to it using a loop.",
    gifKeyword: "why is this happening",
    miniQuizQuestion: {
      question: "Are you ready for the Chapter 3 workout?",
      options: ["Yes", "No", "Maybe", "I want my mommy"],
      correctAnswerIndex: 0
    },
    examples: [
      { explanation: "Step 1: Create an array of loot.", code: "loot = ['Sword', 'Shield', 'Potion']" },
      { explanation: "Step 2: Loop through the loot and print it.", code: "for (i = 0 i < len(loot) i++) {\n  print('Found: ' + loot[i])\n}" },
      { explanation: "Step 3: Remove the last item and add 'Gold'.", code: "loot.pop()\nloot.append('Gold')\nprint(loot)" }
    ],
      verificationChecks: [
            {
              type: "requires_syntax",
              pattern: "\\[.*\\]",
              expectedMessage: "Create an array for your inventory."
            },
            {
              type: "requires_syntax",
              pattern: "(?:for|while)",
              expectedMessage: "Use a loop to go through your inventory."
            },
            {
              type: "requires_syntax",
              pattern: "\\.append",
              expectedMessage: "Use .append() to add an item to the array."
            }
          ],
      biteSized: {
                    meaning: "A fundamental concept.",
                    funnyEgTamil: "Mastering data is like packing for a trip to native—you try to fit a grinder, 3 sarees, and a TV into one array.",
          meaningGeneral: "Handling complex data structures.",
          funnyEgGeneral: "Mastering data is like packing for a family trip—you try to fit a blender, 3 suitcases, and a TV into one array."
    }
},
  {
    id: 104,
    chapter: "Chapter 4: Functions & Scope",
    tier: "Beginner",
    title: "Workout: Function Architect",
    sticker: "🏋️",
    codeExample: "# Create a function that calculates total damage.",
    gifKeyword: "procrastination mode",
    miniQuizQuestion: {
      question: "Are you ready for the Chapter 4 workout?",
      options: ["Yes", "No", "Maybe", "I want my mommy"],
      correctAnswerIndex: 0
    },
    examples: [
      { explanation: "Step 1: Write a function taking parameters.", code: "def attack(base, bonus):\n  return base + bonus" },
      { explanation: "Step 2: Use an array inside the function.", code: "def totalDamage(hits):\n  total = 0\n  for(i=0 i<len(hits) i++) total += hits[i]\n  return total\n}" },
      { explanation: "Step 3: Call the function and print the result.", code: "myHits = [10, 20, 15]\nprint('Total DMG:', totalDamage(myHits))" }
    ],
      verificationChecks: [
            {
              type: "requires_syntax",
              pattern: "function\\s+",
              expectedMessage: "Define a function to calculate the total."
            },
            {
              type: "requires_syntax",
              pattern: "return\\s+",
              expectedMessage: "Make sure your function returns the total damage."
            }
          ],
      biteSized: {
                    meaning: "A fundamental concept.",
                    funnyEgTamil: "Function architect is like being a director—you call the shots, pass the script (parameters), and hope the actors don't throw an error.",
          meaningGeneral: "Designing and structuring functions.",
          funnyEgGeneral: "Function architect is like being a movie director—you call the shots, pass the script (parameters), and hope the actors don't throw an error."
    }
},
  {
    id: 105,
    chapter: "Chapter 5: The Weird Parts",
    tier: "Beginner",
    title: "Workout: Bug Hunter",
    sticker: "🏋️",
    codeExample: "# Write a safe function that handles missing data.",
    gifKeyword: "screaming internally",
    miniQuizQuestion: {
      question: "Are you ready for the Chapter 5 workout?",
      options: ["Yes", "No", "Maybe", "I want my mommy"],
      correctAnswerIndex: 0
    },
    examples: [
      { explanation: "Step 1: Check for None.", code: "def greetUser(name=None):\n  if not name:\n    return 'Who are you?'\n  return 'Hi ' + name" },
      { explanation: "Step 2: Use falsy checks for safe math.", code: "def safeAdd(a=None, b=None):\n  numA = int(a) if a else 0\n  numB = int(b) if b else 0\n  return numA + numB" },
      { explanation: "Step 3: Test with weird inputs.", code: "print(safeAdd('5', None)) # 5" }
    ],
      verificationChecks: [
            {
              type: "requires_syntax",
              pattern: "function\\s+",
              expectedMessage: "Create a safe function."
            },
            {
              type: "requires_syntax",
              pattern: "(?:if|\\|\\|)",
              expectedMessage: "Check for missing or None data!"
            }
          ],
      biteSized: {
                    meaning: "A fundamental concept.",
                    funnyEgTamil: "Bug hunter is like being a CID—you investigate the missing semicolon while the rest of the code plays dead.",
          meaningGeneral: "Debugging and finding errors in code.",
          funnyEgGeneral: "Bug hunter is like being a detective—you investigate the missing semicolon while the rest of the code plays dead."
    }
},
  {
    id: 106,
    chapter: "Chapter 6: Essential Syntax",
    tier: "Beginner",
    title: "Final Workout: The Ultimate Trial",
    sticker: "🔥",
    codeExample: "# Combine everything to build a mini-game logic.",
    gifKeyword: "screaming internally",
    miniQuizQuestion: {
      question: "Are you ready for the FINAL workout?",
      options: ["Yes", "No", "Maybe", "I want my mommy"],
      correctAnswerIndex: 0
    },
    examples: [
      { explanation: "Step 1: Setup player and enemy objects.", code: "player = { 'hp': 100, 'name': 'Hero' }\nenemy = { 'hp': 50, 'name': 'Slime' }" },
      { explanation: "Step 2: Create a battle function using ternary operators and loops.", code: "def battle(p, e):\n  while p['hp'] > 0 and e['hp'] > 0:\n    e['hp'] -= 20\n    if e['hp'] > 0:\n      p['hp'] -= 10\n  return f\"{p['name']} Wins!\" if p['hp'] > 0 else f\"{e['name']} Wins!\"" },
      { explanation: "Step 3: Execute the game.", code: "print(battle(player, enemy))" }
    ],
      verificationChecks: [
            {
              type: "requires_syntax",
              pattern: "\\{.*\\}",
              expectedMessage: "Create objects for the player and enemy."
            },
            {
              type: "requires_syntax",
              pattern: "(?:for|while)",
              expectedMessage: "Use a loop for the battle sequence."
            },
            {
              type: "requires_syntax",
              pattern: "if\\s+.*\\s+else",
              expectedMessage: "Use a ternary operator to decide the winner."
            }
          ],
      biteSized: {
                    meaning: "A fundamental concept.",
                    funnyEgTamil: "Final workout is the climax fight scene—you vs the compiler, flying cars, exploding objects, and only one will survive.",
          meaningGeneral: "Completing a complex coding challenge.",
          funnyEgGeneral: "Final workout is the climax fight scene—you vs the compiler, flying cars, exploding objects, and only one will survive."
    }
}
]
