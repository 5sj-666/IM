<template>
  <article class="me-page">
      <ki-profile 
        :name="Store.state.profile.name" 
        :id="Store.state.profile.userId"
        :avatar="Store.state.profile.avatar ? '/avatar/'+Store.state.profile.avatar : ''"
      >
      </ki-profile>

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
        <!-- <img style="width: 1.5rem;height: 1.5rem;" :src="cell.icon" /> -->
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 100 100" style="bwidth: 1.5rem; height: 1.5rem;">
          <!-- <defs>
            <style type="text/css"><![CDATA[
              #minute {
                transform-origin: 50% 50%;
                animation: cursorRotate 3600s infinite linear;
              }
              #second {
                transform-origin: 50% 50%;
                animation: cursorRotate 60s infinite linear;
              }

              @keyframes cursorRotate {
                0% {
                  transform: rotate(0);
                }
                100% {
                  transform: rotate(360deg);
                }
              }
            ]]></style>
          </defs> -->
          <g fill="transparent" stroke="orange" stroke-width="5" stroke-lineCap="round">
            <circle cx=50 cy=50 r=47 ></circle>
            <line id="minute" x1="50"  y1="15" x2="50" y2="50" />
            <line id="second" x1="85"  y1="50" x2="50" y2="50" />
          </g>
        </svg>
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

import {useStore} from "vuex";

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

    const Store = useStore();
    // Store.state;
    // debugger;

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
      goSetting,
      // t

      Store,
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


  #minute {
    transform-origin: 50% 50%;
    animation: cursorRotate 3600s infinite linear;
  }
  #second {
    transform-origin: 50% 50%;
    animation: cursorRotate 60s infinite linear;
  }

  @keyframes cursorRotate {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
