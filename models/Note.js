const mongoose = require('mongoose');
const {Schema} = mongoose;

const noteSchema = new Schema({
    title: String,
    content: String,
}, {timestamps: true});

const Note = mongoose.model('Note', noteSchema);

module.exports = {Note};