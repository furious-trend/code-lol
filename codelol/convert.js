const ffmpeg = require('fluent-ffmpeg');
const ffmpegStatic = require('ffmpeg-static');
const path = require('path');
const fs = require('fs');

ffmpeg.setFfmpegPath(ffmpegStatic);

const dir = path.join(__dirname, 'public/sounds/tamil/right');
const files = fs.readdirSync(dir);

files.forEach(file => {
  if (file.endsWith('.webm')) {
    const inputPath = path.join(dir, file);
    const outputPath = path.join(dir, file.replace('.webm', '.mp3'));
    
    console.log(`Converting ${file}...`);
    
    ffmpeg(inputPath)
      .toFormat('mp3')
      .on('end', () => {
        console.log(`Finished converting ${file}`);
        fs.unlinkSync(inputPath); // Remove the original webm file
      })
      .on('error', (err) => {
        console.error(`Error converting ${file}: ${err.message}`);
      })
      .save(outputPath);
  }
});
