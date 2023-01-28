const mongoose = require('mongoose');
const {Schema} = mongoose;

// Definindo o model
const noteSchema = mongoose.Schema({
    title: String,
    content: String,
}, {timestamps: true});

// Definindo a collection
const Note = mongoose.model('Note', noteSchema);

module.exports = {Note};