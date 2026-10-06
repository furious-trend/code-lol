import { Lesson } from './types';

export const cppInterviewLessons: Lesson[] = [
  {
    id: 31,
    chapter: "Chapter 4: Algorithms",
    tier: "Interview",
    title: "Sorting with STL",
    sticker: "🗂️",
    codeExample: "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    vector<int> v = {3, 1, 4, 2};\n    sort(v.begin(), v.end());\n    cout << v[0] << endl;\n    return 0;\n}",
    expectedOutput: "1",
    gifKeyword: "sorting",
    miniQuizQuestion: {
      question: "What is the time complexity of std::sort?",
      options: ["O(n)", "O(n^2)", "O(n log n)", "O(1)"],
      correctAnswerIndex: 2
    },
    biteSized: {
      meaning: "Using standard library functions instead of writing them from scratch.",
      funnyEgGeneral: "Buying a frozen pizza instead of making dough from scratch."
    }
  },
  {
    id: 32,
    chapter: "Chapter 4: Data Structures",
    tier: "Interview",
    title: "Maps",
    sticker: "🗺️",
    codeExample: "#include <iostream>\n#include <map>\nusing namespace std;\n\nint main() {\n    map<string, int> ages;\n    ages[\"Alice\"] = 25;\n    cout << ages[\"Alice\"] << endl;\n    return 0;\n}",
    expectedOutput: "25",
    gifKeyword: "map",
    miniQuizQuestion: {
      question: "How are elements ordered in a std::map?",
      options: ["Insertion order", "Randomly", "By Key", "By Value"],
      correctAnswerIndex: 2
    },
    biteSized: {
      meaning: "A collection of key-value pairs sorted by key.",
      funnyEgGeneral: "A dictionary where the word is the key and definition is the value."
    }
  },
  {
    id: 33,
    chapter: "Chapter 4: Modern C++",
    tier: "Interview",
    title: "Lambda Expressions",
    sticker: "λ",
    codeExample: "#include <iostream>\nusing namespace std;\n\nint main() {\n    auto add = [](int a, int b) { return a + b; };\n    cout << add(3, 4) << endl;\n    return 0;\n}",
    expectedOutput: "7",
    gifKeyword: "fast",
    miniQuizQuestion: {
      question: "What is a lambda in C++?",
      options: ["An anonymous function", "A type of loop", "A smart pointer", "A macro"],
      correctAnswerIndex: 0
    },
    biteSized: {
      meaning: "Inline, anonymous functions used for short snippets of code.",
      funnyEgGeneral: "A disposable camera—use it once right where you need it, then forget about it."
    }
  }
];