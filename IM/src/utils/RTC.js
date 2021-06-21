/**
 * 抽离部分webRTC连接需要函数
 */

const RTC = {
    mediaInvite,
    setRemoteSDP,
    answerOffer,
}

/**
 * 视频邀请函数
 * @param {*} state 
 */
function mediaInvite(state) {
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
function setRemoteSDP(state, data) {
    const remoteDesc = new RTCSessionDescription(data.content);
    state.RTC.setRemoteDescription(remoteDesc)
    .then(()=>{ console.log("---invite成功设置远程SDP"); });
}

/**
 * @description 回复offer
 * @param {Object} data
 */
function answerOffer(state, data) {
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







export default RTC;
