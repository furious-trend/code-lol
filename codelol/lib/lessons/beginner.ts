import { Lesson } from './types';

export const beginnerLessons: Lesson[] = [
  {
    id: 1,
    chapter: "Chapter 1: The Absolute Basics",
    tier: "Beginner",
    title: "Variables",
    sticker: "📦",
    funnyExplanation: "A variable is like your mom labeling leftovers in the fridge. chicken = 'leftover_biryani' — technically true, practically confusing.",
    codeExample: "let fridgeLabel = 'Leftover Biryani';\nlet actualFood = 'Frozen Dal';\nconsole.log('Label says:', fridgeLabel);\nconsole.log('Mom actually put:', actualFood);",
    gifKeyword: "confused fridge",
    miniQuizQuestion: {
      question: "What keyword do we use to declare a variable that can change later?",
      options: ["const", "let", "make", "variable"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "Using let to declare a changeable variable, simulating a fridge surprise.", code: "let sweetBox = 'Cookies';\nconsole.log('Opening sweet box...');\nsweetBox = 'Sewing Kit';\nconsole.log('Result:', sweetBox);\nconsole.log('Trust issues level increased.');" },
      { explanation: "Using const for things that never change, like Mom's rules.", code: "const TUPPERWARE = 'Moms Favorite Box';\nlet borrower = 'Me';\nconsole.log('I borrowed:', TUPPERWARE);\nborrower = 'My Friend';\nconsole.log('Now who has it?', borrower);\nconsole.log('Mom is going to be mad.');" },
      { explanation: "Declaring multiple items at once to prepare a full meal.", code: "let dinner1 = 'Rice', dinner2 = 'Dal', drink = 'Water';\nconsole.log('Menu tonight:');\nconsole.log(dinner1);\nconsole.log(dinner2);\nconsole.log(drink);" }
    ]
  },
  {
    id: 2,
    chapter: "Chapter 1: The Absolute Basics",
    tier: "Beginner",
    title: "Data Types",
    sticker: "📊",
    funnyExplanation: "Data types are like relationship status on Facebook — String is 'It\\'s Complicated', Number is 'Single', Boolean is 'Yes/No', and Object is 'In a relationship with 47 other people'.",
    codeExample: "let status = 'It\\'s Complicated';\nlet singles = 1;\nlet isHappy = false;\nconsole.log(typeof status, typeof singles, typeof isHappy);",
    gifKeyword: "relationship status",
    miniQuizQuestion: {
      question: "Which of these is a Boolean?",
      options: ["'true'", "42", "false", "[]"],
      correctAnswerIndex: 2
    },
    examples: [
      { explanation: "Strings for text.", code: "let name = 'Batman';\nconsole.log(name);" },
      { explanation: "Numbers for math.", code: "let price = 99.99;\nconsole.log(price * 2);" },
      { explanation: "Booleans for logic.", code: "let isHungry = true;\nif (isHungry) console.log('Eat!');" }
    ]
  },
  {
    id: 3,
    chapter: "Chapter 3: Data Structures",
    tier: "Beginner",
    title: "Arrays",
    sticker: "📚",
    funnyExplanation: "An array is like a WhatsApp family group — everyone's crammed into one list, numbered starting from 0 because programmers hate being normal.",
    codeExample: "let family = ['Uncle', 'Aunty', 'Cousin'];\nconsole.log(family[0]); // Uncle is at index 0",
    gifKeyword: "family group chat",
    miniQuizQuestion: {
      question: "If `arr = [10, 20, 30]`, what is `arr[1]`?",
      options: ["10", "20", "30", "undefined"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "Accessing items by index.", code: "let colors = ['Red', 'Green', 'Blue'];\nconsole.log(colors[1]); // Green" },
      { explanation: "Updating an item in an array.", code: "let scores = [10, 20];\nscores[1] = 99;\nconsole.log(scores);" },
      { explanation: "Getting the length of an array.", code: "let pets = ['Dog', 'Cat', 'Fish'];\nconsole.log(pets.length); // 3" }
    ]
  },
  {
    id: 4,
    chapter: "Chapter 3: Data Structures",
    tier: "Beginner",
    title: "Objects",
    sticker: "🏷️",
    funnyExplanation: "An object is like your Aadhar card — one thing holding a bunch of key-value facts about you: name: 'Shafiq', age: 21, patience_with_bugs: 0.",
    codeExample: "let person = {\n  name: 'Shafiq',\n  age: 21,\n  patience: 0\n};\nconsole.log(person.name);",
    gifKeyword: "id card facepalm",
    miniQuizQuestion: {
      question: "How do you access the 'age' property of the 'person' object?",
      options: ["person[age]", "person.age", "person->age", "person:age"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "Dot notation to access properties.", code: "let car = { make: 'Ford', speed: 100 };\nconsole.log(car.speed);" },
      { explanation: "Bracket notation (useful for dynamic keys).", code: "let user = { 'first name': 'John' };\nconsole.log(user['first name']);" },
      { explanation: "Adding new properties.", code: "let robot = {};\nrobot.power = 'Laser';\nconsole.log(robot);" }
    ]
  },
  {
    id: 5,
    chapter: "Chapter 2: Logic & Control Flow",
    tier: "Beginner",
    title: "For Loops",
    sticker: "🔁",
    funnyExplanation: "A for loop is when you promise yourself you'll scroll reels for 'just 5 more minutes'. You set a start point, an end condition, and increment time until you hate yourself.",
    codeExample: "for (let minutes = 1; minutes <= 5; minutes++) {\n  console.log('Scrolling reel #' + minutes);\n}",
    gifKeyword: "scrolling phone endless",
    miniQuizQuestion: {
      question: "What are the three parts of a standard for loop?",
      options: ["start, stop, pause", "initialization, condition, increment", "begin, middle, end", "let, const, var"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "Basic counting loop.", code: "for (let i = 0; i < 3; i++) {\n  console.log(i);\n}" },
      { explanation: "Looping over an array.", code: "let items = ['A', 'B', 'C'];\nfor (let i = 0; i < items.length; i++) {\n  console.log(items[i]);\n}" },
      { explanation: "Counting backwards.", code: "for (let i = 3; i > 0; i--) {\n  console.log('Countdown:', i);\n}" }
    ]
  },
  {
    id: 6,
    chapter: "Chapter 2: Logic & Control Flow",
    tier: "Beginner",
    title: "While Loops",
    sticker: "☕",
    funnyExplanation: "A while loop is that one friend who says 'last round' at the chai stall... and keeps doing it while they still have cash.",
    codeExample: "let broke = false;\nlet cups = 0;\nwhile (!broke && cups < 3) {\n  console.log('One more chai!');\n  cups++;\n}",
    gifKeyword: "drinking tea repeatedly",
    miniQuizQuestion: {
      question: "When does a while loop stop executing?",
      options: ["When it gets tired", "When the condition becomes false", "After 10 iterations", "When the page reloads"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "Basic while loop.", code: "let count = 0;\nwhile (count < 3) {\n  console.log(count);\n  count++;\n}" },
      { explanation: "Waiting for a condition.", code: "let ready = false;\nlet checks = 0;\nwhile (!ready) {\n  if (++checks > 2) ready = true;\n  console.log('Checking...');\n}" },
      { explanation: "Do-while (runs at least once).", code: "let x = 10;\ndo {\n  console.log('Ran once!');\n} while (x < 5);" }
    ]
  },
  {
    id: 7,
    chapter: "Chapter 2: Logic & Control Flow",
    tier: "Beginner",
    title: "Conditionals (if/else)",
    sticker: "🔀",
    funnyExplanation: "if/else is your brain deciding whether to open Instagram: if (bored) { openApp() } else { openAppAnyway() }.",
    codeExample: "let isBored = true;\nif (isBored) {\n  console.log('Opening Insta...');\n} else {\n  console.log('Writing code!');\n}",
    gifKeyword: "sweating two buttons",
    miniQuizQuestion: {
      question: "What happens if the condition in an `if` statement is false?",
      options: ["The code crashes", "It runs the `else` block (if it exists)", "It runs the `if` block anyway", "The computer shuts down"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "Basic if statement.", code: "if (5 > 3) {\n  console.log('Math works!');\n}" },
      { explanation: "If / Else.", code: "let rain = true;\nif (rain) console.log('Umbrella');\nelse console.log('Sunglasses');" },
      { explanation: "Else If chain.", code: "let score = 85;\nif (score > 90) console.log('A');\nelse if (score > 80) console.log('B');\nelse console.log('C');" }
    ]
  },
  {
    id: 8,
    chapter: "Chapter 4: Functions & Scope",
    tier: "Beginner",
    title: "Functions",
    sticker: "🤖",
    funnyExplanation: "A function is like ordering biryani — you don't need to know how the kitchen works, you just say orderBiryani(spicy=true) and food appears.",
    codeExample: "function orderBiryani(isSpicy) {\n  if (isSpicy) return '🔥 Spicy Biryani';\n  return 'Normal Biryani';\n}\nconsole.log(orderBiryani(true));",
    gifKeyword: "magic chef food",
    miniQuizQuestion: {
      question: "What keyword is used to send a value back out of a function?",
      options: ["give", "send", "return", "output"],
      correctAnswerIndex: 2
    },
    examples: [
      { explanation: "Basic function declaration.", code: "function sayHi() {\n  console.log('Hi!');\n}\nsayHi();" },
      { explanation: "Function with parameters.", code: "function add(a, b) {\n  return a + b;\n}\nconsole.log(add(2, 3));" },
      { explanation: "Function expression (assigned to a variable).", code: "const greet = function(name) {\n  return 'Hello ' + name;\n};\nconsole.log(greet('John'));" }
    ]
  },
  {
    id: 9,
    chapter: "Chapter 6: Essential Syntax",
    tier: "Beginner",
    title: "Operators",
    sticker: "➕",
    funnyExplanation: "Operators are like the strict Indian parents of code. + adds expectations, - subtracts joy, and === checks if your grades perfectly match your cousin's.",
    codeExample: "let score = 95;\nlet cousinScore = '95';\nconsole.log(score == cousinScore); // true (loose)\nconsole.log(score === cousinScore); // false (strict!)",
    gifKeyword: "strict comparison funny",
    miniQuizQuestion: {
      question: "What is the difference between `==` and `===`?",
      options: ["No difference", "`===` checks value AND type", "`==` is faster", "`===` is only for numbers"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "Arithmetic operators.", code: "console.log(10 + 5);\nconsole.log(10 - 2);\nconsole.log(10 * 3);\nconsole.log(10 / 2);" },
      { explanation: "Comparison operators.", code: "console.log(5 > 3); // true\nconsole.log(10 <= 10); // true\nconsole.log(1 !== 2); // true" },
      { explanation: "Logical operators (AND / OR).", code: "console.log(true && false); // false\nconsole.log(true || false); // true" }
    ]
  },
  {
    id: 10,
    chapter: "Chapter 6: Essential Syntax",
    tier: "Beginner",
    title: "String Basics",
    sticker: "🧵",
    funnyExplanation: "Strings are just text wrapped in quotes. Double quotes, single quotes, backticks... JS doesn't care, much like your ex.",
    codeExample: "let msg = 'Hello';\nlet name = \"Shafiq\";\nconsole.log(msg + ' ' + name); // concatenation",
    gifKeyword: "typing fast string",
    miniQuizQuestion: {
      question: "How do you combine two strings together (concatenation)?",
      options: ["With the `+` operator", "With the `&` operator", "With the `concat` keyword", "You can't"],
      correctAnswerIndex: 0
    },
    examples: [
      { explanation: "Single vs Double quotes.", code: "let single = 'Hi';\nlet double = \"Hello\";\nconsole.log(single, double);" },
      { explanation: "String length.", code: "let word = 'JavaScript';\nconsole.log(word.length); // 10" },
      { explanation: "Getting a specific character.", code: "let text = 'Code';\nconsole.log(text[0]); // C" }
    ]
  },
  {
    id: 11,
    chapter: "Chapter 1: The Absolute Basics",
    tier: "Beginner",
    title: "Comments",
    sticker: "🤫",
    funnyExplanation: "Comments are apologies to your future self for writing terrible code at 3 AM. The compiler ignores them, just like people ignore terms & conditions.",
    codeExample: "// This is a single line comment\nlet x = 10; /* This is a \nmulti-line comment */\nconsole.log(x);",
    gifKeyword: "homer backing into bush",
    miniQuizQuestion: {
      question: "Which of these is NOT a valid way to write a comment in JavaScript?",
      options: ["// comment", "/* comment */", "<!-- comment -->", "Both A and B are valid"],
      correctAnswerIndex: 2
    },
    examples: [
      { explanation: "Single line comment.", code: "let a = 1; // This is one\nconsole.log(a);" },
      { explanation: "Multi line comment.", code: "/* \n  Big block \n  of text \n*/\nlet b = 2;" },
      { explanation: "Commenting out code to disable it temporarily.", code: "let c = 3;\n// c = 4;\nconsole.log(c); // still 3" }
    ]
  },
  {
    id: 12,
    chapter: "Chapter 5: The Weird Parts",
    tier: "Beginner",
    title: "Type Conversion",
    sticker: "🔄",
    funnyExplanation: "JS Type Conversion is magic. '5' + 1 is '51', but '5' - 1 is 4. It's like math, but chaotic evil.",
    codeExample: "let a = '5' + 1;\nlet b = '5' - 1;\nconsole.log('a = ' + a + ', b = ' + b);",
    gifKeyword: "confused math lady",
    miniQuizQuestion: {
      question: "What is the output of `'3' + 2` in JavaScript?",
      options: ["5", "32", "NaN", "Error"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "Converting string to number safely.", code: "let num = Number('42');\nconsole.log(typeof num); // number" },
      { explanation: "Converting number to string.", code: "let str = String(100);\nconsole.log(typeof str); // string" },
      { explanation: "Implicit coercion (JS doing weird things automatically).", code: "console.log('5' * 2); // 10 (string becomes number for math)" }
    ]
  },
  {
    id: 13,
    chapter: "Chapter 1: The Absolute Basics",
    tier: "Beginner",
    title: "Input/Output Basics",
    sticker: "🖨️",
    funnyExplanation: "Console.log() is a developer's best friend, therapist, and primary debugging tool. It's basically shouting into the void and hoping for an answer.",
    codeExample: "let secret = 'I love coding';\nconsole.log('The secret is:', secret);",
    gifKeyword: "shouting computer",
    miniQuizQuestion: {
      question: "Which method is used to print messages to the browser console?",
      options: ["print()", "console.print()", "console.log()", "document.write()"],
      correctAnswerIndex: 2
    },
    examples: [
      { explanation: "Basic logging.", code: "console.log('Just testing!');" },
      { explanation: "Logging errors and warnings.", code: "console.warn('Careful!');\nconsole.error('Too late!');" },
      { explanation: "Logging tables for objects/arrays.", code: "let arr = [{id: 1}, {id: 2}];\nconsole.table(arr);" }
    ]
  },
  {
    id: 14,
    chapter: "Chapter 4: Functions & Scope",
    tier: "Beginner",
    title: "Variable Scope",
    sticker: "🔭",
    funnyExplanation: "Scope is like family secrets. What happens in the function (local scope) stays in the function. Global scope is the neighborhood aunty who knows everything.",
    codeExample: "let globalGossip = 'Everyone knows';\nfunction myHouse() {\n  let secret = 'Only I know';\n  console.log(globalGossip);\n}\nmyHouse();",
    gifKeyword: "gossip whispering",
    miniQuizQuestion: {
      question: "If a variable is declared inside a function using `let`, can it be accessed outside?",
      options: ["Yes, always", "No, it is locally scoped", "Only if you use `var`", "Only on Tuesdays"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "Global Scope.", code: "let x = 10;\nfunction show() { console.log(x); }\nshow();" },
      { explanation: "Local/Function Scope.", code: "function local() {\n  let y = 5;\n}\n// console.log(y); // Error! y is not defined" },
      { explanation: "Block Scope (let and const).", code: "if (true) {\n  let z = 100;\n}\n// console.log(z); // Error! z is trapped in the block" }
    ]
  },
  {
    id: 15,
    chapter: "Chapter 4: Functions & Scope",
    tier: "Beginner",
    title: "Constants vs Variables",
    sticker: "🛑",
    funnyExplanation: "`const` is a promise you can't break. Once you assign it, it's locked in forever, like an Indian arranged marriage (mostly).",
    codeExample: "const PI = 3.14159;\n// PI = 3; // This would cause an error!\nconsole.log('PI is', PI);",
    gifKeyword: "locked safe stubborn",
    miniQuizQuestion: {
      question: "What happens if you try to reassign a `const` variable?",
      options: ["It updates successfully", "It shows a warning but works", "It throws a TypeError", "The browser crashes"],
      correctAnswerIndex: 2
    },
    examples: [
      { explanation: "Cannot reassign const primitives.", code: "const speedOfLight = 299792458;\n// speedOfLight = 0; // TypeError" },
      { explanation: "Objects in const CAN be mutated!", code: "const obj = { name: 'A' };\nobj.name = 'B'; // Allowed!\nconsole.log(obj);" },
      { explanation: "Arrays in const CAN be mutated!", code: "const arr = [1];\narr.push(2); // Allowed!\nconsole.log(arr);" }
    ]
  },
  {
    id: 16,
    chapter: "Chapter 6: Essential Syntax",
    tier: "Beginner",
    title: "Basic Math Operations",
    sticker: "🧮",
    funnyExplanation: "Math in JS has a special operator `%` (modulo). It's the remainder. If you have 5 slices of pizza and 2 friends, `%` tells you that you get the 1 leftover slice.",
    codeExample: "let slices = 5;\nlet friends = 2;\nlet leftover = slices % friends;\nconsole.log('Leftover slices:', leftover);",
    gifKeyword: "pizza eating greedy",
    miniQuizQuestion: {
      question: "What does the `%` (modulo) operator do?",
      options: ["Calculates percentages", "Returns the remainder of division", "Multiplies numbers", "Rounds numbers down"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "Addition and Subtraction.", code: "console.log(10 + 5);\nconsole.log(10 - 5);" },
      { explanation: "Multiplication and Division.", code: "console.log(10 * 5);\nconsole.log(10 / 5);" },
      { explanation: "Modulo (Remainder).", code: "console.log(10 % 3); // 1" }
    ]
  },
  {
    id: 17,
    chapter: "Chapter 6: Essential Syntax",
    tier: "Beginner",
    title: "Ternary Operator",
    sticker: "❓",
    funnyExplanation: "The ternary operator is an if/else statement that drank too much espresso. condition ? true_thing : false_thing. Fast, punchy, unreadable to noobs.",
    codeExample: "let marks = 85;\nlet result = (marks > 40) ? 'Pass 🎉' : 'Fail 💀';\nconsole.log(result);",
    gifKeyword: "fast typing hacker",
    miniQuizQuestion: {
      question: "Which symbol separates the 'true' outcome from the 'false' outcome in a ternary operator?",
      options: ["?", "!", ":", ";"],
      correctAnswerIndex: 2
    },
    examples: [
      { explanation: "Basic ternary.", code: "let isRaining = true;\nlet action = isRaining ? 'Stay inside' : 'Go outside';\nconsole.log(action);" },
      { explanation: "Inline rendering (common in React).", code: "let loggedIn = false;\nconsole.log(loggedIn ? 'Welcome!' : 'Please log in');" },
      { explanation: "Nested ternaries (please don't do this).", code: "let score = 90;\nlet grade = score > 80 ? 'A' : score > 60 ? 'B' : 'C';\nconsole.log(grade);" }
    ]
  },
  {
    id: 18,
    chapter: "Chapter 6: Essential Syntax",
    tier: "Beginner",
    title: "Template Literals",
    sticker: "📝",
    funnyExplanation: "Template literals (backticks) let you put variables right inside strings using `${}`. It saves you from writing `+ ' ' +` a million times and crying.",
    codeExample: "let name = 'Batman';\nlet city = 'Gotham';\nconsole.log(`${name} protects ${city}`);",
    gifKeyword: "mind blown explosion",
    miniQuizQuestion: {
      question: "Which character is used to create a template literal?",
      options: ["' (single quote)", "\" (double quote)", "` (backtick)", "~ (tilde)"],
      correctAnswerIndex: 2
    },
    examples: [
      { explanation: "Basic interpolation.", code: "let age = 30;\nconsole.log(`I am ${age} years old`);" },
      { explanation: "Math inside interpolation.", code: "console.log(`2 + 2 is ${2 + 2}`);" },
      { explanation: "Multi-line strings without \\n.", code: "let poem = `Roses are red\nViolets are blue`;\nconsole.log(poem);" }
    ]
  },
  {
    id: 19,
    chapter: "Chapter 5: The Weird Parts",
    tier: "Beginner",
    title: "Null vs Undefined",
    sticker: "🕳️",
    funnyExplanation: "Undefined means the box exists but is empty (you forgot to put something in). Null means you deliberately put an 'empty' sign in the box.",
    codeExample: "let forgotToAssign;\nlet emptyOnPurpose = null;\nconsole.log(forgotToAssign, emptyOnPurpose);",
    gifKeyword: "empty box pointing",
    miniQuizQuestion: {
      question: "If you declare a variable but don't assign a value, what is its value?",
      options: ["0", "null", "undefined", "false"],
      correctAnswerIndex: 2
    },
    examples: [
      { explanation: "Undefined by default.", code: "let x;\nconsole.log(x); // undefined" },
      { explanation: "Setting null explicitly.", code: "let user = null;\nconsole.log(user); // null" },
      { explanation: "They are loose equals but not strict equals.", code: "console.log(null == undefined); // true\nconsole.log(null === undefined); // false" }
    ]
  },
  {
    id: 20,
    chapter: "Chapter 5: The Weird Parts",
    tier: "Beginner",
    title: "Truthy/Falsy Values",
    sticker: "🎭",
    funnyExplanation: "In JS, everything is secretly true or false. 0, '', null, undefined are 'falsy' (imposters). Everything else is 'truthy'. Yes, even the string 'false' is truthy.",
    codeExample: "if ('false') { console.log('This runs because string is truthy!'); }\nif (0) { console.log('This won\\'t run'); }",
    gifKeyword: "imposter sus among us",
    miniQuizQuestion: {
      question: "Which of the following is considered a 'truthy' value?",
      options: ["0", "\"\" (empty string)", "undefined", "\"0\" (string zero)"],
      correctAnswerIndex: 3
    },
    examples: [
      { explanation: "Falsy values.", code: "if (!0 && !'') {\n  console.log('Both are falsy');\n}" },
      { explanation: "Truthy values (even empty arrays!).", code: "if ([] && {}) {\n  console.log('Objects and arrays are ALWAYS truthy');\n}" },
      { explanation: "Using OR (||) for default values.", code: "let name = '';\nlet displayName = name || 'Anonymous';\nconsole.log(displayName);" }
    ]
  },
  {
    id: 21,
    chapter: "Chapter 5: The Weird Parts",
    tier: "Beginner",
    title: "Basic Debugging",
    sticker: "🐛",
    funnyExplanation: "Debugging is being the detective in a crime movie where you are also the murderer. 90% of the time, it's a missing comma.",
    codeExample: "let codeWorks = false;\n// console.log('Trying to find the bug...');\nconsole.log('Found it! Typo.');",
    gifKeyword: "detective magnifying glass",
    miniQuizQuestion: {
      question: "What is the most common tool beginners use to debug JavaScript?",
      options: ["A debugger statement", "console.log()", "Try/Catch", "Stack trace analysis"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "Using console.log.", code: "let total = 50;\nconsole.log('Total is:', total);" },
      { explanation: "Using the debugger keyword.", code: "function test() {\n  debugger; // Browser will pause here!\n  return 1;\n}\ntest();" },
      { explanation: "Typo example.", code: "let myName = 'Alice';\n// console.log(myname); // ReferenceError!" }
    ]
  },
  {
    id: 22,
    chapter: "Chapter 2: Logic & Control Flow",
    tier: "Beginner",
    title: "Switch Statements",
    sticker: "🕹️",
    funnyExplanation: "A switch statement is an if/else chain that went to private school. It's cleaner, uses 'cases', and makes you write 'break' so it doesn't run away.",
    codeExample: "let day = 3;\nswitch(day) {\n  case 1: console.log('Monday'); break;\n  case 3: console.log('Wednesday'); break;\n  default: console.log('Other day');\n}",
    gifKeyword: "switch tracks train",
    miniQuizQuestion: {
      question: "What keyword is used to stop a `switch` statement from executing the next cases?",
      options: ["stop", "halt", "end", "break"],
      correctAnswerIndex: 3
    },
    examples: [
      { explanation: "Basic Switch.", code: "let fruit = 'Apple';\nswitch(fruit) {\n  case 'Apple': console.log('Red'); break;\n  case 'Banana': console.log('Yellow'); break;\n}" },
      { explanation: "Default case (fallback).", code: "let color = 'Purple';\nswitch(color) {\n  case 'Red': console.log('Stop'); break;\n  default: console.log('Go');\n}" },
      { explanation: "Fall-through (forgetting break).", code: "let val = 1;\nswitch(val) {\n  case 1:\n  case 2: console.log('1 or 2'); break;\n}" }
    ]
  },
  {
    id: 23,
    chapter: "Chapter 6: Essential Syntax",
    tier: "Beginner",
    title: "Nested Loops",
    sticker: "🪆",
    funnyExplanation: "A loop inside a loop. It's like Inception, but instead of planting a dream, you're planting a time-complexity nightmare.",
    codeExample: "for (let i = 1; i <= 2; i++) {\n  for (let j = 1; j <= 2; j++) {\n    console.log(`i=${i}, j=${j}`);\n  }\n}",
    gifKeyword: "inception spinning top",
    miniQuizQuestion: {
      question: "If an outer loop runs 3 times and an inner loop runs 4 times, how many total times does the inner code run?",
      options: ["7", "12", "34", "Infinite"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "Basic nested loop.", code: "for (let i=0; i<2; i++) {\n  for (let j=0; j<2; j++) {\n    console.log(i, j);\n  }\n}" },
      { explanation: "Creating a grid.", code: "let grid = '';\nfor (let r=0; r<3; r++) {\n  for (let c=0; c<3; c++) {\n    grid += '* ';\n  }\n  grid += '\\n';\n}\nconsole.log(grid);" },
      { explanation: "Nested loop over an array of arrays.", code: "let matrix = [[1, 2], [3, 4]];\nfor (let i=0; i<matrix.length; i++) {\n  for (let j=0; j<matrix[i].length; j++) {\n    console.log(matrix[i][j]);\n  }\n}" }
    ]
  },
  {
    id: 24,
    chapter: "Chapter 3: Data Structures",
    tier: "Beginner",
    title: "Array Push/Pop Methods",
    sticker: "🛒",
    funnyExplanation: "push() adds to the end of the line (like VIPs at a club). pop() kicks the last person out. Life is unfair.",
    codeExample: "let cart = ['Apples', 'Milk'];\ncart.push('Cookies'); // Add to end\ncart.pop(); // Remove last (Cookies)\nconsole.log(cart);",
    gifKeyword: "kicked out bouncer",
    miniQuizQuestion: {
      question: "Which array method removes the LAST element from an array?",
      options: ["shift()", "remove()", "pop()", "push()"],
      correctAnswerIndex: 2
    },
    examples: [
      { explanation: "Pushing items.", code: "let arr = [];\narr.push(1);\narr.push(2, 3);\nconsole.log(arr); // [1, 2, 3]" },
      { explanation: "Popping items.", code: "let arr = [1, 2, 3];\nlet last = arr.pop();\nconsole.log(last); // 3\nconsole.log(arr); // [1, 2]" },
      { explanation: "Combining both for a Stack (LIFO).", code: "let stack = [];\nstack.push('A');\nstack.push('B');\nconsole.log(stack.pop()); // B" }
    ]
  },
  {
    id: 25,
    chapter: "Chapter 3: Data Structures",
    tier: "Beginner",
    title: "String Slice/Split Methods",
    sticker: "🔪",
    funnyExplanation: "slice() cuts a piece of string out like a cake. split() chops it up into an array like a serial killer.",
    codeExample: "let word = 'JavaScript';\nconsole.log(word.slice(0, 4)); // Java\nconsole.log(word.split('S')); // ['Java', 'cript']",
    gifKeyword: "ninja fruit ninja",
    miniQuizQuestion: {
      question: "What does `split()` return?",
      options: ["A number", "A new string", "An array of strings", "A boolean"],
      correctAnswerIndex: 2
    },
    examples: [
      { explanation: "Slice a piece of string.", code: "let str = 'Hello World';\nconsole.log(str.slice(0, 5)); // Hello" },
      { explanation: "Split a string by spaces.", code: "let sentence = 'I love code';\nlet words = sentence.split(' ');\nconsole.log(words); // ['I', 'love', 'code']" },
      { explanation: "Split by every character.", code: "let word = 'Cat';\nconsole.log(word.split('')); // ['C', 'a', 't']" }
    ]
  },
  {
    id: 101,
    chapter: "Chapter 1: The Absolute Basics",
    tier: "Beginner",
    title: "Workout: Basics Builder",
    sticker: "🏋️",
    funnyExplanation: "Time to sweat! This workout will test if you can actually create variables and print them without crying. You've got this.",
    codeExample: "// Create a variable 'playerName' and print a greeting.",
    gifKeyword: "gym workout",
    miniQuizQuestion: {
      question: "Are you ready for the Chapter 1 workout?",
      options: ["Yes", "No", "Maybe", "I want my mommy"],
      correctAnswerIndex: 0
    },
    examples: [
      { explanation: "Step 1: Declare a variable for a player's name.", code: "let playerName = 'NoobMaster69';" },
      { explanation: "Step 2: Declare a constant for their starting health.", code: "const STARTING_HEALTH = 100;" },
      { explanation: "Step 3: Print a welcome message.", code: "console.log('Welcome ' + playerName + '! Health: ' + STARTING_HEALTH);" }
    ]
  },
  {
    id: 102,
    chapter: "Chapter 2: Logic & Control Flow",
    tier: "Beginner",
    title: "Workout: Logic & Flow",
    sticker: "🏋️",
    funnyExplanation: "We are combining Chapter 1 & 2. Time to make choices and run in circles (loops). Don't get dizzy.",
    codeExample: "// Write a loop that counts down from 3, then says 'GO!'",
    gifKeyword: "running tracks",
    miniQuizQuestion: {
      question: "Are you ready for the Chapter 2 workout?",
      options: ["Yes", "No", "Maybe", "I want my mommy"],
      correctAnswerIndex: 0
    },
    examples: [
      { explanation: "Step 1: Setup a loop that counts backwards.", code: "for (let i = 3; i > 0; i--) {\n  console.log(i);\n}" },
      { explanation: "Step 2: Add an if statement inside the loop.", code: "for (let i = 3; i > 0; i--) {\n  if (i === 1) {\n    console.log('Almost there...');\n  }\n  console.log(i);\n}" },
      { explanation: "Step 3: Print GO! at the end.", code: "console.log('GO!');" }
    ]
  },
  {
    id: 103,
    chapter: "Chapter 3: Data Structures",
    tier: "Beginner",
    title: "Workout: Data Mastery",
    sticker: "🏋️",
    funnyExplanation: "Chapters 1, 2, and 3 combined. Time to juggle arrays and objects like a clown at a circus.",
    codeExample: "// Create an inventory array and add items to it using a loop.",
    gifKeyword: "juggling clown",
    miniQuizQuestion: {
      question: "Are you ready for the Chapter 3 workout?",
      options: ["Yes", "No", "Maybe", "I want my mommy"],
      correctAnswerIndex: 0
    },
    examples: [
      { explanation: "Step 1: Create an array of loot.", code: "let loot = ['Sword', 'Shield', 'Potion'];" },
      { explanation: "Step 2: Loop through the loot and print it.", code: "for (let i = 0; i < loot.length; i++) {\n  console.log('Found: ' + loot[i]);\n}" },
      { explanation: "Step 3: Remove the last item and add 'Gold'.", code: "loot.pop();\nloot.push('Gold');\nconsole.log(loot);" }
    ]
  },
  {
    id: 104,
    chapter: "Chapter 4: Functions & Scope",
    tier: "Beginner",
    title: "Workout: Function Architect",
    sticker: "🏋️",
    funnyExplanation: "Chapters 1 to 4! Package your messy code into beautiful, reusable functions. It's like putting your dirty laundry in a nice basket.",
    codeExample: "// Create a function that calculates total damage.",
    gifKeyword: "architect blueprints",
    miniQuizQuestion: {
      question: "Are you ready for the Chapter 4 workout?",
      options: ["Yes", "No", "Maybe", "I want my mommy"],
      correctAnswerIndex: 0
    },
    examples: [
      { explanation: "Step 1: Write a function taking parameters.", code: "function attack(base, bonus) {\n  return base + bonus;\n}" },
      { explanation: "Step 2: Use an array inside the function.", code: "function totalDamage(hits) {\n  let total = 0;\n  for(let i=0; i<hits.length; i++) total += hits[i];\n  return total;\n}" },
      { explanation: "Step 3: Call the function and print the result.", code: "let myHits = [10, 20, 15];\nconsole.log('Total DMG:', totalDamage(myHits));" }
    ]
  },
  {
    id: 105,
    chapter: "Chapter 5: The Weird Parts",
    tier: "Beginner",
    title: "Workout: Bug Hunter",
    sticker: "🏋️",
    funnyExplanation: "Chapters 1 to 5. Deal with undefined values, falsy checks, and weird JS behaviors safely. Protect your code from reality.",
    codeExample: "// Write a safe function that handles missing data.",
    gifKeyword: "bug catching net",
    miniQuizQuestion: {
      question: "Are you ready for the Chapter 5 workout?",
      options: ["Yes", "No", "Maybe", "I want my mommy"],
      correctAnswerIndex: 0
    },
    examples: [
      { explanation: "Step 1: Check for undefined.", code: "function greetUser(name) {\n  if (!name) return 'Who are you?';\n  return 'Hi ' + name;\n}" },
      { explanation: "Step 2: Use falsy checks for safe math.", code: "function safeAdd(a, b) {\n  let numA = Number(a) || 0;\n  let numB = Number(b) || 0;\n  return numA + numB;\n}" },
      { explanation: "Step 3: Test with weird inputs.", code: "console.log(safeAdd('5', null)); // 5" }
    ]
  },
  {
    id: 106,
    chapter: "Chapter 6: Essential Syntax",
    tier: "Beginner",
    title: "Final Workout: The Ultimate Trial",
    sticker: "🔥",
    funnyExplanation: "This is it. The culmination of everything you've learned. Build a mini RPG battle simulator. Don't let me down.",
    codeExample: "// Combine everything to build a mini-game logic.",
    gifKeyword: "final boss battle",
    miniQuizQuestion: {
      question: "Are you ready for the FINAL workout?",
      options: ["Yes", "No", "Maybe", "I want my mommy"],
      correctAnswerIndex: 0
    },
    examples: [
      { explanation: "Step 1: Setup player and enemy objects.", code: "let player = { hp: 100, name: 'Hero' };\nlet enemy = { hp: 50, name: 'Slime' };" },
      { explanation: "Step 2: Create a battle function using ternary operators and loops.", code: "function battle(p, e) {\n  while(p.hp > 0 && e.hp > 0) {\n    e.hp -= 20;\n    if (e.hp > 0) p.hp -= 10;\n  }\n  return p.hp > 0 ? `${p.name} Wins!` : `${e.name} Wins!`;\n}" },
      { explanation: "Step 3: Execute the game.", code: "console.log(battle(player, enemy));" }
    ]
  }
];
