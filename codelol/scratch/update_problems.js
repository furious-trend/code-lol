const fs = require('fs');
let content = fs.readFileSync('codelol/lib/problems.ts', 'utf8');

// 1. Add fields to interface
content = content.replace(
  'starterCodeJava?: string;',
  'starterCodeJava?: string;\n  testHarnessC?: string;\n  testHarnessCpp?: string;\n  testHarnessJava?: string;'
);

// 2. Add testHarness to beginner-1
const b1HarnessC = `
    testHarnessC: \`
#define main user_main
{{USER_CODE}}
#undef main
#include <stdio.h>
int main() {
    int passed = 0;
    char* l1 = "Test 1: FAIL";
    char* l2 = "Test 2: FAIL";
    if (addNumbers(2, 3) == 5) { passed++; l1 = "Test 1: PASS"; }
    if (addNumbers(-1, 5) == 4) { passed++; l2 = "Test 2: PASS"; }
    printf("===TEST_RESULTS===\\n");
    printf("{\\"passed\\": %d, \\"total\\": 2, \\"log\\": [\\"%s\\", \\"%s\\"]}\\n", passed, l1, l2);
    return 0;
}\`,
    testHarnessCpp: \`
#define main user_main
{{USER_CODE}}
#undef main
#include <iostream>
int main() {
    int passed = 0;
    std::string l1 = "Test 1: FAIL";
    std::string l2 = "Test 2: FAIL";
    if (addNumbers(2, 3) == 5) { passed++; l1 = "Test 1: PASS"; }
    if (addNumbers(-1, 5) == 4) { passed++; l2 = "Test 2: PASS"; }
    std::cout << "===TEST_RESULTS===\\n";
    std::cout << "{\\"passed\\": " << passed << ", \\"total\\": 2, \\"log\\": [\\"" << l1 << "\\", \\"" << l2 << "\\"]}\\n";
    return 0;
}\`,
    testHarnessJava: \`
{{USER_CODE}}
public class Main {
    public static void main(String[] args) {
        int passed = 0;
        String l1 = "Test 1: FAIL";
        String l2 = "Test 2: FAIL";
        if (UserMain.addNumbers(2, 3) == 5) { passed++; l1 = "Test 1: PASS"; }
        if (UserMain.addNumbers(-1, 5) == 4) { passed++; l2 = "Test 2: PASS"; }
        System.out.println("===TEST_RESULTS===");
        System.out.println("{\\"passed\\": " + passed + ", \\"total\\": 2, \\"log\\": [\\"" + l1 + "\\", \\"" + l2 + "\\"]}");
    }
}\`,
`;

content = content.replace(
  'testCases: [\n      { input: [2, 3], expected: 5 },\n      { input: [-1, 5], expected: 4 }\n    ]',
  b1HarnessC + '\n    testCases: [\n      { input: [2, 3], expected: 5 },\n      { input: [-1, 5], expected: 4 }\n    ]'
);

// 3. Add testHarness to beginner-2
const b2HarnessC = `
    testHarnessC: \`
#define main user_main
{{USER_CODE}}
#undef main
#include <stdio.h>
#include <string.h>
int main() {
    int passed = 0;
    char* l1 = "Test 1: FAIL"; char* l2 = "Test 2: FAIL"; char* l3 = "Test 3: FAIL";
    if (getStringLength("hello") == 5) { passed++; l1 = "Test 1: PASS"; }
    if (getStringLength("") == 0) { passed++; l2 = "Test 2: PASS"; }
    if (getStringLength("coding") == 6) { passed++; l3 = "Test 3: PASS"; }
    printf("===TEST_RESULTS===\\n");
    printf("{\\"passed\\": %d, \\"total\\": 3, \\"log\\": [\\"%s\\", \\"%s\\", \\"%s\\"]}\\n", passed, l1, l2, l3);
    return 0;
}\`,
    testHarnessCpp: \`
#define main user_main
{{USER_CODE}}
#undef main
#include <iostream>
#include <string>
int main() {
    int passed = 0;
    std::string l1 = "Test 1: FAIL"; std::string l2 = "Test 2: FAIL"; std::string l3 = "Test 3: FAIL";
    if (getStringLength("hello") == 5) { passed++; l1 = "Test 1: PASS"; }
    if (getStringLength("") == 0) { passed++; l2 = "Test 2: PASS"; }
    if (getStringLength("coding") == 6) { passed++; l3 = "Test 3: PASS"; }
    std::cout << "===TEST_RESULTS===\\n";
    std::cout << "{\\"passed\\": " << passed << ", \\"total\\": 3, \\"log\\": [\\"" << l1 << "\\", \\"" << l2 << "\\", \\"" << l3 << "\\"]}\\n";
    return 0;
}\`,
    testHarnessJava: \`
{{USER_CODE}}
public class Main {
    public static void main(String[] args) {
        int passed = 0;
        String l1 = "Test 1: FAIL"; String l2 = "Test 2: FAIL"; String l3 = "Test 3: FAIL";
        if (UserMain.getStringLength("hello") == 5) { passed++; l1 = "Test 1: PASS"; }
        if (UserMain.getStringLength("") == 0) { passed++; l2 = "Test 2: PASS"; }
        if (UserMain.getStringLength("coding") == 6) { passed++; l3 = "Test 3: PASS"; }
        System.out.println("===TEST_RESULTS===");
        System.out.println("{\\"passed\\": " + passed + ", \\"total\\": 3, \\"log\\": [\\"" + l1 + "\\", \\"" + l2 + "\\", \\"" + l3 + "\\"]}");
    }
}\`,
`;

content = content.replace(
  'testCases: [\n      { input: ["hello"], expected: 5 },\n      { input: [""], expected: 0 },\n      { input: ["coding"], expected: 6 }\n    ]',
  b2HarnessC + '\n    testCases: [\n      { input: ["hello"], expected: 5 },\n      { input: [""], expected: 0 },\n      { input: ["coding"], expected: 6 }\n    ]'
);

fs.writeFileSync('codelol/lib/problems.ts', content);
console.log("Successfully updated problems.ts!");
