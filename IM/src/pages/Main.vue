<template>
  <!-- <article class="main-container" v-if="!showSkeleton"> -->
  <article class="main-container">
    <ki-skeleton v-model="showSkeleton"></ki-skeleton>

    <ki-header id="headerDom" :title="headerTitle" style="position: absolute;transition: all 0s linear; will-change: transform" :iconBack="false" />
    <div class="header_fake"></div>
    <ki-swiper :activeIndex="activeIndex.index">
      <template v-slot:firstItem>
        <!-- <Chats @click="toDialogue"></Chats> -->
        <Chats :friendList="friendList"></Chats>
      </template>
      <template v-slot:secondItem>
        <Contacts :friendList="friendList"></Contacts>
      </template>
      <template v-slot:thirdItem>
        <Discover></Discover>
      </template>
      <template v-slot:fourthItem>
        <Me></Me>
      </template>
    </ki-swiper>

    <main-tab></main-tab>

  </article>

</template>

<script>

// const js = import("@chuanxi/hello-wasm/hello_wasm.js");
// js.then(js => {
//   js.greet("WebAssembly");
// });


import { computed, reactive, watchEffect, onMounted, onActivated, onDeactivated, onBeforeUnmount, ref, nextTick } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import useI18n from "@/local/index";
import EventBus from "@/utils/eventBus"


import KiSwiper from "../components/ki-swiper";
import Chats from "./Main/Chats";
import Contacts from "./Main/Contacts";
import Discover from "./Main/Discover";
import Me from "./Main/Me";
import MainTab from "../components/main-tab";
import kiHeader from "@/components/ki-header.vue";
import kiSkeleton from '@/components/ki-skeleton.vue';

import Request from "@/utils/request";

export default {
  name: "Main",
  components: {
    kiHeader,
    KiSwiper,
    Chats,
    Contacts,
    Discover,
    Me,
    MainTab,

    kiSkeleton
  },
  setup() {
    const Router = useRouter(),
          Route = useRoute(),
          Store = useStore(),
          { t } = useI18n();

    let headerTitle  = ref("通讯录");

    let lang = ref(localStorage.getItem("lang"));

    let currentIndex = ref(1);

    EventBus.on('clickTab', payload => {
      currentIndex.value = payload.tab;
      // debugger;
    })


    onMounted(()=>{
        if(!localStorage.getItem('token')) 
          Router.replace("/login")

        // 在此初始化websocket连接
        Store.dispatch('wsStore/initWS', {Router: Router});
        Store.dispatch('idbStore/initIDB');
        // console.log("---idb connection: ", Router.idbStore.db);

        Store.dispatch('getProfile');

        getFriendList();

        // caches.open(localStorage.getItem('userId'))
        // .then(function(cache) {
        //   return cache.add('https://www.fffuture.top:443/avatar/361d0c1c185b695d49b1a3dc3efaef3a.jpeg');
        // });
    });

    onActivated(() => {
      if(Route.query && (Route.query.from === "login" || Route.query.from ==="addFriend")) {
          getFriendList();
      }
      nextTick(()=>{
        EventBus.emit('clickTab', {tab: currentIndex.value});
        // debugger;
      })
    });
    
    onDeactivated(()=> {
      // console.log("---MAIN onDeactivated");
    })

    onBeforeUnmount(() =>{
      // console.log("---MAIN onBeforeUnmount");
    });

    let activeIndex = reactive({
      index: 1
    });


    let fieldMap = {
      0: t('App.Main.chats'),
      1: t('App.Main.contact'),
      2: t('App.Main.discover')
    }


    
    EventBus.on('scrollX', payload => {
      
      currentIndex.value = getTabIndex(payload.ScrollPct);

      if(payload.ScrollPct >= 0.667) {
        document.querySelector('#headerDom').style.transform = `translateX(-${(payload.ScrollPct - 0.667) * 3 * document.body.clientWidth}px)`;
      }else {
        document.querySelector('#headerDom').style.transform = `translateX(0px)`;
      }
      try {
        headerTitle.value = fieldMap[Math.round(payload.ScrollPct * 3)];
      } catch (error) {
        // headerTitle.value = '';
        debugger;
      }


      /**
       * @description 根据滑动的百分比数计算当前激活的tab页面索引
       * @param {number} ScrollPct 
       */
      function getTabIndex(pct) {
        //正常判断下写法如下： 判断条件太多
        // let index = 1;
        // if(pct < 0.333) {
        //   index = 0;
        // }else if(pct < 0.667) {
        //   index = 1;
        // }else if(pct < 1) {
        //   index = 2;
        // }else {
        //   index = 3;
        // }

        // 优化下：
        let keyPoint = [.333, .667, 1];
        let index = keyPoint.findIndex(point => pct < point);
        return index === -1 ? 3 : index;
      }

    });

    function toDialogue() {
      Router.push("/Dialogue");
    }

    const showSkeleton = ref(true);

    const friendList = ref([]);
    async function getFriendList() {
      // console.log("---getFriendList");
      let res = await Request.post("/api/friend/getFriendList");
      console.log("---getFriendList: ", res);
      if(res.ok) {
        friendList.value = res.data;
        console.log("---getFriendList  friendList: ", friendList);
      }

      // showSkeleton.value = false;
      showSkeleton.value = false;
    }


    return {
      headerTitle,
      activeIndex,
      toDialogue,
      friendList,

      showSkeleton,
    };
  }
};
</script>

<style scoped>

  .main-container {
    /* --Main-bg: #FFF;
    --Main-header_fake-color: #FFF;
    --Main-color: #000;
    */

    box-sizing: border-box;
    padding-top: 3rem;
    position: relative;
    width: 100%;
    height: 100%;
    background: var(--Main-bg);
    overflow: hidden;
    user-select: none;
  }

  .main-container .header_fake{
    box-sizing: border-box;
    margin: 0;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 3.26rem;
    background: var(--Main-header_fake-bg, #000);
    z-index: 9;
  }

</style>
