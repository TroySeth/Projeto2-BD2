require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/source/html/index.html');
});

app.post('/', async (req, res) => {
    
});

app.patch('/:id', async (req, res) => {

});

app.delete('/:id', async (req, res) => {

});

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const DB_CODE = process.env.DB_CODE;
mongoose.set('strictQuery', true);
mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_NAME}.${DB_CODE}.mongodb.net/?retryWrites=true&w=majority`)
    .then(() =>{
        console.log('conectou ao MongoDB!');
        app.listen(3000);
        
    })
    .catch((err) => console.log(err));
