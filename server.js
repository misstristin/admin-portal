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

// Code for JSON web tokens
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

// just to see the mongo
//GET http://localhost:3001/users
app.get('/users', function(req, res){
	db.users.find({}, function(error, result){
	    res.json(result);
	});
});

// just to see the mongo
//GET http://localhost:3001/posts
app.get('/posts', function(req, res){
	db.posts.find({}, function(error, result){
	    res.json(result);
	});
});

// gets data on one user
//GET http://localhost:3001/users/username
app.get('/users/:username', function(req, res){
	db.users.findOne({
        username: req.params.username
    }, function(error, result){
        res.json(result);
	});
});

// Add new profile pic
//POST http://localhost:3001/addProfilePic/username
app.post('/newImage/:username', function(req, res){

	db.users.findAndModify({
		query: {"username": req.params.username },
		update: { $set: { "image": req.body.image },
        new: true }, 
        function (err, editedPic) {
				res.json(editedPic);
            }});
        });


// Sign up
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
                  area: req.body.area,
                  image: req.body.image
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

// Login
//POST http://localhost:3001/login
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

// Adds a post to the feed
//POST http://localhost:3001/add
app.post('/add', function(req, res){
    db.posts.insert({
        title: req.body.title,
        content: req.body.content,
        category: req.body.category,
        username: req.body.username,
        timeStamp: req.body.timeStamp,
        likes: req.body.likes,
        commentCount: req.body.commentCount,
        comments: req.body.comments,
        addLink: req.body.addLink,
        addImage: req.body.addImage
    }, function(error, addedPost){
        //log any errors
        if (error){
            res.send(error);
            alert(error);
        }else {
            res.json({ addedPost });
            console.log(addedPost);
            
        }
    })
});

// Adds a like to a post
//POST http://localhost:3001/addLike/:id/:currentlikes
app.post('/addLike/:id/:currentlikes', function(req, res){

    db.posts.findAndModify({
        query: {
            "_id" : mongojs.ObjectId(req.params.id)
        },
        update: { $set: { "likes" : req.params.currentlikes + 1
        },
        new: true
        }, function (err, addedLike) {
            res.json(addedLike);
        }});
});

// app.post('/pets/update/:id', function(req, res){
// 	//curl -X POST http://localhost:3001/pets/5bb2de27c385cb3290b0e598

// 	db.pets.findAndModify({
// 		query: {
// 			"_id": mongojs.ObjectId(req.params.id)
// 		},
// 		update: { $set: {
// 			"name": req.body.name,
// 			"type": req.body.type}
// 		},
// 		new: true
// 		}, function (err, editedPet) {
// 				res.json(editedPet);
// 		});
// });

// Adds a comment to a post
//POST http://localhost:3001/addComment/:id
// app.post('/addComment/:id', function(req, res){
//     db.posts.findAndModify({
// 		query: {"_id" : ObjectId(req.params.id),
// 		update: { $set: { 
//             "comment" : 
//             { "content" : req.body.content,
//             "commentAuthor" : req.body.username,
//             "timeStamp" : req.body.timeStamp},
//         new: true }}, 
//         function (err, editedPic) {
//                 res.json(editedPic);
//         }
//     })
// });
// Posts API
//GETS http://localhost:3001/posts/:category
app.get('/posts/:category', function(req, res){
	db.posts.find({ category : req.params.category }).sort({ timeStamp : -1}, function(error, result){
	    res.json(result);
	})
});

// renders index
app.get('/', function(req, res){
	res.sendfile('public/index.html');
});

// Listen on port 3001
app.listen(PORT, function() {
console.log('Now listening on PORT %s! Visit http://localhost:%s in your browser!', PORT, PORT);
});

