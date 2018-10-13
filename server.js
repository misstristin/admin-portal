// Dependencies
var express = require("express");
var mongojs = require("mongojs");
var bodyParser = require('body-parser');

var PORT = 3001;
var app = express();

// set the app up with bodyparser
app.use(bodyParser());

// Database configuration
var databaseUrl = "admin_portal_db";
var collections = ["users"];

// Hook mongojs config to db variable
var db = mongojs(databaseUrl , collections);

// Log any mongojs errors to console
db.on("error", function(error) {
  console.log("Database Error:", error);
});


/*
  if we don't do this here then we'll get this error in apps that use this api

  Fetch API cannot load No 'Access-Control-Allow-Origin' header is present on the requested resource.
  Origin is therefore not allowed access. 
  If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
  allow the api to be accessed by other apps

*/

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
    next();
  });


app.get('/', function(req, res){
	res.sendfile('public/index.html');
});

// Listen on port 3001
app.listen(PORT, function() {
console.log('Now listening on PORT %s! Visit http://localhost:%s in your browser!', PORT, PORT);
});

