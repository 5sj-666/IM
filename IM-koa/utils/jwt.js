//json web token 操作函数  对token的所有操作都应该经过这个函数。
const JWT = require('jsonwebtoken');

const secret = "wsj";

const jwt = {
    create(id) {
        let payload = {id, time:new Date().getTime(), timeout:1000*60*60*2};
        let token = JWT.sign(payload, secret);
        return token;
    },
    parse(token) {
        return JWT.verify(token, secret);
    },
}

module.exports = jwt
