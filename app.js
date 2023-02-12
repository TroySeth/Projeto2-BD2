const express = require('express');
const app = express();
const db = require('./db/db');
const {handlebars, engine} = require('express-handlebars');
const noteController = require('./controllers/noteController');
const cookieParser = require('cookie-parser');

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(express.static(__dirname));
app.use(cookieParser());

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