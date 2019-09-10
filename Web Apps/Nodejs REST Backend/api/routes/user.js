const express = require('express');
const router = express.Router();

const checkAuth = require('../auth/check-auth');
const UserController = require('../controllers/user');

// will create two routes - signup and sign in.  Don't need a sign out route because we don't store 
// information about the user on the server, becuase rest is stateless, so nothing to "sign out"

// allow a new user to sign up 
router.post('/signup', UserController.user_signup);

// user login
router.post('/login', UserController.user_login);

// delete user
router.delete('/:userId', checkAuth, UserController.user_delete_user);

module.exports = router;