import { Lesson } from './types';

export const cppBeginnerLessons: Lesson[] = [
  {
    id: 1,
    chapter: "Chapter 1: The Absolute Basics",
    tier: "Beginner",
    title: "Variables and cout",
    sticker: "📦",
    codeExample: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int slices = 4;\n    cout << \"I ate \" << slices << \" slices of pizza!\" << endl;\n    return 0;\n}",
    expectedOutput: "I ate 4 slices of pizza!",
    gifKeyword: "eating pizza",
    miniQuizQuestion: {
      question: "Which operator is used with cout to output data?",
      options: [">>", "<<", "::", "++"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "Output string", code: "cout << \"Hello\";" },
      { explanation: "Output variable", code: "int x = 5; cout << x;" }
    ],
    verificationChecks: [
      {
        type: "requires_syntax",
        pattern: "cout",
        expectedMessage: "You need to use 'cout' to output text in C++."
      }
    ],
    biteSized: {
      meaning: "cout is the standard output stream in C++.",
      meaningGeneral: "Used to print text to the console.",
      funnyEgTamil: "cout potta dhaan screen la theriyum.",
      funnyEgGeneral: "cout is your megaphone to the world."
    }
  },
  {
    id: 2,
    chapter: "Chapter 1: The Absolute Basics",
    tier: "Beginner",
    title: "Strings in C++",
    sticker: "📜",
    codeExample: "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string name = \"C++ Master\";\n    cout << \"Hello, \" << name << \"!\" << endl;\n    return 0;\n}",
    expectedOutput: "Hello, C++ Master!",
    gifKeyword: "typing fast",
    miniQuizQuestion: {
      question: "Which header file is typically included to use the string class?",
      options: ["<iostream>", "<string>", "<stdlib.h>", "<math.h>"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "String declaration", code: "string obj = \"Car\";" }
    ],
    verificationChecks: [
      {
        type: "requires_syntax",
        pattern: "string",
        expectedMessage: "Make sure you declare a 'string' variable."
      }
    ],
    biteSized: {
      meaning: "string is a standard class in C++.",
      meaningGeneral: "Easier than C char arrays.",
      funnyEgTamil: "String use panna tension illa.",
      funnyEgGeneral: "Strings make text handling easy."
    }
  },
  {
    id: 3,
    chapter: "Chapter 2: Logic",
    tier: "Beginner",
    title: "If/Else Statements",
    sticker: "🔀",
    codeExample: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int health = 0;\n    if (health > 0) {\n        cout << \"Alive!\" << endl;\n    } else {\n        cout << \"Game Over!\" << endl;\n    }\n    return 0;\n}",
    expectedOutput: "Game Over!",
    gifKeyword: "game over",
    miniQuizQuestion: {
      question: "What is printed if health is 0?",
      options: ["Alive!", "Game Over!", "Nothing", "Error"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "Basic if", code: "if (x > 0) cout << \"Positive\";" }
    ],
    verificationChecks: [
      {
        type: "requires_syntax",
        pattern: "if\\s*\\(",
        expectedMessage: "You need an 'if' statement."
      }
    ],
    biteSized: {
      meaning: "Conditions decide the flow.",
      meaningGeneral: "If the condition is true, do this. Else, do that.",
      funnyEgTamil: "Pass aana briyani, fail aana adi.",
      funnyEgGeneral: "If good grades -> video games. Else -> grounded."
    }
  }
];
