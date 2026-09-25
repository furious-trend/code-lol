const { Project, SyntaxKind } = require('ts-morph');
const path = require('path');

const project = new Project();
const sourceFile = project.addSourceFileAtPath('/home/shafi/projects/code lol/codelol/lib/lessons/beginner.ts');

const arrayDecl = sourceFile.getVariableDeclaration('beginnerLessons');
const arrayExpr = arrayDecl.getInitializerIfKindOrThrow(SyntaxKind.ArrayLiteralExpression);

const lessons = arrayExpr.getElements();

for (const element of lessons) {
  if (element.getKind() !== SyntaxKind.ObjectLiteralExpression) continue;
  
  const obj = element;
  const idProp = obj.getProperty('id');
  let id = null;
  if (idProp && idProp.getKind() === SyntaxKind.PropertyAssignment) {
    id = Number(idProp.getInitializer().getText());
  }
  
  let checks = [];
  
  // Assign appropriate checks based on lesson id
  switch (id) {
    case 1: // Variables
      checks = [
        { type: "requires_syntax", pattern: "(?:let|const|var)\\s+", expectedMessage: "Your code runs, but it doesn't actually declare a variable. Use 'let' or 'const'." }
      ];
      break;
    case 2: // Data Types
      checks = [
        { type: "requires_syntax", pattern: "typeof\\s+", expectedMessage: "Your code runs, but doesn't seem to check any data types. Try using the 'typeof' operator!" }
      ];
      break;
    case 3: // Arrays
      checks = [
        { type: "requires_syntax", pattern: "\\[.*\\]", expectedMessage: "Your code runs, but it doesn't look like you created or used an array [] yet." }
      ];
      break;
    case 4: // Objects
      checks = [
        { type: "requires_syntax", pattern: "\\{.*\\}", expectedMessage: "Your code runs, but you didn't define an object {} yet." }
      ];
      break;
    case 5: // For Loops
      checks = [
        { type: "requires_syntax", pattern: "for\\s*\\(", expectedMessage: "Your code runs, but it doesn't actually use a 'for' loop yet — give it another shot!" },
        { type: "requires_call_count", expectedMessage: "Your loop didn't seem to iterate multiple times. Make sure your loop condition allows it to run more than once!" }
      ];
      break;
    case 6: // While Loops
      checks = [
        { type: "requires_syntax", pattern: "while\\s*\\(", expectedMessage: "Your code runs, but it doesn't actually use a 'while' loop yet — give it another shot!" },
        { type: "requires_call_count", expectedMessage: "Your loop didn't seem to iterate multiple times. Check your condition!" }
      ];
      break;
    case 7: // Conditionals
      checks = [
        { type: "requires_syntax", pattern: "if\\s*\\(", expectedMessage: "Your code runs, but you didn't use an 'if' statement to make a decision." }
      ];
      break;
    case 8: // Functions
      checks = [
        { type: "requires_syntax", pattern: "(?:function\\s+|=>)", expectedMessage: "Your code runs, but you need to define a function to complete this lesson." },
        { type: "requires_syntax", pattern: "return\\s+", expectedMessage: "Make sure your function returns a value using the 'return' keyword." }
      ];
      break;
    case 9: // Operators
      checks = [
        { type: "requires_syntax", pattern: "(?:==|===|!=|!==|>|<|>=|<=)", expectedMessage: "Try using a comparison operator like == or === to compare values." }
      ];
      break;
    case 10: // String Basics
      checks = [
        { type: "requires_syntax", pattern: "\\+", expectedMessage: "Try concatenating (adding) two strings together using the + operator." }
      ];
      break;
    case 11: // Comments
      checks = [
        { type: "requires_syntax", pattern: "(?:\\/\\/|\\/\\*)", expectedMessage: "Your code runs, but it looks like you forgot to write a comment!" }
      ];
      break;
    case 12: // Type Conversion
      checks = [
        { type: "requires_syntax", pattern: "(?:Number\\(|String\\()", expectedMessage: "Try explicitly converting a type using Number() or String()." }
      ];
      break;
    case 13: // Input/Output Basics
      checks = [
        { type: "requires_syntax", pattern: "console\\.(?:log|warn|error|table)", expectedMessage: "You need to print something using console.log() or similar." }
      ];
      break;
    case 14: // Variable Scope
      checks = [
        { type: "requires_syntax", pattern: "let\\s+", expectedMessage: "Try declaring a local variable using 'let' inside a function or block." }
      ];
      break;
    case 15: // Constants vs Variables
      checks = [
        { type: "requires_syntax", pattern: "const\\s+", expectedMessage: "Make sure you declare a constant using 'const'." }
      ];
      break;
    case 16: // Basic Math Operations
      checks = [
        { type: "requires_syntax", pattern: "%", expectedMessage: "Use the modulo operator (%) to find the remainder." }
      ];
      break;
    case 17: // Ternary Operator
      checks = [
        { type: "requires_syntax", pattern: "\\?.*:", expectedMessage: "Your code runs, but you need to use the ternary operator (? :) for this exercise." }
      ];
      break;
    case 18: // Template Literals
      checks = [
        { type: "requires_syntax", pattern: "\\`.*\\$\\{.*\\}.*\\`", expectedMessage: "Try using backticks (`) and ${} to insert a variable into your string." }
      ];
      break;
    case 19: // Null vs Undefined
      checks = [
        { type: "requires_syntax", pattern: "(?:null|undefined)", expectedMessage: "Try explicitly using 'null' or checking for 'undefined'." }
      ];
      break;
    case 20: // Truthy/Falsy Values
      checks = [
        { type: "requires_syntax", pattern: "if\\s*\\(", expectedMessage: "Use an 'if' statement to test if a value is truthy or falsy." }
      ];
      break;
    case 21: // Basic Debugging
      checks = [
        { type: "requires_syntax", pattern: "(?:console\\.log|debugger)", expectedMessage: "Try using console.log() to debug!" }
      ];
      break;
    case 22: // Switch Statements
      checks = [
        { type: "requires_syntax", pattern: "switch\\s*\\(", expectedMessage: "Your code runs, but it doesn't use a 'switch' statement." },
        { type: "requires_syntax", pattern: "case\\s+", expectedMessage: "Make sure you have at least one 'case' in your switch block." }
      ];
      break;
    case 23: // Nested Loops
      checks = [
        { type: "requires_syntax", pattern: "(?:for|while).*\\{.*(?:for|while)", expectedMessage: "You need a loop inside another loop for this exercise." }
      ];
      break;
    case 24: // Array Push/Pop
      checks = [
        { type: "requires_syntax", pattern: "\\.(?:push|pop)\\s*\\(", expectedMessage: "Try using the .push() or .pop() methods on an array." }
      ];
      break;
    case 25: // String Slice/Split
      checks = [
        { type: "requires_syntax", pattern: "\\.(?:slice|split)\\s*\\(", expectedMessage: "Use the .slice() or .split() methods on a string." }
      ];
      break;
    case 101: // Workout: Basics Builder
      checks = [
        { type: "requires_syntax", pattern: "(?:let|const)\\s+", expectedMessage: "Start by declaring a variable using let or const." },
        { type: "requires_syntax", pattern: "console\\.log", expectedMessage: "Don't forget to print the greeting using console.log." }
      ];
      break;
    case 102: // Workout: Logic & Flow
      checks = [
        { type: "requires_syntax", pattern: "for\\s*\\(", expectedMessage: "Use a for loop to count down." },
        { type: "requires_syntax", pattern: "if\\s*\\(", expectedMessage: "Use an if statement inside the loop." },
        { type: "requires_call_count", expectedMessage: "Make sure your loop runs multiple times." }
      ];
      break;
    case 103: // Workout: Data Mastery
      checks = [
        { type: "requires_syntax", pattern: "\\[.*\\]", expectedMessage: "Create an array for your inventory." },
        { type: "requires_syntax", pattern: "(?:for|while)", expectedMessage: "Use a loop to go through your inventory." },
        { type: "requires_syntax", pattern: "\\.push", expectedMessage: "Use .push to add an item to the array." }
      ];
      break;
    case 104: // Workout: Function Architect
      checks = [
        { type: "requires_syntax", pattern: "function\\s+", expectedMessage: "Define a function to calculate the total." },
        { type: "requires_syntax", pattern: "return\\s+", expectedMessage: "Make sure your function returns the total damage." }
      ];
      break;
    case 105: // Workout: Bug Hunter
      checks = [
        { type: "requires_syntax", pattern: "function\\s+", expectedMessage: "Create a safe function." },
        { type: "requires_syntax", pattern: "(?:if|\\|\\|)", expectedMessage: "Check for missing or undefined data!" }
      ];
      break;
    case 106: // Workout: The Ultimate Trial
      checks = [
        { type: "requires_syntax", pattern: "\\{.*\\}", expectedMessage: "Create objects for the player and enemy." },
        { type: "requires_syntax", pattern: "(?:for|while)", expectedMessage: "Use a loop for the battle sequence." },
        { type: "requires_syntax", pattern: "\\?.*:", expectedMessage: "Use a ternary operator to decide the winner." }
      ];
      break;
  }
  
  if (checks.length > 0) {
    // Remove existing verificationChecks if present
    const existingChecks = obj.getProperty('verificationChecks');
    if (existingChecks) {
      existingChecks.remove();
    }
    
    // Add verificationChecks property
    const checksString = JSON.stringify(checks, null, 2).replace(/"([^"]+)":/g, '$1:');
    obj.addPropertyAssignment({
      name: 'verificationChecks',
      initializer: checksString
    });
  }
}

sourceFile.saveSync();
console.log('Successfully updated beginner lessons with verificationChecks!');
