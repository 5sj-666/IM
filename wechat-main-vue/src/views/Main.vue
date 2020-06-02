<template>
  <article class="main-container">
    <header class="main-head">
      <div class="main-head-title">发现</div>
      <div class="main-head-imgs">
        <div>放大镜</div>
        <div>添加</div>
      </div>
    </header>

    <Chats v-show="tabList[0].active"></Chats>

    <Contacts v-show="tabList[1].active"></Contacts>

    <Discover v-show="tabList[2].active"></Discover>

    <Me v-show="tabList[3].active"></Me>

    <footer class="main-tab">
      <div
        class="main-tab-item"
        v-for="(tab,index) in tabList"
        :key="index"
        @click="changeTab(index)"
      >
        <!-- <img src="" alt=""> -->
        <div
          style="
                box-sizing:border-box;
                width: 1.52rem;
                height: 1.52rem;
                border: 1px solid #ddd;
                "
        ></div>
        {{tab.name}}
      </div>
    </footer>
  </article>
</template>

<script>
import { ref, reactive } from "vue";
import Chats from "./Main/Chats";
import Contacts from "./Main/Contacts";
import Discover from "./Main/Discover";
import Me from "./Main/Me";

export default {
  components: {
    Chats,
    Contacts,
    Discover,
    Me
  },
  setup() {
    const content = ref("主页面内容");
    // console.log("content:", content, "/n content value:", content.value);

    let tabList = reactive([
      {
        name: "微信",
        active: false
      },
      {
        name: "通讯录",
        active: false
      },
      {
        name: "发现",
        active: false
      },
      {
        name: "我",
        active: true
      }
    ]);

    function changeTab(index) {
      // console.log("index", index);
      for (let item of tabList) {
        item.active = false;
      }
      tabList[index].active = true;
      return index;
    }

    return {
      content,
      tabList,
      changeTab
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
  padding-top: 3rem;
  position: relative;
  width: 100%;
  height: 100%;
  background: $main-background_primary;
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

  .main-tab {
    box-sizing: border-box;
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    width: 100%;
    height: 3.26rem;
    color: $main-tab-color;
    font-size: 0.65rem;
    background: $main-tab-bg;
    z-index: 10;

    &:after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      border-top: 1px solid $main-tab-border_color;
      z-index: 100;
      transform-origin: 0 0;
      transform: scale(1, 0.25);
    }

    .main-tab-item {
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      flex-grow: 1;
      min-width: 0;
      height: 100%;
    }
  }
}
</style>