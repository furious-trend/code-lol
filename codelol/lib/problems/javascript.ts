// agent-notes: { ctx: "JavaScript module coding problems aligned with JavaScript curriculum chapters", deps: ["./types", "../lessons/index"], state: active, last: "sato@2026-10-30" }

import { ModuleProblem } from './types';
import { allLessons as jsLessons } from '../lessons/index';

export const javascriptModuleProblems: ModuleProblem[] = [
  // Chapter 1: The Absolute Basics
  {
    id: 'js-ch1-l1',
    moduleId: '1',
    chapterId: 'chapter-1-the-absolute-basics',
    language: 'javascript',
    tier: 'beginner',
    title: 'Variables & Constants',
    description: `Declare a function \`computeCart(price, taxRate)\` that:
- Declares a constant \`tax\` equal to \`price * taxRate\`.
- Declares a variable \`total\` equal to \`price + tax\`.
- Returns \`total\`.`,
    starterCode: `function computeCart(price, taxRate) {
  // Write your code here
  
}
`,
    testHarness: `{{USER_CODE}}

const _tests = [
  { input: [100, 0.1], expected: 110, desc: "computeCart(100, 0.1)" },
  { input: [50, 0.05], expected: 52.5, desc: "computeCart(50, 0.05)" },
  { input: [0, 0.18], expected: 0, desc: "computeCart(0, 0.18)" }
];

let _passed = 0;
const _log = [];

for (let i = 0; i < _tests.length; i++) {
  try {
    const res = computeCart(..._tests[i].input);
    if (res === _tests[i].expected) {
      _passed++;
      _log.push("Test " + (i + 1) + ": PASS (" + _tests[i].desc + ")");
    } else {
      _log.push("Test " + (i + 1) + ": FAIL (" + _tests[i].desc + " -> Expected " + _tests[i].expected + ", got " + res + ")");
    }
  } catch (err) {
    _log.push("Test " + (i + 1) + ": ERROR (" + err.message + ")");
  }
}

console.log("===TEST_RESULTS===");
console.log(JSON.stringify({ passed: _passed, total: _tests.length, log: _log }));
`,
    hints: {
      english: "Compute tax from price and taxRate, then return the total price including tax.",
      tamilRoast: "Variables kooda olunga declare panna theriyaadha? Horlicks dabba la sambar podura maari let const confuse panra!"
    }
  },
  {
    id: 'js-ch1-l2',
    moduleId: '2',
    chapterId: 'chapter-1-the-absolute-basics',
    language: 'javascript',
    tier: 'beginner',
    title: 'Type Check & Validation',
    description: `Write a function \`isValidNumber(val)\` that returns \`true\` if \`val\` is of type \`'number'\` and is NOT \`NaN\`. Otherwise return \`false\`.`,
    starterCode: `function isValidNumber(val) {
  // Write your code here
  
}
`,
    testHarness: `{{USER_CODE}}

const _tests = [
  { input: [42], expected: true, desc: "42 is a valid number" },
  { input: [NaN], expected: false, desc: "NaN is not a valid number" },
  { input: ["42"], expected: false, desc: "string is not a number" },
  { input: [null], expected: false, desc: "null is not a number" }
];

let _passed = 0;
const _log = [];

for (let i = 0; i < _tests.length; i++) {
  try {
    const res = isValidNumber(_tests[i].input[0]);
    if (res === _tests[i].expected) {
      _passed++;
      _log.push("Test " + (i + 1) + ": PASS (" + _tests[i].desc + ")");
    } else {
      _log.push("Test " + (i + 1) + ": FAIL (" + _tests[i].desc + " -> Expected " + _tests[i].expected + ", got " + res + ")");
    }
  } catch (err) {
    _log.push("Test " + (i + 1) + ": ERROR (" + err.message + ")");
  }
}

console.log("===TEST_RESULTS===");
console.log(JSON.stringify({ passed: _passed, total: _tests.length, log: _log }));
`,
    hints: {
      english: "typeof NaN is 'number', so you must also check !Number.isNaN(val).",
      tamilRoast: "JavaScript-la typeof NaN = number nu unakku ippo dhaan theriyuma? Comedy pannatha!"
    }
  },

  // Chapter 2: Operators & Expressions
  {
    id: 'js-ch2-l1',
    moduleId: '6',
    chapterId: 'chapter-2-operators-expressions',
    language: 'javascript',
    tier: 'beginner',
    title: 'Strict Equality Checker',
    description: `Given two values \`a\` and \`b\`, return \`true\` if and only if they are strictly equal in both type and value (\`===\`).`,
    starterCode: `function isStrictlyEqual(a, b) {
  // Write your code here
  
}
`,
    testHarness: `{{USER_CODE}}

const _tests = [
  { input: [5, 5], expected: true, desc: "5 === 5" },
  { input: [5, "5"], expected: false, desc: "5 === '5' is false" },
  { input: [null, undefined], expected: false, desc: "null === undefined is false" },
  { input: [false, 0], expected: false, desc: "false === 0 is false" }
];

let _passed = 0;
const _log = [];

for (let i = 0; i < _tests.length; i++) {
  try {
    const res = isStrictlyEqual(..._tests[i].input);
    if (res === _tests[i].expected) {
      _passed++;
      _log.push("Test " + (i + 1) + ": PASS (" + _tests[i].desc + ")");
    } else {
      _log.push("Test " + (i + 1) + ": FAIL (" + _tests[i].desc + " -> Expected " + _tests[i].expected + ", got " + res + ")");
    }
  } catch (err) {
    _log.push("Test " + (i + 1) + ": ERROR (" + err.message + ")");
  }
}

console.log("===TEST_RESULTS===");
console.log(JSON.stringify({ passed: _passed, total: _tests.length, log: _log }));
`,
    hints: {
      english: "Never use == in modern JS! Use === to prevent coercive equality.",
      tamilRoast: "Double equals (==) potta compiler unna roast panrum da! Triple equals (===) podu!"
    }
  },

  // Chapter 3: Control Flow
  {
    id: 'js-ch3-l1',
    moduleId: '11',
    chapterId: 'chapter-3-control-flow',
    language: 'javascript',
    tier: 'beginner',
    title: 'Discount Calculator',
    description: `Calculate the final price given a customer tier:
- \`"VIP"\`: 20% discount (\`price * 0.8\`)
- \`"REGULAR"\`: 10% discount (\`price * 0.9\`)
- Any other tier: no discount (\`price\`)

Write \`calcDiscount(price, tier)\`.`,
    starterCode: `function calcDiscount(price, tier) {
  // Write your code here
  
}
`,
    testHarness: `{{USER_CODE}}

const _tests = [
  { input: [100, "VIP"], expected: 80, desc: "VIP gets 20% off" },
  { input: [100, "REGULAR"], expected: 90, desc: "REGULAR gets 10% off" },
  { input: [100, "GUEST"], expected: 100, desc: "GUEST pays full price" }
];

let _passed = 0;
const _log = [];

for (let i = 0; i < _tests.length; i++) {
  try {
    const res = calcDiscount(..._tests[i].input);
    if (res === _tests[i].expected) {
      _passed++;
      _log.push("Test " + (i + 1) + ": PASS (" + _tests[i].desc + ")");
    } else {
      _log.push("Test " + (i + 1) + ": FAIL (" + _tests[i].desc + " -> Expected " + _tests[i].expected + ", got " + res + ")");
    }
  } catch (err) {
    _log.push("Test " + (i + 1) + ": ERROR (" + err.message + ")");
  }
}

console.log("===TEST_RESULTS===");
console.log(JSON.stringify({ passed: _passed, total: _tests.length, log: _log }));
`,
    hints: {
      english: "Use an if-else if-else chain or a switch statement checking tier.",
      tamilRoast: "VIP discount thara kooda if-else condition thappa? Kadai nadathura aala nee?"
    }
  },

  // Chapter 5: Arrays & Objects
  {
    id: 'js-ch5-l1',
    moduleId: '21',
    chapterId: 'chapter-5-arrays-objects',
    language: 'javascript',
    tier: 'beginner',
    title: 'Sum of Array Elements',
    description: `Write a function \`sumArray(nums)\` that returns the sum of all numbers in the array. Return \`0\` for an empty array.`,
    starterCode: `function sumArray(nums) {
  // Write your code here
  
}
`,
    testHarness: `{{USER_CODE}}

const _tests = [
  { input: [[1, 2, 3, 4]], expected: 10, desc: "sumArray([1, 2, 3, 4])" },
  { input: [[]], expected: 0, desc: "empty array -> 0" },
  { input: [[-5, 5, 10]], expected: 10, desc: "handles negatives" }
];

let _passed = 0;
const _log = [];

for (let i = 0; i < _tests.length; i++) {
  try {
    const res = sumArray(_tests[i].input[0]);
    if (res === _tests[i].expected) {
      _passed++;
      _log.push("Test " + (i + 1) + ": PASS (" + _tests[i].desc + ")");
    } else {
      _log.push("Test " + (i + 1) + ": FAIL (" + _tests[i].desc + " -> Expected " + _tests[i].expected + ", got " + res + ")");
    }
  } catch (err) {
    _log.push("Test " + (i + 1) + ": ERROR (" + err.message + ")");
  }
}

console.log("===TEST_RESULTS===");
console.log(JSON.stringify({ passed: _passed, total: _tests.length, log: _log }));
`,
    hints: {
      english: "You can iterate through the numbers accumulating their sum, or use the reduce array method.",
      tamilRoast: "Array reduce kooda theriyala na JavaScript developer nu sollatheenga bro!"
    }
  },

  // Intermediate: Closures
  {
    id: 'js-ch-inter-1',
    moduleId: '26',
    chapterId: 'intermediate-essentials',
    language: 'javascript',
    tier: 'intermediate',
    title: 'Counter Factory',
    description: `Create a function \`createCounter(initialValue = 0)\` that returns an object with:
- \`increment()\`: increases value by 1 and returns it.
- \`decrement()\`: decreases value by 1 and returns it.
- \`getValue()\`: returns current value.`,
    starterCode: `function createCounter(initialValue = 0) {
  // Write your code here
  
}
`,
    testHarness: `{{USER_CODE}}

let _passed = 0;
const _log = [];

try {
  const c = createCounter(5);
  const inc = c.increment();
  const dec = c.decrement();
  const val = c.getValue();

  if (inc === 6) { _passed++; _log.push("Test 1: PASS (increment)"); }
  else { _log.push("Test 1: FAIL (expected 6, got " + inc + ")"); }

  if (dec === 5) { _passed++; _log.push("Test 2: PASS (decrement)"); }
  else { _log.push("Test 2: FAIL (expected 5, got " + dec + ")"); }

  if (val === 5) { _passed++; _log.push("Test 3: PASS (getValue)"); }
  else { _log.push("Test 3: FAIL (expected 5, got " + val + ")"); }
} catch (err) {
  _log.push("Test ERROR: " + err.message);
}

console.log("===TEST_RESULTS===");
console.log(JSON.stringify({ passed: _passed, total: 3, log: _log }));
`,
    hints: {
      english: "Keep count in the outer function scope so methods access it via closure.",
      tamilRoast: "Closure variable leak aagama paathukko. Inner function outer scope-ah capture panra vidham dhaan closure!"
    }
  },

  // Expert: Deep Clone
  {
    id: 'js-ch-exp-1',
    moduleId: '51',
    chapterId: 'expert-essentials',
    language: 'javascript',
    tier: 'expert',
    title: 'Deep Clone Object',
    description: `Implement a robust \`deepClone(obj)\` function that copies nested objects and arrays without retaining references.`,
    starterCode: `function deepClone(obj) {
  // Write your code here
  
}
`,
    testHarness: `{{USER_CODE}}

let _passed = 0;
const _log = [];

try {
  const original = { a: 1, b: { c: 2, d: [3, 4] } };
  const cloned = deepClone(original);

  if (JSON.stringify(original) === JSON.stringify(cloned)) {
    _passed++; _log.push("Test 1: PASS (cloned value matches)");
  } else {
    _log.push("Test 1: FAIL");
  }

  cloned.b.c = 999;
  cloned.b.d.push(5);

  if (original.b.c === 2 && original.b.d.length === 2) {
    _passed++; _log.push("Test 2: PASS (mutation does not affect original)");
  } else {
    _log.push("Test 2: FAIL (mutation leaked to original)");
  }
} catch (err) {
  _log.push("Test ERROR: " + err.message);
}

console.log("===TEST_RESULTS===");
console.log(JSON.stringify({ passed: _passed, total: 2, log: _log }));
`,
    hints: {
      english: "Recursively clone nested objects and arrays while returning primitives directly.",
      tamilRoast: "JSON.parse(JSON.stringify()) potu thappichikalam nu paathiya? Real recursion ezhuthu!"
    }
  }
];

