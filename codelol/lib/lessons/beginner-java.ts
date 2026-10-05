import { Lesson } from './types';

export const javaBeginnerLessons: Lesson[] = [
  {
    id: 1,
    chapter: "Chapter 1: The Absolute Basics",
    tier: "Beginner",
    title: "Variables and System.out",
    sticker: "📦",
    codeExample: "public class Main {\n    public static void main(String[] args) {\n        int cupsOfCoffee = 3;\n        System.out.println(\"Drank \" + cupsOfCoffee + \" cups!\");\n    }\n}",
    expectedOutput: "Drank 3 cups!",
    gifKeyword: "drinking coffee",
    miniQuizQuestion: {
      question: "Which method is used to print output with a newline in Java?",
      options: ["print()", "printf()", "println()", "console.log()"],
      correctAnswerIndex: 2
    },
    examples: [
      { explanation: "Output string", code: "System.out.println(\"Hello\");" },
      { explanation: "Output variable", code: "int x = 5; System.out.println(x);" }
    ],
    verificationChecks: [
      {
        type: "requires_syntax",
        pattern: "System\\.out\\.print",
        expectedMessage: "You need to use 'System.out.println' or 'print' to output text."
      }
    ],
    biteSized: {
      meaning: "System.out is the standard output stream in Java.",
      meaningGeneral: "Used to print text to the console.",
      funnyEgTamil: "Java la print panna konjam perusa type pannanum.",
      funnyEgGeneral: "Java likes to be verbose."
    }
  },
  {
    id: 2,
    chapter: "Chapter 1: The Absolute Basics",
    tier: "Beginner",
    title: "String Objects",
    sticker: "📜",
    codeExample: "public class Main {\n    public static void main(String[] args) {\n        String name = \"Java Dev\";\n        System.out.println(\"Hello, \" + name + \"!\");\n    }\n}",
    expectedOutput: "Hello, Java Dev!",
    gifKeyword: "typing fast",
    miniQuizQuestion: {
      question: "Is String a primitive type in Java?",
      options: ["Yes", "No"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "String declaration", code: "String obj = \"Car\";" }
    ],
    verificationChecks: [
      {
        type: "requires_syntax",
        pattern: "String",
        expectedMessage: "Make sure you declare a 'String' variable."
      }
    ],
    biteSized: {
      meaning: "String is a class in Java, not a primitive.",
      meaningGeneral: "Always capitalized.",
      funnyEgTamil: "Capital S pottu String type pannu.",
      funnyEgGeneral: "Capital S, because it's a classy object."
    }
  },
  {
    id: 3,
    chapter: "Chapter 2: Logic",
    tier: "Beginner",
    title: "If/Else Statements",
    sticker: "🔀",
    codeExample: "public class Main {\n    public static void main(String[] args) {\n        int battery = 15;\n        if (battery <= 20) {\n            System.out.println(\"Low Battery!\");\n        } else {\n            System.out.println(\"All Good.\");\n        }\n    }\n}",
    expectedOutput: "Low Battery!",
    gifKeyword: "low battery",
    miniQuizQuestion: {
      question: "What is printed if battery is 50?",
      options: ["Low Battery!", "All Good.", "Nothing", "Error"],
      correctAnswerIndex: 1
    },
    examples: [
      { explanation: "Basic if", code: "if (x > 0) System.out.println(\"Positive\");" }
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
      funnyEgTamil: "Charge illana phone off aagum.",
      funnyEgGeneral: "Low battery -> panic mode."
    }
  }
];
