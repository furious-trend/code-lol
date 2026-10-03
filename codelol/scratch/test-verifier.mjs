import puppeteer from 'puppeteer';

(async () => {
  console.log("Launching browser for Verifier test...");
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  
  // 1. Go to project page
  console.log("Navigating to virtual-pet-rock...");
  await page.goto('http://localhost:3002/projects/virtual-pet-rock', { waitUntil: 'networkidle0' });
  
  // 2. Click Check My Work immediately (should fail)
  console.log("Clicking Check My Work with starter code...");
  await page.click('button:has-text("Check My Work"), button'); // find button with Check My Work or fallback to first button
  
  // Wait a bit for execution
  await new Promise(r => setTimeout(r, 2000));
  
  // Check results - we should see red text or missing checks
  let checksText = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.rounded-xl.border')).map(el => el.textContent);
  });
  console.log("Results with starter code:");
  console.log(checksText);
  
  // 3. Inject correct code!
  console.log("Injecting correct code...");
  // Monaco editor is hard to type in via puppeteer natively without proper focus, so we'll just evaluate setting the state, or we can just append it to the document if we can't easily manipulate monaco. 
  // Actually, monaco provides an API, but it might be easier to just type into the textarea that monaco uses.
  await page.click('.monaco-editor');
  await page.keyboard.down('Control');
  await page.keyboard.press('a');
  await page.keyboard.up('Control');
  await page.keyboard.press('Backspace');
  await page.keyboard.type(`document.body.innerHTML = '<div id="rock">🪨</div>'; function feedPet() {}`);
  
  // 4. Click Check My Work again
  console.log("Clicking Check My Work with correct code...");
  // Re-fetch button just in case
  const buttons = await page.$$('button');
  for (let btn of buttons) {
    const text = await page.evaluate(el => el.textContent, btn);
    if (text === 'Check My Work') {
      await btn.click();
    }
  }
  
  await new Promise(r => setTimeout(r, 2000));
  
  checksText = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.rounded-xl.border')).map(el => {
      const text = el.textContent || '';
      const isGreen = el.className.includes('bg-green-500');
      return isGreen ? `[PASS] ${text}` : `[FAIL] ${text}`;
    });
  });
  console.log("Results with correct code:");
  console.log(checksText);
  
  await browser.close();
  console.log("Done.");
})();
