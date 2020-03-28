function generateMarkdown(readme) {
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
**PHOTO**
<br/>Contact me if you have any questions.
<br/>**NAME**
<br/>**EMAIL**
`;
}

module.exports = generateMarkdown;