const mongoose = require('mongoose');

// mongoose models define what objects look like when stored in your object store by passing javascript objects to its mongoose.Schema method. You then export the model.
const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    // denoting the product ID that is associated w/ this order.
    // ref is a way to link this model to a field in another model, you input the model name.
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, default: 1 }
});

module.exports = mongoose.model('Order', orderSchema);
