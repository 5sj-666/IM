<template>
  <article class="me-container">
    <ki-profile name="Natural" id="Greenschick"></ki-profile>

    <!-- <img width="50" height="50" src="../../assets/icon/me-img.png" /> -->

   <div
      class="border-line_top border-line_bottom"
      style="margin-top:0.5rem"
      v-for="(cells, indexs) in cellList"
      :key="indexs"
    >
      <ki-cell
        v-for="(cell, index) in cells"
        :key="index"
        :name="cell.name"
        :isLast="index == cells.length - 1 ? true : false"
        @click="cell.event"
      >
        <img style="width: 1.5rem;height: 1.5rem;" :src="cell.icon" />
      </ki-cell>
    </div>

    <!-- <div>国际化 {{t('aowu.test.btnContent')}}</div> -->

    <!-- <button style="margin-top: 2rem;" @click="launchFullScreen()">开启全屏</button> -->
  </article>
</template>

<script>
import KiProfile from "@/components/ki-profile.vue";
import KiCell from "@/components/ki-cell.vue";

// import kiHeader from "@/components/ki-header.vue"

//use表示这个是一个复用（composition约定如此）
// import useI18n from "@/local/index.js"

// console.log("fanyi函数",t('aowu.test.btnContent'));

import {useRouter} from "vue-router";

export default {
  components: {
    KiProfile,
    KiCell,
    // kiHeader
  },
  setup() {
    const Router =  useRouter();
    // const { t } = useI18n;


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
    ];

    return {
      cellList,
      avatarUrl,
      goSetting
      // t
    };
  }
};
</script>

<style scoped>

.me-container {
  --me-container-color: #ededed;
  box-sizing: border-box;
  padding-bottom: 3rem;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
  height: 100%;
  max-height: 100%;
  background-color: var(--me-container-color);
  /* overflow: scroll; */
}
</style>
