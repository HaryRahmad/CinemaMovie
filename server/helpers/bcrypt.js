const bcrypt = require('bcryptjs');
function hashPassword(data) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(data, salt);
    return hash;
}
function comparesing(data, data2) {
    const decr = bcrypt.compareSync(data, data2);
    return decr;
}
module.exports = { hashPassword , comparesing}