var express = require('express');
var jwt = require('express-jwt');
var router = express.Router();

// Middleware for authenticating jwt tokens
// The userPropery option specifies which property on req to put our payload from our tokens. By default it's set on user, but we're using payload instead to avoid any conflicts with passport (it shouldn't be an issue since we aren't using both methods of authentication in the same request). This also avoids confusion since the payload isn't an instance of our User model. Make sure to use the same secret as the one in models/User.js for authenticating tokens. Again, we're hard-coding the token in this example, but it is strongly recommended that you use an environment variable for referencing your secret.

var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

// First, we need to make sure that mongoose is imported and that we have handles to the Post and Comment models. Then we use the express get() method to define the URL for the route (/posts) and a function to handle the request. Inside our request handler, we query the database for all posts. If an error occurred, we pass the error to an error handling function, otherwise we use res.json() to send the retrieved posts back to the client in json format.

var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');

var passport = require('passport');
var User = mongoose.model('User');

// Route to register a new user
router.post('/register', function(req, res, next){
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  var user = new User();

  user.username = req.body.username;

  user.setPassword(req.body.password)

  user.save(function (err){
    if(err){ return next(err); }

    return res.json({token: user.generateJWT()})
  });
});

// Route that authenticates the user and returns a token to the client
router.post('/login', function(req, res, next){
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  passport.authenticate('local', function(err, user, info){
    if(err){ return next(err); }

    if(user){
      return res.json({token: user.generateJWT()});
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
});

// Route to retrieve all posts
router.get('/posts', function(req, res, next) {
    Post.find(function(err, posts) {
        if( err ) { return next(err); }
        res.json(posts);
    });
});

// Route to create a post. Note that the post in router.post refers to the http post method and not our new posts.

// We can use the 'auth' middleware we defined to require authentication on specific routes. In our case, we'd want to authenticate users whenever they try to write to our application

router.post('/posts', auth, function(req, res, next) {

    // use mongoose to create a new post object in memory before saving it to the database.
    var post = new Post(req.body);

    // since we're authenticating with JWT tokens, we can get the username directly from the token's payload for associating the authors with their posts (and comments). This saves us a trip to the database.

    post.author = req.payload.username;

    post.save(function(err, post) {
        if( err ) { return next(err); }
        res.json(post);
    });
});

// can test the new routes using the cURL command line untility:
// curl --data 'title=test&link=http://test.com' http://localhost:3000/posts
// and then curl http://localhost:3000/posts
// be sure to restart your server first or you will get a 404 error


// the remaining routes we need to implement all require us to load a post object by ID (the ID of the specific post). Rather than replicating the same code across several different request handler functions, we can use Express's param() function to automatically load an object.

// Preload post objects on routes with ':post'
router.param('post', function(req, res, next, id) {
    var query = Post.findById(id);

    query.exec(function(err, post) {
        if( err ) { return next(err); }
        if(!post) { return next(new Error('cannot find post')); }

        req.post = post;
        return next();
    });
});

// above - we are using mongoose's query interface which simply provides a more flexible way of interacting with the database. Now when we define a route URL with :post in it, this function will be run first. Assuming the :post parameter contains an ID, our function will retrieve the post object from the database and attach it to the req object after which the route handler function will be called.

// Route to return a single post
router.get('/posts/:post', function(req, res, next) {  //
    req.post.populate('comments', function(err, post) { // Use the populate() function to retrieve comments along with posts
        res.json(post);
    });
});

// Route to upvote a post
router.put('/posts/:post/upvote', auth, function(req, res, next) {
    req.post.upvote(function(err, post) {
        if( err ) { return next(err); }
        res.json(post);
    });
});

// Route to create comments for a particular post
router.post('/posts/:post/comments', auth, function(req, res, next) {
    var comment = new Comment(req.body);
    comment.post = req.post;  //  attaching a reference to the new comment that refers to our post object.

    comment.author = req.payload.username;

    comment.save(function(err, comment) {
        if( err ) { return next(err); }

        req.post.comments.push(comment);
        req.post.save(function(err, post) {
            if( err ) {return next(err); }
            res.json(comment);
        });
    });
});

// Use Express param middleware function to reteive comments specified by the :comment route parameter.
// Preload comment objects on routes with ':comment'
router.param('comment', function(req, res, next, id) {
    var query = Comment.findById(id);

    query.exec(function(err, comment) {
        if( err ) { return next(err); }
        if(!comment) { return next(new Error('cannot find any comments')); }

        req.comment = comment;
        return next();
    });
});

// Route to upvote a comment
router.put('/posts/:post/comments/:comment/upvote', auth, function(req, res, next) {
    req.comment.upvoteComment(function(err, comment) {
        if( err ) { return next(err); }
        res.json(comment);
    });
});


module.exports = router;
