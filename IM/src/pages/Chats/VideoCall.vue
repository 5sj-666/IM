<template>
    <article class="video-call">
        <!-- 视频通话页面 -->
        <!-- <video src="@/assets/video/video-mobile.mp4" autoplay muted loop ref="selfVideo"></video>
        <video class="friend-video" src="@/assets/video/video-mobile.mp4" autoplay muted loop ref="friendVideo" ></video> -->
        <video id="selfVideo" src="" autoplay muted loop ref="selfVideo"></video>
        <video id="friendVideo" class="friend-video" src="" autoplay muted loop ref="friendVideo" ></video>

        <!-- <div class="goBack()">返回</div> -->
        <section class="floating-invite" v-if="status === 'invate'">
            <div class="invite-header">
                <!-- <div class="narrow">缩小</div> -->
                <img class="icon-shrink" src="@/assets/icon/icon-shrink.png" alt="">
                <span>小宝</span>
                <span>正在等待对方接受邀请...</span>
                <img class="invate-avatar" src="@/assets/img/avatar.jpg" alt="">
            </div>
            <div class="invite-footer">
                <button class="btn-voice_invite">切换到语音通话</button>
                <button class="btn-cancel" @click="goBack()">取消</button>
            </div>
        </section>

        <section class="floating-answer" v-else-if="status === 'answer'">
            <div class="invite-header">
                <!-- <div class="narrow">缩小</div> -->
                <img class="icon-shrink" src="@/assets/icon/icon-shrink.png" alt="">
                <span>小宝</span>
                <span>正在等待对方接受邀请...</span>
                <img class="invate-avatar" src="@/assets/img/avatar.jpg" alt="">
            </div>
            <div class="invite-footer">
                <button class="btn-voice_invite"  @click="videoAnswer()">接听</button>
                <button class="btn-cancel" @click="goBack()">挂断</button>
            </div>
        </section>




        <section class="floating-answer" v-else-if="status === 'doing'">
            <div class="invite-header">
                <!-- <div class="narrow">缩小</div> -->
                <img class="icon-shrink" src="@/assets/icon/icon-shrink.png" alt="">
                <span>小宝</span>
                <span>正在等待对方接受邀请...</span>
                <img class="invate-avatar" src="@/assets/img/avatar.jpg" alt="">
            </div>
            <div class="invite-footer">
                <button class="btn-voice_invite"></button>
                <button class="btn-cancel" @click="goBack()">挂断</button>
            </div>
        </section>



        

    </article>
</template>
<script>
import { ref, onMounted } from "vue";
import {useRouter, useRoute} from "vue-router";
import { useStore } from "vuex";

