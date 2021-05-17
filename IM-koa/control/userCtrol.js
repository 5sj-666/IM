const KoaRouter = require('koa-router');
const { hasUser, addUser } = require('../model/user.js');
var bodyParser = require('koa-bodyparser');

const userCtrol = new KoaRouter({prefix: '/api/user'}); // 实例化路由
const {hasUserServ, addUserServ} = require("../service/userServ.js")

userCtrol.post("/hasUser", async (ctx, next) => {
    let data = ctx.request.body;
    console.log("---req ctx data ", data);
    let respond = await hasUserServ(data.account, data.password);
    ctx.body = JSON.stringify(respond);
});

userCtrol.post('/register', async ctx=>{
    let data = ctx.request.body;
    console.log("---req add ctx data ", data);
    // let result = await addUser(data.account, data.password);
    let result = await addUserServ(data.account, data.password)
    console.log("---add user result:", result);
    ctx.body = JSON.stringify(result);
});

module.exports = { userCtrol };




      