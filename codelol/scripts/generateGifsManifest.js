const fs = require('fs');
const path = require('path');

function getGifsInDir(dirPath) {
  try {
    const fullPath = path.join(process.cwd(), 'public', dirPath);
    if (!fs.existsSync(fullPath)) return [];
    
    return fs.readdirSync(fullPath)
      .filter(file => file.endsWith('.gif') || file.endsWith('.mp4'))
      .map(file => `/${dirPath}/${file}`);
  } catch (err) {
    console.error(`Error reading ${dirPath}:`, err);
    return [];
  }
}

const manifest = {
  general: {
    right: getGifsInDir('gifs/general/right'),
    wrong: getGifsInDir('gifs/general/wrong')
  },
  tamil: {
    right: getGifsInDir('gifs/tamil/right'),
    wrong: getGifsInDir('gifs/tamil/wrong')
  }
};

const outputPath = path.join(process.cwd(), 'lib', 'gifManifest.json');
fs.writeFileSync(outputPath, JSON.stringify(manifest, null, 2));

console.log(`✅ Generated gifManifest.json for Humor Engine.`);
