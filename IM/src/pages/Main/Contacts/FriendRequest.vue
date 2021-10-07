<template>
  <article class="friend-request-page">
    <!-- 好友请求页面 -->

    <ki-header :title="t('App.FriendRequest.addContacts')"/>

    <div class="search_fake" @click="showInput = true">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="1rem" height="1rem"  viewBox="-2 -2 104 104">
            <g stroke="#b4b4b4" stroke-width="6" fill="transparent" >
                <circle cx="40" cy="40" r="39" />
                <line x1="68" y1="68" x2="98" y2="98"  stroke-linecap="round"/>
            </g>
        </svg>
        <span style="margin-left: .2rem;">{{t('App.FriendRequest.inputPlaceHolder')}}</span>
    </div>

    <div class="userid-container">
        {{t('App.FriendRequest.myId')}}：{{currUserId}}
    </div>

    <div class="request-card" v-for="(item, index) in friendReq" :key="index">
        <img class="card-avatar" :src="'/avatar/' + item.avatar" alt="avatar">
        <div class="card-body border-line_bottom">
            <div>
                <span>{{item.userId}}</span> <br />
                <span>我是{{item.userId}}</span>
            </div>

            <button class="btn-add" v-if="item.status === 'applying'" @click="accept(item)">{{t('App.FriendRequest.accept')}}</button>
            <button class="btn-added" v-if="item.status === 'friend'">{{t('App.FriendRequest.added')}}</button>
        </div>
    </div>

    <section class="search-container" v-if="showInput">
        <div style="position: relative;">
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="1rem" height="1rem"  viewBox="-2 -2 104 104"
                style="position: absolute; left: 1.2rem; top: .5rem;">
                <g stroke="#b4b4b4" stroke-width="6" fill="transparent" >
                    <circle cx="40" cy="40" r="39" />
                    <line x1="68" y1="68" x2="98" y2="98"  stroke-linecap="round"/>
                </g>
            </svg>
            <input v-model="userId" class="search-input" type="text" autofocus :placeholder="t('App.FriendRequest.inputPlaceHolder')"/>
            <button @click="showInput = false">{{t('App.FriendRequest.cancel')}}</button>
        </div>


        <div class="search_go" v-if="(userId+'').trim() !== ''" @click="search(userId)">
            <div class="icon-search"></div>
            {{t('App.FriendRequest.search')}}：
            <span style="color: #06c15f;">{{userId}}</span>
        </div>

        <div class="user-non_existent" v-if="showNotFound">{{t('App.FriendRequest.nonExistent')}}</div> 

    </section>

  </article>
</template>

<script>
import Request from "@/utils/request";
import { useRouter, useRoute } from "vue-router";
import useI18n from "@/local/index";

import KiHeader from '@/components/ki-header.vue';

import { onMounted, ref } from '@vue/runtime-core';


export default {
  name: "FriendRequest",
  components: {
    KiHeader
  },
  setup() {
    const Router = useRouter();
    const Route = useRoute();
    const { t } = useI18n();

    let showInput = ref(false);
    let userId = ref("");
    
    onMounted(async () => {
        friendReq.value = await getFriendReqList();
    })

    let friendReq = ref([]);

    /**
     * @description 获取好友请求列表
     */
    async function getFriendReqList() {
        try {
            let res = await Request.get(`/api/friend/getFriendReqList`);
            if(res && res.data) {
                // friendReq.value = res.data;
                return res.data;
            }
        } catch (error) {
            console.error("getFriendReqList error: ", error);
        }

        return [];
    }

    let showNotFound = ref(false);

    /**
     * @description 根据userId搜索用户
     */
    async function search(userId) {
        let profile = await getProfile(userId);
        // profile.value = await res;


        // if(Reflect.has(profile, 'userId')) { //friendReq.value.keys()
        if(profile && profile.userId) { //friendReq.value.keys()
            showNotFound.value = false;
            // debugger;
            Router.push({
                path: "/addFriend",
                query: {
                    profile: JSON.stringify(profile),
                }
            });
        }

        showNotFound.value = true;

        /**
         * @description 获取指定用户信息
         */
        async function getProfile(userId) {
            try {
                let res = await Request.get(`/api/user/getProfile?userId=${userId}`);
                if(res && res.profile) 
                    return res.profile;
            } catch (error) {
                console.error("getProfile: ", error);
            }
            return {};
        }
    }

    /**
     * @description 接受
     */
    async function accept(friendReq) {
        try {
            let res = Request.post(`/api/friend/manage`, {
                data: {
                    type: "accept",
                    NO: friendReq.NO,
                    friendId: friendReq.userId
                }

            })
            
        } catch (error) {
            console.error("accept error: ", error);
        }
    }

    let currUserId = ref(localStorage.getItem('userId') || "");
    return {
      showInput,
      userId,
      friendReq,
      showNotFound,
      currUserId,

      t,
      search,
      accept
    }

  },
}
</script>

