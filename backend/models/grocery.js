const mongoose = require('mongoose');
const grocerySchema = require('./items');
module.exports = mongoose.model('Grocery', grocerySchema);