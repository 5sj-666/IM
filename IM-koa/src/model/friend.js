const { query } = require('../utils/DB-access')


async function getFriendList(account) {
    console.log("--account");
    // 需要将token中的用户id解析出来
    // 去数据库中查询 所有自己的数据

    try {
        let sql = `SELECT * FROM friendlist WHERE weChatId = '${account}' OR friendWeChatId = '${account}'`
        let result = await query( sql );
        console.log("---getFriendList:", result);
        return result;
    } catch (error) {
        console.log("--dao getFriendList: ", )
    }
    


}

module.exports = {
    getFriendList
}