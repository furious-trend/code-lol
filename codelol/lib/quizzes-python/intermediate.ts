import { QuizTopic } from '../quizzes/types';

export const pythonIntermediateTopics: Record<string, QuizTopic> = {
  list_comprehensions: {
    id: 'list_comprehensions',
    title: 'List Comprehensions',
    tier: 'Intermediate',
    icon: '📝',
    color: 'hover:border-blue-500',
    questions: [
      {
        id: 'py_int_lc_1',
        question: 'What is a list comprehension in Python?',
        options: ['A way to read a list aloud', 'A concise way to create lists based on existing lists', 'A method to compress list memory', 'A type of loop for dictionaries'],
        correctIndex: 1,
        explanation: 'List comprehensions provide a concise way to create lists.'
      },
      {
        id: 'py_int_lc_2',
        question: 'Which of the following creates a list of squares for numbers from 0 to 4?',
        options: ['[x**2 for x in range(5)]', 'list(square(0:4))', '[(x*x) in range(4)]', '{x**2 for x in range(5)}'],
        correctIndex: 0,
        explanation: '[x**2 for x in range(5)] produces [0, 1, 4, 9, 16]. The curly braces would create a set instead.'
      },
      {
        id: 'py_int_lc_3',
        question: 'Can you include an `if` condition in a list comprehension?',
        options: ['No, that causes a syntax error', 'Yes, but only at the beginning', 'Yes, it can be placed at the end to filter items', 'Only if you use a while loop inside it'],
        correctIndex: 2,
        explanation: 'You can filter items by adding an if statement at the end, e.g., [x for x in range(10) if x % 2 == 0].'
      },
      {
        id: 'py_int_lc_4',
        question: 'What does `[x for x in range(5) if x > 2]` evaluate to?',
        options: ['[0, 1, 2]', '[3, 4]', '[2, 3, 4]', '[0, 1, 2, 3, 4]'],
        correctIndex: 1,
        explanation: 'The loop goes from 0 to 4. The condition `x > 2` is only true for 3 and 4.'
      },
      {
        id: 'py_int_lc_5',
        question: 'What is the equivalent of a list comprehension that uses `()` instead of `[]`?',
        options: ['A tuple comprehension', 'A dictionary comprehension', 'A generator expression', 'A function expression'],
        correctIndex: 2,
        explanation: 'Using parentheses creates a generator expression, which yields items one by one instead of creating the entire list in memory.'
      },
      {
        id: 'py_int_lc_6',
        question: 'Can you have nested loops in a list comprehension?',
        options: ['No', 'Yes, but limited to two', 'Yes, e.g. [x*y for x in range(3) for y in range(3)]', 'Yes, but they must use different lists'],
        correctIndex: 2,
        explanation: 'You can chain multiple `for` clauses in a list comprehension.'
      },
      {
        id: 'py_int_lc_7',
        question: 'How do you do an if/else inline inside a list comprehension?',
        options: ['[x if x>0 else 0 for x in nums]', '[x for x in nums if x>0 else 0]', '[(if x>0 x else 0) for x in nums]', 'List comprehensions don\'t support else'],
        correctIndex: 0,
        explanation: 'If you want an if/else, you put it BEFORE the `for` keyword as a conditional expression.'
      },
      {
        id: 'py_int_lc_8',
        question: 'Which of the following creates a dictionary mapping x to x*2?',
        options: ['[x: x*2 for x in nums]', '{x: x*2 for x in nums}', 'dict(x, x*2 for x in nums)', 'map(x: x*2, nums)'],
        correctIndex: 1,
        explanation: 'Using curly braces with key: value syntax creates a Dictionary Comprehension.'
      }
    ]
  },
  dictionaries: {
    id: 'dictionaries',
    title: 'Dictionaries Deep Dive',
    tier: 'Intermediate',
    icon: '📖',
    color: 'hover:border-green-500',
    questions: [
      {
        id: 'py_int_dict_1',
        question: 'How do you create an empty dictionary in Python?',
        options: ['[]', '{}', 'dict[]', 'empty()'],
        correctIndex: 1,
        explanation: '{} creates an empty dictionary. [] creates an empty list.'
      },
      {
        id: 'py_int_dict_2',
        question: 'Which method returns a list-like view of all keys in a dictionary?',
        options: ['dict.keys()', 'dict.getKeys()', 'dict.all()', 'dict.index()'],
        correctIndex: 0,
        explanation: 'The `keys()` method returns a view object that displays a list of all the keys in the dictionary.'
      },
      {
        id: 'py_int_dict_3',
        question: 'What happens if you try to access a key that does not exist using bracket notation (e.g., `my_dict["missing"]`)?',
        options: ['It returns None', 'It returns False', 'It raises a KeyError', 'It creates the key automatically'],
        correctIndex: 2,
        explanation: 'Using bracket notation for a non-existent key raises a KeyError. Using `my_dict.get("missing")` returns None instead.'
      },
      {
        id: 'py_int_dict_4',
        question: 'How can you avoid a KeyError when accessing a potentially missing key?',
        options: ['Use the `fetch()` method', 'Use the `get()` method', 'Use the `grab()` method', 'It cannot be avoided'],
        correctIndex: 1,
        explanation: 'The `get()` method returns the value for the specified key if it exists, otherwise it returns None (or a specified default value).'
      },
      {
        id: 'py_int_dict_5',
        question: 'Which method removes all items from a dictionary?',
        options: ['dict.remove()', 'dict.delete()', 'dict.clear()', 'dict.empty()'],
        correctIndex: 2,
        explanation: 'The `clear()` method empties the entire dictionary.'
      },
      {
        id: 'py_int_dict_6',
        question: 'How do you update a dictionary `d1` with the key-value pairs from another dictionary `d2`?',
        options: ['d1.add(d2)', 'd1.update(d2)', 'd1.merge(d2)', 'd1.append(d2)'],
        correctIndex: 1,
        explanation: 'The `.update()` method adds d2\'s keys to d1, overwriting any existing keys.'
      },
      {
        id: 'py_int_dict_7',
        question: 'What is the output of `d = {"a":1}; d.setdefault("a", 2)`?',
        options: ['1', '2', 'None', 'Error'],
        correctIndex: 0,
        explanation: '`setdefault` returns the existing value if the key exists. It only sets the default value if the key is missing.'
      },
      {
        id: 'py_int_dict_8',
        question: 'How do you merge two dictionaries (d1 and d2) into a new dictionary in Python 3.9+?',
        options: ['d3 = d1 + d2', 'd3 = d1 | d2', 'd3 = merge(d1, d2)', 'd3 = d1.concat(d2)'],
        correctIndex: 1,
        explanation: 'Python 3.9 introduced the `|` merge operator for dictionaries.'
      }
    ]
  },
  exceptions_py: {
    id: 'exceptions_py',
    title: 'Python Exceptions',
    tier: 'Intermediate',
    icon: '⚠️',
    color: 'hover:border-yellow-500',
    questions: [
      {
        id: 'py_exc_1',
        question: 'Which keyword is used to catch an exception in Python?',
        options: ['catch', 'except', 'rescue', 'handle'],
        correctIndex: 1,
        explanation: 'Python uses the `try...except` block to handle exceptions.'
      },
      {
        id: 'py_exc_2',
        question: 'What block of code always runs whether an exception occurs or not?',
        options: ['else', 'finally', 'always', 'continue'],
        correctIndex: 1,
        explanation: 'The `finally` block is always executed, making it useful for closing files or releasing resources.'
      },
      {
        id: 'py_exc_3',
        question: 'How do you manually trigger an exception in Python?',
        options: ['throw', 'trigger', 'raise', 'signal'],
        correctIndex: 2,
        explanation: 'The `raise` keyword is used to manually throw an exception, e.g., `raise ValueError("Invalid!")`.'
      },
      {
        id: 'py_exc_4',
        question: 'What is the base class for all built-in exceptions in Python?',
        options: ['Exception', 'BaseException', 'Error', 'RuntimeError'],
        correctIndex: 1,
        explanation: '`BaseException` is the root class, though most user-defined and standard exceptions inherit from `Exception`.'
      },
      {
        id: 'py_exc_5',
        question: 'What does the `else` clause in a try/except block do?',
        options: ['Runs if an exception IS raised', 'Runs only if NO exception was raised', 'Runs always at the end', 'Catches any remaining exceptions'],
        correctIndex: 1,
        explanation: 'The `else` clause in a try block runs only if no exception was raised in the `try` block.'
      },
      {
        id: 'py_exc_6',
        question: 'How do you catch multiple exception types in one except clause?',
        options: ['except ValueError, TypeError:', 'except (ValueError, TypeError):', 'except ValueError | TypeError:', 'catch ValueError, TypeError:'],
        correctIndex: 1,
        explanation: 'Group multiple exception types in a tuple: `except (ValueError, TypeError):` will catch either.'
      }
    ]
  },
  file_handling_py: {
    id: 'file_handling_py',
    title: 'Python File Handling',
    tier: 'Intermediate',
    icon: '📁',
    color: 'hover:border-cyan-500',
    questions: [
      {
        id: 'py_file_1',
        question: 'What is the recommended way to open a file in Python?',
        options: ['file = open("data.txt")', 'with open("data.txt") as f:', 'file.open("data.txt")', 'read("data.txt")'],
        correctIndex: 1,
        explanation: 'Using the `with` statement ensures that the file is automatically closed when the block ends, even if an error occurs.'
      },
      {
        id: 'py_file_2',
        question: 'Which mode should you use to append data to an existing file?',
        options: ['"w"', '"r"', '"a"', '"x"'],
        correctIndex: 2,
        explanation: 'The "a" mode opens a file for appending, adding new data to the end without overwriting.'
      },
      {
        id: 'py_file_3',
        question: 'How do you read all the lines of a file into a list?',
        options: ['f.read()', 'f.readlines()', 'f.read_lines()', 'f.get_all()'],
        correctIndex: 1,
        explanation: 'The `readlines()` method reads all lines from the file and returns them as a list of strings.'
      },
      {
        id: 'py_file_4',
        question: 'What happens if you open a file in "w" mode and the file already exists?',
        options: ['It throws an error', 'It appends to the file', 'It truncates (overwrites) the file', 'It creates a new backup file'],
        correctIndex: 2,
        explanation: 'The "w" mode completely overwrites the existing file. Use "a" to append or "x" to fail if the file exists.'
      },
      {
        id: 'py_file_5',
        question: 'How do you write text to a file?',
        options: ['f.print("text")', 'f.write("text")', 'f.put("text")', 'f.output("text")'],
        correctIndex: 1,
        explanation: '`f.write("text")` writes a string to the file. It does NOT add a newline automatically — use `"text\\n"` if needed.'
      }
    ]
  },
  oop_basics_py: {
    id: 'oop_basics_py',
    title: 'OOP Basics',
    tier: 'Intermediate',
    icon: '🏗️',
    color: 'hover:border-indigo-500',
    questions: [
      {
        id: 'py_oop_1',
        question: 'What does `self` refer to inside a Python class method?',
        options: ['The class itself', 'The current instance of the class', 'The parent class', 'The module'],
        correctIndex: 1,
        explanation: '`self` is a reference to the current object instance. It must be the first parameter of every instance method.'
      },
      {
        id: 'py_oop_2',
        question: 'What is the `__init__` method used for?',
        options: ['Destroying objects', 'Importing modules', 'Initializing a new object instance', 'Defining class-level variables'],
        correctIndex: 2,
        explanation: '`__init__` is the constructor method, automatically called when a new instance of the class is created.'
      },
      {
        id: 'py_oop_3',
        question: 'How do you create an instance of a class `Dog` in Python?',
        options: ['new Dog()', 'Dog.create()', 'Dog()', 'create(Dog)'],
        correctIndex: 2,
        explanation: 'In Python, you call the class like a function: `my_dog = Dog()`. No `new` keyword needed!'
      },
      {
        id: 'py_oop_4',
        question: 'How does a class inherit from another class in Python?',
        options: ['class Child extends Parent:', 'class Child(Parent):', 'class Child inherits Parent:', 'class Child <- Parent:'],
        correctIndex: 1,
        explanation: 'Python uses parentheses for inheritance: `class Child(Parent):`. Multiple inheritance is also supported.'
      },
      {
        id: 'py_oop_5',
        question: 'What does `super()` do?',
        options: ['Makes the class faster', 'Refers to the current class', 'Calls a method from the parent class', 'Creates a superclass'],
        correctIndex: 2,
        explanation: '`super()` returns a proxy object that allows you to call methods from the parent class, commonly used in `__init__` to initialize the parent.'
      },
      {
        id: 'py_oop_6',
        question: 'What are dunder (magic) methods in Python?',
        options: ['Private methods starting with _', 'Methods starting and ending with __ like __str__', 'Deprecated methods', 'Methods defined inside functions'],
        correctIndex: 1,
        explanation: 'Dunder methods (double underscore) like `__str__`, `__repr__`, `__len__` are special methods that Python calls automatically in certain situations.'
      }
    ]
  },
  comprehensions_advanced_py: {
    id: 'comprehensions_advanced_py',
    title: 'Advanced Comprehensions',
    tier: 'Intermediate',
    icon: '⚡',
    color: 'hover:border-lime-500',
    questions: [
      {
        id: 'py_comp_adv_1',
        question: 'What does a dict comprehension look like?',
        options: ['{k: v for k, v in items}', '[k: v for k, v in items]', '(k: v for k, v in items)', '{k, v for k, v in items}'],
        correctIndex: 0,
        explanation: 'Dict comprehensions use curly braces with a key-value pair: `{k: v for k, v in items.items()}`.'
      },
      {
        id: 'py_comp_adv_2',
        question: 'What is a set comprehension?',
        options: ['{x for x in iterable}', '[x for x in iterable]', '(x for x in iterable)', 'set[x for x in iterable]'],
        correctIndex: 0,
        explanation: 'A set comprehension uses curly braces without key-value pairs: `{x*2 for x in range(5)}` creates a set.'
      },
      {
        id: 'py_comp_adv_3',
        question: 'What is a generator expression?',
        options: ['A list comprehension with yield', '(x for x in iterable) — lazy evaluation', '{x for x in iterable}', 'A function that returns a list'],
        correctIndex: 1,
        explanation: 'Generator expressions look like list comprehensions but use parentheses. They are lazy — they generate values one at a time, saving memory.'
      },
      {
        id: 'py_comp_adv_4',
        question: 'What is the output of `[x**2 for x in range(4) if x % 2 == 0]`?',
        options: ['[0, 4]', '[0, 1, 4, 9]', '[4]', '[1, 9]'],
        correctIndex: 0,
        explanation: 'The condition `if x % 2 == 0` filters for even numbers (0 and 2), then squares them to get [0, 4].'
      }
    ]
  },
  lambda_map_filter_py: {
    id: 'lambda_map_filter_py',
    title: 'Lambda, Map & Filter',
    tier: 'Intermediate',
    icon: '🧩',
    color: 'hover:border-pink-500',
    questions: [
      {
        id: 'py_lmf_1',
        question: 'What is a lambda function in Python?',
        options: ['A named function', 'An anonymous, single-expression function', 'A function that returns None', 'A built-in function'],
        correctIndex: 1,
        explanation: 'Lambda functions are anonymous functions defined with the `lambda` keyword: `lambda x: x * 2`.'
      },
      {
        id: 'py_lmf_2',
        question: 'What does `map(func, iterable)` return?',
        options: ['A list', 'A dictionary', 'A map object (lazy iterator)', 'A set'],
        correctIndex: 2,
        explanation: '`map()` returns a lazy map object. Wrap it in `list()` to get a list: `list(map(lambda x: x*2, [1,2,3]))`.'
      },
      {
        id: 'py_lmf_3',
        question: 'What does `filter(func, iterable)` do?',
        options: ['Transforms each element', 'Returns elements where func returns True', 'Sorts the elements', 'Removes None values only'],
        correctIndex: 1,
        explanation: '`filter()` returns only the elements for which the function returns a truthy value.'
      },
      {
        id: 'py_lmf_4',
        question: 'What does `reduce(lambda x, y: x + y, [1,2,3,4])` return?',
        options: ['[1,2,3,4]', '10', '4', 'Error'],
        correctIndex: 1,
        explanation: '`reduce` applies the function cumulatively: ((1+2)+3)+4 = 10. It must be imported from `functools`.'
      },
      {
        id: 'py_lmf_5',
        question: 'What is the equivalent list comprehension for `list(map(lambda x: x**2, nums))`?',
        options: ['[x**2 for x in nums]', '{x**2 for x in nums}', '(x**2 for x in nums)', '[x for x**2 in nums]'],
        correctIndex: 0,
        explanation: 'List comprehensions are generally preferred over map() for readability in Python.'
      }
    ]
  }
};
