const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({}, { strict: false });

module.exports = mongoose.model('Event', eventSchema);
