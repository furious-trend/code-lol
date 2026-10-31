// agent-notes: { ctx: "Interview prep C language lessons covering bitwise manipulation, linked lists, and memory leaks", deps: ["./types"], state: "active", last: "sato@2026-10-31" }
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
      question: "What is 5 & 3 in binary arithmetic?",
      options: ["1", "7", "8", "15"],
      correctAnswerIndex: 0
    },
    biteSized: {
      meaning: "Manipulating individual bits directly at the silicon level.",
      funnyEgTamil: "Kadaisi bench la irundhu switch board-la irukkura switches-ah lightning speed-la on-off panra hacker feel idhu!",
      funnyEgGeneral: "Flipping light switches on and off super fast inside CPU registers."
    }
  },
  {
    id: 32,
    chapter: "Chapter 4: Interview Prep",
    tier: "Interview",
    title: "Linked Lists",
    sticker: "🔗",
    codeExample: "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node { int data; struct Node* next; };\n\nint main() {\n    struct Node* head = (struct Node*)malloc(sizeof(struct Node));\n    head->data = 1; head->next = NULL;\n    printf(\"%d\\n\", head->data);\n    free(head);\n    return 0;\n}",
    expectedOutput: "1",
    gifKeyword: "chain",
    miniQuizQuestion: {
      question: "What does the last node of a linked list point to?",
      options: ["The first node", "NULL", "Itself", "Memory address 0x1"],
      correctAnswerIndex: 1
    },
    biteSized: {
      meaning: "A linear data structure where elements are connected by pointers instead of contiguous memory.",
      funnyEgTamil: "Treasure hunt game maari: ovvoru clue kitta innoru clue-oda location irukkum, kadaisi clue-la NULL nu ezhudhi irukkum!",
      funnyEgGeneral: "A treasure hunt where each clue tells you where the next clue is."
    }
  },
  {
    id: 33,
    chapter: "Chapter 4: Interview Prep",
    tier: "Interview",
    title: "Memory Leaks",
    sticker: "💧",
    codeExample: "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int *ptr = (int*)malloc(sizeof(int));\n    *ptr = 100;\n    // Properly free dynamically allocated memory:\n    free(ptr);\n    printf(\"Clean memory!\\n\");\n    return 0;\n}",
    expectedOutput: "Clean memory!",
    gifKeyword: "leak",
    miniQuizQuestion: {
      question: "How do you prevent a memory leak in C?",
      options: ["Always use global variables", "Use the garbage collector", "Call free() on dynamically allocated memory", "Close the terminal"],
      correctAnswerIndex: 2
    },
    biteSized: {
      meaning: "When allocated heap memory is never released back to the operating system.",
      funnyEgTamil: "Bathroom tap-ah moodaama thoonga pora maari: morning paatha whole tank kaali aagi RAM overheat aayidum!",
      funnyEgGeneral: "Leaving the water running in the sink while you go on a two-week vacation."
    }
  }
];
