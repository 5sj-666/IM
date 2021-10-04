const { query:exec, execSql } = require('../utils/DB-access')

/*
    说明： 是对addFriend这个数据库表的增删改查方法
*/

/**
 * @param {object}  {
                        NO: number, //主键，自动增长，不可更改
                        userId: string,
                        friendId: string,
                        status: string,
                    }
 */
async function insert(params={}) {
    console.log("---model addFriend insert---", params);
    try {
        params = _checkParams(params);
        
        let sql = `INSERT INTO addFriend (userId, friendId, status) VALUES ('${params.userId}', '${params.friendId}', '${params.status}')`;
        let result = await execSql(sql); 
        if(result.affectedRows === 1) { //插入成功时，返回该条记录
            let sql = `SELECT * FROM addFriend WHERE userId = '${params.userId}' and friendId = '${params.friendId}' ORDER BY NO desc limit 1`;
            let array = await execSql(sql);
            return array[0];
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

async function update(params={}) {
    try {
        params = _checkParams(params);

        let sql =  `UPDATE addFriend SET userId = '${params.userId}', friendId = '${params.friendId}', status = '${params.status}' WHERE NO = ${params.NO}`;
        let result = await execSql(sql);
        console.log("model addFriend update: ", result);
        return result; 
        
    } catch (error) {
        return {err: error.message};
    }
}


async function del(params={}) {
    try {
        params = _checkParams(params);

        
    } catch (error) {
        return {err: error.message};
    }
}


/**
 * @description 查询某条记录
 *
 */
async function query(params) {
    try {
        let sql =  `SELECT * FROM addFriend WHERE userId = '${params.userId}' and friendId = '${params.friendId}' ORDER BY NO desc limit 1`;
        return await execSql(sql);
    } catch (error) {
        console.log("---model addFriend query: ", error);
        return [];
    }
}


/**
 * @description 校验参数，对缺少的参数，赋默认值
 * @param {object} params 
 * @returns {object}
 */
function _checkParams(params) {
    let keys = ['userId', 'friendId', 'status'];
    for(let property of keys) {
        if(!Reflect.has(params, property))
            params[property] = "";
    }
            
    return params;
}

module.exports = {
    insert,
    update,
    query
}
