// agent-notes: { ctx: "C module coding problems aligned with C curriculum chapters", deps: ["./types", "../lessons/index"], state: active, last: "sato@2026-10-28" }

import { ModuleProblem } from './types';
import { cAllLessons } from '../lessons/index';

export const cModuleProblems: ModuleProblem[] = [
  {
    id: 'c-ch1-l1',
    moduleId: '1',
    chapterId: 'chapter-1-the-absolute-basics',
    language: 'c',
    tier: 'beginner',
    title: 'Add Two Integers in C',
    description: `Write a function \`int addNumbers(int a, int b)\` that returns the sum of \`a\` and \`b\`.`,
    starterCode: `#include <stdio.h>

int addNumbers(int a, int b) {
    // Write your logic here
    return a + b;
}

int main() {
    printf("%d\\n", addNumbers(2, 3));
    return 0;
}
`,
    testHarness: `
#define main user_main
{{USER_CODE}}
#undef main
#include <stdio.h>
int main() {
    int passed = 0;
    const char* l1 = "Test 1: FAIL";
    const char* l2 = "Test 2: FAIL";
    if (addNumbers(2, 3) == 5) { passed++; l1 = "Test 1: PASS (2 + 3 == 5)"; }
    if (addNumbers(-1, 5) == 4) { passed++; l2 = "Test 2: PASS (-1 + 5 == 4)"; }
    printf("===TEST_RESULTS===\\n");
    printf("{\\"passed\\": %d, \\"total\\": 2, \\"log\\": [\\"%s\\", \\"%s\\"]}\\n", passed, l1, l2);
    return 0;
}
`,
    hints: {
      english: "Return a + b directly from the addNumbers function.",
      tamilRoast: "C-la rendu number add panna kooda segfault varutha? Thalaiva return a + b podunga!"
    }
  },
  {
    id: 'c-ch2-l1',
    moduleId: '3',
    chapterId: 'chapter-2-logic',
    language: 'c',
    tier: 'beginner',
    title: 'Find Maximum of Two Numbers',
    description: `Write a function \`int maxTwo(int a, int b)\` that returns the greater of the two integers.`,
    starterCode: `#include <stdio.h>

int maxTwo(int a, int b) {
    return (a > b) ? a : b;
}

int main() {
    printf("%d\\n", maxTwo(10, 20));
    return 0;
}
`,
    testHarness: `
#define main user_main
{{USER_CODE}}
#undef main
#include <stdio.h>
int main() {
    int passed = 0;
    const char* l1 = "Test 1: FAIL";
    const char* l2 = "Test 2: FAIL";
    if (maxTwo(10, 20) == 20) { passed++; l1 = "Test 1: PASS (max(10, 20) == 20)"; }
    if (maxTwo(50, -5) == 50) { passed++; l2 = "Test 2: PASS (max(50, -5) == 50)"; }
    printf("===TEST_RESULTS===\\n");
    printf("{\\"passed\\": %d, \\"total\\": 2, \\"log\\": [\\"%s\\", \\"%s\\"]}\\n", passed, l1, l2);
    return 0;
}
`,
    hints: {
      english: "Use the ternary operator return a > b ? a : b; or an if-else statement.",
      tamilRoast: "Ternary operator theriyuma? a > b ? a : b podu pa!"
    }
  }
];

// Fallback generator for remaining C chapters
const distinctChapters = Array.from(new Set(cAllLessons.map(l => l.chapter || `${l.tier} Essentials`)));
distinctChapters.forEach((chapterName, idx) => {
  const chapterId = chapterName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const exists = cModuleProblems.some(p => p.chapterId === chapterId);
  if (!exists) {
    const matchingLesson = cAllLessons.find(l => (l.chapter || `${l.tier} Essentials`) === chapterName);
    const tierMap: Record<string, 'beginner' | 'intermediate' | 'advanced' | 'expert'> = {
      Beginner: 'beginner',
      Intermediate: 'intermediate',
      Expert: 'expert',
      Interview: 'expert'
    };
    const tier = tierMap[matchingLesson?.tier || 'Beginner'] || 'beginner';
    cModuleProblems.push({
      id: `c-${chapterId}-mod`,
      moduleId: String(matchingLesson?.id || idx + 1),
      chapterId: chapterId,
      language: 'c',
      tier: tier,
      title: `${chapterName}: C Challenge`,
      description: `Complete the C coding challenge for ${chapterName}. Return \`n * 2\`.`,
      starterCode: `#include <stdio.h>

int solveC(int n) {
    return n * 2;
}

int main() {
    printf("%d\\n", solveC(5));
    return 0;
}
`,
      testHarness: `
#define main user_main
{{USER_CODE}}
#undef main
#include <stdio.h>
int main() {
    int passed = 0;
    const char* l1 = "Test 1: FAIL";
    const char* l2 = "Test 2: FAIL";
    if (solveC(5) == 10) { passed++; l1 = "Test 1: PASS (double 5 == 10)"; }
    if (solveC(21) == 42) { passed++; l2 = "Test 2: PASS (double 21 == 42)"; }
    printf("===TEST_RESULTS===\\n");
    printf("{\\"passed\\": %d, \\"total\\": 2, \\"log\\": [\\"%s\\", \\"%s\\"]}\\n", passed, l1, l2);
    return 0;
}
`,
      hints: {
        english: `Review the C lesson for ${chapterName} and implement the required return.`,
        tamilRoast: `C programming romba strict-u brother, pointer crash aagama paathukko!`
      }
    });
  }
});
