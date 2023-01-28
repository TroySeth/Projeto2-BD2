const mongoose = require('mongoose');
const {Schema} = mongoose;
const date = new Date();

// Definindo o model
const noteSchema = mongoose.Schema({
    title: String,
    content: String,
    date: {type: Date, default: date},
});

// Definindo a collection
const Note = mongoose.model('Note', noteSchema);

module.exports = {Note};