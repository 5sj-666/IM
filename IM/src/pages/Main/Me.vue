<template>
  <article class="me-page">
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
        :disable="cell.disable"
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
import useI18n from "@/local/index"

// console.log("fanyi函数",t('aowu.test.btnContent'));

import {useRouter} from "vue-router";

export default {
  components: {
    KiProfile,
    KiCell,
    // kiHeader
  },
  setup() {
    const Router =  useRouter(),
          { t } = useI18n();


    const goSetting = () => {
      Router.push('/setting');
    }

    const avatarUrl = require("../../assets/img/avatar.jpg");

    const cellList = [
      [
        {
          icon: require("../../assets/icon/me-pay.png"),
          name: t("App.Main.Me.pay"),
          disable: true
        }
      ],
      [
        {
          icon: require("../../assets/icon/me-collection.png"),
          name: t("App.Main.Me.favorites"),
          disable: true
        },
        {
          icon: require("../../assets/icon/me-photo.png"),
          name: t("App.Main.Me.myPosts"),
          disable: true
        },
        {
          icon: require("../../assets/icon/me-cards.png"),
          name: t("App.Main.Me.cards"),
          disable: true
        },
        {
          icon: require("../../assets/icon/me-smile.png"),
          name: t("App.Main.Me.stickerGallery"),
          disable: true
        }
      ],
      [
        {
          icon: require("../../assets/icon/me-setting.png"),
          name: t("App.Main.Me.setting"),
          event: goSetting,
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

.me-page {
  /* --Me-bg: #ededed; */
  
  box-sizing: border-box;
  padding-bottom: 3rem;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
  height: 100%;
  max-height: 100%;
  background-color: var(--Me-bg, #ededed);
  /* overflow: scroll; */
}
</style>
