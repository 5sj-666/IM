<template>
    <article class="profile-page">
        <ki-header :title="Route.params.userId"/>
        <!-- {{$route.params}}个人信息页面!! -->
        <ki-profile 
            :name="profile.name" 
            :id="profile.userId"
            :avatar="profile.avatar ? '/avatar/'+ profile.avatar : ''"
        />

        <div class="profile-btn" 
            style="margin-top: .48rem" 
            @click="Router.replace('/dialogue/'+$route.params.userId)"
        >
            {{t('App.Profile.sendMessage')}}
        </div>
        <div class="profile-btn" @click="goVideoPage()">{{t('App.Profile.medias')}}</div>

    </article>
</template>
<script>

import { defineComponent, onMounted, ref } from 'vue';
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import useI18n from "@/local/index"
import Request from "@/utils/request";


import KiHeader from '@/components/ki-header';
import KiProfile from '@/components/ki-profile.vue';




export default defineComponent({
    name: "ProfilePage",
    components: {
        KiHeader,
        KiProfile
    },
    
    setup() {
        const Router = useRouter();
        const Route = useRoute();
        // console.log( "---Route: ",  Route.params );
        const Store = useStore();
        const { t } = useI18n();

        const profile = ref({name: '', id: '', avatar: ''})

        /**
         * @description 获取指定用户信息
         */
        async function getProfile(userId) {
            try {
                let res = await Request.get(`/api/user/getProfile?userId=${userId}`);
                if(res && res.profile) profile.value = res.profile;
                // debugger;
            } catch (error) {
                console.error("getProfile: ", error);
            }
        }

        onMounted(async ()=>{
            await getProfile(Route.params.userId);
        })

        function goBack() {
            Router.go(-1);
        }

        function goVideoPage() {

            let letter = {
                sender: localStorage.getItem("token"),
                recipient: Route.params.userId,
                type: "videoInvate",
                content: "",
            }
            // store.dispatch("wsStore/wsSend", {sender: sender+"",recipient: recipient,type: "message", content: {value: content.value} });
            Store.dispatch("wsStore/wsSend", letter);


            Router.push({
                // path: '/dialogue/videoCall/'+Route.params.userId,
                path: `/dialogue/videoCall/${Route.params.userId}`,
                query: {type: "invite"}
            })
        }

        return { goBack, Router, Route, goVideoPage, profile, t }
    },
})

</script>
<style scoped>
    .profile-page {
        /* --Profile_bg: #ededed;
        --Profile-btn_color: #576b86;
        --Profile-btn_bg: rgba(255,255,255, 1); */

        width: 100%;
        height: 100%;
        background-color: var(--Profile_bg, #000);
    }



    .profile-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 3.26rem;
        background: var(--Profile-btn_bg, #FFF);
        color: var(--Profile-btn_color, #576b86);
        font-size: 1.09rem;
        border-bottom: 1px solid #e2e2e2;
    }

    .profile-btn:nth-child(1) {
        margin-top: 2rem;
    }
</style>