const express = require('express');
const app = express();
const db = require('./db/db');
const {handlebars, engine} = require('express-handlebars');
const noteController = require('./controllers/noteController');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

db.Connect();

// Handlebars
app.engine('handlebars', engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Routes
const routes = require('./routes/routes');
app.use('/', routes);

app.get('/', async(req, res) => {
    res.render('partials/initial');
});

app.patch('/:id', async (req, res) => {
});

app.delete('/:id', async (req, res) => {
});

app.listen(3000, function(){
    console.log("App running on port 3000");
});