export type Difficulty = 'Beginner' | 'Intermediate' | 'Expert';

export interface TestCase {
  input: unknown[];
  expected: unknown;
}

export interface Problem {
  id: string;
  title: string;
  level: string;
  difficulty: Difficulty;
  description: string;
  starterCode: string;
  testCases: TestCase[];
  miniQuizQuestion?: {
    question: string;
    options: string[];
    correctAnswerIndex: number;
  };
}

// 1. Define our handful of real, hand-crafted problems
const handCraftedProblems: Record<string, Partial<Problem>> = {
  "beginner-1": {
    title: "Level 1: Add Two Numbers",
    description: `Given two numbers \`a\` and \`b\`, return their sum.

**Example:**
\`\`\`
Input: a = 2, b = 3
Output: 5
\`\`\`
`,
    starterCode: `function addNumbers(a, b) {
  // Write your code here
  
}`,
    testCases: [
      { input: [2, 3], expected: 5 },
      { input: [-1, 5], expected: 4 }
    ]
  },
  "beginner-2": {
    title: "Level 2: String Length",
    description: `Given a string \`str\`, return the number of characters in it.

**Example:**
\`\`\`
Input: str = "hello"
Output: 5
\`\`\`
`,
    starterCode: `function getStringLength(str) {
  // Write your code here
  
}`,
    testCases: [
      { input: ["hello"], expected: 5 },
      { input: [""], expected: 0 },
      { input: ["coding"], expected: 6 }
    ]
  },
  "beginner-3": {
    title: "Level 3: Is Even?",
    description: `Given an integer \`n\`, return \`true\` if it is an even number, otherwise return \`false\`.

**Example:**
\`\`\`
Input: n = 4
Output: true
\`\`\`
`,
    starterCode: `function isEven(n) {
  // Write your code here
  
}`,
    testCases: [
      { input: [4], expected: true },
      { input: [7], expected: false }
    ]
  },
  "beginner-4": {
    title: "Level 4: Multiply by Ten",
    description: `Given a number \`n\`, return the result of multiplying it by 10.`,
    starterCode: `function multiplyByTen(n) {
  // Write your code here
  
}`,
    testCases: [
      { input: [5], expected: 50 },
      { input: [0], expected: 0 }
    ]
  },
  "beginner-5": {
    title: "Level 5: Fizz Buzz",
    description: `Given an integer \`n\`, return a string array \`answer\` (1-indexed) where:
- \`answer[i] == "FizzBuzz"\` if \`i\` is divisible by 3 and 5.
- \`answer[i] == "Fizz"\` if \`i\` is divisible by 3.
- \`answer[i] == "Buzz"\` if \`i\` is divisible by 5.
- \`answer[i] == i\` (as a string) if none of the above.`,
    starterCode: `function fizzBuzz(n) {
  // Write your code here
  
}`,
    testCases: [
      { input: [3], expected: ["1", "2", "Fizz"] },
      { input: [5], expected: ["1", "2", "Fizz", "4", "Buzz"] }
    ]
  },
  "intermediate-1": {
    title: "Level 1: Reverse String",
    description: `Write a function that reverses a string (given as an array of characters).`,
    starterCode: `function reverseString(s) {
  // Write your code here
  
}`,
    testCases: [
      { input: [["h","e","l","l","o"]], expected: ["o","l","l","e","h"] }
    ]
  },
  "intermediate-2": {
    title: "Level 2: Valid Palindrome",
    description: `Given a string \`s\`, return \`true\` if it is a palindrome, or \`false\` otherwise.`,
    starterCode: `function isPalindrome(s) {
  // Write your code here
  
}`,
    testCases: [
      { input: ["A man, a plan, a canal: Panama"], expected: true },
      { input: ["race a car"], expected: false }
    ]
  },
  "expert-1": {
    title: "Level 1: Fibonacci Number",
    description: `Given \`n\`, calculate \`F(n)\`.`,
    starterCode: `function fib(n) {
  // Write your code here
  
}`,
    testCases: [
      { input: [2], expected: 1 },
      { input: [4], expected: 3 }
    ]
  }
};

// 2. Procedurally generate exactly 100 levels for each difficulty category
export const problems: Problem[] = [];

const categories: Difficulty[] = ['Beginner', 'Intermediate', 'Expert'];

