const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--disable-web-security', '--disable-features=IsolateOrigins,site-per-process']
    });
    const page = await browser.newPage();
    
    console.log("Navigating to iframe src...");
    await page.goto('https://app-companion-430619.appspot.com/preview/3271576133296630831?node-id=7b0ff00eff5a443ba6241d6307d946b5&raw=1', {waitUntil: 'networkidle0', timeout: 60000});
    
    // Wait for an extra 5 seconds to ensure React or Angular renders the DOM
    await new Promise(r => setTimeout(r, 5000));
    
    const html = await page.content();
    fs.writeFileSync('stitch_iframe.html', html);
    
    console.log("Saved to stitch_iframe.html");
    await browser.close();
})();
