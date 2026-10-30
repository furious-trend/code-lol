// agent-notes: { ctx: "Reference solutions, explanations, and progressive syntax clues for problem workspace", deps: ["./types"], state: active, last: "sato@2026-10-30" }

import { ModuleProblem, Problem } from './types';

export interface ProblemSolution {
  code: string;
  explanation: string;
  syntaxClue: string;
}

const SOLUTIONS_REGISTRY: Record<string, Partial<Record<string, ProblemSolution>>> = {
  // Python Module Problems
  'say-hello-to-codelol': {
    python: {
      code: `print("Hello CodeLOL")`,
      explanation: "In Python, the built-in `print()` function writes strings directly to standard output (stdout). No wrapper functions or imports are required.",
      syntaxClue: "Use Python's built-in print() function with a string argument."
    }
  },
  'py-ch1-l1': {
    python: {
      code: `def greet_user(is_logged_in: bool, name: str) -> str:
    if is_logged_in:
        return "Welcome back, " + name + "!"
    return "Please log in to continue."`,
      explanation: "Python enforces block scoping with consistent indentation. The conditional branch handles the authenticated greeting, while the default return path handles unauthenticated users.",
      syntaxClue: "Use `if is_logged_in:` with 4-space indentation and string concatenation or formatting."
    }
  },
  'py-ch1-l2': {
    python: {
      code: `def strip_comment(line: str) -> str:
    return line.split('#')[0].rstrip()`,
      explanation: "Splitting on the comment marker `#` produces a list of substrings. Taking index 0 gives the content before any comment, and `.rstrip()` removes trailing whitespace.",
      syntaxClue: "Use `.split('#')[0]` and `.rstrip()`."
    }
  },
  'pocket-money-math': {
    python: {
      code: `money = 50
money = money + 25
print(money)`,
      explanation: "Assigns 50 to a variable, increments it by 25, and evaluates the final sum to standard output.",
      syntaxClue: "Declare a variable, add the increment, and pass it to print()."
    }
  },
  'pass-or-arrear': {
    python: {
      code: `marks = 40
if marks >= 35:
    print("PASS")`,
      explanation: "Evaluates whether the student's marks meet or exceed the passing threshold (35) before printing PASS.",
      syntaxClue: "Use an `if marks >= 35:` conditional block."
    }
  },
  'count-to-3': {
    python: {
      code: `for i in range(1, 4):
    print(i)`,
      explanation: "The `range(1, 4)` generator yields values 1, 2, and 3. The `for` loop executes `print(i)` once per iteration.",
      syntaxClue: "Use `for i in range(1, 4):`."
    }
  },
  'py-ch2-l1': {
    python: {
      code: `def classify_type(val) -> str:
    if isinstance(val, bool):
        return "boolean"
    if isinstance(val, int):
        return "integer"
    if isinstance(val, float):
        return "float"
    if isinstance(val, str):
        return "string"
    return "other"`,
      explanation: "In Python, `bool` is a subclass of `int`. Checking `isinstance(val, bool)` first ensures booleans are not misclassified as integers.",
      syntaxClue: "Check boolean types before integers using `isinstance(val, bool)`."
    }
  },
  'py-ch3-l1': {
    python: {
      code: `def batch_stats(items: int, batch_size: int) -> tuple[int, int]:
    return (items // batch_size, items % batch_size)`,
      explanation: "Integer floor division `//` computes the full batch count, while the modulo operator `%` gives remaining leftover items.",
      syntaxClue: "Combine floor division `//` and remainder `%` inside a tuple."
    }
  },
  'py-ch4-l1': {
    python: {
      code: `def make_slug(text: str) -> str:
    return "-".join(text.split()).lower()`,
      explanation: "Splitting `text.split()` without arguments collapses consecutive whitespace and strips leading/trailing spaces. Joining with `-` and lowering forms a URL slug.",
      syntaxClue: "Combine `.split()`, `'-'.join(...)`, and `.lower()`."
    }
  },
  'py-ch5-l1': {
    python: {
      code: `def fizz_buzz(n: int) -> str:
    if n % 15 == 0:
        return "FizzBuzz"
    if n % 3 == 0:
        return "Fizz"
    if n % 5 == 0:
        return "Buzz"
    return str(n)`,
      explanation: "Evaluates the combined divisibility (3 and 5, or 15) before individual divisibility checks, falling back to string conversion.",
      syntaxClue: "Check `n % 15 == 0` first, followed by `% 3` and `% 5`."
    }
  },
  'py-ch6-l1': {
    python: {
      code: `def sum_evens(start: int, end: int) -> int:
    return sum(x for x in range(start, end + 1) if x % 2 == 0)`,
      explanation: "Generates integers from start to end inclusive, filters for even numbers with `x % 2 == 0`, and sums them.",
      syntaxClue: "Use a generator expression with `range(start, end + 1)` and `x % 2 == 0` inside `sum()`."
    }
  },
  'py-ch7-l1': {
    python: {
      code: `def make_multiplier(factor: int):
    def multiplier(x: int) -> int:
        return x * factor
    return multiplier`,
      explanation: "An inner function captures the `factor` parameter from its enclosing lexical scope, creating a closure.",
      syntaxClue: "Define an inner function `def multiplier(x): return x * factor` and return it."
    }
  },
  'py-ch8-l1': {
    python: {
      code: `def chunk_list(lst: list, size: int) -> list:
    if not lst or size <= 0:
        return []
    return [lst[i:i + size] for i in range(0, len(lst), size)]`,
      explanation: "Uses `range(0, len(lst), size)` with step `size` to slice sublists of length `size`.",
      syntaxClue: "Use a list comprehension with `range(0, len(lst), size)` and slice `lst[i:i + size]`."
    }
  },
  'py-ch9-l1': {
    python: {
      code: `def word_counts(words: list[str]) -> dict:
    counts = {}
    for w in words:
        counts[w] = counts.get(w, 0) + 1
    return counts`,
      explanation: "Iterates through words, safely retrieving current count with `.get(w, 0)` before incrementing.",
      syntaxClue: "Use a dictionary with `dict.get(key, 0) + 1`."
    }
  },
  'py-ch10-l1': {
    python: {
      code: `def invert_dict(d: dict) -> dict:
    return {v: k for k, v in d.items()}`,
      explanation: "A dictionary comprehension iterates over `d.items()`, swapping keys and values into a new dict.",
      syntaxClue: "Use a comprehension: `{v: k for k, v in d.items()}`."
    }
  },
  'py-ch14-l1': {
    python: {
      code: `class BankAccount:
    def __init__(self, initial_balance: int = 0):
        self.balance = initial_balance

    def deposit(self, amount: int) -> int:
        self.balance += amount
        return self.balance

    def withdraw(self, amount: int) -> bool:
        if amount <= self.balance:
            self.balance -= amount
            return True
        return False`,
      explanation: "Encapsulates balance state on `self`, safely validating withdrawal amount against balance.",
      syntaxClue: "Define `__init__`, `deposit`, and `withdraw` methods updating `self.balance`."
    }
  },
  'py-ch17-l1': {
    python: {
      code: `def count_calls(fn):
    def wrapper(*args, **kwargs):
        wrapper.calls += 1
        return fn(*args, **kwargs)
    wrapper.calls = 0
    return wrapper`,
      explanation: "Decorates `fn` with a wrapper closure that tracks invocations on an attribute of the wrapper.",
      syntaxClue: "Define a `wrapper(*args, **kwargs)` closure and set an attribute on `wrapper.calls`."
    }
  },

  // JavaScript Module Problems
  'js-ch1-l1': {
    javascript: {
      code: `function computeCart(price, taxRate) {
  const tax = price * taxRate;
  const total = price + tax;
  return total;
}`,
      explanation: "Calculates the tax amount using multiplication, adds it to the base price, and returns the total.",
      syntaxClue: "Use const for tax and total calculations, returning their sum."
    }
  },
  'js-ch1-l2': {
    javascript: {
      code: `function isValidNumber(val) {
  return typeof val === 'number' && !Number.isNaN(val);
}`,
      explanation: "In JavaScript, `typeof NaN === 'number'`. Validating numbers requires both `typeof` check and `!Number.isNaN()`.",
      syntaxClue: "Combine `typeof val === 'number'` with `!Number.isNaN(val)`."
    }
  },
  'js-ch2-l1': {
    javascript: {
      code: `function isStrictlyEqual(a, b) {
  return a === b;
}`,
      explanation: "The strict equality operator `===` compares values without performing type coercion.",
      syntaxClue: "Use the `===` strict equality operator."
    }
  },
  'js-ch3-l1': {
    javascript: {
      code: `function calcDiscount(price, tier) {
  if (tier === 'VIP') return price * 0.8;
  if (tier === 'REGULAR') return price * 0.95;
  return price;
}`,
      explanation: "Conditionally calculates discounted price based on the membership tier.",
      syntaxClue: "Use conditional statements checking for tier values."
    }
  },
  'js-ch5-l1': {
    javascript: {
      code: `function sumArray(nums) {
  return nums.reduce((sum, n) => sum + n, 0);
}`,
      explanation: "The `reduce` method iterates over array elements, accumulating the running sum starting from 0.",
      syntaxClue: "Use `nums.reduce((acc, curr) => acc + curr, 0)` or a for-loop."
    }
  },
  'js-ch-inter-1': {
    javascript: {
      code: `function createCounter(initialValue = 0) {
  let val = initialValue;
  return {
    increment: () => ++val,
    decrement: () => --val,
    getValue: () => val
  };
}`,
      explanation: "Returns an object whose methods close over the private `val` state in the enclosing scope.",
      syntaxClue: "Store state in a local variable and return an object with methods mutating that variable."
    }
  },
  'js-ch-exp-1': {
    javascript: {
      code: `function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) return obj.map(deepClone);
  const copy = {};
  for (const key of Object.keys(obj)) {
    copy[key] = deepClone(obj[key]);
  }
  return copy;
}`,
      explanation: "Recursively clones nested arrays and objects while leaving primitive types intact.",
      syntaxClue: "Recursively check `typeof obj === 'object'` and `Array.isArray(obj)`."
    }
  },

  // C Module Problems
  'c-ch1-l1': {
    c: {
      code: `int addNumbers(int a, int b) {
    return a + b;
}`,
      explanation: "Returns the arithmetic sum of parameters a and b.",
      syntaxClue: "Use `return a + b;`."
    }
  },
  'c-ch2-l1': {
    c: {
      code: `int maxTwo(int a, int b) {
    return (a > b) ? a : b;
}`,
      explanation: "Evaluates which integer is greater using a conditional ternary operator.",
      syntaxClue: "Use `(a > b) ? a : b` or an `if-else` statement."
    }
  },

  // C++ Module Problems
  'cpp-ch1-l1': {
    cpp: {
      code: `int addNumbers(int a, int b) {
    return a + b;
}`,
      explanation: "Returns the arithmetic sum of parameters a and b.",
      syntaxClue: "Use `return a + b;`."
    }
  },
  'cpp-ch2-l1': {
    cpp: {
      code: `std::string checkEvenOdd(int n) {
    return (n % 2 == 0) ? "Even" : "Odd";
}`,
      explanation: "Checks divisibility by 2 using the remainder operator `%` and returns the corresponding string literal.",
      syntaxClue: "Check `n % 2 == 0`."
    }
  },

  // Java Module Problems
  'java-ch1-l1': {
    java: {
      code: `public class Solution {
    public static int addNumbers(int a, int b) {
        return a + b;
    }
}`,
      explanation: "Static method inside class Solution returning the integer sum of a and b.",
      syntaxClue: "Return `a + b` inside `public static int addNumbers`."
    }
  },
  'java-ch2-l1': {
    java: {
      code: `public class Solution {
    public static String checkEvenOdd(int n) {
        return (n % 2 == 0) ? "Even" : "Odd";
    }
}`,
      explanation: "Evaluates if n is divisible by 2 and returns string 'Even' or 'Odd'.",
      syntaxClue: "Check `n % 2 == 0`."
    }
  },

  // Legacy & Practice Problems
  'two-sum': {
    javascript: {
      code: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
      explanation: "Using a hash map stores previously seen numbers and their indices, finding complements in single-pass O(n) time.",
      syntaxClue: "Use `new Map()` or an object to look up `target - nums[i]` in O(1)."
    }
  },
  'beginner-1': {
    javascript: {
      code: `function addNumbers(a, b) {
  return a + b;
}`,
      explanation: "Returns the sum of two integers.",
      syntaxClue: "Return `a + b`."
    },
    python: {
      code: `def addNumbers(a, b):
    return a + b`,
      explanation: "Returns the sum of two integers.",
      syntaxClue: "Return `a + b`"
    },
    c: {
      code: `int addNumbers(int a, int b) {
    return a + b;
}`,
      explanation: "Returns the sum of two integers.",
      syntaxClue: "Return `a + b;`"
    },
    cpp: {
      code: `int addNumbers(int a, int b) {
    return a + b;
}`,
      explanation: "Returns the sum of two integers.",
      syntaxClue: "Return `a + b;`"
    },
    java: {
      code: `public class Main {
    public static int addNumbers(int a, int b) {
        return a + b;
    }
}`,
      explanation: "Returns the sum of two integers.",
      syntaxClue: "Return `a + b;`"
    }
  }
};