<style scoped>
    .friend-request-page {
        /* 
            --FriendReq-color: #333;
            --FriendReq-color_secondary: #b4b4b4;

            --FriendReq_bg: #ededed;
            --FriendReq-bg_secondary: #FFF;
            
            --FriendReq-btn-color: #5d6d77;

            --FriendReq-btn_add-color: #FFF;
            --FriendReq-btn_add_bg: #04c660; 

            --FriendReq-card_color: #000;
            --FriendReq-card_bg: #FFF;
        */
        

        width: 100%;
        height: 100%;
        background-color: var(--FriendReq_bg);
        font-size: .93rem;
    }

    .search_fake {
        margin: 1rem auto;
        display: flex;
        justify-content: center;
        align-items: center;
        width: calc(100% - 1.4rem);
        height: 1.9rem;
        color: var(--FriendReq-color_secondary);
        background-color : var(--FriendReq-bg_secondary);
        font-size: .93rem;
        line-height: 1rem;
    }

    .search-container {
        box-sizing: border-box;
        padding-top: .5rem;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: var(--FriendReq_bg);
        z-index: 11;
    }
    .search-container .search-input {
        /* margin: 1rem auto; */
        display: inline-block;
        width: calc(100% - 4rem);
        height: 1.9rem;
        color: var(--FriendReq-color);
        background-color : var(--FriendReq-bg_secondary);
        font-size: .93rem;
        text-indent: 1.9rem;
        border-radius: .17rem;
        border: none;
        outline: none;
    }
    .search-container button {
        padding: 1px 0;
        width: 2.6rem;
        height: 1.9rem;
        color: var(--FriendReq-btn-color);
        background-color: transparent;
        font-size: .93rem;
        border: none;
    }
    .search-container .search_go {
        box-sizing: border-box;
        /* padding: 0.93rem; */
        margin-top: .5rem;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        height: 3.75rem;
        color: var(--ki-modal-color);
        line-height: 1rem;
        background-color: var(--FriendReq-bg_secondary);
    }

    .search_go .icon-search {
        margin: 0 .93rem;
        width: 2.82rem;
        height: 2.82rem;
        border-radius: .09rem;
        background: green;
    }

    .userid-container {
        margin-bottom: 1rem;
        color: var(--FriendReq-color_secondary);
        font-size: .76rem;
    }

    .request-card {
        box-sizing: border-box;
        padding-left: 0.93rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 4.21rem;
        /* background: orange; */
        color: var(--FriendReq-card_color);
        background-color: var(--FriendReq-card_bg, #FFF);
    }

    .request-card .card-avatar {
        width: 2.82rem;
        height: 2.82rem;
        border-radius: .22rem;
    }

    .request-card .card-body {
        margin-left: .93rem;
        flex-grow: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100%;
        text-align: left;
        font-size: .8rem;
    } 
    .request-card span:last-child {
        /* color: #838383; */
        color: var(--FriendReq-color_secondary);
    }

    .request-card  button {
        /* width: 5.14rem; */
        margin: 0 .61rem;
        width: 4.02rem;
        color: var(--FriendReq-color_secondary);
        background: transparent;
        font-size: .9rem;
        border: none;
        outline: none;
    }

    .request-card .btn-add {
        margin: 0 .87rem;
        width: 3.5rem;
        height: 1.5rem;
        color: #FFF;
        background: #04c660;
        line-height: 1.4rem;
        border-radius: .22rem;
    }

    .user-non_existent {
        margin-top: .5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 6.23rem;
        color: var(--FriendReq-color_secondary);
        background: var(--FriendReq-bg_secondary);
        font-size: .8rem;
    }

</style>