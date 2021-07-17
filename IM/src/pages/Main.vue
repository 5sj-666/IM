<template>
  <article class="main-container">
    <!-- <header class="main-head">
      <div class="main-head-title">发现</div>
      <div class="main-head-imgs">
        <div>放大镜</div>
        <div>添加</div>
      </div>
    </header> -->
    <ki-header id="main-header" :title="headerTitle" :iconBack="false"></ki-header>
    <div class="fake-header"></div>
    <ki-swiper :activeIndex="activeIndex.index" @swipeEvent="swipeEvent($event,param)">
      <template v-slot:firstItem>
        <!-- <Chats @click="toDialogue"></Chats> -->
        <Chats></Chats>
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
import { computed, reactive, watchEffect, onMounted, onActivated, onDeactivated, onBeforeUnmount, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import useI18n from "@/local/index"


import KiSwiper from "../components/ki-swiper";
import Chats from "./Main/Chats";
import Contacts from "./Main/Contacts";
import Discover from "./Main/Discover";
import Me from "./Main/Me";
import MainTab from "../components/main-tab";
import kiHeader from "@/components/ki-header.vue";


// import Request from "@/utils/request"

export default {
  name: "Main",
  components: {
    kiHeader,
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
      console.log("aaaa", param, swipeParam);


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

      if(param.activeIndex === 2) {
        if(param.progress < 0) {
          // console.warn("----位移header: ", header, "--距离: ", window.screen.width * param.progress);
          header.style.transform = `translateX(${window.screen.width * param.progress}px)`;
          header.style.transition = "all .0s ease-out";
        }
        if(param.step == "panend") {
          console.warn("---执行panend");
          header.style.transform = `translateX(0%)`;
          header.style.transition = `all ${.25}s ease-out` ;
        }
      }else if(param.activeIndex === 3) {
        if(param.progress > 0) {
          // console.warn("----位移header: ", header, "--距离: ", window.screen.width * param.progress);
          // header.style.left = "-100%";
          header.style.transform = `translateX(${window.screen.width * (param.progress - 1)}px)`;
          header.style.transition = "all .0s ease-out";
        }
        if(param.step === "panend") {
          console.warn("---执行panend");
          // header.style.left = "-100%";
          header.style.transform = `translateX(-100%)`;
          header.style.transition = `all ${.25}s ease-out` ;
        }
      }


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


    let headerTitle = computed(()=>{
      let fieldMap = {
        0: "微信",
        1: "通讯录",
        2: "发现"
      }
      return swipeParam.progress === 0 && Reflect.has(fieldMap, swipeParam.activeIndex) ? fieldMap[swipeParam.activeIndex] : "";
    })

    return {
      headerTitle,
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
    /* --main-head-bg: #ededed; */
    --main-head-color: #000;

    box-sizing: border-box;
    padding-top: 3rem;
    position: relative;
    width: 100%;
    height: 100%;
    background: var(--main-bg_primary);
    overflow: hidden;
    user-select: none;
  }

  .main-container .fake-header{
    box-sizing: border-box;
    margin: 0;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 3rem;
    background: #FFF;
    z-index: 9;
  }

  /* .main-head {
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
  } */
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
