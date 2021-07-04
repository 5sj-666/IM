<template>
  <article class="me-container">
    <so-profile name="Natural" id="Greenschick"></so-profile>

    <!-- <img width="50" height="50" src="../../assets/icon/me-img.png" /> -->
    <!-- <so-cell></so-cell> -->

    <div
      class="border-line_top border-line_bottom"
      style="margin-top:0.5rem"
      v-for="(cells, indexs) in cellList"
      :key="indexs"
    >
      <so-cell
        v-for="(cell, index) in cells"
        :key="index"
        :name="cell.name"
        :isLast="index == cells.length - 1 ? true : false"
        @click="cell.event"
      >
        <img style="width: 1.5rem;height: 1.5rem;" :src="cell.icon" />
      </so-cell>
    </div>

    <!-- <div>国际化 {{t('aowu.test.btnContent')}}</div> -->

    <!-- <button style="margin-top: 2rem;" @click="launchFullScreen()">开启全屏</button> -->
  </article>
</template>

<script>
import SoProfile from "@/components/so-profile.vue";
import SoCell from "@/components/so-cell.vue";

// import kiHeader from "@/components/ki-header.vue"

//use表示这个是一个复用（composition约定如此）
// import useI18n from "@/local/index.js"

// console.log("fanyi函数",t('aowu.test.btnContent'));

import {useRouter} from "vue-router";

export default {
  components: {
    SoProfile,
    SoCell,
    // kiHeader
  },
  setup() {
    const Router =  useRouter();
    // const { t } = useI18n;

    // const launchFullScreen = () => {
    //   // console.log("切换全屏");
    //   const element = document.documentElement;
    //   if (element.requestFullscreen) {
    //     element.requestFullscreen();
    //   } else if (element.mozRequestFullScreen) {
    //     element.mozRequestFullScreen();
    //   } else if (element.webkitRequestFullscreen) {
    //     element.webkitRequestFullscreen();
    //   } else if (element.msRequestFullscreen) {
    //     element.msRequestFullscreen();
    //   }
    //   // document.documentElement.webkitRequestFullscreen();
    // };

    // function t = t;

    // const loginOut = () => {
    //   console.log("---登出---");
    //   localStorage.setItem('token', '');
    //   Router.replace('/login');
    // }
    const goSetting = () => {
      Router.push('/setting');
    }

    const avatarUrl = require("../../assets/img/avatar.jpg");

    const cellList = [
      [
        {
          icon: require("../../assets/icon/me-pay.png"),
          name: "支付",
          event: ""
        }
      ],
      [
        {
          icon: require("../../assets/icon/me-collection.png"),
          name: "收藏",
          event: ""
        },
        {
          icon: require("../../assets/icon/me-photo.png"),
          name: "相册",
          event: ""
        },
        {
          icon: require("../../assets/icon/me-cards.png"),
          name: "卡包",
          event: ""
        },
        {
          icon: require("../../assets/icon/me-smile.png"),
          name: "表情",
          event: ""
        }
      ],
      [
        {
          icon: require("../../assets/icon/me-setting.png"),
          name: "设置",
          event: goSetting
        }
      ],
      // [
      //   // {
      //   //   icon: require("../../assets/icon/me-setting.png"),
      //   //   name: "切换语言",
      //   //   event: ""
      //   // },
      //   {
      //     icon: require("../../assets/icon/me-setting.png"),
      //     name: "切换全屏",
      //     event: launchFullScreen
      //   },
      //   {
      //     icon: require("../../assets/icon/me-setting.png"),
      //     name: "退出登录",
      //     event: loginOut
      //   },
      // ]
    ];

    return {
      // launchFullScreen,
      cellList,
      avatarUrl,
      // loginOut,
      goSetting
      // t
    };
  }
};
</script>

<style lang="stylus" scoped>
@import '../../css/common.styl';
@import '../../css/variable.styl';

// $me-container-color = #ededed;
.me-container {
  box-sizing: border-box;
  padding-bottom: 3rem;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
  height: 100%;
  max-height: 100%;
  background-color: $me-container-color;
  overflow: scroll;
}
</style>
