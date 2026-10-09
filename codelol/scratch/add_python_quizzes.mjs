import fs from 'fs';
import path from 'path';

const beginnerPath = '/home/shafi/projects/code lol/codelol/lib/quizzes-python/beginner.ts';
let beginnerContent = fs.readFileSync(beginnerPath, 'utf8');

const newBeginnerTopics = `,
  operators_py: {
    id: 'operators_py',
    title: 'Python Operators',
    tier: 'Beginner',
    icon: '➕',
    color: 'hover:border-red-500',
    questions: [
      {
        id: 'py_op_1',
        question: 'What does the // operator do in Python?',
        options: ['Floor division', 'Standard division', 'Comments', 'Exponentiation'],
        correctIndex: 0,
        explanation: 'The // operator performs floor division, returning the largest integer less than or equal to the division result.'
      },
      {
        id: 'py_op_2',
        question: 'What is the output of 2 ** 3?',
        options: ['6', '5', '8', '9'],
        correctIndex: 2,
        explanation: 'The ** operator is used for exponentiation, so 2 ** 3 is 2 to the power of 3, which equals 8.'
      },
      {
        id: 'py_op_3',
        question: 'Which operator is used to check if two values are equal?',
        options: ['=', '==', '===', '!='],
        correctIndex: 1,
        explanation: 'In Python, == checks for equality, while = is used for assignment.'
      },
      {
        id: 'py_op_4',
        question: 'What does the modulo operator % do?',
        options: ['Returns the percentage', 'Returns the quotient', 'Returns the remainder of a division', 'Multiplies by 100'],
        correctIndex: 2,
        explanation: 'The modulo operator % returns the remainder after division. For example, 10 % 3 returns 1.'
      },
      {
        id: 'py_op_5',
        question: 'Which of the following is the logical AND operator in Python?',
        options: ['&&', 'AND', 'and', '&'],
        correctIndex: 2,
        explanation: 'Python uses the spelled-out keyword `and` for logical AND operations, unlike JS/C which use &&.'
      }
    ]
  },
  conditionals_py: {
    id: 'conditionals_py',
    title: 'Python Conditionals',
    tier: 'Beginner',
    icon: '🔀',
    color: 'hover:border-indigo-500',
    questions: [
      {
        id: 'py_cond_1',
        question: 'Which keyword is used for an "else if" condition in Python?',
        options: ['else if', 'elseif', 'elif', 'if else'],
        correctIndex: 2,
        explanation: 'Python uses the shorthand `elif` instead of `else if`.'
      },
      {
        id: 'py_cond_2',
        question: 'What happens if you forget to indent the block under an if statement?',
        options: ['It runs normally', 'It runs only the first line', 'It throws an IndentationError', 'It loops forever'],
        correctIndex: 2,
        explanation: 'Python relies on indentation to define blocks of code, so missing indentation throws an IndentationError.'
      },
      {
        id: 'py_cond_3',
        question: 'How do you check if a value is NOT equal to another in Python?',
        options: ['!=', '!==', '<>', 'not ='],
        correctIndex: 0,
        explanation: 'The `!=` operator checks for inequality. (In Python 2, `<>` was also used, but it was removed in Python 3).'
      },
      {
        id: 'py_cond_4',
        question: 'Which of the following is a valid ternary operator in Python?',
        options: ['x = a ? b : c', 'x = b if a else c', 'x = if a then b else c', 'x = a if b else c'],
        correctIndex: 1,
        explanation: 'Python\'s ternary operator syntax is `[on_true] if [condition] else [on_false]`.'
      },
      {
        id: 'py_cond_5',
        question: 'What will `if "hello":` do in Python?',
        options: ['Throw an error', 'Evaluate to False', 'Evaluate to True', 'Check if "hello" is a defined variable'],
        correctIndex: 2,
        explanation: 'Non-empty strings are considered "truthy" in Python, so the block will execute.'
      }
    ]
  }
};`;

beginnerContent = beginnerContent.replace(/\n\s*};\s*$/, newBeginnerTopics);
fs.writeFileSync(beginnerPath, beginnerContent);
console.log("Updated beginner.ts");

const intPath = '/home/shafi/projects/code lol/codelol/lib/quizzes-python/intermediate.ts';
let intContent = fs.readFileSync(intPath, 'utf8');

const newIntTopics = `,
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
      }
    ]
  }
};`;

intContent = intContent.replace(/\n\s*};\s*$/, newIntTopics);
fs.writeFileSync(intPath, intContent);
console.log("Updated intermediate.ts");

