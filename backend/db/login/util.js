const jwt = require('jsonwebtoken')

const errorCodes = require("../../constants.js");

const verifyJwtToken = (req, res, next) => {
    const token = req.cookies.token;
    if (token !== null) {
        try {
            const usr = jwt.verify(token, process.env.SECRET_JWT);
            req.userId = usr._id;
            next();
            return;
        } catch (e) {
            console.log('Error parsing JWT token.');
        }
    }
    res.status(errorCodes.AUTH_ERR).send({ errorCode: errorCodes.AUTH_ERR, errors: ['Could not parse this JWT token.'] });
    return;
}

module.exports = { verifyJwtToken }