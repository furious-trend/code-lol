const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../lib/lessons');
const files = ['beginner-python.ts', 'intermediate-python.ts', 'expert-python.ts', 'interview-python.ts'];

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
        .replace(/def ([^{]+) \{/g, 'def $1:')
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
    return content;
}

for (const file of files) {
    const filePath = path.join(dir, file);
    if (!fs.existsSync(filePath)) continue;
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // We only want to replace within `codeExample: "..."` and `code: "..."`
    // Since this is JS source code for TS, we can use a regex with a replacer function
    
    content = content.replace(/(code(?:Example)?:\s*)(`[^`]+`|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g, (match, prefix, strContent) => {
        return prefix + fixPythonCode(strContent);
    });
    
    fs.writeFileSync(filePath, content);
    console.log('Fixed', file);
}
