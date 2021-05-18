const { hasUser, addUser } = require('../model/user.js');
const jwt  = require("../utils/jwt.js");

//user 个人账号信息操作的service层
async function hasUserServ(account, password) {
    console.log("--hasUserServ  account:", account, "---password: ", password);
    let result = await hasUser(account, password);
    console.log("result:", result);
    if(result) {
        return {ok: true, status: 200, msg:"登录成功", token:  jwt.create(account)};
    }else {
        return {ok: false, status: 200, error: '账号或密码错误'};
    }
}

async function addUserServ(account, password) {
    return await addUser(account, password);
}

module.exports = {
    hasUserServ, 
    addUserServ
}