import { chromium } from 'playwright';

(async () => {
  try {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    
    const logs = [];
    page.on('console', msg => logs.push(`[${msg.type()}] ${msg.text()}`));
    page.on('pageerror', err => logs.push(`[pageerror] ${err.message}`));
    
    console.log("Connecting...");
    await page.goto('http://localhost:5173');
    await page.waitForTimeout(4000);
    
    console.log("=== LOGS ===");
    logs.forEach(l => console.log(l));
    
    const rootHtml = await page.evaluate(() => document.getElementById('root')?.innerHTML || "NO_ROOT");
    console.log("Root Length:", rootHtml.length);
    
    await browser.close();
  } catch (e) {
    console.error("SCRIPT ERROR:", e.message);
  }
})();
