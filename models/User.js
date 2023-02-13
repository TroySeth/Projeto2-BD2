const mongoose = require('mongoose');
const {Schema} = mongoose;
const date = new Date();

const userSchema = mongoose.Schema({
    name: String,
    username: String,
    email: String,
    password: String
})

const user = mongoose.model('user', userSchema);

module.exports = {user};