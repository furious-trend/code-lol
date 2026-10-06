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
  },
  metaclasses_deep_dive: {
    id: 'metaclasses_deep_dive',
    title: 'Python Metaclasses',
    tier: 'Expert',
    icon: '🔮',
    color: 'hover:border-rose-500',
    questions: [
      {
        id: 'py_exp_meta_1',
        question: 'What is the default metaclass for all new-style classes in Python 3?',
        options: ['object', 'type', 'Class', 'Meta'],
        correctIndex: 1,
        explanation: 'In Python, `type` is the built-in metaclass that creates all classes (unless specified otherwise).'
      },
      {
        id: 'py_exp_meta_2',
        question: 'How do you specify a custom metaclass for a class in Python 3?',
        options: ['class MyClass(metaclass=MyMeta):', 'class MyClass(MyMeta):', 'class MyClass extends MyMeta:', '__metaclass__ = MyMeta'],
        correctIndex: 0,
        explanation: 'You specify the metaclass using a keyword argument in the class definition. (The `__metaclass__` attribute was used in Python 2).'
      },
      {
        id: 'py_exp_meta_3',
        question: 'What is the main use case for metaclasses?',
        options: ['Optimizing performance', 'Automatically modifying or validating class definitions at creation time', 'Adding type hints to classes', 'Enabling multiple inheritance'],
        correctIndex: 1,
        explanation: 'Metaclasses allow you to intercept class creation to enforce rules, auto-register classes, or add methods — commonly used in ORMs and frameworks like Django.'
      },
      {
        id: 'py_exp_meta_4',
        question: 'Which dunder method in a metaclass is called when a new class is created?',
        options: ['__init__', '__new__', '__call__', '__create__'],
        correctIndex: 1,
        explanation: '`__new__` is called first to create the class object, then `__init__` is called to initialize it. Both can be overridden in a metaclass.'
      }
    ]
  },
  memory_management: {
    id: 'memory_management',
    title: 'Memory Management & GIL',
    tier: 'Expert',
    icon: '🧠',
    color: 'hover:border-teal-500',
    questions: [
      {
        id: 'py_exp_mem_1',
        question: 'What is the primary memory management mechanism in CPython?',
        options: ['Tracing Garbage Collection', 'Reference Counting', 'Manual Memory Management', 'Mark and Sweep'],
        correctIndex: 1,
        explanation: 'CPython primarily relies on Reference Counting to manage memory, backed up by a cyclic garbage collector to detect circular references.'
      },
      {
        id: 'py_exp_mem_2',
        question: 'What does the Global Interpreter Lock (GIL) prevent in CPython?',
        options: ['Multiple processes running at once', 'Multiple threads executing Python bytecodes at once', 'Memory leaks', 'Asyncio from working properly'],
        correctIndex: 1,
        explanation: 'The GIL is a mutex that protects access to Python objects, preventing multiple threads from executing Python bytecodes concurrently, which makes standard threading ineffective for CPU-bound tasks in CPython.'
      },
      {
        id: 'py_exp_mem_3',
        question: 'What is a circular reference and why is it a problem?',
        options: ['A function that calls itself', 'Two objects referencing each other, preventing reference count from reaching 0', 'An infinite loop', 'A recursive import'],
        correctIndex: 1,
        explanation: 'When object A references B and B references A, neither\'s reference count ever hits 0. Python\'s cyclic garbage collector (`gc` module) handles these.'
      },
      {
        id: 'py_exp_mem_4',
        question: 'Which approach can bypass the GIL for CPU-bound tasks?',
        options: ['Using more threads', 'Using multiprocessing (separate processes)', 'Using async/await', 'Using global variables'],
        correctIndex: 1,
        explanation: 'The `multiprocessing` module spawns separate OS processes, each with its own GIL, allowing true parallel execution on multiple CPU cores.'
      }
    ]
  },
  descriptors_py: {
    id: 'descriptors_py',
    title: 'Python Descriptors',
    tier: 'Expert',
    icon: '🔍',
    color: 'hover:border-orange-600',
    questions: [
      {
        id: 'py_exp_desc_1',
        question: 'What is a descriptor in Python?',
        options: ['A docstring', 'An object that defines __get__, __set__, or __delete__ to customize attribute access', 'A type annotation', 'A deprecated feature'],
        correctIndex: 1,
        explanation: 'Descriptors are objects that implement the descriptor protocol (__get__, __set__, __delete__). Properties, classmethods, and staticmethods are all built using descriptors.'
      },
      {
        id: 'py_exp_desc_2',
        question: 'What is the difference between a data descriptor and a non-data descriptor?',
        options: ['Data descriptors have __set__ or __delete__; non-data only have __get__', 'Data descriptors are faster', 'Data descriptors use @property; non-data use @classmethod', 'No real difference'],
        correctIndex: 0,
        explanation: 'Data descriptors (with __set__ or __delete__) take priority over instance __dict__. Non-data descriptors (only __get__) are overridden by instance attributes.'
      },
      {
        id: 'py_exp_desc_3',
        question: 'Which built-in Python feature is implemented using descriptors?',
        options: ['list comprehensions', '@property, @classmethod, @staticmethod', 'f-strings', 'try/except'],
        correctIndex: 1,
        explanation: '`@property`, `@classmethod`, and `@staticmethod` are all implemented as descriptor objects in CPython.'
      }
    ]
  },
  python_internals_py: {
    id: 'python_internals_py',
    title: 'Python Internals & CPython',
    tier: 'Expert',
    icon: '⚙️',
    color: 'hover:border-slate-500',
    questions: [
      {
        id: 'py_exp_int_1',
        question: 'What does CPython compile Python source code into before execution?',
        options: ['Machine code', 'Bytecode (.pyc files)', 'Assembly', 'LLVM IR'],
        correctIndex: 1,
        explanation: 'CPython first compiles Python source to bytecode, which is then interpreted by the Python Virtual Machine (PVM). Bytecode is cached in .pyc files.'
      },
      {
        id: 'py_exp_int_2',
        question: 'What is "integer interning" in CPython?',
        options: ['Caching small integers (-5 to 256) as singletons for performance', 'Converting integers to strings', 'Storing integers in a fixed-size array', 'Limiting integer size'],
        correctIndex: 0,
        explanation: 'CPython pre-allocates and reuses integer objects for values from -5 to 256. That\'s why `a = 256; b = 256; a is b` returns True, but `a = 257; b = 257; a is b` may return False.'
      },
      {
        id: 'py_exp_int_3',
        question: 'What does the `dis` module do?',
        options: ['Disconnects network sockets', 'Disassembles Python bytecode for inspection', 'Disables debug mode', 'Distributes packages'],
        correctIndex: 1,
        explanation: '`import dis; dis.dis(func)` shows the Python bytecode instructions for a function, useful for low-level performance analysis.'
      },
      {
        id: 'py_exp_int_4',
        question: 'What is the `__slots__` declaration used for?',
        options: ['Defining allowed method names', 'Reducing memory usage by preventing a per-instance __dict__', 'Locking class attributes', 'Defining abstract methods'],
        correctIndex: 1,
        explanation: '`__slots__ = ["x", "y"]` tells Python not to create a `__dict__` for each instance, significantly reducing memory usage when creating many instances.'
      },
      {
        id: 'py_exp_int_5',
        question: 'What does the `weakref` module provide?',
        options: ['References that prevent garbage collection', 'Weak references that do not prevent an object from being garbage collected', 'References to external C libraries', 'Thread-safe references'],
        correctIndex: 1,
        explanation: 'Weak references allow you to refer to an object without incrementing its reference count, so the object can still be garbage collected when no strong references remain.'
      }
    ]
  }
};
