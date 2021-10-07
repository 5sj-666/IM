//service层  解析token参数，如果token为空则直接返回无权限(登录注册除外)
const { getFriendList } = require("../model/friend");

const friendModel = require("../model/friend");
const addFriendModel = require("../model/addFriend");
const userModel = require("../model/user");

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

/**
 * @description 获取指定用户的所有的好友请求
 * @param {string} userId 
 * @returns {
                NO: number,
                userId: string,
                avatar: string,
                friendId: string,
                status: string,
            }
 */
async function getFriendReqListServ(userId) {
    try {
        // let result = await addFriendModel.getFriendReq(userId);
        let reqList = await addFriendModel.getFriendReq(userId);

        let avatarList = await getAvatarAll(reqList);
        console.log("---avatarList: ", avatarList);
        for(let i = 0; i < reqList.length; i++) {
            // reqList[i].avatar = avatarList[i].avatar;
            if(avatarList[i]) {
                reqList[i].avatar = avatarList[i].avatar;
            }else {
                reqList[i].avatar = "";
            }
        }
       
        return {
            ok: true,
            status: 200,
            data: reqList
        }

        /**
         * @description 获取头像
         * @param {*} reqList 
         * @returns 
         */
        async function getAvatarAll(reqList) {
            return new Promise(async (resolve, reject) => {
                let queryList = [];
                let avatarList = [];
                for(let item of reqList) {
                    queryList.push(userModel.getProfile(item.userId));
                }
                Promise.allSettled(queryList)
                .then(results => {
                    results.forEach(result => {
                        avatarList.push(result.status === "fulfilled" ? result.value[0] : {avatar: ""});
                    });

                    resolve(avatarList);
                })
                .catch(err=> {
                    resolve([]);
                    console.log("--获取头像失败： ", err);
                });
            })
            
        }
    } catch (error) {
        console.log("---getFriendReqListServ: ", error);
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
    acceptServ,
    getFriendReqListServ
}