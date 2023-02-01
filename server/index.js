const express = require('express');
const app = express();
const puppeteer = require('puppeteer-extra');
const pluginStealth = require('puppeteer-extra-plugin-stealth');
const {executablePath} = require('puppeteer');

puppeteer.use(pluginStealth());

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the job scraper');
  });

app.get('/jobs', async (req, res) => {
  const experience = 'ENTRY_LEVEL';
  const location = 'austin';
  const remote = ''; //attr%28DSQF7%29 <----add for remote
  const searchTerm = 'javascript';
  const last24H = '&fromage=1';
  const url = `https://www.indeed.com/jobs?q=${searchTerm}&l=${location}&sc=0kf%3A${remote}explvl%28${experience}%29%3B&radius=50${last24H}&vjk=2b9775de01edc6d0`;

  const browser = await puppeteer.launch({headless: true, executablePath: executablePath()});
  const page = await browser.newPage();

  await page.goto(url);
  await page.waitForTimeout(1000);

  const getNumberOfJobs = await page.evaluate(() => {
    const element = document.querySelector(".jobsearch-JobCountAndSortPane-jobCount span").innerText;
    let jobsNumber = element.replace(/[^0-9]/g, '');
    return jobsNumber;
  });

  await browser.close();
  const timeStamp = new Date().toLocaleString();
  res.send({ time: timeStamp, jobs: getNumberOfJobs });
});

app.listen(3000);