<template>
  <article class="main-container">
    <ki-header id="main-header" :title="headerTitle" :iconBack="false" style="position: absolute"></ki-header>
    <div class="header_fake"></div>
    <!-- <ki-swiper :activeIndex="activeIndex.index" @swipeEvent="swipeEvent($event,param)"> -->
    <ki-swiper :activeIndex="activeIndex.index">
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

    <!-- <main-tab :tabList="tabList" :swipeParam="swipeParam" @changeTab="changeTab($event,index)"></main-tab> -->
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

    let headerTitle  = ref("通讯录");

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

    let activeIndex = reactive({
      index: 1
    });

    watchEffect(() => {
      // console.log("mian 1111");
      return activeIndex.value;
    });

    let swipeParam = reactive({
      progress: 0,
      activeIndex: 0,
      step: "panend"
    });

    let fieldMap = {
      0: "微信",
      1: "通讯录",
      2: "发现"
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
      headerTitle,
      swipeParam,
      // swipeEvent,
      tabList,
      activeIndex,
      // changeTab,
      toDialogue,
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
