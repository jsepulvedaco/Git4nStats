const mongoose = require('mongoose');

const gistSchema = new mongoose.Schema({}, { strict: false });

module.exports = mongoose.model('Gist', gistSchema);
