import { createApp } from 'vue'
import App from './App.vue'

import { createRouter, createWebHistory } from "vue-router";
import routes from "./router";
import store from "./store"
import './registerServiceWorker';

// import image form "@/assets/logo.png"

// Notification.requestPermission(function(result) {
//     if (result === 'granted') {
//       navigator.serviceWorker.ready.then(function(registration) {
//         let message = {
//           badge: '',
//           body: "测试消息内容",
//           // image: 
//         };
//         // registration.showNotification('Notification with ServiceWorker');
//         registration.showNotification('title', message);
//       });
//     }
// });

//应该在这里做websocket链接
 /**
         * @description initial websocket
         * @return {Object} websocket object
        */
//   function initWS() {
//     if(!Reflect.has(window, "WebSocket")) {
//         console.log("浏览器不支持websocket!!");
//         return;
//     };

//     let WS = new WebSocket("wss://www.fffuture.top");
//     window.userws = WS;
//     WS.onopen = function() {
//         console.log("---成功连接websocket---");
//     }

    
//     WS.onmessage = envelope => {
//         const msgMapping = {
//             offer: answerOffer,
//             offerAnswer: setRemoteSDP,
//             candidate: setRemoteICE,
//         }
//         msgHistory = document.querySelector("#msgHistory");
//         msgHistory.innerText += `${envelope.data}\n`;
//         let letter = JSON.parse(envelope.data);
        
//         Reflect.has(msgMapping, letter.type) ? msgMapping[letter.type](letter) : "";
//     }
//     WS.onclose = () => console.log("---已断开webSocket---");
//     WS.onerror = error => console.error("---websoket发生错误: ", error);
//     return WS;
// }


const router = createRouter({history: createWebHistory(), routes: routes});

createApp(App)
    .use(router)
    .use(store)
    .mount('#app');
