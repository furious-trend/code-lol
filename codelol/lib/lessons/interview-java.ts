import { Lesson } from './types';

export const javaInterviewLessons: Lesson[] = [
  {
    id: 31,
    chapter: "Chapter 4: Interview Prep",
    tier: "Interview",
    title: "String vs StringBuilder",
    sticker: "🧵",
    codeExample: "public class Main {\n    public static void main(String[] args) {\n        StringBuilder sb = new StringBuilder(\"Hello\");\n        sb.append(\" World\");\n        System.out.println(sb.toString());\n    }\n}",
    expectedOutput: "Hello World",
    gifKeyword: "building",
    miniQuizQuestion: {
      question: "Why use StringBuilder instead of String?",
      options: ["It is immutable", "It is faster for concatenation", "It uses less memory inherently", "It is thread-safe"],
      correctAnswerIndex: 1
    },
    biteSized: {
      meaning: "StringBuilder mutates the string in memory instead of creating new ones.",
      funnyEgGeneral: "String is writing in pen. StringBuilder is writing in pencil."
    }
  },
  {
    id: 32,
    chapter: "Chapter 4: Algorithms",
    tier: "Interview",
    title: "HashMap Basics",
    sticker: "🗺️",
    codeExample: "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Map<String, Integer> map = new HashMap<>();\n        map.put(\"Apple\", 1);\n        System.out.println(map.get(\"Apple\"));\n    }\n}",
    expectedOutput: "1",
    gifKeyword: "map",
    miniQuizQuestion: {
      question: "What is the time complexity for getting an element from a HashMap (average case)?",
      options: ["O(n)", "O(log n)", "O(1)", "O(n^2)"],
      correctAnswerIndex: 2
    },
    biteSized: {
      meaning: "A data structure that stores key-value pairs using hashing.",
      funnyEgGeneral: "A coat check system. Give a ticket (key), get your coat (value) instantly."
    }
  },
  {
    id: 33,
    chapter: "Chapter 4: Deep Concepts",
    tier: "Interview",
    title: "Garbage Collection",
    sticker: "🗑️",
    codeExample: "public class Main {\n    public static void main(String[] args) {\n        String s = new String(\"Garbage\");\n        s = null;\n        System.gc(); // Request GC\n        System.out.println(\"Cleared\");\n    }\n}",
    expectedOutput: "Cleared",
    gifKeyword: "trash",
    miniQuizQuestion: {
      question: "Can you force Garbage Collection in Java?",
      options: ["Yes, absolutely", "No, you can only request it via System.gc()", "Yes, using free()", "Yes, using delete"],
      correctAnswerIndex: 1
    },
    biteSized: {
      meaning: "Automatic memory management process that frees up unused objects.",
      funnyEgGeneral: "A Roomba that cleans up your house without you telling it to."
    }
  }
];