const express = require('express');
const app = express();
const puppeteer = require('puppeteer-extra');
const pluginStealth = require('puppeteer-extra-plugin-stealth');
const {executablePath} = require('puppeteer');
const dotenv = require('dotenv');

require('dotenv').config();
puppeteer.use(pluginStealth());

const launchOptions = {headless: true, executablePath: executablePath()};

app.use(express.json());
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Welcome to the job scraper');
});

async function getJobData(searchTerm, location, remote, experience, last24H) {
  const url = `https://www.indeed.com/jobs?q=${searchTerm}&l=${location}&sc=0kf%3A${remote}explvl%28${experience}%29%3B&radius=50${last24H}&vjk=2b9775de01edc6d0`;

  try {
      const browser = await puppeteer.launch(launchOptions);
      const page = await browser.newPage();
    
      await page.goto(url);
      await page.waitForTimeout(1000);
    
      const numberOfJobs = await page.evaluate(() => {
        const element = document.querySelector(".jobsearch-JobCountAndSortPane-jobCount span").innerText;
        let jobsNumber = element.replace(/[^0-9]/g, '');
        return jobsNumber;
      });
    
      await browser.close();
      return { numberOfJobs, timeStamp: new Date().toLocaleString() };
  } catch (error) {
      console.error(`Error scraping data: ${error}`);
      throw error;
  }
}

app.get('/jobData', async (req, res) => {
  const resultArray = [];

  const searchTerm = req.query.searchTerm || 'javascript';
  const location = req.query.location || 'austin';
  const remote = process.env.REMOTE || 'attr%28DSQF7%29'; //use empty space for non-remote
  const experience = process.env.EXPERIENCE || 'ENTRY_LEVEL'; //MID_LEVEL //SENIOR_LEVEL
  const last24H = req.query.last24H || '&fromage=1';

  const { numberOfJobs, timeStamp } = await getJobData(searchTerm, location, remote, experience, last24H);

  const uniqueIdentifier = 1;
  const data = {
    ModifiedDate: timeStamp,
    CreatedDate: timeStamp,
    CreatedBy: 'admin_user_learningcareers_test',
    jobValue: numberOfJobs,
    searchId: 1,
    searchDate: timeStamp,
    id: uniqueIdentifier
  };

  resultArray.push(data);

  res.send({
    response: {
      results: resultArray,
    }
  });
});

app.listen(port, () => {
  console.log(`Web server is listening on port ${port}!`);
});
  
  
  