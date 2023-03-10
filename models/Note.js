const { ObjectID } = require('bson');
const mongoose = require('mongoose');
const {Schema} = mongoose;
const date = new Date();

// Definindo o model das notas
const noteSchema = mongoose.Schema({
    title: String,
    content: String,
    date: {type: Date, default: date},
    marker: String
});

noteSchema.index(
    { title: 'text', content: 'text'}, { weights: { title: 2, content: 1}}
)

// Definindo a collection
const Note = mongoose.model('Note', noteSchema);

module.exports = {Note};