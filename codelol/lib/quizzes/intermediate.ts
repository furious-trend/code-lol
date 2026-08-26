import { QuizTopic } from './types';

export const intermediateTopics: Record<string, QuizTopic> = {
  destructuring: {
    id: 'destructuring',
    title: 'Destructuring',
    tier: 'Intermediate',
    icon: '📦',
    color: 'hover:border-blue-400',
    questions: [
      {
        id: 'int_des_1',
        question: 'What is the syntax for destructuring an array in JavaScript?',
        options: ['const { a, b } = array', 'const [ a, b ] = array', 'const (a, b) = array', 'const a, b = array'],
        correctIndex: 1,
        explanation: 'Array destructuring uses square brackets [ ] on the left side of the assignment.'
      },
      {
        id: 'int_des_2',
        question: 'How do you extract a property named "age" from a user object and assign it to a variable named "userAge"?',
        options: ['const { age: userAge } = user', 'const { userAge: age } = user', 'const { age } = user as userAge', 'const userAge = user{age}'],
        correctIndex: 0,
        explanation: 'The syntax `const { originalName: newName } = object` renames the extracted variable.'
      },
      {
        id: 'int_des_3',
        question: 'What happens if you try to destructure a property that doesn\'t exist on an object?',
        options: ['It throws a ReferenceError', 'It throws a TypeError', 'The variable is assigned "undefined"', 'The program crashes'],
        correctIndex: 2,
        explanation: 'If the key doesn\'t exist, the destructured variable silently becomes undefined, just like accessing a non-existent property normally.'
      },
      {
        id: 'int_des_4',
        question: 'How can you assign a default value while destructuring, in case the property is undefined?',
        options: ['const { name || "Guest" } = user', 'const { name = "Guest" } = user', 'const { name : "Guest" } = user', 'const { name ?? "Guest" } = user'],
        correctIndex: 1,
        explanation: 'Using the equals sign inside the destructuring braces sets a default value that kicks in ONLY if the property is undefined.'
      },
      {
        id: 'int_des_5',
        question: 'Given `const arr = [10, 20, 30]`, how do you extract only the FIRST and THIRD elements?',
        options: ['const [first, , third] = arr', 'const [first, third] = arr', 'const {0: first, 2: third} = arr', 'Both A and C are correct'],
        correctIndex: 3,
        explanation: 'You can skip array items by leaving an empty space between commas (A). You can also object-destructure arrays by their index keys (C)!'
      },
      {
        id: 'int_des_6',
        question: 'Can you destructure an object directly in a function\'s parameter list?',
        options: ['Yes, e.g. function print({ name, age }) { ... }', 'No, it must be done inside the function body', 'Only in arrow functions', 'Only if the object has no methods'],
        correctIndex: 0,
        explanation: 'Yes! Parameter destructuring is incredibly common, especially in React components where you destructure the "props" object directly.'
      },
      {
        id: 'int_des_7',
        question: 'What is deep/nested destructuring?',
        options: ['Destructuring an array inside a string', 'Extracting properties from objects inside other objects', 'A performance optimization technique', 'Destructuring a class'],
        correctIndex: 1,
        explanation: 'Nested destructuring lets you drill down. E.g., `const { address: { city } } = user;` extracts the city directly from the nested address object.'
      },
      {
        id: 'int_des_8',
        question: 'What happens if you try to destructure `null` or `undefined`?',
        options: ['It assigns null to the variables', 'It throws a TypeError', 'It creates an empty object', 'It returns undefined'],
        correctIndex: 1,
        explanation: 'Destructuring requires an object or iterable. Trying to destructure null/undefined will throw a TypeError (Cannot destructure property...).'
      }
    ]
  },
  spreadRest: {
    id: 'spreadRest',
    title: 'Spread/Rest Operators',
    tier: 'Intermediate',
    icon: '✨',
    color: 'hover:border-teal-500',
    questions: [
      {
        id: 'int_sr_1',
        question: 'What is the syntax for the Spread/Rest operator?',
        options: ['***', '---', '...', '///'],
        correctIndex: 2,
        explanation: 'Three dots (...) represent both Spread and Rest. Its function depends entirely on where it is used.'
      },
      {
        id: 'int_sr_2',
        question: 'What does the Rest operator do in a function parameter list? `function sum(...numbers)`',
        options: ['Pauses the function execution', 'Spreads an array into individual arguments', 'Gathers all remaining arguments into a true Array', 'Limits the function to 3 arguments'],
        correctIndex: 2,
        explanation: 'The Rest operator "gathers" the remaining comma-separated arguments into a single Array object.'
      },
      {
        id: 'int_sr_3',
        question: 'What does the Spread operator do when used in an array literal? `const newArr = [...oldArr, 4, 5]`',
        options: ['Throws a syntax error', 'Expands an iterable (like an array) into individual elements', 'Reverses the array', 'Deletes the old array'],
        correctIndex: 1,
        explanation: 'Spread "unpacks" the elements of `oldArr` directly into the `newArr`.'
      },
      {
        id: 'int_sr_4',
        question: 'Can the Spread operator be used to copy an object? `const clone = { ...original }`',
        options: ['Yes, it performs a deep copy', 'Yes, it performs a shallow copy', 'No, spread only works on Arrays', 'No, it will throw an error'],
        correctIndex: 1,
        explanation: 'Yes, but it is a SHALLOW copy. Top-level properties are cloned, but nested objects still share the same memory reference as the original.'
      },
      {
        id: 'int_sr_5',
        question: 'Where must the Rest operator be placed in a function\'s parameter list?',
        options: ['At the very beginning', 'Anywhere', 'It must be the very last parameter', 'It must be in the middle'],
        correctIndex: 2,
        explanation: 'Rest gathers the *remaining* arguments. If it wasn\'t at the end, JavaScript wouldn\'t know where the rest of the arguments stopped and the next parameter began!'
      },
      {
        id: 'int_sr_6',
        question: 'If `const str = "Hi"`, what does `[...str]` produce?',
        options: ['["Hi"]', '["H", "i"]', 'An error', 'A string "...Hi"'],
        correctIndex: 1,
        explanation: 'Strings are iterable! Spreading a string unpacks it character by character into the array.'
      },
      {
        id: 'int_sr_7',
        question: 'How do you use Spread to combine two objects, `obj1` and `obj2`, giving `obj2` precedence if they share keys?',
        options: ['{ obj1, obj2 }', '{ ...obj1, ...obj2 }', '{ ...obj2, ...obj1 }', 'Object.combine(obj1, obj2)'],
        correctIndex: 1,
        explanation: 'Order matters! By placing `...obj2` second, its properties will overwrite any identically named properties from `...obj1`.'
      },
      {
        id: 'int_sr_8',
        question: 'Prior to ES6, what was the standard way to achieve what the Rest operator does in functions?',
        options: ['The `arguments` object', 'The `this` keyword', '`Array.slice()`', '`function.apply()`'],
        correctIndex: 0,
        explanation: 'Before Rest, devs used the special `arguments` object. However, `arguments` is an array-LIKE object, not a real Array, which was highly annoying.'
      }
    ]
  },
  higherOrder: {
    id: 'higherOrder',
    title: 'Higher-Order Functions',
    tier: 'Intermediate',
    icon: '🚀',
    color: 'hover:border-cyan-500',
    questions: [
      {
        id: 'int_hof_1',
        question: 'What defines a Higher-Order Function (HOF)?',
        options: ['A function that runs faster than others', 'A function that takes another function as an argument, OR returns a function', 'A function written inside a class', 'A function that modifies the DOM'],
        correctIndex: 1,
        explanation: 'Because JavaScript treats functions as "first-class citizens" (like any other variable), they can be passed into or returned from other functions.'
      },
      {
        id: 'int_hof_2',
        question: 'Which array method is a classic example of a Higher-Order Function?',
        options: ['Array.push()', 'Array.length', 'Array.map()', 'Array.join()'],
        correctIndex: 2,
        explanation: '`map()` is a HOF because it expects you to pass in a callback function to dictate how each element should be transformed.'
      },
      {
        id: 'int_hof_3',
        question: 'What does `Array.map()` return?',
        options: ['The same array, modified', 'A single boolean value', 'A brand new array of the exact same length as the original', 'The sum of all numbers in the array'],
        correctIndex: 2,
        explanation: '`map()` never mutates the original array. It takes your callback\'s return value for each item and builds a totally new array of the same length.'
      },
      {
        id: 'int_hof_4',
        question: 'If you want to filter out negative numbers from an array, which HOF should you use?',
        options: ['Array.reduce()', 'Array.map()', 'Array.filter()', 'Array.sort()'],
        correctIndex: 2,
        explanation: '`filter()` runs a test function on each element. If the callback returns true, the element is kept in the new array; if false, it is dropped.'
      },
      {
        id: 'int_hof_5',
        question: 'What does `Array.reduce()` do?',
        options: ['Removes elements from an array', 'Shrinks the memory size of the array', 'Reduces the array down to a single value (like a sum or object) by iterating through it with an accumulator', 'Filters out duplicate values'],
        correctIndex: 2,
        explanation: '`reduce()` is the Swiss Army knife of arrays. It passes an "accumulator" variable along with each step, letting you build up a final, single result.'
      },
      {
        id: 'int_hof_6',
        question: 'What is the main difference between `Array.forEach()` and `Array.map()`?',
        options: ['forEach is for strings, map is for arrays', 'map returns a new array, forEach returns undefined and is only used for side effects', 'forEach is faster', 'There is no difference'],
        correctIndex: 1,
        explanation: 'If you need the resulting transformed data, use map. If you just want to DO something with each item (like console.log or save to a DB), use forEach.'
      },
      {
        id: 'int_hof_7',
        question: 'What happens if you forget to return a value inside an `Array.map()` callback?',
        options: ['The map function crashes', 'The new array will be filled with `undefined`', 'The original array elements are copied unchanged', 'The element is skipped'],
        correctIndex: 1,
        explanation: 'A function with no return statement returns `undefined`. So `map()` dutifully collects all those `undefined`s into your new array.'
      },
      {
        id: 'int_hof_8',
        question: 'Can you chain Higher-Order array methods?',
        options: ['Yes, e.g., arr.filter(...).map(...).reduce(...)', 'No, they must be done on separate lines', 'Only if the array contains numbers', 'Only map() can be chained'],
        correctIndex: 0,
        explanation: 'Yes! Because map and filter return arrays, you can immediately call another array method on the result, creating highly readable data pipelines.'
      }
    ]
  },
  callbacks: {
    id: 'callbacks',
    title: 'Callbacks',
    tier: 'Intermediate',
    icon: '📞',
    color: 'hover:border-orange-400',
    questions: [
      {
        id: 'int_cb_1',
        question: 'What is a callback function?',
        options: ['A function that calls itself', 'A function passed into another function as an argument, to be executed later', 'A function used exclusively for API requests', 'A function that undoes the previous action'],
        correctIndex: 1,
        explanation: 'You "call back" the function when the parent task finishes.'
      },
      {
        id: 'int_cb_2',
        question: 'Why are callbacks heavily used in JavaScript?',
        options: ['Because JS doesn\'t have variables', 'To handle asynchronous operations (like fetching data or waiting for a timer) without freezing the main thread', 'To encrypt source code', 'To make code look more complex'],
        correctIndex: 1,
        explanation: 'If JS stopped and waited 3 seconds for an API response, the whole browser would freeze. Callbacks let JS say "Do this task, and execute this callback when you finish. I\'m going to keep running other code."'
      },
      {
        id: 'int_cb_3',
        question: 'What is "Callback Hell"?',
        options: ['A fatal error in Node.js', 'Deeply nested callbacks making the code shape like a > (Pyramid of Doom), resulting in unreadable and hard-to-debug code', 'When a callback runs infinitely', 'When a callback throws an error'],
        correctIndex: 1,
        explanation: 'When Task 1 requires a callback, and Task 2 (inside the first callback) requires a callback, and Task 3... code becomes impossible to read.'
      },
      {
        id: 'int_cb_4',
        question: 'In the Node.js standard library, what is the "Error-First Callback" convention?',
        options: ['The callback always throws an error', 'The callback\'s first argument is reserved for an error object; if successful, it is null', 'The callback only executes on errors', 'Errors are ignored'],
        correctIndex: 1,
        explanation: 'Node.js standardized `function(err, data) { ... }`. You check `if (err)` first, and if it\'s null, you safely use `data`.'
      },
      {
        id: 'int_cb_5',
        question: '`setTimeout(myFunction, 1000)`. What is `myFunction` in this context?',
        options: ['A variable', 'A Promise', 'A callback function', 'A string'],
        correctIndex: 2,
        explanation: 'You are passing `myFunction` to `setTimeout` so the browser can execute it as a callback after 1000 milliseconds.'
      },
      {
        id: 'int_cb_6',
        question: 'What is the danger of writing `setTimeout(myFunction(), 1000)`?',
        options: ['It waits 2000 milliseconds', 'It causes an infinite loop', 'It executes myFunction IMMEDIATELY and passes its return value to setTimeout, instead of waiting', 'It deletes myFunction'],
        correctIndex: 2,
        explanation: 'The parentheses `()` mean "execute right now." You must pass the function REFERENCE (no parentheses) to be used as a callback later.'
      },
      {
        id: 'int_cb_7',
        question: 'Can callbacks be synchronous?',
        options: ['Yes, e.g., callbacks passed to Array.map() execute immediately and synchronously', 'No, callbacks are by definition asynchronous', 'Only in strict mode', 'Only in Node.js'],
        correctIndex: 0,
        explanation: 'While famous for async tasks, callbacks are just functions passed as arguments. `map()` runs its callback synchronously, blocking the thread until it finishes.'
      },
      {
        id: 'int_cb_8',
        question: 'What modern JavaScript features were introduced largely to solve Callback Hell?',
        options: ['Classes and Objects', 'Promises and Async/Await', 'Arrow Functions and Let/Const', 'Modules and Imports'],
        correctIndex: 1,
        explanation: 'Promises flattened the pyramid of doom into chainable `.then()` blocks, and Async/Await made async code read like standard synchronous code.'
      }
    ]
  },
  recursion: {
    id: 'recursion',
    title: 'Recursion',
    tier: 'Intermediate',
    icon: '🪆',
    color: 'hover:border-purple-500',
    questions: [
      {
        id: 'int_rec_1',
        question: 'What is recursion?',
        options: ['A function that calls another function', 'A function that calls itself', 'A loop that never ends', 'A method of caching data'],
        correctIndex: 1,
        explanation: 'Recursion is a programming technique where a function calls itself to solve smaller instances of the same problem.'
      },
      {
        id: 'int_rec_2',
        question: 'What is a "Base Case" in a recursive function?',
        options: ['The first line of the function', 'The condition that tells the recursion to STOP calling itself', 'The most complex part of the algorithm', 'A database connection'],
        correctIndex: 1,
        explanation: 'Without a base case (e.g. `if (n === 0) return;`), a recursive function will call itself infinitely until the program crashes.'
      },
      {
        id: 'int_rec_3',
        question: 'What error do you get if you lack a Base Case and recurse infinitely?',
        options: ['TypeError: not a function', 'SyntaxError', 'Stack Overflow (Maximum call stack size exceeded)', 'ReferenceError'],
        correctIndex: 2,
        explanation: 'Every function call adds a "frame" to the Call Stack. Infinite recursion quickly uses up all allocated memory for the stack, causing a Stack Overflow.'
      },
      {
        id: 'int_rec_4',
        question: 'Recursion is often a natural fit for traversing which data structures?',
        options: ['Strings', 'Booleans', 'Trees and DOM Nodes', 'Simple Arrays'],
        correctIndex: 2,
        explanation: 'Because trees consist of branches that look exactly like smaller trees, recursive functions can effortlessly navigate them regardless of how deep they go.'
      },
      {
        id: 'int_rec_5',
        question: 'What is the classic mathematical example often used to teach recursion?',
        options: ['Calculating the area of a circle', 'Finding the hypotenuse', 'Calculating factorials (e.g., 5!) or the Fibonacci sequence', 'Solving linear equations'],
        correctIndex: 2,
        explanation: 'Factorial 5! is 5 * 4!. 4! is 4 * 3!. Because the formula references a smaller version of itself, it translates perfectly to recursion.'
      },
      {
        id: 'int_rec_6',
        question: 'Which is generally more memory-efficient in JavaScript: Recursion or a standard Loop (e.g., while)?',
        options: ['Recursion', 'A standard loop', 'They use the exact same memory', 'It depends on the variables used'],
        correctIndex: 1,
        explanation: 'Loops don\'t add new frames to the call stack. Recursion does, making loops inherently more memory-efficient in environments that lack Tail Call Optimization.'
      },
      {
        id: 'int_rec_7',
        question: 'What is Tail Call Optimization (TCO)?',
        options: ['Removing whitespace from code', 'An engine feature that prevents stack overflows if the recursive call is the absolute LAST action in the function', 'A way to make loops run backwards', 'A CSS optimization'],
        correctIndex: 1,
        explanation: 'If a function\'s last act is calling itself, smart engines can reuse the current stack frame instead of creating a new one, saving memory.'
      },
      {
        id: 'int_rec_8',
        question: 'Can every recursive algorithm be rewritten as an iterative (looping) algorithm?',
        options: ['Yes', 'No, some problems require recursion', 'Only in functional programming languages', 'Yes, but only if they don\'t use arrays'],
        correctIndex: 0,
        explanation: 'Yes! Anything you can do with recursion, you can do with a loop (sometimes requiring you to manually manage a Stack data structure). Recursion is just syntactic sugar for a stack-based loop.'
      }
    ]
  },
  closures: {
    id: 'closures',
    title: 'Closures',
    tier: 'Intermediate',
    icon: '🔒',
    color: 'hover:border-zinc-500',
    questions: [
      {
        id: 'int_clo_1',
        question: 'What is a Closure in JavaScript?',
        options: ['A function that closes the browser window', 'A feature where an inner function remembers the variables of its outer function, even after the outer function has finished executing', 'A syntax for closing HTML tags', 'A method to end a database connection'],
        correctIndex: 1,
        explanation: 'A closure gives you access to an outer function\'s scope from an inner function, permanently preserving those variables in memory.'
      },
      {
        id: 'int_clo_2',
        question: 'Why are closures useful?',
        options: ['They make code run faster', 'They allow data privacy/encapsulation (private variables) and state retention', 'They prevent infinite loops', 'They convert strings to numbers'],
        correctIndex: 1,
        explanation: 'By using a closure, you can create variables that cannot be accessed or modified from the global scope, only by the specific functions you provide.'
      },
      {
        id: 'int_clo_3',
        question: 'What happens to the local variables of a standard function after it finishes executing (assuming no closure is created)?',
        options: ['They are saved to the hard drive', 'They become global variables', 'They are garbage collected and destroyed to free up memory', 'They are locked for 5 minutes'],
        correctIndex: 2,
        explanation: 'Usually, when a function ends, its execution context is destroyed. Closures explicitly prevent this garbage collection for the variables they reference.'
      },
      {
        id: 'int_clo_4',
        question: 'In the module pattern, how are closures utilized?',
        options: ['To export the entire file', 'To import CSS', 'To return an object containing public methods that can access private variables trapped in the closure', 'To create React components'],
        correctIndex: 2,
        explanation: 'The module pattern (an IIFE returning an object) relies on closures to expose a public API while keeping internal logic and variables completely hidden.'
      },
      {
        id: 'int_clo_5',
        question: 'What is a common bug associated with closures inside loops (specifically using the old `var` keyword)?',
        options: ['The loop runs forever', 'The closures all reference the final state of the loop variable, instead of the state during their specific iteration', 'The closures crash the browser', 'Variables become strings'],
        correctIndex: 1,
        explanation: 'Because `var` is function-scoped, all closures share the SAME variable. By the time they execute, the loop finished, so they all see the final number. (`let` fixes this by creating a new block scope per iteration).'
      },
      {
        id: 'int_clo_6',
        question: 'Do closures require returning a function?',
        options: ['Yes, always', 'No, a closure is created any time a function accesses variables outside its immediate scope', 'Only in strict mode', 'Only when using arrow functions'],
        correctIndex: 1,
        explanation: 'Even a simple callback passed to `setTimeout` that accesses a variable from its parent function creates a closure.'
      },
      {
        id: 'int_clo_7',
        question: 'What is "Lexical Scoping"?',
        options: ['Defining scope based on variable types', 'A rule where a function\'s scope is determined by where it is physically written in the source code, not where it is called', 'Defining scope alphabetically', 'A security protocol'],
        correctIndex: 1,
        explanation: 'JavaScript uses Lexical Scoping. A function knows about the variables surrounding it based on the actual text layout of your code file.'
      },
      {
        id: 'int_clo_8',
        question: 'Can closures cause memory leaks?',
        options: ['No, JavaScript prevents this', 'Yes, if the closure holds references to large objects (like DOM nodes) that are no longer needed, preventing garbage collection', 'Only on mobile devices', 'Only if the closure contains a loop'],
        correctIndex: 1,
        explanation: 'Because closures prevent garbage collection of their trapped variables, accidentally keeping a closure alive forever can slowly eat up all browser memory.'
      }
    ]
  },
  thisKeyword: {
    id: 'thisKeyword',
    title: 'The "this" Keyword',
    tier: 'Intermediate',
    icon: '👉',
    color: 'hover:border-yellow-500',
    questions: [
      {
        id: 'int_this_1',
        question: 'In JavaScript, what determines the value of the `this` keyword in a standard function?',
        options: ['Where the function was defined', 'How the function is CALLED at runtime (the execution context)', 'The name of the function', 'It is always the global window object'],
        correctIndex: 1,
        explanation: 'Unlike other languages, `this` in standard JS functions is dynamic. It changes entirely based on WHO calls the function.'
      },
      {
        id: 'int_this_2',
        question: 'If you call a method on an object (e.g., `user.greet()`), what does `this` point to inside `greet()`?',
        options: ['The global object', 'undefined', 'The `user` object (the object to the left of the dot)', 'The function itself'],
        correctIndex: 2,
        explanation: 'When called as a method, `this` automatically binds to the object that owns the method.'
      },
      {
        id: 'int_this_3',
        question: 'If you extract a method into a variable and call it directly (e.g., `const g = user.greet; g();`), what is `this`?',
        options: ['The `user` object', 'undefined (in strict mode) or the global window object (in non-strict mode)', 'null', 'An error'],
        correctIndex: 1,
        explanation: 'Because you called `g()` without an object to the left of the dot, the context is lost. This is a massive source of bugs in JS!'
      },
      {
        id: 'int_this_4',
        question: 'Which method allows you to call a function and explicitly set what `this` should be, while passing arguments individually?',
        options: ['.bind()', '.apply()', '.call()', '.set()'],
        correctIndex: 2,
        explanation: '`.call(context, arg1, arg2)` invokes the function immediately with the provided context.'
      },
      {
        id: 'int_this_5',
        question: 'How does `.apply()` differ from `.call()`?',
        options: ['It runs asynchronously', 'It permanently binds the context', 'It takes an array of arguments instead of a comma-separated list', 'It only works on objects'],
        correctIndex: 2,
        explanation: 'A for Apply, A for Array. `.apply(context, [arg1, arg2])` is useful when you have an array of data ready to go.'
      },
      {
        id: 'int_this_6',
        question: 'What does `.bind()` do?',
        options: ['Calls the function immediately', 'Deletes the `this` context', 'Returns a NEW function where `this` is permanently locked to the provided context', 'Combines two functions'],
        correctIndex: 2,
        explanation: 'Unlike call/apply, bind does not execute the function. It returns a bulletproof clone of the function that can never lose its context, perfect for passing to event listeners.'
      },
      {
        id: 'int_this_7',
        question: 'How does the `this` keyword behave inside an Arrow Function?',
        options: ['It points to the global object', 'It is undefined', 'Arrow functions do not have their own `this`; they inherit `this` from the surrounding lexical scope where they were defined', 'It points to the arrow function itself'],
        correctIndex: 2,
        explanation: 'Arrow functions are "transparent" to `this`. This makes them perfect for callbacks (like `setTimeout`) inside class methods, as they won\'t lose the class context.'
      },
      {
        id: 'int_this_8',
        question: 'In a class constructor, what does `this` refer to?',
        options: ['The class definition', 'The newly created instance of the object being constructed', 'The parent class', 'The global object'],
        correctIndex: 1,
        explanation: 'When called with the `new` keyword, `this` is pointed to the brand new, empty object being created in memory.'
      }
    ]
  },
  arrowFunctions: {
    id: 'arrowFunctions',
    title: 'Arrow Functions',
    tier: 'Intermediate',
    icon: '🏹',
    color: 'hover:border-red-400',
    questions: [
      {
        id: 'int_arrf_1',
        question: 'What is the most notable behavior difference between Arrow Functions and standard functions?',
        options: ['Arrow functions are faster', 'Arrow functions do not have their own `this` binding', 'Arrow functions must be asynchronous', 'Arrow functions cannot take parameters'],
        correctIndex: 1,
        explanation: 'They inherit `this` lexically from their surrounding code, fixing the classic problem of losing context inside callbacks.'
      },
      {
        id: 'int_arrf_2',
        question: 'If an arrow function has exactly ONE parameter, what syntax shortcut can you take?',
        options: ['Omit the curly braces', 'Omit the `=>` symbol', 'Omit the parentheses around the parameter', 'Omit the return keyword'],
        correctIndex: 2,
        explanation: '`const square = x => x * x;` The parentheses around `x` are completely optional when there is exactly one parameter.'
      },
      {
        id: 'int_arrf_3',
        question: 'What is an "Implicit Return" in an arrow function?',
        options: ['When the function returns undefined', 'When you omit the curly braces `{}` and the `return` keyword, causing the expression to be evaluated and returned automatically', 'When the function returns a Promise', 'When you use the `yield` keyword'],
        correctIndex: 1,
        explanation: '`() => 5` implicitly returns 5. `() => { return 5; }` requires the explicit return because of the curly braces.'
      },
      {
        id: 'int_arrf_4',
        question: 'How do you implicitly return an Object literal from an arrow function?',
        options: ['() => { name: "Bob" }', '() => return { name: "Bob" }', '() => ({ name: "Bob" })', '() => Object(name: "Bob")'],
        correctIndex: 2,
        explanation: 'If you just write `() => {`, JS thinks you are opening a function body block, not an object. Wrapping the object in parentheses `({ ... })` fixes the ambiguity.'
      },
      {
        id: 'int_arrf_5',
        question: 'Do Arrow Functions have access to the special `arguments` object?',
        options: ['Yes', 'No, you should use Rest parameters `(...args)` instead', 'Only in strict mode', 'Only if they are inside a class'],
        correctIndex: 1,
        explanation: 'Arrow functions do not bind their own `arguments` object. The modern approach is to use `(...args) => { ... }` anyway.'
      },
      {
        id: 'int_arrf_6',
        question: 'Can you use the `new` keyword to create an object from an Arrow Function?',
        options: ['Yes', 'No, arrow functions cannot be used as constructors', 'Only if it returns an object', 'Yes, but it requires the `class` keyword'],
        correctIndex: 1,
        explanation: 'Because they lack their own `this` and don\'t have a `prototype` property, JS engines will throw a TypeError if you try to `new` an arrow function.'
      },
      {
        id: 'int_arrf_7',
        question: 'When should you AVOID using an arrow function?',
        options: ['In array methods like map()', 'When defining a method on an object literal that needs to access other properties on that object via `this`', 'In React components', 'When writing short callbacks'],
        correctIndex: 1,
        explanation: 'If you define `const user = { name: "Bob", greet: () => console.log(this.name) }`, `this` will NOT point to `user`, it will point to the global window!'
      },
      {
        id: 'int_arrf_8',
        question: 'Are Arrow Functions hoisted like standard function declarations?',
        options: ['Yes, fully hoisted', 'No, because they must be assigned to a variable (let/const), they obey the variable hoisting rules (Temporal Dead Zone)', 'Only if assigned with `var`', 'Yes, but they execute immediately'],
        correctIndex: 1,
        explanation: 'Standard `function foo() {}` is hoisted to the top. `const foo = () => {}` stays exactly where it is, preventing you from calling it before it is defined.'
      }
    ]
  },
  setMap: {
    id: 'setMap',
    title: 'Set & Map',
    tier: 'Intermediate',
    icon: '🗺️',
    color: 'hover:border-green-400',
    questions: [
      {
        id: 'int_sm_1',
        question: 'What is the primary characteristic of a Set in JavaScript?',
        options: ['It stores key-value pairs', 'It only stores strings', 'It stores a collection of completely UNIQUE values of any type', 'It sorts its items automatically'],
        correctIndex: 2,
        explanation: 'A Set automatically prevents duplicates. If you add "apple" twice, the Set will still only contain one "apple".'
      },
      {
        id: 'int_sm_2',
        question: 'How can you quickly remove all duplicate numbers from an array using a Set?',
        options: ['array.removeDuplicates()', 'new Set(array).toArray()', '[...new Set(array)]', 'Set.filter(array)'],
        correctIndex: 2,
        explanation: 'Passing the array into `new Set()` wipes duplicates instantly. Then, the Spread operator `[...]` unpacks the Set back into a standard array. A brilliant one-liner.'
      },
      {
        id: 'int_sm_3',
        question: 'Which method is used to check if a Set contains a specific value?',
        options: ['set.includes(val)', 'set.has(val)', 'set.contains(val)', 'set.find(val)'],
        correctIndex: 1,
        explanation: 'Unlike Arrays which use `includes()`, Sets use the extremely fast `has()` method for O(1) lookups.'
      },
      {
        id: 'int_sm_4',
        question: 'How is a Map different from a standard JavaScript Object?',
        options: ['Objects are faster', 'Map keys can be of ANY data type (including objects or functions), whereas Object keys must be Strings or Symbols', 'Maps only store numbers', 'Maps do not allow iteration'],
        correctIndex: 1,
        explanation: 'Standard objects cast all keys to strings (so obj[1] becomes obj["1"]). Maps maintain the exact type of the key, allowing you to use DOM nodes or other objects as keys!'
      },
      {
        id: 'int_sm_5',
        question: 'Which method retrieves a value from a Map?',
        options: ['map.value(key)', 'map[key]', 'map.get(key)', 'map.fetch(key)'],
        correctIndex: 2,
        explanation: 'You must use `map.get(key)` and `map.set(key, value)`. Using bracket notation (map[key]) will just attach a normal object property, breaking the Map mechanics.'
      },
      {
        id: 'int_sm_6',
        question: 'What property tells you how many items are in a Map or Set?',
        options: ['.length', '.count', '.size', '.amount'],
        correctIndex: 2,
        explanation: 'Unlike Arrays which use `.length`, Maps and Sets use the `.size` property.'
      },
      {
        id: 'int_sm_7',
        question: 'Does a Map guarantee the order of its items?',
        options: ['No, order is completely random', 'Yes, a Map iterates its elements in insertion order', 'It sorts them alphabetically', 'It sorts them by memory address'],
        correctIndex: 1,
        explanation: 'Unlike older JS objects (which had unpredictable property ordering), Maps explicitly guarantee that you will loop over items in the exact order they were inserted.'
      },
      {
        id: 'int_sm_8',
        question: 'What is a WeakMap?',
        options: ['A Map that deletes random items', 'A Map where the keys MUST be objects, and it doesn\'t prevent those objects from being garbage collected if nothing else references them', 'A Map limited to 10 items', 'A Map that cannot be iterated'],
        correctIndex: 1,
        explanation: 'WeakMaps are crucial for preventing memory leaks. If a DOM node used as a key in a WeakMap is removed from the document, the WeakMap automatically drops the entry.'
      }
    ]
  },
  asyncAwait: {
    id: 'asyncAwait',
    title: 'Async/Await',
    tier: 'Intermediate',
    icon: '⏳',
    color: 'hover:border-purple-600',
    questions: [
      {
        id: 'int_aa_1',
        question: 'What does the `async` keyword do when placed before a function declaration?',
        options: ['It makes the function run on a separate CPU thread', 'It forces the function to always return a Promise, automatically wrapping non-Promise returns', 'It pauses the entire browser', 'It disables error handling'],
        correctIndex: 1,
        explanation: 'Any function marked `async` is guaranteed to return a Promise. If you `return 5`, JS silently returns `Promise.resolve(5)`.'
      },
      {
        id: 'int_aa_2',
        question: 'What does the `await` keyword do?',
        options: ['It pauses the execution of the ASYNC function until the Promise resolves, then extracts the resolved value', 'It makes a loop run faster', 'It throws an error if a request takes too long', 'It forces synchronous functions to become asynchronous'],
        correctIndex: 0,
        explanation: '`await` unwraps a Promise. It lets you write async code that reads top-to-bottom like regular synchronous code, without chaining `.then()` callbacks.'
      },
      {
        id: 'int_aa_3',
        question: 'Where can you use the `await` keyword?',
        options: ['Anywhere in JavaScript', 'Only inside functions marked with `async` (and top-level modules in modern JS)', 'Only inside classes', 'Only inside try/catch blocks'],
        correctIndex: 1,
        explanation: 'You cannot use `await` inside a normal, synchronous function. The engine needs the `async` boundary to know it can pause the function without freezing the main thread.'
      },
      {
        id: 'int_aa_4',
        question: 'How do you handle errors in Async/Await code?',
        options: ['Using .catch() chains', 'Using a try...catch block around the awaited code', 'By returning false', 'Errors are automatically ignored'],
        correctIndex: 1,
        explanation: 'If a Promise is rejected and you `await` it, it throws a standard JavaScript exception. You catch it using a normal `try/catch` block.'
      },
      {
        id: 'int_aa_5',
        question: 'If you have two independent API calls, is it best to `await` them one after the other?',
        options: ['Yes, that is the safest way', 'No, you should use `Promise.all()` to fire them concurrently to save time', 'No, you cannot await twice in one function', 'Yes, otherwise they crash'],
        correctIndex: 1,
        explanation: 'Awaiting them sequentially means Request 2 doesn\'t even start until Request 1 finishes. `Promise.all([req1, req2])` fires them simultaneously, halving the wait time!'
      },
      {
        id: 'int_aa_6',
        question: 'What happens if you forget the `await` keyword before a function that returns a Promise?',
        options: ['The code crashes immediately', 'Your variable will hold the pending Promise object itself, not the resolved data', 'The Promise is cancelled', 'It waits anyway'],
        correctIndex: 1,
        explanation: '`const data = fetch()` results in `data` being a Promise. If you try to render `data.name`, it will fail because the data hasn\'t arrived yet.'
      },
      {
        id: 'int_aa_7',
        question: 'Can you use Async/Await with traditional callback-based APIs (like `fs.readFile` in Node)?',
        options: ['Yes, natively', 'No, you must first wrap the callback-based API in a Promise (e.g., using util.promisify)', 'Yes, by using the await-callback keyword', 'No, they are fundamentally incompatible'],
        correctIndex: 1,
        explanation: '`await` only understands Promises. To use it with old callbacks, you have to "promisify" the function first.'
      },
      {
        id: 'int_aa_8',
        question: 'Is Async/Await a completely new feature that replaces Promises?',
        options: ['Yes, Promises are deprecated', 'No, it is purely syntactic sugar built ON TOP of Promises', 'Yes, it uses Web Workers instead', 'No, it replaces Callbacks, not Promises'],
        correctIndex: 1,
        explanation: 'Under the hood, Async/Await IS Promises. It just hides the `.then()` and `.catch()` chains, making code infinitely more readable.'
      }
    ]
  },
  json: {
    id: 'json',
    title: 'JSON',
    tier: 'Intermediate',
    icon: '📝',
    color: 'hover:border-yellow-400',
    questions: [
      {
        id: 'int_json_1',
        question: 'What does JSON stand for?',
        options: ['JavaScript Object Notation', 'Java Standard Output Network', 'JavaScript Syntax Overlay Node', 'Joined String Object Network'],
        correctIndex: 0,
        explanation: 'JSON is a lightweight data-interchange format designed to be easily readable by humans and machines.'
      },
      {
        id: 'int_json_2',
        question: 'Which of the following is a strict rule of valid JSON syntax that differs from standard JavaScript objects?',
        options: ['Property names (keys) must be wrapped in double quotes', 'Numbers must be wrapped in quotes', 'Arrays are not allowed', 'Comments are allowed'],
        correctIndex: 0,
        explanation: 'In JS, `{ name: "Bob" }` is fine. In JSON, it MUST be `{ "name": "Bob" }`. Single quotes are also invalid.'
      },
      {
        id: 'int_json_3',
        question: 'Which JavaScript method converts a JavaScript Object into a JSON string?',
        options: ['JSON.parse()', 'JSON.toString()', 'JSON.stringify()', 'Object.toJSON()'],
        correctIndex: 2,
        explanation: '`JSON.stringify(obj)` takes your live memory object and serializes it into a flat string, ready to be sent over a network or saved to a file.'
      },
      {
        id: 'int_json_4',
        question: 'Which JavaScript method converts a JSON string back into a usable JavaScript Object?',
        options: ['JSON.parse()', 'JSON.objectify()', 'String.toJSON()', 'JSON.convert()'],
        correctIndex: 0,
        explanation: '`JSON.parse(string)` reads the string and reconstructs the data into memory as a real JS object or array.'
      },
      {
        id: 'int_json_5',
        question: 'What happens if you try to `JSON.stringify()` an object containing a function?',
        options: ['The function is converted to a string', 'It throws an error', 'The function is completely ignored and omitted from the JSON string', 'The function executes'],
        correctIndex: 2,
        explanation: 'JSON is purely for DATA. It has no concept of executable code. Functions, Symbols, and `undefined` are stripped out during stringification.'
      },
      {
        id: 'int_json_6',
        question: 'What happens if you pass invalid, malformed JSON to `JSON.parse()`?',
        options: ['It returns null', 'It returns an empty object', 'It throws a SyntaxError', 'It fixes the formatting automatically'],
        correctIndex: 2,
        explanation: 'It will crash your program with a SyntaxError. You should always wrap `JSON.parse()` in a `try/catch` block if you don\'t trust the source!'
      },
      {
        id: 'int_json_7',
        question: 'Which of the following data types is NOT supported in JSON?',
        options: ['String', 'Boolean', 'Date', 'Array'],
        correctIndex: 2,
        explanation: 'JSON has no native Date type. Dates are typically converted to ISO strings (like "2023-10-25T12:00:00Z") when stringified.'
      },
      {
        id: 'int_json_8',
        question: 'Can a JSON file have comments in it (e.g., `// Note here`)?',
        options: ['Yes, anywhere', 'Yes, but only at the top', 'No, the JSON specification explicitly forbids comments', 'Yes, using <!-- -->'],
        correctIndex: 2,
        explanation: 'JSON does not support comments. If you add a comment to a `.json` file, standard parsers will throw a syntax error.'
      }
    ]
  },
  regex: {
    id: 'regex',
    title: 'Regular Expressions',
    tier: 'Intermediate',
    icon: '🕵️',
    color: 'hover:border-red-600',
    questions: [
      {
        id: 'int_rx_1',
        question: 'What is a Regular Expression (Regex)?',
        options: ['A tool to write standard text', 'A sequence of characters that defines a search pattern, used for string matching and manipulation', 'A JavaScript framework', 'A math equation'],
        correctIndex: 1,
        explanation: 'Regex is an incredibly powerful, compact language used across all programming to find, validate, or replace text.'
      },
      {
        id: 'int_rx_2',
        question: 'How do you write a literal Regex pattern in JavaScript?',
        options: ['"pattern"', '[pattern]', '/pattern/', '{pattern}'],
        correctIndex: 2,
        explanation: 'Regex literals are enclosed in forward slashes. E.g., `/hello/`.'
      },
      {
        id: 'int_rx_3',
        question: 'What does the `i` flag do in `/hello/i`?',
        options: ['Ignores whitespace', 'Makes the search case-Insensitive', 'Iterates over the whole string', 'Inserts text'],
        correctIndex: 1,
        explanation: 'The `i` flag makes the regex match "hello", "HELLO", or "HeLlO" without caring about capitalization.'
      },
      {
        id: 'int_rx_4',
        question: 'What does the `g` flag do in `/hello/g`?',
        options: ['Global search: finds ALL matches rather than stopping after the first match', 'Groups results', 'Greedy search', 'Checks grammatical errors'],
        correctIndex: 0,
        explanation: 'Without `g`, methods like `replace()` will only replace the very first occurrence. With `g`, it replaces every match in the string.'
      },
      {
        id: 'int_rx_5',
        question: 'In Regex, what does the `.` (dot) character signify?',
        options: ['End of a sentence', 'A literal period', 'Matches any single character (except line breaks)', 'Matches empty spaces'],
        correctIndex: 2,
        explanation: 'The dot is a wildcard. `/h.t/` will match "hat", "hot", "hit", and "hzt". To match a literal period, you must escape it: `\\.`'
      },
      {
        id: 'int_rx_6',
        question: 'What does the `^` symbol signify in `/^hello/`?',
        options: ['Matches "hello" at the START of the string', 'Makes the text uppercase', 'Matches "hello" at the END of the string', 'Excludes the word "hello"'],
        correctIndex: 0,
        explanation: 'The caret `^` anchors the search to the beginning. (Conversely, the `$` anchors to the end: `/world$/`).'
      },
      {
        id: 'int_rx_7',
        question: 'What does `\\d` match?',
        options: ['A directory', 'A decimal point', 'Any digit (0-9)', 'Any letter'],
        correctIndex: 2,
        explanation: '`\\d` is shorthand for any number. `\\w` is for word characters (letters/numbers/underscores), and `\\s` is for whitespace.'
      },
      {
        id: 'int_rx_8',
        question: 'Which String method is used to extract an array of all matches?',
        options: ['string.match(/regex/)', 'string.test(/regex/)', 'string.search(/regex/)', 'string.find(/regex/)'],
        correctIndex: 0,
        explanation: '`match()` returns an array of the matches. If you only need a true/false boolean to see if a pattern exists, use the RegExp object\'s `test()` method instead!'
      }
    ]
  },
  tryCatch: {
    id: 'tryCatch',
    title: 'Try/Catch Error Handling',
    tier: 'Intermediate',
    icon: '🔥',
    color: 'hover:border-orange-600',
    questions: [
      {
        id: 'int_tc_1',
        question: 'What is the primary purpose of a `try...catch` block?',
        options: ['To speed up code execution', 'To handle exceptions gracefully so the program doesn\'t crash when an error occurs', 'To attempt an action repeatedly until it succeeds', 'To test for true/false conditions'],
        correctIndex: 1,
        explanation: 'When code inside `try` throws an error, execution immediately jumps to `catch`, allowing you to log the error and keep the app running.'
      },
      {
        id: 'int_tc_2',
        question: 'What happens to the remaining code inside the `try` block AFTER an error is thrown?',
        options: ['It executes normally', 'It executes but logs a warning', 'It is completely skipped', 'It retries once'],
        correctIndex: 2,
        explanation: 'The moment an error occurs, the `try` block halts. Any lines of code beneath the error in the `try` block will never execute.'
      },
      {
        id: 'int_tc_3',
        question: 'What is the `finally` block used for?',
        options: ['To completely exit the application', 'Code that executes REGARDLESS of whether an error was thrown or not, used for cleanup', 'To catch syntax errors', 'To retry the try block'],
        correctIndex: 1,
        explanation: '`finally` is perfect for hiding loading spinners or closing database connections, because you know it will ALWAYS run.'
      },
      {
        id: 'int_tc_4',
        question: 'How do you manually trigger an error in JavaScript?',
        options: ['error("message")', 'raise Error("message")', 'throw new Error("message")', 'stop("message")'],
        correctIndex: 2,
        explanation: 'The `throw` keyword generates an exception. Using `new Error()` is best practice because it generates a helpful stack trace.'
      },
      {
        id: 'int_tc_5',
        question: 'Will `try...catch` catch Syntax Errors (like missing a curly brace)?',
        options: ['Yes, always', 'No, syntax errors prevent the code from even compiling/parsing, so it crashes before the try block can run', 'Only in strict mode', 'Yes, but only in Node.js'],
        correctIndex: 1,
        explanation: 'Try/Catch handles RUNTIME errors. Syntax errors are PARSE TIME errors, meaning the engine gives up before executing a single line of your code.'
      },
      {
        id: 'int_tc_6',
        question: 'Will `try...catch` catch errors thrown inside an asynchronous `setTimeout` callback?',
        options: ['Yes', 'No, the asynchronous callback executes later in a different context, completely outside the try/catch block', 'Only if you use finally', 'Only in the browser'],
        correctIndex: 1,
        explanation: 'By the time `setTimeout` fires, the `try/catch` has already finished executing. (Note: Async/Await DOES allow try/catch to work with async code!)'
      },
      {
        id: 'int_tc_7',
        question: 'What does the `catch` block receive as an argument?',
        options: ['A boolean', 'An Error object containing details like the message and stack trace', 'The line of code that failed', 'Nothing'],
        correctIndex: 1,
        explanation: '`catch(err) { ... }` receives the exception object that was thrown, allowing you to read `err.message` to figure out what went wrong.'
      },
      {
        id: 'int_tc_8',
        question: 'What is "swallowing" an error?',
        options: ['Writing an empty `catch(e) {}` block that silently ignores the error', 'Fixing the bug quickly', 'Returning false instead of throwing', 'Logging the error to a file'],
        correctIndex: 0,
        explanation: 'Swallowing errors is generally a terrible practice. It makes debugging nearly impossible because the app breaks silently with no logs.'
      }
    ]
  },
  modules: {
    id: 'modules',
    title: 'Modules & Imports',
    tier: 'Intermediate',
    icon: '📦',
    color: 'hover:border-zinc-400',
    questions: [
      {
        id: 'int_mod_1',
        question: 'Why do we use modules in JavaScript?',
        options: ['To make the website load faster', 'To split code into separate, reusable files, maintaining clean architecture and avoiding global namespace pollution', 'To add CSS to JS', 'To bypass security'],
        correctIndex: 1,
        explanation: 'Before modules, all JS scripts shared the same global scope, causing variables to accidentally overwrite each other and creating massive, unreadable files.'
      },
      {
        id: 'int_mod_2',
        question: 'In ES Modules, how do you make a function available to be used in other files?',
        options: ['public function()', 'module.exports = function', 'export function()', 'share function()'],
        correctIndex: 2,
        explanation: 'The `export` keyword exposes a variable, function, or class so other files can `import` it.'
      },
      {
        id: 'int_mod_3',
        question: 'What is the difference between a Default Export and a Named Export?',
        options: ['Named exports can only be strings', 'A file can only have ONE default export, but multiple named exports', 'Default exports are faster', 'There is no difference'],
        correctIndex: 1,
        explanation: '`export default App` allows the importer to name the import whatever they want. `export const Utils` requires the importer to use the exact name in curly braces `{ Utils }`.'
      },
      {
        id: 'int_mod_4',
        question: 'How do you import a named export called "calculate" from "math.js"?',
        options: ['import calculate from "./math.js"', 'import { calculate } from "./math.js"', 'require("calculate", "./math.js")', 'include calculate "./math.js"'],
        correctIndex: 1,
        explanation: 'Named exports must be imported using destructuring curly braces, matching the exported name.'
      },
      {
        id: 'int_mod_5',
        question: 'What is the older module system primarily used by Node.js before ES Modules were standard?',
        options: ['AMD', 'UMD', 'CommonJS (require / module.exports)', 'SystemJS'],
        correctIndex: 2,
        explanation: 'Node.js used CommonJS (`const fs = require("fs")`) for years. The JS ecosystem is currently transitioning everything to modern ES Modules (`import`).'
      },
      {
        id: 'int_mod_6',
        question: 'How can you rename a named import to avoid naming conflicts?',
        options: ['import { calc: newCalc } from "./math.js"', 'import { calc as newCalc } from "./math.js"', 'import newCalc from "./math.js"', 'import calc -> newCalc from "./math.js"'],
        correctIndex: 1,
        explanation: 'The `as` keyword allows you to alias imports. Useful if you import two functions both named `fetchData` from different files!'
      },
      {
        id: 'int_mod_7',
        question: 'What does `import * as Utils from "./utils.js"` do?',
        options: ['Imports everything into the global scope', 'Causes an error', 'Imports all exported members from the file and groups them under a single "Utils" object', 'Imports only the default export'],
        correctIndex: 2,
        explanation: 'This is a namespace import. You can then access specific functions via `Utils.calculate()` or `Utils.formatDate()`.'
      },
      {
        id: 'int_mod_8',
        question: 'In standard HTML, how do you tell the browser that a script file uses ES Modules?',
        options: ['<script src="app.js" module="true">', '<script src="app.js" type="module">', '<script src="app.js" import="enabled">', '<module src="app.js">'],
        correctIndex: 1,
        explanation: 'Setting `type="module"` tells the browser to defer the script, apply strict mode automatically, and enable the `import/export` syntax.'
      }
    ]
  },
  localStorage: {
    id: 'localStorage',
    title: 'Local Storage',
    tier: 'Intermediate',
    icon: '💾',
    color: 'hover:border-yellow-600',
    questions: [
      {
        id: 'int_ls_1',
        question: 'What is the purpose of localStorage in the browser?',
        options: ['To store data permanently on the server', 'To save key-value data directly in the user\'s browser that persists even after closing the tab or restarting the computer', 'To cache images', 'To securely store passwords'],
        correctIndex: 1,
        explanation: 'localStorage provides roughly 5MB of persistent storage on the client side, perfect for saving user preferences (like dark mode) or shopping cart drafts.'
      },
      {
        id: 'int_ls_2',
        question: 'What data type MUST you use when saving to localStorage?',
        options: ['Objects', 'Arrays', 'Strings only', 'Binary data'],
        correctIndex: 2,
        explanation: 'localStorage only accepts Strings. If you try to pass an object, it will convert it to the useless string `"[object Object]"`.'
      },
      {
        id: 'int_ls_3',
        question: 'How do you correctly save a JavaScript object to localStorage?',
        options: ['localStorage.setItem("user", user)', 'localStorage.setItem("user", JSON.stringify(user))', 'localStorage.save("user", user.toString())', 'localStorage.push(user)'],
        correctIndex: 1,
        explanation: 'Because it only accepts strings, you MUST serialize your objects with `JSON.stringify()` before saving.'
      },
      {
        id: 'int_ls_4',
        question: 'How do you retrieve data from localStorage?',
        options: ['localStorage.getItem("key")', 'localStorage.fetch("key")', 'localStorage.key', 'localStorage.read("key")'],
        correctIndex: 0,
        explanation: '`getItem` fetches the string. Don\'t forget to use `JSON.parse()` if you saved an object!'
      },
      {
        id: 'int_ls_5',
        question: 'What happens if you use `getItem` for a key that does not exist?',
        options: ['It throws an error', 'It returns undefined', 'It returns null', 'It returns an empty string'],
        correctIndex: 2,
        explanation: 'It safely returns `null`. This makes it easy to check: `if (!localStorage.getItem("token")) { // log in again }`.'
      },
      {
        id: 'int_ls_6',
        question: 'What is the difference between localStorage and sessionStorage?',
        options: ['sessionStorage is larger', 'sessionStorage is cleared the moment the user closes the specific browser tab; localStorage persists indefinitely', 'sessionStorage is stored on the server', 'There is no difference'],
        correctIndex: 1,
        explanation: 'sessionStorage is great for sensitive workflows (like a multi-page banking form) that should be wiped clean when the user closes the window.'
      },
      {
        id: 'int_ls_7',
        question: 'Is localStorage secure from cross-site scripting (XSS) attacks?',
        options: ['Yes, fully secure', 'No, any malicious JavaScript executing on the page can easily read everything in localStorage', 'Only if using HTTPS', 'Only if encrypted'],
        correctIndex: 1,
        explanation: 'localStorage is completely exposed to JS. Never store highly sensitive data (like unencrypted JWT tokens or passwords) in localStorage if you can avoid it.'
      },
      {
        id: 'int_ls_8',
        question: 'How do you clear EVERYTHING out of localStorage for your domain?',
        options: ['localStorage.delete()', 'localStorage.wipe()', 'localStorage.clear()', 'localStorage.reset()'],
        correctIndex: 2,
        explanation: '`clear()` instantly nukes all stored key-value pairs for the origin. `removeItem("key")` deletes just a specific entry.'
      }
    ]
  }
};
