const { Octokit } = require('@octokit/core');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const octokit = new Octokit({
	auth: 'bbadf42b0ed62f2ca9d454fa28dfeb80e13eff9a',
}); // cambiar por algo más seguro

const app = express();

mongoose.connect(process.env.DATABASE_URL, {
	userNewUrlParser: true,
});
const db = mongoose.connection;
db.on('error', (error) => console.erro(error));
db.once('open', () => console.log(`Connected to database`));

const PORT = process.env.PORT;

const users = ['jsepulvedaco', 'coryhouse', 'shiffman'];
// tomar una lista de usuarios y retornar los 5 eventos más recientes de cada uno

// retornar los 3 gitsd más recientes de cada usuario
/*
const events = users.map((user) => {
	return octokit.request('GET /users/{user}/events', { user });
});

const gists = users.map((user) => {
	return octokit.request('GET /users/{user}/gists', { user });
});

Promise.all(events).then((eventsList) => {
	// eventsList.forEach((e) => console.log(e.data, '\n----------------------\n'));
});

Promise.all(gists).then((gistsList) => {
	gistsList.forEach((e) => console.log(e.data, '\n----------------------\n'));
});

*/

app.get('/', (req, res) => {
	res.send('hello world');
});

app.listen(PORT, () => console.log(`Server starting on port ${PORT}`));
