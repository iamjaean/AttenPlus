const mongoose = require('mongoose');
const shortId = require("./types/short-id");

const challengeSchema = new mongoose.Schema({
    shortId,
    imgUrl: {
        type:  String,
        required: true,
    },
    title: {
        type:  String,
        required: true,
    },
    category: {
        type:  String,
        required: true,
    },
    author: {
        type:  String,
        required: true,
    }
})

module.exports = mongoose.model('challenge', challengeSchema);