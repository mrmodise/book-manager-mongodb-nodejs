// needed for routes and running the Web server
var express = require('express');
var app = express();
// needed for passing content from views/urls to node
var bodyParser = require('body-parser');
// needed for manipulating the database
var mongoose = require('mongoose');
// get our port and database settings
var secret = require('./secret/secret');
// get our book schema
var Book = require('./models/book');
// get our routes
var homeRoutes = require('./routes/main');
// needed for logging 
var logger = require('morgan');
// needed for the view
var ejs = require('ejs');
var engine = require('ejs-mate');

// establish database connection
mongoose.connect(secret.database, function(err){
	// incase of an error return it
	if(err) throw err;
	console.log("Connected to the database");
})

// middle
app.use(express.static(__dirname + '/public'));
app.use(logger('dev'));
// explicitly stating usage of body-parser
app.use(bodyParser.json());
// allows us to give and use elements through url
app.use(bodyParser.urlencoded({
	extended: true
}));

// define the view
app.engine('ejs', engine);
app.set('view engine', 'ejs');

// use our routes
app.use(homeRoutes);

// setting up the server's listening port
app.listen(secret.port, function(err){
	// incase of an error return it
	if (err) throw err;
	// keep the user aware of the status of the server
	console.log("Server running on port:", secret.port);
});

