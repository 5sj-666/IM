const Koa = require('koa');
const app = new Koa();
const KoaRouter = require('koa-router');
const router = KoaRouter();
// const { hasUser, addUser } = require('./model/user.js');
const jwt = require('jsonwebtoken');
var bodyParser = require('koa-bodyparser');

const { userCtrol } =  require("./control/userCtrol.js");

const { friendCtrol } =  require("./control/friendCtrol.js");


app.use(bodyParser());


app.use(router.routes())//启动路由

app.use(userCtrol.routes());

app.use(friendCtrol.routes());

app.use(async (ctx) => {
  ctx.set('Content-Type', 'application/json');
  ctx.set('access-control-allow-origin', '*');
  // ctx.set({
  //   'Etag': '1234',
  // });
});


router.get('/testRTC',(ctx)=>{
  ctx.body = '/testRTC';
  // ctx.response.type = 'html';
  // ctx.response.body =   fs.createReadStream(__dirname+'/static/testRTC.html');
});


app.listen(3000);





// // router.get('/api/user/hasUser',async ctx => {
// router.post('/api/user/hasUser',async ctx => {
//   // console.log("req ctx", ctx);
//   let data = ctx.request.body;
//   console.log("---req ctx data ", data);
//   let result = await hasUser(data.account, data.password);
//   console.log("result:", result);
//   if(result) {
//     let payload = {userNumber:"admin5", time:new Date().getTime(), timeout:1000*60*60*2}
//     let token = jwt.sign(payload, 'wsj');
//     console.log("---token: ", token);
//     ctx.body = JSON.stringify({ok: true, status: 200, msg:"登录成功", token});
//   }else {
//     ctx.body = JSON.stringify({ok: false, status: 200, error: '账号或密码错误'});
//   }
              

//   // jwt.sign(JSON.stringify, secret);
  
//   // let verifyCode = jwt.verify(token, 'wsj');
//   // console.log("---verify code: ", verifyCode)

//   // ctx.response.status= 200;
//   ctx.set('Content-Type', 'application/json');
//   ctx.set('access-control-allow-origin', '*');
//   // console.log("res ctx", ctx);
// });

// router.post('/api/user/register', async ctx=>{
//   let data = ctx.request.body;
//   console.log("---req add ctx data ", data);
//   let result = await addUser(data.account, data.password);
//   console.log("---add user result:", result);
//   ctx.set('Content-Type', 'application/json');
//   ctx.set('access-control-allow-origin', '*');
//   ctx.body=JSON.stringify(result);
// })