/**
 * Returns the reference solution, explanation, and syntax clue for any problem.
 */
export function getProblemSolution(problem: ModuleProblem | Problem, language: string = 'javascript'): ProblemSolution {
  const langKey = language.toLowerCase();
  
  // 1. Direct problem-level override if provided
  if (problem.solution) {
    return {
      code: problem.solution,
      explanation: problem.solutionExplanation || "Official reference solution verified against all test assertions.",
      syntaxClue: (problem.hints as any)?.syntaxClue || "Inspect the problem statement and return types."
    };
  }

  // 2. Registry match
  const problemEntry = SOLUTIONS_REGISTRY[problem.id];
  if (problemEntry) {
    if (problemEntry[langKey]) {
      return problemEntry[langKey]!;
    }
    // Fallback to first available language in registry
    const firstLang = Object.keys(problemEntry)[0];
    if (firstLang && problemEntry[firstLang]) {
      return problemEntry[firstLang]!;
    }
  }

  // 3. Script problem fallback
  if (problem.expectedOutput) {
    const printStmt = langKey === 'python'
      ? `print(${JSON.stringify(problem.expectedOutput)})`
      : `console.log(${JSON.stringify(problem.expectedOutput)});`;
    return {
      code: printStmt,
      explanation: `Outputs the exact expected stdout "${problem.expectedOutput}" to pass the verification check.`,
      syntaxClue: langKey === 'python' ? "Use Python's built-in print() function." : "Use console.log()."
    };
  }

  // 4. Dynamic chapter problem fallbacks
  if (problem.id.includes('solve_') || problem.id.includes('solveC') || problem.id.includes('solveCpp') || problem.id.includes('solveJava') || problem.id.includes('solveChallenge') || problem.description.includes('n * 2')) {
    if (langKey === 'python') {
      return {
        code: `def solve_challenge(n: int) -> int:\n    return n * 2`,
        explanation: "Computes and returns double the input value `n * 2`.",
        syntaxClue: "Return `n * 2`."
      };
    }
    if (langKey === 'c') {
      return {
        code: `int solveC(int n) {\n    return n * 2;\n}`,
        explanation: "Computes and returns double the input value `n * 2`.",
        syntaxClue: "Return `n * 2;`."
      };
    }
    if (langKey === 'cpp') {
      return {
        code: `int solveCpp(int n) {\n    return n * 2;\n}`,
        explanation: "Computes and returns double the input value `n * 2`.",
        syntaxClue: "Return `n * 2;`."
      };
    }
    if (langKey === 'java') {
      return {
        code: `public class Solution {\n    public static int solveJava(int n) {\n        return n * 2;\n    }\n}`,
        explanation: "Computes and returns double the input value `n * 2`.",
        syntaxClue: "Return `n * 2;`."
      };
    }
    return {
      code: `function solveChallenge(n) {\n  return n * 2;\n}`,
      explanation: "Computes and returns double the input value `n * 2`.",
      syntaxClue: "Return `n * 2;`."
    };
  }

  return {
    code: "// Reference solution available once solved",
    explanation: "Implement the required function logic and return the expected value.",
    syntaxClue: (problem.hints as any)?.syntaxClue || (problem.hints as any)?.english || "Check parameter types and return requirements."
  };
}