// Fallback generator for remaining JavaScript lessons
const distinctChapters = Array.from(new Set(jsLessons.map(l => l.chapter || `${l.tier} Essentials`)));
distinctChapters.forEach((chapterName, idx) => {
  const chapterId = chapterName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const exists = javascriptModuleProblems.some(p => p.chapterId === chapterId);
  if (!exists) {
    const matchingLesson = jsLessons.find(l => (l.chapter || `${l.tier} Essentials`) === chapterName);
    const tierMap: Record<string, 'beginner' | 'intermediate' | 'advanced' | 'expert'> = {
      Beginner: 'beginner',
      Intermediate: 'intermediate',
      Expert: 'expert',
      Interview: 'expert'
    };
    const tier = tierMap[matchingLesson?.tier || 'Beginner'] || 'beginner';
    javascriptModuleProblems.push({
      id: `js-${chapterId}-mod`,
      moduleId: String(matchingLesson?.id || idx + 1),
      chapterId: chapterId,
      language: 'javascript',
      tier: tier,
      title: `${chapterName}: Challenge`,
      description: `Complete the coding challenge for ${chapterName}.
Given a number \`n\`, return \`n * 2\`.`,
      starterCode: `function solveChallenge(n) {\n  // Write your code here\n  \n}`,
      testHarness: `{{USER_CODE}}

const _tests = [
  { input: [5], expected: 10, desc: "double 5" },
  { input: [21], expected: 42, desc: "double 21" }
];
let _passed = 0;
const _log = [];
for (let i = 0; i < _tests.length; i++) {
  try {
    const res = solveChallenge(_tests[i].input[0]);
    if (res === _tests[i].expected) {
      _passed++;
      _log.push("Test " + (i + 1) + ": PASS (" + _tests[i].desc + ")");
    } else {
      _log.push("Test " + (i + 1) + ": FAIL");
    }
  } catch (err) {
    _log.push("Test " + (i + 1) + ": ERROR (" + err.message + ")");
  }
}
console.log("===TEST_RESULTS===");
console.log(JSON.stringify({ passed: _passed, total: _tests.length, log: _log }));
`,
      hints: {
        english: `Review the ${chapterName} curriculum lesson and return the calculated result.`,
        tamilRoast: `${chapterName} lesson-ah poi padi da, apram solve pannalam!`
      }
    });
  }
});
