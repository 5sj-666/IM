import utilRTC from "@/utils/RTC";



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
            videoAnswer: mediaInvite,
            offer: answerOffer,
            offerAnswer: setRemoteSDP,
            candidate: setRemoteICE,
            feedBack: ()=>{}
          }
          /**
           * @description 将接收到的候选者icecandidate添加到pc(peerConnection)中
           * @param {Object} data icecandidate
          */
          function setRemoteICE(data) {
            // console.log("---接收到candidate: ", data);
            var candidate = new RTCIceCandidate(data.content);
            state.RTC.addIceCandidate(candidate)
            .then(() => { console.log("---设置远程candidate成功--:") })
            .catch(error => { console.error("----设置candidate出错:　", error) })
          }


        /**
         * @description 发送offer  当接收到对方的‘同意’的应答时候，发送此RTC offer
         * 
        */
        function mediaInvite() {
          console.warn("---mediaInvite state: ", state);
          const offerOptions = { offerToReceiveVideo: 1, offerToReceiveAudio: 1};
          state.RTC.createOffer(offerOptions)
          .then(gotDescription,noDescription );

          function gotDescription(desc) {
              console.log("---gotDescription: ", desc);
              state.RTC.setLocalDescription(desc)
              .then(() => {
                  console.warn("----本地准备就绪，准备发送offer----");
                  let letter = {
                    sender: localStorage.getItem("token"),
                    recipient: state.mediaRecipient,
                    type:"offer", 
                    content: state.RTC.localDescription
                  }
                  state.WS.send(JSON.stringify(letter));
              });
          }

          function noDescription(error) {
              console.log('Error creating offer: ', error);
          }

        }


          /**
           * @description 将接收到的awseroffer的SDP设置到本地pc上
           * @param {Object} data
          */
          function setRemoteSDP(data) {
              const remoteDesc = new RTCSessionDescription(data.content);
              state.RTC.setRemoteDescription(remoteDesc)
              .then(()=>{ console.log("---invite成功设置远程SDP"); });
          }

          /**
           * @description 回复offer
           * @param {Object} data
          */
          function answerOffer(data) {
            const remoteDesc = new RTCSessionDescription(data.content);
            console.warn("-----回复offer remoteDesc: ----:", remoteDesc);
            state.RTC.setRemoteDescription(remoteDesc)
            .then(function() { state.RTC.createAnswer() })
            .then(function(answer) { return state.RTC.setLocalDescription(answer) })
            .then(function() {
                console.log("----发送应答offer-----");
                let letter = {
                  sender: localStorage.getItem("token"),
                  recipient: state.mediaRecipient,
                  type:"offerAnswer", 
                  content: state.RTC.localDescription
                }
                state.WS.send(JSON.stringify(letter));
            })
            .catch(err => { console.warn("--应答offer发生错误: ", err) })
          }

          // if(msg.type === "feedBack") {
          //   //todo 
          // }
          
          if(Reflect.has(msgMapping, msg.type)) {
            msgMapping[msg.type](msg);
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
        
        let mediaConstraints = {audio: true, video: true};

        navigator.mediaDevices.getUserMedia(mediaConstraints)
        .then(function(localStream) {
            console.log("---获取本地媒体权限---");
            // let videoSelf = document.querySelector("#video-self");
            // videoSelf.srcObject = localStream;
            console.warn("RTCinit ->　videoSelf", document.querySelector("#selfVideo"));

            document.querySelector("#selfVideo").srcObject = localStream;
            console.warn("---获取到本地视频流");
            localStream.getTracks().forEach(track => pc.addTrack(track, localStream));
        })
        .catch(handleGetUserMediaError);

        function handleGetUserMediaError(e) {
          switch(e.name) {
              case "NotFoundError":
                  alert("Unable to open your call because no camera and/or microphone were found.");
                  break;
              case "SecurityError":
                  break;
              case "PermissionDeniedError":
                  // Do nothing; this is the same as the user canceling the call.
                  break;
              default:
                  alert("Error opening your camera and/or microphone: " + e.message);
                  break;
          }
          // closeVideoCall();
        }

        pc.ontrack = media => {
          console.warn("----接收到远程的媒体流----", media);
          // document.getElementById("video").srcObject = media.streams[0];
          document.querySelector("#friendVideo").srcObject = media.streams[0];
        }

        pc.onicecandidate = wapper => {
          console.warn("---获取到candidate: ", wapper.candidate);
          if(!wapper.candidate) return;
          // wsSend({type: "candidate", content: wapper.candidate});

          let letter = {
              sender: localStorage.getItem("token"),
              recipient: payload.recipient,
              type: "candidate",
              content: wapper.candidate
          }
          

          state.WS.send(JSON.stringify(letter));
        }



        pc.onnegotiationneeded = () => {
          console.warn("---协商连接事件----")
          // console.warn("----WebRTC基础结构需要你重新启动会话协商过程onnegotiationneeded---");
        };

        pc.onicegatheringstatechange = () => {
          //非必要实现功能 除非你有特别的需求需要监视候选者的状态
          if (pc.iceGatheringState !== 'complete') return;
          console.warn("----onicecandidate获取结束 gatheringStateChange: ");
        };

        pc.onicecandidateerror = error => {
          console.error("---获取候选者出错: ", error);
        };

        // console.log();
        state.RTC = pc;

      }

  
    }
  }

export default store;