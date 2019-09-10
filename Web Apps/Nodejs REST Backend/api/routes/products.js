const express = require('express');
const router = express.Router();

const checkAuth = require('../auth/check-auth');

const multer = require('multer');  //package to parse multi-field form data
const storage = multer.diskStorage({  //define upload file configuration options
    destination: (req, file, cb) => {  //cb stands for "call back"
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif') {
        cb(null, true); //accept the file
    } else {
        cb(null, false); //don't store the upload file and don't throwing an error
    }
}
const upload = multer({   //initialize multer and define configuration parameters
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

const ProductController = require('../controllers/products');

// get all products
router.get("/", ProductController.products_get_all);

// create a new product
// format is router.post(route, handler)
// upload.single is an additional middleware handler beyond our standard (req, res, next) handler
// Note that you can chain any number of middleware handlers together and they process in sequence
// left to right
router.post("/", checkAuth, upload.single('productImage'), ProductController.products_create_product);

// get info on a single product
// format is router.get(URL:variable for the segement desired, handler)
router.get("/:productId", ProductController.products_get_product);

// update the product info
router.patch('/:productId', checkAuth, ProductController.products_update_product);

// delete a product
router.delete('/:productId', checkAuth, ProductController.product_delete_product);

module.exports = router;
