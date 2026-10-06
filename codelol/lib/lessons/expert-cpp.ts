import { Lesson } from './types';

export const cppExpertLessons: Lesson[] = [
  {
    id: 21,
    chapter: "Chapter 3: Advanced OOP",
    tier: "Expert",
    title: "Polymorphism & Virtual Functions",
    sticker: "🎭",
    codeExample: "#include <iostream>\nusing namespace std;\n\nclass Animal {\npublic:\n    virtual void sound() { cout << \"Generic sound\" << endl; }\n};\n\nclass Dog : public Animal {\npublic:\n    void sound() override { cout << \"Woof\" << endl; }\n};\n\nint main() {\n    Animal* a = new Dog();\n    a->sound();\n    return 0;\n}",
    expectedOutput: "Woof",
    gifKeyword: "mask",
    miniQuizQuestion: {
      question: "Why do we use the `virtual` keyword?",
      options: ["To prevent memory leaks", "To allow late binding / dynamic overriding", "To make it faster", "To hide the function"],
      correctAnswerIndex: 1
    },
    biteSized: {
      meaning: "Allowing a function to behave differently based on the actual object type.",
      funnyEgGeneral: "Pressing the same 'Play' button but hearing a different song depending on the app."
    }
  },
  {
    id: 22,
    chapter: "Chapter 3: Memory",
    tier: "Expert",
    title: "Smart Pointers",
    sticker: "🧠",
    codeExample: "#include <iostream>\n#include <memory>\nusing namespace std;\n\nint main() {\n    unique_ptr<int> ptr = make_unique<int>(10);\n    cout << *ptr << endl;\n    // Memory is freed automatically!\n    return 0;\n}",
    expectedOutput: "10",
    gifKeyword: "smart",
    miniQuizQuestion: {
      question: "Which smart pointer allows shared ownership of an object?",
      options: ["unique_ptr", "shared_ptr", "weak_ptr", "auto_ptr"],
      correctAnswerIndex: 1
    },
    biteSized: {
      meaning: "Pointers that automatically manage memory deallocation.",
      funnyEgGeneral: "A roommate who actually cleans up after themselves."
    }
  },
  {
    id: 23,
    chapter: "Chapter 3: Advanced Features",
    tier: "Expert",
    title: "Operator Overloading",
    sticker: "➕",
    codeExample: "#include <iostream>\nusing namespace std;\n\nclass Box {\npublic:\n    int weight;\n    Box operator+(const Box& b) {\n        Box box; box.weight = this->weight + b.weight;\n        return box;\n    }\n};\n\nint main() {\n    Box b1; b1.weight = 10;\n    Box b2; b2.weight = 5;\n    Box b3 = b1 + b2;\n    cout << b3.weight << endl;\n    return 0;\n}",
    expectedOutput: "15",
    gifKeyword: "heavy lifting",
    miniQuizQuestion: {
      question: "Which keyword is required to overload an operator?",
      options: ["override", "operator", "virtual", "overload"],
      correctAnswerIndex: 1
    },
    biteSized: {
      meaning: "Redefining how operators like +, -, == work for custom classes.",
      funnyEgGeneral: "Teaching your dog to 'fetch' the TV remote instead of a stick."
    }
  }
];