const fs = require('fs');

const path = 'lib/problems.ts';
let content = fs.readFileSync(path, 'utf-8');

// Add to interface
content = content.replace(
  '  starterCodePython?: string;',
  '  starterCodePython?: string;\n  starterCodeC?: string;\n  starterCodeCpp?: string;\n  starterCodeJava?: string;'
);

// We need to add the starter code for each handcrafted problem
// I'll do string replacements for each one

const replacements = {
  '"beginner-1"': `    starterCodeC: \`#include <stdio.h>\n\nint addNumbers(int a, int b) {\n    // Write your code here\n    return 0;\n}\n\nint main() {\n    printf("%d\\n", addNumbers(2, 3));\n    return 0;\n}\`,
    starterCodeCpp: \`#include <iostream>\n\nint addNumbers(int a, int b) {\n    // Write your code here\n    return 0;\n}\n\nint main() {\n    std::cout << addNumbers(2, 3) << std::endl;\n    return 0;\n}\`,
    starterCodeJava: \`public class Main {\n    public static int addNumbers(int a, int b) {\n        // Write your code here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(addNumbers(2, 3));\n    }\n}\`,`,
  
  '"beginner-2"': `    starterCodeC: \`#include <stdio.h>\n#include <string.h>\n\nint getStringLength(const char* str) {\n    // Write your code here\n    return 0;\n}\n\nint main() {\n    printf("%d\\n", getStringLength("hello"));\n    return 0;\n}\`,
    starterCodeCpp: \`#include <iostream>\n#include <string>\n\nint getStringLength(std::string str) {\n    // Write your code here\n    return 0;\n}\n\nint main() {\n    std::cout << getStringLength("hello") << std::endl;\n    return 0;\n}\`,
    starterCodeJava: \`public class Main {\n    public static int getStringLength(String str) {\n        // Write your code here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(getStringLength("hello"));\n    }\n}\`,`,

  '"beginner-3"': `    starterCodeC: \`#include <stdio.h>\n#include <stdbool.h>\n\nbool isEven(int n) {\n    // Write your code here\n    return false;\n}\n\nint main() {\n    printf("%s\\n", isEven(4) ? "true" : "false");\n    return 0;\n}\`,
    starterCodeCpp: \`#include <iostream>\n\nbool isEven(int n) {\n    // Write your code here\n    return false;\n}\n\nint main() {\n    std::cout << (isEven(4) ? "true" : "false") << std::endl;\n    return 0;\n}\`,
    starterCodeJava: \`public class Main {\n    public static boolean isEven(int n) {\n        // Write your code here\n        return false;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(isEven(4));\n    }\n}\`,`,

  '"beginner-4"': `    starterCodeC: \`#include <stdio.h>\n\nint multiplyByTen(int n) {\n    // Write your code here\n    return 0;\n}\n\nint main() {\n    printf("%d\\n", multiplyByTen(5));\n    return 0;\n}\`,
    starterCodeCpp: \`#include <iostream>\n\nint multiplyByTen(int n) {\n    // Write your code here\n    return 0;\n}\n\nint main() {\n    std::cout << multiplyByTen(5) << std::endl;\n    return 0;\n}\`,
    starterCodeJava: \`public class Main {\n    public static int multiplyByTen(int n) {\n        // Write your code here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(multiplyByTen(5));\n    }\n}\`,`,

  '"beginner-5"': `    starterCodeC: \`#include <stdio.h>\n#include <stdlib.h>\n\nvoid fizzBuzz(int n) {\n    // Write your code here (print the array instead of returning for simplicity)\n    \n}\n\nint main() {\n    fizzBuzz(3);\n    return 0;\n}\`,
    starterCodeCpp: \`#include <iostream>\n#include <vector>\n#include <string>\n\nstd::vector<std::string> fizzBuzz(int n) {\n    // Write your code here\n    return {};\n}\n\nint main() {\n    std::vector<std::string> res = fizzBuzz(3);\n    for (const auto& s : res) std::cout << s << " ";\n    std::cout << std::endl;\n    return 0;\n}\`,
    starterCodeJava: \`import java.util.List;\nimport java.util.ArrayList;\n\npublic class Main {\n    public static List<String> fizzBuzz(int n) {\n        // Write your code here\n        return new ArrayList<>();\n    }\n\n    public static void main(String[] args) {\n        System.out.println(fizzBuzz(3));\n    }\n}\`,`,

  '"intermediate-1"': `    starterCodeC: \`#include <stdio.h>\n#include <string.h>\n\nvoid reverseString(char* s) {\n    // Write your code here\n    \n}\n\nint main() {\n    char str[] = "hello";\n    reverseString(str);\n    printf("%s\\n", str);\n    return 0;\n}\`,
    starterCodeCpp: \`#include <iostream>\n#include <vector>\n\nvoid reverseString(std::vector<char>& s) {\n    // Write your code here\n    \n}\n\nint main() {\n    std::vector<char> str = {'h','e','l','l','o'};\n    reverseString(str);\n    for(char c : str) std::cout << c;\n    std::cout << std::endl;\n    return 0;\n}\`,
    starterCodeJava: \`public class Main {\n    public static void reverseString(char[] s) {\n        // Write your code here\n        \n    }\n\n    public static void main(String[] args) {\n        char[] str = {'h','e','l','l','o'};\n        reverseString(str);\n        System.out.println(str);\n    }\n}\`,`,

  '"intermediate-2"': `    starterCodeC: \`#include <stdio.h>\n#include <stdbool.h>\n\nbool isPalindrome(const char* s) {\n    // Write your code here\n    return false;\n}\n\nint main() {\n    printf("%s\\n", isPalindrome("A man, a plan, a canal: Panama") ? "true" : "false");\n    return 0;\n}\`,
    starterCodeCpp: \`#include <iostream>\n#include <string>\n\nbool isPalindrome(std::string s) {\n    // Write your code here\n    return false;\n}\n\nint main() {\n    std::cout << (isPalindrome("A man, a plan, a canal: Panama") ? "true" : "false") << std::endl;\n    return 0;\n}\`,
    starterCodeJava: \`public class Main {\n    public static boolean isPalindrome(String s) {\n        // Write your code here\n        return false;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(isPalindrome("A man, a plan, a canal: Panama"));\n    }\n}\`,`,

  '"expert-1"': `    starterCodeC: \`#include <stdio.h>\n\nint fib(int n) {\n    // Write your code here\n    return 0;\n}\n\nint main() {\n    printf("%d\\n", fib(4));\n    return 0;\n}\`,
    starterCodeCpp: \`#include <iostream>\n\nint fib(int n) {\n    // Write your code here\n    return 0;\n}\n\nint main() {\n    std::cout << fib(4) << std::endl;\n    return 0;\n}\`,
    starterCodeJava: \`public class Main {\n    public static int fib(int n) {\n        // Write your code here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(fib(4));\n    }\n}\`,`
};

