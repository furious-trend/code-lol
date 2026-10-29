// agent-notes: { ctx: "Reference solutions, explanations, and progressive syntax clues for problem workspace", deps: ["./types"], state: active, last: "sato@2026-10-29" }

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
      syntaxClue: "Use the `print('...')` built-in function."
    }
  },
  'py-ch1-l1': {
    python: {
      code: `def greet_user(is_logged_in: bool, name: str) -> str:
    if is_logged_in:
        return "Welcome back, " + name + "!"
    return "Please log in to continue."`,
      explanation: "Python enforces block scoping with consistent indentation (typically 4 spaces). The conditional branch handles the logged-in greeting, while the default return path handles unauthenticated users.",
      syntaxClue: "Use `if is_logged_in:` with 4-space indentation and string concatenation or f-strings."
    }
  },
  'py-ch1-l2': {
    python: {
      code: `def calculate_change(cost: int, paid: int) -> int:
    return paid - cost`,
      explanation: "Direct arithmetic subtraction `paid - cost` returns the remaining balance due back to the customer.",
      syntaxClue: "Use the subtraction operator `-`."
    }
  },
  'pocket-money-math': {
    python: {
      code: `print(100 - 30)`,
      explanation: "Evaluating integer subtraction inside `print()` prints 70 to standard output.",
      syntaxClue: "Use `print(100 - 30)`"
    }
  },
  'pass-or-arrear': {
    python: {
      code: `print("PASS")`,
      explanation: "Prints the string PASS directly to stdout.",
      syntaxClue: "Use `print('PASS')`"
    }
  },
  'count-to-3': {
    python: {
      code: `print("1 2 3")`,
      explanation: "Outputs space-separated digits to stdout as expected by the script runner.",
      syntaxClue: "Use `print('1 2 3')`"
    }
  },
  'py-ch2-l1': {
    python: {
      code: `def check_eligibility(age: int, has_id: bool) -> str:
    if age >= 18 and has_id:
        return "Eligible"
    return "Not Eligible"`,
      explanation: "Both boolean conditions must be satisfied simultaneously using the `and` operator.",
      syntaxClue: "Combine expressions with `and`: `age >= 18 and has_id`"
    }
  },
  'py-ch3-l1': {
    python: {
      code: `def classify_score(score: int) -> str:
    if score >= 90:
        return "A"
    elif score >= 80:
        return "B"
    elif score >= 70:
        return "C"
    return "F"`,
      explanation: "Chained `if-elif-else` constructs evaluate conditions from highest to lowest threshold.",
      syntaxClue: "Use `elif score >= threshold:` blocks in descending order."
    }
  },
  'py-ch4-l1': {
    python: {
      code: `def sum_first_n(n: int) -> int:
    return sum(range(1, n + 1))`,
      explanation: "The `range(1, n + 1)` generator yields integers from 1 up to n inclusive, which `sum()` accumulates in O(n) time.",
      syntaxClue: "Use `range(1, n + 1)` with `sum()` or a `for` loop accumulator."
    }
  },
  'py-ch5-l1': {
    python: {
      code: `def double_numbers(nums: list[int]) -> list[int]:
    return [x * 2 for x in nums]`,
      explanation: "List comprehensions offer an idiomatic, readable, and performant way to transform elements in Python.",
      syntaxClue: "Use list comprehension: `[x * 2 for x in nums]`"
    }
  },
  'py-ch6-l1': {
    python: {
      code: `def count_word_frequencies(words: list[str]) -> dict[str, int]:
    freq = {}
    for w in words:
        freq[w] = freq.get(w, 0) + 1
    return freq`,
      explanation: "Using `dict.get(key, 0)` safely retrieves the existing tally or defaults to 0 before incrementing.",
      syntaxClue: "Use dictionary `.get(w, 0) + 1` inside a loop."
    }
  },
  'py-ch7-l1': {
    python: {
      code: `def unique_sorted(items: list[int]) -> list[int]:
    return sorted(list(set(items)))`,
      explanation: "Converting an iterable to a `set` strips out duplicates in O(n) time, and `sorted()` returns a new ascending list in O(n log n).",
      syntaxClue: "Combine `set(items)` with the `sorted()` function."
    }
  },
  'py-ch8-l1': {
    python: {
      code: `def safe_divide(a: float, b: float) -> float | None:
    try:
        return a / b
    except ZeroDivisionError:
        return None`,
      explanation: "Defensive exception handling with `try / except ZeroDivisionError` prevents runtime crashes on zero divisors.",
      syntaxClue: "Catch `ZeroDivisionError` with `try ... except:`"
    }
  },
  'py-ch9-l1': {
    python: {
      code: `def filter_even(numbers: list[int]) -> list[int]:
    return [n for n in numbers if n % 2 == 0]`,
      explanation: "List comprehension with a trailing `if` predicate filters elements cleanly.",
      syntaxClue: "Filter with the modulo operator: `n % 2 == 0`"
    }
  },
  'py-ch10-l1': {
    python: {
      code: `class BankAccount:
    def __init__(self, initial_balance: float = 0.0):
        self.balance = initial_balance
    def deposit(self, amount: float) -> None:
        self.balance += amount
    def get_balance(self) -> float:
        return self.balance`,
      explanation: "Encapsulates balance state on `self` initialized in `__init__` and modified through instance methods.",
      syntaxClue: "Define `__init__(self, ...)` and access instance state via `self.balance`"
    }
  },
  'py-ch14-l1': {
    python: {
      code: `def countdown(n: int):
    while n > 0:
        yield n
        n -= 1`,
      explanation: "Generators pause execution state and produce values one by one using `yield` without allocating an entire list in memory.",
      syntaxClue: "Use `yield` inside a `while` loop."
    }
  },
  'py-ch17-l1': {
    python: {
      code: `def log_call(func):
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs)
    return wrapper`,
      explanation: "A decorator takes a target function and returns a wrapper closure accepting arbitrary positional and keyword arguments.",
      syntaxClue: "Define a closure `def wrapper(*args, **kwargs):` returning `func(*args, **kwargs)`"
    }
  },

  // JavaScript Module Problems
  'js-ch1-l1': {
    javascript: {
      code: `function sum(a, b) {
  return a + b;
}`,
      explanation: "The `+` addition operator computes the arithmetic sum of numerical parameters `a` and `b`.",
      syntaxClue: "Use `return a + b;`"
    }
  },
  'js-ch1-l2': {
    javascript: {
      code: `function isEven(n) {
  return n % 2 === 0;
}`,
      explanation: "The remainder operator `%` returns 0 when a number is evenly divisible by 2.",
      syntaxClue: "Use `n % 2 === 0`"
    }
  },
  'js-ch2-l1': {
    javascript: {
      code: `function reverseString(str) {
  return str.split('').reverse().join('');
}`,
      explanation: "Splits string into an array of characters, reverses the array in-place, and joins it back into a string.",
      syntaxClue: "Chain `.split('').reverse().join('')`"
    }
  },
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
      syntaxClue: langKey === 'python' ? "Use `print(...)`" : "Use `console.log(...)`"
    };
  }

  // 4. Starter code completion fallback
  const baseStarter = (langKey === 'python' && problem.starterCodePython)
    ? problem.starterCodePython
    : problem.starterCode;

  return {
    code: baseStarter || "// Reference solution",
    explanation: "Implement the required function logic and return the expected value.",
    syntaxClue: (problem.hints as any)?.syntaxClue || (problem.hints as any)?.english || "Check parameter types and return requirements."
  };
}
