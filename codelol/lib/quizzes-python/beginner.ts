import { QuizTopic } from '../quizzes/types';

export const pythonBeginnerTopics: Record<string, QuizTopic> = {
  variables_py: {
    id: 'variables_py',
    title: 'Python Variables',
    tier: 'Beginner',
    icon: '🐍',
    color: 'hover:border-green-500',
    questions: [
      {
        id: 'py_var_1',
        question: 'How do you declare a variable in Python?',
        options: ['let x = 5', 'var x = 5', 'x = 5', 'int x = 5'],
        correctIndex: 2,
        explanation: 'In Python, you just assign a value to a name. No keyword like "let" or "var" is needed!'
      },
      {
        id: 'py_var_2',
        question: 'Which of the following is a valid Python variable name?',
        options: ['1st_place', 'my-variable', 'my_variable', 'class'],
        correctIndex: 2,
        explanation: 'snake_case is the standard in Python. Variables cannot start with numbers, cannot have hyphens, and cannot be reserved keywords.'
      },
      {
        id: 'py_var_3',
        question: 'How do you print something to the console in Python?',
        options: ['console.log()', 'print()', 'echo()', 'System.out.println()'],
        correctIndex: 1,
        explanation: 'Python uses the built-in print() function.'
      }
    ]
  },
  data_types_py: {
    id: 'data_types_py',
    title: 'Python Data Types',
    tier: 'Beginner',
    icon: '📊',
    color: 'hover:border-blue-500',
    questions: [
      {
        id: 'py_dt_1',
        question: 'What is the boolean value for "true" in Python?',
        options: ['true', 'True', 'TRUE', '1'],
        correctIndex: 1,
        explanation: 'In Python, booleans are capitalized: True and False.'
      },
      {
        id: 'py_dt_2',
        question: 'What is the equivalent of "null" or "undefined" in Python?',
        options: ['null', 'undefined', 'None', 'nil'],
        correctIndex: 2,
        explanation: 'Python uses "None" to represent the absence of a value.'
      }
    ]
  }
};
