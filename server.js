// Dependencies
var express = require("express");
var mongojs = require("mongojs");
var bodyParser = require('body-parser');

//for login/logout (authentication)
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

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

// loads the .env file in
require('dotenv').config()
/*
  Gets rid of the following error:

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


  function verifyToken(req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decod) => {
            if (err) {
                res.status(403).json({
                    message: "Wrong Token"
                });
            } else {
                req.decoded = decod;
                next();
            }
        });
    } else {
        res.status(403).json({
            message: "No Token"
        });
    }
}

//GET http://localhost:3001/users
// just to see the mongo
app.get('/users', function(req, res){
	db.users.find({}, function(error, result){
	    res.json(result);
	});
});

app.get('/users/:username', function(req, res){
	db.users.findOne({
        username: req.params.username
    }, function(error, result){
	    res.json(result);
	});
});

//POST http://localhost:3001/signup

app.post('/signup', function(req, res) {
  db.users.findOne({
      username: req.body.username
  }, function(error, result) {
      if (result) return res.status(404).json({ error: 'User already exists.' });

      if (!req.body.password || !req.body.email || !req.body.industry || !req.body.yearsexp) return res.status(401).json({ error: 'Please fill in the form completely.' });

      if (req.body.password.length <= 6) return res.status(401).json({ error: 'Password length must be greater than 6' });

      bcrypt.genSalt(10, function(err, salt) {
          bcrypt.hash(req.body.password, salt, function(err, hash) {
              db.users.insert({
                  username: req.body.username,
                  password: hash,
                  email: req.body.email,
                  industry: req.body.industry,
                  yearsexp: req.body.yearsexp,
                  area: req.body.area
              }, function(error, user) {                  
                  // Log any errors
                  if (error) {
                      res.send(error);
                      alert(error);
                  } else {
                      res.json({
                          user: user,
                          message: 'Successfully signed up!'
                      });
                  }
              });
          });
      });
  });
})

app.post('/login', function(req, res) {
  db.users.findOne({
      username: req.body.username
  }, function(error, result) {
      if (!result) return res.status(404).json({ error: 'user not found' });

      if (!bcrypt.compareSync(req.body.password, result.password)) return res.status(401).json({ error: 'Incorrect Password' });

      var payload = {
          _id: result._id,
          username: result.username
      };

      var token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '4h' });

      return res.json({
          message: 'Successfuly Authenticated',
          token: token
      });
  });
})


app.get('/', function(req, res){
	res.sendfile('public/index.html');
});

// Listen on port 3001
app.listen(PORT, function() {
console.log('Now listening on PORT %s! Visit http://localhost:%s in your browser!', PORT, PORT);
});

