const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const itemSchema = require('./items');

const userSchema = new Schema({
    firstname = {
        type: String,
        required: true
    },
    lastname = {
        type: String,
        required: true
    },
    Email = {
        type: String,
        required: true
    },
    history:[itemSchema],
    store: [itemSchema],
    hasStore: {
        type: Boolean,
        default: false
    },
    admin: {
        type: Boolean,
        default: false
    }
},{
    timestamps:true
});

module.exports = mongoose.model('User', userSchema);