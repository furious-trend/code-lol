import { QuizTopic } from './types';

export const beginner2Topics: Record<string, QuizTopic> = {
  dataTypes: {
    id: 'dataTypes',
    title: 'Data Types',
    tier: 'Beginner',
    icon: '🏷️',
    color: 'hover:border-blue-400',
    questions: [
      {
        id: 'b2_dt_1',
        question: 'Which of the following is NOT a primitive data type in JavaScript?',
        options: ['String', 'Number', 'Object', 'Boolean'],
        correctIndex: 2,
        explanation: 'Strings, Numbers, and Booleans are primitives. Objects (and Arrays/Functions) are reference types.'
      },
      {
        id: 'b2_dt_2',
        question: 'What is the data type of `true` and `false`?',
        options: ['String', 'Boolean', 'Number', 'Undefined'],
        correctIndex: 1,
        explanation: 'Booleans represent logical entities and can have only two values: true or false.'
      },
      {
        id: 'b2_dt_3',
        question: 'How do you check the data type of a variable `x`?',
        options: ['typeOf x', 'typeof x', 'type x', 'checkType(x)'],
        correctIndex: 1,
        explanation: 'The `typeof` operator returns a string indicating the type of the unevaluated operand. Example: typeof 42 returns "number".'
      },
      {
        id: 'b2_dt_4',
        question: 'What is the data type of `NaN` (Not-a-Number)?',
        options: ['String', 'Undefined', 'Number', 'NaN'],
        correctIndex: 2,
        explanation: 'Ironically, the type of "Not-a-Number" is "number". It represents a numeric error (like trying to divide a string by a number).'
      },
      {
        id: 'b2_dt_5',
        question: 'What is the difference between `undefined` and `null`?',
        options: ['They are exactly the same', '`null` means a variable has not been declared; `undefined` means it was deleted', '`undefined` means a variable has been declared but not assigned a value; `null` is an intentional absence of value', '`null` is a string, `undefined` is a number'],
        correctIndex: 2,
        explanation: 'JS assigns `undefined` automatically. Developers explicitly assign `null` to say "this intentionally has no value right now."'
      },
      {
        id: 'b2_dt_6',
        question: 'What does `typeof null` return in JavaScript?',
        options: ['"null"', '"undefined"', '"object"', '"string"'],
        correctIndex: 2,
        explanation: 'It returns "object". This is a famous, unfixable bug from the earliest days of JavaScript!'
      },
      {
        id: 'b2_dt_7',
        question: 'Which modern JavaScript data type is used to create unique identifiers for object properties?',
        options: ['BigInt', 'Symbol', 'Id', 'Hash'],
        correctIndex: 1,
        explanation: 'Symbols are completely unique and immutable primitives. Even if you create `Symbol("foo") === Symbol("foo")`, it returns false.'
      },
      {
        id: 'b2_dt_8',
        question: 'What is the `BigInt` data type used for?',
        options: ['Storing large strings', 'Storing arrays with millions of elements', 'Representing integers larger than 2^53 - 1 (the safe limit for standard Numbers)', 'A type of database'],
        correctIndex: 2,
        explanation: 'JavaScript\'s standard Number type starts losing precision after 9 quadrillion. `BigInt` (e.g., 9007199254740991n) allows math on arbitrarily large integers.'
      }
    ]
  },
  stringMethods: {
    id: 'stringMethods',
    title: 'String Methods',
    tier: 'Beginner',
    icon: '🔤',
    color: 'hover:border-purple-400',
    questions: [
      {
        id: 'b2_sm_1',
        question: 'How do you find the length of a string stored in variable `text`?',
        options: ['text.size()', 'text.length', 'text.count', 'length(text)'],
        correctIndex: 1,
        explanation: '`.length` is a property, not a method, so you don\'t use parentheses.'
      },
      {
        id: 'b2_sm_2',
        question: 'Which method converts a string to all uppercase letters?',
        options: ['toUpper()', 'toUpperCase()', 'upperCase()', 'capitalize()'],
        correctIndex: 1,
        explanation: '`toUpperCase()` returns a new string converted to uppercase.'
      },
      {
        id: 'b2_sm_3',
        question: 'How do you remove whitespace from both ends of a string?',
        options: ['strip()', 'clean()', 'trim()', 'cut()'],
        correctIndex: 2,
        explanation: '`trim()` is excellent for cleaning up user input from forms (e.g., "   john@email.com   ").'
      },
      {
        id: 'b2_sm_4',
        question: 'What does `text.indexOf("apple")` return if "apple" is NOT found in the string?',
        options: ['false', 'null', '-1', 'undefined'],
        correctIndex: 2,
        explanation: '`indexOf()` returns the starting index position if found, and exactly -1 if the search string is nowhere to be found.'
      },
      {
        id: 'b2_sm_5',
        question: 'Which modern method returns true or false depending on whether a string contains a specified substring?',
        options: ['has()', 'includes()', 'contains()', 'indexOf()'],
        correctIndex: 1,
        explanation: '`includes("apple")` returns a simple boolean, making `if` statements much cleaner than checking `indexOf("apple") !== -1`.'
      },
      {
        id: 'b2_sm_6',
        question: 'If you want to extract a portion of a string, which method is best?',
        options: ['slice()', 'split()', 'cut()', 'splice()'],
        correctIndex: 0,
        explanation: '`slice(startIndex, endIndex)` extracts a section of a string and returns it as a new string.'
      },
      {
        id: 'b2_sm_7',
        question: 'What does `text.split(",")` do?',
        options: ['Deletes all commas from the string', 'Breaks the string into an Array of substrings, using the comma as the separator', 'Splits the string exactly in half', 'Replaces commas with spaces'],
        correctIndex: 1,
        explanation: '`split()` is incredibly useful for converting comma-separated strings (CSV) into arrays that you can loop over.'
      },
      {
        id: 'b2_sm_8',
        question: 'How do you replace the first occurrence of "cat" with "dog" in a string?',
        options: ['text.swap("cat", "dog")', 'text.replace("cat", "dog")', 'text.switch("cat", "dog")', 'text.change("cat", "dog")'],
        correctIndex: 1,
        explanation: '`replace()` swaps the first matched instance. (To replace all instances, use `replaceAll()` or a regex with the global flag `/cat/g`).'
      }
    ]
  },
  operators: {
    id: 'operators',
    title: 'Operators',
    tier: 'Beginner',
    icon: '➕',
    color: 'hover:border-green-400',
    questions: [
      {
        id: 'b2_op_1',
        question: 'Which operator is used to multiply numbers in JavaScript?',
        options: ['x', 'X', '*', '#'],
        correctIndex: 2,
        explanation: 'The asterisk (*) is the multiplication operator.'
      },
      {
        id: 'b2_op_2',
        question: 'What is the Modulus (Remainder) operator?',
        options: ['/', '%', '\\', '&'],
        correctIndex: 1,
        explanation: 'The `%` operator returns the division remainder. E.g., `10 % 3` returns 1.'
      },
      {
        id: 'b2_op_3',
        question: 'What is the difference between `x++` and `++x`?',
        options: ['There is no difference', '`x++` increments by 2, `++x` increments by 1', '`x++` returns the value BEFORE incrementing; `++x` returns the value AFTER incrementing', '`x++` is an error'],
        correctIndex: 2,
        explanation: 'If x is 5: `let y = x++` results in y=5, x=6 (Postfix). `let z = ++x` results in z=7, x=7 (Prefix).'
      },
      {
        id: 'b2_op_4',
        question: 'What does the `+=` operator do (e.g., `x += 5`)?',
        options: ['Checks if x equals 5', 'Adds 5 to x and assigns the new result back to x', 'Sets x to 5', 'Throws a syntax error'],
        correctIndex: 1,
        explanation: 'It is a shorthand assignment operator. `x += 5` is exactly the same as typing `x = x + 5`.'
      },
      {
        id: 'b2_op_5',
        question: 'Which of these is the Logical AND operator?',
        options: ['||', '&&', '%%', '**'],
        correctIndex: 1,
        explanation: '`&&` requires BOTH sides of the condition to evaluate to true.'
      },
      {
        id: 'b2_op_6',
        question: 'What does the Exponentiation operator look like?',
        options: ['^', '^^', '**', 'exp()'],
        correctIndex: 2,
        explanation: '`2 ** 3` means 2 to the power of 3 (2 * 2 * 2), which equals 8.'
      },
      {
        id: 'b2_op_7',
        question: 'In JS, what is the result of `"5" + 2`?',
        options: ['7', '"52"', 'NaN', 'undefined'],
        correctIndex: 1,
        explanation: 'Because of the plus sign, JS sees a String and assumes you want to concatenate (join) them, so it casts the number 2 into the string "2".'
      },
      {
        id: 'b2_op_8',
        question: 'In JS, what is the result of `"5" - 2`?',
        options: ['3', '"52"', '"3"', 'NaN'],
        correctIndex: 0,
        explanation: 'Unlike the plus sign, the minus sign is strictly for math. JS realizes this and casts the string "5" into a number, resulting in the number 3.'
      }
    ]
  },
  typeConversion: {
    id: 'typeConversion',
    title: 'Type Conversion',
    tier: 'Beginner',
    icon: '🔄',
    color: 'hover:border-orange-400',
    questions: [
      {
        id: 'b2_tc_1',
        question: 'How do you explicitly convert the string "42" into a Number?',
        options: ['Number("42")', 'parseInt("42")', 'Both A and B', '"42".toNumber()'],
        correctIndex: 2,
        explanation: '`Number("42")` converts the whole string. `parseInt("42px")` aggressively searches for integers and returns 42 (dropping the letters).'
      },
      {
        id: 'b2_tc_2',
        question: 'How do you convert the number `100` into a String?',
        options: ['100.toString()', 'String(100)', 'Both A and B', '100.stringify()'],
        correctIndex: 2,
        explanation: '`String(100)` and `(100).toString()` both work perfectly to yield "100".'
      },
      {
        id: 'b2_tc_3',
        question: 'What is Type Coercion?',
        options: ['When JavaScript forcefully throws an error if types don\'t match', 'When JavaScript automatically and silently converts one data type to another behind the scenes', 'A tool for styling UI', 'A method to compress data'],
        correctIndex: 1,
        explanation: 'Coercion is implicit. E.g., `if (1) { ... }`. 1 is a number, but JS coerces it to a boolean `true` to evaluate the if-statement.'
      },
      {
        id: 'b2_tc_4',
        question: 'What does the Unary Plus operator do (e.g., `+"42"`)?',
        options: ['Adds 1 to the string', 'Throws an error', 'A short, quick way to convert a string into a number', 'Joins two strings'],
        correctIndex: 2,
        explanation: 'Placing a `+` directly in front of a string variable instantly coerces it into a Number.'
      },
      {
        id: 'b2_tc_5',
        question: 'If you use `parseInt("3.14")`, what is the result?',
        options: ['3.14', '3', 'NaN', '"3.14"'],
        correctIndex: 1,
        explanation: '`parseInt` only looks for integers (whole numbers). It stops reading at the decimal point. If you want 3.14, you must use `parseFloat("3.14")`.'
      },
      {
        id: 'b2_tc_6',
        question: 'What is the result of `Boolean("false")`?',
        options: ['false', 'true', 'undefined', 'NaN'],
        correctIndex: 1,
        explanation: 'Trick question! Any string with at least one character in it is "truthy", even the literal word "false". Only an empty string `""` evaluates to false.'
      },
      {
        id: 'b2_tc_7',
        question: 'What does `String(null)` produce?',
        options: ['"" (Empty String)', '"null"', '0', 'undefined'],
        correctIndex: 1,
        explanation: 'It creates the literal string "null".'
      },
      {
        id: 'b2_tc_8',
        question: 'What happens if you run `Number("hello")`?',
        options: ['0', 'undefined', 'NaN', 'Error'],
        correctIndex: 2,
        explanation: 'Because "hello" contains no mathematical digits, it fails to convert and returns NaN (Not-a-Number).'
      }
    ]
  },
  scope: {
    id: 'scope',
    title: 'Scope',
    tier: 'Beginner',
    icon: '🔭',
    color: 'hover:border-blue-600',
    questions: [
      {
        id: 'b2_sc_1',
        question: 'What does "Scope" refer to in programming?',
        options: ['The size of the codebase', 'The visibility and accessibility of variables in different parts of your code', 'The amount of memory used', 'The speed of the program'],
        correctIndex: 1,
        explanation: 'Scope dictates where you are allowed to read or write to a variable.'
      },
      {
        id: 'b2_sc_2',
        question: 'What is Global Scope?',
        options: ['Variables declared inside a function', 'Variables that are accessible from absolutely anywhere in the JavaScript file/program', 'Variables that are deleted instantly', 'Variables tied to a CSS class'],
        correctIndex: 1,
        explanation: 'If you declare a variable at the very top of your file outside of any function, it is global.'
      },
      {
        id: 'b2_sc_3',
        question: 'What is Local (Function) Scope?',
        options: ['Variables declared inside a function are only accessible inside that specific function', 'Variables that only work on the user\'s local machine', 'Variables imported from another file', 'Variables declared with let'],
        correctIndex: 0,
        explanation: 'If you define `let x = 10` inside `myFunc()`, you cannot `console.log(x)` outside of `myFunc()`. It is locally scoped.'
      },
      {
        id: 'b2_sc_4',
        question: 'What does "Block Scope" mean?',
        options: ['Variables are scoped to the nearest set of curly braces `{}` (like an if-statement or for-loop)', 'Variables are stored in blockchain ledgers', 'Variables are blocked from being changed', 'It is the same as Global scope'],
        correctIndex: 0,
        explanation: 'The `let` and `const` keywords introduced block scope. If you declare them inside an `if(true) { ... }` block, they die as soon as that block ends.'
      },
      {
        id: 'b2_sc_5',
        question: 'Does the older `var` keyword obey Block Scope?',
        options: ['Yes', 'No, `var` only respects Function scope, completely ignoring `if` and `for` block boundaries', 'Only in strict mode', 'Only for strings'],
        correctIndex: 1,
        explanation: 'This is why `var` is rarely used today. A `var` declared inside an `if` block leaks out into the surrounding function, causing unpredictable bugs.'
      },
      {
        id: 'b2_sc_6',
        question: 'What happens if a function tries to access a variable that is NOT defined in its local scope?',
        options: ['It throws a syntax error', 'It returns undefined', 'It looks "up" to the outer scope to see if it exists there (Lexical Scoping)', 'It crashes the browser'],
        correctIndex: 2,
        explanation: 'JavaScript scope works like a one-way mirror. Inner functions can look out and read parent variables, but parent functions cannot look in and read inner variables.'
      },
      {
        id: 'b2_sc_7',
        question: 'What happens if you accidentally declare a variable without `let`, `const`, or `var` (e.g., just `x = 5;`) inside a function?',
        options: ['It fails to compile', 'It creates an invisible variable', 'In non-strict mode, it accidentally creates a Global variable attached to the window object', 'It deletes x'],
        correctIndex: 2,
        explanation: 'This is a horrible silent bug. `x = 5` inside a function will leak out and become `window.x = 5` globally. Always use strict mode and `const`/`let`!'
      },
      {
        id: 'b2_sc_8',
        question: 'Can you have two variables with the exact same name in the same file?',
        options: ['No, never', 'Yes, provided they are in completely separate, independent scopes (like two different functions)', 'Yes, even in the same scope', 'Only if one is a number and one is a string'],
        correctIndex: 1,
        explanation: 'Because variables are isolated to their scope, `function a() { let x=1; }` and `function b() { let x=2; }` can safely co-exist without overwriting each other.'
      }
    ]
  },
  switchStatements: {
    id: 'switchStatements',
    title: 'Switch Statements',
    tier: 'Beginner',
    icon: '🎛️',
    color: 'hover:border-pink-400',
    questions: [
      {
        id: 'b2_sw_1',
        question: 'What is a Switch statement used for?',
        options: ['To toggle dark mode', 'As a cleaner alternative to a long, repetitive chain of `else if` statements checking the exact same variable', 'To loop through arrays', 'To define variables'],
        correctIndex: 1,
        explanation: 'When checking `if (color === "red") else if (color === "blue")`, a Switch statement is much more readable.'
      },
      {
        id: 'b2_sw_2',
        question: 'What keyword defines a specific match condition inside a Switch?',
        options: ['if', 'match', 'case', 'when'],
        correctIndex: 2,
        explanation: 'You write `case "red":` to dictate what happens when the variable equals "red".'
      },
      {
        id: 'b2_sw_3',
        question: 'What happens if you forget to include a `break;` at the end of a `case`?',
        options: ['The program crashes', 'It skips that case entirely', 'It executes that case AND "falls through", executing every case beneath it until it hits a break', 'It throws a SyntaxError'],
        correctIndex: 2,
        explanation: 'Fall-through is a notorious bug. If "red" matches and lacks a break, it will execute the "red" code, AND the "blue" code, AND the "green" code!'
      },
      {
        id: 'b2_sw_4',
        question: 'Which keyword acts like the final `else` in an if-statement, catching any values that didn\'t match any cases?',
        options: ['fallback', 'otherwise', 'default', 'finally'],
        correctIndex: 2,
        explanation: 'The `default:` block executes if none of the explicit cases were a match.'
      },
      {
        id: 'b2_sw_5',
        question: 'Does a Switch statement use strict equality (`===`) or loose equality (`==`) when checking cases?',
        options: ['Loose (`==`)', 'Strict (`===`)', 'You can choose', 'It uses Regex'],
        correctIndex: 1,
        explanation: 'Switch uses strict equality. If you `switch(1)` (a number), and have `case "1":` (a string), it will NOT match.'
      },
      {
        id: 'b2_sw_6',
        question: 'Can you group multiple cases together to execute the same code block?',
        options: ['Yes, by stacking them (e.g., `case "A": case "B": doSomething();`)', 'No, each case must have unique code', 'Only by using commas', 'Only if they are numbers'],
        correctIndex: 0,
        explanation: 'By stacking cases and omitting the break, you leverage "fall-through" intentionally so that "A" and "B" share the exact same logic.'
      },
      {
        id: 'b2_sw_7',
        question: 'Is a `default` case mandatory in a Switch statement?',
        options: ['Yes, the code won\'t run without it', 'No, it is entirely optional', 'Only in strict mode', 'Only if there are more than 3 cases'],
        correctIndex: 1,
        explanation: 'It is optional. If there is no default and no cases match, the Switch statement simply does nothing and moves on.'
      },
      {
        id: 'b2_sw_8',
        question: 'Where should the `default` case be placed?',
        options: ['It must be the first case', 'It must be the last case', 'Anywhere, but convention usually places it at the very end', 'In a separate file'],
        correctIndex: 2,
        explanation: 'You can technically put `default` at the top, but developers universally expect to find it at the bottom.'
      }
    ]
  },
  nestedLoops: {
    id: 'nestedLoops',
    title: 'Nested Loops',
    tier: 'Beginner',
    icon: '🌀',
    color: 'hover:border-cyan-400',
    questions: [
      {
        id: 'b2_nl_1',
        question: 'What is a nested loop?',
        options: ['A loop that runs backwards', 'A loop placed inside the body of another loop', 'A loop that never ends', 'A loop inside a function'],
        correctIndex: 1,
        explanation: 'A nested loop is simply a loop (the inner loop) inside another loop (the outer loop).'
      },
      {
        id: 'b2_nl_2',
        question: 'If an outer loop runs 3 times, and its inner loop runs 4 times, how many times does the inner loop\'s code execute in total?',
        options: ['7 times', '4 times', '3 times', '12 times'],
        correctIndex: 3,
        explanation: 'For EVERY single iteration of the outer loop, the inner loop completes its ENTIRE cycle. 3 * 4 = 12 total executions.'
      },
      {
        id: 'b2_nl_3',
        question: 'What is a common use case for nested loops?',
        options: ['Fetching data from an API', 'Generating a random number', 'Iterating through a 2D Array (a grid or matrix like a chessboard)', 'Sorting a 1D array quickly'],
        correctIndex: 2,
        explanation: 'To navigate a 2D grid, the outer loop iterates through the rows, and the inner loop iterates through the columns of each row.'
      },
      {
        id: 'b2_nl_4',
        question: 'What naming convention is standard for the counter variables in nested loops?',
        options: ['x and y', 'a and b', 'i for outer, j for inner (and k for deeper)', 'loop1 and loop2'],
        correctIndex: 2,
        explanation: 'By convention, `i` (index) is the outer loop, `j` is the inner loop, and `k` is a third level (though 3 levels deep is usually a bad sign!).'
      },
      {
        id: 'b2_nl_5',
        question: 'What happens if you use `break;` inside the INNER loop?',
        options: ['It stops both loops immediately', 'It stops the inner loop, but the outer loop continues to its next iteration', 'It pauses the program', 'It causes an error'],
        correctIndex: 1,
        explanation: 'The `break` statement only terminates the loop it is directly inside. The outer loop will just move to `i++` and run the inner loop all over again.'
      },
      {
        id: 'b2_nl_6',
        question: 'Why are heavily nested loops (3 or 4 deep) generally discouraged?',
        options: ['They are illegal in JS', 'They cause exponential time complexity (O(n^3)), which destroys performance on large datasets', 'They crash the browser instantly', 'They cannot be debugged'],
        correctIndex: 1,
        explanation: 'If you have an array of 1,000 items, a loop inside a loop inside a loop will execute 1,000,000,000 (one billion) times!'
      },
      {
        id: 'b2_nl_7',
        question: 'Can you nest a `while` loop inside a `for` loop?',
        options: ['Yes, you can mix and match any types of loops', 'No, they must be the same type', 'Only if the while loop is the outer one', 'Only in strict mode'],
        correctIndex: 0,
        explanation: 'Loops are just blocks of code. You can put a `while` inside a `for`, or a `do-while` inside a `while`.'
      },
      {
        id: 'b2_nl_8',
        question: 'If you MUST break completely out of BOTH an inner and outer loop simultaneously, what advanced feature can you use?',
        options: ['double_break', 'A Labeled Statement (e.g., `break outerLoop;`)', 'return false', 'throw stop'],
        correctIndex: 1,
        explanation: 'You can label a loop (`outerLoop: for(...)`) and then explicitly target it from inside the inner loop using `break outerLoop;`.'
      }
    ]
  },
  commentsStyle: {
    id: 'commentsStyle',
    title: 'Comments & Code Style',
    tier: 'Beginner',
    icon: '✍️',
    color: 'hover:border-zinc-400',
    questions: [
      {
        id: 'b2_cs_1',
        question: 'How do you write a single-line comment in JavaScript?',
        options: ['<!-- comment -->', '# comment', '// comment', '/* comment */'],
        correctIndex: 2,
        explanation: 'Two forward slashes `//` indicate that everything following them on that specific line should be ignored by the browser.'
      },
      {
        id: 'b2_cs_2',
        question: 'How do you write a multi-line comment in JavaScript?',
        options: ['<!-- comment -->', '/* comment */', '// comment //', '** comment **'],
        correctIndex: 1,
        explanation: '`/*` starts the block comment, and `*/` ends it. This can span as many lines as you need.'
      },
      {
        id: 'b2_cs_3',
        question: 'What is the primary purpose of writing comments in your code?',
        options: ['To make the file load faster', 'To explain WHY a complex piece of code was written a certain way, helping future developers (or yourself)', 'To hide secret passwords', 'To change the UI colors'],
        correctIndex: 1,
        explanation: 'Good code explains WHAT it is doing through clear variable names. Good comments explain WHY it is doing it.'
      },
      {
        id: 'b2_cs_4',
        question: 'What does "commenting out" code mean?',
        options: ['Deleting the code permanently', 'Temporarily placing comment symbols around a block of code so the browser ignores it during debugging', 'Writing a review of the code', 'Moving code to another file'],
        correctIndex: 1,
        explanation: 'If a script is crashing, developers often "comment out" suspicious lines to see if the crash goes away, rather than deleting the code.'
      },
      {
        id: 'b2_cs_5',
        question: 'Which casing convention is the standard for variable and function names in JavaScript?',
        options: ['snake_case', 'PascalCase', 'camelCase', 'kebab-case'],
        correctIndex: 2,
        explanation: '`myVariableName` is camelCase (first word lowercase, subsequent words capitalized). Classes use `PascalCase`.'
      },
      {
        id: 'b2_cs_6',
        question: 'Why is proper indentation (spacing lines inward) crucial in programming?',
        options: ['It is required for the code to compile', 'It visually organizes code blocks (like loops and functions) making it significantly easier for humans to read', 'It saves memory', 'It makes the file smaller'],
        correctIndex: 1,
        explanation: 'Unlike Python, JavaScript doesn\'t mathematically care about indentation. However, unindented JS code is an unreadable nightmare for humans.'
      },
      {
        id: 'b2_cs_7',
        question: 'What is Prettier?',
        options: ['A CSS framework', 'A popular automated code formatter that instantly enforces consistent style, spacing, and quotes across a whole project', 'A JavaScript library for UI', 'A type of comment'],
        correctIndex: 1,
        explanation: 'Prettier ends the "tabs vs spaces" arguments. You press save, and it instantly formats your entire file to look perfect.'
      },
      {
        id: 'b2_cs_8',
        question: 'What does DRY stand for in software development principles?',
        options: ['Do Repeat Yourself', 'Don\'t Repeat Yourself', 'Data Resource Yield', 'Dynamic Route Yaml'],
        correctIndex: 1,
        explanation: 'DRY means if you find yourself copying and pasting the exact same 10 lines of code in multiple places, you should extract it into a reusable function.'
      }
    ]
  },
  truthyFalsy: {
    id: 'truthyFalsy',
    title: 'Truthy/Falsy Values',
    tier: 'Beginner',
    icon: '⚖️',
    color: 'hover:border-purple-500',
    questions: [
      {
        id: 'b2_tf_1',
        question: 'In JavaScript, what does it mean for a value to be "falsy"?',
        options: ['It is a lie', 'It is a value that translates to false when evaluated in a Boolean context (like an if-statement)', 'It is a syntax error', 'It means the variable is deleted'],
        correctIndex: 1,
        explanation: 'JavaScript attempts to convert any variable placed in an `if()` statement into a boolean. If it converts to false, it is a falsy value.'
      },
      {
        id: 'b2_tf_2',
        question: 'Which of the following is a falsy value?',
        options: ['"false" (a string containing the word false)', '0 (the number zero)', '[] (an empty array)', '{} (an empty object)'],
        correctIndex: 1,
        explanation: 'The number 0 is falsy. A string containing the word "false", an empty array, and an empty object are all TRUTHY.'
      },
      {
        id: 'b2_tf_3',
        question: 'How many falsy values exist in standard JavaScript?',
        options: ['Only 2 (false and null)', 'There are exactly 6 standard falsy values', 'Hundreds', 'None'],
        correctIndex: 1,
        explanation: 'The 6 standard falsy values are: false, 0, "" (empty string), null, undefined, and NaN.'
      },
      {
        id: 'b2_tf_4',
        question: 'What will `if ("") { console.log("Hello"); }` do?',
        options: ['Log "Hello"', 'Do nothing', 'Throw an error', 'Log undefined'],
        correctIndex: 1,
        explanation: 'An empty string `""` is falsy. The `if` condition evaluates to false, so the code block is skipped entirely.'
      },
      {
        id: 'b2_tf_5',
        question: 'What is a quick way to force any variable to convert to a strict Boolean?',
        options: ['variable.toBool()', 'Using the double NOT operator (!!variable)', 'variable = true', 'Boolean.cast(variable)'],
        correctIndex: 1,
        explanation: '`!variable` converts it to a boolean and flips it. `!!variable` flips it back, leaving you with a pure `true` or `false` based on its truthiness.'
      },
      {
        id: 'b2_tf_6',
        question: 'Is an empty array `[]` truthy or falsy?',
        options: ['Falsy', 'Truthy', 'Neither', 'It causes an error'],
        correctIndex: 1,
        explanation: 'All Objects and Arrays (even completely empty ones) are truthy in JavaScript!'
      },
      {
        id: 'b2_tf_7',
        question: 'What will `if ("0")` evaluate to?',
        options: ['Falsy (because it contains a zero)', 'Truthy (because it is a non-empty string)', 'NaN', 'undefined'],
        correctIndex: 1,
        explanation: 'The NUMBER `0` is falsy. But `"0"` is a string containing a character, making it truthy. This trips up many beginners!'
      },
      {
        id: 'b2_tf_8',
        question: 'What does the short-circuit OR operator (`a || b`) do if `a` is a TRUTHY value?',
        options: ['It returns true', 'It evaluates and returns `b`', 'It immediately returns `a` without ever looking at `b`', 'It throws an error'],
        correctIndex: 2,
        explanation: 'Because it\'s an OR `||` operator, the moment it sees that `a` is truthy, the whole statement is guaranteed to be true, so it short-circuits and returns `a`.'
      }
    ]
  },
  ternary: {
    id: 'ternary',
    title: 'Ternary Operator',
    tier: 'Beginner',
    icon: '❓',
    color: 'hover:border-pink-500',
    questions: [
      {
        id: 'b2_ter_1',
        question: 'What is the Ternary Operator frequently used as a shorthand for?',
        options: ['A `for` loop', 'An `if...else` statement', 'A `switch` statement', 'A `while` loop'],
        correctIndex: 1,
        explanation: 'It allows you to write a quick if/else check in a single, compact line of code.'
      },
      {
        id: 'b2_ter_2',
        question: 'What does the syntax of a ternary operator look like?',
        options: ['condition ? trueResult : falseResult', 'condition : trueResult ? falseResult', 'condition -> trueResult | falseResult', 'if condition = trueResult else falseResult'],
        correctIndex: 0,
        explanation: 'You state the condition, add a question mark `?`, provide the output if true, add a colon `:`, and provide the output if false.'
      },
      {
        id: 'b2_ter_3',
        question: 'What is a major advantage of the ternary operator over a standard `if` statement?',
        options: ['It runs much faster', 'It can be used inside an expression to directly assign a value to a variable', 'It doesn\'t require boolean logic', 'It allows infinite conditions'],
        correctIndex: 1,
        explanation: 'You can\'t do `const status = if (age > 18) { "Adult" }`. But you CAN do `const status = age > 18 ? "Adult" : "Minor"`. It evaluates and returns a value.'
      },
      {
        id: 'b2_ter_4',
        question: '`const result = 10 > 5 ? "Yes" : "No";` What is the value of result?',
        options: ['"No"', 'true', '"Yes"', 'undefined'],
        correctIndex: 2,
        explanation: '10 is greater than 5 (true), so the ternary operator evaluates to the first option, "Yes".'
      },
      {
        id: 'b2_ter_5',
        question: 'Can you nest a ternary operator inside another ternary operator?',
        options: ['No, it causes a syntax error', 'Yes, but it often makes the code extremely hard to read and should generally be avoided', 'Yes, and it is considered a best practice', 'Only if you use parentheses'],
        correctIndex: 1,
        explanation: 'Nested ternaries `a ? b : c ? d : e` are technically valid, but they are a nightmare to read. An `if/else if` or a `switch` is much better.'
      },
      {
        id: 'b2_ter_6',
        question: 'Why is it called the "Ternary" operator?',
        options: ['Because it was invented by Tim Berners-Lee', 'Because it has three operands (the condition, the true expression, and the false expression)', 'Because it returns three possible values', 'Because it is the third version of the operator'],
        correctIndex: 1,
        explanation: 'Unary operators have 1 operand (`!x`). Binary operators have 2 (`x + y`). Ternary is the only operator in JS that requires 3 operands.'
      },
      {
        id: 'b2_ter_7',
        question: 'Can a ternary operator execute a function?',
        options: ['Yes, e.g., `isValid ? runSuccess() : runError()`', 'No, it can only return strings or numbers', 'Only if the functions return booleans', 'Only in strict mode'],
        correctIndex: 0,
        explanation: 'Yes! It evaluates the true or false expression, meaning it will happily execute any function call you place there.'
      },
      {
        id: 'b2_ter_8',
        question: 'If you ONLY care about the `true` condition and have no `else` fallback, should you use a ternary operator?',
        options: ['Yes, just leave the false side blank', 'No, use the Logical AND (`&&`) operator instead', 'Yes, use `null` for the false side', 'No, ternary requires numbers'],
        correctIndex: 1,
        explanation: 'While `condition ? doThing() : null` works, `condition && doThing()` is much cleaner when there is no "else" logic.'
      }
    ]
  }
};
