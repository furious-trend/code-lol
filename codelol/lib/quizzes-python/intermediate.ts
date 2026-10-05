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
        explanation: 'List comprehensions provide a concise way to create lists. Common applications are to make new lists where each element is the result of some operations applied to each member of another sequence.'
      },
      {
        id: 'py_int_lc_2',
        question: 'Which of the following creates a list of squares for numbers from 0 to 4?',
        options: ['[x**2 for x in range(5)]', 'list(square(0:4))', '[(x*x) in range(4)]', '{x**2 for x in range(5)}'],
        correctIndex: 0,
        explanation: '[x**2 for x in range(5)] produces [0, 1, 4, 9, 16]. The curly braces would create a set comprehension instead.'
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
      }
    ]
  },
  dictionaries: {
    id: 'dictionaries',
    title: 'Dictionaries',
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
        question: 'Which method returns a list of all keys in a dictionary?',
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
      }
    ]
  }
};
