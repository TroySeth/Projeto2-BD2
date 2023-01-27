const express = require('express');
const db = require('./db/db');
/*const noteRoutes = require('./routes/noteRoutes');*/
const app = express();
db.Connect();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Routes
const routes = require('./routes/router');

app.use('/api', routes);

app.get('/', async(req, res) => {
    res.sendFile(__dirname + '/source/html/index.html');
});

app.patch('/:id', async (req, res) => {
});

app.delete('/:id', async (req, res) => {
});

app.listen(3000, function(){
    console.log("App running on port 3000");
})    