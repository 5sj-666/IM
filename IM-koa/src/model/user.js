//数据层
const { query } = require('../utils/DB-access')

let tableName = 'wechatuser';

async function hasUser (account, password) {
    console.log("--hasUser param:", arguments);
    let sql = `SELECT * FROM ${tableName} where weChatId = '${account}' and password = '${password}'`;
    console.log("--hasUser sql:　", sql);
    let result = await query( sql );
    console.log( "查询结果: ", result);
    return result && result.length > 0;
}

async function addUser(account, password) {
    console.log("--registerUser param:", arguments);
    //表结构 weChatId weChatName imgURL password 
    try {
        let sql = `insert into ${tableName} values ('${account}', '', '', '${password}', Null) `;
        let result = await query( sql );
        console.log( "新增用户结果: ", JSON.stringify(result));
        if(result.affectedRows === 1) {
            return {ok: true, status:200, msg:"注册成功"};
        }
        return {ok: false, status:200, msg: result.message};
    } catch (error) {
        console.log("err:", error.sqlMessage);
        if(error.errno === 1062) { // sqlMessage: "Duplicate entry 'qqq' for key 'PRIMARY'"
            return {ok: false, status:200, err: "该用户名已存在"};
        }
        return {ok: false, status:200, err: error.message};
    }
    
}


module.exports = {
    hasUser,
    addUser
}