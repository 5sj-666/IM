<template>
  <article class="main-container">
    <header class="main-head">
      <div class="main-head-title">发现</div>
      <div class="main-head-imgs">
        <div>放大镜</div>
        <div>添加</div>
      </div>
    </header>
    <ki-swiper :activeIndex="activeIndex.index" @swipeEvent="swipeEvent($event,param)">
      <template v-slot:firstItem>
        <Chats @click="toDialogue"></Chats>
      </template>
      <template v-slot:secondItem>
        <Contacts></Contacts>
      </template>
      <template v-slot:thirdItem>
        <Discover></Discover>
      </template>
      <template v-slot:fourthItem>
        <Me></Me>
      </template>
    </ki-swiper>

    <main-tab :tabList="tabList" :swipeParam="swipeParam" @changeTab="changeTab($event,index)"></main-tab>
  </article>
</template>

<script>
import { reactive, watchEffect, onMounted, onActivated, onDeactivated, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

import KiSwiper from "../components/ki-swiper";
import Chats from "./Main/Chats";
import Contacts from "./Main/Contacts";
import Discover from "./Main/Discover";
import Me from "./Main/Me";
import MainTab from "../components/main-tab";

import useI18n from "@/local/index"

// import Request from "@/utils/request"

export default {
  name: "Main",
  components: {
    KiSwiper,
    Chats,
    Contacts,
    Discover,
    Me,
    MainTab
  },
  setup() {
    const Router = useRouter(),
          Store = useStore(),
          { t } = useI18n();

    onMounted(()=>{
      if(!localStorage.getItem('token')) 
        Router.replace("/login")
        // console.log("--onMounted token:", localStorage.getItem('token'));
        console.log("---Main onMounted!!");
        // getFriendList();

        // 在此初始化websocket连接
        Store.dispatch('wsStore/initWS', {Router: Router});

    });

    onActivated(()=> {
      console.log("---MAIN onActivated");
    });
    onDeactivated(()=> {
      console.log("---MAIN onDeactivated");
    })

    onBeforeUnmount(() =>{
      console.log("---MAIN onBeforeUnmount");
    });

    // async function getFriendList() {
    //   console.log("---getFriendList");
    //   let res = await Request.post("/api/friend/getFriendList");
    //   console.log("---getFriendList: ", res);
    // }

    let activeIndex = reactive({
      index: 1
    });

    function changeTab(index) {
      // console.log("main changeTab:", index);
      activeIndex.index = index;
    }

    watchEffect(() => {
      // console.log("mian 1111");
      return activeIndex.value;
    });

    let swipeParam = reactive({
      progress: 0,
      activeIndex: 0,
      step: "panend"
    });
    function swipeEvent(param) {
      swipeParam.progress = param.progress;
      swipeParam.activeIndex = param.activeIndex;
      swipeParam.step = param.step;
      // console.log("aaaa", param, swipeParam);
    }

    let tabList = reactive([
      {
        name: t('App.Main.chats'),
        icon: "CHATS",
        iconColor: "#000",
        iconBg: "#f00"
      },
      {
        name: t('App.Main.contact'),
        icon: "CONTACTS",
        iconColor: "#000",
        iconBg: "#000"
      },
      {
        name: t('App.Main.discover'),
        icon: "DISCOVER",
        iconColor: "#00f",
        iconBg: "#f00"
      },
      {
        name: t('App.Main.mine'),
        icon: "ME",
        iconColor: "#000",
        iconBg: "#f00"
      }
    ]);

    function toDialogue() {
      Router.push("/Dialogue");
    }

    return {
      swipeParam,
      swipeEvent,
      tabList,
      activeIndex,
      changeTab,
      toDialogue,
    };
  }
};
</script>

<style scoped>

  .main-container {
    --main-bg_primary: #FFF;
    --main-head-bg: #ededed;
    --main-head-color: #000;

    box-sizing: border-box;
    position: relative;
    position: relative;
    width: 100%;
    height: 100%;
    background: var(--main-bg_primary);
    overflow: hidden;
    user-select: none;
  }

  .main-head {
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 3rem;
    background-color: var(--main-head-bg);
    font-size: 0.95rem;
    z-index: 10;
  }
  .main-head-title {
    margin: 0;
    padding: 0 0.85rem;
    color: var(--main-head-color);
  }

  .main-head-imgs {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  div {
    margin: 0 0.85rem;
  }

</style>