for (const [key, codeString] of Object.entries(replacements)) {
  const regex = new RegExp(`(${key}: \\{[\\s\\S]*?starterCodePython: \`[\\s\\S]*?\`,)`);
  content = content.replace(regex, `$1\n${codeString}`);
}

// Boss 1
content = content.replace(
  /starterCodePython: `def runCalculator([\s\S]*?)pass`,/,
  `starterCodePython: \`def runCalculator$1pass\`,
          starterCodeC: \`#include <stdio.h>\n\n// Implement Calculator using struct and functions\ntypedef struct {\n    int value;\n} Calculator;\n\nvoid calc_init(Calculator* c) { c->value = 0; }\n// Write your methods here!\n\nint main() {\n    Calculator calc;\n    calc_init(&calc);\n    printf("Initialized calc\\n");\n    return 0;\n}\`,
          starterCodeCpp: \`#include <iostream>\n\nclass Calculator {\npublic:\n    int value = 0;\n    // Write your methods here!\n};\n\nint main() {\n    Calculator calc;\n    std::cout << "Initialized calc" << std::endl;\n    return 0;\n}\`,
          starterCodeJava: \`class Calculator {\n    int value = 0;\n    // Write your methods here!\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Calculator calc = new Calculator();\n        System.out.println("Initialized calc");\n    }\n}\`,`
);

