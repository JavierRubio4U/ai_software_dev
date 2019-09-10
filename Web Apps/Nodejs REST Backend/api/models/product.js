const mongoose = require('mongoose');

// mongoose models define what objects look like when stored in your object store by passing javascript objects to its mongoose.Schema method. You then export the model.
const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    price: { type: Number, required: true},
    productImage: { type: String }
});

// format for the .model method is ('model name', model schema)
module.exports = mongoose.model('Product', productSchema);
