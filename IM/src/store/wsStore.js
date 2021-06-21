import utilRTC from "@/utils/RTC";
console.log("---utilRTC: ", utilRTC);


const SET_WS = 'SET_WS';
const SET_MSGHISTORY = "SET_MSGHISTORY";

const store = {
    namespaced: true,
    state () {
      return {
        WS: {},
        msgHistory: [],
        
        RTC: {},
        mediaRecipient: "",
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
      },


    },
    actions: {
      initWS({ commit, state }, payload) {
        console.log("----initWS state: ", state);
        let pc = state.RTC;
        // let pc = state.RTC;
        if(!Reflect.has(window, "WebSocket")) {
            console.log("浏览器不支持websocket!!");
            return;
        }
        // commit(SET_WS, new WebSocket("ws://127.0.1:3000"))
        // let WS = new WebSocket("ws://127.0.1:3000");
        // let WS = new WebSocket("ws://47.103.151.107:443");
        console.log("---WEBSOCKET_URL process.env.WEBSOCKET_URL", process.env);
        let WS = new WebSocket(process.env.VUE_APP_WEBSOCKET_URL);

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

          //不需要写入记录里的消息类型
          const msgMapping = {
            videoAnswer: utilRTC.mediaInvite,
            offer: utilRTC.answerOffer,
            offerAnswer: utilRTC.setRemoteSDP,
            candidate: utilRTC.setRemoteICE,
            feedBack: ()=>{}
          }
          
          if(Reflect.has(msgMapping, msg.type)) {
            msgMapping[msg.type](state, msg);
          }else {
            //如果接收到的是 视频邀请信息， 则直接打开视频会话组件
            if(msg.type === "videoInvate") {

              console.log("---接收到视频邀请");
              // Router.push({path: '', query: {}});
              // console.log("---store ws: initWs payload: ", payload);
              payload.Router.push({
                path: `/dialogue/videoCall/${msg.sender}`,
                query: {type: "answer"}
              });

            }

            commit(SET_MSGHISTORY, msg);
          }
        }

        commit(SET_WS, WS)
      },
      wsSend({ state, commit } , letter) {
        console.log("---wsSend: ", letter);
        letter.sender = localStorage.getItem("token");
        commit(SET_MSGHISTORY, letter);
        state.WS.send(JSON.stringify(letter));
        // console.log("--wsSend state:", state.WS)

      },

      /**
       * 初始化webRTC
       * @param {*} param0 
       * @param {object} payload  localVideo， friendVideo, recipient
       */
      initRTC({ commit , state }, payload) {
        state.mediaRecipient = payload.recipient;

        // console.log("---初始化webRTC", window, navigator);
        console.log("---payload: ", payload);
        // payload.localVideo.value.srcObject = "@/assets/video/video-mobile.mp4";

        let pc = {};
        const config = {
          iceServers: [
              {
                  urls: "stun:139.224.75.6:3478",
                  username:"",
                  credential:""
              },
              {
                  urls: "turn:139.224.75.6:3478",
                  username: "wsj",
                  credential: "123456"
              }
          ],
          iceTransportPolicy:"all",
          iceCandidatePoolSize:"0"
        };
        pc = new RTCPeerConnection(config);

        utilRTC.getLocalMedia(pc);
        pc.ontrack = utilRTC.ontrack;

        pc.onicecandidate = utilRTC.onicecandidate.bind(this, state, payload)

        pc.onnegotiationneeded = utilRTC.onnegotiationneeded;
        pc.onicegatheringstatechange = utilRTC.onicegatheringstatechange.bind(this, pc);
        pc.onicecandidateerror = utilRTC.onicecandidateerror;


        state.RTC = pc;
      }

  
    }
  }

export default store;