// Boss 2
content = content.replace(
  /starterCodePython: `def runTodoList([\s\S]*?)pass`,/,
  `starterCodePython: \`def runTodoList$1pass\`,
          starterCodeC: \`#include <stdio.h>\n\n// Implement TodoList\n\nint main() {\n    printf("Ready\\n");\n    return 0;\n}\`,
          starterCodeCpp: \`#include <iostream>\n#include <vector>\n#include <string>\n\nclass TodoList {\n    // Implement your class here!\n};\n\nint main() {\n    TodoList todo;\n    std::cout << "Ready" << std::endl;\n    return 0;\n}\`,
          starterCodeJava: \`import java.util.*;\n\nclass TodoList {\n    // Implement your class here!\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        TodoList todo = new TodoList();\n        System.out.println("Ready");\n    }\n}\`,`
);

// Boss 3
content = content.replace(
  /starterCodePython: `def runDB([\s\S]*?)pass`,/,
  `starterCodePython: \`def runDB$1pass\`,
          starterCodeC: \`#include <stdio.h>\n\n// Implement SimpleDB\n\nint main() {\n    printf("Ready\\n");\n    return 0;\n}\`,
          starterCodeCpp: \`#include <iostream>\n#include <unordered_map>\n#include <string>\n\nclass SimpleDB {\n    // Implement your class here!\n};\n\nint main() {\n    SimpleDB db;\n    std::cout << "Ready" << std::endl;\n    return 0;\n}\`,
          starterCodeJava: \`import java.util.*;\n\nclass SimpleDB {\n    // Implement your class here!\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        SimpleDB db = new SimpleDB();\n        System.out.println("Ready");\n    }\n}\`,`
);

// Procedural generations
// Beginner
content = content.replace(
  /starterCodePython: `def solveLevel\$\{i\}\(n\):\n    # Return n \+ \$\{i\}\n    pass`,/,
  `starterCodePython: \`def solveLevel\${i}(n):\n    # Return n + \${i}\n    pass\`,
          starterCodeC: \`#include <stdio.h>\n\nint solveLevel\${i}(int n) {\n    // Return n + \${i}\n    return 0;\n}\n\nint main() {\n    printf("%d\\n", solveLevel\${i}(10));\n    return 0;\n}\`,
          starterCodeCpp: \`#include <iostream>\n\nint solveLevel\${i}(int n) {\n    // Return n + \${i}\n    return 0;\n}\n\nint main() {\n    std::cout << solveLevel\${i}(10) << std::endl;\n    return 0;\n}\`,
          starterCodeJava: \`public class Main {\n    public static int solveLevel\${i}(int n) {\n        // Return n + \${i}\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(solveLevel\${i}(10));\n    }\n}\`,`
);

// Intermediate
content = content.replace(
  /starterCodePython: `def solveLevel\$\{i\}\(arr\):\n    # Return mapped array\n    pass`,/,
  `starterCodePython: \`def solveLevel\${i}(arr):\n    # Return mapped array\n    pass\`,
          starterCodeC: \`#include <stdio.h>\n\nvoid solveLevel\${i}(int* arr, int size) {\n    // Write your code here to map the array\n}\n\nint main() {\n    int arr[] = {1, 2, 3};\n    solveLevel\${i}(arr, 3);\n    for(int j=0; j<3; j++) printf("%d ", arr[j]);\n    printf("\\n");\n    return 0;\n}\`,
          starterCodeCpp: \`#include <iostream>\n#include <vector>\n\nstd::vector<int> solveLevel\${i}(std::vector<int> arr) {\n    // Return mapped array\n    return arr;\n}\n\nint main() {\n    std::vector<int> res = solveLevel\${i}({1, 2, 3});\n    for(int val : res) std::cout << val << " ";\n    std::cout << std::endl;\n    return 0;\n}\`,
          starterCodeJava: \`import java.util.*;\n\npublic class Main {\n    public static List<Integer> solveLevel\${i}(List<Integer> arr) {\n        // Return mapped array\n        return arr;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(solveLevel\${i}(Arrays.asList(1, 2, 3)));\n    }\n}\`,`
);

