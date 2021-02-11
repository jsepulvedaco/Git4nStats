const app = require('./app');
require('dotenv').config();

app.listen(process.env.PORT, () =>
	console.log(`Server starting on port ${process.env.PORT}`)
);
