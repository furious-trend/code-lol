const puppeteer = require('puppeteer');

const urls = [
  "https://tamilsoundboard.com/share/227",
  "https://tamilsoundboard.com/share/168",
  "https://tamilsoundboard.com/share/165",
  "https://mobcup.fm/ringtone/jana-nayagan-thalapathy-kacheri-song-bgm-79m4mwVm?utm_source=share&utm_medium=web&utm_name=list",
  "https://mobcup.fm/ringtone/powerhouse-coolie-oTxTYZm4?utm_source=share&utm_medium=web&utm_name=list",
  "https://mobcup.fm/ringtone/sandakozhi-the-glow-of-angel-bgm-rvmw5SZW?utm_source=share&utm_medium=web&utm_name=list",
  "https://mobcup.fm/ringtone/pa-da-ni-ga-re-sa-re-ni-sa-raga-of-revenge-dc-movie-rrk8SCo9?utm_source=share&utm_medium=web&utm_name=list"
];

async function extractAudio() {
  const browser = await puppeteer.launch({ headless: 'new' });
  for (const url of urls) {
    const page = await browser.newPage();
    try {
      // Listen to all network requests to find media files
      page.on('response', response => {
        const reqUrl = response.url();
        if (reqUrl.endsWith('.mp3') || reqUrl.endsWith('.m4a') || response.headers()['content-type']?.includes('audio/')) {
          console.log(`FOUND AUDIO FOR ${url}: ${reqUrl}`);
        }
      });
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
      // For some sites we might need to click play
      const audioElements = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('audio source, audio')).map(el => el.src).filter(Boolean);
      });
      if (audioElements.length > 0) {
        console.log(`AUDIO TAG FOUND FOR ${url}: ${audioElements[0]}`);
      }
    } catch (e) {
      console.log(`FAILED FOR ${url}: ${e.message}`);
    } finally {
      await page.close();
    }
  }
  await browser.close();
}

extractAudio();
