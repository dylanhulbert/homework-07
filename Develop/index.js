const fs = require("fs");
const util = require("util");
const inquirer = require("inquirer");
const api = require("./utils/api.js");
const generateMarkdown = require("./utils/generateMarkdown.js");

const writeFileAsync = util.promisify(fs.writeFile)

function askUser() {
	return inquirer.prompt([
		{
			type: "input",
			message: "What is your github username?",
			name: "accountname"
		},
		{
			type: "input",
			message: "What is the name of the project repository?",
			name: "title"
		},
		{
			type: "input",
			message: "Desribe your project.",
			name: "description"
		},
		{
			type: "input",
			message: "How do you install this project?",
			name: "install"
		},
		{
			type: "input",
			message: "How do you use this project?",
			name: "use"
		},
		{
			type: "input",
			message: "What license is used for this project?:",
			name: "license"
		},
		{
			type: "input",
			message: "How is this project tested?",
			name: "test"
		},
		{
			type: "input",
			message: "Lastly, how can someone contribute to this project?",
			name: "contribute"
		},
	]);
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
async function init() {
	try {
		const readmefile = await askUser();
		await api.getUser(readmefile.accountname).then(function (result) {
			readmefile.image = result.data.avatar_url;
			readmefile.name = result.data.name;
			readmefile.email = result.data.email
		});
		const mdfile = generateMarkdown(readmefile);
		await writeFileAsync("output/README.md", mdfile);
		console.log("README.md created");
	} catch (err) {
		console.log("Error: " + err);
	}
}

init();