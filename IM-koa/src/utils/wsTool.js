// const ws = new WebSocket.Server(app);

const JWT = require("./jwt.js");

module.exports = function wsTool(ws, wsPool = {}) {

  // let wsPool = {};

  ws.on('connection', ws => {
    console.log('wsTool server connection---');
  
    /*
      消息的数据类型
      {
        sender
        recipient
        type
        content
      }
    
    */ 


    ws.on('message', msg => {
      // console.log('wsTool server recipient msg：', msg);
      try {
        msg = JSON.parse(msg);
        msg.sender = JWT.parse(msg.sender).id;
        // console.log("--ws token: ",  JWT.parse(msg.sender));
        console.log("---ws msg: ", msg);

        if(msg.type === 'init') { //初始化时候将ws实例挂载到wsPool下
          wsPool[msg.sender] = ws;
        }else {
          if(Reflect.has(wsPool, msg.recipient)) {
            wsPool[msg.recipient].send(JSON.stringify(msg));
            wsPool[msg.sender].send(JSON.stringify({type: 'feedBack',msgStatus: `${msg.recipient}已收到消息`}));
          }else {
            wsPool[msg.sender].send(JSON.stringify({type: 'feedBack', msgStatus: `${msg.recipient}不在线！！`}))
          }
        }
        
      } catch (error) {
        console.log(error);
      }
  
    })
  })
  
}

// export default wsTools;
// export { wsTools };
// module.exports = { wsTool }




// console.log("--path: ", path);
// console.log(path.join(`${__dirname}/asset/avatar`));

// ws.on('message', msg => {
//   console.log('server recipient msg：', msg);
//   msg = JSON.parse(msg);
//   try {
//     if(msg.type === 'init') { //初始化时候将ws实例挂载到wsPool下
//       wsPool[msg.sender] = ws;
//     }else {
//       if(Reflect.has(wsPool, msg.recipient)) {
//         wsPool[msg.recipient].send(JSON.stringify(msg));
//         wsPool[msg.sender].send(JSON.stringify({type: 'feedBack',msgStatus: `${msg.recipient}已收到消息`}));
//       }else {
//         wsPool[msg.sender].send(JSON.stringify({type: 'feedBack', msgStatus: `${msg.recipient}不在线！！`}))
//       }
//     }

//   } catch (error) {
//     console.log(error);
//   }
  
// });



// var server = https.createServer(options, app.callback());

// const wss = new WebSocket.Server({ server });
// server.listen(443, (err) => {
//   if (err) {
//     console.log('服务启动出错', err);
//   } else {
//     //db.connect();  // 数据库连接
//     console.log('IM运行在https443端口');
//   }	
// })
