const { query:exec, execSql } = require('../utils/DB-access')


async function getFriendList(userId) {
    // 需要将token中的用户id解析出来
    // 去数据库中查询 所有自己的数据
    try {
        let sql = `SELECT friend.userId, friend.friendId, friend.alias, friend.source, friend.descript, friend.addTime, friend.relation, user.avatar FROM user RIGHT JOIN friend on user.userId=friend.friendId WHERE friend.userId = '${userId}'`;

        let result = await execSql( sql );
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

async function insert(params) {
    console.log("---model friend insert---", params);
    try {
        params = _checkParams(params);
        let sql = `INSERT INTO friend (userId, friendId, alias, source, descript, addTime, relation) VALUES ('${params.userId}', '${params.friendId}', '${params.alias}', '${params.source}', '${params.descript}', '${params.addTime}', '${params.relation}')`;
        let result = await execSql(sql); 
        if(result.affectedRows === 1) { //插入成功时，返回该条记录
            let array = await query(params);
            if(array.length > 0) {
                return array[0];
            }
        }

        return {err: "添加记录失败!"};

    } catch (error) {
        console.log("err:", error);
        if(error.errno === 1062) { // sqlMessage: "Duplicate entry 'qqq' for key 'PRIMARY'"
            return {err: "该记录已存在"};
        }
        return {err: error.message};
    }
}

async function query(params) {
    try {
        let querySql = `SELECT * FROM friend WHERE userId = '${params.userId}' and friendId = '${params.friendId}'ORDER BY NO desc limit 1`;
        return execSql(querySql);
        // console.log("--model friend query result: ", result);
    } catch (error) {
        console.log("--model friend query error: ", error);
        return [];
    }
    
}

/**
 * @description 查询需要
 * @param {Object} params   {
                                userId:String, 
                                friendId: String, 
                                alias: String, 
                                source: String, 
                                descript: String, 
                                addTime: String, 
                                relation: String,
                            }
 * @returns  {Object} params
 */
function _checkParams(params) {
    let keys = ['userId', 'friendId', 'alias', 'source', 'descript', 'addTime', 'relation'];
    for(let property of keys) {
        if(!Reflect.has(params, property))
            params[property] = "";
    }
    return params;
}


module.exports = {
    getFriendList,
    insert
}