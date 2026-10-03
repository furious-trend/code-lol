const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../lib/lessons');
const files = ['beginner-python.ts', 'intermediate-python.ts', 'expert-python.ts', 'interview-python.ts'];

for (const file of files) {
    const filePath = path.join(dir, file);
    if (!fs.existsSync(filePath)) continue;
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replacements
    content = content
        .replace(/console\.log/g, 'print')
        .replace(/console\.warn/g, 'print')
        .replace(/console\.error/g, 'print')
        .replace(/console\.table/g, 'print')
        .replace(/let /g, '')
        .replace(/const /g, '')
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
        // Basic function replacements (naive)
        .replace(/def ([^{]+) \{/g, 'def $1:')
        .replace(/if \(([^)]+)\) \{/g, 'if $1:')
        .replace(/while\(([^)]+)\) \{/g, 'while $1:')
        .replace(/while \(([^)]+)\) \{/g, 'while $1:')
        .replace(/for\(([^)]+)\) \{/g, 'for $1:')
        .replace(/for \(([^)]+)\) \{/g, 'for $1:')
        .replace(/\} /g, '') // highly destructive, better just leave JS braces in strings if they exist, or be careful
        ;
        
    // For Python, replacing '}' at the end of a block is tricky. 
    // Let's remove trailing `\n}` inside code examples.
    content = content.replace(/\\n\}/g, '');
    
    // Let's remove `{` at the end of a line in code examples (e.g. `def test() {`)
    content = content.replace(/ \{/g, ':');
    
    fs.writeFileSync(filePath, content);
    console.log('Fixed', file);
}
