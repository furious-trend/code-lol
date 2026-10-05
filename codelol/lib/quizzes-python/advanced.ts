import { QuizTopic } from '../quizzes/types';

export const pythonAdvancedTopics: Record<string, QuizTopic> = {
  generators: {
    id: 'generators',
    title: 'Generators',
    tier: 'Advanced',
    icon: '⚙️',
    color: 'hover:border-purple-500',
    questions: [
      {
        id: 'py_adv_gen_1',
        question: 'What keyword is used to return data from a generator function?',
        options: ['return', 'yield', 'produce', 'generate'],
        correctIndex: 1,
        explanation: 'The `yield` keyword pauses the generator function and returns a value to the caller, maintaining its state for the next time it is resumed.'
      },
      {
        id: 'py_adv_gen_2',
        question: 'What is the main advantage of using a generator over a list?',
        options: ['Generators run faster', 'Generators are easier to write', 'Generators use much less memory for large datasets', 'Generators can hold more data types'],
        correctIndex: 2,
        explanation: 'Generators yield one item at a time (lazy evaluation), meaning they do not store the entire sequence in memory at once.'
      },
      {
        id: 'py_adv_gen_3',
        question: 'What built-in function is used to manually get the next item from a generator?',
        options: ['next()', 'advance()', 'forward()', 'step()'],
        correctIndex: 0,
        explanation: 'The `next()` function retrieves the next item from an iterator/generator. When exhausted, it raises a StopIteration exception.'
      },
      {
        id: 'py_adv_gen_4',
        question: 'What exception is raised when a generator has no more items to yield?',
        options: ['EndException', 'StopIteration', 'GeneratorEmpty', 'IndexError'],
        correctIndex: 1,
        explanation: 'When a generator is exhausted, it raises a `StopIteration` exception, which is usually handled automatically by `for` loops.'
      }
    ]
  },
  decorators: {
    id: 'decorators',
    title: 'Decorators',
    tier: 'Advanced',
    icon: '✨',
    color: 'hover:border-pink-500',
    questions: [
      {
        id: 'py_adv_dec_1',
        question: 'What is a decorator in Python?',
        options: ['A tool to format code', 'A function that modifies the behavior of another function', 'A graphical UI element', 'A class attribute'],
        correctIndex: 1,
        explanation: 'Decorators are functions that take another function as an argument and extend its behavior without explicitly modifying it.'
      },
      {
        id: 'py_adv_dec_2',
        question: 'Which symbol is used to apply a decorator to a function?',
        options: ['#', '$', '@', '&'],
        correctIndex: 2,
        explanation: 'The `@` symbol is used as syntactic sugar to apply a decorator, e.g., `@my_decorator`.'
      },
      {
        id: 'py_adv_dec_3',
        question: 'What does a standard decorator function return?',
        options: ['A string', 'None', 'A new or modified wrapper function', 'A class instance'],
        correctIndex: 2,
        explanation: 'A decorator typically defines an inner wrapper function that executes some code before/after the original function, and then returns that wrapper function.'
      },
      {
        id: 'py_adv_dec_4',
        question: 'Which built-in decorator is used to define a method that belongs to the class itself rather than instances?',
        options: ['@staticmethod', '@classmethod', '@property', '@abstractmethod'],
        correctIndex: 1,
        explanation: '`@classmethod` passes the class (`cls`) as the first argument, whereas `@staticmethod` passes no implicit first argument.'
      }
    ]
  }
};
