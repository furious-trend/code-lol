// agent-notes: { ctx: "Python module coding problems aligned with pythonCurriculum chapters with beginner script problems", deps: ["./types", "../python/curriculum"], state: active, last: "sato@2026-10-30" }

import { ModuleProblem } from './types';
import { pythonCurriculum } from '../python/curriculum';

export const pythonModuleProblems: ModuleProblem[] = [
  // Chapter 1: Lexical Structure & Syntax Basics
  {
    id: 'say-hello-to-codelol',
    moduleId: 'ch1-hello',
    chapterId: 'ch1',
    language: 'python',
    tier: 'beginner',
    title: 'Say Hello to CodeLOL',
    description: `Welcome to Python on CodeLOL!\n\nIn Python, you can output text directly to the screen using the \`print()\` function.\n\n### Task:\nWrite a print statement that outputs \`Hello CodeLOL\`.\n\nNo functions or wrappers needed—just a clean Python script!`,
    starterCode: `# Write your print statement below\n`,
    expectedOutput: 'Hello CodeLOL',
    hints: {
      english: "Use Python's built-in print() function to output the required greeting string.",
      tamilRoast: "Quotes podama string ezhudhura? Tea kadaila poi 'tea' nu kekkama mookala sound vitta master enna pannuvaaro, compiler adhe thaan pannudhu!"
    }
  },
  {
    id: 'py-ch1-l1',
    moduleId: 'ch1-l1',
    chapterId: 'ch1',
    language: 'python',
    tier: 'beginner',
    title: 'Indentation & Clean Returns',
    description: `In Python, blocks are defined purely by indentation.

Write a function \`greet_user(is_logged_in: bool, name: str) -> str\`:
- If \`is_logged_in\` is True, return \`"Welcome back, " + name + "!"\`
- If False, return \`"Please log in to continue."\`

Ensure your code is properly indented!`,
    starterCode: `def greet_user(is_logged_in: bool, name: str) -> str:
    # Write your logic here
    pass
`,
    testHarness: `{{USER_CODE}}

import json

_passed = 0
_log = []
_tests = [
    (greet_user(True, "Alice"), "Welcome back, Alice!", "greet_user(True, 'Alice')"),
    (greet_user(False, "Bob"), "Please log in to continue.", "greet_user(False, 'Bob')"),
    (greet_user(True, "Kaipulla"), "Welcome back, Kaipulla!", "greet_user(True, 'Kaipulla')")
]

for idx, (res, exp, desc) in enumerate(_tests):
    if res == exp:
        _passed += 1
        _log.append(f"Test {idx+1}: PASS ({desc})")
    else:
        _log.append(f"Test {idx+1}: FAIL ({desc} -> Expected {exp!r}, got {res!r})")

print("===TEST_RESULTS===")
print(json.dumps({"passed": _passed, "total": len(_tests), "log": _log}))
`,
    hints: {
      english: "Remember that Python indentation requires consistent 4 spaces. Double check your string concatenation.",
      tamilRoast: "Indentation olunga vaikala-na interpreter unna block panrum da! 4 spaces thaanga mutiyala?"
    }
  },
  {
    id: 'py-ch1-l2',
    moduleId: 'ch1-l2',
    chapterId: 'ch1',
    language: 'python',
    tier: 'beginner',
    title: 'Comments & String Extraction',
    description: `Extract the non-comment content from user input.

Write a function \`strip_comment(line: str) -> str\` that removes any trailing Python single-line comment (marked with \`#\`) and trims trailing whitespace.
If no \`#\` exists, return the stripped line.`,
    starterCode: `def strip_comment(line: str) -> str:
    # Write your logic here
    pass
`,
    testHarness: `{{USER_CODE}}

import json

_passed = 0
_log = []
_tests = [
    (strip_comment("x = 10  # assign ten"), "x = 10", "strip comment"),
    (strip_comment("print('Hello')"), "print('Hello')", "no comment"),
    (strip_comment("# all comment"), "", "whole line comment")
]

for idx, (res, exp, desc) in enumerate(_tests):
    if res == exp:
        _passed += 1
        _log.append(f"Test {idx+1}: PASS ({desc})")
    else:
        _log.append(f"Test {idx+1}: FAIL ({desc} -> Expected {exp!r}, got {res!r})")

print("===TEST_RESULTS===")
print(json.dumps({"passed": _passed, "total": len(_tests), "log": _log}))
`,
    hints: {
      english: "Split the string on the comment delimiter and trim trailing whitespace from the first part.",
      tamilRoast: "Comment-ah thooki eriya kooda logic theriyaadha? Enna koduma Saravanan idhu!"
    }
  },

  // Chapter 2: Variables, Types & Memory
  {
    id: 'pocket-money-math',
    moduleId: 'ch2-money',
    chapterId: 'ch2',
    language: 'python',
    tier: 'beginner',
    title: 'Pocket Money Math',
    description: `Variables hold data that you can change and calculate with.\n\n### Task:\n1. Set \`money = 50\`\n2. Add \`25\` to it\n3. Print the total (\`75\`)`,
    starterCode: `# Write your calculation below\n`,
    expectedOutput: '75',
    hints: {
      english: "Assign 50 to a variable, update it by adding 25, and print the resulting total.",
      tamilRoast: "Ration shop-la kerosene-um sarkarai-yum orey dabba-la potta enna aagum? Adhaan un data type mismatch! Dabba-va olunga choose pannu da."
    }
  },
  {
    id: 'py-ch2-l1',
    moduleId: 'ch2-l1',
    chapterId: 'ch2',
    language: 'python',
    tier: 'beginner',
    title: 'Type Classification',
    description: `Identify the dynamic types of variables.

Write a function \`classify_type(val) -> str\` returning:
- \`"integer"\` for ints (excluding booleans)
- \`"boolean"\` for bools
- \`"float"\` for floats
- \`"string"\` for strings
- \`"other"\` for anything else.`,
    starterCode: `def classify_type(val) -> str:
    # In Python, bool is a subclass of int, so check bool first!
    pass
`,
    testHarness: `{{USER_CODE}}

import json

_passed = 0
_log = []
_tests = [
    (classify_type(42), "integer", "classify_type(42)"),
    (classify_type(True), "boolean", "classify_type(True)"),
    (classify_type(3.14), "float", "classify_type(3.14)"),
    (classify_type("codelol"), "string", "classify_type('codelol')"),
    (classify_type([1, 2]), "other", "classify_type([1, 2])")
]

for idx, (res, exp, desc) in enumerate(_tests):
    if res == exp:
        _passed += 1
        _log.append(f"Test {idx+1}: PASS ({desc})")
    else:
        _log.append(f"Test {idx+1}: FAIL ({desc} -> Expected {exp!r}, got {res!r})")

print("===TEST_RESULTS===")
print(json.dumps({"passed": _passed, "total": len(_tests), "log": _log}))
`,
    hints: {
      english: "Remember that isinstance(True, int) is True in Python! Check isinstance(val, bool) first before int.",
      tamilRoast: "True-ku integer nu sonna Python sirikum da! Bool dhaan first check pannanum!"
    }
  },

  // Chapter 3: Numbers & Arithmetic
  {
    id: 'pass-or-arrear',
    moduleId: 'ch3-pass',
    chapterId: 'ch3',
    language: 'python',
    tier: 'beginner',
    title: 'Pass or Arrear',
    description: `Control flow lets your program make decisions using \`if\` conditions.\n\n### Task:\nGiven \`marks = 40\`, check if \`marks >= 35\`.\nIf the condition is met, print \`PASS\`.`,
    starterCode: `marks = 40\n# Write an if statement to print PASS if marks >= 35\n`,
    expectedOutput: 'PASS',
    hints: {
      english: "Use an if condition to check if marks is greater than or equal to 35, and print PASS inside the block.",
      tamilRoast: "Condition illadha if statement... Vadivelu 'Keezha vizhundhalum meesaila man ottala' nu solra maari, logic enga da?!"
    }
  },
  {
    id: 'py-ch3-l1',
    moduleId: 'ch3-l1',
    chapterId: 'ch3',
    language: 'python',
    tier: 'beginner',
    title: 'Floor Division & Modulo Pairing',
    description: `Given a total number of items and batch size, return a tuple \`(full_batches, remaining_items)\`.

Write a function \`batch_stats(items: int, batch_size: int) -> tuple[int, int]\`.`,
    starterCode: `def batch_stats(items: int, batch_size: int) -> tuple[int, int]:
    # Write your logic here
    pass
`,
    testHarness: `{{USER_CODE}}

import json

_passed = 0
_log = []
_tests = [
    (batch_stats(25, 4), (6, 1), "batch_stats(25, 4)"),
    (batch_stats(10, 5), (2, 0), "batch_stats(10, 5)"),
    (batch_stats(7, 10), (0, 7), "batch_stats(7, 10)")
]

for idx, (res, exp, desc) in enumerate(_tests):
    if tuple(res) == exp:
        _passed += 1
        _log.append(f"Test {idx+1}: PASS ({desc})")
    else:
        _log.append(f"Test {idx+1}: FAIL ({desc} -> Expected {exp!r}, got {res!r})")

print("===TEST_RESULTS===")
print(json.dumps({"passed": _passed, "total": len(_tests), "log": _log}))
`,
    hints: {
      english: "You can use divmod(items, batch_size) or the // and % operators directly.",
      tamilRoast: "Modulo operation kooda maranthutiya? Divmod nu oru function iruku nu theriyuma unakku?"
    }
  },

  // Chapter 4: Strings & Text Processing
  {
    id: 'count-to-3',
    moduleId: 'ch4-count',
    chapterId: 'ch4',
    language: 'python',
    tier: 'beginner',
    title: 'Count to 3',
    description: `Loops allow you to repeat actions. \`range(1, 4)\` generates the numbers 1, 2, and 3.\n\n### Task:\nUse \`for i in range(1, 4):\` to print the numbers 1, 2, 3 on separate lines.`,
    starterCode: `# Write a for loop to print 1, 2, 3\n`,
    expectedOutput: '1\n2\n3',
    hints: {
      english: "Use a for loop with range(start, stop) where stop is 1 greater than your end number.",
      tamilRoast: "Infinite loop pottu terminal-ah moochu mutta vikkatha da!"
    }
  },
  {
    id: 'py-ch4-l1',
    moduleId: 'ch4-l1',
    chapterId: 'ch4',
    language: 'python',
    tier: 'beginner',
    title: 'Meme Slug Generator',
    description: `Convert any arbitrary string into a URL-friendly meme slug:
1. Convert to lowercase.
2. Replace all whitespace with single hyphens (\`-\`).
3. Strip any leading or trailing hyphens.

Write a function \`make_slug(text: str) -> str\`.`,
    starterCode: `def make_slug(text: str) -> str:
    # Write your logic here
    pass
`,
    testHarness: `{{USER_CODE}}

import json

_passed = 0
_log = []
_tests = [
    (make_slug("Hello World"), "hello-world", "make_slug('Hello World')"),
    (make_slug("   Code   LOL   Rocks   "), "code-lol-rocks", "extra spaces"),
    (make_slug("Python"), "python", "single word")
]

for idx, (res, exp, desc) in enumerate(_tests):
    if res == exp:
        _passed += 1
        _log.append(f"Test {idx+1}: PASS ({desc})")
    else:
        _log.append(f"Test {idx+1}: FAIL ({desc} -> Expected {exp!r}, got {res!r})")

print("===TEST_RESULTS===")
print(json.dumps({"passed": _passed, "total": len(_tests), "log": _log}))
`,
    hints: {
      english: "Consider splitting by whitespace with text.split() and then joining with '-'.join(...).",
      tamilRoast: "Text.split() potu join('-') panna mudiyatha? Ivlo chinna vishayathukku Google search ah?"
    }
  },

  // Chapter 5: Control Flow: Conditionals
  {
    id: 'py-ch5-l1',
    moduleId: 'ch5-l1',
    chapterId: 'ch5',
    language: 'python',
    tier: 'beginner',
    title: 'Fizz Buzz Roaster',
    description: `Classic FizzBuzz with a twist.
Write a function \`fizz_buzz(n: int) -> str\`:
- If \`n\` is divisible by 3 and 5, return \`"FizzBuzz"\`
- If \`n\` is divisible by 3, return \`"Fizz"\`
- If \`n\` is divisible by 5, return \`"Buzz"\`
- Otherwise, return \`str(n)\`.`,
    starterCode: `def fizz_buzz(n: int) -> str:
    # Write your logic here
    pass
`,
    testHarness: `{{USER_CODE}}

import json

_passed = 0
_log = []
_tests = [
    (fizz_buzz(15), "FizzBuzz", "15 -> FizzBuzz"),
    (fizz_buzz(9), "Fizz", "9 -> Fizz"),
    (fizz_buzz(10), "Buzz", "10 -> Buzz"),
    (fizz_buzz(7), "7", "7 -> 7")
]

for idx, (res, exp, desc) in enumerate(_tests):
    if str(res) == exp:
        _passed += 1
        _log.append(f"Test {idx+1}: PASS ({desc})")
    else:
        _log.append(f"Test {idx+1}: FAIL ({desc} -> Expected {exp!r}, got {res!r})")

print("===TEST_RESULTS===")
print(json.dumps({"passed": _passed, "total": len(_tests), "log": _log}))
`,
    hints: {
      english: "Check divisibility by 15 (both 3 and 5) first!",
      tamilRoast: "FizzBuzz fail pannina interview room kulla kooda vida maataanga bro!"
    }
  },

  // Chapter 6: Loops & Iteration
  {
    id: 'py-ch6-l1',
    moduleId: 'ch6-l1',
    chapterId: 'ch6',
    language: 'python',
    tier: 'beginner',
    title: 'Sum of Evens in Range',
    description: `Given \`start\` and \`end\` (inclusive), compute the sum of all even numbers in that range.

Write a function \`sum_evens(start: int, end: int) -> int\`.`,
    starterCode: `def sum_evens(start: int, end: int) -> int:
    # Write your loop or comprehension
    pass
`,
    testHarness: `{{USER_CODE}}

import json

_passed = 0
_log = []
_tests = [
    (sum_evens(1, 10), 30, "sum_evens(1, 10) -> 2+4+6+8+10 = 30"),
    (sum_evens(4, 4), 4, "sum_evens(4, 4) -> 4"),
    (sum_evens(1, 1), 0, "sum_evens(1, 1) -> 0")
]

for idx, (res, exp, desc) in enumerate(_tests):
    if res == exp:
        _passed += 1
        _log.append(f"Test {idx+1}: PASS ({desc})")
    else:
        _log.append(f"Test {idx+1}: FAIL ({desc} -> Expected {exp!r}, got {res!r})")

print("===TEST_RESULTS===")
print(json.dumps({"passed": _passed, "total": len(_tests), "log": _log}))
`,
    hints: {
      english: "Iterate across the range and accumulate only values where the number is divisible by 2.",
      tamilRoast: "Loop poda kooda range start, end use panna theriyadha? Enna padichiyo!"
    }
  },

  // Chapter 7: Functions & Scope
  {
    id: 'py-ch7-l1',
    moduleId: 'ch7-l1',
    chapterId: 'ch7',
    language: 'python',
    tier: 'intermediate',
    title: 'Multiplier Closure',
    description: `Create a higher-order function that generates multiplier functions.

Write a function \`make_multiplier(factor: int)\` that returns a function taking \`x: int\` and returning \`x * factor\`.`,
    starterCode: `def make_multiplier(factor: int):
    # Return an inner closure
    pass
`,
    testHarness: `{{USER_CODE}}

import json

_passed = 0
_log = []

double = make_multiplier(2)
triple = make_multiplier(3)

_tests = [
    (double(5), 10, "double(5) == 10"),
    (triple(4), 12, "triple(4) == 12"),
    (make_multiplier(10)(7), 70, "make_multiplier(10)(7) == 70")
]

for idx, (res, exp, desc) in enumerate(_tests):
    if res == exp:
        _passed += 1
        _log.append(f"Test {idx+1}: PASS ({desc})")
    else:
        _log.append(f"Test {idx+1}: FAIL ({desc} -> Expected {exp!r}, got {res!r})")

print("===TEST_RESULTS===")
print(json.dumps({"passed": _passed, "total": len(_tests), "log": _log}))
`,
    hints: {
      english: "Define an inner function that uses factor from the outer scope, and return that function.",
      tamilRoast: "Closure puriyalana functional programming lam kanavula dhaan nadakum!"
    }
  },

  // Chapter 8: Lists & Tuples
  {
    id: 'py-ch8-l1',
    moduleId: 'ch8-l1',
    chapterId: 'ch8',
    language: 'python',
    tier: 'intermediate',
    title: 'Chunk Array',
    description: `Split a list into chunks of length \`size\`. The last chunk may contain fewer elements.

Write a function \`chunk_list(lst: list, size: int) -> list[list]\`.`,
    starterCode: `def chunk_list(lst: list, size: int) -> list:
    # Slicing is your best friend
    pass
`,
    testHarness: `{{USER_CODE}}

import json

_passed = 0
_log = []
_tests = [
    (chunk_list([1, 2, 3, 4, 5], 2), [[1, 2], [3, 4], [5]], "chunk by 2"),
    (chunk_list([1, 2, 3], 3), [[1, 2, 3]], "chunk by 3"),
    (chunk_list([], 2), [], "empty list")
]

for idx, (res, exp, desc) in enumerate(_tests):
    if res == exp:
        _passed += 1
        _log.append(f"Test {idx+1}: PASS ({desc})")
    else:
        _log.append(f"Test {idx+1}: FAIL ({desc} -> Expected {exp!r}, got {res!r})")

print("===TEST_RESULTS===")
print(json.dumps({"passed": _passed, "total": len(_tests), "log": _log}))
`,
    hints: {
      english: "Step through indices with a step equal to size, taking slice windows of that length.",
      tamilRoast: "List slice panna range step value kudutha podhum. Idhukku 50 line code ezhuthatha!"
    }
  },

  // Chapter 9: Dictionaries & Sets
  {
    id: 'py-ch9-l1',
    moduleId: 'ch9-l1',
    chapterId: 'ch9',
    language: 'python',
    tier: 'intermediate',
    title: 'Word Frequency Counter',
    description: `Given a list of words, return a dictionary containing the frequency count of each word.

Write a function \`word_counts(words: list[str]) -> dict[str, int]\`.`,
    starterCode: `def word_counts(words: list[str]) -> dict:
    # Write your logic here
    pass
`,
    testHarness: `{{USER_CODE}}

import json

_passed = 0
_log = []
_tests = [
    (word_counts(["apple", "banana", "apple"]), {"apple": 2, "banana": 1}, "simple counts"),
    (word_counts([]), {}, "empty list"),
    (word_counts(["lol", "lol", "lol"]), {"lol": 3}, "all same")
]

for idx, (res, exp, desc) in enumerate(_tests):
    if res == exp:
        _passed += 1
        _log.append(f"Test {idx+1}: PASS ({desc})")
    else:
        _log.append(f"Test {idx+1}: FAIL ({desc} -> Expected {exp!r}, got {res!r})")

print("===TEST_RESULTS===")
print(json.dumps({"passed": _passed, "total": len(_tests), "log": _log}))
`,
    hints: {
      english: "You can use a dict get() with a default of 0, or import Counter from collections.",
      tamilRoast: "Dictionary get(word, 0) + 1 use panna theriyadha? Basic da ithu!"
    }
  },

  // Chapter 10: Comprehensions
  {
    id: 'py-ch10-l1',
    moduleId: 'ch10-l1',
    chapterId: 'ch10',
    language: 'python',
    tier: 'intermediate',
    title: 'Inverted Dictionary Comprehension',
    description: `Given a dictionary with unique values, invert it so that keys become values and values become keys.

Write a function \`invert_dict(d: dict) -> dict\`.`,
    starterCode: `def invert_dict(d: dict) -> dict:
    # Use a dictionary comprehension
    pass
`,
    testHarness: `{{USER_CODE}}

import json

_passed = 0
_log = []
_tests = [
    (invert_dict({"a": 1, "b": 2}), {1: "a", 2: "b"}, "invert {'a': 1, 'b': 2}"),
    (invert_dict({}), {}, "empty dict")
]

for idx, (res, exp, desc) in enumerate(_tests):
    if res == exp:
        _passed += 1
        _log.append(f"Test {idx+1}: PASS ({desc})")
    else:
        _log.append(f"Test {idx+1}: FAIL ({desc} -> Expected {exp!r}, got {res!r})")

print("===TEST_RESULTS===")
print(json.dumps({"passed": _passed, "total": len(_tests), "log": _log}))
`,
    hints: {
      english: "Iterate over dictionary key-value items and construct a new mapping with positions swapped.",
      tamilRoast: "Dict comprehension oru single line! Key-um value-um swap panna theriyadha?"
    }
  },

  // Chapter 14: OOP
  {
    id: 'py-ch14-l1',
    moduleId: 'ch14-l1',
    chapterId: 'ch14',
    language: 'python',
    tier: 'advanced',
    title: 'Bank Account Class',
    description: `Create a \`BankAccount\` class with:
- \`__init__(self, initial_balance: int = 0)\`
- \`deposit(self, amount: int) -> int\` (adds to balance and returns new balance)
- \`withdraw(self, amount: int) -> bool\` (returns True if balance was sufficient and deducts amount, else False without deducting)
- \`balance\` property or attribute.`,
    starterCode: `class BankAccount:
    def __init__(self, initial_balance: int = 0):
        self.balance = initial_balance

    def deposit(self, amount: int) -> int:
        pass

    def withdraw(self, amount: int) -> bool:
        pass
`,
    testHarness: `{{USER_CODE}}

import json

_passed = 0
_log = []

acc = BankAccount(100)
dep_res = acc.deposit(50)
w1 = acc.withdraw(70)
w2 = acc.withdraw(200)

_tests = [
    (dep_res, 150, "deposit 50 to 100 -> 150"),
    (w1, True, "withdraw 70 -> True"),
    (acc.balance, 80, "balance after withdraw -> 80"),
    (w2, False, "overdraft withdraw 200 -> False"),
    (acc.balance, 80, "balance unchanged after failed withdraw -> 80")
]

for idx, (res, exp, desc) in enumerate(_tests):
    if res == exp:
        _passed += 1
        _log.append(f"Test {idx+1}: PASS ({desc})")
    else:
        _log.append(f"Test {idx+1}: FAIL ({desc} -> Expected {exp!r}, got {res!r})")

print("===TEST_RESULTS===")
print(json.dumps({"passed": _passed, "total": len(_tests), "log": _log}))
`,
    hints: {
      english: "In withdraw, verify if amount <= self.balance before updating self.balance.",
      tamilRoast: "Kadan vaangama withdraw panna condition podu bro, bank bankrupt aaidum!"
    }
  },

  // Chapter 17: Decorators & Context Managers
  {
    id: 'py-ch17-l1',
    moduleId: 'ch17-l1',
    chapterId: 'ch17',
    language: 'python',
    tier: 'expert',
    title: 'Execution Counter Decorator',
    description: `Write a decorator \`count_calls(fn)\` that counts how many times the decorated function is invoked, storing the total in \`fn.calls\`.
The decorated function should accept any *args and **kwargs and return the function's result.`,
    starterCode: `def count_calls(fn):
    # Implement decorator
    pass
`,
    testHarness: `{{USER_CODE}}

import json

_passed = 0
_log = []

@count_calls
def add(a, b):
    return a + b

r1 = add(2, 3)
r2 = add(10, 20)
c1 = add.calls

_tests = [
    (r1, 5, "add(2, 3) == 5"),
    (r2, 30, "add(10, 20) == 30"),
    (c1, 2, "add.calls == 2")
]

for idx, (res, exp, desc) in enumerate(_tests):
    if res == exp:
        _passed += 1
        _log.append(f"Test {idx+1}: PASS ({desc})")
    else:
        _log.append(f"Test {idx+1}: FAIL ({desc} -> Expected {exp!r}, got {res!r})")

print("===TEST_RESULTS===")
print(json.dumps({"passed": _passed, "total": len(_tests), "log": _log}))
`,
    hints: {
      english: "Define wrapper(*args, **kwargs), increment wrapper.calls, call fn, and return the result. Initialize wrapper.calls = 0.",
      tamilRoast: "Decorator-kulla wrapper function vechu calls count panna mudiyala? Expert level-la Kaipulla sikkitaaru!"
    }
  }
];

