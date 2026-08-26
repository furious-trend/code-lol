import { QuizTopic } from './types';

export const advancedTopics: Record<string, QuizTopic> = {
  inheritance: {
    id: 'inheritance',
    title: 'Inheritance & Polymorphism',
    tier: 'Advanced',
    icon: '🧬',
    color: 'hover:border-purple-400',
    questions: [
      {
        id: 'adv_inh_1',
        question: 'What is inheritance in object-oriented programming?',
        options: ['A way to pass variables to functions', 'A mechanism where a new class derives properties and methods from an existing class', 'A design pattern for caching', 'A method of encrypting data'],
        correctIndex: 1,
        explanation: 'Inheritance allows a child class to reuse and build upon the structure and behavior of a parent class.'
      },
      {
        id: 'adv_inh_2',
        question: 'What does polymorphism allow you to do?',
        options: ['Treat objects of different child classes as objects of their parent class', 'Change the type of a primitive variable at runtime', 'Run multiple threads concurrently', 'Compile code for different operating systems'],
        correctIndex: 0,
        explanation: 'Polymorphism (many forms) lets you call the same method on different child objects, and each executes its own specific overridden version.'
      },
      {
        id: 'adv_inh_3',
        question: 'In JavaScript, how is inheritance implemented under the hood?',
        options: ['Using classical inheritance like Java', 'Using prototypical inheritance', 'Through strict interface implementation', 'By copying properties into new memory blocks'],
        correctIndex: 1,
        explanation: 'JS uses prototypical inheritance, where objects inherit directly from other objects via the prototype chain.'
      },
      {
        id: 'adv_inh_4',
        question: 'What is the purpose of the "super" keyword in a derived class constructor?',
        options: ['To bypass access modifiers', 'To call the constructor of the parent class', 'To make a variable globally accessible', 'To override a parent method'],
        correctIndex: 1,
        explanation: 'You must call super() before accessing "this" in a derived class to initialize the parent class\'s properties.'
      },
      {
        id: 'adv_inh_5',
        question: 'Which principle states that subclasses should be substitutable for their base classes?',
        options: ['Single Responsibility Principle', 'Open-Closed Principle', 'Liskov Substitution Principle', 'Dependency Inversion Principle'],
        correctIndex: 2,
        explanation: 'The Liskov Substitution Principle (the L in SOLID) ensures that replacing a parent class with a child class doesn\'t break the program.'
      },
      {
        id: 'adv_inh_6',
        question: 'What is an abstract class?',
        options: ['A class that cannot be instantiated and is meant to be subclassed', 'A class containing only static methods', 'A class with no defined methods', 'A class that inherits from multiple parents'],
        correctIndex: 0,
        explanation: 'Abstract classes serve as a blueprint for other classes and enforce certain methods to be implemented by child classes, but you can\'t create an object directly from them.'
      },
      {
        id: 'adv_inh_7',
        question: 'Method overriding occurs when...',
        options: ['Two methods in the same class have the same name but different parameters', 'A child class provides a specific implementation for a method defined in its parent', 'A method calls itself recursively', 'A method throws an error'],
        correctIndex: 1,
        explanation: 'Overriding lets a child class completely replace or extend the behavior of a parent class\'s method. (Having same name/different params in the same class is method OVERLOADING).'
      },
      {
        id: 'adv_inh_8',
        question: 'What is a common pitfall of deep inheritance hierarchies?',
        options: ['Memory leaks', 'The Fragile Base Class problem', 'Infinite loops', 'Syntax errors during transpilation'],
        correctIndex: 1,
        explanation: 'The Fragile Base Class problem occurs when a seemingly safe change to a parent class breaks its descendants in unexpected ways. "Favor composition over inheritance!"'
      }
    ]
  },
  designPatterns: {
    id: 'designPatterns',
    title: 'Design Patterns',
    tier: 'Advanced',
    icon: '🧩',
    color: 'hover:border-purple-500',
    questions: [
      {
        id: 'adv_dp_1',
        question: 'Which design pattern ensures a class only has one instance and provides a global point of access to it?',
        options: ['Factory', 'Observer', 'Singleton', 'Decorator'],
        correctIndex: 2,
        explanation: 'The Singleton pattern restricts instantiation of a class to a single object, useful for things like database connections or global configuration.'
      },
      {
        id: 'adv_dp_2',
        question: 'The Observer pattern is most commonly used for:',
        options: ['Creating families of related objects', 'Event handling and state management', 'Iterating over a collection', 'Wrapping an object to add new behaviors'],
        correctIndex: 1,
        explanation: 'In the Observer pattern, a subject maintains a list of its dependents (observers) and notifies them automatically of any state changes.'
      },
      {
        id: 'adv_dp_3',
        question: 'Which pattern defines an interface for creating an object, but lets subclasses decide which class to instantiate?',
        options: ['Factory Method', 'Builder', 'Adapter', 'Strategy'],
        correctIndex: 0,
        explanation: 'The Factory Method delegates the exact instantiation logic to child classes, keeping the creator independent of the concrete products it creates.'
      },
      {
        id: 'adv_dp_4',
        question: 'What problem does the Decorator pattern solve?',
        options: ['It hides complex sub-systems behind a simple interface', 'It allows adding behavior to individual objects dynamically without affecting others from the same class', 'It prevents object mutation', 'It converts an interface of a class into another interface clients expect'],
        correctIndex: 1,
        explanation: 'Decorators provide a flexible alternative to subclassing for extending functionality by wrapping objects inside special wrapper objects.'
      },
      {
        id: 'adv_dp_5',
        question: 'The Strategy pattern allows you to:',
        options: ['Define a family of algorithms, encapsulate each one, and make them interchangeable', 'Create a tree structure of objects', 'Ensure only one object is created', 'Restore an object to its previous state'],
        correctIndex: 0,
        explanation: 'Strategy lets the algorithm vary independently from clients that use it. Think of it like passing a custom sorting function into an array sort method.'
      },
      {
        id: 'adv_dp_6',
        question: 'What is an Anti-Pattern?',
        options: ['A pattern that runs asynchronously', 'A common response to a recurring problem that is usually ineffective and risks being highly counterproductive', 'A pattern used exclusively in functional programming', 'A pattern that reverses a linked list'],
        correctIndex: 1,
        explanation: 'Anti-patterns are bad practices that seem like good ideas at the time but create massive technical debt (e.g., God Objects, Spaghetti Code).'
      },
      {
        id: 'adv_dp_7',
        question: 'In Redux or Vuex, state changes are managed through a centralized store. Which pattern does this most closely resemble?',
        options: ['Iterator', 'Facade', 'Flux / Singleton', 'Adapter'],
        correctIndex: 2,
        explanation: 'These state management libraries employ the Flux architecture, heavily utilizing a single centralized store (Singleton) to manage unidirectional data flow.'
      },
      {
        id: 'adv_dp_8',
        question: 'Which pattern provides a unified interface to a set of interfaces in a subsystem, making it easier to use?',
        options: ['Proxy', 'Bridge', 'Facade', 'Flyweight'],
        correctIndex: 2,
        explanation: 'A Facade hides the complexities of a larger system and provides a simple interface to the client. (Like turning on a car with a key instead of manually firing spark plugs).'
      }
    ]
  },
  restApi: {
    id: 'restApi',
    title: 'REST APIs',
    tier: 'Advanced',
    icon: '🔌',
    color: 'hover:border-purple-600',
    questions: [
      {
        id: 'adv_api_1',
        question: 'What does REST stand for?',
        options: ['Remote Execution System Transfer', 'Representational State Transfer', 'Reliable Endpoint Server Technology', 'Routing Engine for State Transfer'],
        correctIndex: 1,
        explanation: 'REST (Representational State Transfer) is an architectural style for distributed hypermedia systems.'
      },
      {
        id: 'adv_api_2',
        question: 'Which HTTP method is traditionally used to completely REPLACE an existing resource?',
        options: ['POST', 'PATCH', 'PUT', 'UPDATE'],
        correctIndex: 2,
        explanation: 'PUT replaces an entire resource with the payload provided. PATCH is used for partial updates.'
      },
      {
        id: 'adv_api_3',
        question: 'What is a "stateless" constraint in REST?',
        options: ['The server must not use a database', 'The client must not store cookies', 'Each request from client to server must contain all info needed to understand the request', 'The API must always return the same data'],
        correctIndex: 2,
        explanation: 'Statelessness means the server does not store any session state about the client. Every request is completely independent.'
      },
      {
        id: 'adv_api_4',
        question: 'What does a 401 HTTP status code mean?',
        options: ['Not Found', 'Internal Server Error', 'Unauthorized (Unauthenticated)', 'Forbidden'],
        correctIndex: 2,
        explanation: '401 means you lack valid authentication credentials. 403 (Forbidden) means you are authenticated, but not allowed to perform the action.'
      },
      {
        id: 'adv_api_5',
        question: 'Which principle suggests an API should provide links to related resources in its responses?',
        options: ['HATEOAS', 'CORS', 'CRUD', 'SOAP'],
        correctIndex: 0,
        explanation: 'HATEOAS (Hypermedia As The Engine Of Application State) allows clients to dynamically navigate the API using provided URLs, like browsing a website.'
      },
      {
        id: 'adv_api_6',
        question: 'What is an idempotent operation?',
        options: ['An operation that always throws an error', 'An operation that produces the same result no matter how many times it is executed', 'An operation that runs extremely fast', 'An operation that creates a new database record every time'],
        correctIndex: 1,
        explanation: 'GET, PUT, and DELETE are idempotent. Deleting a user once has the same end state as deleting that user 100 times (the user is gone).'
      },
      {
        id: 'adv_api_7',
        question: 'Why might an API implement pagination?',
        options: ['To encrypt the response data', 'To prevent the server and client from being overwhelmed by returning massive lists of resources at once', 'To force the user to pay for premium access', 'To convert JSON to XML'],
        correctIndex: 1,
        explanation: 'Returning 10,000 records at once crushes database performance and spikes bandwidth. Pagination breaks it into manageable chunks (e.g., 20 at a time).'
      },
      {
        id: 'adv_api_8',
        question: 'What is the purpose of CORS (Cross-Origin Resource Sharing)?',
        options: ['To allow databases to share data', 'To prevent SQL injection', 'To allow or restrict web pages from requesting resources from a different domain than the one that served the page', 'To automatically compress HTTP responses'],
        correctIndex: 2,
        explanation: 'Browsers block cross-origin requests by default for security. Servers configure CORS headers to explicitly allow specific domains to fetch their data.'
      }
    ]
  },
  bigO: {
    id: 'bigO',
    title: 'Big-O Notation',
    tier: 'Advanced',
    icon: '📈',
    color: 'hover:border-purple-300',
    questions: [
      {
        id: 'adv_bo_1',
        question: 'What does Big-O notation describe?',
        options: ['The exact runtime of an algorithm in milliseconds', 'The worst-case complexity scaling of an algorithm as the input size grows', 'The amount of memory available on the server', 'The number of lines of code in a function'],
        correctIndex: 1,
        explanation: 'Big-O describes how the runtime or space requirements grow as the input size approaches infinity.'
      },
      {
        id: 'adv_bo_2',
        question: 'Which of the following represents linear time complexity?',
        options: ['O(1)', 'O(n^2)', 'O(n)', 'O(log n)'],
        correctIndex: 2,
        explanation: 'O(n) means the runtime grows directly in proportion to the input size (e.g., looping through an array once).'
      },
      {
        id: 'adv_bo_3',
        question: 'What is the typical time complexity of a nested loop (a loop inside a loop) over the same array?',
        options: ['O(n)', 'O(n^2)', 'O(log n)', 'O(1)'],
        correctIndex: 1,
        explanation: 'For every item, you loop through every item again. 10 items = 100 iterations. That\'s O(n^2) quadratic time.'
      },
      {
        id: 'adv_bo_4',
        question: 'Which time complexity is generally considered the most efficient/fastest?',
        options: ['O(n)', 'O(n log n)', 'O(1)', 'O(2^n)'],
        correctIndex: 2,
        explanation: 'O(1) is constant time. It means the operation takes the same amount of time whether you have 10 items or 10 billion.'
      },
      {
        id: 'adv_bo_5',
        question: 'Accessing an element in an array by its index (e.g., arr[5]) has a time complexity of:',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)'],
        correctIndex: 0,
        explanation: 'Arrays allocate contiguous memory, so the computer calculates exactly where index 5 is instantly. It is O(1).'
      },
      {
        id: 'adv_bo_6',
        question: 'What is the time complexity of Binary Search on a sorted array?',
        options: ['O(n)', 'O(n log n)', 'O(log n)', 'O(1)'],
        correctIndex: 2,
        explanation: 'Because Binary Search cuts the remaining elements in half on every step, it takes logarithmic time O(log n). Extremely fast for large datasets!'
      },
      {
        id: 'adv_bo_7',
        question: 'If you have two consecutive separate loops (not nested) iterating over an array of size n, what is the Big-O?',
        options: ['O(2n)', 'O(n)', 'O(n^2)', 'O(log n)'],
        correctIndex: 1,
        explanation: 'O(2n) simplifies to O(n). In Big-O, we drop constants because we only care about the growth trajectory.'
      },
      {
        id: 'adv_bo_8',
        question: 'What does Space Complexity refer to?',
        options: ['How much disk space the code takes up', 'How much additional RAM the algorithm requires as input size grows', 'The physical size of the server needed', 'The distance between network requests'],
        correctIndex: 1,
        explanation: 'Space complexity measures how much EXTRA working memory your algorithm allocates (like creating temporary arrays) relative to the input size.'
      }
    ]
  },
  sorting: {
    id: 'sorting',
    title: 'Sorting Algorithms',
    tier: 'Advanced',
    icon: '🗃️',
    color: 'hover:border-purple-700',
    questions: [
      {
        id: 'adv_sort_1',
        question: 'Which sorting algorithm works by repeatedly swapping adjacent elements if they are in the wrong order?',
        options: ['Quick Sort', 'Merge Sort', 'Bubble Sort', 'Insertion Sort'],
        correctIndex: 2,
        explanation: 'Bubble Sort repeatedly "bubbles" the largest element to the end. It is simple but terribly slow (O(n^2)) for large datasets.'
      },
      {
        id: 'adv_sort_2',
        question: 'What is the average time complexity of Quick Sort?',
        options: ['O(n)', 'O(n log n)', 'O(n^2)', 'O(log n)'],
        correctIndex: 1,
        explanation: 'Quick Sort averages O(n log n). However, its absolute worst-case (if you pick bad pivots) is O(n^2).'
      },
      {
        id: 'adv_sort_3',
        question: 'Which of these is a stable sorting algorithm?',
        options: ['Quick Sort', 'Heap Sort', 'Merge Sort', 'Selection Sort'],
        correctIndex: 2,
        explanation: 'A stable sort maintains the relative order of records with equal keys. Merge Sort is inherently stable.'
      },
      {
        id: 'adv_sort_4',
        question: 'How does Merge Sort fundamentally work?',
        options: ['By picking a pivot and partitioning the array', 'By dividing the array into halves until single elements remain, then merging them in order', 'By finding the minimum element and moving it to the front', 'By inserting each element into a tree'],
        correctIndex: 1,
        explanation: 'Merge Sort is a classic Divide and Conquer algorithm that splits arrays into pieces and zips them back together.'
      },
      {
        id: 'adv_sort_5',
        question: 'What is a major disadvantage of Merge Sort compared to Quick Sort?',
        options: ['It is slower on average', 'It requires O(n) auxiliary space (extra memory)', 'It cannot sort strings', 'It has a worst-case of O(n^3)'],
        correctIndex: 1,
        explanation: 'Merge Sort requires allocating extra arrays to hold the merged elements, whereas Quick Sort can operate "in-place" with minimal extra memory.'
      },
      {
        id: 'adv_sort_6',
        question: 'Which algorithm is typically best for sorting a dataset that is ALREADY mostly sorted?',
        options: ['Insertion Sort', 'Quick Sort', 'Merge Sort', 'Selection Sort'],
        correctIndex: 0,
        explanation: 'Insertion Sort can run in O(n) time if the array is already mostly sorted, merely verifying order without major shifts.'
      },
      {
        id: 'adv_sort_7',
        question: 'In Quick Sort, what is the role of the "pivot"?',
        options: ['It is the element that gets swapped with the first item', 'It is the element against which all other elements are compared to partition the array', 'It counts the number of swaps', 'It is the final sorted array'],
        correctIndex: 1,
        explanation: 'The pivot splits the array: everything smaller goes to its left, everything larger goes to its right.'
      },
      {
        id: 'adv_sort_8',
        question: 'Which built-in JavaScript method is used to sort arrays?',
        options: ['Array.order()', 'Array.sort()', 'Array.arrange()', 'Array.sequence()'],
        correctIndex: 1,
        explanation: 'Array.prototype.sort() sorts elements in place. Warning: by default, it converts elements to strings and sorts them alphabetically, which is bad for numbers!'
      }
    ]
  },
  searching: {
    id: 'searching',
    title: 'Searching Algorithms',
    tier: 'Advanced',
    icon: '🔍',
    color: 'hover:border-fuchsia-500',
    questions: [
      {
        id: 'adv_search_1',
        question: 'What is the time complexity of a basic Linear Search?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n^2)'],
        correctIndex: 2,
        explanation: 'Linear search iterates through every element one by one until it finds the target. In the worst case, it checks all n elements.'
      },
      {
        id: 'adv_search_2',
        question: 'What is a hard requirement for performing a Binary Search on an array?',
        options: ['The array must contain only numbers', 'The array must have an even number of elements', 'The array must be sorted', 'The array must not contain duplicates'],
        correctIndex: 2,
        explanation: 'Binary Search relies on comparing the target to the middle element and discarding half the array. If the array isn\'t sorted, you don\'t know which half to discard.'
      },
      {
        id: 'adv_search_3',
        question: 'In Binary Search, if the target is greater than the middle element, what happens next?',
        options: ['The search ends', 'The search continues in the left half', 'The search continues in the right half', 'The array is reversed'],
        correctIndex: 2,
        explanation: 'Because the array is sorted, if the target is bigger than the middle, it MUST be in the right half.'
      },
      {
        id: 'adv_search_4',
        question: 'Which data structure inherently uses binary search principles for fast lookups?',
        options: ['Stack', 'Binary Search Tree (BST)', 'Linked List', 'Queue'],
        correctIndex: 1,
        explanation: 'A BST stores smaller elements in the left subtree and larger elements in the right subtree, allowing O(log n) lookups.'
      },
      {
        id: 'adv_search_5',
        question: 'What is Depth-First Search (DFS) typically used for?',
        options: ['Sorting an array', 'Traversing tree or graph data structures by exploring as far as possible along each branch before backtracking', 'Finding an element in a sorted array', 'Hashing passwords'],
        correctIndex: 1,
        explanation: 'DFS dives deep into a tree/graph structure before coming back up. It\'s often implemented using a Stack or recursion.'
      },
      {
        id: 'adv_search_6',
        question: 'What is Breadth-First Search (BFS) typically used for?',
        options: ['Finding the shortest path in an unweighted graph', 'Generating random numbers', 'Sorting linked lists', 'Encrypting strings'],
        correctIndex: 0,
        explanation: 'BFS explores neighbor nodes level by level. Because it searches radially outward, the first time it hits a target, it has found the shortest path.'
      },
      {
        id: 'adv_search_7',
        question: 'Which data structure is essential for implementing Breadth-First Search iteratively?',
        options: ['Stack', 'Queue', 'Hash Map', 'Set'],
        correctIndex: 1,
        explanation: 'A Queue (First-In, First-Out) ensures that nodes discovered first are processed first, maintaining the level-by-level traversal.'
      },
      {
        id: 'adv_search_8',
        question: 'In JavaScript, how does the `Array.prototype.find()` method search?',
        options: ['It uses Binary Search', 'It uses Linear Search', 'It uses Hashing', 'It uses a Tree traversal'],
        correctIndex: 1,
        explanation: '`find()` iterates through the array from start to finish (Linear Search) executing the callback until it returns true. It is O(n).'
      }
    ]
  },
  stacksQueues: {
    id: 'stacksQueues',
    title: 'Stacks & Queues',
    tier: 'Advanced',
    icon: '🥞',
    color: 'hover:border-purple-400',
    questions: [
      {
        id: 'adv_sq_1',
        question: 'Which principle does a Stack follow?',
        options: ['FIFO (First-In, First-Out)', 'LIFO (Last-In, First-Out)', 'Random Access', 'Sorted Order'],
        correctIndex: 1,
        explanation: 'Stacks are LIFO. Think of a stack of plates: the last plate you put on top is the first one you take off.'
      },
      {
        id: 'adv_sq_2',
        question: 'Which principle does a Queue follow?',
        options: ['FIFO (First-In, First-Out)', 'LIFO (Last-In, First-Out)', 'Random Access', 'Sorted Order'],
        correctIndex: 0,
        explanation: 'Queues are FIFO. Think of a line at a grocery store: the first person in line is the first person served.'
      },
      {
        id: 'adv_sq_3',
        question: 'In a Stack, what are the two primary operations called?',
        options: ['Push and Pop', 'Enqueue and Dequeue', 'Add and Remove', 'Insert and Delete'],
        correctIndex: 0,
        explanation: 'Push adds an item to the top of the stack, and Pop removes the item from the top of the stack.'
      },
      {
        id: 'adv_sq_4',
        question: 'In a Queue, what are the primary operations called?',
        options: ['Push and Pop', 'Enqueue and Dequeue', 'Shift and Unshift', 'Insert and Extract'],
        correctIndex: 1,
        explanation: 'Enqueue adds an item to the back of the queue, and Dequeue removes an item from the front.'
      },
      {
        id: 'adv_sq_5',
        question: 'What is a common real-world software use case for a Stack?',
        options: ['Managing background tasks waiting to be processed', 'The browser\'s Back button history', 'Streaming a large video file', 'Managing a printer\'s job list'],
        correctIndex: 1,
        explanation: 'Browser history operates as a Stack. You push pages onto it as you navigate, and popping goes back to the most recent page.'
      },
      {
        id: 'adv_sq_6',
        question: 'Using JavaScript arrays, which methods simulate a Stack?',
        options: ['push() and pop()', 'push() and shift()', 'unshift() and pop()', 'concat() and slice()'],
        correctIndex: 0,
        explanation: '`push()` adds to the end, and `pop()` removes from the end. This perfectly models Last-In, First-Out behavior.'
      },
      {
        id: 'adv_sq_7',
        question: 'Using JavaScript arrays, which methods simulate a Queue?',
        options: ['push() and pop()', 'push() and shift()', 'unshift() and pop()', 'concat() and slice()'],
        correctIndex: 1,
        explanation: '`push()` adds to the end (enqueue), and `shift()` removes from the front (dequeue). Note: `shift()` is O(n) so it\'s slow for huge arrays!'
      },
      {
        id: 'adv_sq_8',
        question: 'What is a Priority Queue?',
        options: ['A queue that only accepts VIP users', 'A queue where elements are dequeued based on their assigned priority rather than strictly arrival time', 'A queue that works in reverse', 'A stack wearing a disguise'],
        correctIndex: 1,
        explanation: 'In a Priority Queue, high-priority elements jump to the front of the line, often implemented under the hood using a Heap.'
      }
    ]
  },
  linkedLists: {
    id: 'linkedLists',
    title: 'Linked Lists',
    tier: 'Advanced',
    icon: '🔗',
    color: 'hover:border-indigo-400',
    questions: [
      {
        id: 'adv_ll_1',
        question: 'What makes a Linked List different from a standard Array?',
        options: ['Linked Lists can only store numbers', 'Linked List elements are not stored in contiguous memory locations', 'Arrays cannot be resized', 'Linked lists use twice as much memory'],
        correctIndex: 1,
        explanation: 'Array elements sit right next to each other in memory. Linked List nodes can be scattered anywhere, connected via pointers.'
      },
      {
        id: 'adv_ll_2',
        question: 'What does a basic Node in a Singly Linked List contain?',
        options: ['A value and an array of children', 'A value and a pointer to the next Node', 'A pointer to the next and previous Nodes', 'Just a value'],
        correctIndex: 1,
        explanation: 'A Singly Linked List node holds its data and a single reference (pointer) to the next node in the chain.'
      },
      {
        id: 'adv_ll_3',
        question: 'What is the time complexity to insert a new node at the HEAD (start) of a Linked List?',
        options: ['O(n)', 'O(1)', 'O(log n)', 'O(n^2)'],
        correctIndex: 1,
        explanation: 'It is O(1)! You just create the node, point it to the current head, and update the head reference. No shifting required!'
      },
      {
        id: 'adv_ll_4',
        question: 'What is a Doubly Linked List?',
        options: ['A list where each node has two values', 'A list where each node points to both the NEXT and the PREVIOUS node', 'Two linked lists joined together', 'A list stored in two different databases'],
        correctIndex: 1,
        explanation: 'By holding a reference to the previous node, Doubly Linked Lists can be traversed in both directions, making deletions much easier.'
      },
      {
        id: 'adv_ll_5',
        question: 'What is the major disadvantage of Linked Lists compared to Arrays?',
        options: ['Slow insertion at the ends', 'Slow Random Access (cannot do list[5] instantly)', 'Inability to store complex objects', 'They require a garbage collector'],
        correctIndex: 1,
        explanation: 'To find the 100th item in a Linked List, you MUST start at the head and traverse 100 pointers. It is O(n) lookup time, whereas Arrays are O(1).'
      },
      {
        id: 'adv_ll_6',
        question: 'The first node of a Linked List is called the Head. What is the last node called?',
        options: ['Foot', 'Tail', 'End', 'Base'],
        correctIndex: 1,
        explanation: 'The last node is the Tail. Its "next" pointer usually points to null.'
      },
      {
        id: 'adv_ll_7',
        question: 'How do you detect a cycle (a loop) in a Linked List?',
        options: ['Count the nodes', 'Use two pointers (a slow one and a fast one) and see if they meet', 'Check if the tail points to null', 'Convert it to an array'],
        correctIndex: 1,
        explanation: 'Floyd\'s Cycle-Finding Algorithm (the Tortoise and the Hare) uses a slow pointer (1 step) and a fast pointer (2 steps). If they ever point to the same node, a cycle exists.'
      },
      {
        id: 'adv_ll_8',
        question: 'Why are Linked Lists rarely used in basic JavaScript web development?',
        options: ['JavaScript doesn\'t support objects', 'JS engines highly optimize Arrays to act like dynamic lists, making manual Linked Lists usually unnecessary for basic tasks', 'They cause memory leaks', 'React prohibits them'],
        correctIndex: 1,
        explanation: 'JS Arrays are incredibly powerful and optimized. However, understanding Linked Lists is vital for advanced data structures (like LRU caches) and passing tech interviews!'
      }
    ]
  },
  git: {
    id: 'git',
    title: 'Git & Version Control',
    tier: 'Advanced',
    icon: '🐙',
    color: 'hover:border-orange-500',
    questions: [
      {
        id: 'adv_git_1',
        question: 'What is the fundamental difference between Git and GitHub?',
        options: ['They are the same thing', 'Git is the version control software; GitHub is a cloud hosting service for Git repositories', 'Git is for local networks, GitHub is for the internet', 'Git is older and obsolete'],
        correctIndex: 1,
        explanation: 'Git is the engine running on your computer. GitHub (or GitLab/Bitbucket) is the remote server where you share your Git repositories.'
      },
      {
        id: 'adv_git_2',
        question: 'What command stages changes for the next commit?',
        options: ['git commit', 'git push', 'git add', 'git stage'],
        correctIndex: 2,
        explanation: '`git add .` (or specifying files) moves changes into the Staging Area, telling Git you want them included in the next commit.'
      },
      {
        id: 'adv_git_3',
        question: 'What does `git pull` actually do behind the scenes?',
        options: ['It runs git fetch followed by git merge', 'It deletes local files and replaces them with remote files', 'It creates a new branch', 'It rewrites commit history'],
        correctIndex: 0,
        explanation: '`git pull` fetches the latest metadata from the remote, and then automatically attempts to merge those changes into your active local branch.'
      },
      {
        id: 'adv_git_4',
        question: 'What is a merge conflict?',
        options: ['When two developers yell at each other', 'When Git cannot automatically resolve how to merge two different modifications to the same lines of code', 'When the repository runs out of space', 'When a password is incorrect'],
        correctIndex: 1,
        explanation: 'If Alice edits line 5 and Bob edits line 5 differently, Git halts the merge and forces a human to manually choose which code to keep.'
      },
      {
        id: 'adv_git_5',
        question: 'Which command allows you to save uncommitted work temporarily without creating a permanent commit?',
        options: ['git pause', 'git stash', 'git save', 'git hold'],
        correctIndex: 1,
        explanation: '`git stash` safely hides your modified tracked files and staged changes away, giving you a clean working directory. You can pop them back later.'
      },
      {
        id: 'adv_git_6',
        question: 'What is the danger of using `git push --force`?',
        options: ['It disables your internet connection', 'It deletes the repository entirely', 'It overwrites remote history, potentially erasing work pushed by other team members', 'It makes the code open source'],
        correctIndex: 2,
        explanation: 'Force pushing blindly overrides the remote branch with your local state. If someone else pushed commits you don\'t have locally, they are destroyed.'
      },
      {
        id: 'adv_git_7',
        question: 'What does `git rebase` do compared to `git merge`?',
        options: ['Merge destroys history, rebase preserves it', 'Rebase moves the base of a branch to a new commit, creating a linear history without merge commits', 'Rebase is only used for images', 'There is no difference'],
        correctIndex: 1,
        explanation: 'Rebasing "replays" your branch\'s commits on top of the latest main branch, creating a clean, straight line of history instead of a tangled web of merges.'
      },
      {
        id: 'adv_git_8',
        question: 'What is the purpose of a `.gitignore` file?',
        options: ['To block specific users from the repo', 'To list files and folders that Git should completely ignore and never track', 'To delete files permanently', 'To hide the repository from search engines'],
        correctIndex: 1,
        explanation: 'You use `.gitignore` to prevent secret keys, large node_modules folders, and local build artifacts from polluting your remote repository.'
      }
    ]
  },
  security: {
    id: 'security',
    title: 'Security Basics',
    tier: 'Advanced',
    icon: '🛡️',
    color: 'hover:border-red-500',
    questions: [
      {
        id: 'adv_sec_1',
        question: 'What does XSS stand for?',
        options: ['XML Style Sheets', 'Cross-Site Scripting', 'Extended Security System', 'Cross-Server Synchronization'],
        correctIndex: 1,
        explanation: 'Cross-Site Scripting (XSS) is a vulnerability where an attacker injects malicious client-side scripts into a trusted website viewed by other users.'
      },
      {
        id: 'adv_sec_2',
        question: 'How can you mitigate XSS attacks in a web application?',
        options: ['By using HTTPS', 'By hashing all passwords', 'By strictly sanitizing and escaping all user input before rendering it in the browser', 'By turning off JavaScript'],
        correctIndex: 2,
        explanation: 'If a user inputs `<script>stealCookie()</script>`, the app must escape it to `&lt;script&gt;` so the browser treats it as harmless text, not executable code.'
      },
      {
        id: 'adv_sec_3',
        question: 'What is SQL Injection?',
        options: ['A tool to insert data into a database', 'An attack that tricks a database into executing malicious SQL statements via unsanitized user input', 'A method of speeding up database queries', 'A type of computer virus'],
        correctIndex: 1,
        explanation: 'If a login field blindly concatenates strings, typing `"\' OR \'1\'=\'1"` can trick the database into evaluating the password check as true and bypassing login.'
      },
      {
        id: 'adv_sec_4',
        question: 'What is the primary defense against SQL Injection?',
        options: ['Using strong passwords', 'Using Prepared Statements (Parameterized Queries)', 'Encrypting the database', 'Using NoSQL instead'],
        correctIndex: 1,
        explanation: 'Prepared statements send the query structure and the data separately. The database treats the user input strictly as a literal string, never as executable SQL commands.'
      },
      {
        id: 'adv_sec_5',
        question: 'What does CSRF stand for?',
        options: ['Cascading Style Rendering Format', 'Cross-Site Request Forgery', 'Client-Server Routing Framework', 'Cryptographic Secure Random Function'],
        correctIndex: 1,
        explanation: 'CSRF forces an end user to execute unwanted actions on a web application in which they are currently authenticated (e.g. tricking them into clicking a link that secretly transfers funds).'
      },
      {
        id: 'adv_sec_6',
        question: 'Why should passwords NEVER be stored as plain text in a database?',
        options: ['It wastes storage space', 'If the database is leaked, attackers instantly have everyone\'s passwords', 'It makes queries slow', 'It violates HTML standards'],
        correctIndex: 1,
        explanation: 'Passwords must be cryptographically hashed (e.g., using bcrypt). Even if the database is stolen, the attacker only gets useless scrambled strings.'
      },
      {
        id: 'adv_sec_7',
        question: 'What is the purpose of adding "salt" to a password hash?',
        options: ['To make the data compress better', 'To ensure that two users with the exact same password will have completely different hashes, thwarting Rainbow Table attacks', 'To encrypt the username', 'To make the password longer'],
        correctIndex: 1,
        explanation: 'A salt is a random string added to the password before hashing. It destroys pre-computed dictionary attacks.'
      },
      {
        id: 'adv_sec_8',
        question: 'What is the Principle of Least Privilege?',
        options: ['Users should not have to pay for software', 'A user, program, or process should have only the bare minimum permissions necessary to perform its intended function', 'Root access should be given to all developers', 'Servers should be as cheap as possible'],
        correctIndex: 1,
        explanation: 'If a web server only needs to READ from a database, it should not have a database account capable of DELETING tables. This limits the blast radius if compromised.'
      }
    ]
  },
  websockets: {
    id: 'websockets',
    title: 'WebSockets',
    tier: 'Advanced',
    icon: '📡',
    color: 'hover:border-cyan-400',
    questions: [
      {
        id: 'adv_ws_1',
        question: 'How do WebSockets differ from standard HTTP requests?',
        options: ['WebSockets are slower', 'WebSockets keep a persistent, two-way connection open between client and server', 'WebSockets can only send XML data', 'WebSockets close immediately after responding'],
        correctIndex: 1,
        explanation: 'HTTP is stateless and request/response based. WebSockets leave a pipe open, allowing the server to push real-time data to the client anytime.'
      },
      {
        id: 'adv_ws_2',
        question: 'Which of the following is an ideal use case for WebSockets?',
        options: ['Loading a static blog article', 'Submitting a contact form', 'A live multiplayer game or chat application', 'Downloading a large PDF'],
        correctIndex: 2,
        explanation: 'Chat apps need instant updates pushed from the server the second another user sends a message. Polling with HTTP is too slow and inefficient.'
      },
      {
        id: 'adv_ws_3',
        question: 'How does a WebSocket connection begin?',
        options: ['It starts via FTP', 'With a standard HTTP request that includes an "Upgrade" header', 'It uses UDP packets', 'By sending a ping'],
        correctIndex: 1,
        explanation: 'It starts as a normal HTTP request. If the server supports WebSockets, it responds with a 101 Switching Protocols code, and the connection upgrades.'
      },
      {
        id: 'adv_ws_4',
        question: 'What does the `ws://` and `wss://` URI scheme indicate?',
        options: ['Web Search', 'WebSocket and WebSocket Secure', 'Web Script', 'Web Service'],
        correctIndex: 1,
        explanation: '`ws://` is for standard connections, while `wss://` uses TLS encryption (just like HTTPS) to secure the stream of data.'
      },
      {
        id: 'adv_ws_5',
        question: 'What is long-polling?',
        options: ['A surveying technique', 'An older hack where the client makes an HTTP request and the server holds it open until it has data to send back', 'Measuring latency', 'Connecting to a server far away'],
        correctIndex: 1,
        explanation: 'Before WebSockets, developers faked real-time behavior using long-polling. It works, but wastes a lot of resources compared to a true WebSocket.'
      },
      {
        id: 'adv_ws_6',
        question: 'In the browser WebSocket API, which event fires when data is received from the server?',
        options: ['onmessage', 'onreceive', 'ondata', 'onfetch'],
        correctIndex: 0,
        explanation: 'You listen to the `message` event (or define `socket.onmessage = function(...)`) to handle incoming data.'
      },
      {
        id: 'adv_ws_7',
        question: 'What type of data can a WebSocket transmit?',
        options: ['Only Strings', 'Only JSON', 'Both text (like JSON) and binary data (like ArrayBuffers)', 'Only XML'],
        correctIndex: 2,
        explanation: 'WebSockets are extremely versatile and can efficiently transmit binary data, which is crucial for streaming audio, video, or game states.'
      },
      {
        id: 'adv_ws_8',
        question: 'Why might load balancing WebSockets be difficult?',
        options: ['They use too much bandwidth', 'Load balancers cannot read binary data', 'They require persistent (sticky) connections to the same server node', 'They block HTTP traffic'],
        correctIndex: 2,
        explanation: 'Since WebSockets are stateful, if a client connects to Server A, all their subsequent WebSocket frames must go to Server A. If the load balancer drops them on Server B, the connection breaks.'
      }
    ]
  },
  sqlBasics: {
    id: 'sqlBasics',
    title: 'SQL Basics',
    tier: 'Advanced',
    icon: '🗄️',
    color: 'hover:border-blue-400',
    questions: [
      {
        id: 'adv_sql_1',
        question: 'What does SQL stand for?',
        options: ['Simple Query Language', 'Standard Question Logic', 'Structured Query Language', 'Server Query Link'],
        correctIndex: 2,
        explanation: 'Structured Query Language is the standard language for interacting with relational databases.'
      },
      {
        id: 'adv_sql_2',
        question: 'Which clause is used to filter records in a SELECT statement?',
        options: ['FILTER', 'WHERE', 'FIND', 'SEARCH'],
        correctIndex: 1,
        explanation: 'The WHERE clause extracts only those records that fulfill a specified condition.'
      },
      {
        id: 'adv_sql_3',
        question: 'What does a JOIN do in SQL?',
        options: ['Combines rows from two or more tables based on a related column between them', 'Merges two databases together', 'Concatenates two strings', 'Connects the client to the server'],
        correctIndex: 0,
        explanation: 'JOINs allow you to query data across multiple normalized tables (e.g., getting User data and their matching Order data at the same time).'
      },
      {
        id: 'adv_sql_4',
        question: 'Which type of JOIN returns all rows from the left table, and the matched rows from the right table?',
        options: ['INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'FULL OUTER JOIN'],
        correctIndex: 1,
        explanation: 'A LEFT JOIN guarantees you get everything from the primary (left) table, filling in NULLs if the right table has no matching data.'
      },
      {
        id: 'adv_sql_5',
        question: 'What is a Primary Key?',
        options: ['The password to the database', 'A specific column (or combination) that uniquely identifies each record in a table', 'The first column in a table', 'A key used to encrypt the table'],
        correctIndex: 1,
        explanation: 'Primary keys must contain UNIQUE values, and cannot contain NULL values. They are how you safely target exactly one row.'
      },
      {
        id: 'adv_sql_6',
        question: 'What is a Foreign Key?',
        options: ['A key from a foreign country', 'A column that prevents data deletion', 'A column used to link two tables together by referencing the Primary Key of another table', 'A temporary key'],
        correctIndex: 2,
        explanation: 'Foreign keys enforce referential integrity. If an Order table has a user_id column pointing to the Users table, it\'s a Foreign Key.'
      },
      {
        id: 'adv_sql_7',
        question: 'Which SQL statement is used to update existing data in a database?',
        options: ['MODIFY', 'CHANGE', 'ALTER', 'UPDATE'],
        correctIndex: 3,
        explanation: 'The UPDATE statement is used to modify existing records. (Always remember your WHERE clause, or you will update EVERY row!)'
      },
      {
        id: 'adv_sql_8',
        question: 'What does the GROUP BY statement do?',
        options: ['Alphabetizes the results', 'Groups rows that have the same values into summary rows (like finding the count of customers in each country)', 'Creates a new table', 'Randomizes the output'],
        correctIndex: 1,
        explanation: 'GROUP BY is used with aggregate functions (COUNT, MAX, MIN, SUM, AVG) to group the result set by one or more columns.'
      }
    ]
  }
};
