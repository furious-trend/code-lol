export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export const quizzes: Record<string, QuizQuestion[]> = {
  variables: [
    {
      id: 'v1',
      question: 'What is a variable in programming?',
      options: ['A math equation', 'A named storage for data', 'A type of bug', 'A function that changes'],
      correctIndex: 1,
      explanation: 'A variable is like a labeled box where you store data to use later.'
    },
    {
      id: 'v2',
      question: 'Which keyword is typically NOT used to declare a variable in modern JavaScript?',
      options: ['let', 'const', 'var', 'dim'],
      correctIndex: 3,
      explanation: '"dim" is used in languages like Visual Basic, not JavaScript. (var is older but still valid, let and const are modern).'
    },
    {
      id: 'v3',
      question: 'If you want a variable whose value can NEVER change, you should use:',
      options: ['let', 'const', 'static', 'final'],
      correctIndex: 1,
      explanation: '"const" stands for constant, meaning the value cannot be reassigned.'
    },
    {
      id: 'v4',
      question: 'What happens if you declare a variable with "let" but don\'t assign it a value?',
      options: ['It throws an error', 'It equals 0', 'It equals undefined', 'It equals null'],
      correctIndex: 2,
      explanation: 'In JavaScript, an uninitialized variable automatically gets the value "undefined".'
    },
    {
      id: 'v5',
      question: 'Which of these is a valid variable name?',
      options: ['1stPlace', 'my-variable', 'myVariable', 'let'],
      correctIndex: 2,
      explanation: 'Variable names cannot start with numbers, cannot contain hyphens, and cannot be reserved keywords like "let". camelCase is standard!'
    }
  ],
  loops: [
    {
      id: 'l1',
      question: 'What is the primary purpose of a loop?',
      options: ['To make the code run slower', 'To repeat a block of code', 'To create a new variable', 'To stop the program'],
      correctIndex: 1,
      explanation: 'Loops execute the same block of code multiple times, saving you from writing it over and over.'
    },
    {
      id: 'l2',
      question: 'What happens if a loop never reaches its stopping condition?',
      options: ['It skips the loop entirely', 'It creates an infinite loop', 'The computer automatically fixes it', 'It runs exactly 100 times'],
      correctIndex: 1,
      explanation: 'If the stopping condition is never met, the loop runs forever (an infinite loop), eventually crashing your program or browser.'
    },
    {
      id: 'l3',
      question: 'Which of the following is NOT a common type of loop?',
      options: ['for loop', 'while loop', 'do-while loop', 'when loop'],
      correctIndex: 3,
      explanation: 'There is no standard "when" loop in most popular programming languages like JavaScript or Python.'
    },
    {
      id: 'l4',
      question: 'In a standard JavaScript "for" loop: for(let i = 0; i < 5; i++), how many times will it run?',
      options: ['4 times', '5 times', '6 times', 'Infinite times'],
      correctIndex: 1,
      explanation: 'It runs for i=0, 1, 2, 3, and 4. That is exactly 5 times.'
    },
    {
      id: 'l5',
      question: 'The "i++" part of a for loop is responsible for:',
      options: ['Starting the loop', 'Checking if the loop should stop', 'Incrementing the counter', 'Printing the output'],
      correctIndex: 2,
      explanation: '"i++" increases the value of i by 1 after each loop iteration.'
    }
  ],
  arrays: [
    {
      id: 'a1',
      question: 'What is an array?',
      options: ['A single variable', 'A collection of items stored in a single variable', 'A type of function', 'A loop condition'],
      correctIndex: 1,
      explanation: 'An array allows you to store multiple values within a single variable name, usually accessed by an index.'
    },
    {
      id: 'a2',
      question: 'In most programming languages, what is the index of the first element in an array?',
      options: ['1', '0', '-1', 'It depends on the language'],
      correctIndex: 1,
      explanation: 'Most programming languages (like JavaScript, Python, C++) use zero-based indexing, meaning the first element is at index 0.'
    },
    {
      id: 'a3',
      question: 'Which method adds a new item to the end of a JavaScript array?',
      options: ['push()', 'pop()', 'add()', 'append()'],
      correctIndex: 0,
      explanation: 'The push() method adds one or more elements to the end of an array and returns the new length of the array.'
    },
    {
      id: 'a4',
      question: 'What does the pop() method do?',
      options: ['Adds an item to the front', 'Removes the last element', 'Removes the first element', 'Sorts the array'],
      correctIndex: 1,
      explanation: 'The pop() method removes the last element from an array and returns that element.'
    },
    {
      id: 'a5',
      question: 'How do you access the third element in an array named "fruits"?',
      options: ['fruits[3]', 'fruits(3)', 'fruits[2]', 'fruits.get(3)'],
      correctIndex: 2,
      explanation: 'Since arrays are zero-indexed, the first element is [0], second is [1], and third is [2].'
    }
  ],
  functions: [
    {
      id: 'f1',
      question: 'What is a function?',
      options: ['A reusable block of code designed to perform a particular task', 'A data type', 'A type of loop', 'A mathematical equation'],
      correctIndex: 0,
      explanation: 'Functions allow you to group code into reusable blocks that can be executed whenever needed.'
    },
    {
      id: 'f2',
      question: 'What do we call the values passed into a function when it is called?',
      options: ['Variables', 'Arguments', 'Returns', 'Parameters'],
      correctIndex: 1,
      explanation: 'Arguments are the actual values passed to the function when it is called, while parameters are the variables defined in the function signature.'
    },
    {
      id: 'f3',
      question: 'Which keyword is used to send a value back from a function?',
      options: ['output', 'return', 'give', 'send'],
      correctIndex: 1,
      explanation: 'The return statement ends function execution and specifies a value to be returned to the function caller.'
    },
    {
      id: 'f4',
      question: 'In modern JavaScript, what is the syntax for an arrow function?',
      options: ['function() => {}', '() => {}', '=> function()', '() -> {}'],
      correctIndex: 1,
      explanation: 'Arrow functions provide a shorter syntax for writing function expressions, using the => (fat arrow) token.'
    },
    {
      id: 'f5',
      question: 'What happens if a function does not have a return statement in JavaScript?',
      options: ['It crashes', 'It returns 0', 'It returns undefined', 'It causes an infinite loop'],
      correctIndex: 2,
      explanation: 'If no return statement is used, or if the return statement is empty, the function automatically returns undefined.'
    }
  ],
  conditionals: [
    {
      id: 'c1',
      question: 'Which statement is used to execute code only if a specific condition is true?',
      options: ['for', 'when', 'if', 'loop'],
      correctIndex: 2,
      explanation: 'The "if" statement evaluates a condition and executes its code block only if the condition is true.'
    },
    {
      id: 'c2',
      question: 'What is the purpose of the "else" statement?',
      options: ['To provide a fallback block of code if the "if" condition is false', 'To loop through code', 'To define a variable', 'To stop the program'],
      correctIndex: 0,
      explanation: 'An "else" block executes when the preceding "if" or "else if" conditions are false.'
    },
    {
      id: 'c3',
      question: 'Which operator is used to check if two values are equal in both value and type (strict equality)?',
      options: ['=', '==', '===', '!='],
      correctIndex: 2,
      explanation: 'The strict equality operator (===) checks whether its two operands are equal, returning a Boolean result, without converting types.'
    },
    {
      id: 'c4',
      question: 'What does the "||" operator represent?',
      options: ['Logical AND', 'Logical OR', 'Logical NOT', 'Logical XOR'],
      correctIndex: 1,
      explanation: 'The logical OR (||) operator returns true if at least one of its operands is true.'
    },
    {
      id: 'c5',
      question: 'In a switch statement, what keyword is used to stop the code from automatically executing the next case?',
      options: ['stop', 'end', 'break', 'return'],
      correctIndex: 2,
      explanation: 'The break keyword breaks out of a switch block, stopping execution of further cases.'
    }
  ],
  objects: [
    {
      id: 'o1',
      question: 'What is an object in JavaScript?',
      options: ['A primitive data type', 'A collection of key-value pairs', 'A mathematical function', 'A loop condition'],
      correctIndex: 1,
      explanation: 'An object is a standalone entity, with properties and type. It is a collection of key-value pairs.'
    },
    {
      id: 'o2',
      question: 'How do you access the "name" property of an object named "person"?',
      options: ['person(name)', 'person[name]', 'person.name', 'Both person.name and person["name"]'],
      correctIndex: 3,
      explanation: 'You can use dot notation (person.name) or bracket notation (person["name"]) to access object properties.'
    },
    {
      id: 'o3',
      question: 'Which keyword is used to create a new instance of an object from a class or constructor?',
      options: ['create', 'new', 'instance', 'make'],
      correctIndex: 1,
      explanation: 'The "new" operator lets developers create an instance of a user-defined object type or of one of the built-in object types.'
    },
    {
      id: 'o4',
      question: 'What is a method in an object?',
      options: ['A property containing a function definition', 'A mathematical calculation', 'A way to delete the object', 'A type of loop'],
      correctIndex: 0,
      explanation: 'When a function is a property of an object, it is called a method.'
    },
    {
      id: 'o5',
      question: 'Which built-in object provides mathematical functions and constants?',
      options: ['Calc', 'Numbers', 'Math', 'Compute'],
      correctIndex: 2,
      explanation: 'The Math object allows you to perform mathematical tasks on numbers, like Math.random() or Math.PI.'
    }
  ],
  dom: [
    {
      id: 'd1',
      question: 'What does DOM stand for?',
      options: ['Document Object Model', 'Data Output Mechanism', 'Digital Object Memory', 'Document Orientation Module'],
      correctIndex: 0,
      explanation: 'DOM stands for Document Object Model, which represents the page so that programs can change the document structure, style, and content.'
    },
    {
      id: 'd2',
      question: 'Which method selects an element by its ID?',
      options: ['querySelector()', 'getElementById()', 'selectId()', 'getElement()'],
      correctIndex: 1,
      explanation: 'document.getElementById() returns an Element object representing the element whose id property matches the specified string.'
    },
    {
      id: 'd3',
      question: 'How can you change the text content of an HTML element?',
      options: ['element.text', 'element.innerHTML', 'element.textContent', 'Both innerHTML and textContent'],
      correctIndex: 3,
      explanation: 'Both innerHTML and textContent can change text, though innerHTML parses HTML tags while textContent treats everything as raw text.'
    },
    {
      id: 'd4',
      question: 'Which method is used to create a new HTML element in JavaScript?',
      options: ['document.makeElement()', 'document.createElement()', 'document.addNode()', 'document.newElement()'],
      correctIndex: 1,
      explanation: 'document.createElement(tagName) creates the HTML element specified by tagName.'
    },
    {
      id: 'd5',
      question: 'How do you add a new child element to an existing DOM node?',
      options: ['node.insert()', 'node.addChild()', 'node.appendChild()', 'node.push()'],
      correctIndex: 2,
      explanation: 'The appendChild() method adds a node to the end of the list of children of a specified parent node.'
    }
  ],
  promises: [
    {
      id: 'p1',
      question: 'What is a Promise in JavaScript?',
      options: ['A guarantee that code will not crash', 'An object representing the eventual completion or failure of an asynchronous operation', 'A loop that runs indefinitely', 'A strict data type'],
      correctIndex: 1,
      explanation: 'A Promise is a proxy for a value not necessarily known when the promise is created.'
    },
    {
      id: 'p2',
      question: 'What are the three states of a Promise?',
      options: ['Started, Running, Stopped', 'Pending, Fulfilled, Rejected', 'Waiting, Resolved, Failed', 'Open, Closed, Error'],
      correctIndex: 1,
      explanation: 'A Promise is in one of these states: pending (initial state), fulfilled (operation completed successfully), or rejected (operation failed).'
    },
    {
      id: 'p3',
      question: 'Which keyword is used to wait for a Promise to resolve in an async function?',
      options: ['wait', 'halt', 'pause', 'await'],
      correctIndex: 3,
      explanation: 'The await operator is used to wait for a Promise. It can only be used inside an async function.'
    },
    {
      id: 'p4',
      question: 'Which block is used to handle errors in an async/await function?',
      options: ['try...catch', 'if...else', 'switch...case', 'error...handle'],
      correctIndex: 0,
      explanation: 'The try...catch statement marks a block of statements to try and specifies a response if an exception is thrown.'
    },
    {
      id: 'p5',
      question: 'What method is used on a Promise object to schedule a callback for when it is fulfilled?',
      options: ['.catch()', '.finally()', '.then()', '.done()'],
      correctIndex: 2,
      explanation: 'The .then() method returns a Promise and takes up to two arguments: callback functions for the success and failure cases of the Promise.'
    }
  ],
  events: [
    {
      id: 'e1',
      question: 'What method is used to attach an event handler to an element?',
      options: ['attachEvent()', 'addEventListener()', 'onEvent()', 'listen()'],
      correctIndex: 1,
      explanation: 'The addEventListener() method attaches an event handler to the specified element without overwriting existing event handlers.'
    },
    {
      id: 'e2',
      question: 'Which of the following is NOT a standard mouse event?',
      options: ['click', 'mouseenter', 'mouseswipe', 'mousemove'],
      correctIndex: 2,
      explanation: '"mouseswipe" is not a standard DOM event. Standard ones include click, mouseenter, mousemove, mouseleave, etc.'
    },
    {
      id: 'e3',
      question: 'How do you prevent a form from submitting when a user clicks the submit button?',
      options: ['event.stop()', 'event.halt()', 'event.preventDefault()', 'event.cancel()'],
      correctIndex: 2,
      explanation: 'The preventDefault() method cancels the event if it is cancelable, meaning that the default action that belongs to the event will not occur.'
    },
    {
      id: 'e4',
      question: 'What is event bubbling?',
      options: ['When an event triggers on the innermost element and then successively triggers on its parents', 'When multiple events occur at once', 'When an event causes a memory leak', 'When an event triggers on the outermost element first'],
      correctIndex: 0,
      explanation: 'Event bubbling is a type of event propagation where the event first triggers on the deepest target element, and then successively triggers on its ancestors.'
    },
    {
      id: 'e5',
      question: 'Which property of the event object gives you the element that triggered the event?',
      options: ['event.target', 'event.element', 'event.source', 'event.node'],
      correctIndex: 0,
      explanation: 'The target property of the Event interface is a reference to the object onto which the event was dispatched.'
    }
  ],
  classes: [
    {
      id: 'cl1',
      question: 'Which keyword is used to create a class in modern JavaScript?',
      options: ['object', 'class', 'struct', 'blueprint'],
      correctIndex: 1,
      explanation: 'The "class" keyword was introduced in ES6 to create classes, which are templates for creating objects.'
    },
    {
      id: 'cl2',
      question: 'What is the name of the special method used for creating and initializing an object created with a class?',
      options: ['init', 'create', 'constructor', 'setup'],
      correctIndex: 2,
      explanation: 'The constructor method is a special method of a class for creating and initializing an object instance of that class.'
    },
    {
      id: 'cl3',
      question: 'Which keyword is used to inherit from another class?',
      options: ['inherits', 'extends', 'implements', 'uses'],
      correctIndex: 1,
      explanation: 'The "extends" keyword is used in class declarations or class expressions to create a class that is a child of another class.'
    },
    {
      id: 'cl4',
      question: 'How do you call the constructor of a parent class from within a child class?',
      options: ['parent()', 'base()', 'super()', 'main()'],
      correctIndex: 2,
      explanation: 'The "super" keyword is used to call the constructor of its parent class to access the parent\'s properties and methods.'
    },
    {
      id: 'cl5',
      question: 'What does the "static" keyword do in a class?',
      options: ['Makes a property unchangeable', 'Defines a method or property on the class itself, not on instances', 'Prevents the class from being extended', 'Makes the class invisible to other files'],
      correctIndex: 1,
      explanation: 'Static methods and properties are called without instantiating their class and cannot be called through a class instance.'
    }
  ]
};
