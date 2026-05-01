const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch({headless: 'new'});
    const page = await browser.newPage();
    
    console.log("Navigating to Stitch...");
    await page.goto('https://stitch.withgoogle.com/preview/3271576133296630831?node-id=7b0ff00eff5a443ba6241d6307d946b5&raw=1', {waitUntil: 'networkidle2'});
    
    // Wait for a bit
    await new Promise(r => setTimeout(r, 3000));
    
    let html = '';
    
    // Check if there is an iframe
    const frames = page.frames();
    console.log("Frames found:", frames.length);
    
    // Find the child frame that has the actual content
    let targetFrame = frames.find(f => f.url().includes('app-companion') || f.name() === 'preview-iframe' || f.url().includes('raw=1'));
    
    if (!targetFrame && frames.length > 1) {
        targetFrame = frames[1];
    }
    
    if (targetFrame) {
        console.log("Found target frame:", targetFrame.url());
        html = await targetFrame.content();
    } else {
        console.log("No iframe found, getting main page content");
        html = await page.content();
    }
    
    fs.writeFileSync('final_stitch.html', html);
    await browser.close();
})();
