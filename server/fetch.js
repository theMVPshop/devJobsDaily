const puppeteer = require ('puppeteer-extra');
const pluginStealth = require ('puppeteer-extra-plugin-stealth');
const {executablePath, ElementHandle} = require ('puppeteer');
const axios = require ('axios');

const experience = 'ENTRY_LEVEL'; // MID_LEVEL, SENIOR_LEVEL
const location = 'austin';
const remote = ''; //attr%28DSQF7%29 <----add for remote
const searchTerm = 'javascript';
const last24H = '&fromage=1';
const url = `https://www.indeed.com/jobs?q=${searchTerm}&l=${location}&sc=0kf%3A${remote}explvl%28${experience}%29%3B&radius=50${last24H}&vjk=2b9775de01edc6d0`;

puppeteer.use(pluginStealth());

puppeteer.launch({ headless:false, executablePath: executablePath() }).then(async browser => { 

    // Create a new page 
    const page = await browser.newPage();

    // Go to the website 
    await page.goto(url);

    // Wait for security check 
    await page.waitForTimeout(1000); 

    const getNumberOfJobs = await page.evaluate(() => {
        const element = document.querySelector(".jobsearch-JobCountAndSortPane-jobCount span").innerText;
        let jobsNumber = element.replace(/[^0-9]/g, '');
        return jobsNumber;

    });
    console.log(getNumberOfJobs)

    //axios request
    // const res = await axios.post('', {
    //     jobCount: getNumberOfJobs });
    //     console.log(res.data)
    
	await browser.close(); 
});