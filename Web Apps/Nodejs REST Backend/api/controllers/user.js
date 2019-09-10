const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.user_signup = (req, res, next) => {
    User.find({email: req.body.email}).exec()
    .then(user => {
        // we use the below condition because if you don't find any matching email addresses, 
        // user will not be null, but rather an empty array
        if(user.length >= 1) {  
            return res.status(409).json({
                message: 'Email address already exists'
            });
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {  // 10 is the number of salting rounds
                if( err ) {
                    return res.status(500).json({
                        error: err
                    });
                } else {
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash
                    });
                    user.save()
                    .then(result => {
                        console.log(result);
                        res.status(201).json({
                            message: 'User Created'
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    });
                }            
            });
        }
    });    
}

exports.user_login = (req, res, next) => {
    User.find({ email: req.body.email }).exec()
    .then(user => {
        if( user.length < 1 ) {
            return res.status(401).json({
                message: 'Authorization Failed'
            });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {  // third parameter is a callback fnc
            if(err) {
                return res.status(401).json({
                    message: 'Authorization Failed'
                });
            }
            if(result) {  // for the bcrypt compare function, result is a boolean
                const token = jwt.sign(
                    {
                        email: user[0].email,
                        userId: user[0]._id
                    },
                    'process.env.JWT_KEY',
                    {
                        expiresIn: "1h"
                    }
                );
                return res.status(200).json({
                    message: 'Login Successful',
                    token: token
                });
            }
            res.status(401).json({
                message: 'Authorization Failed'
            });
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

exports.user_delete_user = (req, res, next) => {
    User.remove({ _id: req.params.userId }).exec()
    .then(result => {
        res.status(200).json({
            message: 'User Deleted'
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

