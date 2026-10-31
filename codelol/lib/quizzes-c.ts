// agent-notes: { ctx: "C language quiz topics for basics, pointers, and dynamic memory", deps: ["./quizzes/types"], state: "active", last: "sato@2026-10-31" }
import { QuizTopic } from './quizzes/types';

export const cQuizzes: Record<string, QuizTopic> = {
  c_basics: {
    id: 'c_basics',
    title: 'C Basics',
    tier: 'Beginner',
    icon: '📦',
    color: 'bg-indigo-500',
    questions: [
      {
        id: 'c_1',
        question: 'Which of the following is the correct syntax to output "Hello" in C?',
        options: ['System.out.println("Hello");', 'console.log("Hello");', 'printf("Hello");', 'cout << "Hello";'],
        correctIndex: 2,
        explanation: 'In C, printf from <stdio.h> is used for formatted console output.'
      },
      {
        id: 'c_2',
        question: 'How do you declare an integer variable in C?',
        options: ['let num = 5;', 'int num = 5;', 'num = 5;', 'integer num = 5;'],
        correctIndex: 1,
        explanation: 'C is statically typed and requires explicit type declarations like int.'
      },
      {
        id: 'c_3',
        question: 'Which symbol is used for a single-line comment in modern C?',
        options: ['//', '/*', '#', '<!--'],
        correctIndex: 0,
        explanation: '// denotes a single-line comment since C99.'
      }
    ]
  },
  c_pointers: {
    id: 'c_pointers',
    title: 'Pointers & Addresses',
    tier: 'Intermediate',
    icon: '👉',
    color: 'bg-blue-600',
    questions: [
      {
        id: 'c_ptr_1',
        question: 'Which operator is used to extract the memory address of a variable in C?',
        options: ['*', '&', '->', '@'],
        correctIndex: 1,
        explanation: 'The address-of operator (&) extracts the memory location where a variable lives.'
      },
      {
        id: 'c_ptr_2',
        question: 'What does dereferencing a NULL pointer trigger?',
        options: ['Returns 0', 'Segmentation Fault / crash', 'Garbage collection', 'Creates a new variable'],
        correctIndex: 1,
        explanation: 'Attempting to read or write to address 0 causes the OS kernel to abort with a segmentation fault.'
      },
      {
        id: 'c_ptr_3',
        question: 'What is the format specifier used in printf to display pointer memory addresses?',
        options: ['%d', '%s', '%p', '%f'],
        correctIndex: 2,
        explanation: '%p is specifically designed to print pointer addresses in hexadecimal format.'
      }
    ]
  },
  c_memory: {
    id: 'c_memory',
    title: 'Dynamic Memory & Heap',
    tier: 'Advanced',
    icon: '🧠',
    color: 'bg-purple-600',
    questions: [
      {
        id: 'c_mem_1',
        question: 'Which function allocates heap memory without initializing its contents to zero?',
        options: ['calloc()', 'malloc()', 'realloc()', 'new()'],
        correctIndex: 1,
        explanation: 'malloc() allocates raw uninitialized heap bytes; calloc() zeroes them out.'
      },
      {
        id: 'c_mem_2',
        question: 'What happens if you allocate memory with malloc() but never call free() before terminating a long-running daemon?',
        options: ['Automatic garbage collection', 'A memory leak', 'Compilation failure', 'Stack overflow'],
        correctIndex: 1,
        explanation: 'C does not have a garbage collector, so un-freed heap allocations remain allocated, leaking memory.'
      },
      {
        id: 'c_mem_3',
        question: 'What is a "dangling pointer"?',
        options: ['A pointer set to NULL', 'A pointer pointing to deallocated/freed memory', 'A pointer to a function', 'A double pointer'],
        correctIndex: 1,
        explanation: 'A dangling pointer still holds the memory address of storage that has already been released.'
      }
    ]
  }
};
