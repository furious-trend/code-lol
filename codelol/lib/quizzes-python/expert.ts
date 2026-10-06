import { QuizTopic } from '../quizzes/types';

export const pythonExpertTopics: Record<string, QuizTopic> = {
  metaclasses: {
    id: 'metaclasses',
    title: 'Metaclasses',
    tier: 'Expert',
    icon: '🧠',
    color: 'hover:border-red-500',
    questions: [
      {
        id: 'py_exp_meta_1',
        question: 'What is a metaclass in Python?',
        options: ['A class that inherits from all classes', 'A class used to create other classes', 'A built-in class for data science', 'A completely private class'],
        correctIndex: 1,
        explanation: 'In Python, a class is an object that defines how to create instances. A metaclass is the class of a class; it defines how a class behaves and is created.'
      },
      {
        id: 'py_exp_meta_2',
        question: 'What is the default metaclass for all new-style classes in Python 3?',
        options: ['object', 'class', 'type', 'meta'],
        correctIndex: 2,
        explanation: 'By default, all classes in Python 3 are instances of the `type` metaclass.'
      },
      {
        id: 'py_exp_meta_3',
        question: 'How do you explicitly define a custom metaclass for a class in Python 3?',
        options: ['class MyClass(metaclass=MyMeta):', 'class MyClass(MyMeta):', 'MyClass.__meta__ = MyMeta', '@metaclass(MyMeta)'],
        correctIndex: 0,
        explanation: 'In Python 3, you specify the metaclass using the `metaclass` keyword argument in the class definition.'
      },
      {
        id: 'py_exp_meta_4',
        question: 'Which method of a metaclass is called to actually allocate memory for the new class object?',
        options: ['__init__', '__new__', '__call__', '__create__'],
        correctIndex: 1,
        explanation: 'The `__new__` method is responsible for allocating memory and returning the actual new object (in this case, the class object). `__init__` initializes it afterward.'
      },
      {
        id: 'py_exp_meta_5',
        question: 'If you want to validate or alter class attributes BEFORE the class is created, which metaclass method should you override?',
        options: ['__init__', '__new__', '__prepare__', '__call__'],
        correctIndex: 1,
        explanation: '`__new__` runs before the class is created, allowing you to intercept and modify the class dictionary or bases before returning the class object.'
      },
      {
        id: 'py_exp_meta_6',
        question: 'What does the `__prepare__` method on a metaclass do?',
        options: ['Initializes the class instances', 'Returns the dictionary mapping object used during namespace evaluation', 'Prepares the garbage collector', 'Throws a compile-time error'],
        correctIndex: 1,
        explanation: '`__prepare__` (introduced in Python 3) is called before the class body is evaluated. It returns the dictionary (often an OrderedDict) used as the local namespace during class execution.'
      },
      {
        id: 'py_exp_meta_7',
        question: 'If `type(obj)` returns the class, what does `type(class)` return?',
        options: ['object', 'type', 'None', 'Error'],
        correctIndex: 1,
        explanation: 'The class of a class is its metaclass, which is usually `type`. Hence, `type(MyClass)` returns `<class \'type\'>`.'
      },
      {
        id: 'py_exp_meta_8',
        question: 'Why is it generally advised to avoid metaclasses unless absolutely necessary?',
        options: ['They are deprecated in Python 3', 'They cause memory leaks', 'They make the code extremely difficult to read and debug', 'They only work on Linux'],
        correctIndex: 2,
        explanation: 'As Tim Peters said: "Metaclasses are deeper magic than 99% of users should ever worry about." They add immense complexity and can usually be replaced by simpler class decorators or inheritance.'
      }
    ]
  },
  asyncio: {
    id: 'asyncio',
    title: 'Asyncio & Concurrency',
    tier: 'Expert',
    icon: '⚡',
    color: 'hover:border-yellow-500',
    questions: [
      {
        id: 'py_exp_async_1',
        question: 'What keyword defines an asynchronous function in Python?',
        options: ['async def', 'def async', 'await def', 'coroutine def'],
        correctIndex: 0,
        explanation: '`async def` is used to define a coroutine function.'
      },
      {
        id: 'py_exp_async_2',
        question: 'What is the type of the object returned when you call an `async def` function?',
        options: ['Thread', 'Promise', 'Coroutine', 'Task'],
        correctIndex: 2,
        explanation: 'Calling an async function doesn\'t execute it immediately; it returns a Coroutine object.'
      },
      {
        id: 'py_exp_async_3',
        question: 'How do you pause execution of a coroutine until an awaited result is ready?',
        options: ['yield from', 'pause', 'await', 'async.wait()'],
        correctIndex: 2,
        explanation: 'The `await` keyword suspends the execution of the current coroutine until the awaited awaitable completes.'
      },
      {
        id: 'py_exp_async_4',
        question: 'What is the main entry point function typically used to run an asyncio program in Python 3.7+?',
        options: ['asyncio.start()', 'asyncio.run()', 'asyncio.execute()', 'loop.run_forever()'],
        correctIndex: 1,
        explanation: '`asyncio.run(coroutine)` creates an event loop, runs the coroutine until completion, and closes the loop.'
      },
      {
        id: 'py_exp_async_5',
        question: 'What function is used to schedule a coroutine to run concurrently on the event loop?',
        options: ['asyncio.create_task()', 'asyncio.spawn()', 'asyncio.gather()', 'asyncio.concurrent()'],
        correctIndex: 0,
        explanation: '`asyncio.create_task(coroutine)` wraps the coroutine into a Task and schedules its execution on the active event loop.'
      },
      {
        id: 'py_exp_async_6',
        question: 'If you want to run multiple awaitables concurrently and wait for all of them, which function do you use?',
        options: ['asyncio.wait_all()', 'asyncio.gather()', 'asyncio.concurrent_run()', 'asyncio.join()'],
        correctIndex: 1,
        explanation: '`asyncio.gather(*awaitables)` runs multiple awaitables concurrently and returns a list of their results.'
      },
      {
        id: 'py_exp_async_7',
        question: 'Is Python asyncio truly parallel execution on multiple CPU cores?',
        options: ['Yes, it utilizes all available cores automatically', 'No, it achieves concurrency using an event loop on a single thread', 'Yes, but only if you use async/await', 'No, it just skips slow lines of code'],
        correctIndex: 1,
        explanation: 'asyncio uses cooperative multitasking (concurrency) on a single thread. It switches tasks when one waits for I/O. For true multi-core parallelism, you need the `multiprocessing` module.'
      },
      {
        id: 'py_exp_async_8',
        question: 'What happens if you use a blocking function like `time.sleep(5)` inside an asyncio coroutine?',
        options: ['It gracefully yields control', 'It throws a BlockingError', 'It blocks the entire event loop, freezing all other concurrent tasks for 5 seconds', 'It is ignored by asyncio'],
        correctIndex: 2,
        explanation: 'Blocking calls block the underlying thread. If you block the event loop\'s thread, no other coroutines can run. You should use `await asyncio.sleep(5)` instead.'
      }
    ]
  }
};
