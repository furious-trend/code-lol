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
        explanation: 'In Python, the `range(5)` function generates a sequence of numbers from 0 to 4, so `for i in range(5):` loops 5 times.'
      },
      {
        id: 'py_loop_2',
        question: 'What keyword skips the rest of the current iteration and goes to the next one?',
        options: ['skip', 'next', 'continue', 'jump'],
        correctIndex: 2,
        explanation: '`continue` skips the rest of the loop block and starts the next iteration.'
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
        explanation: 'In Python, the `append()` method adds a single item to the end of the list.'
      },
      {
        id: 'py_list_2',
        question: 'How do you find the number of items in a Python list?',
        options: ['list.length', 'len(list)', 'list.size()', 'count(list)'],
        correctIndex: 1,
        explanation: 'The built-in function `len()` returns the number of items in a list.'
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
        explanation: 'Python uses indentation (usually 4 spaces) to define code blocks instead of curly braces.'
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
      }
    ]
  }
};
