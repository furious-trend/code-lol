import { QuizTopic } from './types';

export const expertTopics: Record<string, QuizTopic> = {
  systemDesign: {
    id: 'systemDesign',
    title: 'System Design Basics',
    tier: 'Expert',
    icon: '🏗️',
    color: 'hover:border-red-600',
    questions: [
      {
        id: 'exp_sd_1',
        question: 'What is the primary difference between horizontal and vertical scaling?',
        options: ['Vertical scaling adds more servers, horizontal scaling upgrades existing servers', 'Vertical scaling upgrades existing servers (CPU/RAM), horizontal scaling adds more servers to a pool', 'They are the same thing', 'Vertical scaling is for databases, horizontal is for web servers'],
        correctIndex: 1,
        explanation: 'Vertical (Scale Up) = buying a bigger machine. Horizontal (Scale Out) = buying more machines. Horizontal scaling provides better high availability and infinite ceiling.'
      },
      {
        id: 'exp_sd_2',
        question: 'What is a Single Point of Failure (SPOF)?',
        options: ['A server that crashed once', 'A part of a system that, if it fails, will stop the entire system from working', 'A bug in the frontend code', 'A router that is too slow'],
        correctIndex: 1,
        explanation: 'If your entire cluster routes through one load balancer, and that load balancer dies, the system goes down. SPOFs must be eliminated via redundancy.'
      },
      {
        id: 'exp_sd_3',
        question: 'In database design, what does CAP theorem stand for?',
        options: ['Consistency, Availability, Partition Tolerance', 'Concurrency, Asynchrony, Parallelism', 'Cache, API, Proxy', 'Create, Access, Parse'],
        correctIndex: 0,
        explanation: 'CAP theorem states that a distributed data store can only simultaneously provide two out of the three guarantees: Consistency, Availability, and Partition tolerance.'
      },
      {
        id: 'exp_sd_4',
        question: 'What is the purpose of a Load Balancer?',
        options: ['To compress data before sending it to the client', 'To securely encrypt database passwords', 'To distribute incoming network traffic across multiple servers', 'To cache static assets'],
        correctIndex: 2,
        explanation: 'A load balancer acts as a traffic cop, sitting in front of your servers and routing client requests across all servers capable of fulfilling them to maximize speed and capacity.'
      },
      {
        id: 'exp_sd_5',
        question: 'What is database sharding?',
        options: ['Deleting old records', 'A type of horizontal partitioning that separates very large databases into smaller, faster, more easily managed parts called data shards', 'Replicating the same database multiple times', 'Encrypting individual columns'],
        correctIndex: 1,
        explanation: 'Sharding splits a massive table (e.g., millions of users) across multiple physical database servers based on a shard key (like user ID).'
      },
      {
        id: 'exp_sd_6',
        question: 'What is the "Thundering Herd" problem?',
        options: ['When too many users sign up at once', 'When a cache expires and thousands of concurrent requests all hit the database simultaneously to regenerate it', 'When servers get too hot', 'A bug in multi-threading'],
        correctIndex: 1,
        explanation: 'If a popular cached item expires, all requests suddenly pierce the cache and stampede the database, potentially crashing it before the cache can be repopulated.'
      },
      {
        id: 'exp_sd_7',
        question: 'What does a CDN (Content Delivery Network) do?',
        options: ['It generates HTML on the server', 'It manages database replication', 'It caches and serves static assets (images, JS, CSS) from edge servers geographically closest to the user', 'It blocks DDoS attacks'],
        correctIndex: 2,
        explanation: 'A CDN ensures that a user in Tokyo downloads your site\'s images from a server in Tokyo, rather than waiting for them to travel from a server in New York.'
      },
      {
        id: 'exp_sd_8',
        question: 'What is the difference between latency and throughput?',
        options: ['There is no difference', 'Latency is how much data you can send; throughput is how fast it arrives', 'Latency is the time to deliver a single message; throughput is the volume of data delivered over a given timeframe', 'Latency is for networks, throughput is for CPUs'],
        correctIndex: 2,
        explanation: 'Latency is the delay (the time a car takes to drive from A to B). Throughput is capacity (how many cars pass through a highway per hour).'
      }
    ]
  },
  caching: {
    id: 'caching',
    title: 'Caching Strategies',
    tier: 'Expert',
    icon: '⚡',
    color: 'hover:border-yellow-600',
    questions: [
      {
        id: 'exp_cache_1',
        question: 'What is the main goal of caching?',
        options: ['To permanently store data', 'To encrypt sensitive data', 'To store copies of frequently accessed data in a fast, temporary storage layer to reduce future response times', 'To compress images'],
        correctIndex: 2,
        explanation: 'Caching trades memory (RAM) for speed, avoiding slow database queries or API calls for data that hasn\'t changed.'
      },
      {
        id: 'exp_cache_2',
        question: 'Which of the following is a popular in-memory data structure store often used as a cache?',
        options: ['PostgreSQL', 'Redis', 'MongoDB', 'SQLite'],
        correctIndex: 1,
        explanation: 'Redis (Remote Dictionary Server) keeps all data in RAM, making it incredibly fast for read and write operations, ideal for caching.'
      },
      {
        id: 'exp_cache_3',
        question: 'What is the Cache-Aside (Lazy Loading) pattern?',
        options: ['The application always reads from the database and asynchronously updates the cache', 'The application asks the cache for data; if there\'s a miss, it fetches from the DB, saves to the cache, and returns it', 'The database automatically populates the cache', 'Data is only cached during server startup'],
        correctIndex: 1,
        explanation: 'Cache-Aside is the most common pattern. The app first checks the cache. Only on a "miss" does it do the heavy lifting of querying the database.'
      },
      {
        id: 'exp_cache_4',
        question: 'What is a Cache Stampede?',
        options: ['When the cache runs out of memory', 'When the database refuses to accept connections', 'When multiple processes simultaneously attempt to fetch a recently expired cache key from the DB', 'When a cache replicates to too many nodes'],
        correctIndex: 2,
        explanation: 'Also known as the Thundering Herd. It\'s prevented using locks or probabilistic early expiration to ensure only ONE process repopulates the cache.'
      },
      {
        id: 'exp_cache_5',
        question: 'What does LRU stand for in cache eviction policies?',
        options: ['Last Request Updated', 'Least Recently Used', 'Logical Route Utility', 'Local Resource Unlinked'],
        correctIndex: 1,
        explanation: 'Least Recently Used (LRU) evicts the items that haven\'t been accessed for the longest time when the cache becomes full.'
      },
      {
        id: 'exp_cache_6',
        question: 'What is the Write-Through cache pattern?',
        options: ['Data is written to the cache and the backing store simultaneously', 'Data is written to the cache first, then asynchronously to the store later', 'Data is only written to the database', 'The cache is bypassed on writes'],
        correctIndex: 0,
        explanation: 'Write-Through ensures the cache and database are always perfectly in sync, but it adds latency to write operations because both must complete.'
      },
      {
        id: 'exp_cache_7',
        question: 'What is the Write-Behind (Write-Back) cache pattern?',
        options: ['Writes go to the DB first, then cache later', 'Writes go only to the cache, and are asynchronously flushed to the database in the background', 'Writing is disabled', 'It deletes the cache upon writing'],
        correctIndex: 1,
        explanation: 'Write-Back is incredibly fast for the user (writes hit RAM instantly), but risks data loss if the cache server crashes before flushing to the database.'
      },
      {
        id: 'exp_cache_8',
        question: '"There are only two hard things in Computer Science: cache invalidation and..."',
        options: ['Off-by-one errors', 'Naming things', 'Memory leaks', 'CSS layouts'],
        correctIndex: 1,
        explanation: 'A classic Phil Karlton quote! Cache invalidation (knowing exactly when to delete a cache entry because the underlying data changed) is notoriously difficult.'
      }
    ]
  },
  concurrency: {
    id: 'concurrency',
    title: 'Concurrency Concepts',
    tier: 'Expert',
    icon: '🔀',
    color: 'hover:border-blue-600',
    questions: [
      {
        id: 'exp_conc_1',
        question: 'What is the difference between Concurrency and Parallelism?',
        options: ['They are exactly the same', 'Concurrency is about dealing with lots of things at once; Parallelism is about doing lots of things at once', 'Concurrency requires multiple CPUs, parallelism does not', 'Parallelism is for frontend, concurrency is for backend'],
        correctIndex: 1,
        explanation: 'Rob Pike famously said this. Concurrency is structure (interleaving tasks on one core). Parallelism is execution (running tasks simultaneously on multiple cores).'
      },
      {
        id: 'exp_conc_2',
        question: 'What is a Race Condition?',
        options: ['When two threads execute in exactly the same amount of time', 'A flaw where the timing or order of events affects a program\'s correctness, often causing unpredictable bugs', 'When the CPU overheats', 'A technique to make code run faster'],
        correctIndex: 1,
        explanation: 'If Thread A and Thread B both read a bank balance of $100 and both add $50 at the exact same time, the final balance might be $150 instead of $200. That\'s a race condition.'
      },
      {
        id: 'exp_conc_3',
        question: 'What is a Deadlock?',
        options: ['When a server crashes', 'When two or more processes are stuck waiting for each other to release resources, resulting in a standstill', 'When an infinite loop occurs', 'When a database runs out of connections'],
        correctIndex: 1,
        explanation: 'Imagine two people in a narrow hallway. Person A won\'t move until Person B moves, and Person B won\'t move until Person A moves. They are deadlocked forever.'
      },
      {
        id: 'exp_conc_4',
        question: 'What mechanism is commonly used to prevent multiple threads from accessing a shared resource simultaneously?',
        options: ['A Promise', 'A Mutex (Mutual Exclusion Lock)', 'A Web Worker', 'A Compiler'],
        correctIndex: 1,
        explanation: 'A Mutex acts like a bathroom key. Only one thread can hold the key at a time. Others must wait until the key is returned before they can enter the critical section.'
      },
      {
        id: 'exp_conc_5',
        question: 'JavaScript (in the browser and Node.js) is primarily:',
        options: ['Multi-threaded', 'Single-threaded with an Event Loop', 'Completely asynchronous with no threads', 'Compiled directly to GPU'],
        correctIndex: 1,
        explanation: 'JS executes your code on a single main thread. It achieves high concurrency using an Event Loop that offloads I/O tasks to the background and processes callbacks when they finish.'
      },
      {
        id: 'exp_conc_6',
        question: 'What is Starvation in concurrent programming?',
        options: ['When a thread is perpetually denied necessary resources to process its work', 'When the server runs out of RAM', 'When an API rate limits the client', 'When a database drops tables'],
        correctIndex: 0,
        explanation: 'If a scheduling algorithm always favors high-priority threads, a low-priority thread might never get CPU time, effectively "starving".'
      },
      {
        id: 'exp_conc_7',
        question: 'What does thread-safe mean?',
        options: ['Code that encrypts its variables', 'Code that is guaranteed to be free of race conditions when accessed by multiple threads simultaneously', 'Code that runs in an isolated sandbox', 'Code that cannot crash'],
        correctIndex: 1,
        explanation: 'Thread-safe code carefully uses locks, atomic operations, or immutable data to ensure multiple threads don\'t corrupt its state.'
      },
      {
        id: 'exp_conc_8',
        question: 'What is optimistic concurrency control?',
        options: ['Assuming no conflicts will occur and only checking for conflicts at the time of committing a transaction', 'Locking a record the moment someone views it', 'Ignoring errors and hoping for the best', 'Using multiple databases'],
        correctIndex: 0,
        explanation: 'Instead of locking a row when a user starts editing (Pessimistic), Optimistic control lets them edit, then checks if the row\'s version/timestamp changed before saving.'
      }
    ]
  },
  graphql: {
    id: 'graphql',
    title: 'GraphQL Basics',
    tier: 'Expert',
    icon: '🕸️',
    color: 'hover:border-pink-500',
    questions: [
      {
        id: 'exp_gq_1',
        question: 'What is the primary advantage of GraphQL over traditional REST APIs?',
        options: ['It uses XML instead of JSON', 'It allows clients to request exactly the data they need, no more, no less', 'It is inherently more secure', 'It automatically creates databases'],
        correctIndex: 1,
        explanation: 'REST often suffers from over-fetching (getting useless data) or under-fetching (requiring multiple requests). GraphQL solves this with precise queries.'
      },
      {
        id: 'exp_gq_2',
        question: 'In GraphQL, what is used to modify data on the server?',
        options: ['A Query', 'A Mutation', 'A Subscription', 'A POST request'],
        correctIndex: 1,
        explanation: 'Queries are strictly for reading data. Mutations are used for creating, updating, or deleting data.'
      },
      {
        id: 'exp_gq_3',
        question: 'What is a GraphQL Resolver?',
        options: ['A tool to find IP addresses', 'A function that actually fetches the data for a specific field in a schema', 'A built-in error handler', 'A type of database'],
        correctIndex: 1,
        explanation: 'The schema defines the shape of the data, but Resolvers provide the instructions on HOW to get that data (e.g., querying a database or calling a REST API).'
      },
      {
        id: 'exp_gq_4',
        question: 'What is the N+1 Query Problem, commonly seen in GraphQL?',
        options: ['Fetching 1 extra row by mistake', 'A performance issue where fetching a list of N items triggers N additional database queries to resolve a nested relationship', 'A syntax error in the schema', 'A security vulnerability'],
        correctIndex: 1,
        explanation: 'If you query 100 users, and their avatars, a naive GraphQL setup might run 1 query for users, and 100 separate queries for avatars. (Fixed using tools like DataLoader).'
      },
      {
        id: 'exp_gq_5',
        question: 'How do you implement real-time updates in GraphQL?',
        options: ['Using continuous Queries', 'Using WebSockets and GraphQL Subscriptions', 'Using a Mutation loop', 'GraphQL does not support real-time'],
        correctIndex: 1,
        explanation: 'Subscriptions allow clients to listen to specific events. When a mutation triggers that event, the server pushes the update to the client over a WebSocket.'
      },
      {
        id: 'exp_gq_6',
        question: 'Unlike REST which uses many endpoints, a standard GraphQL API uses:',
        options: ['Two endpoints: /read and /write', 'A single endpoint (usually /graphql)', 'One endpoint per database table', 'No endpoints, it uses direct TCP'],
        correctIndex: 1,
        explanation: 'GraphQL routes all queries and mutations through a single, unified endpoint, and the server parses the request body to determine what to do.'
      },
      {
        id: 'exp_gq_7',
        question: 'What does a GraphQL Schema define?',
        options: ['The database connection string', 'The UI layout', 'The strongly-typed structure of the API, including all available queries, mutations, and types', 'The caching strategy'],
        correctIndex: 2,
        explanation: 'The schema acts as a strict contract between the client and the server, documenting exactly what data is available and in what format.'
      },
      {
        id: 'exp_gq_8',
        question: 'Which HTTP status code does a GraphQL server usually return even if the query resulted in a data error?',
        options: ['404 Not Found', '500 Internal Server Error', '200 OK', '400 Bad Request'],
        correctIndex: 2,
        explanation: 'Unless there is a catastrophic network failure, GraphQL usually returns 200 OK, placing any errors inside an "errors" array in the JSON response payload.'
      }
    ]
  },
  cicd: {
    id: 'cicd',
    title: 'CI/CD Basics',
    tier: 'Expert',
    icon: '🚀',
    color: 'hover:border-green-500',
    questions: [
      {
        id: 'exp_ci_1',
        question: 'What does CI/CD stand for?',
        options: ['Continuous Integration / Continuous Deployment (or Delivery)', 'Code Inspection / Code Debugging', 'Concurrent Iteration / Concurrent Design', 'Compiled Instructions / Compressed Data'],
        correctIndex: 0,
        explanation: 'CI/CD is the practice of automating the integration of code changes and the delivery/deployment of applications to production.'
      },
      {
        id: 'exp_ci_2',
        question: 'What is the primary goal of Continuous Integration (CI)?',
        options: ['To automatically write code', 'To merge developers\' code changes into a central repository frequently, accompanied by automated testing to detect bugs early', 'To deploy code to servers', 'To backup databases'],
        correctIndex: 1,
        explanation: 'CI ensures that the main branch is always in a healthy state by automatically building and testing every PR or commit.'
      },
      {
        id: 'exp_ci_3',
        question: 'What is the difference between Continuous Delivery and Continuous Deployment?',
        options: ['There is no difference', 'Delivery requires manual approval to push to production; Deployment pushes to production completely automatically', 'Delivery is for hardware, deployment is for software', 'Deployment tests code, Delivery writes it'],
        correctIndex: 1,
        explanation: 'In Continuous Deployment, every change that passes the automated tests is deployed to production automatically without human intervention.'
      },
      {
        id: 'exp_ci_4',
        question: 'What is a CI/CD Pipeline?',
        options: ['A physical cable connecting servers', 'A series of automated steps (e.g., Build, Test, Deploy) that code must pass through to reach production', 'A type of database queue', 'A routing protocol'],
        correctIndex: 1,
        explanation: 'Pipelines orchestrate the workflow. If the "Test" step fails, the pipeline halts, preventing broken code from reaching the "Deploy" step.'
      },
      {
        id: 'exp_ci_5',
        question: 'Which of the following is a popular CI/CD tool?',
        options: ['React', 'GitHub Actions', 'MongoDB', 'Webpack'],
        correctIndex: 1,
        explanation: 'GitHub Actions (along with Jenkins, GitLab CI, and CircleCI) is a powerful tool to define and run CI/CD workflows.'
      },
      {
        id: 'exp_ci_6',
        question: 'What is a "Blue-Green" deployment strategy?',
        options: ['Deploying only on weekdays', 'Running two identical production environments; traffic is routed to the "Blue" one while "Green" is updated, then traffic is flipped to "Green"', 'Mixing frontend and backend code', 'A method of A/B testing CSS colors'],
        correctIndex: 1,
        explanation: 'Blue-Green deployments allow for zero-downtime updates and instant rollbacks (just flip the router back to Blue if Green crashes).'
      },
      {
        id: 'exp_ci_7',
        question: 'What is a "Canary" release?',
        options: ['A release full of bugs', 'Deploying the new version to a small percentage of users first to monitor for issues before rolling it out to everyone', 'A release done at night', 'A release specifically for QA testers'],
        correctIndex: 1,
        explanation: 'Named after the "canary in a coal mine", it limits the blast radius of a bad update by exposing only a fraction of users to it initially.'
      },
      {
        id: 'exp_ci_8',
        question: 'In a CI pipeline, what is "Code Coverage"?',
        options: ['The number of lines of code in the repo', 'A metric showing what percentage of your source code is executed when the test suite runs', 'The amount of documentation written', 'The number of developers who reviewed the code'],
        correctIndex: 1,
        explanation: 'If your tests only execute 50% of your code, your Code Coverage is 50%. High coverage increases confidence but doesn\'t guarantee bug-free code.'
      }
    ]
  },
  docker: {
    id: 'docker',
    title: 'Docker Basics',
    tier: 'Expert',
    icon: '🐳',
    color: 'hover:border-blue-500',
    questions: [
      {
        id: 'exp_dk_1',
        question: 'What is Docker primarily used for?',
        options: ['Creating graphic designs', 'Containerizing applications so they run identically in any environment', 'Writing SQL queries', 'Managing DNS records'],
        correctIndex: 1,
        explanation: 'Docker packages an application and all its dependencies into a standard unit (container), eliminating the "It works on my machine!" problem.'
      },
      {
        id: 'exp_dk_2',
        question: 'What is the difference between a Container and a Virtual Machine (VM)?',
        options: ['Containers are hardware, VMs are software', 'VMs virtualize the hardware and require a full guest OS; Containers virtualize the OS, sharing the host OS kernel', 'Containers are slower', 'They are exactly the same'],
        correctIndex: 1,
        explanation: 'Because containers share the host kernel, they are incredibly lightweight, starting in milliseconds and using far less memory than a VM.'
      },
      {
        id: 'exp_dk_3',
        question: 'What is a Docker Image?',
        options: ['A screenshot of the application', 'A running instance of a container', 'A read-only template with instructions for creating a Docker container', 'A backup of a database'],
        correctIndex: 2,
        explanation: 'An Image is the blueprint (like a Class). A Container is a running instance of that blueprint (like an Object).'
      },
      {
        id: 'exp_dk_4',
        question: 'What file is used to define the steps to build a Docker Image?',
        options: ['docker-compose.yml', 'Dockerfile', 'package.json', 'config.sys'],
        correctIndex: 1,
        explanation: 'A Dockerfile is a text document containing a series of commands (FROM, RUN, COPY) that Docker reads to assemble an image.'
      },
      {
        id: 'exp_dk_5',
        question: 'What is Docker Compose?',
        options: ['A tool to write music', 'A tool for defining and running multi-container Docker applications using a YAML file', 'A method of compressing images', 'The engine that runs containers'],
        correctIndex: 1,
        explanation: 'Compose lets you define a web server, a database, and a cache in one `docker-compose.yml` file, and start them all together with `docker-compose up`.'
      },
      {
        id: 'exp_dk_6',
        question: 'In Docker, what is a Volume?',
        options: ['The loudness of the application', 'A mechanism for persisting data generated by and used by Docker containers, bypassing the ephemeral container filesystem', 'A networking protocol', 'The maximum size of an image'],
        correctIndex: 1,
        explanation: 'Containers are ephemeral (deleted easily). Volumes safely store database files or logs on the host machine so they survive container destruction.'
      },
      {
        id: 'exp_dk_7',
        question: 'What does the `FROM` instruction in a Dockerfile do?',
        options: ['Specifies the author', 'Initializes a new build stage and sets the Base Image', 'Downloads a file from the internet', 'Changes the working directory'],
        correctIndex: 1,
        explanation: 'Every Dockerfile must start with a FROM instruction (e.g., `FROM node:18`), which dictates the starting environment you are building upon.'
      },
      {
        id: 'exp_dk_8',
        question: 'What is Docker Hub?',
        options: ['A hardware router', 'The default public registry where Docker users can create, test, store, and distribute images', 'A tool to manage Kubernetes', 'A chat forum'],
        correctIndex: 1,
        explanation: 'Docker Hub is like GitHub, but for Docker images. When you type `docker pull ubuntu`, it fetches the image from Docker Hub.'
      }
    ]
  },
  advDesignPatterns: {
    id: 'advDesignPatterns',
    title: 'Advanced Design Patterns',
    tier: 'Expert',
    icon: '⚙️',
    color: 'hover:border-purple-800',
    questions: [
      {
        id: 'exp_adp_1',
        question: 'What is the CQRS pattern?',
        options: ['Command Query Responsibility Segregation: Separating read operations from write operations into different models', 'A caching mechanism', 'A type of database indexing', 'A testing framework'],
        correctIndex: 0,
        explanation: 'CQRS separates the model used for reading data (Queries) from the model used to update data (Commands), allowing independent scaling and optimization.'
      },
      {
        id: 'exp_adp_2',
        question: 'What is Event Sourcing?',
        options: ['Logging errors to a file', 'Storing the state of an application as a sequence of state-changing events, rather than just storing current state', 'Sending emails based on triggers', 'A method of compiling code'],
        correctIndex: 1,
        explanation: 'Instead of storing "Balance: $50", Event Sourcing stores "Deposited $100" then "Withdrew $50". Current state is derived by replaying the events (like an accounting ledger).'
      },
      {
        id: 'exp_adp_3',
        question: 'In microservices, what does the API Gateway pattern solve?',
        options: ['It prevents database crashes', 'It provides a single unified entry point for clients, routing requests to the appropriate microservices behind the scenes', 'It encrypts hard drives', 'It converts REST to GraphQL'],
        correctIndex: 1,
        explanation: 'Instead of the client knowing the IPs of 50 different microservices, it talks to the Gateway, which handles routing, authentication, and rate limiting.'
      },
      {
        id: 'exp_adp_4',
        question: 'What is the Circuit Breaker pattern?',
        options: ['A tool to stop infinite loops', 'A pattern that detects failures and encapsulates the logic of preventing a failure from constantly recurring (e.g., stop calling a dead API)', 'A method to shut down the server', 'A hardware firewall'],
        correctIndex: 1,
        explanation: 'If a downstream service dies, continuing to hammer it with requests wastes resources. A Circuit Breaker "trips" and instantly fails fast until the service recovers.'
      },
      {
        id: 'exp_adp_5',
        question: 'What is the Strangler Fig pattern used for?',
        options: ['Gradually migrating a legacy monolithic system by incrementally replacing specific pieces of functionality with new applications and services', 'Compressing large codebases', 'Handling memory leaks', 'A security pattern to trap hackers'],
        correctIndex: 0,
        explanation: 'Like a vine strangling an old tree, you slowly route traffic to new microservices one by one until the old monolith can be safely deleted.'
      },
      {
        id: 'exp_adp_6',
        question: 'What does the Saga pattern manage in distributed systems?',
        options: ['User authentication', 'Data consistency across microservices using a sequence of local transactions and compensating actions (rollbacks)', 'Database indexing', 'UI state'],
        correctIndex: 1,
        explanation: 'Since you can\'t have a traditional ACID transaction across 5 different microservices, a Saga executes a chain of local transactions. If one fails, it runs compensating transactions to undo the previous steps.'
      },
      {
        id: 'exp_adp_7',
        question: 'Which architectural pattern is React based upon?',
        options: ['MVC (Model-View-Controller)', 'Component-Based Architecture (with unidirectional data flow)', 'Microkernel', 'Peer-to-Peer'],
        correctIndex: 1,
        explanation: 'React builds UIs via self-contained components and strictly pushes data down via props (unidirectional), breaking away from traditional two-way binding MVCs.'
      },
      {
        id: 'exp_adp_8',
        question: 'What is Dependency Injection (DI)?',
        options: ['A security vulnerability', 'A technique where an object receives other objects (dependencies) it needs from the outside, rather than creating them itself', 'A way to install NPM packages', 'Loading scripts asynchronously'],
        correctIndex: 1,
        explanation: 'DI (a form of Inversion of Control) makes code highly modular and testable because you can easily swap out dependencies (like passing a mock database into a class during testing).'
      }
    ]
  },
  testing: {
    id: 'testing',
    title: 'Testing Fundamentals',
    tier: 'Expert',
    icon: '🧪',
    color: 'hover:border-green-600',
    questions: [
      {
        id: 'exp_test_1',
        question: 'What is the core philosophy of Test-Driven Development (TDD)?',
        options: ['Write tests after the code is deployed', 'Write a failing test FIRST, then write the minimum code to pass it, then refactor (Red-Green-Refactor)', 'Have QA engineers write the tests', 'Only test the UI'],
        correctIndex: 1,
        explanation: 'TDD forces you to think about the requirements and API design before writing implementation code, resulting in highly testable and robust software.'
      },
      {
        id: 'exp_test_2',
        question: 'What distinguishes a Unit Test from an Integration Test?',
        options: ['Unit tests check UI, Integration checks databases', 'Unit tests isolate and verify a single small piece of code (like a function); Integration tests verify how multiple pieces work together', 'Unit tests are manual, Integration is automated', 'They are the same'],
        correctIndex: 1,
        explanation: 'A unit test might check if an `add(a,b)` function works. An integration test might check if the `Cart` class correctly communicates with the `Database` class.'
      },
      {
        id: 'exp_test_3',
        question: 'What is an End-to-End (E2E) test?',
        options: ['Testing the very end of a string', 'A test that simulates a real user scenario from start to finish, interacting with the GUI and real backend', 'Testing only the database', 'A test written after the project ends'],
        correctIndex: 1,
        explanation: 'E2E tests (like using Cypress or Playwright) literally open a browser, click buttons, and verify the whole stack works exactly as a user would experience it.'
      },
      {
        id: 'exp_test_4',
        question: 'What is a "Mock" in testing?',
        options: ['A fake object programmed with expectations, used to simulate complex, real dependencies (like an API or Database)', 'A test that makes fun of your code', 'A syntax error', 'A type of variable'],
        correctIndex: 0,
        explanation: 'Mocks (and stubs/spies) allow you to test a function in isolation without actually hitting a real database or making a real Stripe credit card charge.'
      },
      {
        id: 'exp_test_5',
        question: 'What does "Code Coverage" measure?',
        options: ['How much code is commented', 'The percentage of source code lines/branches executed while the automated tests are running', 'How many bugs were found', 'The physical size of the files'],
        correctIndex: 1,
        explanation: 'While 100% coverage doesn\'t guarantee zero bugs, it proves that every line of code at least successfully ran during the test suite without crashing.'
      },
      {
        id: 'exp_test_6',
        question: 'What is Regression Testing?',
        options: ['Testing older versions of the app', 'Running tests to confirm that a recent program or code change has not adversely affected existing features', 'Testing database downgrades', 'Testing performance'],
        correctIndex: 1,
        explanation: 'A regression is when something that used to work suddenly breaks. Regression testing catches these unintended side effects.'
      },
      {
        id: 'exp_test_7',
        question: 'What is a "Flaky Test"?',
        options: ['A test that tests the UI', 'A test that occasionally fails or passes without any changes to the code, eroding trust in the test suite', 'A test that is written poorly', 'A test that runs too fast'],
        correctIndex: 1,
        explanation: 'Flaky tests are a nightmare. They are usually caused by race conditions, unpredictable network latency, or relying on specific timestamps.'
      },
      {
        id: 'exp_test_8',
        question: 'In the "Testing Pyramid", which type of test should you have the MOST of?',
        options: ['E2E Tests', 'Integration Tests', 'Unit Tests', 'Manual Tests'],
        correctIndex: 2,
        explanation: 'The pyramid dictates a wide base of Unit Tests (fast, cheap to write), a middle layer of Integration tests, and a small peak of E2E tests (slow, brittle, expensive).'
      }
    ]
  },
  codeReview: {
    id: 'codeReview',
    title: 'Code Review Best Practices',
    tier: 'Expert',
    icon: '👀',
    color: 'hover:border-zinc-400',
    questions: [
      {
        id: 'exp_cr_1',
        question: 'What is the primary goal of a Code Review?',
        options: ['To prove the author is wrong', 'To enforce tabs vs spaces', 'To catch bugs, share knowledge, and maintain codebase quality/consistency', 'To delay the release'],
        correctIndex: 2,
        explanation: 'Code reviews are collaborative, not adversarial. They ensure quality while helping junior developers learn from seniors (and vice versa!).'
      },
      {
        id: 'exp_cr_2',
        question: 'Why is keeping Pull Requests (PRs) small considered a best practice?',
        options: ['Because Git cannot handle large files', 'Because small PRs are easier to understand, faster to review, and less risky to merge', 'To increase commit count', 'To make the project look busy'],
        correctIndex: 1,
        explanation: 'A 50-line PR gets a rigorous review. A 5,000-line PR gets a "Looks good to me" because the reviewer gave up. Keep them small.'
      },
      {
        id: 'exp_cr_3',
        question: 'Which of these should ideally NOT be a focus during human code review?',
        options: ['Architecture and design decisions', 'Code readability and maintainability', 'Catching missing edge cases', 'Checking for missing semicolons and formatting errors'],
        correctIndex: 3,
        explanation: 'Formatting should be entirely automated by tools like Prettier and ESLint. Humans should focus on logic, not syntax styling.'
      },
      {
        id: 'exp_cr_4',
        question: 'What is a "Nitpick" (often labeled as "nit:") in a code review?',
        options: ['A critical security flaw', 'A minor, non-blocking suggestion (like a slightly better variable name) that shouldn\'t hold up the merge', 'A bug in the testing framework', 'An insult to the author'],
        correctIndex: 1,
        explanation: 'Prefixing a comment with "nit:" tells the author "This is a tiny detail, feel free to fix it or ignore it, I\'m approving anyway."'
      },
      {
        id: 'exp_cr_5',
        question: 'How should feedback be phrased in a code review?',
        options: ['"You wrote this wrong."', '"Why did you do it this way? This is bad."', '"What do you think about extracting this logic into a helper function?"', '"Fix this immediately."'],
        correctIndex: 2,
        explanation: 'Tone matters. Frame feedback as questions or suggestions, critique the code (not the person), and assume positive intent.'
      },
      {
        id: 'exp_cr_6',
        question: 'What is the "LGTM" acronym commonly used in PRs?',
        options: ['Let\'s Go To Master', 'Looks Good To Me', 'Little Glitches To Mention', 'Local Git Tree Modified'],
        correctIndex: 1,
        explanation: 'LGTM is developer shorthand for "I have reviewed this, it looks fine, feel free to merge."'
      },
      {
        id: 'exp_cr_7',
        question: 'If a reviewer requests major changes that fundamentally alter the architecture, what is the best next step?',
        options: ['Argue in the comments for a week', 'Merge it anyway', 'Have a synchronous conversation (call or meeting) to resolve the complex disagreement faster', 'Delete the PR'],
        correctIndex: 2,
        explanation: 'Text communication loses nuance. For complex architectural debates, jumping on a quick 10-minute call saves hours of frustrating back-and-forth typing.'
      },
      {
        id: 'exp_cr_8',
        question: 'Who should write the description for a Pull Request?',
        options: ['The reviewer', 'The project manager', 'The author of the code, providing context on WHAT changed and WHY', 'It should be left blank'],
        correctIndex: 2,
        explanation: 'A good PR description explains the "Why" (linking to issue trackers) and guides the reviewer on how to test the changes.'
      }
    ]
  },
  scalability: {
    id: 'scalability',
    title: 'Scalability Concepts',
    tier: 'Expert',
    icon: '📊',
    color: 'hover:border-cyan-600',
    questions: [
      {
        id: 'exp_scale_1',
        question: 'What does it mean for an application to be "scalable"?',
        options: ['It uses a lot of RAM', 'It can gracefully handle a growing amount of work or its potential to be enlarged to accommodate that growth', 'It is written in C++', 'It has a nice UI'],
        correctIndex: 1,
        explanation: 'Scalability is the system\'s ability to expand (via hardware or software architecture) to handle massive spikes in traffic without degrading performance.'
      },
      {
        id: 'exp_scale_2',
        question: 'What is the primary bottleneck in most modern web applications as they scale?',
        options: ['The Frontend framework', 'The Web Server (Node, Python)', 'The Database', 'The DNS resolution'],
        correctIndex: 2,
        explanation: 'Web servers are stateless and trivial to scale horizontally. Databases hold state, require disk I/O, and maintain locks, making them the classic bottleneck.'
      },
      {
        id: 'exp_scale_3',
        question: 'What is "Database Replication" (Master-Slave / Primary-Replica)?',
        options: ['Backing up the database nightly', 'Routing all writes to a Primary node, which continuously copies data to Replica nodes that handle read-only traffic', 'Splitting a table in half', 'Deleting duplicate rows'],
        correctIndex: 1,
        explanation: 'Replication scales out database reads. Since most web apps read 10x more often than they write, adding read replicas massively improves throughput.'
      },
      {
        id: 'exp_scale_4',
        question: 'What is the downside of asynchronous Database Replication?',
        options: ['It is too slow', 'Eventual Consistency: A user might update their profile, immediately refresh, and see old data because the replica hasn\'t synced yet', 'It uses too much CPU', 'It deletes data randomly'],
        correctIndex: 1,
        explanation: 'Because the Primary doesn\'t wait for Replicas to copy the data before answering the client, there is a tiny window (ms to seconds) where the system is inconsistent.'
      },
      {
        id: 'exp_scale_5',
        question: 'How do Message Queues (like RabbitMQ or Kafka) improve scalability?',
        options: ['By compressing HTTP requests', 'By decoupling heavy background processing from the fast web request/response cycle', 'By acting as a database', 'By blocking bad IP addresses'],
        correctIndex: 1,
        explanation: 'If a user uploads a video, the web server just drops a "process video" message in the queue and instantly responds "Success". Background workers scale independently to handle the queue.'
      },
      {
        id: 'exp_scale_6',
        question: 'What is an "Auto-Scaling Group" in cloud architecture?',
        options: ['A database indexing strategy', 'A service that automatically boots up new servers when CPU usage spikes, and shuts them down when traffic drops', 'A CSS property', 'A group of developers'],
        correctIndex: 1,
        explanation: 'Auto-scaling ensures you have enough horsepower during Black Friday, but don\'t pay for idle servers on a quiet Tuesday night.'
      },
      {
        id: 'exp_scale_7',
        question: 'What is the benefit of a Microservices architecture for scaling?',
        options: ['It makes the code simpler to read', 'It eliminates the need for databases', 'Individual services can be scaled independently based on their specific resource needs', 'It removes network latency'],
        correctIndex: 2,
        explanation: 'If the Image Processing service is getting hammered, you can spin up 100 instances of just that service, without wasting money scaling the entire monolithic application.'
      },
      {
        id: 'exp_scale_8',
        question: 'What is "Rate Limiting"?',
        options: ['Slowing down the database', 'Restricting the number of requests a single user/IP can make in a given timeframe to protect the system from abuse', 'A pricing tier', 'Limiting the amount of RAM a server uses'],
        correctIndex: 1,
        explanation: 'Rate limiting (e.g., 100 requests per minute) prevents poorly written bots or malicious DDoS attacks from exhausting your server resources.'
      }
    ]
  }
};
