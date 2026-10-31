// agent-notes: { ctx: "Expert Java lessons covering ArrayList vs LinkedList, Streams API, and multithreading", deps: ["./types"], state: "active", last: "sato@2026-10-31" }
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
      question: "Which collection is faster for random access by index?",
      options: ["LinkedList", "ArrayList", "They are the same", "HashSet"],
      correctAnswerIndex: 1
    },
    biteSized: {
      meaning: "Different list architectures optimized for reading vs insertion/deletion.",
      funnyEgTamil: "ArrayList book-la direct-ah page 50 open panra maari (O(1)); LinkedList pazhaya cassette reel-ah rewind panni 50-avathu paattu thedura maari (O(n))!",
      funnyEgGeneral: "ArrayList is reading a book (flip to page 50). LinkedList is a cassette tape (fast forward to minute 50)."
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
      options: ["Modifies every element", "Keeps elements matching the condition and drops the rest", "Sorts the elements", "Limits the size"],
      correctAnswerIndex: 1
    },
    biteSized: {
      meaning: "A functional pipeline to filter, transform, and collect sequences of elements.",
      funnyEgTamil: "Tea filter maari: nalla tea decoction mattum cup-kulla pogum, waste thool ellam filter-laye reject aayidum!",
      funnyEgGeneral: "An assembly line conveyor belt filtering out the bad apples before packaging."
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
      question: "How do you start a new thread so it runs concurrently?",
      options: ["t.run()", "t.start()", "t.begin()", "t.execute()"],
      correctAnswerIndex: 1
    },
    biteSized: {
      meaning: "Executing multiple paths of code simultaneously in separate threads of execution.",
      funnyEgTamil: "Orey nerathula phone pesikitte, bike drive panni, tea kudikkira multitasking hero feel dhaan multithreading!",
      funnyEgGeneral: "Texting, eating pizza, and watching Netflix all at the same time."
    }
  }
];
