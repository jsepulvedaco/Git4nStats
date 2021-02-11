require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const { getEvents, getGists } = require('./api');
const Event = require('./models/Event');
const Gist = require('./models/Gist');

mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log(`Connected to database`));

module.exports = db;

const app = express();
app.use(express.json());

const users = ['jsepulvedaco', 'coryhouse', 'shiffman'];
// tomar una lista de usuarios y retornar los 5 eventos más recientes de cada uno

// retornar los 3 gitsd más recientes de cada usuario

app.get('/', async (req, res) => {
	try {
		const [events, gists] = await Promise.all([
			getEvents(users),
			getGists(users),
		]);

		/** {
		 * 		username: username
		 * 		latestGists: []
		 * } */
		const gistsToSave = users.map((user, i) => {
			let newGistFields = gists[i].data.map((g) => {
				return {
					created_at: g.created_at,
					id: g.id,
					description: g.description,
					url: g.html_url,
				};
			});
			return { username: user, gists: newGistFields };
		});

		gistsToSave.forEach(async (g) => {
			let gist = new Gist(g);
			let newGist = await gist.save();
			// console.log(newGist);
		});

		/** {
		 * 		username: username
		 * 		latestEvents: {id1: {}, id2: {}}
		 * } */
		const eventsToSave = users.map((user, i) => {
			let newEventFields = events[i].data.reduce((initialVal, currentVal) => {
				initialVal[currentVal['id']] = {
					created_at: currentVal.created_at,
					repository: currentVal.repo.name,
					type: currentVal.type,
				};
				return initialVal;
			}, {});
			// console.log(newEventFields);
			return { username: user, events: newEventFields };
		});

		// console.log(eventsToSave);

		await eventsToSave.forEach(async (e) => {
			let event = new Event(e);
			let newEvent = await event.save();
			console.log(newEvent);
		});

		res.send({ events, gists });
	} catch (e) {
		console.error(e);
		res
			.status(500)
			.json({ message: 'an error has occurred fetching the data' });
	}
});

module.exports = app;
