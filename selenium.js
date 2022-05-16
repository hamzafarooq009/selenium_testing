// This code open chrome new instance with an existing chrome user profile located at /Users/Ishrat/Desktop/ChromeProfile
// Chrome profile must be created and passed as argument to the webdriver to use login information for educative.io
// There is no need to open chrome in debugger mode, hence, we wont need anything of the following sort
// //options.addArguments('debuggerAddress=127.0.0.1:9222');

// Add delay
const TIME_OUT = 20000;

// Importing from Json file
let config = require("./config.json");
let currentAPI = 0;

const { Options } = require("selenium-webdriver/chrome");
const options = new Options();
options.addArguments("--user-data-dir=/Users/Hamza/Desktop/ChromeProfile11");

const webdriver = require("selenium-webdriver"),
  By = webdriver.By,
  until = webdriver.until;

  
const driver = new webdriver.Builder()
  .setChromeOptions(options)
  .forBrowser("chrome")
  .build();

const quit_chrome = () => {
  //console.log("Chrome closed.");
  driver.quit();
};

function quit() {
  //console.log("Quitting chrome...");
  setTimeout(quit_chrome, TIME_OUT);
}

const performAction = async (action) => {
  // Input the element 
  if (action.type == "input") {
    console.log("performAction: performing input action");
    action.input_fields.forEach(async (input) => {
      await driver.wait(until.elementLocated(By.xpath(input.xpath)), 30000);
      await driver.findElement(By.xpath(input.xpath)).sendKeys(input.value);
    });
  }
  // Perform click operation
  else if (action.type == "click") {
    await driver.wait(until.elementLocated(By.xpath(action.click.xpath)), 30000);
    console.log("performAction: performing click action");
    await driver.findElement(By.xpath(action.click.xpath)).click();
  } 
  // Perform compare operation
  else if (action.type == "compare") {    
    await driver.getCurrentUrl().then(url=>{
      console.log("url", url)
    }).then(async ()=>{
      let html = await driver.getPageSource();
      console.log(html.includes(action.compare.html))
    })
  }
};

const performNextAction = async (actions, currentAction) => {
  console.log("performNextAction: requesting action");
  await performAction(actions[currentAction]);
  currentAction++;
  if (currentAction < actions.length)
    await performNextAction( actions, currentAction);
};

const startActions = async (URL, actions) => {
  if (actions.length > 0) {
    console.log("startActions: Opening URL");
    await driver.get(URL);
    await performNextAction(actions, 0);
  }
};

const startSteps = async (steps) => {
  console.log("Steps = ",steps)
  let currentStep = 0
  if (currentStep < steps.length) {
    console.log("startSteps: Started performing steps");
    await startActions(steps[currentStep].URL, steps[currentStep].actions);
    currentStep++;
  }
};

const startTesting = async () => {
  // Iterating over all of the apis
  for (let i = 0; i < config.apis.length; i++) {
    console.log("iteration number: ", i)
    console.log(
      "startTesting: Started testing: " + config.apis[currentAPI].title
    );
    await startSteps(config.apis[i].steps);
  }
};

// Staring the script
startTesting();