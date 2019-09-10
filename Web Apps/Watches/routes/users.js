var express = require('express');
var router = express.Router();

/* GET all product data */
router.get('/products', function(req, res) {
    var db = req.db;
    var collection = db.get('products');
    collection.find({},{}, function(e,data) {
        res.json(data);
    });
});

module.exports = router;
