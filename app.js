const express = require('express');
const db = require('./db/db');
/*const noteRoutes = require('./routes/noteRoutes');*/
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));
/*app.use('/note', noteRoutes);*/

app.get('/', async(req, res) => {
    res.sendFile(__dirname + '/source/html/index.html');
});

app.patch('/:id', async (req, res) => {
});

app.delete('/:id', async (req, res) => {
});

db.Connect();

app.listen(3000, function(){
    console.log("App running on port 3000");
})    