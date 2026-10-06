import { Lesson } from './types';

export const javaIntermediateLessons: Lesson[] = [
  {
    id: 11,
    chapter: "Chapter 2: OOP",
    tier: "Intermediate",
    title: "Inheritance",
    sticker: "🧬",
    codeExample: "class Animal {\n    void eat() { System.out.println(\"Eating...\"); }\n}\nclass Dog extends Animal {\n}\npublic class Main {\n    public static void main(String[] args) {\n        Dog d = new Dog();\n        d.eat();\n    }\n}",
    expectedOutput: "Eating...",
    gifKeyword: "dna",
    miniQuizQuestion: {
      question: "Which keyword is used for inheritance in Java?",
      options: ["inherits", "extends", "implements", ":"],
      correctAnswerIndex: 1
    },
    biteSized: {
      meaning: "One class acquiring the properties and behaviors of another.",
      funnyEgTamil: "Tamil version of: " + "Getting your parent's old car when you get your license.",
      funnyEgGeneral: "Getting your parent's old car when you get your license."
    }
  },
  {
    id: 12,
    chapter: "Chapter 2: OOP",
    tier: "Intermediate",
    title: "Interfaces",
    sticker: "🔌",
    codeExample: "interface Animal {\n    void sound();\n}\nclass Dog implements Animal {\n    public void sound() { System.out.println(\"Woof\"); }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Animal a = new Dog();\n        a.sound();\n    }\n}",
    expectedOutput: "Woof",
    gifKeyword: "plug",
    miniQuizQuestion: {
      question: "Which keyword is used when a class uses an interface?",
      options: ["extends", "includes", "implements", "using"],
      correctAnswerIndex: 2
    },
    biteSized: {
      meaning: "A contract that guarantees a class will provide specific behaviors.",
      funnyEgTamil: "Tamil version of: " + "Signing a gym contract (you must go work out... eventually).",
      funnyEgGeneral: "Signing a gym contract (you must go work out... eventually)."
    }
  },
  {
    id: 13,
    chapter: "Chapter 2: Exceptions",
    tier: "Intermediate",
    title: "Try-Catch Blocks",
    sticker: "🛡️",
    codeExample: "public class Main {\n    public static void main(String[] args) {\n        try {\n            int x = 10 / 0;\n        } catch (ArithmeticException e) {\n            System.out.println(\"Cannot divide by zero!\");\n        }\n    }\n}",
    expectedOutput: "Cannot divide by zero!",
    gifKeyword: "shield",
    miniQuizQuestion: {
      question: "What block always executes regardless of an exception?",
      options: ["catch", "try", "finally", "else"],
      correctAnswerIndex: 2
    },
    biteSized: {
      meaning: "Handling runtime errors gracefully without crashing the program.",
      funnyEgTamil: "Tamil version of: " + "A safety net catching you when you fall off the tightrope.",
      funnyEgGeneral: "A safety net catching you when you fall off the tightrope."
    }
  }
];