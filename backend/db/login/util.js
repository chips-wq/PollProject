const jwt = require('jsonwebtoken')

const generateJWT = (uid) => {
    const jwtToken = jwt.sign({ uid: uid }, "secretkey")
    return jwtToken;
} 