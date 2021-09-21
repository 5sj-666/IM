<template>
  <!-- <article class="main-container" v-if="!showSkeleton"> -->
  <article class="main-container">
    <ki-skeleton v-model="showSkeleton"></ki-skeleton>

    <ki-header id="main-header" :title="headerTitle" :iconBack="false" style="position: absolute"></ki-header>
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
import { computed, reactive, watchEffect, onMounted, onActivated, onDeactivated, onBeforeUnmount, ref } from "vue";
import { useRouter } from "vue-router";
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
          Store = useStore(),
          { t } = useI18n();

    let headerTitle  = ref("通讯录");

    let lang = ref(localStorage.getItem("lang"));

    onMounted(()=>{
      if(!localStorage.getItem('token')) 
        Router.replace("/login")
        // console.log("--onMounted token:", localStorage.getItem('token'));
        // console.log("---Main onMounted!!");
        // getFriendList();

        // 在此初始化websocket连接
        Store.dispatch('wsStore/initWS', {Router: Router});
        Store.dispatch('idbStore/initIDB');
        // console.log("---idb connection: ", Router.idbStore.db);

        Store.dispatch('getProfile');

        // caches.open(localStorage.getItem('userId'))
        // .then(function(cache) {
        //   return cache.add('https://www.fffuture.top:443/avatar/361d0c1c185b695d49b1a3dc3efaef3a.jpeg');
        // });

    });

    onActivated(()=> {
      // console.log("---MAIN onActivated");
      
      // if(lang.value !== localStorage.getItem("lang")) {
      //   console.log("----执行刷新Main页面----");
      //   setTimeout(()=>{
      //     Router.go(0); //这里可能需要做骨架屏优化过渡
      //     lang.value = localStorage.getItem("lang");
      //   }, 300);
      // }

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

    EventBus.on('swipeEvent', param => {
      try {
        // console.log("---Main param: ", param);
        slideHeader(param.activeIndex, param.progress, param.step);
        headerTitle.value = fieldMap[param.activeIndex];
      } catch (error) {
        console.error("---Main EventBus: ", error);
      }
    });


    /**
     * @description 判断标题名称和是否需要坐位移
     * @params {number|string} index 当前tab位置
     */
    function slideHeader(index, progress, step) {
       //判断对header的位移
      /**
       * 
       * activeIndex === 2:  progress < 0; 即向右滑动，此时header应该向左滑动
       *    没有滑过去， activeIndex === 2 位置保持0
       *    滑过去，activeIndex === 3 位置-100%
       * 
       * activeIndex === 3: progress > 0; 即向左滑动，此时header应该向右滑动
       *    没有滑过去， activeIndex === 3 位置保持-100%
       *    滑过去，activeIndex === 2 位置0
       * 
       * 其他情况： 保持不变
       * 
       */
      const header = document.querySelector("#main-header");

      if(index === 2) { //param
        if(progress < 0) {
          // console.warn("----位移header: ", header, "--距离: ", window.screen.width * progress);
          header.style.transform = `translateX(${window.screen.width * progress}px)`;
          header.style.transition = "all .0s ease-out";
        }
        if(step == "panend") {
          // console.warn("---执行panend");
          header.style.transform = `translateX(0%)`;
          header.style.transition = `all ${.25}s ease-out` ;
        }
      }else if(index === 3) {
        if(progress > 0) {
          // console.warn("----位移header: ", header, "--距离: ", window.screen.width * progress);
          // header.style.left = "-100%";
          header.style.transform = `translateX(${window.screen.width * (progress - 1)}px)`;
          header.style.transition = "all .0s ease-out";
        }
        if(step === "panend") {
          // console.warn("---执行panend");
          // header.style.left = "-100%";
          header.style.transform = `translateX(-100%)`;
          header.style.transition = `all ${.25}s ease-out` ;
        }
      }else {
        //  console.warn("---执行panend");
          header.style.transform = `translateX(0%)`;
          header.style.transition = `all 0s ease-out` ;
      }
    }


    function toDialogue() {
      Router.push("/Dialogue");
    }


    onMounted(()=> {
      getFriendList();
    })

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



    // onMounted(()=>{
    //   setTimeout(()=> {
    //     showSkeleton.value = true;
    //   },5000)
    // })
    


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
