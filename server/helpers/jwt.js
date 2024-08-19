const jwt = require('jsonwebtoken');
const jwt_secret = process.env.JWT_SECRET
function jwebtoken(data) {
    const accessToken = jwt.sign({data}, "jwt_secret")
    return accessToken;
}

function resultJwt(data) {
    // console.log(`----------------->`,data);
    const decoded = jwt.verify(data, "jwt_secret");
    // console.log(`ini hasil decode ----------------------->`,decoded);
    return decoded;
}

module.exports = {jwebtoken, resultJwt}