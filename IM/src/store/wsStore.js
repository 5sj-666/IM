import RTC from "@/utils/RTC";
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
        
        PC: {},
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
      initWS(context, payload) {
        let { commit, state, dispatch } = context;
        console.log("----initWS state: ", state);
        let pc = state.PC;
        // let pc = state.RTC;
        if(!Reflect.has(window, "WebSocket")) {
            console.log("浏览器不支持websocket!!");
            return;
        }

        console.log("---WEBSOCKET_URL process.env.WEBSOCKET_URL", process.env);
        let WS = new WebSocket(process.env.VUE_APP_WEBSOCKET_URL);

        WS.onopen = function() {
          console.log("---成功连接websocket---");
          // let data = {
          //   sender: localStorage.getItem("token"), 
          //   type: "init"
          // }
          // WS.send(JSON.stringify(data));
          dispatch("wsSend", {type: "init"});
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
            mediaHangUP: utilRTC.mediaHangUP,
            feedBack: ()=>{}
          }
          
          if(Reflect.has(msgMapping, msg.type)) {
            msgMapping[msg.type](context, msg);
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

        state.WS.send(JSON.stringify(letter));
        //将数据存入本地聊天记录中
        commit(SET_MSGHISTORY, letter);
        // console.log("--wsSend state:", state.WS)

      },

      /**
       * 初始化webRTC
       * @param {*} param0 
       * @param {object} payload  localVideo， friendVideo, recipient
       */
      initRTC(context, payload) {
        let {state} = context;
        state.mediaRecipient = payload.recipient;
        // console.log("---初始化webRTC", window, navigator);
        console.log("---payload: ", payload);

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
        pc.onicecandidate = utilRTC.onicecandidate.bind(this, context, payload)
        pc.onnegotiationneeded = utilRTC.onnegotiationneeded;
        pc.onicegatheringstatechange = utilRTC.onicegatheringstatechange.bind(this, pc);
        pc.onicecandidateerror = utilRTC.onicecandidateerror;

        state.PC = pc;
      },

      mediaHangUp(context) {
        console.log("----wsStore mediaHangup: ");
        let {dispatch} = context;
        let letter = {
          recipient: context.state.mediaRecipient,
          type: "mediaHangUP",
        };
        dispatch("wsSend", letter);
        RTC.closeVideoCall(context.state.PC);
        // RTC.closeVideoCall();
      },

  
    }
  }

export default store;