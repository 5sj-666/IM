/**
 * 抽离部分webRTC连接需要函数
 */

const RTC = {
    mediaInvite,
    setRemoteSDP,
    answerOffer,
    setRemoteICE,

    getLocalMedia,

    ontrack,
    onicecandidate,
    onnegotiationneeded,
    onicegatheringstatechange,
    onicecandidateerror,
}

/**
 * 视频邀请函数
 * @param {*} state 
 */
function mediaInvite(context) {
    let { state, dispatch } = context;
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
            //   sender: localStorage.getItem("token"),
              recipient: state.mediaRecipient,
              type:"offer", 
              content: state.RTC.localDescription
            }
            // state.WS.send(JSON.stringify(letter));
            dispatch("wsSend", letter)
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
function setRemoteSDP(context, data) {
    let { state } = context;
    const remoteDesc = new RTCSessionDescription(data.content);
    state.RTC.setRemoteDescription(remoteDesc)
    .then(()=>{ console.log("---invite成功设置远程SDP"); });
}

/**
 * @description 回复offer
 * @param {Object} data
 */
function answerOffer(context, data) {
    let { state, dispatch } = context;
    const remoteDesc = new RTCSessionDescription(data.content);
    console.warn("-----回复offer remoteDesc: ----:", remoteDesc);
    state.RTC.setRemoteDescription(remoteDesc)
    .then(function() { state.RTC.createAnswer() })
    .then(function(answer) { return state.RTC.setLocalDescription(answer) })
    .then(function() {
        console.log("----发送应答offer-----");
        let letter = {
        //   sender: localStorage.getItem("token"),
          recipient: state.mediaRecipient,
          type:"offerAnswer", 
          content: state.RTC.localDescription
        }
        // state.WS.send(JSON.stringify(letter));
        dispatch("wsSend", letter)
    })
    .catch(err => { console.warn("--应答offer发生错误: ", err) })
}

/**
 * @description 将接收到的候选者icecandidate添加到pc(peerConnection)中
 * @param {Object} data icecandidate
 */
function setRemoteICE(context, msg) {
    let { state } = context;
    // console.log("---接收到candidate: ", data);
    var candidate = new RTCIceCandidate(msg.content);
    state.RTC.addIceCandidate(candidate)
    .then(() => { console.log("---设置远程candidate成功--:") })
    .catch(error => { console.error("----设置candidate出错:　", error) })
}

function getLocalMedia(pc) {
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

}


function ontrack(media) {
    console.warn("----接收到远程的媒体流----", media);
    // document.getElementById("video").srcObject = media.streams[0];
    document.querySelector("#friendVideo").srcObject = media.streams[0];
}
  


/**
 * @description 但接收到icecandidate时，将其发送给对方
 * @param {object} state  store/wsStore.state
 * @param {} wrapper 
 * @returns  
 */
function onicecandidate(context, payload, wrapper) {
    let {state, dispatch} = context;
    console.warn("---utils RTC: 获取到candidate: ", wrapper.candidate);
    if(!wrapper.candidate) return;
    // wsSend({type: "candidate", content: wrapper.candidate});

    let letter = {
        // sender: localStorage.getItem("token"),
        recipient: payload.recipient,
        type: "candidate",
        content: wrapper.candidate
    }
    
    dispatch("wsSend", letter);
    // state.WS.send(JSON.stringify(letter));
}


function onnegotiationneeded() {
    console.warn("---协商连接事件----")
    // console.warn("----WebRTC基础结构需要你重新启动会话协商过程onnegotiationneeded---");
}

function onicegatheringstatechange(pc) {
    //非必要实现功能 除非你有特别的需求需要监视候选者的状态
    if (pc.iceGatheringState !== 'complete') return;
    console.warn("----onicecandidate获取结束 gatheringStateChange: ");
}

function onicecandidateerror() {
    console.error("---获取候选者出错: ", error);
}






export default RTC;

export {
    mediaInvite,
    setRemoteSDP,
    answerOffer,

    getLocalMedia,

    ontrack,
    onicecandidate,
    onnegotiationneeded,
    onicegatheringstatechange,
    onicecandidateerror,
}
