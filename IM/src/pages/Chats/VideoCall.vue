<template>
    <article class="video-call">
        <!-- 视频通话页面 -->
        <video id="local_video" src="" autoplay muted loop ref="selfVideo"></video>
        <video id="receive_video" class="friend-video" src="" autoplay muted loop ref="friendVideo" ></video>

        <section class="profile-card" v-if="mediaStatus !== 'inVideo'">
            <!-- <img class="profile-shrink" src="@/assets/icon/icon-shrink.png" alt=""> -->
            <span class="profile-shrink"></span>
            <div class="profile-body">
                <span class="profile-name">{{Route.params.userId}} {{mediaStatus}}</span>
                <span class="profile-status">{{mediaStatus === "invite" ? "正在等待对方接受邀请..." : "邀请你进行通话."}}</span>
            </div>

            <!-- <img class="profile-avatar" src="@/assets/img/avatar.jpg" alt="" v-if="avatar === ''"> -->
            <div class="profile-avatar" style="background: rgba(220,220,220,.3)" alt="" v-if="avatar === ''"></div>
            <img class="profile-avatar" :src="'/avatar/' + avatar" alt="" v-else>
        </section>

        <section class="operate-container">
            <button v-if="mediaStatus === 'invite'" @click="hangup()">取消</button>

            <button v-if="mediaStatus === 'waiting' || mediaStatus === 'inVideo'" @click="hangup()">挂断</button>

            <button v-if="mediaStatus === 'waiting'"  @click="videoAnswer()">接听</button>
        </section>

    </article>
</template>
<script>
import { ref, onMounted, computed } from "vue";
import {useRouter, useRoute} from "vue-router";
import { useStore } from "vuex";

import Request from "@/utils/request";

export default {
    name:"VideoCall",
    setup() {
        const Router = useRouter(),
              Route = useRoute(),
              Store = useStore();
        console.log( "-VideoCall Pagae Route: ",  Route.query );

        const selfVideo = ref();
        const friendVideo = ref();

        //"call"、"answer"、"videoing"
        let mediaStatus = computed(()=>{
            return Store.state.wsStore.mediaStatus;
        })

        onMounted(async () => {

            // console.log("--videoCall selfVideo: ", selfVideo);
            // status.value = Route.query.type;
            if(Route.query.type === "invite") {
                Store.commit('wsStore/SET_MEDIA_STATUS', "invite");
            }else {
                Store.commit('wsStore/SET_MEDIA_STATUS', "waiting");
            }

            await videoInvite();
            await getProfile(Route.params.userId);

        })


        let avatar = ref(''); //avatar
        /**
         * @description 获取指定用户信息
         */
        async function getProfile(userId) {
            try {
                let res = await Request.get(`/api/user/getProfile?userId=${userId}`);
                if(res && res.profile) 
                    avatar.value = res.profile.avatar;
                // debugger;
            } catch (error) {
                console.error("getProfile: ", error);
            }
            // debugger;
        }

        function videoInvite() {
            try {
                Store.dispatch("wsStore/initRTC", {
                    selfVideo,
                    friendVideo,
                    recipient: Route.params.userId,
                });
            } catch (error) {
                console.error(error);
            }
        }

        function videoAnswer() {
            
            let letter = {
                // sender: localStorage.getItem("token"),
                recipient: Route.params.userId,
                type: "videoAnswer",
                content: "receive",
            }

            Store.dispatch("wsStore/wsSend", letter);
            Store.commit('wsStore/SET_MEDIA_STATUS', "inVideo");
        }

        function hangup() {
            console.log("---videoCall hang up----");
            Store.dispatch("wsStore/mediaHangUp");
            Router.go(-1);
        }
       
        return {
            Router,
            Route,
            avatar,
            mediaStatus,

            videoAnswer, 
            selfVideo, 
            friendVideo, 
            hangup
        }
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
        /* background-color: #000; */
    }
    video {
        width: 100%;
        height: 100%;
        /* background: cyan; */
    }
    .friend-video {
        position: fixed;
        right: 0;
        top: 30%;
        width: 30%;
        height: 40%;
        /* background: orange; */

    }

    .profile-card {
        position: absolute;
        left: 0;
        top: 0;
        box-sizing: border-box;
        padding: .89rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 6.47rem;
        /* background: orange; */
    }
    .profile-shrink {
        align-self: flex-start;
        width: 2rem;
        height: 2rem;
    }
    .profile-body {
        margin-right: .8rem;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: flex-end;
    }
    .profile-name {
        font-size: 1.7rem;
    }
    .profile-status {
        font-size: .8rem;
    }


    .profile-card .profile-avatar {
        width: 4.7rem;
        height: 4.7rem;
        background-size: 100% auto;
        border-radius: .3rem;
    }

    .operate-container {
        position: absolute;
        bottom: 0;
        left: 0;
        box-sizing: border-box;
        display: flex;
        justify-content: space-evenly;
        align-items: center;

        width: 100%;
        height: 9rem;
        background: green;
    }
    .operate-container button {
        width: 4rem;
        height: 4rem;
        color: #FFF;
        background: #da4a4b;
        border: none;
        border-radius: 50% 50%;
    }




</style>