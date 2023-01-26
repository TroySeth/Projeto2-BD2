const mongoose = require('mongoose')

const Note = mongoose.model('Note', {
    title: String,
    content: String,
})

module.exports = Note