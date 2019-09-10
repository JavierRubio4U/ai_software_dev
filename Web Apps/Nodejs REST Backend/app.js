const express = require('express');
const app = express();
// morgan is the logging package for nodejs; uses the 'next' part of your request/reply function to log transactions
const morgan = require('morgan');
// bodyParser supports URL encoded and JSON bodies, but not files per say
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//const Promise = require('bluebird');

// import your routes
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');

mongoose.connect('mongodb://boomer:' + process.env.MONGO_ATLAS + '@digitalplayground-shard-00-00-s0qae.mongodb.net:27017,digitalplayground-shard-00-01-s0qae.mongodb.net:27017,digitalplayground-shard-00-02-s0qae.mongodb.net:27017/test?ssl=true&replicaSet=DigitalPlayground-shard-0&authSource=admin');

mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));  //makes our uploads folder statically/publicly available.

// code to support CORS functionality with CORS headers
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Orgin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if( req.method === 'OPTIONS' ){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();  // required to allow the request to move forward to the other routes
});

// app.use((req, res, next) => {
//    res.status(200).json({
//        message: 'It fucking works!'
//    });
//}); // this sets up the express middleware

// routes which handle requests
// format is app.use(filter aka url, handler to foward request to)
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/user', userRoutes);

// error handling for routes
app.use((req, res, next) => {
    const error = new Error('Not Found')  // Error object/class provided by nodejs by default
    error.status = 404;
    next(error);  //forward error along
})

// error handling for all backoffice errors thrown; beyond the route error above
app.use((error, req, res, next ) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });

});

module.exports = app;
