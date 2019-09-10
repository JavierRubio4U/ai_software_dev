const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // we want to call the 'next' part of the fnc if we successfully authenticate, 
    // but return an error if we did not succeed
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, 'process.env.JWT_KEY');
        req.userData = decoded;  // enables you to extract the token user data on future requests
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Token Authorization Failed'
        });
    }     
};