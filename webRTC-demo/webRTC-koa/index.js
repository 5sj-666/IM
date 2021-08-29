const Koa = require('koa');
const WebSocket = require('ws');
const app = new Koa();
const sslify = require('koa-sslify').default;



var https = require('https');
var path = require('path');
var fs = require('fs');

const serve = require('koa-static');   // 导入koa-static包
const KoaRouter = require('koa-router');
const router = KoaRouter();

// SSL options
var options = {
    key: fs.readFileSync(path.join(__dirname, './5294857_www.fffuture.top.key')),  //ssl文件路径   第一步下载下来的证书文件
    cert: fs.readFileSync(path.join(__dirname, './5294857_www.fffuture.top.pem'))  //ssl文件路径		第一步下载下来的证书文件
};
console.log("options: ", options);
// var httpsServer = https.createServer(options, app.callback());

app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// response
app.use(sslify());

// app.use(async ctx => {
//   ctx.body = 'Hello World443https';
// });

app.use(serve(path.join(__dirname+'/static'),  // 开放的文件夹 __dirname为当前运行文件的目录  目前看来 只能开放文件夹 无法开放单独一个文件
	{
  		index:true,       // 默认为true  访问的文件为index.html  可以修改为别的文件名或者false
  		hidden:false,      // 是否同意传输隐藏文件
  		defer:true,		   // 如果为true，则在返回next()之后进行服务，从而允许后续中间件先进行响应
	}
));

router.get('/',(ctx)=>{
  ctx.response.type = 'html';
  ctx.response.body =   fs.createReadStream(__dirname+'/static/index.html');
});
app.use(router.routes())//启动路由


// https.createServer(options, app.callback()).listen(443, (err) => {
//   if (err) {
//     console.log('服务启动出错', err);
//   } else {
//     //db.connect();  // 数据库连接
//     console.log('IM运行在https443端口');
//   }	
// });
var server = https.createServer(options, app.callback());

const wss = new WebSocket.Server({ server });

wss.on('connection', wss => {
  console.log('server connection');

  wss.on('message', msg => {
    console.log('server receive msg：', msg);
  });

  wss.send('Information from the server');
});
server.listen(443, (err) => {
    if (err) {
      console.log('服务启动出错', err);
    } else {
      //db.connect();  // 数据库连接
      console.log('IM运行在https443端口');
    }	
  });

