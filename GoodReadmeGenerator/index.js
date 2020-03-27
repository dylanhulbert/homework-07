
const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

promptUser()
  .then(function(readme) {
    const html = generateReadme(readme);

    return writeFileAsync("output/README.md", html);
  })
  .then(function() {
    console.log("Successfully created your README.md file!");
  })
  .catch(function(err) {
    console.log(err);
  });

function promptUser() {
  return inquirer.prompt([ 
    {
      type: "input",
      name: "userName",
      message: "What is your github user name?"
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
  ]);
}

function generateReadme(readme) {
  return `# ${readme.projectName}
![Most recent commit](https://img.shields.io/github/last-commit/${readme.userName}/${readme.projectName})
## Description
${readme.description}
## Table of Contents
* [Installation](##Installation)
* [Usage](##Usage)
* [License](##License)
* [Contributing](##Contributing)
* [Tests](##Tests)
## Installation
${readme.installation}
## Usage
${readme.usage}
## License
${readme.license}
## Contributing
${readme.contributing}
## Test
${readme.test}
## Support
PHOTO GOES HERE
* ${readme.userName}
* ${readme.userEmail}
`;
}