export default {
    name:"VideoCall",
    setup() {
       // status: ""; //"call"、"answer"、"videoing"
        const Router = useRouter(),
              Route = useRoute(),
              Store = useStore();
        console.log( "-VideoCall Pagae Route: ",  Route.query );

        const selfVideo = ref();
        const friendVideo = ref();

         // status = ["invate", 'answer', "doing"]
        let status = ref("invate");

        onMounted(() => {

            console.log("--videoCall selfVideo: ", selfVideo);



            status.value = Route.query.type;
            //
            try {
                Store.dispatch("wsStore/initRTC", {
                    selfVideo,
                    friendVideo,
                    recipient: Route.params.userId,
                });
            } catch (error) {
                console.error(error);
            }


        })

        function goBack() {
            Router.go(-1);
        }

        function videoAnswer() {
            
            let letter = {
                // sender: localStorage.getItem("token"),
                recipient: Route.params.userId,
                type: "videoAnswer",
                content: "receive",
            }

            Store.dispatch("wsStore/wsSend", letter);

            //Store.dispatch("wsStore/wsSend", letter);


            // store.dispatch("wsStore/wsSend", letter);
        }
       

        return {goBack, status, videoAnswer, selfVideo, friendVideo}
        // return {status};
    }
}
</script>
<style scoped>
    .video-call {
        position: relative;
        width:100%;
        height: 100%;
        color: #FFF;
        background-color: #000;
    }
    video {
        width: 100%;
        height: 100%;
        background: cyan;
    }
    .friend-video {
        position: fixed;
        right: 0;
        top: 30%;
        width: 30%;
        height: 40%;
        background: orange;

    }
    .floating-invite, .floating-answer {
        position: absolute;
        left: 0;
        top: 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 100%;
        /* background-color: rgba(255, 42, 155, .3); */
    }
    /* 
        <svg t="1622036714440" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5224" width="200" height="200">
        <path d="M806 911H218c-57.9 0-105-47.1-105-105V218c0-57.9 47.1-105 105-105h588c57.9 0 105 47.1 105 105v588c0 57.9-47.1 105-105 105zM218 155c-34.7 0-63 28.3-63 63v588c0 34.7 28.3 63 63 63h588c34.7 0 63-28.3 63-63V218c0-34.7-28.3-63-63-63H218z" p-id="5225"></path>
        <path d="M614.3 430.6c-5.4 0-10.7-2.1-14.8-6.1-8.2-8.2-8.3-21.5-0.1-29.7l155-155.8c8.2-8.2 21.5-8.2 29.7-0.1 8.2 8.2 8.3 21.5 0.1 29.7l-155 155.8c-4.1 4.1-9.5 6.2-14.9 6.2zM239 805.9c-5.4 0-10.7-2-14.8-6.1-8.2-8.2-8.3-21.5-0.1-29.7l155-155.8c8.2-8.2 21.5-8.3 29.7-0.1 8.2 8.2 8.3 21.5 0.1 29.7l-155 155.8c-4.1 4.2-9.5 6.2-14.9 6.2z" p-id="5226"></path>
        <path d="M427.2 617.2h-126c-11.6 0-21-9.4-21-21s9.4-21 21-21h126c11.6 0 21 9.4 21 21s-9.4 21-21 21z" p-id="5227"></path><path d="M427.2 743.2c-11.6 0-21-9.4-21-21v-126c0-11.6 9.4-21 21-21s21 9.4 21 21v126c0 11.6-9.4 21-21 21zM713.7 458.2h-126c-11.6 0-21-9.4-21-21s9.4-21 21-21h126c11.6 0 21 9.4 21 21s-9.4 21-21 21z" p-id="5228"></path>
        <path d="M587.7 458.2c-11.6 0-21-9.4-21-21v-126c0-11.6 9.4-21 21-21s21 9.4 21 21v126c0 11.6-9.4 21-21 21z" p-id="5229"></path>
        </svg> 
    */

    .invite-header {
        box-sizing: border-box;
        padding: .89rem;
        display: grid;
        grid-template-rows: 1fr 1fr;
        grid-template-columns: 2rem auto 4.69rem;
        column-gap: .67rem;
        width: 100%;
        height: 6.47rem;
        /* background: orange; */
        /* overflow: hidden; */
        text-align: right;
    }
    .invite-header .icon-shrink {
        grid-column: 1 / 2;
        grid-row: 1 / 3;
        width: 2rem; 
        height: 2rem;
    }
    .invite-header .invate-avatar {
        /* widows: ; */
        grid-column: 3 / 4;
        grid-row: 1 / 3;
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background: yellow;
        border-radius: .3rem;
        overflow: hidden;
    }
    .invite-footer {
        /* display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center; */
        display: grid;
        grid-template-rows: 1fr 1fr;
        grid-template-columns: repeat(3, 1fr);
        grid-template-areas: "null voice_invite voice_accept"
                             "voice_ing hangup shift_camera";
        align-items: center;
        justify-items: center;
        width: 100%;
        height: 12rem;
        /* background: orange; */
    }
    /* .invite-footer button {
        width: 4rem;
        height: 4rem;
        color: #FFF;
        background: red;
        border: none;
        border-radius: 50% 50%;
        outline: none;
    } */
    .btn-voice_invite {
        grid-area: voice_invite;
        width: 4rem;
        height: 4rem;
        color: #FFF;
        background: red;
        border: none;
        border-radius: 50% 50%;
        outline: none;
    }
    .btn-cancel {
        /* grid-column: ; */
        grid-area: hangup;
        width: 4rem;
        height: 4rem;
        color: #FFF;
        background: red;
        border: none;
        border-radius: 50% 50%;
        outline: none;
    }

</style>