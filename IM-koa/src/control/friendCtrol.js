// const { getFriendList } = require("../model/friend.js");
const { friendListServ } = require("../service/friendServ.js");
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

module.exports = { friendCtrol };