categories.forEach(difficulty => {
  const categoryPrefix = difficulty.toLowerCase();
  
  for (let i = 1; i <= 100; i++) {
    const id = `${categoryPrefix}-${i}`;
    const handCrafted = handCraftedProblems[id];
    
    if (handCrafted) {
      problems.push({
        id,
        level: `Level ${i}`,
        difficulty,
        title: handCrafted.title!,
        description: handCrafted.description!,
        starterCode: handCrafted.starterCode!,
        testCases: handCrafted.testCases!
      });
    } else if (i % 10 === 0) {
      // Boss Battles
      if (difficulty === 'Beginner') {
        problems.push({
          id,
          level: `Level ${i} Boss`,
          difficulty,
          title: `Level ${i}: Calculator Application`,
          description: `**Boss Battle!** Build a simple Calculator class.\\n\\nImplement the \`Calculator\` class with the following methods:\\n- \`add(n)\`: adds \`n\` to the internal value.\\n- \`subtract(n)\`: subtracts \`n\` from the internal value.\\n- \`getValue()\`: returns the current internal value (starts at 0).`,
          starterCode: `function runCalculator(operations) {\n  const calc = new Calculator();\n  for (const op of operations) {\n    if (op[0] === 'add') calc.add(op[1]);\n    if (op[0] === 'subtract') calc.subtract(op[1]);\n  }\n  return calc.getValue();\n}\n\nclass Calculator {\n  constructor() {\n    this.value = 0;\n  }\n  // Write your methods here!\n  \n}`,
          testCases: [
            { input: [[['add', 10], ['subtract', 3]]], expected: 7 },
            { input: [[['add', 5], ['add', 15], ['subtract', 10]]], expected: 10 }
          ],
          miniQuizQuestion: {
            question: "What does the constructor function do in a Class?",
            options: ["It destroys the class", "It initializes the object instance", "It runs forever", "It returns a string"],
            correctAnswerIndex: 1
          }
        });
      } else if (difficulty === 'Intermediate') {
        problems.push({
          id,
          level: `Level ${i} Boss`,
          difficulty,
          title: `Level ${i}: Todo List Application`,
          description: `**Boss Battle!** Build a Todo List manager.\\n\\nImplement the \`TodoList\` class with:\\n- \`add(task)\`: adds a string to the list.\\n- \`remove(task)\`: removes the exact string from the list.\\n- \`getItems()\`: returns an array of all current tasks.`,
          starterCode: `function runTodoList(commands) {\n  const todo = new TodoList();\n  for (const cmd of commands) {\n    if (cmd[0] === 'add') todo.add(cmd[1]);\n    if (cmd[0] === 'remove') todo.remove(cmd[1]);\n  }\n  return todo.getItems();\n}\n\nclass TodoList {\n  // Implement your class here!\n  \n}`,
          testCases: [
            { input: [[['add', 'apple'], ['add', 'banana'], ['remove', 'apple']]], expected: ['banana'] },
            { input: [[['add', 'code'], ['add', 'sleep']]], expected: ['code', 'sleep'] }
          ],
          miniQuizQuestion: {
            question: "What array method removes a specific element from the array based on its index?",
            options: ["push()", "splice()", "pop()", "join()"],
            correctAnswerIndex: 1
          }
        });
      } else {
        problems.push({
          id,
          level: `Level ${i} Boss`,
          difficulty,
          title: `Level ${i}: Key-Value Database`,
          description: `**Boss Battle!** Build an In-Memory Database.\\n\\nImplement the \`SimpleDB\` class with:\\n- \`set(key, val)\`: stores the value.\\n- \`get(key)\`: returns the value, or null if it doesn't exist.\\n- \`delete(key)\`: removes the key.`,
          starterCode: `function runDB(commands) {\n  const db = new SimpleDB();\n  let results = [];\n  for (const cmd of commands) {\n    if (cmd[0] === 'set') db.set(cmd[1], cmd[2]);\n    if (cmd[0] === 'get') results.push(db.get(cmd[1]));\n    if (cmd[0] === 'delete') db.delete(cmd[1]);\n  }\n  return results;\n}\n\nclass SimpleDB {\n  // Implement your class here!\n  \n}`,
          testCases: [
            { input: [[['set', 'a', 1], ['get', 'a'], ['delete', 'a'], ['get', 'a']]], expected: [1, null] }
          ],
          miniQuizQuestion: {
            question: "What is the Time Complexity of retrieving a value from an In-Memory Database (Hash Map)?",
            options: ["O(n)", "O(log n)", "O(1) Constant Time", "O(n^2)"],
            correctAnswerIndex: 2
          }
        });
      }
    } else {
      // Standard scaled placeholders
      if (difficulty === 'Beginner') {
        problems.push({
          id,
          level: `Level ${i}`,
          difficulty,
          title: `Level ${i}: Basic Math`,
          description: `This is a basic ${difficulty} challenge for Level ${i}.\\n\\nGiven a number \`n\`, return \`n + ${i}\`.`,
          starterCode: `function solveLevel${i}(n) {\n  // Return n + ${i}\n  \n}`,
          testCases: [ { input: [10], expected: 10 + i }, { input: [0], expected: i } ],
          miniQuizQuestion: {
            question: `What is the expected return value for this level?`,
            options: ["A String", "A Number", "An Array", "Undefined"],
            correctAnswerIndex: 1
          }
        });
      } else if (difficulty === 'Intermediate') {
        problems.push({
          id,
          level: `Level ${i}`,
          difficulty,
          title: `Level ${i}: Array Mapping`,
          description: `This is an intermediate challenge for Level ${i}.\\n\\nGiven an array of numbers, return a new array where every number is multiplied by \`${i}\`.`,
          starterCode: `function solveLevel${i}(arr) {\n  // Return mapped array\n  \n}`,
          testCases: [ { input: [[1, 2, 3]], expected: [1 * i, 2 * i, 3 * i] } ],
          miniQuizQuestion: {
            question: `Which array method is best suited for multiplying every element and returning a new array?`,
            options: ["forEach()", "filter()", "map()", "reduce()"],
            correctAnswerIndex: 2
          }
        });
      } else {
        problems.push({
          id,
          level: `Level ${i}`,
          difficulty,
          title: `Level ${i}: Advanced Logic`,
          description: `This is an expert challenge for Level ${i}.\\n\\nGiven a number \`n\`, return \`n * ${i * i}\`.`,
          starterCode: `function solveLevel${i}(n) {\n  // Write your logic here\n  \n}`,
          testCases: [ { input: [2], expected: 2 * (i * i) }, { input: [5], expected: 5 * (i * i) } ],
          miniQuizQuestion: {
            question: `If you wanted to do this recursively, what would you need?`,
            options: ["A Base Case to stop the recursion", "A while loop", "A switch statement", "You can't do this recursively"],
            correctAnswerIndex: 0
          }
        });
      }
    }
  }
});
