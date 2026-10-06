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
        explanation: 'snake_case is standard in Python. Variables cannot start with numbers, cannot have hyphens, and cannot be reserved keywords.'
      },
      {
        id: 'py_var_3',
        question: 'How do you print something to the console in Python?',
        options: ['console.log()', 'print()', 'echo()', 'System.out.println()'],
        correctIndex: 1,
        explanation: 'Python uses the built-in print() function.'
      },
      {
        id: 'py_var_4',
        question: 'Which of the following assigns the same value to multiple variables at once?',
        options: ['x, y, z = 5', 'x = y = z = 5', 'x & y & z = 5', 'assign(x, y, z, 5)'],
        correctIndex: 1,
        explanation: 'In Python, you can assign the same value to multiple variables in one line using chained assignment.'
      },
      {
        id: 'py_var_5',
        question: 'Are Python variables strongly or dynamically typed?',
        options: ['Statically typed', 'Dynamically typed', 'Manually typed', 'Not typed'],
        correctIndex: 1,
        explanation: 'Python is dynamically typed, meaning a variable can hold an integer, and later be reassigned to a string without errors.'
      },
      {
        id: 'py_var_6',
        question: 'What is the standard naming convention for variables in Python?',
        options: ['camelCase', 'PascalCase', 'snake_case', 'kebab-case'],
        correctIndex: 2,
        explanation: 'PEP 8 (the Python style guide) recommends using snake_case for variable and function names.'
      },
      {
        id: 'py_var_7',
        question: 'How do you define a constant variable in Python (by convention)?',
        options: ['const PI = 3.14', 'let PI = 3.14', 'PI = 3.14', 'constant PI = 3.14'],
        correctIndex: 2,
        explanation: 'Python does not have a built-in constant keyword. By convention, programmers use ALL_CAPS to indicate a variable should be treated as a constant.'
      },
      {
        id: 'py_var_8',
        question: 'What function tells you the memory address (identity) of a variable?',
        options: ['type()', 'address()', 'id()', 'loc()'],
        correctIndex: 2,
        explanation: 'The id() function returns the unique memory address identifier of an object in CPython.'
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
        explanation: 'In Python, booleans must be capitalized: True and False.'
      },
      {
        id: 'py_dt_2',
        question: 'What is the equivalent of "null" or "undefined" in Python?',
        options: ['null', 'undefined', 'None', 'nil'],
        correctIndex: 2,
        explanation: 'Python uses "None" (capitalized) to represent the absence of a value.'
      },
      {
        id: 'py_dt_3',
        question: 'Which function tells you the data type of a variable?',
        options: ['typeof()', 'type()', 'class()', 'get_type()'],
        correctIndex: 1,
        explanation: 'The type() function returns the class/type of the variable passed to it.'
      },
      {
        id: 'py_dt_4',
        question: 'How do you write a multi-line string in Python?',
        options: ['Using //', 'Using triple quotes \'\'\' or """', 'Using backticks `', 'By pressing enter'],
        correctIndex: 1,
        explanation: 'Triple quotes allow strings to span multiple lines, often used for docstrings.'
      },
      {
        id: 'py_dt_5',
        question: 'Which of these is an immutable sequence type?',
        options: ['List', 'Dictionary', 'Tuple', 'Set'],
        correctIndex: 2,
        explanation: 'Tuples (defined with parentheses) are immutable, meaning they cannot be changed after creation.'
      },
      {
        id: 'py_dt_6',
        question: 'What is the result of type(3.14)?',
        options: ['<class \'int\'>', '<class \'double\'>', '<class \'decimal\'>', '<class \'float\'>'],
        correctIndex: 3,
        explanation: 'In Python, all floating-point numbers are represented by the float type (implemented as C doubles).'
      },
      {
        id: 'py_dt_7',
        question: 'How do you convert a string "123" into an integer?',
        options: ['parseInt("123")', 'to_int("123")', 'int("123")', '(int)"123"'],
        correctIndex: 2,
        explanation: 'You use the built-in int() function to cast strings (or floats) to integers.'
      },
      {
        id: 'py_dt_8',
        question: 'What type is the expression 5 / 2 in Python 3?',
        options: ['int', 'float', 'double', 'Fraction'],
        correctIndex: 1,
        explanation: 'In Python 3, standard division (/) always returns a float (2.5). Floor division (//) would return an int (2).'
      }
    ]
  },
  loops_py: {
    id: 'loops_py',
    title: 'Python Loops',
    tier: 'Beginner',
    icon: '🔁',
    color: 'hover:border-pink-500',
    questions: [
      {
        id: 'py_loop_1',
        question: 'How do you write a for loop that runs 5 times in Python?',
        options: ['for (i=0; i<5; i++)', 'for i in range(5):', 'loop 5 times:', 'while i < 5:'],
        correctIndex: 1,
        explanation: 'The range(5) function generates numbers 0 through 4, so `for i in range(5):` loops exactly 5 times.'
      },
      {
        id: 'py_loop_2',
        question: 'What keyword skips the rest of the current iteration and goes to the next one?',
        options: ['skip', 'next', 'continue', 'jump'],
        correctIndex: 2,
        explanation: '`continue` instantly skips the rest of the loop block and starts the next iteration.'
      },
      {
        id: 'py_loop_3',
        question: 'What keyword completely terminates a loop prematurely?',
        options: ['stop', 'end', 'break', 'exit'],
        correctIndex: 2,
        explanation: '`break` exits the current loop immediately.'
      },
      {
        id: 'py_loop_4',
        question: 'Which statement can optionally follow a for or while loop in Python?',
        options: ['then', 'else', 'finally', 'catch'],
        correctIndex: 1,
        explanation: 'Python loops can have an `else` block, which executes ONLY if the loop finishes naturally (without hitting a `break` statement).'
      },
      {
        id: 'py_loop_5',
        question: 'How do you loop over both the index and the value of a list simultaneously?',
        options: ['for i, val in list:', 'for i, val in enumerate(list):', 'for val in list.items():', 'for i in range(list):'],
        correctIndex: 1,
        explanation: 'The enumerate() built-in function yields pairs containing a count (from zero) and a value yielded by the iterable.'
      },
      {
        id: 'py_loop_6',
        question: 'What does a `while True:` loop do?',
        options: ['Runs once', 'Throws a syntax error', 'Creates an infinite loop', 'Waits for True to become False'],
        correctIndex: 2,
        explanation: 'Since True is always true, it creates an infinite loop that will run forever unless a `break` statement is executed inside.'
      },
      {
        id: 'py_loop_7',
        question: 'What does `range(2, 10, 2)` produce?',
        options: ['2, 4, 6, 8, 10', '2, 3, 4, ..., 10', '2, 4, 6, 8', '10, 8, 6, 4, 2'],
        correctIndex: 2,
        explanation: 'range(start, stop, step). It starts at 2, goes up to (but excludes) 10, in steps of 2.'
      },
      {
        id: 'py_loop_8',
        question: 'How do you iterate over the keys of a dictionary `d`?',
        options: ['for key in d:', 'for key in d.keys():', 'Both A and B are correct', 'for key, val in d:'],
        correctIndex: 2,
        explanation: 'Iterating directly over a dictionary (for k in d:) loops through its keys, which is equivalent to using d.keys().'
      }
    ]
  },
  lists_py: {
    id: 'lists_py',
    title: 'Python Lists',
    tier: 'Beginner',
    icon: '📚',
    color: 'hover:border-purple-500',
    questions: [
      {
        id: 'py_list_1',
        question: 'How do you add an item to the end of a Python list?',
        options: ['list.push()', 'list.add()', 'list.append()', 'list.insert()'],
        correctIndex: 2,
        explanation: 'The append() method adds a single item to the end of the list.'
      },
      {
        id: 'py_list_2',
        question: 'How do you find the number of items in a Python list?',
        options: ['list.length', 'len(list)', 'list.size()', 'count(list)'],
        correctIndex: 1,
        explanation: 'The built-in function len() returns the number of items in a sequence or collection.'
      },
      {
        id: 'py_list_3',
        question: 'How do you access the last item of a list `arr` without knowing its length?',
        options: ['arr.last()', 'arr[-1]', 'arr[end]', 'arr[len - 1]'],
        correctIndex: 1,
        explanation: 'Python supports negative indexing. -1 refers to the last element, -2 to the second to last, and so on.'
      },
      {
        id: 'py_list_4',
        question: 'What does `arr[1:4]` do?',
        options: ['Returns elements at index 1, 2, 3, and 4', 'Returns elements from index 1 up to index 3', 'Deletes elements from 1 to 4', 'Replaces index 1 with 4'],
        correctIndex: 1,
        explanation: 'Slicing syntax [start:stop] includes the start index but EXCLUDES the stop index.'
      },
      {
        id: 'py_list_5',
        question: 'Which method removes and returns the last item from a list?',
        options: ['remove()', 'pop()', 'delete()', 'shift()'],
        correctIndex: 1,
        explanation: 'pop() removes the last item by default and returns it. You can also pass an index to pop(i).'
      },
      {
        id: 'py_list_6',
        question: 'How do you sort a list named `nums` in place?',
        options: ['nums = sorted(nums)', 'nums.sort()', 'sort(nums)', 'nums.order()'],
        correctIndex: 1,
        explanation: 'The .sort() method sorts the list in place (modifying the original list). sorted(nums) returns a new sorted list.'
      },
      {
        id: 'py_list_7',
        question: 'How do you merge `list2` onto the end of `list1`?',
        options: ['list1.append(list2)', 'list1.extend(list2)', 'list1.push(list2)', 'list1.merge(list2)'],
        correctIndex: 1,
        explanation: 'extend() unpacks list2 and adds its elements to list1. Using append() would add the entire list2 as a single nested list item.'
      },
      {
        id: 'py_list_8',
        question: 'Can a Python list contain mixed data types?',
        options: ['No, arrays must be strictly typed', 'Yes, a list can contain ints, strings, and other lists simultaneously', 'Only if you import the typing module', 'Yes, but only strings and numbers'],
        correctIndex: 1,
        explanation: 'Python lists are heterogeneous, meaning they can hold any mix of object types.'
      }
    ]
  },
  functions_py: {
    id: 'functions_py',
    title: 'Python Functions',
    tier: 'Beginner',
    icon: '⚙️',
    color: 'hover:border-yellow-500',
    questions: [
      {
        id: 'py_func_1',
        question: 'Which keyword is used to define a function in Python?',
        options: ['function', 'def', 'func', 'define'],
        correctIndex: 1,
        explanation: 'Python uses the `def` keyword to define a function.'
      },
      {
        id: 'py_func_2',
        question: 'What defines a code block in Python (like inside a function)?',
        options: ['Curly braces {}', 'Square brackets []', 'Indentation (whitespace)', 'Parentheses ()'],
        correctIndex: 2,
        explanation: 'Python uses indentation (typically 4 spaces) to define code blocks instead of curly braces.'
      },
      {
        id: 'py_func_3',
        question: 'How do you provide a default value for a function parameter?',
        options: ['def my_func(x default 5):', 'def my_func(x = 5):', 'def my_func(x: 5):', 'def my_func(x) -> 5:'],
        correctIndex: 1,
        explanation: 'You can assign a default value using the equals sign directly in the parameter list.'
      },
      {
        id: 'py_func_4',
        question: 'What keyword is used to return a value from a function?',
        options: ['yield', 'return', 'output', 'send'],
        correctIndex: 1,
        explanation: 'The return statement ends function execution and passes the value back to the caller.'
      },
      {
        id: 'py_func_5',
        question: 'What does a Python function return if there is no return statement?',
        options: ['0', 'False', 'None', 'It raises an error'],
        correctIndex: 2,
        explanation: 'If a function finishes executing without hitting a return statement, it implicitly returns None.'
      },
      {
        id: 'py_func_6',
        question: 'What are *args used for in a function definition?',
        options: ['To pass a dictionary of arguments', 'To pass a variable number of positional arguments', 'To enforce strict typing', 'To make arguments required'],
        correctIndex: 1,
        explanation: '*args gathers remaining positional arguments into a tuple.'
      },
      {
        id: 'py_func_7',
        question: 'What is a lambda function in Python?',
        options: ['A function that runs in AWS', 'A large, multi-line function', 'A small anonymous function defined with the lambda keyword', 'A function that handles math equations'],
        correctIndex: 2,
        explanation: 'Lambda functions are short, anonymous functions restricted to a single expression, e.g., `square = lambda x: x ** 2`.'
      },
      {
        id: 'py_func_8',
        question: 'What is the purpose of docstrings (triple quotes """...""") immediately under a function definition?',
        options: ['To comment out the function', 'To document what the function does for tools and help()', 'To define a multi-line string variable', 'To hide the function'],
        correctIndex: 1,
        explanation: 'Docstrings provide documentation for the function, which can be accessed dynamically using the __doc__ attribute or the help() function.'
      }
    ]
  },
  dictionaries_py: {
    id: 'dictionaries_py',
    title: 'Python Dictionaries',
    tier: 'Beginner',
    icon: '🏷️',
    color: 'hover:border-orange-500',
    questions: [
      {
        id: 'py_dict_1',
        question: 'How do you access the value associated with the key "name" in a dictionary `person`?',
        options: ['person.name', 'person["name"]', 'person(name)', 'person->name'],
        correctIndex: 1,
        explanation: 'In Python, you use bracket notation to access dictionary values by their keys.'
      },
      {
        id: 'py_dict_2',
        question: 'What happens if you try to access a key that doesn\'t exist using bracket notation (e.g. `d["missing"]`)?',
        options: ['It returns None', 'It returns an empty string', 'It raises a KeyError', 'It automatically creates the key'],
        correctIndex: 2,
        explanation: 'Using bracket notation for a missing key throws a KeyError. To avoid this, use the .get() method instead.'
      },
      {
        id: 'py_dict_3',
        question: 'How do you safely retrieve a value from a dictionary, returning None if the key is missing?',
        options: ['d.fetch("key")', 'd.get("key")', 'd.retrieve("key")', 'd["key"].safe()'],
        correctIndex: 1,
        explanation: 'The .get() method returns the value if the key exists, and None (or a specified default) if it does not.'
      },
      {
        id: 'py_dict_4',
        question: 'How do you add or update a key-value pair in a dictionary?',
        options: ['d.add("key", "value")', 'd.insert("key", "value")', 'd.append("key", "value")', 'd["key"] = "value"'],
        correctIndex: 3,
        explanation: 'You simply assign a value to the key using bracket notation. If the key exists, it updates; if not, it creates it.'
      },
      {
        id: 'py_dict_5',
        question: 'Which method returns a view object of all the keys in a dictionary?',
        options: ['d.keys()', 'd.get_keys()', 'd.all()', 'd.indexes()'],
        correctIndex: 0,
        explanation: 'The keys() method returns a dict_keys view object containing all the dictionary\'s keys.'
      },
      {
        id: 'py_dict_6',
        question: 'How do you loop through both keys and values simultaneously in a dictionary?',
        options: ['for k, v in d:', 'for k, v in d.items():', 'for k, v in enumerate(d):', 'for k, v in d.values():'],
        correctIndex: 1,
        explanation: 'The .items() method returns view objects of (key, value) tuples.'
      },
      {
        id: 'py_dict_7',
        question: 'What data type can NOT be used as a dictionary key in Python?',
        options: ['String', 'Integer', 'Tuple', 'List'],
        correctIndex: 3,
        explanation: 'Dictionary keys must be immutable and hashable. Lists are mutable, so they cannot be used as keys.'
      },
      {
        id: 'py_dict_8',
        question: 'How do you completely remove a key-value pair from a dictionary?',
        options: ['remove d["key"]', 'del d["key"]', 'd.pop_key("key")', 'd.clear("key")'],
        correctIndex: 1,
        explanation: 'The `del` statement removes the key-value pair entirely. You can also use `d.pop("key")` if you want to get the value before it\'s removed.'
      }
    ]
  }
};
