import { Lesson } from './types';

export const cBeginnerLessons: Lesson[] = [
  {
    id: 1,
    chapter: "Chapter 1: The Absolute Basics",
    tier: "Beginner",
    title: "Variables and Printf",
    sticker: "📦",
    codeExample: "#include <stdio.h>\n\nint main() {\n    int biryaniCount = 2;\n    printf(\"I ate %d biryanis!\\n\", biryaniCount);\n    return 0;\n}",
    expectedOutput: "I ate 2 biryanis!",
    gifKeyword: "eating food",
    miniQuizQuestion: {
      question: "Which function is used to print output to the console in C?",
      options: ["console.log()", "print()", "printf()", "System.out.println()"],
      correctAnswerIndex: 2
    },
    examples: [
      { explanation: "Declare an integer", code: "int age = 25;" },
      { explanation: "Print it out", code: "printf(\"Age is %d\", age);" }
    ],
    verificationChecks: [
      {
        type: "requires_syntax",
        pattern: "printf",
        expectedMessage: "You need to use 'printf' to output text in C."
      }
    ],
    biteSized: {
      meaning: "C is a low-level language. 'printf' is how you speak to the world.",
      meaningGeneral: "printf is the standard output function in C.",
      funnyEgTamil: "printf pottu output varla na romba kashtam!",
      funnyEgGeneral: "If printf doesn't work, nothing works."
    }
  },
  {
    id: 2,
    chapter: "Chapter 1: The Absolute Basics",
    tier: "Beginner",
    title: "Data Types",
    sticker: "📊",
    codeExample: "#include <stdio.h>\n\nint main() {\n    int age = 22;\n    float weight = 65.5;\n    char grade = 'A';\n    printf(\"Age: %d, Weight: %.1f, Grade: %c\\n\", age, weight, grade);\n    return 0;\n}",
    expectedOutput: "Age: 22, Weight: 65.5, Grade: A",
    gifKeyword: "confused math",
    miniQuizQuestion: {
      question: "Which data type is used for a single letter in C?",
      options: ["String", "char", "letter", "varchar"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "Integer", code: "int x = 10;" },
      { explanation: "Float", code: "float pi = 3.14;" },
      { explanation: "Char", code: "char c = 'Z';" }
    ],
    verificationChecks: [
      {
        type: "requires_syntax",
        pattern: "char",
        expectedMessage: "Make sure you declare a 'char' variable."
      }
    ],
    biteSized: {
      meaning: "int for numbers, float for decimals, char for letters.",
      meaningGeneral: "Variables need strict types in C.",
      funnyEgTamil: "Type solli thaan dabba vaanga mudiyum.",
      funnyEgGeneral: "You must label your boxes before using them."
    }
  },
  {
    id: 3,
    chapter: "Chapter 2: Logic",
    tier: "Beginner",
    title: "If/Else Statements",
    sticker: "🔀",
    codeExample: "#include <stdio.h>\n\nint main() {\n    int marks = 40;\n    if (marks >= 35) {\n        printf(\"Pass!\\n\");\n    } else {\n        printf(\"Fail!\\n\");\n    }\n    return 0;\n}",
    expectedOutput: "Pass!",
    gifKeyword: "success",
    miniQuizQuestion: {
      question: "What is the condition enclosed in?",
      options: ["{}", "[]", "()", "<>"],
      correctAnswerIndex: 2
    },
    examples: [
      { explanation: "Basic if", code: "if (x > 0) printf(\"Positive\");" }
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
