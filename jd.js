const puppeteer = require('puppeteer');
const CRED = require('./credsJD');

const sleep = async (ms) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res();
    }, ms)
  });
}

const ID = {
  login: '#login',
  pass: '#pass'
};

(async () => {
  const browser = await puppeteer.launch({
    headless: false,executablePath: "C:/Users/SaurabhR/AppData/Local/Google/Chrome SxS/Application/chrome.exe",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  let login = async () => {
    // login
    await page.goto('https://www.jobdiva.com/', {
      waitUntil: 'networkidle2'
    });
    await page.waitForSelector(ID.login);
    console.log(CRED.user);
    console.log(ID.login);
  
    console.log(CRED.user);


    await page.evaluate((text) => { (document.getElementById('login')).value = text; }, "saurabhr@aptask.com");
    await sleep(500);

    await page.evaluate((text) => { (document.getElementById('pass')).value = text; }, "wot67016");
    await sleep(500);

    
    await page.evaluate(()=>document.querySelector('button.btn_login').click())
    await page.waitForNavigation();


    //await page.evaluate(()=>document.querySelector('#11').click())

    await page.goto('https://www2.jobdiva.com/employers/myactivities/workbenchlist.jsp?time=1582054395408', {
      waitUntil: 'networkidle2'
    });

    await sleep(10000);


    await page.goto('https://www2.jobdiva.com/employers/myjobs/hotlistsearch.jsp?ttid=1582054649209&rsetname=HL&req=1&from=1&to=600&hotlistid=3460212&jobid=-1&filter=0&fromRanked=&reRank=&checkid=1&iamresized=0&closeable=1', {
      waitUntil: 'networkidle2'
    });

    await sleep(10000);

  
    console.log("login done");
    //await page.waitForNavigation();

      // get job details
    let jobData = await page.evaluate(() => {
        let job = [];
        // get the job elements
        let jobElms = document.querySelectorAll('TR[bgcolor]');
        
        // get the job data
        jobElms.forEach((jobelement) => {
            let jobJson = {};
            try {
                jobJson.phone = jobelement.querySelector('TD[nowrap]').innerText;
                jobJson.name = jobelement.querySelector('A[onMouseover]').innerText; 
 //                jobJson.summary = jobelement.querySelector('p.job-result-card__snippet').innerText;
 //                jobJson.PostedOn = jobelement.querySelector('time.job-result-card__listdate').innerText;
            }
            catch (err){
            }
            job.push(jobJson);
        });
        return job;
    });
    // console.log(job);
    await browser.close();
    // Writing the jobdata inside a json file
    fs.writeFile("1.json", JSON.stringify(jobData), function(err) {
      if (err) throw err;
      console.log("Saved!");
    });
  }
  await login();
  await page.screenshot({
    path: 'facebook.png'
  });
})();
