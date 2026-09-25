import puppeteer from 'puppeteer';

(async () => {
  console.log("Launching browser...");
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  
  // 1. Landing page loads with no console errors
  console.log("1. Checking Landing Page...");
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });
  
  await page.goto('https://code-lol-three.vercel.app/', { waitUntil: 'networkidle2' });
  console.log(`Landing page loaded. Console errors: ${errors.length}`);
  if (errors.length > 0) {
    console.log(errors);
  }

  // 2/3. Login with username/email and password
  console.log("3. Logging in...");
  await page.goto('https://code-lol-three.vercel.app/login', { waitUntil: 'networkidle2' });
  
  await page.type('input[type="text"]', 'shafiq'); // Wait, login form has email usually, but user says username+password AND email+password. Let's try typing in the first input.
  await page.type('input[type="password"]', 'Shafiqahmed1@2#34');
  
  // Submit
  await page.keyboard.press('Enter');
  await page.waitForNavigation({ waitUntil: 'networkidle2' });
  
  console.log(`Current URL after login: ${page.url()}`);
  
  // 4. Learn Mode
  console.log("4. Checking Learn Mode...");
  await page.goto('https://code-lol-three.vercel.app/learn', { waitUntil: 'networkidle2' });
  // check if there's an open lesson button
  const lessonLinks = await page.$$('a[href^="/learn/"]');
  console.log(`Found ${lessonLinks.length} lessons`);
  if (lessonLinks.length > 0) {
    await lessonLinks[0].click();
    await page.waitForNavigation({ waitUntil: 'networkidle2' });
    console.log(`Opened lesson: ${page.url()}`);
  }

  // 5. Problems page
  console.log("5. Checking Problems page...");
  await page.goto('https://code-lol-three.vercel.app/problems', { waitUntil: 'networkidle2' });
  const problemLinks = await page.$$('a[href^="/problems/"]');
  console.log(`Found ${problemLinks.length} problems`);
  if (problemLinks.length > 0) {
    await problemLinks[0].click();
    await page.waitForNavigation({ waitUntil: 'networkidle2' });
    console.log(`Opened problem: ${page.url()}`);
    
    // Check submit button
    const submitBtn = await page.$('button'); // wait, need to find the specific submit button
    // Let's just screenshot it for now.
    await page.screenshot({ path: 'problem.png' });
  }

  await browser.close();
  console.log("Done.");
})();
