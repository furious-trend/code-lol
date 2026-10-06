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
  },
  context_managers: {
    id: 'context_managers',
    title: 'Python Context Managers',
    tier: 'Advanced',
    icon: '📦',
    color: 'hover:border-purple-500',
    questions: [
      {
        id: 'py_adv_ctx_1',
        question: 'Which statement is used to trigger a context manager?',
        options: ['use', 'context', 'with', 'manage'],
        correctIndex: 2,
        explanation: 'The `with` statement is used to wrap the execution of a block with methods defined by a context manager.'
      },
      {
        id: 'py_adv_ctx_2',
        question: 'What two dunder methods must a class implement to act as a context manager?',
        options: ['__enter__ and __exit__', '__start__ and __stop__', '__init__ and __del__', '__open__ and __close__'],
        correctIndex: 0,
        explanation: 'A context manager must implement the `__enter__()` and `__exit__()` methods.'
      },
      {
        id: 'py_adv_ctx_3',
        question: 'What does the `contextlib.contextmanager` decorator allow you to do?',
        options: ['Create context managers using try/finally without a class', 'Create async context managers', 'Decorate any function automatically', 'Skip the __exit__ method'],
        correctIndex: 0,
        explanation: '`@contextlib.contextmanager` lets you write a generator function with a `yield` statement to define the __enter__ and __exit__ logic.'
      },
      {
        id: 'py_adv_ctx_4',
        question: 'What is the main advantage of using `with open(...)` instead of `open()` + `close()`?',
        options: ['Faster file access', 'Automatic cleanup even if an exception occurs', 'Supports more file modes', 'Enables async file access'],
        correctIndex: 1,
        explanation: 'The `with` block guarantees the file is closed via `__exit__`, even if an exception occurs inside the block.'
      }
    ]
  },
  modules_packages: {
    id: 'modules_packages',
    title: 'Modules & Packages',
    tier: 'Advanced',
    icon: '📚',
    color: 'hover:border-pink-500',
    questions: [
      {
        id: 'py_adv_mod_1',
        question: 'How do you import a specific function from a module?',
        options: ['import function from module', 'include function in module', 'from module import function', 'module.function()'],
        correctIndex: 2,
        explanation: 'The `from ... import ...` syntax is used to import specific attributes or functions from a module.'
      },
      {
        id: 'py_adv_mod_2',
        question: 'What file is required to make Python treat a directory as a package (prior to Python 3.3)?',
        options: ['__package__.py', '__init__.py', 'setup.py', 'main.py'],
        correctIndex: 1,
        explanation: 'An `__init__.py` file was required to make a directory a regular package. It can be empty or execute initialization code.'
      },
      {
        id: 'py_adv_mod_3',
        question: 'What does `import module as alias` do?',
        options: ['Renames the module file', 'Creates a copy of the module', 'Allows you to reference the module by the alias name', 'Makes the module private'],
        correctIndex: 2,
        explanation: 'Aliasing allows shorter names: `import numpy as np` lets you use `np.array()` instead of `numpy.array()`.'
      },
      {
        id: 'py_adv_mod_4',
        question: 'What is the purpose of `if __name__ == "__main__":`?',
        options: ['Makes the file executable', 'Runs code only when the file is run directly, not when imported', 'Defines the module name', 'Hides the module from imports'],
        correctIndex: 1,
        explanation: 'This guard ensures that certain code (like tests or demo runs) only executes when the script is run directly, not when it is imported as a module.'
      }
    ]
  },
  closures_scoping_py: {
    id: 'closures_scoping_py',
    title: 'Closures & Scoping',
    tier: 'Advanced',
    icon: '🔒',
    color: 'hover:border-amber-500',
    questions: [
      {
        id: 'py_adv_cls_1',
        question: 'What is a closure in Python?',
        options: ['A way to close files', 'A function that retains access to variables from its enclosing scope', 'A class that inherits from multiple parents', 'A locked module'],
        correctIndex: 1,
        explanation: 'A closure is a function that remembers the values of variables from the outer scope even when the outer function has finished executing.'
      },
      {
        id: 'py_adv_cls_2',
        question: 'What does the LEGB rule define in Python?',
        options: ['Loop execution guidelines', 'Variable lookup order: Local, Enclosing, Global, Built-in', 'List, Enumerate, Generator, Boolean', 'Lambda expression syntax'],
        correctIndex: 1,
        explanation: 'LEGB is the scoping rule: Python looks for a variable name in Local scope first, then Enclosing, then Global, then Built-in scopes.'
      },
      {
        id: 'py_adv_cls_3',
        question: 'What keyword allows a nested function to modify a variable in its enclosing scope?',
        options: ['global', 'nonlocal', 'outer', 'shared'],
        correctIndex: 1,
        explanation: '`nonlocal` allows an inner function to modify a variable from its immediately enclosing (but not global) scope.'
      },
      {
        id: 'py_adv_cls_4',
        question: 'What is the `global` keyword used for?',
        options: ['Import global modules', 'Declare a variable accessible from anywhere globally', 'Modify a global variable inside a function', 'Export a function'],
        correctIndex: 2,
        explanation: 'Inside a function, `global var_name` tells Python you want to modify the global-scope variable rather than creating a new local one.'
      }
    ]
  },
  type_hints_py: {
    id: 'type_hints_py',
    title: 'Type Hints & Annotations',
    tier: 'Advanced',
    icon: '🏷️',
    color: 'hover:border-sky-500',
    questions: [
      {
        id: 'py_adv_type_1',
        question: 'What is the syntax to add a type hint to a function parameter?',
        options: ['def foo(x: int):', 'def foo(int x):', 'def foo(x as int):', 'def foo(x = int):'],
        correctIndex: 0,
        explanation: 'Type hints use the colon syntax: `def foo(x: int, y: str) -> bool:`. They are optional and not enforced at runtime.'
      },
      {
        id: 'py_adv_type_2',
        question: 'What does `Optional[str]` mean in Python type hints?',
        options: ['The parameter is optional (has a default)', 'The value can be either str or None', 'A string that can be empty', 'A required string parameter'],
        correctIndex: 1,
        explanation: '`Optional[str]` is shorthand for `Union[str, None]`, meaning the value can be either a string or None.'
      },
      {
        id: 'py_adv_type_3',
        question: 'Which tool is commonly used to enforce type hints in Python?',
        options: ['pyflakes', 'black', 'mypy', 'pylint'],
        correctIndex: 2,
        explanation: '`mypy` is the most popular static type checker for Python. It analyzes type hints and reports errors without running the code.'
      },
      {
        id: 'py_adv_type_4',
        question: 'What does the `->` syntax mean in a function definition?',
        options: ['Arrow function syntax', 'Indicates the return type', 'Lambda shorthand', 'Inheritance syntax'],
        correctIndex: 1,
        explanation: '`def greet(name: str) -> str:` indicates the function is expected to return a `str`. This is the return type annotation.'
      }
    ]
  }
};
