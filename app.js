require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const { getEvents, getGists } = require('./service');
const Event = require('./models/Event');
const Gist = require('./models/Gist');

const { transformGistsData, transformEventsData } = require('./helpers');

mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log(`Connected to database`));

const app = express();
app.use(express.json());

app.post('/', async (req, res) => {
	const users = req.body.users;

	try {
		const [events, gists] = await Promise.all([
			getEvents(users),
			getGists(users),
		]);

		/** {
		 * 		username: username
		 * 		gists: []
		 * } */
		const gistsToSave = transformGistsData(users, gists);

		gistsToSave.forEach(async (g) => {
			let gist = new Gist(g);
			await gist.save();
		});

		/** {
		 * 		username: username
		 * 		events: {id1: {}, id2: {}}
		 * } */
		const eventsToSave = transformEventsData(users, events);

		eventsToSave.forEach(async (e) => {
			let event = new Event(e);
			await event.save();
		});

		res.send({ events: eventsToSave, gists: gistsToSave });
	} catch (e) {
		console.error(e);
		res
			.status(500)
			.json({ message: 'an error has occurred fetching the data' });
	}
});

module.exports = app;
