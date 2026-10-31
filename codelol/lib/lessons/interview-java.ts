// agent-notes: { ctx: "Interview prep Java lessons covering String vs StringBuilder, HashMaps, and Garbage Collection", deps: ["./types"], state: "active", last: "sato@2026-10-31" }
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
      question: "Why use StringBuilder instead of String when doing frequent modifications?",
      options: ["It is immutable", "It is faster because it mutates the existing buffer", "It uses less memory inherently", "It is thread-safe"],
      correctAnswerIndex: 1
    },
    biteSized: {
      meaning: "StringBuilder mutates the string in place instead of creating wasteful intermediate objects in the heap.",
      funnyEgTamil: "String na pen-la ezhudhi thappana pudhu paper edukkura maari; StringBuilder na pencil-la ezhudhi eraser vachi modify panra maari!",
      funnyEgGeneral: "String is writing in permanent marker. StringBuilder is writing in pencil with a good eraser."
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
      meaning: "A data structure that stores key-value pairs using hash functions for O(1) lookups.",
      funnyEgTamil: "Token counter maari: token number (key) kudutha parcel (value) direct-ah O(1) instant speed-la un kaiyil kedaikkum!",
      funnyEgGeneral: "A coat check system: Hand over a ticket (key), get your jacket (value) instantly without searching every hanger."
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
      meaning: "Automatic JVM daemon process that reclaims heap memory from unreferenced objects.",
      funnyEgTamil: "Veetla ammma namakku theriyama room-la irukkura kuppaiya clean panra maari: un useless objects-ah JVM automatic-ah swipe pannidum!",
      funnyEgGeneral: "An autonomous robot vacuum cleaning up crumbs on the floor without you having to lift a broom."
    }
  }
];
