const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const { getEvents, getGists } = require('./api');
const app = express();

mongoose.connect(process.env.DATABASE_URL, {
	userNewUrlParser: true,
});

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log(`Connected to database`));

const users = ['jsepulvedaco', 'coryhouse', 'shiffman'];
// tomar una lista de usuarios y retornar los 5 eventos más recientes de cada uno

// retornar los 3 gitsd más recientes de cada usuario

app.get('/', async (req, res) => {
	const [events, gists] = await Promise.all([
		getEvents(users),
		getGists(users),
	]);

	res.send({ events, gists });
});

app.listen(process.env.PORT, () =>
	console.log(`Server starting on port ${process.env.PORT}`)
);
