//service层  解析token参数，如果token为空则直接返回无权限(登录注册除外)
const { getFriendList } = require("../model/friend");

async function friendListServ(account) {
    // return getFriendList("admin");

    console.log("---friendListServ: ", account);
    return {ok: true, status: 200, data: getFriendList(account)};

}

module.exports = {
    friendListServ
}