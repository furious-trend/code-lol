// agent-notes: { ctx: "C++ module coding problems aligned with C++ curriculum chapters", deps: ["./types", "../lessons/index"], state: active, last: "sato@2026-10-28" }

import { ModuleProblem } from './types';
import { cppAllLessons } from '../lessons/index';

export const cppModuleProblems: ModuleProblem[] = [
  {
    id: 'cpp-ch1-l1',
    moduleId: '1',
    chapterId: 'chapter-1-the-absolute-basics',
    language: 'cpp',
    tier: 'beginner',
    title: 'Add Two Integers in C++',
    description: `Write a function \`int addNumbers(int a, int b)\` in C++ that returns the sum of \`a\` and \`b\`.`,
    starterCode: `#include <iostream>

int addNumbers(int a, int b) {
    // Write your logic here
    return a + b;
}

int main() {
    std::cout << addNumbers(2, 3) << std::endl;
    return 0;
}
`,
    testHarness: `
#define main user_main
{{USER_CODE}}
#undef main
#include <iostream>
#include <string>
int main() {
    int passed = 0;
    std::string l1 = "Test 1: FAIL";
    std::string l2 = "Test 2: FAIL";
    if (addNumbers(2, 3) == 5) { passed++; l1 = "Test 1: PASS (2 + 3 == 5)"; }
    if (addNumbers(-1, 5) == 4) { passed++; l2 = "Test 2: PASS (-1 + 5 == 4)"; }
    std::cout << "===TEST_RESULTS===\\n";
    std::cout << "{\\"passed\\": " << passed << ", \\"total\\": 2, \\"log\\": [\\"" << l1 << "\\", \\"" << l2 << "\\"]}\\n";
    return 0;
}
`,
    hints: {
      english: "Return a + b directly from the addNumbers function.",
      tamilRoast: "std::cout paathu bayapudatha! Return a + b panna mudiyatha?"
    }
  },
  {
    id: 'cpp-ch2-l1',
    moduleId: '3',
    chapterId: 'chapter-2-logic',
    language: 'cpp',
    tier: 'beginner',
    title: 'Even or Odd String in C++',
    description: `Write a function \`std::string checkEvenOdd(int n)\` that returns \`"Even"\` if \`n\` is even, or \`"Odd"\` if \`n\` is odd.`,
    starterCode: `#include <iostream>
#include <string>

std::string checkEvenOdd(int n) {
    return (n % 2 == 0) ? "Even" : "Odd";
}

int main() {
    std::cout << checkEvenOdd(4) << std::endl;
    return 0;
}
`,
    testHarness: `
#define main user_main
{{USER_CODE}}
#undef main
#include <iostream>
#include <string>
int main() {
    int passed = 0;
    std::string l1 = "Test 1: FAIL";
    std::string l2 = "Test 2: FAIL";
    if (checkEvenOdd(4) == "Even") { passed++; l1 = "Test 1: PASS (4 is Even)"; }
    if (checkEvenOdd(7) == "Odd") { passed++; l2 = "Test 2: PASS (7 is Odd)"; }
    std::cout << "===TEST_RESULTS===\\n";
    std::cout << "{\\"passed\\": " << passed << ", \\"total\\": 2, \\"log\\": [\\"" << l1 << "\\", \\"" << l2 << "\\"]}\\n";
    return 0;
}
`,
    hints: {
      english: "Use n % 2 == 0 to check if divisible by 2.",
      tamilRoast: "Modulo 2 panna Even/Odd theriyum, idhu 1st standard maths da!"
    }
  }
];

// Fallback generator for remaining C++ chapters
const distinctChapters = Array.from(new Set(cppAllLessons.map(l => l.chapter || `${l.tier} Essentials`)));
distinctChapters.forEach((chapterName, idx) => {
  const chapterId = chapterName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const exists = cppModuleProblems.some(p => p.chapterId === chapterId);
  if (!exists) {
    const matchingLesson = cppAllLessons.find(l => (l.chapter || `${l.tier} Essentials`) === chapterName);
    const tierMap: Record<string, 'beginner' | 'intermediate' | 'advanced' | 'expert'> = {
      Beginner: 'beginner',
      Intermediate: 'intermediate',
      Expert: 'expert',
      Interview: 'expert'
    };
    const tier = tierMap[matchingLesson?.tier || 'Beginner'] || 'beginner';
    cppModuleProblems.push({
      id: `cpp-${chapterId}-mod`,
      moduleId: String(matchingLesson?.id || idx + 1),
      chapterId: chapterId,
      language: 'cpp',
      tier: tier,
      title: `${chapterName}: C++ Challenge`,
      description: `Complete the C++ coding challenge for ${chapterName}. Return \`n * 2\`.`,
      starterCode: `#include <iostream>

int solveCpp(int n) {
    return n * 2;
}

int main() {
    std::cout << solveCpp(5) << std::endl;
    return 0;
}
`,
      testHarness: `
#define main user_main
{{USER_CODE}}
#undef main
#include <iostream>
#include <string>
int main() {
    int passed = 0;
    std::string l1 = "Test 1: FAIL";
    std::string l2 = "Test 2: FAIL";
    if (solveCpp(5) == 10) { passed++; l1 = "Test 1: PASS (double 5 == 10)"; }
    if (solveCpp(21) == 42) { passed++; l2 = "Test 2: PASS (double 21 == 42)"; }
    std::cout << "===TEST_RESULTS===\\n";
    std::cout << "{\\"passed\\": " << passed << ", \\"total\\": 2, \\"log\\": [\\"" << l1 << "\\", \\"" << l2 << "\\"]}\\n";
    return 0;
}
`,
      hints: {
        english: `Review the C++ lesson for ${chapterName} and implement the required function.`,
        tamilRoast: `C++ vectors and classes paathu odathey, solve pannu!`
      }
    });
  }
});
