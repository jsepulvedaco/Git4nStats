const { Octokit } = require('@octokit/core');
require('dotenv').config();

const octokit = new Octokit({
	auth: process.env.TOKEN,
});

module.exports.getEvents = function (users) {
	const eventsPromises = users.map((user) => {
		return octokit.request('GET /users/{user}/events', { user });
	});

	return Promise.all(eventsPromises)
		.then((eventsData) => {
			// eventsList.forEach((e) => console.log(e.data, '\n----------------------\n'));
			return eventsData;
		})
		.catch((e) => {
			console.error('an error occurred while fetching the events');
		});
};

module.exports.getGists = function (users) {
	const gistsPromises = users.map((user) => {
		return octokit.request('GET /users/{user}/gists', { user });
	});

	return Promise.all(gistsPromises)
		.then((gistsData) => {
			// console.log('service gitsts', gistsData);
			// gistsList.forEach((e) => console.log(e.data, '\n----------------------\n'));
			return gistsData;
		})
		.catch((e) => {
			console.error('an error occurred while fetching the gists');
		});
};