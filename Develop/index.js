const inquirer = require("inquirer");
const fs = require("fs");

const api = require('./utils/api.js');
const generateMarkdown = require('./utils/generateMarkdown.js');

// the questions collected into a string
const questions = [
  {
    type: "input",
    name: "userName",
    message: "What is your github username?"
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

// creates the readMe var
function writeToFile(fileName, data) {
    const readMe = generateMarkdown(data);
    return writeFileAsync(fileName, readMe)
}

// this function prompts the user in the order of the question set
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