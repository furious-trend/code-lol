// agent-notes: { ctx: "Java quiz topics for syntax, OOP, and Collections Framework", deps: ["./quizzes/types"], state: "active", last: "sato@2026-10-31" }
import { QuizTopic } from './quizzes/types';

export const javaQuizzes: Record<string, QuizTopic> = {
  java_basics: {
    id: 'java_basics',
    title: 'Java Basics',
    tier: 'Beginner',
    icon: '☕',
    color: 'bg-red-500',
    questions: [
      {
        id: 'java_1',
        question: 'Which of the following is the correct syntax to output "Hello" in Java?',
        options: ['System.out.println("Hello");', 'console.log("Hello");', 'printf("Hello");', 'cout << "Hello";'],
        correctIndex: 0,
        explanation: 'In Java, System.out.println prints a line to standard output stream.'
      },
      {
        id: 'java_2',
        question: 'What is the required entry point method signature for a standalone Java application?',
        options: ['start()', 'run()', 'public static void main(String[] args)', 'init()'],
        correctIndex: 2,
        explanation: 'The JVM launches programs via public static void main(String[] args).'
      },
      {
        id: 'java_3',
        question: 'Which keyword allocates memory on the JVM heap and instantiates an object?',
        options: ['new', 'create', 'instance', 'alloc'],
        correctIndex: 0,
        explanation: 'The new operator allocates heap memory and invokes the constructor.'
      }
    ]
  },
  java_oop: {
    id: 'java_oop',
    title: 'OOP & Interfaces',
    tier: 'Intermediate',
    icon: '🧩',
    color: 'bg-amber-600',
    questions: [
      {
        id: 'java_oop_1',
        question: 'Which keyword establishes class inheritance in Java?',
        options: ['inherits', 'extends', 'implements', 'super'],
        correctIndex: 1,
        explanation: 'extends is used for single class inheritance in Java.'
      },
      {
        id: 'java_oop_2',
        question: 'Can a single Java class implement multiple interfaces?',
        options: ['No, only one interface', 'Yes, separated by commas', 'Only if they are abstract', 'No, multiple inheritance is strictly forbidden in all forms'],
        correctIndex: 1,
        explanation: 'Java disallows multiple class inheritance, but permits implementing multiple interfaces.'
      },
      {
        id: 'java_oop_3',
        question: 'Which block in a try-catch-finally statement always executes, even if an uncaught exception occurs?',
        options: ['try', 'catch', 'finally', 'default'],
        correctIndex: 2,
        explanation: 'The finally block is guaranteed to run for resource cleanup unless System.exit() is invoked.'
      }
    ]
  },
  java_collections: {
    id: 'java_collections',
    title: 'Collections & Memory',
    tier: 'Advanced',
    icon: '📊',
    color: 'bg-orange-600',
    questions: [
      {
        id: 'java_col_1',
        question: 'What is the key difference between String and StringBuilder in Java?',
        options: ['String is mutable, StringBuilder is immutable', 'String is immutable, StringBuilder is mutable', 'String is thread-safe, StringBuilder is not', 'Both are identical'],
        correctIndex: 1,
        explanation: 'Strings in Java are immutable; StringBuilder provides a mutable char buffer for efficient concatenation.'
      },
      {
        id: 'java_col_2',
        question: 'What is the average time complexity of get(key) in a well-distributed Java HashMap?',
        options: ['O(n)', 'O(log n)', 'O(1)', 'O(n^2)'],
        correctIndex: 2,
        explanation: 'HashMaps use hash code bucketing to achieve O(1) average-time lookups.'
      },
      {
        id: 'java_col_3',
        question: 'How does the JVM handle unreferenced objects in heap memory?',
        options: ['Manual free() calls', 'The Garbage Collector automatically marks and sweeps them', 'They remain until reboot', 'Kernel page swapping'],
        correctIndex: 1,
        explanation: 'The JVM Garbage Collector periodically identifies and cleans up unreachable objects.'
      }
    ]
  }
};
