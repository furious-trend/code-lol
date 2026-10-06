import { Lesson } from './types';

export const cppIntermediateLessons: Lesson[] = [
  {
    id: 11,
    chapter: "Chapter 2: OOP",
    tier: "Intermediate",
    title: "Classes and Objects",
    sticker: "🏛️",
    codeExample: "#include <iostream>\nusing namespace std;\n\nclass Car {\npublic:\n    string brand;\n    void honk() { cout << \"Beep!\" << endl; }\n};\n\nint main() {\n    Car myCar;\n    myCar.brand = \"Ford\";\n    myCar.honk();\n    return 0;\n}",
    expectedOutput: "Beep!",
    gifKeyword: "car",
    miniQuizQuestion: {
      question: "What keyword is used to create a class in C++?",
      options: ["struct", "object", "class", "blueprint"],
      correctAnswerIndex: 2
    },
    biteSized: {
      meaning: "A class is a blueprint, an object is the actual house built from it.",
      funnyEgGeneral: "Class is the recipe, Object is the cake you eat."
    }
  },
  {
    id: 12,
    chapter: "Chapter 2: OOP",
    tier: "Intermediate",
    title: "Constructors",
    sticker: "🏗️",
    codeExample: "#include <iostream>\nusing namespace std;\n\nclass Person {\npublic:\n    Person() { cout << \"Born!\" << endl; }\n};\n\nint main() {\n    Person p;\n    return 0;\n}",
    expectedOutput: "Born!",
    gifKeyword: "baby",
    miniQuizQuestion: {
      question: "What is the return type of a constructor?",
      options: ["void", "int", "None", "The class itself"],
      correctAnswerIndex: 2
    },
    biteSized: {
      meaning: "A special function called automatically when an object is created.",
      funnyEgGeneral: "The welcome email you instantly get when signing up for a service."
    }
  },
  {
    id: 13,
    chapter: "Chapter 2: STL",
    tier: "Intermediate",
    title: "Vectors",
    sticker: "📦",
    codeExample: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    vector<int> nums = {1, 2, 3};\n    nums.push_back(4);\n    cout << nums.size() << endl;\n    return 0;\n}",
    expectedOutput: "4",
    gifKeyword: "stretching",
    miniQuizQuestion: {
      question: "What is the primary advantage of a vector over a standard array in C++?",
      options: ["It is faster", "It can resize dynamically", "It uses less memory", "It supports multiple data types at once"],
      correctAnswerIndex: 1
    },
    biteSized: {
      meaning: "A dynamic array that can grow in size automatically.",
      funnyEgGeneral: "An elastic waistband after a big meal."
    }
  }
];