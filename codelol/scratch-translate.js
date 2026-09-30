const fs = require('fs');

const beginner = fs.readFileSync('lib/lessons/beginner.ts', 'utf8');

let py = beginner.replace(/export const beginnerLessons/g, 'export const pythonBeginnerLessons');

// Replace standard JS with Python in code examples
py = py.replace(/console\.log/g, 'print');
py = py.replace(/let /g, '');
// don't remove export const
py = py.replace(/(?<!export )const /g, '');
py = py.replace(/===/g, '==');
py = py.replace(/!==/g, '!=');
py = py.replace(/;/g, '');
py = py.replace(/true/g, 'True');
py = py.replace(/false/g, 'False');
py = py.replace(/function ([a-zA-Z0-9_]+)\((.*?)\) \{/g, 'def $1($2):');
py = py.replace(/\/\/ /g, '# ');
py = py.replace(/typeof /g, 'type(');
py = py.replace(/undefined/g, 'None');
py = py.replace(/null/g, 'None');
py = py.replace(/push\(/g, 'append(');
py = py.replace(/\.length/g, '.__len__()');

// Write out the file
fs.writeFileSync('lib/lessons/beginner-python.ts', py);
console.log('done');
