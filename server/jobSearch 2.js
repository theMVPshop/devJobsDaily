const axios = require('axios');
const express = require('express');
const app = express();
const puppeteer = require('puppeteer-extra');
const pluginStealth = require('puppeteer-extra-plugin-stealth');
const {executablePath} = require('puppeteer');

puppeteer.use(pluginStealth());

app.use(express.json());
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Welcome to the job scraper');
});

let getNumberOfJobs
let timeStamp;
let searchTerm = 'javascript';
let location = 'austin';
let remote = ''; //attr%28DSQF7%29 <----add for remote
let experience = 'ENTRY_LEVEL'; //MID_LEVEL //SENIOR_LEVEL
let last24H = '&fromage=1';

async function scraper(searchTerm, location, remote, experience, last24H) {
    const url = `https://www.indeed.com/jobs?q=${searchTerm}&l=${location}&sc=0kf%3A${remote}explvl%28${experience}%29%3B&radius=50${last24H}&vjk=2b9775de01edc6d0`;

    const browser = await puppeteer.launch({headless: true, executablePath: executablePath()});
    const page = await browser.newPage();
  
    await page.goto(url);
    await page.waitForTimeout(1000);
  
    getNumberOfJobs = await page.evaluate(() => {
      const element = document.querySelector(".jobsearch-JobCountAndSortPane-jobCount span").innerText;
      let jobsNumber = element.replace(/[^0-9]/g, '');
      return jobsNumber;
    });
  
    await browser.close();
    timeStamp = new Date().toLocaleString();
}


app.get('/jobData', async (req, res) => {
  await scraper(searchTerm, location, remote, experience, last24H);

  const uniqueIdentifier = 1
  const data = {
    ModifiedDate: timeStamp,
    CreatedDate: timeStamp,
    CreatedBy: 'admin_user_learningcareers_test',
    jobValue: getNumberOfJobs,
    searchId: 1,
    searchDate: timeStamp,
    id: uniqueIdentifier
  };

  res.send({
    response: {
      results: [data],
    }
  });
});
  
app.listen(port, () => {
    console.log(`Web server is listening on port ${port}!`);
});