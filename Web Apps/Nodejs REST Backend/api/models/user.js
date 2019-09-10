const mongoose = require('mongoose');

// mongoose models define what objects look like when stored in your object store by passing javascript objects to its mongoose.Schema method. You then export the model.
const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: { 
        type: String, 
        required: true, 
        unique: true,
        // using a regex expression to validate email field pattern
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: { type: String, required: true }
    
});

module.exports = mongoose.model('User', userSchema);
