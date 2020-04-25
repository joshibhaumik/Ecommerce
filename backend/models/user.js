const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var passportLocalMongoose = require("passport-local-mongoose");
const itemSchema = require('./items');

const userSchema = new Schema({
    firstname : {
        type: String,
        required: true
    },
    lastname : {
        type: String,
        required: true
    },
    email : {
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

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);