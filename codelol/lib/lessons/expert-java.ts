import { Lesson } from './types';

export const javaExpertLessons: Lesson[] = [
  {
    id: 21,
    chapter: "Chapter 3: Collections",
    tier: "Expert",
    title: "ArrayList vs LinkedList",
    sticker: "📚",
    codeExample: "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        List<String> list = new ArrayList<>();\n        list.add(\"Java\");\n        System.out.println(list.get(0));\n    }\n}",
    expectedOutput: "Java",
    gifKeyword: "books",
    miniQuizQuestion: {
      question: "Which collection is faster for random access?",
      options: ["LinkedList", "ArrayList", "They are the same", "HashSet"],
      correctAnswerIndex: 1
    },
    biteSized: {
      meaning: "Different ways to store dynamic lists based on memory and performance needs.",
      funnyEgTamil: "Tamil version of: " + "ArrayList is reading a book (flip to page 50). LinkedList is a VHS tape (fast forward to minute 50).",
      funnyEgGeneral: "ArrayList is reading a book (flip to page 50). LinkedList is a VHS tape (fast forward to minute 50)."
    }
  },
  {
    id: 22,
    chapter: "Chapter 3: Streams API",
    tier: "Expert",
    title: "Java Streams",
    sticker: "🌊",
    codeExample: "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        List<Integer> nums = Arrays.asList(1, 2, 3, 4);\n        nums.stream().filter(n -> n % 2 == 0).forEach(System.out::println);\n    }\n}",
    expectedOutput: "2\n4",
    gifKeyword: "river",
    miniQuizQuestion: {
      question: "What does the filter method in Streams do?",
      options: ["Modifies every element", "Removes elements that do not match the condition", "Sorts the elements", "Limits the size"],
      correctAnswerIndex: 1
    },
    biteSized: {
      meaning: "A functional way to process sequences of elements in Java.",
      funnyEgTamil: "Tamil version of: " + "An assembly line filtering out the bad apples.",
      funnyEgGeneral: "An assembly line filtering out the bad apples."
    }
  },
  {
    id: 23,
    chapter: "Chapter 3: Concurrency",
    tier: "Expert",
    title: "Multithreading",
    sticker: "🧵",
    codeExample: "class MyThread extends Thread {\n    public void run() { System.out.println(\"Running...\"); }\n}\npublic class Main {\n    public static void main(String[] args) {\n        MyThread t = new MyThread();\n        t.start();\n    }\n}",
    expectedOutput: "Running...",
    gifKeyword: "multitasking",
    miniQuizQuestion: {
      question: "How do you start a new thread?",
      options: ["t.run()", "t.start()", "t.begin()", "t.execute()"],
      correctAnswerIndex: 1
    },
    biteSized: {
      meaning: "Doing multiple things simultaneously in a program.",
      funnyEgTamil: "Tamil version of: " + "Texting, eating, and watching TV all at the same time.",
      funnyEgGeneral: "Texting, eating, and watching TV all at the same time."
    }
  }
];