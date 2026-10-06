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
      },
      {
        id: 'py_adv_gen_5',
        question: 'Can a generator have multiple yield statements?',
        options: ['No', 'Yes, but they must be in a loop', 'Yes, and execution pauses at each one sequentially', 'Yes, but only one is executed randomly'],
        correctIndex: 2,
        explanation: 'A generator can have multiple yield statements. Each time next() is called, it runs until the next yield.'
      },
      {
        id: 'py_adv_gen_6',
        question: 'How do you send a value BACK into a paused generator?',
        options: ['generator.next(value)', 'generator.send(value)', 'generator.push(value)', 'You cannot send values into a generator'],
        correctIndex: 1,
        explanation: 'The `.send(value)` method resumes the generator and "sends" a value that becomes the result of the current yield expression.'
      },
      {
        id: 'py_adv_gen_7',
        question: 'What is a generator expression?',
        options: ['A generator created using lambda', 'A list comprehension enclosed in parentheses ()', 'A dictionary comprehension', 'A class with a yield method'],
        correctIndex: 1,
        explanation: 'Using parentheses instead of brackets creates a generator expression: (x*2 for x in nums)'
      },
      {
        id: 'py_adv_gen_8',
        question: 'What does `yield from` do?',
        options: ['Yields items starting from a specific index', 'Delegates part of its operations to another generator or iterable', 'Imports a generator module', 'Creates a reverse generator'],
        correctIndex: 1,
        explanation: '`yield from iterable` is a shortcut to yield all values from another iterable, simplifying generator delegation.'
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
      },
      {
        id: 'py_adv_dec_5',
        question: 'How do you preserve the original function\'s name and docstring when using a decorator?',
        options: ['@preserve', '@functools.wraps', 'return original', 'You can\'t preserve them'],
        correctIndex: 1,
        explanation: 'Using `@functools.wraps(func)` on the inner wrapper function ensures metadata like `__name__` and `__doc__` are properly copied.'
      },
      {
        id: 'py_adv_dec_6',
        question: 'Can you stack multiple decorators on a single function?',
        options: ['No', 'Yes, they are executed top-to-bottom', 'Yes, they are applied bottom-to-top', 'Only if they are from the same module'],
        correctIndex: 2,
        explanation: 'When stacking decorators, the one closest to the function (the bottom one) is applied first.'
      },
      {
        id: 'py_adv_dec_7',
        question: 'How do you create a decorator that accepts arguments (like `@retry(times=3)`)?',
        options: ['Pass them directly to the wrapper', 'You write a function that returns a decorator function', 'Use a class only', 'It is built-in automatically'],
        correctIndex: 1,
        explanation: 'A decorator with arguments requires three layers: the outer function takes the arguments, returning the actual decorator, which returns the wrapper.'
      },
      {
        id: 'py_adv_dec_8',
        question: 'What is the purpose of the `@property` decorator?',
        options: ['To rent out memory space', 'To turn a class method into a read-only attribute', 'To make variables public', 'To cache function results'],
        correctIndex: 1,
        explanation: '`@property` allows you to access a method like it\'s an attribute, enabling computed properties or getters/setters without changing syntax.'
      }
    ]
  }
};
