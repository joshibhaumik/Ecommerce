const mongoose = require('mongoose');
const fruitSchema = require('./items');
module.exports = mongoose.model('Fruit', fruitSchema);