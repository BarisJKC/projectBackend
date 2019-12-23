const jwt = require('jsonwebtoken') // add security level to passwords with jsonwebtoken

checkToken = (req,res,next) => { // to check the token validity and type for customer/vendor or admin
    const token = req.header("Authorization");
    if(!token) return res.status(401).send("You are not authorized");
    try {
        const decodedToken = jwt.verify(token,"MarketPlace"); // token decoded
        if (decodedToken.adminEmail) {
            req.body.adminEmail = decodedToken.adminEmail;
        } else if (decodedToken.customerEmail) {
            req.body.customerEmail = decodedToken.customerEmail;
            req.body.customerPassword = decodedToken.customerPassword;
        } else if (decodedToken.vendorEmail) {
            req.body.vendorEmail = decodedToken.vendorEmail;
        }
        next();
    } catch (exception) {
        res.status(400).send("Invalid Token");
    }
}

module.exports = checkToken;