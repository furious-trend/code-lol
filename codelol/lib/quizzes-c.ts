import { QuizTopic } from './quizzes/types';

export const cQuizzes: Record<string, QuizTopic> = {
  c_basics: {
    id: 'c_basics',
    title: 'C Basics',
    tier: 'Beginner',
    icon: '📦',
    color: 'bg-indigo-500',
    questions: [
      {
        id: 'c_1',
        question: 'Which of the following is the correct syntax to output "Hello" in C?',
        options: ['System.out.println("Hello");', 'console.log("Hello");', 'printf("Hello");', 'cout << "Hello";'],
        correctIndex: 2,
        explanation: 'In C, printf is used for formatted output.'
      },
      {
        id: 'c_2',
        question: 'How do you declare an integer variable in C?',
        options: ['let num = 5;', 'int num = 5;', 'num = 5;', 'integer num = 5;'],
        correctIndex: 1,
        explanation: 'C requires explicit type declarations like int.'
      },
      {
        id: 'c_3',
        question: 'Which symbol is used for a single-line comment in C?',
        options: ['//', '/*', '#', '<!--'],
        correctIndex: 0,
        explanation: '// is for single-line comments.'
      }
    ]
  }
};
