import { QuizTopic } from './quizzes/types';

export const cppQuizzes: Record<string, QuizTopic> = {
  cpp_basics: {
    id: 'cpp_basics',
    title: 'C++ Basics',
    tier: 'Beginner',
    icon: '📦',
    color: 'bg-cyan-500',
    questions: [
      {
        id: 'cpp_1',
        question: 'Which of the following is the correct syntax to output "Hello" in C++?',
        options: ['System.out.println("Hello");', 'console.log("Hello");', 'printf("Hello");', 'cout << "Hello";'],
        correctIndex: 3,
        explanation: 'In C++, cout is the standard output stream.'
      },
      {
        id: 'cpp_2',
        question: 'How do you include the iostream library?',
        options: ['import iostream;', '#include <iostream>', 'using iostream;', 'require("iostream");'],
        correctIndex: 1,
        explanation: '#include is a preprocessor directive to include header files.'
      },
      {
        id: 'cpp_3',
        question: 'Which namespace is standard in C++?',
        options: ['std', 'standard', 'core', 'cpp'],
        correctIndex: 0,
        explanation: 'The std namespace contains standard C++ library features.'
      }
    ]
  }
};
