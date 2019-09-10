const express = require('express');
const router = express.Router();
const checkAuth = require('../auth/check-auth');

const OrdersController = require('../controllers/orders');

// get all orders
// format is router.get(route, handler)
router.get('/', checkAuth, OrdersController.orders_get_all);

// create an order
router.post('/', checkAuth, OrdersController.orders_create_order);

// get order info for a single order
// format is router.get(URL:variable for the segement desired, handler)
router.get('/:orderId', checkAuth, OrdersController.orders_get_order);

// delete an order
router.delete('/:orderId', checkAuth, OrdersController.orders_delete_order);

module.exports = router;
