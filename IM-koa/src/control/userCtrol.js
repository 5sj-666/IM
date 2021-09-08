const {hasUserServ, addUserServ, getProfileServ} = require("../service/userServ.js");
const JWT = require("../utils/jwt.js");
const KoaRouter = require('koa-router');

const userCtrol = new KoaRouter({prefix: '/api/user'}); // 实例化路由

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

userCtrol.get('/getProfile', async ctx => {
    let token = ctx.request.header.token;
    let payload = JWT.parse(token);
    // console.log("---request.header token: ", token , "parse: ", payload);

    let paramsObj = ctx.request.query;
    console.log("---/getProfile: paramsObj", paramsObj);
    let result;
    if(paramsObj.account) {
       result = await getProfileServ(paramsObj.account);
    }else {
        result = await getProfileServ(payload.id);
    }
    
    console.log("---/getProfile result:", result);
    ctx.body = JSON.stringify(result);
})


module.exports = { userCtrol };
