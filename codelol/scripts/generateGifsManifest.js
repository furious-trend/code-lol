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

const happyGifs = getGifsInDir('gifs/happy');
const roastingGifs = getGifsInDir('gifs/roasting');

const manifest = {
  happy: happyGifs,
  roasting: roastingGifs
};

const outputPath = path.join(process.cwd(), 'lib', 'gifManifest.json');
fs.writeFileSync(outputPath, JSON.stringify(manifest, null, 2));

console.log(`✅ Generated gifManifest.json with ${happyGifs.length} happy and ${roastingGifs.length} roasting GIFs.`);
