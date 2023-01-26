const puppeteer = require ('puppeteer-extra');
const pluginStealth = require ('puppeteer-extra-plugin-stealth');
const {executablePath, ElementHandle} = require ('puppeteer');

const url = 'https://www.indeed.com/';
const searchTerm = 'javascript';


puppeteer.use(pluginStealth());

puppeteer.launch({ headless:false, executablePath: executablePath() }).then(async browser => { 

    // Create a new page 
    const page = await browser.newPage();

    // Go to the website 
    await page.goto(url);

    // Wait for security check 
    await page.waitForTimeout(1000); 

    await page.type('#text-input-what', searchTerm); //type into search bar
    await page.click('.yosegi-InlineWhatWhere-primaryButton'); // click search button
    await page.waitForTimeout(1000)
    await page.click('#filter-dateposted') //click date filter
    await page.click('#filter-dateposted-menu > li:nth-child(1) > a') //click 24 hours on date filter
    await page.waitForTimeout(1000)


    const getNumberOfJobs = await page.evaluate(() => {
        const element = document.querySelector(".jobsearch-JobCountAndSortPane-jobCount span").innerText;
        let jobsNumber = element.replace(/[^0-9]/g, '');
        return jobsNumber;

    });
    console.log(getNumberOfJobs)
    
	await browser.close(); 
});
