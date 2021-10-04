const Koa = require('koa');
const app = new Koa();
const KoaRouter = require('koa-router');
const KoaStatic = require('koa-static');
const router = KoaRouter();
// const { hasUser, addUser } = require('./model/user.js');
// const jwt = require('jsonwebtoken');
var bodyParser = require('koa-bodyparser');
// var path = require('path');
const WebSocket = require('ws');
const http = require('http');
// const wsTool = require();
// import wsTool from './utils/wsTool'
const wsTool = require('./utils/wsTool');

var wsPool = {};
app.context.wsPool = wsPool;

const { userCtrol } =  require("./control/userCtrol.js");
const { friendCtrol } =  require("./control/friendCtrol.js");

app.use(KoaStatic(`${__dirname}/asset/`) );
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





const server = http.createServer(app.callback());//koa脚手架创建的服务器
let ws = new WebSocket.Server({
    server: server//挂载到原有服务器上，不然你得重新开一个端口，详见文档
})

wsTool(ws, wsPool);


// app.listen(3000);
server.listen(3000, (err) => { 
  !!err ? console.log('服务启动出错', err) : console.log('IM运行在http3000端口');
});