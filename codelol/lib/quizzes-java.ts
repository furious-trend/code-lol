import { QuizTopic } from './quizzes/types';

export const javaQuizzes: Record<string, QuizTopic> = {
  java_basics: {
    id: 'java_basics',
    title: 'Java Basics',
    tier: 'Beginner',
    icon: '📦',
    color: 'bg-red-500',
    questions: [
      {
        id: 'java_1',
        question: 'Which of the following is the correct syntax to output "Hello" in Java?',
        options: ['System.out.println("Hello");', 'console.log("Hello");', 'printf("Hello");', 'cout << "Hello";'],
        correctIndex: 0,
        explanation: 'In Java, System.out.println is used to print output to the console.'
      },
      {
        id: 'java_2',
        question: 'What is the entry point method for a Java application?',
        options: ['start()', 'run()', 'public static void main(String[] args)', 'init()'],
        correctIndex: 2,
        explanation: 'The main method is the required entry point for Java programs.'
      },
      {
        id: 'java_3',
        question: 'Which keyword is used to create an instance of a class?',
        options: ['new', 'create', 'instance', 'make'],
        correctIndex: 0,
        explanation: 'The new keyword is used to instantiate objects.'
      }
    ]
  }
};
