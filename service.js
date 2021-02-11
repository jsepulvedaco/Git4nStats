const { Octokit } = require('@octokit/core');
require('dotenv').config();

const octokit = new Octokit({
	auth: process.env.TOKEN,
});

module.exports.getEvents = function (users) {
	const eventsPromises = users.map((user) => {
		return octokit.request('GET /users/{user}/events', { user, per_page: '5' });
	});

	return Promise.all(eventsPromises)
		.then((eventsData) => {
			return eventsData;
		})
		.catch((e) => {
			console.error(e);
		});
};

module.exports.getGists = function (users) {
	const gistsPromises = users.map((user) => {
		return octokit.request('GET /users/{user}/gists', { user, per_page: '3' });
	});

	return Promise.all(gistsPromises)
		.then((gistsData) => {
			return gistsData;
		})
		.catch((e) => {
			console.error(e);
		});
};
