import { Lesson } from './types';

export const cInterviewLessons: Lesson[] = [
  {
    id: 31,
    chapter: "Chapter 4: Interview Prep",
    tier: "Interview",
    title: "Bitwise Operators",
    sticker: "🔢",
    codeExample: "#include <stdio.h>\n\nint main() {\n    int a = 5; // 0101\n    int b = 3; // 0011\n    printf(\"%d\\n\", a & b);\n    return 0;\n}",
    expectedOutput: "1",
    gifKeyword: "hacker",
    miniQuizQuestion: {
      question: "What is 5 & 3?",
      options: ["1", "7", "8", "15"],
      correctAnswerIndex: 0
    },
    biteSized: {
      meaning: "Manipulating individual bits directly.",
      funnyEgTamil: "Tamil version of: " + "Flipping light switches on and off super fast.",
      funnyEgGeneral: "Flipping light switches on and off super fast."
    }
  },
  {
    id: 32,
    chapter: "Chapter 4: Interview Prep",
    tier: "Interview",
    title: "Linked Lists",
    sticker: "🔗",
    codeExample: "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node { int data; struct Node* next; };\n\nint main() {\n    struct Node* head = (struct Node*)malloc(sizeof(struct Node));\n    head->data = 1; head->next = NULL;\n    printf(\"%d\\n\", head->data);\n    return 0;\n}",
    expectedOutput: "1",
    gifKeyword: "chain",
    miniQuizQuestion: {
      question: "What does the last node of a linked list point to?",
      options: ["The first node", "NULL", "Itself", "Memory address 0x1"],
      correctAnswerIndex: 1
    },
    biteSized: {
      meaning: "A linear data structure where elements are not stored in contiguous memory.",
      funnyEgTamil: "Tamil version of: " + "A treasure hunt where each clue tells you where the next clue is.",
      funnyEgGeneral: "A treasure hunt where each clue tells you where the next clue is."
    }
  },
  {
    id: 33,
    chapter: "Chapter 4: Interview Prep",
    tier: "Interview",
    title: "Memory Leaks",
    sticker: "💧",
    codeExample: "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int *ptr = (int*)malloc(sizeof(int));\n    *ptr = 100;\n    // Oh no, we forgot free(ptr)!\n    printf(\"Memory leaked!\\n\");\n    return 0;\n}",
    expectedOutput: "Memory leaked!",
    gifKeyword: "leak",
    miniQuizQuestion: {
      question: "How do you prevent a memory leak in C?",
      options: ["Always use global variables", "Use the garbage collector", "Call free() on dynamically allocated memory", "Close the file"],
      correctAnswerIndex: 2
    },
    biteSized: {
      meaning: "When allocated memory is never released back to the system.",
      funnyEgTamil: "Tamil version of: " + "Leaving the water running in the sink.",
      funnyEgGeneral: "Leaving the water running in the sink."
    }
  }
];