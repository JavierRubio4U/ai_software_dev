var mongoose = require('mongoose');
//Need to add authentication plugins, note that crypto module is native to node
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema ({
    username: {type: String, lowercase: true, unique: true},
    //We want to store the user's password. Standard process to store the passwords safely and securely is as follows: 1) you "salt" the password which adds extra characters or string to it and then you hash it. You can then do a number of hash iterations which is essentially hashing the previous hash of the password.
    hash: String,
    salt: String,

    // Here, we are going to give a unique, randomly generated, salt to each user, so every user will have their own salt.
});

// Method to set password for the user. It accepts the password string provided by the user, randomly generates a salt for the password and then hashes the password.
UserSchema.methods.setPassword = function(password) {
    // Generate the random hex salt string for the password
    this.salt = crypto.randomBytes(16).toString('hex');

    // Create the hash using the standard for encryptinig internet password strings. The first number below denotes the number of interations performed on the hashed password. The second number denotes the length of the generated key.
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');
}

// Method to validate the user password upon entry.
UserSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');

    // return a Boolean to determine if they match
    return this.hash === hash;
}

// Generate the JWT token for the user
UserSchema.methods.generateJWT = function() {
    // set token experiation date to 60 days in units of seconds
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    // the jwt method takes two arguments: 1) the payload that is going to actually get "signed" by the jwt and the second one is the "secret" used to sign our tokens.  We are hardcoding the secret here, but best practice is to assign it via environment variables - i.e. one for dev, one for prod.
    return jwt.sign({
        _id: this._id,
        username: this.username,
        exp: parseInt(exp.getTime() / 1000),

    }, 'SECRET');
}

mongoose.model('User', UserSchema);
