// agent-notes: { ctx: "Expert C language lessons covering double pointers, function pointers, and macros", deps: ["./types"], state: "active", last: "sato@2026-10-31" }
import { Lesson } from './types';

export const cExpertLessons: Lesson[] = [
  {
    id: 21,
    chapter: "Chapter 3: Advanced Memory",
    tier: "Expert",
    title: "Double Pointers",
    sticker: "🪞",
    codeExample: "#include <stdio.h>\n\nint main() {\n    int val = 10;\n    int *ptr = &val;\n    int **pptr = &ptr;\n    printf(\"%d\\n\", **pptr);\n    return 0;\n}",
    expectedOutput: "10",
    gifKeyword: "mirror",
    miniQuizQuestion: {
      question: "What does `int **pptr` declare?",
      options: ["A pointer to a pointer", "An array of pointers", "A 2D array", "A syntax error"],
      correctAnswerIndex: 0
    },
    biteSized: {
      meaning: "A pointer that points to another pointer.",
      funnyEgTamil: "Cinema twist maari: oru locker kulla innoru locker-oda key irukku, andha second locker-la thaan un cash-e irukku!",
      funnyEgGeneral: "Inception, but for computer memory: an address of another address."
    }
  },
  {
    id: 22,
    chapter: "Chapter 3: Advanced Concepts",
    tier: "Expert",
    title: "Function Pointers",
    sticker: "🎯",
    codeExample: "#include <stdio.h>\n\nvoid sayHello() { printf(\"Hello!\\n\"); }\n\nint main() {\n    void (*funcPtr)() = sayHello;\n    funcPtr();\n    return 0;\n}",
    expectedOutput: "Hello!",
    gifKeyword: "magic",
    miniQuizQuestion: {
      question: "How do you call a function using a function pointer `fp`?",
      options: ["fp();", "call(fp);", "*fp();", "fp->();"],
      correctAnswerIndex: 0
    },
    biteSized: {
      meaning: "Storing the address of a function so you can execute it dynamically.",
      funnyEgTamil: "Direct-ah velai seiyyaama, 'Nee avana koopidu' nu function address-ah pass panni execute panra manager vela maari!",
      funnyEgGeneral: "Giving someone the remote control instead of pushing the TV buttons yourself."
    }
  },
  {
    id: 23,
    chapter: "Chapter 3: Preprocessor",
    tier: "Expert",
    title: "Macros",
    sticker: "🖨️",
    codeExample: "#include <stdio.h>\n#define SQUARE(x) ((x) * (x))\n\nint main() {\n    printf(\"%d\\n\", SQUARE(5));\n    return 0;\n}",
    expectedOutput: "25",
    gifKeyword: "print",
    miniQuizQuestion: {
      question: "Why should you use parentheses around macro arguments?",
      options: ["To prevent compilation errors", "To handle operator precedence correctly", "Because it is required syntax", "To make it faster"],
      correctAnswerIndex: 1
    },
    biteSized: {
      meaning: "A macro is a fragment of code given a name, processed before compilation.",
      funnyEgTamil: "Preprocessor oru blind xerox machine maari. Parenthesis () poda marandhaa, calculation ellam Vadivelu comedy maari ulta aaidum!",
      funnyEgGeneral: "Copy-pasting with find-and-replace, but automated before the compiler wakes up."
    }
  }
];
