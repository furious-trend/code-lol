import { Lesson } from './types';

export const pythonBeginnerLessons: Lesson[] = [
  {
    id: 1,
    chapter: "Chapter 1: The Absolute Basics",
    tier: "Beginner",
    title: "Variables",
    sticker: "📦",
    codeExample: "fridgeLabel = 'Leftover Biryani'\nactualFood = 'Frozen Dal'\nprint('Label says:', fridgeLabel)\nprint('Mom actually put:', actualFood)",
    expectedOutput: "Label says: Leftover Biryani",
    gifKeyword: "screaming internally",
    miniQuizQuestion: {
      question: "What keyword do we use to declare a variable that can change later?",
      options: ["const", "let", "make", "variable"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "Using let for things that change, like Amma's Horlicks dabba.", code: "horlicksDabba = 'Horlicks'\nprint('Outside:', horlicksDabba)\nhorlicksDabba = 'Sambar Thool'\nprint('Inside:', horlicksDabba)" },
      { explanation: "Using const for things that never change, like Appa's TV remote.", code: "APPA_REMOTE = 'News Channel'\nprint('Watching:', APPA_REMOTE)\n# APPA_REMOTE = 'Cartoon Network' # TypeError adi vizhum!" },
      { explanation: "Declaring multiple items for a local tea stall.", code: "item1 = 'Tea', item2 = 'Vada', parcel = 'Bonda'\nprint(item1, item2, parcel)" }
    ],
      verificationChecks: [
            {
              type: "requires_syntax",
              pattern: "(?:let|const|var)\\s+",
              expectedMessage: "Your code runs, but it doesn't actually declare a variable. Use 'let' or 'const'."
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
    codeExample: "status = 'It\\'s Complicated'\nsingles = 1\nisHappy = false\nprint(typeof status, typeof singles, typeof isHappy)",
    gifKeyword: "screaming internally",
    miniQuizQuestion: {
      question: "Which of these is a Boolean?",
      options: ["'true'", "42", "false", "[]"],
      correctAnswerIndex: 2
    },
    examples: [
      { explanation: "Strings for text.", code: "name = 'Batman'\nprint(name)" },
      { explanation: "Numbers for math.", code: "price = 99.99\nprint(price * 2)" },
      { explanation: "Booleans for logic.", code: "isHungry = true\nif (isHungry) print('Eat!')" }
    ],
      verificationChecks: [
            {
              type: "requires_syntax",
              pattern: "typeof\\s+",
              expectedMessage: "Your code runs, but doesn't seem to check any data types. Try using the 'typeof' operator!"
            }
          ],
      biteSized: {
                    meaning: "The specific category of data (Number, Text, True/False) so the computer knows how to handle it.",
                    meaningGeneral: "The specific category of data (Number, Text, True/False) so the computer knows how to handle it.",
                    funnyEgTamil: "Ration shop-la rice, kerosene, and sugar-ah orey dabba-la pottu mix panna koodaadhu la? Adhey dhaan!",
                    funnyEgGeneral: "Like packing for a trip: you wouldn't put your wet swimsuit, laptop, and sandwiches all in the same plastic bag, right?"
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
      options: ["10", "20", "30", "undefined"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "Accessing items by index.", code: "colors = ['Red', 'Green', 'Blue']\nprint(colors[1]) # Green" },
      { explanation: "Updating an item in an array.", code: "scores = [10, 20]\nscores[1] = 99\nprint(scores)" },
      { explanation: "Getting the length of an array.", code: "pets = ['Dog', 'Cat', 'Fish']\nprint(pets.length) # 3" }
    ],
      verificationChecks: [
            {
              type: "requires_syntax",
              pattern: "\\[.*\\]",
              expectedMessage: "Your code runs, but it doesn't look like you created or used an array [] yet."
            }
          ],
      biteSized: {
                    meaning: "An ordered list holding multiple items under a single variable name.",
                    funnyEgTamil: "College canteen bench-la varisaiya ukkandhirukura gang: 0th index-la topper, last index-la sleeper!",
          meaningGeneral: "An ordered list holding multiple items under a single variable name.",
          funnyEgGeneral: "The gang lined up on the college canteen bench: the 0th index has the topper, the last index has the sleeper!"
    }
},
  {
    id: 4,
    chapter: "Chapter 3: Data Structures",
    tier: "Beginner",
    title: "Objects",
    sticker: "🏷️",
    codeExample: "person = {\n  name: 'Shafiq',\n  age: 21,\n  patience: 0\nprint(person.name)",
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
                    meaning: "Data stored as labeled Key-Value pairs describing one single entity.",
                    funnyEgTamil: "College ID card: { name: \"Mano\", dept: \"Mech\", arrears: 5, status: \"Vera Maari\" }.",
          meaningGeneral: "Data stored as labeled Key-Value pairs describing one single entity.",
          funnyEgGeneral: "College ID card: { name: \"Mano\", dept: \"Mechanical\", arrears: 5, status: \"In a league of his own\" }."
    }
},
  {
    id: 5,
    chapter: "Chapter 2: Logic & Control Flow",
    tier: "Beginner",
    title: "For Loops",
    sticker: "🔁",
    codeExample: "for minutes = 1 minutes <= 5 minutes++:\n  print('Scrolling reel #' + minutes)",
    gifKeyword: "screaming internally",
    miniQuizQuestion: {
      question: "What are the three parts of a standard for loop?",
      options: ["start, stop, pause", "initialization, condition, increment", "begin, middle, end", "let, const, var"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "Basic counting loop.", code: "for i = 0 i < 3 i++:\n  print(i)" },
      { explanation: "Looping over an array.", code: "items = ['A', 'B', 'C']\nfor i = 0 i < items.length i++:\n  print(items[i])" },
      { explanation: "Counting backwards.", code: "for i = 3 i > 0 i--:\n  print('Countdown:', i)" }
    ],
      verificationChecks: [
            {
              type: "requires_syntax",
              pattern: "for\\s*\\(",
              expectedMessage: "Your code runs, but it doesn't actually use a 'for' loop yet — give it another shot!"
            },
            {
              type: "requires_call_count",
              expectedMessage: "Your loop didn't seem to iterate multiple times. Make sure your loop condition allows it to run more than once!"
            }
          ],
      biteSized: {
                    meaning: "Code that repeats an exact, pre-determined number of times.",
                    funnyEgTamil: "PET master: \"Ground-ah exact-ah 5 round adichitu vaa da\" nu whistle adikira punishment.",
          meaningGeneral: "Code that repeats an exact, pre-determined number of times.",
          funnyEgGeneral: "The gym teacher blowing his whistle and yelling, \"You! Run exactly 5 laps around the track!\" as a punishment."
    }
},
  {
    id: 6,
    chapter: "Chapter 2: Logic & Control Flow",
    tier: "Beginner",
    title: "While Loops",
    sticker: "☕",
    codeExample: "broke = false\ncups = 0\nwhile !broke and cups < 3:\n  print('One more chai!')\n  cups++",
    gifKeyword: "waiting forever",
    miniQuizQuestion: {
      question: "When does a while loop stop executing?",
      options: ["When it gets tired", "When the condition becomes false", "After 10 iterations", "When the page reloads"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "Basic while loop.", code: "count = 0\nwhile count < 3:\n  print(count)\n  count++" },
      { explanation: "Waiting for a condition.", code: "ready = false\nchecks = 0\nwhile !ready:\n  if (++checks > 2) ready = true\n  print('Checking...')" },
      { explanation: "Do-while (runs at least once).", code: "x = 10\ndo {\n  print('Ran once!') while (x < 5)" }
    ],
      verificationChecks: [
            {
              type: "requires_syntax",
              pattern: "while\\s*\\(",
              expectedMessage: "Your code runs, but it doesn't actually use a 'while' loop yet — give it another shot!"
            },
            {
              type: "requires_call_count",
              expectedMessage: "Your loop didn't seem to iterate multiple times. Check your condition!"
            }
          ],
      biteSized: {
                    meaning: "Code that keeps repeating continuously until a specific condition stops it.",
                    funnyEgTamil: "Amma plate-la saapaadu vechukitte irupaanga, \"Vayiru full aayiduchu\" nu neenga kaiya vechu thadukura varaikkum!",
          meaningGeneral: "Code that keeps repeating continuously until a specific condition stops it.",
          funnyEgGeneral: "Your mom will keep piling food on your plate until you put your hand up and finally say, 'I'm stuffed!'"
    }
},
  {
    id: 7,
    chapter: "Chapter 2: Logic & Control Flow",
    tier: "Beginner",
    title: "Conditionals (if/else)",
    sticker: "🔀",
    codeExample: "isBored = true\nif isBored:\n  print('Opening Insta...') else {\n  print('Writing code!')",
    gifKeyword: "why is this happening",
    miniQuizQuestion: {
      question: "What happens if the condition in an `if` statement is false?",
      options: ["The code crashes", "It runs the `else` block (if it exists)", "It runs the `if` block anyway", "The computer shuts down"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "Basic if statement.", code: "if 5 > 3:\n  print('Math works!')" },
      { explanation: "If / Else.", code: "rain = true\nif (rain) print('Umbrella')\nelse print('Sunglasses')" },
      { explanation: "Else If chain.", code: "score = 85\nif (score > 90) print('A')\nelse if (score > 80) print('B')\nelse print('C')" }
    ],
      verificationChecks: [
            {
              type: "requires_syntax",
              pattern: "if\\s*\\(",
              expectedMessage: "Your code runs, but you didn't use an 'if' statement to make a decision."
            }
          ],
      biteSized: {
                    meaning: "Branching decisions: do one action if a condition is true, otherwise do something else.",
                    funnyEgTamil: "if (bus vandhuchu) college-ku po; else return room-ku poi bedsheet eduthu thoongu!",
          meaningGeneral: "Branching decisions: do one action if a condition is true, otherwise do something else.",
          funnyEgGeneral: "if (the bus arrives) head to class; else just go back to bed and sleep in!"
    }
},
  {
    id: 8,
    chapter: "Chapter 4: Functions & Scope",
    tier: "Beginner",
    title: "Functions",
    sticker: "🤖",
    codeExample: "def orderBiryani(isSpicy) :\n  if (isSpicy) return '🔥 Spicy Biryani'\n  return 'Normal Biryani'\nprint(orderBiryani(true))",
    gifKeyword: "screaming internally",
    miniQuizQuestion: {
      question: "What keyword is used to send a value back out of a function?",
      options: ["give", "send", "return", "output"],
      correctAnswerIndex: 2
    },
    examples: [
      { explanation: "Basic function declaration.", code: "def sayHi() :\n  print('Hi!')\nsayHi()" },
      { explanation: "Function with parameters.", code: "def add(a, b) :\n  return a + b\nprint(add(2, 3))" },
      { explanation: "Function expression (assigned to a variable).", code: "greet = function(name):\n  return 'Hello ' + name\nprint(greet('John'))" }
    ],
      verificationChecks: [
            {
              type: "requires_syntax",
              pattern: "(?:function\\s+|=>)",
              expectedMessage: "Your code runs, but you need to define a function to complete this lesson."
            },
            {
              type: "requires_syntax",
              pattern: "return\\s+",
              expectedMessage: "Make sure your function returns a value using the 'return' keyword."
            }
          ],
      biteSized: {
                    meaning: "A reusable mini-machine that takes inputs, does work, and returns an answer whenever called.",
                    funnyEgTamil: "Hostel kettle: Thanni oothu, Maggi podu, 2 minutes-la saapadu ready. Whenever hungry, just call makeMaggi().",
          meaningGeneral: "A reusable mini-machine that takes inputs, does work, and returns an answer whenever called.",
          funnyEgGeneral: "Dorm kettle: Just add water and a ramen packet, and your meal's ready in 2 minutes. Whenever hunger strikes, just call makeRamen()."
    }
},
  {
    id: 9,
    chapter: "Chapter 6: Essential Syntax",
    tier: "Beginner",
    title: "Operators",
    sticker: "➕",
    codeExample: "score = 95\ncousinScore = '95'\nprint(score == cousinScore) # true (loose)\nprint(score == cousinScore) # false (strict!)",
    gifKeyword: "why is this happening",
    miniQuizQuestion: {
      question: "What is the difference between `==` and `===`?",
      options: ["No difference", "`===` checks value AND type", "`==` is faster", "`===` is only for numbers"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "Arithmetic operators.", code: "print(10 + 5)\nprint(10 - 2)\nprint(10 * 3)\nprint(10 / 2)" },
      { explanation: "Comparison operators.", code: "print(5 > 3) # true\nprint(10 <= 10) # true\nprint(1 != 2) # true" },
      { explanation: "Logical operators (AND / OR).", code: "print(true and false) # false\nprint(true or false) # true" }
    ],
      verificationChecks: [
            {
              type: "requires_syntax",
              pattern: "(?:==|===|!=|!==|>|<|>=|<=)",
              expectedMessage: "Try using a comparison operator like == or === to compare values."
            }
          ],
      biteSized: {
                    meaning: "Symbols that perform calculations or comparisons (+, -, *, &&, ===).",
                    funnyEgTamil: "Canteen master bill potutu extra ₹10 add panra andha calculator keys maari.",
          meaningGeneral: "Symbols that perform calculations or comparisons (+, -, *, &&, ===).",
          funnyEgGeneral: "It's like the calculator keys a shop owner uses to 'accidentally' add an extra few dollars to your bill."
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
      { explanation: "String length.", code: "word = 'JavaScript'\nprint(word.length) # 10" },
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
                    meaning: "Wrapping letters and sentences safely inside quotes (\" \" or ' ').",
                    funnyEgTamil: "Auto pinnadi ezhudhurukura evergreen dialogues: \"Thaai Paasam\", \"Kandupidi En Manadhai\".",
          meaningGeneral: "Wrapping letters and sentences safely inside quotes (\" \" or ' ').",
          funnyEgGeneral: "The classic sayings you see everywhere, from fridge magnets to decorative pillows: 'Live, Laugh, Love', 'Dream Big'."
    }
},
  {
    id: 11,
    chapter: "Chapter 1: The Absolute Basics",
    tier: "Beginner",
    title: "Comments",
    sticker: "🤫",
    codeExample: "# This is a single line comment\nx = 10 ''' This is a \nmulti-line comment '''\nprint(x)",
    gifKeyword: "screaming internally",
    miniQuizQuestion: {
      question: "Which of these is NOT a valid way to write a comment in JavaScript?",
      options: ["// comment", "/* comment */", "<!-- comment -->", "Both A and B are valid"],
      correctAnswerIndex: 2
    },
    examples: [
      { explanation: "Single line comment.", code: "a = 1 # This is one\nprint(a)" },
      { explanation: "Multi line comment.", code: "''' \n  Big block \n  of text \n'''\nb = 2" },
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
                    meaning: "Secret notes inside code for human eyes only; the computer completely ignores them.",
                    funnyEgTamil: "Question paper munnadi teacher paakaama friend-kku bit la ezhudhi pass panra dialogue maari.",
          meaningGeneral: "Secret notes inside code for human eyes only; the computer completely ignores them.",
          funnyEgGeneral: "Like discretely passing a tiny cheat sheet to a friend during an exam, which the teacher completely misses, but helps your friend get through it."
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
      { explanation: "Converting string to number safely.", code: "num = Number('42')\nprint(typeof num) # number" },
      { explanation: "Converting number to string.", code: "str = String(100)\nprint(typeof str) # string" },
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
                    meaning: "Forcing data to switch from one type to another (e.g., text \"5\" into actual number 5).",
                    funnyEgTamil: "Vadivelu comedy: \"Naan collector illa, auto driver\" nu makeup pottu vesham maarura maari!",
          meaningGeneral: "Forcing data to switch from one type to another (e.g., text \"5\" into actual number 5).",
          funnyEgGeneral: "It's like an actor, known for playing sophisticated characters, having to put on a silly costume and declare, 'I'm not a star, I'm just the pizza delivery guy!'"
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
      options: ["print()", "console.print()", "console.log()", "document.write()"],
      correctAnswerIndex: 2
    },
    examples: [
      { explanation: "Basic logging.", code: "print('Just testing!')" },
      { explanation: "Logging errors and warnings.", code: "print('Careful!')\nprint('Too late!')" },
      { explanation: "Logging tables for objects/arrays.", code: "arr = [{id: 1}, {id: 2}]\nprint(arr)" }
    ],
      verificationChecks: [
            {
              type: "requires_syntax",
              pattern: "console\\.(?:log|warn|error|table)",
              expectedMessage: "You need to print something using console.log() or similar."
            }
          ],
      biteSized: {
                    meaning: "Input is data given to the computer; Output is the final result it prints back.",
                    funnyEgTamil: "Sugar cane juice machine-la karumbu thalluradhu Input, glass-la chilled juice vara vekkuradhu Output.",
          meaningGeneral: "Input is data given to the computer; Output is the final result it prints back.",
          funnyEgGeneral: "Putting fruit into a juicer is the Input, and getting fresh juice in a glass is the Output."
    }
},
  {
    id: 14,
    chapter: "Chapter 4: Functions & Scope",
    tier: "Beginner",
    title: "Variable Scope",
    sticker: "🔭",
    codeExample: "globalGossip = 'Everyone knows'\ndef myHouse() :\n  secret = 'Only I know'\n  print(globalGossip)\nmyHouse()",
    gifKeyword: "screaming internally",
    miniQuizQuestion: {
      question: "If a variable is declared inside a function using `let`, can it be accessed outside?",
      options: ["Yes, always", "No, it is locally scoped", "Only if you use `var`", "Only on Tuesdays"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "Global Scope.", code: "x = 10\ndef show() : print(x) }\nshow()" },
      { explanation: "Local/Function Scope.", code: "def local() :\n  y = 5\n# print(y) # Error! y is not defined" },
      { explanation: "Block Scope (let and const).", code: "if true:\n  z = 100\n# print(z) # Error! z is trapped in the block" }
    ],
      verificationChecks: [
            {
              type: "requires_syntax",
              pattern: "let\\s+",
              expectedMessage: "Try declaring a local variable using 'let' inside a function or block."
            }
          ],
      biteSized: {
                    meaning: "Boundary rules defining where a variable exists and where it cannot be accessed.",
                    funnyEgTamil: "Veetukulla amma thitturadhu 'Local Scope' (room kulla mattum kekkum); theruvula loud-speaker 'Global Scope'!",
          meaningGeneral: "Boundary rules defining where a variable exists and where it cannot be accessed.",
          funnyEgGeneral: "Your mom scolding you inside the house is 'Local Scope' (it only reaches the living room); a bullhorn on the street is 'Global Scope'!"
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
      { explanation: "Cannot reassign const primitives.", code: "speedOfLight = 299792458\n# speedOfLight = 0 # TypeError" },
      { explanation: "Objects in const CAN be mutated!", code: "obj = { name: 'A' }\nobj.name = 'B' # Allowed!\nprint(obj)" },
      { explanation: "Arrays in const CAN be mutated!", code: "arr = [1]\narr.append(2) # Allowed!\nprint(arr)" }
    ],
      verificationChecks: [
            {
              type: "requires_syntax",
              pattern: "const\\s+",
              expectedMessage: "Make sure you declare a constant using 'const'."
            }
          ],
      biteSized: {
                    meaning: "const is locked forever; let can be reassigned whenever you want.",
                    funnyEgTamil: "Date of Birth eppovume const (maatha mudiyaadhu); Bank balance eppovume let (innaiku ₹500, naalaiku ₹2)!",
          meaningGeneral: "const is locked forever; let can be reassigned whenever you want.",
          funnyEgGeneral: "Your Date of Birth is always 'const' (you can't change it); your Bank balance is always 'let' (today it's healthy, tomorrow it might be a lot less)!"
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
                    meaning: "Standard arithmetic: addition, subtraction, division, and modulo (% for remainder).",
                    funnyEgTamil: "Bill split-up: Motha canteen bill ₹150; 3 friends divide pannaa aalukku ₹50, meedhi irukaadhu!",
          meaningGeneral: "Standard arithmetic: addition, subtraction, division, and modulo (% for remainder).",
          funnyEgGeneral: "Bill split-up: Total restaurant bill is $150; if 3 friends divide it, each gets $50, with no remainder!"
    }
},
  {
    id: 17,
    chapter: "Chapter 6: Essential Syntax",
    tier: "Beginner",
    title: "Ternary Operator",
    sticker: "❓",
    codeExample: "marks = 85\nresult = (marks > 40) ? 'Pass 🎉' : 'Fail 💀'\nprint(result)",
    gifKeyword: "why is this happening",
    miniQuizQuestion: {
      question: "Which symbol separates the 'true' outcome from the 'false' outcome in a ternary operator?",
      options: ["?", "!", ":", ";"],
      correctAnswerIndex: 2
    },
    examples: [
      { explanation: "Basic ternary.", code: "isRaining = true\naction = isRaining ? 'Stay inside' : 'Go outside'\nprint(action)" },
      { explanation: "Inline rendering (common in React).", code: "loggedIn = false\nprint(loggedIn ? 'Welcome!' : 'Please log in')" },
      { explanation: "Nested ternaries (please don't do this).", code: "score = 90\ngrade = score > 80 ? 'A' : score > 60 ? 'B' : 'C'\nprint(grade)" }
    ],
      verificationChecks: [
            {
              type: "requires_syntax",
              pattern: "\\?.*:",
              expectedMessage: "Your code runs, but you need to use the ternary operator (? :) for this exercise."
            }
          ],
      biteSized: {
                    meaning: "A compact, one-line shortcut for a basic if / else statement.",
                    funnyEgTamil: "attendance >= 75 ? \"Exam Hall\" : \"HOD Room Condonation Fine\".",
          meaningGeneral: "A compact, one-line shortcut for a basic if / else statement.",
          funnyEgGeneral: "attendance >= 75 ? \"You're cleared for the exam!\" : \"Meeting with the academic advisor and a waiver fee.\""
    }
},
  {
    id: 18,
    chapter: "Chapter 6: Essential Syntax",
    tier: "Beginner",
    title: "Template Literals",
    sticker: "📝",
    codeExample: "name = 'Batman'\ncity = 'Gotham'\nprint(`${name} protects ${city}`)",
    gifKeyword: "why is this happening",
    miniQuizQuestion: {
      question: "Which character is used to create a template literal?",
      options: ["' (single quote)", "\" (double quote)", "` (backtick)", "~ (tilde)"],
      correctAnswerIndex: 2
    },
    examples: [
      { explanation: "Basic interpolation.", code: "age = 30\nprint(`I am ${age} years old`)" },
      { explanation: "Math inside interpolation.", code: "print(`2 + 2 is ${2 + 2}`)" },
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
                    meaning: "Using backticks and ${} to cleanly drop variables directly inside sentences.",
                    funnyEgTamil: "Invitation template: \"Dear ${crush_name}, un kooda tea kudikka ready-ah irukken!\"",
          meaningGeneral: "Using backticks and ${} to cleanly drop variables directly inside sentences.",
          funnyEgGeneral: "Invitation template: \"Dear ${crush_name}, I'm ready to grab coffee with you!\""
    }
},
  {
    id: 19,
    chapter: "Chapter 5: The Weird Parts",
    tier: "Beginner",
    title: "Null vs Undefined",
    sticker: "🕳️",
    codeExample: "forgotToAssign\nemptyOnPurpose = null\nprint(forgotToAssign, emptyOnPurpose)",
    gifKeyword: "mind blown",
    miniQuizQuestion: {
      question: "If you declare a variable but don't assign a value, what is its value?",
      options: ["0", "null", "undefined", "false"],
      correctAnswerIndex: 2
    },
    examples: [
      { explanation: "Undefined by default.", code: "x\nprint(x) # undefined" },
      { explanation: "Setting null explicitly.", code: "user = null\nprint(user) # null" },
      { explanation: "They are loose equals but not strict equals.", code: "print(null == undefined) # true\nprint(null == undefined) # false" }
    ],
      verificationChecks: [
            {
              type: "requires_syntax",
              pattern: "(?:null|undefined)",
              expectedMessage: "Try explicitly using 'null' or checking for 'undefined'."
            }
          ],
      biteSized: {
                    meaning: "undefined means you forgot to assign a value; null means you intentionally marked it empty.",
                    funnyEgTamil: "undefined = Pocket-la wallet vekkave marandhutaen; null = Wallet irukku, aana ulla kaasu illa nu unmaiya othukitaen!",
          meaningGeneral: "undefined means you forgot to assign a value; null means you intentionally marked it empty.",
          funnyEgGeneral: "Undefined = I forgot to even put my wallet in my pocket; Null = I have my wallet, but I've truthfully admitted there's no money inside!"
    }
},
  {
    id: 20,
    chapter: "Chapter 5: The Weird Parts",
    tier: "Beginner",
    title: "Truthy/Falsy Values",
    sticker: "🎭",
    codeExample: "if 'false': print('This runs because string is truthy!') }\nif 0: print('This won\\'t run') }",
    gifKeyword: "why is this happening",
    miniQuizQuestion: {
      question: "Which of the following is considered a 'truthy' value?",
      options: ["0", "\"\" (empty string)", "undefined", "\"0\" (string zero)"],
      correctAnswerIndex: 3
    },
    examples: [
      { explanation: "Falsy values.", code: "if !0 and !'':\n  print('Both are falsy')" },
      { explanation: "Truthy values (even empty arrays!).", code: "if [] and {}:\n  print('Objects and arrays are ALWAYS truthy')" },
      { explanation: "Using OR (||) for default values.", code: "name = ''\ndisplayName = name or 'Anonymous'\nprint(displayName)" }
    ],
      verificationChecks: [
            {
              type: "requires_syntax",
              pattern: "if\\s*\\(",
              expectedMessage: "Use an 'if' statement to test if a value is truthy or falsy."
            }
          ],
      biteSized: {
                    meaning: "Sneaky values that act as true or false when dumped inside an if statement.",
                    funnyEgTamil: "\"Naalaikku kaalaila 5 manikku kandippa padikka poren\" nu solradhu Falsy value—pesumbodhu true maari irukkum, aana matter zero!",
          meaningGeneral: "Sneaky values that act as true or false when dumped inside an if statement.",
          funnyEgGeneral: "Saying 'I'll definitely wake up at 5 AM tomorrow to study' is a Falsy value—it sounds true when you say it, but the actual chances are zero!"
    }
},
  {
    id: 21,
    chapter: "Chapter 5: The Weird Parts",
    tier: "Beginner",
    title: "Basic Debugging",
    sticker: "🐛",
    codeExample: "codeWorks = false\n# print('Trying to find the bug...')\nprint('Found it! Typo.')",
    gifKeyword: "screaming internally",
    miniQuizQuestion: {
      question: "What is the most common tool beginners use to debug JavaScript?",
      options: ["A debugger statement", "console.log()", "Try/Catch", "Stack trace analysis"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "Using console.log.", code: "total = 50\nprint('Total is:', total)" },
      { explanation: "Using the debugger keyword.", code: "def test() :\n  breakpoint() # Browser will pause here!\n  return 1\ntest()" },
      { explanation: "Typo example.", code: "myName = 'Alice'\n# print(myname) # ReferenceError!" }
    ],
      verificationChecks: [
            {
              type: "requires_syntax",
              pattern: "(?:console\\.log|debugger)",
              expectedMessage: "Try using console.log() to debug!"
            }
          ],
      biteSized: {
                    meaning: "Finding where the code blew up, understanding error logs, and removing the bug.",
                    funnyEgTamil: "Bike start aagala-na, plug-ah kazhatti oodhi paathu petrol tank-ah thatti paakura detective vela!",
          meaningGeneral: "Finding where the code blew up, understanding error logs, and removing the bug.",
          funnyEgGeneral: "When the TV remote stops working, it's the detective work of taking out the batteries, blowing on them, and hitting the remote against your hand!"
    }
},
  {
    id: 22,
    chapter: "Chapter 2: Logic & Control Flow",
    tier: "Beginner",
    title: "Switch Statements",
    sticker: "🕹️",
    codeExample: "day = 3\nswitch(day):\n  case 1: print('Monday') break\n  case 3: print('Wednesday') break\n  default: print('Other day')",
    gifKeyword: "screaming internally",
    miniQuizQuestion: {
      question: "What keyword is used to stop a `switch` statement from executing the next cases?",
      options: ["stop", "halt", "end", "break"],
      correctAnswerIndex: 3
    },
    examples: [
      { explanation: "Basic Switch.", code: "fruit = 'Apple'\nswitch(fruit):\n  case 'Apple': print('Red') break\n  case 'Banana': print('Yellow') break" },
      { explanation: "Default case (fallback).", code: "color = 'Purple'\nswitch(color):\n  case 'Red': print('Stop') break\n  default: print('Go')" },
      { explanation: "Fall-through (forgetting break).", code: "val = 1\nswitch(val):\n  case 1:\n  case 2: print('1 or 2') break" }
    ],
      verificationChecks: [
            {
              type: "requires_syntax",
              pattern: "switch\\s*\\(",
              expectedMessage: "Your code runs, but it doesn't use a 'switch' statement."
            },
            {
              type: "requires_syntax",
              pattern: "case\\s+",
              expectedMessage: "Make sure you have at least one 'case' in your switch block."
            }
          ],
      biteSized: {
                    meaning: "Cleanly picking one exact match out of a long list of choices.",
                    funnyEgTamil: "Tea shop token system: 1 na Plain Tea, 2 na Samosa, 3 na Boost. Direct order, no confusion!",
          meaningGeneral: "Cleanly picking one exact match out of a long list of choices.",
          funnyEgGeneral: "Imagine a deli counter token system: Token 1 for a black coffee, Token 2 for a muffin, Token 3 for a hot chocolate. You pick your number, you get exactly that item. Direct order, no confusion!"
    }
},
  {
    id: 23,
    chapter: "Chapter 6: Essential Syntax",
    tier: "Beginner",
    title: "Nested Loops",
    sticker: "🪆",
    codeExample: "for i = 1 i <= 2 i++:\n  for j = 1 j <= 2 j++:\n    print(`i=${i}, j=${j}`)\n  }",
    gifKeyword: "going in circles",
    miniQuizQuestion: {
      question: "If an outer loop runs 3 times and an inner loop runs 4 times, how many total times does the inner code run?",
      options: ["7", "12", "34", "Infinite"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "Basic nested loop.", code: "for i=0 i<2 i++:\n  for j=0 j<2 j++:\n    print(i, j)\n  }" },
      { explanation: "Creating a grid.", code: "grid = ''\nfor r=0 r<3 r++:\n  for c=0 c<3 c++:\n    grid += '* '\n  }\n  grid += '\\n'\nprint(grid)" },
      { explanation: "Nested loop over an array of arrays.", code: "matrix = [[1, 2], [3, 4]]\nfor i=0 i<matrix.length i++:\n  for j=0 j<matrix[i].length j++:\n    print(matrix[i][j])\n  }" }
    ],
      verificationChecks: [
            {
              type: "requires_syntax",
              pattern: "(?:for|while).*\\{.*(?:for|while)",
              expectedMessage: "You need a loop inside another loop for this exercise."
            }
          ],
      biteSized: {
                    meaning: "Placing one loop inside another loop so it repeats completely on every single outer step.",
                    funnyEgTamil: "Semester exam week: Monday to Friday outer loop; adhukulla daily 3 hours inner loop torture!",
          meaningGeneral: "Placing one loop inside another loop so it repeats completely on every single outer step.",
          funnyEgGeneral: "Semester exam week: Monday to Friday is the outer loop; the daily 3-hour exam is the inner loop torture!"
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
      options: ["shift()", "remove()", "pop()", "push()"],
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
              expectedMessage: "Try using the .push() or .pop() methods on an array."
            }
          ],
      biteSized: {
                    meaning: "push adds an item to the end; pop kicks the last item out.",
                    funnyEgTamil: "Crowded bus footboard: Pinnediyirundhu yeruradhu push, conductor thitti kadasila erakkividuradhu pop!",
          meaningGeneral: "push adds an item to the end; pop kicks the last item out.",
          funnyEgGeneral: "Crowded train: pushing your way in is 'push', the conductor kicking you out at the last stop is 'pop'!"
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
                    meaning: "slice cuts out a specific portion; split chops text into a list using a divider.",
                    funnyEgTamil: "Biryani packet-la chicken piece-ah mattum thaedi edukradhu slice; parotta-va kothu parotta panna pichi podradhu split.",
          meaningGeneral: "slice copies a portion; split breaks a string into an array.",
          funnyEgGeneral: "slice is like picking only the pepperoni off a pizza; split is like cutting the pizza into individual slices."
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
              expectedMessage: "Start by declaring a variable using let or const."
            },
            {
              type: "requires_syntax",
              pattern: "console\\.log",
              expectedMessage: "Don't forget to print the greeting using console.log."
            }
          ],
      biteSized: {
                    meaning: "Small exercises to verify you know how to store data and print it properly.",
                    funnyEgTamil: "Bike otta kathukura munnadi, main stand poda theriyudhaanu check panra test!",
          meaningGeneral: "Validating conditions before executing a block of code.",
          funnyEgGeneral: "Testing if you know how to put the kickstand down before letting you ride the motorcycle!"
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
      { explanation: "Step 1: Setup a loop that counts backwards.", code: "for i = 3 i > 0 i--:\n  print(i)" },
      { explanation: "Step 2: Add an if statement inside the loop.", code: "for i = 3 i > 0 i--:\n  if i == 1:\n    print('Almost there...')\n  }\n  print(i)" },
      { explanation: "Step 3: Print GO! at the end.", code: "print('GO!')" }
    ],
      verificationChecks: [
            {
              type: "requires_syntax",
              pattern: "for\\s*\\(",
              expectedMessage: "Use a for loop to count down."
            },
            {
              type: "requires_syntax",
              pattern: "if\\s*\\(",
              expectedMessage: "Use an if statement inside the loop."
            },
            {
              type: "requires_call_count",
              expectedMessage: "Make sure your loop runs multiple times."
            }
          ],
      biteSized: {
                    meaning: "Combining loops and conditions to solve puzzles without getting trapped in infinite loops.",
                    funnyEgTamil: "Signal illadha T-Nagar junction-la police kitta maattama bike-ah correct route-la thiruppura trial.",
          meaningGeneral: "Making complex branching decisions using multiple conditions.",
          funnyEgGeneral: "Trying to navigate a 4-way intersection with broken traffic lights without getting pulled over."
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
      { explanation: "Step 2: Loop through the loot and print it.", code: "for i = 0 i < loot.length i++:\n  print('Found: ' + loot[i])" },
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
              pattern: "\\.push",
              expectedMessage: "Use .push to add an item to the array."
            }
          ],
      biteSized: {
                    meaning: "Practice slicing, filtering, and organizing collections of raw data.",
                    funnyEgTamil: "Room cupboard-la kotti kedakura thuni-kulla thevaana formal shirt-ah mattum uruvi eduka kathukura skill!",
          meaningGeneral: "Searching and retrieving specific elements from an array or object.",
          funnyEgGeneral: "The skill of pulling out the exact dress shirt you need from a completely messy closet!"
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
      { explanation: "Step 1: Write a function taking parameters.", code: "def attack(base, bonus) :\n  return base + bonus" },
      { explanation: "Step 2: Use an array inside the function.", code: "def totalDamage(hits) :\n  total = 0\n  for(i=0 i<hits.length i++) total += hits[i]\n  return total" },
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
                    meaning: "Structuring clean, reusable blocks of code that don't depend on outside mess.",
                    funnyEgTamil: "Orey formula vechu class-la irukra 60 perukum observation calculations pottu thara setup!",
          meaningGeneral: "Using a function to perform the same operation on multiple data points.",
          funnyEgGeneral: "Using one formula in Excel to calculate the grades for all 60 students in the class!"
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
      { explanation: "Step 1: Check for undefined.", code: "def greetUser(name) :\n  if (!name) return 'Who are you?'\n  return 'Hi ' + name" },
      { explanation: "Step 2: Use falsy checks for safe math.", code: "def safeAdd(a, b) :\n  numA = Number(a) or 0\n  numB = Number(b) or 0\n  return numA + numB" },
      { explanation: "Step 3: Test with weird inputs.", code: "print(safeAdd('5', null)) # 5" }
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
              expectedMessage: "Check for missing or undefined data!"
            }
          ],
      biteSized: {
                    meaning: "Deliberately reading broken stack traces and fixing errors until the build succeeds.",
                    funnyEgTamil: "Midnight hostel room-la light-ah off pannitu orey oru kosu-va thedi adichi thoongura operation!",
          meaningGeneral: "Debugging a specific issue in a large block of code.",
          funnyEgGeneral: "Turning the lights off in your dorm room and hunting down that one single mosquito so you can sleep!"
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
      { explanation: "Step 1: Setup player and enemy objects.", code: "player = { hp: 100, name: 'Hero' }\nenemy = { hp: 50, name: 'Slime' }" },
      { explanation: "Step 2: Create a battle function using ternary operators and loops.", code: "def battle(p, e) :\n  while p.hp > 0 and e.hp > 0:\n    e.hp -= 20\n    if (e.hp > 0) p.hp -= 10\n  }\n  return p.hp > 0 ? `${p.name} Wins!` : `${e.name} Wins!`" },
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
              pattern: "\\?.*:",
              expectedMessage: "Use a ternary operator to decide the winner."
            }
          ],
      biteSized: {
                    meaning: "The boss level requiring you to combine every tool in the syllabus to build a project.",
                    funnyEgTamil: "Climax action scene-la hero ellathayum thooki potu midhichu single shot-la movie-ah mudikkira Padayappa moment!",
          meaningGeneral: "Using advanced array methods (like map, filter, reduce) to process data in one line.",
          funnyEgGeneral: "The climax action scene where the hero takes out everyone in a single, continuous camera shot!"
    }
}
];
