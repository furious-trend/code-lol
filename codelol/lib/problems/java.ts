// agent-notes: { ctx: "Java module coding problems aligned with Java curriculum chapters", deps: ["./types", "../lessons/index"], state: active, last: "sato@2026-10-30" }

import { ModuleProblem } from './types';
import { javaAllLessons } from '../lessons/index';

export const javaModuleProblems: ModuleProblem[] = [
  {
    id: 'java-ch1-l1',
    moduleId: '1',
    chapterId: 'chapter-1-the-absolute-basics',
    language: 'java',
    tier: 'beginner',
    title: 'Add Two Numbers in Java',
    description: `Implement the static method \`addNumbers(int a, int b)\` inside \`Solution\` class that returns their sum.`,
    starterCode: `public class Solution {
    public static int addNumbers(int a, int b) {
        // Write your logic here
        return 0;
    }

    public static void main(String[] args) {
        System.out.println(addNumbers(2, 3));
    }
}
`,
    testHarness: `{{USER_CODE}}
public class Main {
    public static void main(String[] args) {
        int passed = 0;
        String l1 = "Test 1: FAIL";
        String l2 = "Test 2: FAIL";
        if (Solution.addNumbers(2, 3) == 5) { passed++; l1 = "Test 1: PASS (2 + 3 == 5)"; }
        if (Solution.addNumbers(-1, 5) == 4) { passed++; l2 = "Test 2: PASS (-1 + 5 == 4)"; }
        System.out.println("===TEST_RESULTS===");
        System.out.println("{\\"passed\\": " + passed + ", \\"total\\": 2, \\"log\\": [\\"" + l1 + "\\", \\"" + l2 + "\\"]}");
    }
}
`,
    hints: {
      english: "Compute the sum of integers a and b and return it.",
      tamilRoast: "Java boilerplates paathu shock aagadha, addition logic ezhuthunga!"
    }
  },
  {
    id: 'java-ch2-l1',
    moduleId: '3',
    chapterId: 'chapter-2-logic',
    language: 'java',
    tier: 'beginner',
    title: 'Even or Odd String in Java',
    description: `Implement \`checkEvenOdd(int n)\` inside \`Solution\` returning \`"Even"\` or \`"Odd"\`.`,
    starterCode: `public class Solution {
    public static String checkEvenOdd(int n) {
        // Write your logic here
        return "";
    }

    public static void main(String[] args) {
        System.out.println(checkEvenOdd(4));
    }
}
`,
    testHarness: `{{USER_CODE}}
public class Main {
    public static void main(String[] args) {
        int passed = 0;
        String l1 = "Test 1: FAIL";
        String l2 = "Test 2: FAIL";
        if ("Even".equals(Solution.checkEvenOdd(4))) { passed++; l1 = "Test 1: PASS (4 is Even)"; }
        if ("Odd".equals(Solution.checkEvenOdd(7))) { passed++; l2 = "Test 2: PASS (7 is Odd)"; }
        System.out.println("===TEST_RESULTS===");
        System.out.println("{\\"passed\\": " + passed + ", \\"total\\": 2, \\"log\\": [\\"" + l1 + "\\", \\"" + l2 + "\\"]}");
    }
}
`,
    hints: {
      english: "Check divisibility by 2 with modulo, then return Even or Odd.",
      tamilRoast: "Java-la modulo operator use panni Even/Odd kandupidi pa!"
    }
  }
];

// Fallback generator for remaining Java chapters
const distinctChapters = Array.from(new Set(javaAllLessons.map(l => l.chapter || `${l.tier} Essentials`)));
distinctChapters.forEach((chapterName, idx) => {
  const chapterId = chapterName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const exists = javaModuleProblems.some(p => p.chapterId === chapterId);
  if (!exists) {
    const matchingLesson = javaAllLessons.find(l => (l.chapter || `${l.tier} Essentials`) === chapterName);
    const tierMap: Record<string, 'beginner' | 'intermediate' | 'advanced' | 'expert'> = {
      Beginner: 'beginner',
      Intermediate: 'intermediate',
      Expert: 'expert',
      Interview: 'expert'
    };
    const tier = tierMap[matchingLesson?.tier || 'Beginner'] || 'beginner';
    javaModuleProblems.push({
      id: `java-${chapterId}-mod`,
      moduleId: String(matchingLesson?.id || idx + 1),
      chapterId: chapterId,
      language: 'java',
      tier: tier,
      title: `${chapterName}: Java Challenge`,
      description: `Complete the Java coding challenge for ${chapterName}. Return \`n * 2\`.`,
      starterCode: `public class Solution {
    public static int solveJava(int n) {
        // Write your logic here
        return 0;
    }

    public static void main(String[] args) {
        System.out.println(solveJava(5));
    }
}
`,
      testHarness: `{{USER_CODE}}
public class Main {
    public static void main(String[] args) {
        int passed = 0;
        String l1 = "Test 1: FAIL";
        String l2 = "Test 2: FAIL";
        if (Solution.solveJava(5) == 10) { passed++; l1 = "Test 1: PASS (double 5 == 10)"; }
        if (Solution.solveJava(21) == 42) { passed++; l2 = "Test 2: PASS (double 21 == 42)"; }
        System.out.println("===TEST_RESULTS===");
        System.out.println("{\\"passed\\": " + passed + ", \\"total\\": 2, \\"log\\": [\\"" + l1 + "\\", \\"" + l2 + "\\"]}");
    }
}
`,
      hints: {
        english: `Review the Java lesson for ${chapterName} and implement the required static method.`,
        tamilRoast: `Java static method-kulla return n * 2 poduradhukku yosikura paaru!`
      }
    });
  }
});
