// agent-notes: { ctx: "C++ quiz topics for basics, OOP, and Standard Template Library", deps: ["./quizzes/types"], state: "active", last: "sato@2026-10-31" }
import { QuizTopic } from './quizzes/types';

export const cppQuizzes: Record<string, QuizTopic> = {
  cpp_basics: {
    id: 'cpp_basics',
    title: 'C++ Basics',
    tier: 'Beginner',
    icon: '📦',
    color: 'bg-cyan-500',
    questions: [
      {
        id: 'cpp_1',
        question: 'Which of the following is the correct syntax to output "Hello" in C++?',
        options: ['System.out.println("Hello");', 'console.log("Hello");', 'printf("Hello");', 'cout << "Hello";'],
        correctIndex: 3,
        explanation: 'In C++, std::cout combined with the insertion operator (<<) outputs text.'
      },
      {
        id: 'cpp_2',
        question: 'How do you include the standard input/output stream library in C++?',
        options: ['import iostream;', '#include <iostream>', 'using iostream;', 'require("iostream");'],
        correctIndex: 1,
        explanation: '#include <iostream> is the preprocessor directive to include standard stream definitions.'
      },
      {
        id: 'cpp_3',
        question: 'Which standard namespace contains cout, vector, and string in C++?',
        options: ['std', 'standard', 'core', 'cpp'],
        correctIndex: 0,
        explanation: 'The std namespace houses all standard C++ library components.'
      }
    ]
  },
  cpp_oop: {
    id: 'cpp_oop',
    title: 'OOP & RAII',
    tier: 'Intermediate',
    icon: '🏛️',
    color: 'bg-teal-600',
    questions: [
      {
        id: 'cpp_oop_1',
        question: 'What is the default access specifier for members of a `class` in C++?',
        options: ['public', 'protected', 'private', 'internal'],
        correctIndex: 2,
        explanation: 'Class members in C++ are private by default; struct members are public by default.'
      },
      {
        id: 'cpp_oop_2',
        question: 'What keyword allows a base class method to be dynamically overridden at runtime?',
        options: ['static', 'virtual', 'override', 'const'],
        correctIndex: 1,
        explanation: 'The virtual keyword enables dynamic dispatch via vtables.'
      },
      {
        id: 'cpp_oop_3',
        question: 'What does RAII stand for in modern C++?',
        options: ['Random Array Index Initialization', 'Resource Acquisition Is Initialization', 'Runtime Access Interface Implementation', 'Reusable Abstract Instance Inheritance'],
        correctIndex: 1,
        explanation: 'RAII binds resource lifecycle to object lifespan, automatically freeing memory and file locks upon destruction.'
      }
    ]
  },
  cpp_stl: {
    id: 'cpp_stl',
    title: 'STL Containers & Vectors',
    tier: 'Advanced',
    icon: '⚡',
    color: 'bg-emerald-600',
    questions: [
      {
        id: 'cpp_stl_1',
        question: 'What is the amortized time complexity of adding an element with push_back to a std::vector?',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)'],
        correctIndex: 0,
        explanation: 'Vector amortized push_back is O(1) because geometric doubling amortizes reallocations.'
      },
      {
        id: 'cpp_stl_2',
        question: 'Which smart pointer prevents any duplicate ownership and cannot be copied, only moved?',
        options: ['std::shared_ptr', 'std::weak_ptr', 'std::unique_ptr', 'std::auto_ptr'],
        correctIndex: 2,
        explanation: 'std::unique_ptr uniquely owns its resource and enforces move semantics exclusively.'
      },
      {
        id: 'cpp_stl_3',
        question: 'Which STL container stores key-value pairs sorted automatically in logarithmic time?',
        options: ['std::unordered_map', 'std::map', 'std::vector', 'std::list'],
        correctIndex: 1,
        explanation: 'std::map is implemented as a self-balancing binary search tree (Red-Black tree) maintaining sorted order.'
      }
    ]
  }
};
