const axios = require("axios");
const api = {
	getUser(username) {
		try {
			const queryUrl = `https://api.github.com/users/${username}`;
			return axios.get(queryUrl);
		} catch (err) {
			console.log(err);
		}
	}
};

module.exports = api;
