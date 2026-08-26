import { QuizTopic } from './types';

export const beginner1Topics: Record<string, QuizTopic> = {
  variables: {
    id: 'variables',
    title: 'Variables',
    tier: 'Beginner',
    icon: '📦',
    color: 'hover:border-purple-500',
    questions: [
      {
        id: 'b1_var_1',
        question: 'What is a variable in programming?',
        options: ['A math equation', 'A named storage for data', 'A type of bug', 'A function that changes'],
        correctIndex: 1,
        explanation: 'A variable is like a labeled box where you store data to use later.'
      },
      {
        id: 'b1_var_2',
        question: 'Which keyword is typically NOT used to declare a variable in modern JavaScript?',
        options: ['let', 'const', 'var', 'dim'],
        correctIndex: 3,
        explanation: '"dim" is used in languages like Visual Basic, not JavaScript. (var is older but still valid, let and const are modern).'
      },
      {
        id: 'b1_var_3',
        question: 'If you want a variable whose value can NEVER change, you should use:',
        options: ['let', 'const', 'static', 'final'],
        correctIndex: 1,
        explanation: '"const" stands for constant, meaning the value cannot be reassigned.'
      },
      {
        id: 'b1_var_4',
        question: 'What happens if you declare a variable with "let" but don\'t assign it a value?',
        options: ['It throws an error', 'It equals 0', 'It equals undefined', 'It equals null'],
        correctIndex: 2,
        explanation: 'In JavaScript, an uninitialized variable automatically gets the value "undefined".'
      },
      {
        id: 'b1_var_5',
        question: 'Which of these is a valid variable name in JavaScript?',
        options: ['1stPlace', 'my-variable', 'myVariable', 'let'],
        correctIndex: 2,
        explanation: 'Variable names cannot start with numbers, cannot contain hyphens, and cannot be reserved keywords like "let". camelCase is standard!'
      },
      {
        id: 'b1_var_6',
        question: 'Why might you choose "let" over "var" when declaring a variable?',
        options: ['"let" is faster', '"var" is for numbers only', '"let" has block scope, preventing accidental overwrites', '"let" makes the variable a constant'],
        correctIndex: 2,
        explanation: '"let" is block-scoped (lives only within its nearest {} braces), whereas "var" is function-scoped. This helps prevent sneaky bugs.'
      },
      {
        id: 'b1_var_7',
        question: 'What is "variable hoisting" in JavaScript?',
        options: ['Moving all variables to another file', 'When variable declarations are conceptually moved to the top of their scope', 'When a variable\'s value is elevated to a larger data type', 'A tool for lifting variables into the cloud'],
        correctIndex: 1,
        explanation: 'Hoisting means JS reads all variable declarations before executing code. With "var", it initializes them as undefined. With "let" and "const", they remain in a "temporal dead zone".'
      },
      {
        id: 'b1_var_8',
        question: 'Consider the code: const x = [1, 2]; x.push(3); What happens?',
        options: ['Error, because x is a constant', 'x becomes [3]', 'x becomes [1, 2, 3]', 'Nothing, arrays cannot be constants'],
        correctIndex: 2,
        explanation: 'Trick question! "const" prevents REASSIGNING the variable itself (e.g. x = [3]), but if the variable holds an object or array, you can still modify its contents (mutate it).'
      }
    ]
  },
  loops: {
    id: 'loops',
    title: 'Loops',
    tier: 'Beginner',
    icon: '🔁',
    color: 'hover:border-pink-500',
    questions: [
      {
        id: 'b1_loop_1',
        question: 'What is the primary purpose of a loop?',
        options: ['To make the code run slower', 'To repeat a block of code multiple times', 'To create a new variable', 'To stop the program'],
        correctIndex: 1,
        explanation: 'Loops execute the same block of code multiple times, saving you from writing it over and over.'
      },
      {
        id: 'b1_loop_2',
        question: 'What happens if a loop never reaches its stopping condition?',
        options: ['It skips the loop entirely', 'It creates an infinite loop', 'The computer automatically fixes it', 'It runs exactly 100 times'],
        correctIndex: 1,
        explanation: 'If the condition is never met, the loop runs forever (an infinite loop), eventually crashing your program or freezing the browser.'
      },
      {
        id: 'b1_loop_3',
        question: 'Which of the following is NOT a common type of loop in JavaScript?',
        options: ['for loop', 'while loop', 'do-while loop', 'when loop'],
        correctIndex: 3,
        explanation: 'There is no standard "when" loop in JavaScript.'
      },
      {
        id: 'b1_loop_4',
        question: 'In a standard JS loop `for(let i = 0; i < 5; i++)`, how many times will it run?',
        options: ['4 times', '5 times', '6 times', 'Infinite times'],
        correctIndex: 1,
        explanation: 'It runs for i=0, 1, 2, 3, and 4. That is exactly 5 times. (It stops when i becomes 5).'
      },
      {
        id: 'b1_loop_5',
        question: 'The `i++` part of a for loop is responsible for:',
        options: ['Starting the loop', 'Checking if the loop should stop', 'Incrementing the counter variable', 'Printing the output'],
        correctIndex: 2,
        explanation: '`i++` is shorthand for `i = i + 1`. It increases the value of i by 1 after each loop iteration.'
      },
      {
        id: 'b1_loop_6',
        question: 'Which keyword immediately stops a loop from running any further?',
        options: ['stop', 'end', 'break', 'return'],
        correctIndex: 2,
        explanation: 'The `break` keyword instantly terminates the current loop and jumps execution to the code directly after the loop.'
      },
      {
        id: 'b1_loop_7',
        question: 'Which keyword skips the rest of the CURRENT iteration and jumps directly to the NEXT iteration of the loop?',
        options: ['skip', 'next', 'continue', 'jump'],
        correctIndex: 2,
        explanation: '`continue` tells the loop "I\'m done with this specific round, ignore the code below and start the next round."'
      },
      {
        id: 'b1_loop_8',
        question: 'What is the main difference between a `while` loop and a `do-while` loop?',
        options: ['do-while is faster', 'do-while guarantees the code block runs AT LEAST once, even if the condition is false', 'while loops can only use numbers', 'There is no difference'],
        correctIndex: 1,
        explanation: 'A `while` loop checks the condition BEFORE running. A `do-while` loop executes the code first, THEN checks the condition.'
      }
    ]
  },
  arrays: {
    id: 'arrays',
    title: 'Arrays',
    tier: 'Beginner',
    icon: '📚',
    color: 'hover:border-blue-500',
    questions: [
      {
        id: 'b1_arr_1',
        question: 'What is an array?',
        options: ['A single variable that can only hold numbers', 'A collection of multiple items stored in a single variable', 'A type of function', 'A loop condition'],
        correctIndex: 1,
        explanation: 'An array allows you to store multiple values (like a list of groceries) within a single variable name.'
      },
      {
        id: 'b1_arr_2',
        question: 'In most programming languages, what is the index of the first element in an array?',
        options: ['1', '0', '-1', 'It depends on the language'],
        correctIndex: 1,
        explanation: 'Most programming languages (like JavaScript, Python, C++) use zero-based indexing, meaning the first element is at index 0.'
      },
      {
        id: 'b1_arr_3',
        question: 'Which method adds a new item to the END of a JavaScript array?',
        options: ['push()', 'pop()', 'add()', 'append()'],
        correctIndex: 0,
        explanation: 'The `push()` method appends one or more elements to the end of an array.'
      },
      {
        id: 'b1_arr_4',
        question: 'What does the `pop()` method do?',
        options: ['Adds an item to the front', 'Removes the last element from the array', 'Removes the first element', 'Sorts the array randomly'],
        correctIndex: 1,
        explanation: 'The `pop()` method removes the last element from an array and returns that element.'
      },
      {
        id: 'b1_arr_5',
        question: 'How do you access the third element in an array named `fruits`?',
        options: ['fruits[3]', 'fruits(3)', 'fruits[2]', 'fruits.get(3)'],
        correctIndex: 2,
        explanation: 'Since arrays are zero-indexed, the first element is [0], second is [1], and third is [2].'
      },
      {
        id: 'b1_arr_6',
        question: 'Which method removes the FIRST element of an array?',
        options: ['shift()', 'unshift()', 'pop()', 'delete()'],
        correctIndex: 0,
        explanation: '`shift()` removes the first element (shifting all other elements down). `unshift()` adds to the front.'
      },
      {
        id: 'b1_arr_7',
        question: 'How do you find out how many items are in an array called `myArray`?',
        options: ['myArray.size()', 'myArray.count', 'myArray.length', 'myArray.total()'],
        correctIndex: 2,
        explanation: 'The `.length` property returns the total number of elements in the array.'
      },
      {
        id: 'b1_arr_8',
        question: 'Can a JavaScript array hold mixed data types (e.g., strings, numbers, AND booleans at the same time)?',
        options: ['No, arrays must be strictly typed', 'Yes, JS arrays can hold any mix of data types', 'Only if you use TypeScript', 'Yes, but only strings and numbers'],
        correctIndex: 1,
        explanation: 'JavaScript is dynamically typed, meaning a single array can happily hold `[1, "apple", true, { name: "Bob" }]`.'
      }
    ]
  },
  functions: {
    id: 'functions',
    title: 'Functions',
    tier: 'Beginner',
    icon: '⚙️',
    color: 'hover:border-green-500',
    questions: [
      {
        id: 'b1_func_1',
        question: 'What is a function?',
        options: ['A reusable block of code designed to perform a particular task', 'A data type for strings', 'A type of loop', 'A mathematical equation'],
        correctIndex: 0,
        explanation: 'Functions allow you to group code into reusable blocks that can be executed whenever needed.'
      },
      {
        id: 'b1_func_2',
        question: 'What do we call the values passed INTO a function when it is called?',
        options: ['Variables', 'Arguments', 'Returns', 'Parameters'],
        correctIndex: 1,
        explanation: 'Arguments are the actual values passed to the function when called. Parameters are the variable names defined in the function signature.'
      },
      {
        id: 'b1_func_3',
        question: 'Which keyword is used to send a value back from a function?',
        options: ['output', 'return', 'give', 'send'],
        correctIndex: 1,
        explanation: 'The `return` statement ends function execution and specifies a value to be returned to the function caller.'
      },
      {
        id: 'b1_func_4',
        question: 'In modern JavaScript, what is the syntax for an arrow function?',
        options: ['function() => {}', '() => {}', '=> function()', '() -> {}'],
        correctIndex: 1,
        explanation: 'Arrow functions provide a shorter syntax for writing function expressions, using the `=>` (fat arrow) token.'
      },
      {
        id: 'b1_func_5',
        question: 'What happens if a standard JS function does not have a return statement?',
        options: ['It crashes', 'It returns 0', 'It implicitly returns undefined', 'It causes an infinite loop'],
        correctIndex: 2,
        explanation: 'If no return statement is used, or if the return statement is completely empty, the function automatically returns `undefined`.'
      },
      {
        id: 'b1_func_6',
        question: 'What is the difference between declaring a function and calling a function?',
        options: ['There is no difference', 'Declaring it executes it; calling it defines its structure', 'Declaring it creates it in memory; calling it actually executes the code', 'Calling it deletes it'],
        correctIndex: 2,
        explanation: 'Writing `function greet() { ... }` just defines it. It won\'t do anything until you actively execute it by writing `greet()`.'
      },
      {
        id: 'b1_func_7',
        question: 'Can you assign a function to a variable in JavaScript?',
        options: ['No, that causes a syntax error', 'Yes, this is called a Function Expression', 'Only if the function is empty', 'Only inside a class'],
        correctIndex: 1,
        explanation: 'Yes! `const myFunc = function() { ... }`. In JS, functions are "first-class citizens", meaning they can be treated just like any other data type.'
      },
      {
        id: 'b1_func_8',
        question: 'What happens to variables declared INSIDE a function once the function finishes running?',
        options: ['They become global variables', 'They are permanently saved to the hard drive', 'They are destroyed and removed from memory (unless trapped in a closure)', 'They are passed to the next function'],
        correctIndex: 2,
        explanation: 'Local variables only exist within the function\'s scope. Once the function ends, those variables are garbage collected.'
      }
    ]
  },
  conditionals: {
    id: 'conditionals',
    title: 'Conditionals',
    tier: 'Beginner',
    icon: '🔀',
    color: 'hover:border-yellow-500',
    questions: [
      {
        id: 'b1_cond_1',
        question: 'Which statement is used to execute code only if a specific condition is true?',
        options: ['for', 'when', 'if', 'loop'],
        correctIndex: 2,
        explanation: 'The `if` statement evaluates a condition and executes its code block only if the condition is true.'
      },
      {
        id: 'b1_cond_2',
        question: 'What is the purpose of the `else` statement?',
        options: ['To provide a fallback block of code if the `if` condition is false', 'To loop through code', 'To define a variable', 'To stop the program'],
        correctIndex: 0,
        explanation: 'An `else` block executes when the preceding `if` (or `else if`) condition evaluates to false.'
      },
      {
        id: 'b1_cond_3',
        question: 'Which operator is used to check if two values are equal in BOTH value and type (strict equality)?',
        options: ['=', '==', '===', '!='],
        correctIndex: 2,
        explanation: 'The strict equality operator `===` checks whether two operands are identical. `==` converts types first (so "5" == 5 is true, but "5" === 5 is false).'
      },
      {
        id: 'b1_cond_4',
        question: 'What does the `||` operator represent?',
        options: ['Logical AND', 'Logical OR', 'Logical NOT', 'Logical XOR'],
        correctIndex: 1,
        explanation: 'The logical OR `||` operator returns true if at least ONE of its operands is true. `&&` is logical AND.'
      },
      {
        id: 'b1_cond_5',
        question: 'In a switch statement, what keyword is used to stop the code from automatically executing the next case?',
        options: ['stop', 'end', 'break', 'return'],
        correctIndex: 2,
        explanation: 'The `break` keyword breaks out of a switch block. Without it, execution "falls through" to the next case, even if it doesn\'t match!'
      },
      {
        id: 'b1_cond_6',
        question: 'What does the `!` operator do?',
        options: ['Deletes a variable', 'Multiplies by -1', 'Inverts a boolean (Logical NOT)', 'Throws an error'],
        correctIndex: 2,
        explanation: 'The exclamation mark is the Logical NOT operator. It flips true to false, and false to true.'
      },
      {
        id: 'b1_cond_7',
        question: 'If you chain multiple `else if` statements, how many of their code blocks will execute if ALL their conditions are true?',
        options: ['All of them', 'Only the first one that evaluates to true', 'The last one', 'None of them'],
        correctIndex: 1,
        explanation: 'An if/else chain stops executing the moment it finds a true condition. It skips all subsequent `else if` or `else` blocks.'
      },
      {
        id: 'b1_cond_8',
        question: 'What is the assignment operator?',
        options: ['===', '==', '=', '=>'],
        correctIndex: 2,
        explanation: 'A single equals sign `=` assigns a value to a variable. It does NOT check for equality, which is a very common beginner mistake in `if` statements!'
      }
    ]
  },
  objects: {
    id: 'objects',
    title: 'Objects',
    tier: 'Beginner',
    icon: '🏗️',
    color: 'hover:border-orange-500',
    questions: [
      {
        id: 'b1_obj_1',
        question: 'What is an object in JavaScript?',
        options: ['A primitive data type', 'A collection of key-value pairs', 'A mathematical function', 'A loop condition'],
        correctIndex: 1,
        explanation: 'An object is a standalone entity, with properties and types. It is a collection of key-value pairs.'
      },
      {
        id: 'b1_obj_2',
        question: 'How do you access the `name` property of an object named `person`?',
        options: ['person(name)', 'person[name]', 'person.name', 'Both person.name and person["name"]'],
        correctIndex: 3,
        explanation: 'You can use dot notation (person.name) or bracket notation (person["name"]) to access object properties.'
      },
      {
        id: 'b1_obj_3',
        question: 'Which keyword is traditionally used to create a new instance of an object from a constructor function?',
        options: ['create', 'new', 'instance', 'make'],
        correctIndex: 1,
        explanation: 'The `new` operator lets developers create an instance of a user-defined object type or built-in object types.'
      },
      {
        id: 'b1_obj_4',
        question: 'What is a method in an object?',
        options: ['A property containing a function definition', 'A mathematical calculation', 'A way to delete the object', 'A type of loop'],
        correctIndex: 0,
        explanation: 'When a function is assigned as a property of an object, it is called a method (e.g., console.log()).'
      },
      {
        id: 'b1_obj_5',
        question: 'Which built-in JS object provides mathematical functions and constants?',
        options: ['Calc', 'Numbers', 'Math', 'Compute'],
        correctIndex: 2,
        explanation: 'The `Math` object allows you to perform mathematical tasks on numbers, like `Math.random()` or `Math.PI`.'
      },
      {
        id: 'b1_obj_6',
        question: 'How do you remove a property from an object completely?',
        options: ['Set it to null', 'Use the `delete` operator (e.g., delete obj.key)', 'Use `remove obj.key`', 'Set it to undefined'],
        correctIndex: 1,
        explanation: 'Setting it to null keeps the key in the object. The `delete` operator completely removes the key and its value from the object.'
      },
      {
        id: 'b1_obj_7',
        question: 'How can you get an array of all the keys in an object?',
        options: ['Object.keys(obj)', 'obj.getKeys()', 'Array.from(obj)', 'obj.properties()'],
        correctIndex: 0,
        explanation: '`Object.keys(myObject)` returns an array of strings representing all the enumerable property names on the object.'
      },
      {
        id: 'b1_obj_8',
        question: 'What is the purpose of Object.freeze()?',
        options: ['It lowers the CPU usage of the object', 'It prevents new properties from being added and existing properties from being removed or changed', 'It converts the object to a string', 'It encrypts the object'],
        correctIndex: 1,
        explanation: '`Object.freeze()` makes an object completely immutable. You cannot add, change, or delete its properties.'
      }
    ]
  },
  dom: {
    id: 'dom',
    title: 'DOM',
    tier: 'Beginner',
    icon: '🌐',
    color: 'hover:border-teal-500',
    questions: [
      {
        id: 'b1_dom_1',
        question: 'What does DOM stand for?',
        options: ['Document Object Model', 'Data Output Mechanism', 'Digital Object Memory', 'Document Orientation Module'],
        correctIndex: 0,
        explanation: 'DOM stands for Document Object Model, an API representing the HTML page so programs can change the document structure, style, and content.'
      },
      {
        id: 'b1_dom_2',
        question: 'Which method selects a single HTML element by its ID attribute?',
        options: ['querySelector()', 'getElementById()', 'selectId()', 'getElement()'],
        correctIndex: 1,
        explanation: '`document.getElementById("my-id")` returns the exact element that matches the specified ID.'
      },
      {
        id: 'b1_dom_3',
        question: 'How can you change the text content of an HTML element?',
        options: ['element.text', 'element.innerHTML', 'element.textContent', 'Both innerHTML and textContent'],
        correctIndex: 3,
        explanation: 'Both `innerHTML` and `textContent` can change text. However, `innerHTML` parses HTML tags (like <b>), while `textContent` safely treats everything as raw text.'
      },
      {
        id: 'b1_dom_4',
        question: 'Which method is used to create a brand new HTML element in JavaScript?',
        options: ['document.makeElement()', 'document.createElement()', 'document.addNode()', 'document.newElement()'],
        correctIndex: 1,
        explanation: '`document.createElement("div")` creates the HTML element in memory. You then have to attach it to the page.'
      },
      {
        id: 'b1_dom_5',
        question: 'How do you attach a new child element to an existing DOM node?',
        options: ['node.insert()', 'node.addChild()', 'node.appendChild()', 'node.push()'],
        correctIndex: 2,
        explanation: 'The `appendChild()` method inserts a node at the very end of the parent node\'s list of children.'
      },
      {
        id: 'b1_dom_6',
        question: 'What is the difference between `querySelector` and `querySelectorAll`?',
        options: ['querySelector only works on classes', 'querySelectorAll returns all matching elements, querySelector returns only the first match', 'querySelectorAll is faster', 'There is no difference'],
        correctIndex: 1,
        explanation: '`querySelector` grabs the first element that matches the CSS selector. `querySelectorAll` grabs a NodeList of ALL matching elements.'
      },
      {
        id: 'b1_dom_7',
        question: 'How can you apply a new CSS class to a DOM element via JavaScript?',
        options: ['element.css = "active"', 'element.classList.add("active")', 'element.style = "active"', 'element.addClass("active")'],
        correctIndex: 1,
        explanation: 'The `classList` API provides methods like `add()`, `remove()`, and `toggle()` to easily manage CSS classes without overwriting existing ones.'
      },
      {
        id: 'b1_dom_8',
        question: 'When manipulating the DOM heavily, what is a major performance concern?',
        options: ['Variables running out of scope', 'Browser "reflows" or "repaints", where the browser is forced to expensively recalculate layouts and draw pixels', 'The DOM API crashing', 'Variables converting to strings'],
        correctIndex: 1,
        explanation: 'Every time you append an element or change a layout style, the browser often has to recalculate the entire page geometry (reflow), which is very slow if done in a loop.'
      }
    ]
  },
  promises: {
    id: 'promises',
    title: 'Promises',
    tier: 'Beginner',
    icon: '🤝',
    color: 'hover:border-indigo-500',
    questions: [
      {
        id: 'b1_prom_1',
        question: 'What is a Promise in JavaScript?',
        options: ['A guarantee that code will not crash', 'An object representing the eventual completion or failure of an asynchronous operation', 'A loop that runs indefinitely', 'A strict data type'],
        correctIndex: 1,
        explanation: 'A Promise is a proxy for a value not necessarily known when the promise is created.'
      },
      {
        id: 'b1_prom_2',
        question: 'What are the three possible states of a Promise?',
        options: ['Started, Running, Stopped', 'Pending, Fulfilled, Rejected', 'Waiting, Resolved, Failed', 'Open, Closed, Error'],
        correctIndex: 1,
        explanation: 'A Promise starts as `pending`. It eventually transitions to either `fulfilled` (success) or `rejected` (failure).'
      },
      {
        id: 'b1_prom_3',
        question: 'What method is used on a Promise to execute a callback when the Promise is FULFILLED?',
        options: ['.catch()', '.finally()', '.then()', '.done()'],
        correctIndex: 2,
        explanation: 'The `.then()` method executes when the async task completes successfully, receiving the resolved data.'
      },
      {
        id: 'b1_prom_4',
        question: 'What method is used to handle errors or a REJECTED Promise?',
        options: ['.then()', '.fail()', '.catch()', '.error()'],
        correctIndex: 2,
        explanation: 'The `.catch()` method catches any errors thrown inside the Promise or any preceding `.then()` blocks.'
      },
      {
        id: 'b1_prom_5',
        question: 'How do you create a brand new custom Promise?',
        options: ['new Promise((resolve, reject) => { ... })', 'create Promise()', 'Promise.make()', 'Promise.new()'],
        correctIndex: 0,
        explanation: 'You instantiate a Promise by passing it an executor function that provides the `resolve` and `reject` functions as arguments.'
      },
      {
        id: 'b1_prom_6',
        question: 'What does `Promise.all([promise1, promise2])` do?',
        options: ['Executes them sequentially', 'Fails immediately', 'Waits for ALL provided promises to fulfill, returning an array of their results', 'Races them to see which finishes first'],
        correctIndex: 2,
        explanation: '`Promise.all` fires them concurrently. If even ONE of them rejects, the entire `Promise.all` rejects immediately.'
      },
      {
        id: 'b1_prom_7',
        question: 'What happens in a `.then()` chain if you return a normal value (like the number 5)?',
        options: ['The chain breaks', 'The next `.then()` receives 5 wrapped in a new resolved Promise', 'It throws an error', 'The value is logged to the console'],
        correctIndex: 1,
        explanation: '`.then()` always returns a new Promise. If you return a primitive value, JS automatically wraps it in a resolved Promise for the next `.then()` to catch.'
      },
      {
        id: 'b1_prom_8',
        question: 'Which method executes logic regardless of whether the promise was fulfilled or rejected?',
        options: ['.all()', '.done()', '.finally()', '.always()'],
        correctIndex: 2,
        explanation: '`.finally()` is perfect for cleaning up UI state, like hiding a loading spinner whether the API request succeeded or failed.'
      }
    ]
  },
  events: {
    id: 'events',
    title: 'Events',
    tier: 'Beginner',
    icon: '⚡',
    color: 'hover:border-red-500',
    questions: [
      {
        id: 'b1_evt_1',
        question: 'What method is used to attach an event handler to an HTML element?',
        options: ['attachEvent()', 'addEventListener()', 'onEvent()', 'listen()'],
        correctIndex: 1,
        explanation: '`addEventListener("click", callback)` safely attaches a listener without overwriting any existing listeners on that element.'
      },
      {
        id: 'b1_evt_2',
        question: 'Which of the following is NOT a standard mouse event?',
        options: ['click', 'mouseenter', 'mouseswipe', 'mousemove'],
        correctIndex: 2,
        explanation: '"mouseswipe" is not a standard DOM event. Standard ones include click, mouseenter, mousemove, mouseleave, etc.'
      },
      {
        id: 'b1_evt_3',
        question: 'How do you prevent a form from navigating to a new page when the user clicks the submit button?',
        options: ['event.stop()', 'event.halt()', 'event.preventDefault()', 'event.cancel()'],
        correctIndex: 2,
        explanation: '`preventDefault()` cancels the browser\'s default native action for that event, letting you handle the form submission manually via JS.'
      },
      {
        id: 'b1_evt_4',
        question: 'What is event bubbling?',
        options: ['When an event triggers on the innermost target element and then successively triggers on its parents up the DOM tree', 'When multiple events occur at once', 'When an event causes a memory leak', 'When an event triggers on the outermost element first'],
        correctIndex: 0,
        explanation: 'Like bubbles rising in water, an event first triggers on the deepest target element, and then successively triggers on its ancestors.'
      },
      {
        id: 'b1_evt_5',
        question: 'Which property of the event object gives you the specific element that triggered the event?',
        options: ['event.target', 'event.element', 'event.source', 'event.node'],
        correctIndex: 0,
        explanation: '`event.target` is the actual underlying element clicked. `event.currentTarget` is the element the listener is attached to.'
      },
      {
        id: 'b1_evt_6',
        question: 'How do you stop an event from bubbling up to parent elements?',
        options: ['event.preventDefault()', 'event.stopPropagation()', 'return false', 'event.cancelBubble()'],
        correctIndex: 1,
        explanation: '`stopPropagation()` halts the bubbling phase. If you click a button, the button\'s click handler runs, but the parent `div` click handler will not.'
      },
      {
        id: 'b1_evt_7',
        question: 'What is "Event Delegation"?',
        options: ['Asking another developer to write the listener', 'Attaching a single event listener to a parent element to handle events for multiple children (even dynamically added ones)', 'Removing events from memory', 'Firing custom events'],
        correctIndex: 1,
        explanation: 'Instead of adding 100 click listeners to 100 `<li>` elements, you add ONE listener to the `<ul>` and use `event.target` to see which `<li>` was clicked. It saves memory!'
      },
      {
        id: 'b1_evt_8',
        question: 'How do you remove an event listener?',
        options: ['removeEventListener()', 'deleteEvent()', 'element.on = null', 'clearListeners()'],
        correctIndex: 0,
        explanation: '`removeEventListener("click", callback)` removes it. However, you MUST pass the exact same named callback function reference used when adding it.'
      }
    ]
  },
  classes: {
    id: 'classes',
    title: 'Classes',
    tier: 'Beginner',
    icon: '🏛️',
    color: 'hover:border-cyan-500',
    questions: [
      {
        id: 'b1_cls_1',
        question: 'Which keyword is used to create a class in modern JavaScript?',
        options: ['object', 'class', 'struct', 'blueprint'],
        correctIndex: 1,
        explanation: 'The `class` keyword was introduced in ES6 as syntactic sugar over JS\'s prototypical inheritance.'
      },
      {
        id: 'b1_cls_2',
        question: 'What is the name of the special method used for creating and initializing an object created with a class?',
        options: ['init', 'create', 'constructor', 'setup'],
        correctIndex: 2,
        explanation: 'The `constructor` method runs automatically when you instantiate the class using the `new` keyword.'
      },
      {
        id: 'b1_cls_3',
        question: 'Which keyword is used to inherit from another class?',
        options: ['inherits', 'extends', 'implements', 'uses'],
        correctIndex: 1,
        explanation: 'The `extends` keyword is used to create a child class that inherits all methods and properties from a parent class.'
      },
      {
        id: 'b1_cls_4',
        question: 'How do you call the constructor of a parent class from within a child class?',
        options: ['parent()', 'base()', 'super()', 'main()'],
        correctIndex: 2,
        explanation: 'The `super()` method calls the parent\'s constructor. You MUST call it before you can use the `this` keyword in a child class.'
      },
      {
        id: 'b1_cls_5',
        question: 'What does the `static` keyword do in a class?',
        options: ['Makes a property unchangeable', 'Defines a method or property on the class blueprint itself, rather than on the instantiated objects', 'Prevents the class from being extended', 'Makes the class invisible'],
        correctIndex: 1,
        explanation: 'Static methods (like `Math.random()`) are called directly on the class (`User.compare(user1, user2)`), not on a created instance.'
      },
      {
        id: 'b1_cls_6',
        question: 'How do you create an instance of a class named `Car`?',
        options: ['const myCar = Car()', 'const myCar = new Car()', 'const myCar = make Car()', 'const myCar = create Car()'],
        correctIndex: 1,
        explanation: 'The `new` keyword allocates memory for the new object, binds `this`, and triggers the constructor.'
      },
      {
        id: 'b1_cls_7',
        question: 'In a class, how do you add a method?',
        options: ['function myMethod() {}', 'myMethod: function() {}', 'myMethod() {}', 'const myMethod = function() {}'],
        correctIndex: 2,
        explanation: 'Inside a class body, you simply write the method name followed by parentheses and curly braces: `drive() { ... }`.'
      },
      {
        id: 'b1_cls_8',
        question: 'Can a JavaScript class extend multiple parent classes simultaneously (Multiple Inheritance)?',
        options: ['Yes, by comma-separating them', 'No, JavaScript only supports single inheritance', 'Only if the classes are identical', 'Yes, but only in TypeScript'],
        correctIndex: 1,
        explanation: 'JavaScript strictly prohibits a class from having more than one direct parent to avoid the "Diamond Problem" of conflicting methods.'
      }
    ]
  }
};
