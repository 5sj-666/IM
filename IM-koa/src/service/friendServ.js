//service层  解析token参数，如果token为空则直接返回无权限(登录注册除外)
const { getFriendList } = require("../model/friend");

const friendModel = require("../model/friend");
const addFriendModel = require("../model/addFriend");

async function friendListServ(userId) {
    // return getFriendList("admin");

    console.log("---friendListServ: ", userId);
    // return {ok: true, status: 200, data: await getFriendList(userId)};
    return await getFriendList(userId);

}

/**
 * @description 处理好友请求
 */
async function friendRequestServ(ctx, userId, friendId) {
    // return await getFriendList(userId);
    console.log("---friendRequestServ: ", userId, friendId);
    
    //将好友申请用websocket转发给目标用户 ctx.wsPool
    if(Reflect.has(ctx.wsPool, friendId)) {
        let msg = {
            sender: userId,
            recipient: friendId,
            type: "friendRequest", //好友请求
            content: `好友请求`
        }
        wsPool[msg.recipient].send(JSON.stringify(msg));
    }

    let result = await addFriendModel.insert({userId, friendId, status: 'applying'});
    console.log("---friendServ: result ", result);

    if(!result.err) {
        return {
            ok: true,
            status: 200,
            data: result
        }
    }else {
        return {
            ok: false,
            status: 200,
            error: result.err
        }
    }

}


/**
 * @description 通过好友请求service
 */
async function acceptServ(ctx, userId, friendId, NO) {
    console.log("acceptServ arguments: ", arguments);
    try {
        if(Reflect.has(ctx.wsPool, friendId)) {
            let msg = {
                sender: userId,
                recipient: friendId,
                type: "acceptFriendRequest", //好友请求
                content: `好友请求通过`
            }
            wsPool[msg.recipient].send(JSON.stringify(msg));
        }

        //更改addfriend表中的申请状态
        await addFriendModel.update({NO, userId, friendId, status: "friend"});

        //在friend表中添加对应的好友关系
        await friendModel.insert({userId, friendId, relation: 'friend'});
    
        return {
            ok: true,
            status: 200,
            data: ''
        }
    } catch (error) {
        console.log("---acceptServ: ", error);
        return {
            ok: false,
            status: 200,
            error: error
        }
    }
    
}


module.exports = {
    friendListServ,
    friendRequestServ,
    acceptServ
}