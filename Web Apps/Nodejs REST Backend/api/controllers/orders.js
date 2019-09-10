const mongoose = require('mongoose');

const Order = require('../models/order');
const Product = require('../models/product');

const domain = process.env.DOMAIN;

exports.orders_get_all = (req, res, next) => {
    Order.find()
    .select('product quantity _id')  // define what properties to return in your query json response
    .populate('product', 'name')  //here you pass the name of the mongoose property you want to populate. The second auguement is the list of the properties of the populated object / objects
    .exec() //turns the request into a real promise
    .then(docs => {
        res.status(200).json({
            count: docs.length,
            orders: docs.map(doc => {  //use mapping function to get access to the individual docs
                return {
                    _id: doc.id,
                    productID: doc.product,
                    quantity: doc.quantity,
                    request: {
                        type: 'GET',
                        url: 'http://'+domain+':3000/orders/' + doc._id
                    }
                }
            })
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
}

exports.orders_create_order = (req, res, next) => {
    Product.findById(req.body.productId)  // validate user is passing in valid product ID
        .then(product => {
            const order = new Order({
                _id: mongoose.Types.ObjectId(),
                product: req.body.productId,
                quantity: req.body.quantity
            });
            return order.save();
        })
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Order received!",
                orderDetails: {
                    productID: result.product,
                    quantity: result.quantity,
                    _id: result._id
                },
                request: {
                    type: 'GET',
                    description: 'Get info on this order',
                    url: 'http://'+domain+':3000/orders/' + result._id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: "Product not found",
                error: err
            });
        });
}

exports.orders_get_order = (req, res, next) => {
    const orderId = req.params.orderId;
    Order.findById(orderId)
    .select('product quantity _id ')
    .populate('product', 'name price')
    .exec()
    .then(order => {
        if( !order ) {
            return res.status(404).json({
                message: 'Order not found'
            });
        }
        res.status(200).json({
            message: 'Order details for order ' + orderId,
            order: order,
            request: {
                type: 'GET',
                description: 'Get all orders',
                url: 'http://'+domain+':3000/orders/'
            }
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
}

exports.orders_delete_order = (req, res, next) => {
    const orderId = req.params.orderId;
    Order.remove({ _id: orderId }).exec().then(result=> {
        res.status(200).json({
            message: 'Order ' + orderId + ' was deleted',
            request: {
                type: 'POST',
                description: 'Create a new order',
                url: 'http://'+domain+':3000/orders/',
                body: { productId: 'ID', quantity: 'Number' }
            }
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
}