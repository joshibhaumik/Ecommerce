const mongoose = require('mongoose');
const vegetableSchema = require('./items');
module.exports = mongoose.model('Vegetable', vegetableSchema);