const express = require('express');
const app = express();
const db = require('./db/db');
const {handlebars, engine} = require('express-handlebars');
const noteController = require('./controllers/noteController');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Connecting to the database
db.Connect();

// Handlebars
app.engine('handlebars', engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Using routes
const routes = require('./routes/routes');
app.use('/', routes);


app.listen(3000, function(){
    console.log("App running on port 3000");
});