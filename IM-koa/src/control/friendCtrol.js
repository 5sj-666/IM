const { friendListServ } = require("../model/friend");

const KoaRouter = require('koa-router');

const friendCtrol = new KoaRouter({prefix: '/api/friend'});

friendCtrol.post("getFriendList", async (ctx) => {
    let data = ctx.request.body;
    let result = await friendListServ(data.account);
    return result;
})