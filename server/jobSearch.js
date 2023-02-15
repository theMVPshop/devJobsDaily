const puppeteer = require('puppeteer-extra');
const pluginStealth = require('puppeteer-extra-plugin-stealth');
const {executablePath} = require('puppeteer');
const dotenv = require('dotenv');
const fetch = require('node-fetch');
const Headers = fetch.Headers;
const FormData = require('form-data');


puppeteer.use(pluginStealth());
const launchOptions = {headless: false, executablePath: executablePath()};

async function getJobData(searchTerm, location, remote, experience, last24H) {
  const url = `https://www.indeed.com/jobs?q=${searchTerm}&l=${location}&sc=0kf%3A${remote}explvl%28${experience}%29%3B&radius=50${last24H}&vjk=2b9775de01edc6d0`;
  console.log(url)
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
      return { numberOfJobs, timeStamp: new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      }) };
  } catch (error) {
      console.log(`Error scraping data: ${error}`);
      throw error;
  }
}

const requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

const experience = 'ENTRY_LEVEL'; //MID_LEVEL SEINOR_LEVEL
const last24H = '&fromage=1';

dotenv.config();
const token = process.env.TOKEN;

//fetch request for search data
fetch('https://learning.careers/version-test/api/1.1/obj/search', requestOptions)
  .then(response => response.json())
  .then(results => {
    console.log(results)
    const searchData = JSON.parse(results);
    searchData.forEach((searchData) => {
      let searchTerm = searchData.term;
      console.log(searchTerm)
      let location = searchData.location;
      console.log(location)
      let remote = searchData.remote;
      let searchId = searchData.searchId;

      if(remote === true) {
        remote = 'attr%28DSQF7%29'; //this is the text needed for remote a job search
      }else {
        remote = '';
      }

      // calls scraper function
      getJobData(searchTerm, location, remote, experience, last24H)
        .then(jobData => {
          const timeStamp = jobData.timeStamp;
          const myHeaders = new Headers();
          myHeaders.append("Authorization", `Bearer ${token}`);

          const formdata = new FormData();
          formdata.append("jobValue", jobData.numberOfJobs);
          formdata.append("searchDate", timeStamp);
          formdata.append("searchId", searchId);

          const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
          };

          //fetch request to post jobData
          fetch("https://learning.careers/version-test/api/1.1/obj/jobData", requestOptions)
            .then(response => response.text())
            .then(result => {
              console.log(result);
            })
            .catch(error => {
              console.log('error', error);
            });
        })
        .catch(error => {
          console.log('error', error);
        });
    })
    .catch(error => {
      console.log('error', error);
  });
})
  
  


//https://learning.careers/version-test/api/1.1/obj/jobData

// entry level, austin,tx, no, javascript

// var myHeaders = new Headers();
// myHeaders.append("Authorization", "Bearer c73a9ca0db409a80227fe46e5a5e3899");

// var formdata = new FormData();
// formdata.append("jobValue", "22");
// formdata.append("searchDate", "Jan 21, 2023 12:00 am\n");
// formdata.append("searchId", "2");

// var requestOptions = {
//   method: 'POST',
//   headers: myHeaders,
//   body: formdata,
//   redirect: 'follow'
// };

// const searchTerm = 'javascript';
// const location = 'austin';
// const remote = 'attr%28DSQF7%29'; 
// const experience = 'ENTRY_LEVEL'; 
// const last24H = '&fromage=1';
//https://learning.careers/version-test/api/1.1/obj/search search address
// const searchTerm = req.query.SEARCHTERM || 'javascript';
// const location = req.query.LOCATION || 'austin';
// const remote = req.query.REMOTE || 'attr%28DSQF7%29'; //use empty space for non-remote
// const experience = req.query.EXPERIENCE || 'ENTRY_LEVEL'; //MID_LEVEL //SENIOR_LEVEL
// const last24H = req.query.LAST24H || '&fromage=1';