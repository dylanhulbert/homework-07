
const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const generateMarkdown = require("generateMarkdown.js");
const api = require("api.js");

const writeFileAsync = util.promisify(fs.writeFile);

const questions = [
  {
    type: "input",
    name: "userName",
    message: "What is your github username?"
  },
  {
    type: "input",
    name: "userEmail",
    message: "What is your email address?"
  },
  {
    type: "input",
    name: "projectName",
    message: "What is the name of your project (repository)?"
  },
  {
    type: "input",
    name: "description",
    message: "Describe your project."
  },
  {
    type: "input",
    name: "installation",
    message: "Describe how to install your project?"
  },
  {
    type: "input",
    name: "usage",
    message: "How do you use this project?"
  },
  {
    type: "input",
    name: "license",
    message: "What type of license does this project use?"
  },
  {
    type: "input",
    name: "test",
    message: "How is it tested?"
  },
  {
    type: "input",
    name: "contributing",
    message: "Lastly, how can someone contribute?"
  }
];

function writeToFile(fileName, data) {
    const readMe = generateMarkdown(data);
    return writeFileAsync(fileName, readMe)
}

function init() {
    inquirer.prompt(questions)
        .then((data) => {
            api.getUser(data.username).then(function (gitRes) {
                let newData = Object.assign(data, gitRes);
                console.log(newData);
                writeToFile("README.md", newData)
            });
        });
};
init();