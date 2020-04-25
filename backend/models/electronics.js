const mongoose = require('mongoose');
const electronicSchema = require('./items');
module.exports = mongoose.model('Electronic', electronicSchema);