// Fallback generator ensuring every chapter in pythonCurriculum has at least one challenge
pythonCurriculum.forEach((chapter, chIdx) => {
  const existing = pythonModuleProblems.some(p => p.chapterId === chapter.id);
  if (!existing && chapter.lessons.length > 0) {
    const lesson = chapter.lessons[0];
    const tierMap: Record<string, 'beginner' | 'intermediate' | 'advanced' | 'expert'> = {
      Beginner: 'beginner',
      Intermediate: 'intermediate',
      Advanced: 'advanced',
      Expert: 'expert',
      Specialized: 'expert'
    };
    pythonModuleProblems.push({
      id: `py-${chapter.id}-l1`,
      moduleId: lesson.id,
      chapterId: chapter.id,
      language: 'python',
      tier: tierMap[chapter.tier] || 'beginner',
      title: `${chapter.title}: Challenge`,
      description: `Solve the coding challenge for ${chapter.title}.

Lesson Concept: ${lesson.explanation}

Write a function \`solve_${chapter.id}(n: int) -> int\` that returns \`n * 2\`.`,
      starterCode: `def solve_${chapter.id}(n: int) -> int:
    # Write your code here
    pass
`,
      testHarness: `{{USER_CODE}}

import json

_passed = 0
_log = []
_tests = [
    (solve_${chapter.id}(5), 10, "double 5"),
    (solve_${chapter.id}(12), 24, "double 12")
]

for idx, (res, exp, desc) in enumerate(_tests):
    if res == exp:
        _passed += 1
        _log.append(f"Test {idx+1}: PASS ({desc})")
    else:
        _log.append(f"Test {idx+1}: FAIL ({desc} -> Expected {exp!r}, got {res!r})")

print("===TEST_RESULTS===")
print(json.dumps({"passed": _passed, "total": len(_tests), "log": _log}))
`,
      hints: {
        english: `Review the chapter concepts for ${chapter.title} and return the computed value.`,
        tamilRoast: `Olunga padichutu code ezhuthu bro! ${chapter.title} oru simple topic dhaan.`
      }
    });
  }
});
