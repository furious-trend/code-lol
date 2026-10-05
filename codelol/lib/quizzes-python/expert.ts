import { QuizTopic } from '../quizzes/types';

export const pythonExpertTopics: Record<string, QuizTopic> = {
  metaclasses: {
    id: 'metaclasses',
    title: 'Metaclasses',
    tier: 'Expert',
    icon: '🧙',
    color: 'hover:border-red-500',
    questions: [
      {
        id: 'py_exp_meta_1',
        question: 'What is a metaclass in Python?',
        options: ['A class that inherits from multiple parents', 'A class used to instantiate other classes', 'A built-in class for data science', 'The base class of all objects'],
        correctIndex: 1,
        explanation: 'A metaclass is a class whose instances are classes. It is the "class of a class".'
      },
      {
        id: 'py_exp_meta_2',
        question: 'Which built-in class is the default metaclass for all new-style classes in Python 3?',
        options: ['object', 'type', 'class', 'base'],
        correctIndex: 1,
        explanation: 'By default, Python creates classes using the `type` metaclass.'
      },
      {
        id: 'py_exp_meta_3',
        question: 'What are "magic methods" (dunder methods) in Python?',
        options: ['Methods that run automatically without being called', 'Methods surrounded by double underscores that define object behavior', 'Methods that encrypt data', 'Methods written in C'],
        correctIndex: 1,
        explanation: 'Magic methods (like `__init__`, `__str__`, `__add__`) define how objects behave with built-in Python operators and functions.'
      },
      {
        id: 'py_exp_meta_4',
        question: 'Which magic method is responsible for object CREATION (before initialization)?',
        options: ['__init__', '__new__', '__create__', '__build__'],
        correctIndex: 1,
        explanation: '`__new__` actually creates and returns the new object instance, while `__init__` only initializes it after creation.'
      }
    ]
  },
  asyncio: {
    id: 'asyncio',
    title: 'Asyncio',
    tier: 'Expert',
    icon: '⚡',
    color: 'hover:border-yellow-500',
    questions: [
      {
        id: 'py_exp_async_1',
        question: 'What keyword defines an asynchronous function in Python?',
        options: ['def async', 'async def', 'await def', 'coroutine def'],
        correctIndex: 1,
        explanation: '`async def` is used to define an asynchronous coroutine function.'
      },
      {
        id: 'py_exp_async_2',
        question: 'What does the `await` keyword do?',
        options: ['Pauses the entire program', 'Pauses the execution of the coroutine until the awaited task finishes, yielding control back to the event loop', 'Skips the task if it takes too long', 'Throws an error if the task is blocking'],
        correctIndex: 1,
        explanation: '`await` pauses the specific coroutine, allowing the event loop to run other coroutines while waiting for the result.'
      },
      {
        id: 'py_exp_async_3',
        question: 'What function is typically used as the entry point to run an asyncio program?',
        options: ['asyncio.start()', 'asyncio.run()', 'asyncio.execute()', 'asyncio.main()'],
        correctIndex: 1,
        explanation: '`asyncio.run(coroutine())` is the standard way to start an asyncio event loop and run the main coroutine.'
      },
      {
        id: 'py_exp_async_4',
        question: 'What is an event loop in asyncio?',
        options: ['A while loop that never ends', 'The core execution mechanism that schedules and runs asynchronous tasks', 'A loop for iterating over lists asynchronously', 'A loop that handles exceptions'],
        correctIndex: 1,
        explanation: 'The event loop manages the execution of coroutines, handling I/O operations and scheduling.'
      }
    ]
  }
};
