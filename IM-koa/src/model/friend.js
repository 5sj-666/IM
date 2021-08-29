const { query } = require('../utils/DB-access')


async function getFriendList(account) {
    console.log("--account");
    // 需要将token中的用户id解析出来
    // 去数据库中查询 所有自己的数据
    try {
        // let sql = `SELECT * FROM friend WHERE id = '${account}' OR friendid = '${account}'`
        // let sql = `SELECT * FROM friend WHERE owner = '${account}'`;

        let sql = `select friend.owner, friend.friend, friend.alias, friend.source, friend.descript, friend.addTime, friend.relation, user.avatar from user right join friend on user.account=friend.friend where friend.owner = '${account}'`;

        let result = await query( sql );
        console.log("---getFriendList:", result);
        // return result;
        return {ok: true, status: 200, data: result};
    } catch (error) {
        // if(error.errno === 1146) { //Table 'im.friendlist' doesn't exist
        // }
        console.log("--dao getFriendList error: ", error);
        return {ok: false, status: 200, err: error.sqlMessage};
    }

}

module.exports = {
    getFriendList
}