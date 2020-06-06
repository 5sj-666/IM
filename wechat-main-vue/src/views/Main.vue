<template>
  <article class="main-container">
    <header class="main-head">
      <div class="main-head-title">发现</div>
      <div class="main-head-imgs">
        <div>放大镜</div>
        <div>添加</div>
      </div>
    </header>
    <so-swiper @swipeEvent="swipeEvent($event,param)">
      <template v-slot:firstItem>
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
    </so-swiper>

    <main-tab :tabList="tabList" :swipeParam="swipeParam"></main-tab>
  </article>
</template>

<script>
import { reactive, toRefs } from "vue";
import SoSwiper from "../components/so-swiper";
import Chats from "./Main/Chats";
import Contacts from "./Main/Contacts";
import Discover from "./Main/Discover";
import Me from "./Main/Me";
import MainTab from "../components/main-tab";

export default {
  components: {
    SoSwiper,
    Chats,
    Contacts,
    Discover,
    Me,
    MainTab
  },
  setup() {
    let swipeParam = reactive({
      progress: 0,
      activeIndex: 0,
      step: "panend"
    });
    function swipeEvent(param) {
      swipeParam.progress = param.progress;
      swipeParam.activeIndex = param.activeIndex;
      swipeParam.activeIndex = param.activeIndex;
      console.log("aaaa", param, swipeParam);
    }

    let colorManage = reactive({
      MeColor: "#00f",
      MeBg: "#00f"
    });

    setTimeout(() => {
      colorManage.MeBg = "#0f0";
      console.log("颜色转化", colorManage.MeBg);
    }, 2000);
    setTimeout(() => {
      colorManage.MeBg = "#0ff";
      console.log("颜色转化", colorManage.MeBg);
    }, 4000);

    let tabList = reactive([
      {
        name: "微信",
        icon: "CHATS",
        iconColor: "#000",
        iconBg: "#f00"
      },
      {
        name: "通讯录",
        icon: "CONTACTS",
        iconColor: "#000",
        iconBg: "#f00"
      },
      {
        name: "发现",
        icon: "DISCOVER",
        iconColor: "#00f",
        iconBg: "#f00"
      },
      {
        name: "我",
        icon: "ME",
        iconColor: "#000",
        iconBg: "#f00"
      }
    ]);

    return {
      swipeParam,
      swipeEvent,
      tabList,
      ...toRefs(colorManage)
    };
  }
};
</script>

<style lang="stylus" scoped>
@import '../css/variable.styl';

// // 主色调
// $main-bg_primary = #fff;
// $main-color_primary = #ededed;
// // header颜色
// $main-head-color = #000;
// $main-head-bg = #ededed;
// // tab颜色
// $main-tab-color = #000;
// $main-tab-bg = #f7f7f7;
// $main-tab-border_color = #d6d6d6;
.main-container {
  box-sizing: border-box;
  position: relative;
  // padding-top: 3rem;
  position: relative;
  width: 100%;
  height: 100%;
  background: $main-background_primary;
  overflow: hidden;
  user-select: none;

  .main-head {
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 3rem;
    background-color: $main-head-bg;
    font-size: 0.95rem;
    z-index: 10;

    .main-head-title {
      margin: 0;
      padding: 0 0.85rem;
      color: $main-head-color;
    }

    .main-head-imgs {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      div {
        margin: 0 0.85rem;
      }
    }
  }
}
</style>
