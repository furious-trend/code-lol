const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'lib/lessons');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts') && f !== 'types.ts' && f !== 'index.ts');

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace funnyExplanation: "..." with funnyExplanationGeneral: "...", funnyExplanationTamil: "..."
  content = content.replace(/funnyExplanation:\s*("([^"\\]|\\.)*"),/g, (match, p1) => {
    return `funnyExplanationGeneral: ${p1},\n    funnyExplanationTamil: ${p1},`;
  });
  
  fs.writeFileSync(filePath, content);
  console.log(`Updated ${file}`);
});
