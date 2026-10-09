const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../lib/lessons');
const filesToConvert = [
    { src: 'beginner.ts', dest: 'beginner-python.ts', varName: 'pythonBeginnerLessons' },
    { src: 'intermediate.ts', dest: 'intermediate-python.ts', varName: 'pythonIntermediateLessons' },
    { src: 'expert.ts', dest: 'expert-python.ts', varName: 'pythonExpertLessons' },
    { src: 'interview.ts', dest: 'interview-python.ts', varName: 'pythonInterviewLessons' }
];

function fixPythonCode(code) {
    let content = code
        .replace(/console\.log/g, 'print')
        .replace(/console\.warn/g, 'print')
        .replace(/console\.error/g, 'print')
        .replace(/console\.table/g, 'print')
        .replace(/\blet \b/g, '')
        .replace(/\bconst \b/g, '')
        .replace(/debugger/g, 'breakpoint()')
        .replace(/\.push\(/g, '.append(')
        .replace(/===/g, '==')
        .replace(/!==/g, '!=')
        .replace(/\|\|/g, 'or')
        .replace(/&&/g, 'and')
        .replace(/\/\//g, '#')
        .replace(/\/\*/g, "'''")
        .replace(/\*\//g, "'''")
        .replace(/Array\(n\+1\)\.fill\(0\)/g, "[0] * (n + 1)")
        .replace(/Math\.floor/g, "math.floor")
        
        // functions / control blocks JS->Python
        .replace(/function\s+([^{]+)\s*\{/g, 'def $1:')
        .replace(/if \(([^)]+)\) \{/g, 'if $1:')
        .replace(/while\(([^)]+)\) \{/g, 'while $1:')
        .replace(/while \(([^)]+)\) \{/g, 'while $1:')
        .replace(/for\(([^)]+)\) \{/g, 'for $1:')
        .replace(/for \(([^)]+)\) \{/g, 'for $1:');
        
    // Remove standalone closing braces that likely were block ends
    content = content.replace(/\\n\}/g, '');
    content = content.replace(/\n\}/g, '');

    // Replace { with : at the end of definitions
    content = content.replace(/\) \{/g, '):');
    
    // Remove semicolons!
    content = content.replace(/;/g, '');
    
    // JS arrow functions to Python lambdas or normal defs (rough approximation)
    content = content.replace(/(\w+)\s*=>\s*(.*)/g, 'lambda $1: $2');
    content = content.replace(/\(([^)]+)\)\s*=>\s*(.*)/g, 'lambda $1: $2');
    
    return content;
}

for (const { src, dest, varName } of filesToConvert) {
    const srcPath = path.join(dir, src);
    const destPath = path.join(dir, dest);
    
    if (!fs.existsSync(srcPath)) continue;
    
    let content = fs.readFileSync(srcPath, 'utf8');
    
    // Replace export name
    const srcVarName = src.replace('.ts', 'Lessons');
    content = content.replace(new RegExp(`export const ${srcVarName}`, 'g'), `export const ${varName}`);
    
    // Convert code inside `codeExample: "..."` and `code: "..."`
    content = content.replace(/(code(?:Example)?:\s*)(`[^`]+`|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g, (match, prefix, strContent) => {
        // Evaluate the string literal to apply regexes on raw code
        let rawCode = eval(strContent);
        let fixedCode = fixPythonCode(rawCode);
        return prefix + JSON.stringify(fixedCode);
    });
    
    // Fix JS verification checks so they pass for Python code!
    content = content.replace(/"pattern": "console\\\\\\.log"/g, '"pattern": "print"');
    content = content.replace(/"pattern": "\\\\(console\\\\.log\\\\)"/g, '"pattern": "\\\\(print\\\\)"');
    content = content.replace(/"pattern": "(?:\\\\^)?\\[a-zA-Z_\\]\\\\\\\\w\\*\\\\\\\\s\\*="/g, '"pattern": "\\\\w+\\\\s*="');
    content = content.replace(/"expectedMessage": "Try using console\\.log/g, '"expectedMessage": "Try using print()');
    content = content.replace(/"expectedMessage": ".*use a 'let'.*"/g, '"expectedMessage": "Try declaring a variable."');
    content = content.replace(/"pattern": "let\\\\s\+"/g, '"pattern": ""');
    content = content.replace(/"pattern": "const\\\\s\+"/g, '"pattern": ""');
    content = content.replace(/"pattern": "(?:for\|while).*\\\\{.*(?:for\|while)"/g, '"pattern": "(?:for|while).*(?:for|while)"');
    content = content.replace(/"pattern": "if\\\\s\+.*\\\\s\+else"/g, '"pattern": "if.*else"'); // ternary is `A if B else C`
    content = content.replace(/"pattern": "function\\\\s\+"/g, '"pattern": "def\\\\s+"');
    content = content.replace(/"pattern": "=>"/g, '"pattern": "lambda"');
    
    fs.writeFileSync(destPath, content);
    console.log('Generated', dest);
}
