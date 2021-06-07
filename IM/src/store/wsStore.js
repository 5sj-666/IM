// import { createApp } from 'vue'
import { createStore } from 'vuex'

const SET_WS = 'SET_WS';
const SET_MSGHISTORY = "SET_MSGHISTORY";

// 创建一个新的 store 实例
// const store = createStore({
//   // namespaced: true,
//   state () {
//     return {
//       WS: {}
//     }
//   },
//   getters: {},
//   mutations: {
//     [SET_WS](state, payload) {
//       state.WS = payload.WSInstace;
//       console.log('--初始化WS:', state.WS);
//     }
//   },
//   actions: {
//     // // initWS(context) {
//     initWS({ commit }) {
//       const WSInstace = new WebSocket("ws://127.0.1:3000");
//       console.log("---WSInstace: ", WSInstace);
//       commit(SET_WS, {WSInstace}) 
//     }

//   }
// })
const store = {
    namespaced: true,
    state () {
      return {
        WS: {},
        url: "ws://127.0.1:3000",

        msgHistory: [],
      }
    },
    getters: {},
    mutations: {
      [SET_WS](state, payload) {
        state.WS = payload;
        console.log('--mutations SET_WS:', state.WS);
      },
      [SET_MSGHISTORY](state, msg) {
        state.msgHistory.push(msg);
        // console.warn("--SET_MSGHISTORY", state.msgHistory);
      }
    },
    actions: {
      initWS({ commit, state }) {
        if(!Reflect.has(window, "WebSocket")) {
            console.log("浏览器不支持websocket!!");
            return;
        }
        // commit(SET_WS, new WebSocket("ws://127.0.1:3000"))
        let WS = new WebSocket("ws://127.0.1:3000");

        WS.onopen = function() {
          console.log("---成功连接websocket---");
          let data = {
            sender: localStorage.getItem("token"), 
            type: "init"
          }
          WS.send(JSON.stringify(data));
        };

        WS.onmessage = envelope => {
          console.log("--onmessage envelope", envelope);
          // state.msgHistory.push(JSON.parse(envelope.data));
          const msg = JSON.parse(envelope.data); //feedBack
          if(msg.type === "feedBack") {
            //todo 
          }else {
            commit(SET_MSGHISTORY, msg);
          }
        }

    //         WS.onmessage = envelope => {
    //             console.log("--envelope", envelope);

                

    //             // const msgMapping = {
    //             //     offer: answerOffer,
    //             //     offerAnswer: setRemoteSDP,
    //             //     candidate: setRemoteICE,
    //             // }
    //             // msgHistory = document.querySelector("#msgHistory");
    //             // msgHistory.innerText += `${envelope.data}\n`;
    //             // let letter = JSON.parse(envelope.data);
                
    //             // Reflect.has(msgMapping, letter.type) ? msgMapping[letter.type](letter) : "";
    //         };
    //         WS.onclose = () => console.log("---已断开webSocket---");
    //         WS.onerror = error => console.error("---websoket发生错误: ", error);
    //         return WS;
    //     }




        commit(SET_WS, WS)
      },
      wsSend({ state, commit } , letter) {
        console.log("---wsSend: ", letter);
        commit(SET_MSGHISTORY, letter);
        state.WS.send(JSON.stringify(letter));
        // console.log("--wsSend state:", state.WS)

      //    function wsSend(data:message) {
      //         // const letter:message = {
      //         //     sender: '',
      //         //     recipient: '',
      //         //     type: '',
      //         //     content:'',
      //         // }
      //         const letter = JSON.stringify(data);
      //         console.log("letter: ", letter);
      //         WS.send(letter);
      //     }

      }
      
  
    }
  }

export default store;