// Expert
content = content.replace(
  /starterCodePython: `def solveLevel\$\{i\}\(n\):\n    # Write your logic here\n    pass`,/,
  `starterCodePython: \`def solveLevel\${i}(n):\n    # Write your logic here\n    pass\`,
          starterCodeC: \`#include <stdio.h>\n\nint solveLevel\${i}(int n) {\n    // Write your logic here\n    return 0;\n}\n\nint main() {\n    printf("%d\\n", solveLevel\${i}(2));\n    return 0;\n}\`,
          starterCodeCpp: \`#include <iostream>\n\nint solveLevel\${i}(int n) {\n    // Write your logic here\n    return 0;\n}\n\nint main() {\n    std::cout << solveLevel\${i}(2) << std::endl;\n    return 0;\n}\`,
          starterCodeJava: \`public class Main {\n    public static int solveLevel\${i}(int n) {\n        // Write your logic here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(solveLevel\${i}(2));\n    }\n}\`,`
);


// Now we have to add the problems mapping to the page.tsx where it applies it!
let pagePath = 'app/problems/[id]/page.tsx';
let pageContent = fs.readFileSync(pagePath, 'utf-8');

pageContent = pageContent.replace(
  /if \(newLang === 'python' && problem\.starterCodePython\) \{[\s\S]*?setActiveLang\(newLang\);/m,
  `if (newLang === 'python' && problem.starterCodePython) {
                    setCode(problem.starterCodePython);
                  } else if (newLang === 'javascript') {
                    setCode(problem.starterCode);
                  } else if (newLang === 'c' && problem.starterCodeC) {
                    setCode(problem.starterCodeC);
                  } else if (newLang === 'cpp' && problem.starterCodeCpp) {
                    setCode(problem.starterCodeCpp);
                  } else if (newLang === 'java' && problem.starterCodeJava) {
                    setCode(problem.starterCodeJava);
                  } else {
                    // Fallback
                    const starters: Record<string, string> = {
                      c: '#include <stdio.h>\\n\\nint main() {\\n    // Write your code here\\n    return 0;\\n}',
                      cpp: '#include <iostream>\\n\\nint main() {\\n    // Write your code here\\n    return 0;\\n}',
                      java: 'public class Main {\\n    public static void main(String[] args) {\\n        // Write your code here\\n    }\\n}'
                    };
                    setCode(starters[newLang] || '');
                  }
                  setActiveLang(newLang);`
);

// In page.tsx sync state if problem loads
pageContent = pageContent.replace(
  /if \(activeLang === 'python' && problem\.starterCodePython\) \{[\s\S]*?\}\)/m,
  `if (activeLang === 'python' && problem.starterCodePython) {
        setCode(problem.starterCodePython);
      } else if (activeLang === 'c' && problem.starterCodeC) {
        setCode(problem.starterCodeC);
      } else if (activeLang === 'cpp' && problem.starterCodeCpp) {
        setCode(problem.starterCodeCpp);
      } else if (activeLang === 'java' && problem.starterCodeJava) {
        setCode(problem.starterCodeJava);
      } else {
        setCode(problem.starterCode);
      }`
);

fs.writeFileSync(path, content);
fs.writeFileSync(pagePath, pageContent);

console.log("Done");
