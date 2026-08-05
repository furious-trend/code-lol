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
  ]
};
