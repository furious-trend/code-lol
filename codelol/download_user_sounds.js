const youtubedl = require('youtube-dl-exec');
const path = require('path');
const fs = require('fs');

const urls = [
  "https://tamilsoundboard.com/share/227",
  "https://tamilsoundboard.com/share/168",
  "https://tamilsoundboard.com/share/165",
  "https://mobcup.fm/ringtone/jana-nayagan-thalapathy-kacheri-song-bgm-79m4mwVm",
  "https://mobcup.fm/ringtone/powerhouse-coolie-oTxTYZm4",
  "https://mobcup.fm/ringtone/sandakozhi-the-glow-of-angel-bgm-rvmw5SZW",
  "https://mobcup.fm/ringtone/pa-da-ni-ga-re-sa-re-ni-sa-raga-of-revenge-dc-movie-rrk8SCo9"
];

const outDir = path.join(__dirname, 'public', 'sounds', 'tamil');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function downloadAll() {
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    console.log(`Downloading ${url}...`);
    try {
      await youtubedl(url, {
        extractAudio: true,
        audioFormat: 'mp3',
        output: path.join(outDir, `user_sound_${i}.%(ext)s`),
      });
      console.log(`Successfully downloaded ${url}`);
    } catch (e) {
      console.error(`Failed to download ${url}: ${e.message}`);
    }
  }
}

downloadAll();
