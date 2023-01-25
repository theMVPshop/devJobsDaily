const puppeteer = require ('puppeteer-extra');
const pluginStealth = require ('puppeteer-extra-plugin-stealth');
const {executablePath, ElementHandle} = require ('puppeteer');

puppeteer.use(pluginStealth());

puppeteer.launch({ headless:false, executablePath: executablePath() }).then(async browser => { 

    // Create a new page 
    const page = await browser.newPage();
    const url = 'https://www.indeed.com/';
    const term = 'javascript';

    // Go to the website 
    await page.goto(url);

    // Wait for security check 
    await page.waitForTimeout(1000); 

    await page.type('#text-input-what', term); //type into search bar
    await page.click('.yosegi-InlineWhatWhere-primaryButton'); // click search button
    await page.waitForTimeout(1000)
    await page.click('#filter-dateposted') //click date filter
    await page.click('#filter-dateposted-menu > li:nth-child(1) > a') //click 24 hours on date filter
    await page.waitForTimeout(1000)


    let jobData = [];
    let nextPageButton;

    const newJobData = await page.evaluate((term) => {
        let jobListings = document.querySelectorAll(".jobCard_mainContent");
        let jobArray = [];
        jobListings.forEach(job => {
            let location = job.querySelector(".companyLocation").innerText;
            let jobObject = {location: location, term: term};
            jobArray.push(jobObject);
        });
        return jobArray;
    }, term);
    jobData = [...jobData, ...newJobData]; // add new job data to the existing data
    await page.waitForTimeout(1000);
    console.log(jobData);
    
	await browser.close(); 
});
