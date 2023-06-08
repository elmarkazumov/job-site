const jwt = require('jsonwebtoken');
const config = require('../config')

exports.cookieJwtAuth = (req, res, next) => {
    const token = req.cookies.token;
    
    try {
        const user = jwt.verify(token, config.jwt);
        req.user = user;
        next();     
    } catch (error) {
        res.clearCookie("token");
        return res.redirect('/login');
    }
}