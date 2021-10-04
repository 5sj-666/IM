const { hasUser, addUser, getProfile } = require('../model/user.js');
const jwt  = require("../utils/jwt.js");

//user 个人账号信息操作的service层
async function hasUserServ(userId, password) {
    console.log("--hasUserServ  userId:", userId, "---password: ", password);
    let result = await hasUser(userId, password);
    console.log("result:", result);
    if(result) {
        return {ok: true, status: 200, msg:"登录成功", token:  jwt.create(userId)};
    }else {
        return {ok: false, status: 200, error: '账号或密码错误'};
    }
}

async function addUserServ(userId, password) {
    return await addUser(userId, password);
}

/**
 * @description 获取个人信息的service
 * @param {string} userId 
 * @returns 
 */
async function getProfileServ(userId) {
    // console.log("---queryProfileServ: ", userId);

    if(!userId) {
        return {ok: false, status:200, err: '请输入有效账号'};
    }
    try {
        let result = await getProfile(userId)
        console.log("---getProfileServ: ", result);
        if(result && result.length > 0) {
            Reflect.deleteProperty( result[0], 'password')
            return {ok: true, status: 200, profile: result[0] };
        }else {
            return {ok: true, status: 200, profile: '未查询到该用户个人信息' }
        }
    } catch (error) {
        return {ok: false, status:200, err: error.message};
    }

}

module.exports = {
    hasUserServ, 
    addUserServ,
    getProfileServ
}