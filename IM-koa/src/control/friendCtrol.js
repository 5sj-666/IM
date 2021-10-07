// const { getFriendList } = require("../model/friend.js");
const { friendListServ, friendRequestServ, acceptServ, getFriendReqListServ } = require("../service/friendServ.js");
const JWT = require("../utils/jwt.js");

const KoaRouter = require('koa-router');

const friendCtrol = new KoaRouter({prefix: '/api/friend'});


//token需要作为前置处理，当token为空或失效时候，返回401错误

friendCtrol.post("/getFriendList", async ctx => {
    // let data = ctx.request.body;
    let token = ctx.request.header.token;
    let payload = JWT.parse(token);
    console.log("---request.header token: ", token , "parse: ", payload);

    let result = await friendListServ(payload.id);
    
    ctx.body = JSON.stringify(result);
})


/**
 * @description 好友管理 比如 添加、删、拒绝、同意好友请求等
 * @params {Object} {type: friendRequest | accept | delete }
 */
friendCtrol.post("/manage", async ctx => {
    console.log("---添加好友---");
    // let data = ctx.request.body;
    let token = ctx.request.header.token;
    // let paramsObj = ctx.request.query;
    // console.log("---paramsObj: ", paramsObj);
    let payload = JWT.parse(token);
    // console.log("---request.header token: ", token , "parse: ", payload);

    let params = ctx.request.body;

    console.log("---data: ", params);
    let result = "";
    if(params.type === "friendRequest") {
        //将请求用websocket转发给目标用户
        //将请求写入请求列表中
        result = await friendRequestServ(ctx, payload.id, params.friendId);
    }

    if(params.type === "accept") {
        result = await acceptServ(ctx, payload.id, params.friendId, params.NO);
    }

    // if(params.type === "delete") {

    // }

    console.log("control Friend manage : ",params.type, "--", result);
    ctx.body = JSON.stringify(result);

})

friendCtrol.get("/getFriendReqList", async ctx => {
    let token = ctx.request.header.token;
    let payload = JWT.parse(token);

    ctx.body = await getFriendReqListServ(payload.id);
})


module.exports = { friendCtrol };