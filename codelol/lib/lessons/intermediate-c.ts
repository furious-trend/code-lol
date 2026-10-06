import { Lesson } from './types';

export const cIntermediateLessons: Lesson[] = [
  {
    id: 11,
    chapter: "Chapter 2: Pointers and Memory",
    tier: "Intermediate",
    title: "Intro to Pointers",
    sticker: "👉",
    codeExample: "#include <stdio.h>\n\nint main() {\n    int var = 20;\n    int *ptr = &var;\n    printf(\"Value: %d, Address: %p\\n\", *ptr, (void*)ptr);\n    return 0;\n}",
    expectedOutput: "Value: 20",
    gifKeyword: "pointing",
    miniQuizQuestion: {
      question: "Which operator is used to get the memory address of a variable?",
      options: ["*", "&", "->", "@"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "Declare a pointer", code: "int *ptr;" }
    ],
    biteSized: {
      meaning: "A pointer is a variable that stores the memory address of another variable.",
      funnyEgTamil: "Like keeping the home address of your rowdy friend in your pocket.",
      funnyEgGeneral: "Like giving someone a treasure map instead of the actual treasure."
    }
  },
  {
    id: 12,
    chapter: "Chapter 2: Pointers and Memory",
    tier: "Intermediate",
    title: "Dynamic Memory (malloc/free)",
    sticker: "🧠",
    codeExample: "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int *ptr = (int*)malloc(sizeof(int));\n    *ptr = 42;\n    printf(\"%d\\n\", *ptr);\n    free(ptr);\n    return 0;\n}",
    expectedOutput: "42",
    gifKeyword: "brain expanding",
    miniQuizQuestion: {
      question: "What function must you call to release dynamically allocated memory?",
      options: ["delete", "remove", "free", "clear"],
      correctAnswerIndex: 2
    },
    biteSized: {
      meaning: "malloc allocates memory at runtime on the heap, and free releases it.",
      funnyEgTamil: "Tamil version of: " + "Renting a car for a road trip (malloc) and returning it so you don't get charged forever (free).",
      funnyEgGeneral: "Renting a car for a road trip (malloc) and returning it so you don't get charged forever (free)."
    }
  },
  {
    id: 13,
    chapter: "Chapter 2: Structs",
    tier: "Intermediate",
    title: "Creating Structs",
    sticker: "🏗️",
    codeExample: "#include <stdio.h>\n\nstruct Point {\n    int x, y;\n};\n\nint main() {\n    struct Point p1 = {10, 20};\n    printf(\"Point at %d, %d\\n\", p1.x, p1.y);\n    return 0;\n}",
    expectedOutput: "Point at 10, 20",
    gifKeyword: "building",
    miniQuizQuestion: {
      question: "How do you access a member of a struct variable `p`?",
      options: ["p->x", "p[x]", "p.x", "p:x"],
      correctAnswerIndex: 2
    },
    biteSized: {
      meaning: "Structs group different variables under a single name.",
      funnyEgTamil: "Tamil version of: " + "Packing your clothes, toothbrush, and snacks into one suitcase.",
      funnyEgGeneral: "Packing your clothes, toothbrush, and snacks into one suitcase."
    }
  }
];