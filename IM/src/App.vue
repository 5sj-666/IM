<template>
  <router-view v-slot="{ Component }">
    <transition :name="Transition">
      <keep-alive :include="['Main']">
          <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script>
// import { useStore } from 'vuex';

import { useRouter } from "vue-router";
import { useStore, mapState } from "vuex";
import { computed, onMounted, ref } from 'vue';


export default {
  name: 'App',
  setup() {
    const Store = useStore();
    const Router = useRouter();

    let transitionName = computed(() => Store.state.transitionName);
    
    let Transition = ref('');

    onMounted(()=> {
      //预渲染事件执行
      document.dispatchEvent(new Event('render-event'));
      //初始化检测主题
      document.documentElement.dataset.theme = localStorage.getItem("theme") || "normal";
    
      Router.afterEach((to, from) => {
        // debugger;
        if(!to.meta.rank || !from.meta.rank) {
          Transition.value = 'main';
          // debugger;
          return;
        }
        if(to.meta.rank === from.meta.rank) {
          Transition.value = 'slide-deep';
          // debugger;
        }else {
          Transition.value = to.meta.rank < from.meta.rank ? 'slide-shallow' : 'slide-deep';
          // debugger;
        }
      })
    
    })

    return {
      transitionName,
      Transition,
      Router,
    }
  }
}
</script>

<style>
:root {

  --transition-time: .2s;
  --transition-time-short: .15s; 
  /* --- Main Page --- */
  --Main-color_primary: #1b1b1b;
  --Main-color_secondary: #7e7e7e;
  --Main-bg: #ededed;
  --Main-header_fake-bg: #FFF;

  /* --- Charts Page --- */
  --Charts-bg: --Main-bg;
  --Chats-color_primary: --Main-color_primary;
  --Chats-color_secondary: --Main-color_secondary;
  --Chats-cell-bg: var(--Main-header_fake-bg);

  /* --- --Contacts Page --- */
  --Contacts-bg: --Main-bg;

  /* --- Discover Page --- */
  --Discover-bg: --Main-bg;

  /* --- Me Page --- */
  --Me-bg: --Main-bg;

  /* --- Profile Page --- */
  --Profile_bg: var(--Main-bg);
  --Profile-btn_color: #576b86;
  --Profile-btn_bg: var(--Main-header_fake-bg);

  /* --- Dialogue Page --- */
  --Dialogue-bg: var(--Main-bg);
  --Dialogue-footer-bg: var(--main-tab-bg);
  --Dialogue-color: var(--Main-color_primary);
  --Dialogue-input-bg: var(--Main-header_fake-bg);
  --Dialogue-btn_send-color: #FFF;
  --Dialogue-btn_send-bg: #04c660;

  /* --- --- */
  --FriendReq-color: var(--Main-color_primary);
  --FriendReq-color_secondary: var(--Main-color_secondary);
  --FriendReq_bg: var(--Main-bg);
  --FriendReq-bg_secondary: var(--Main-header_fake-bg);
  --FriendReq-btn-color: var(--Profile-btn_color);
  --FriendReq-btn_add-color: #FFF;
  --FriendReq-btn_add_bg: #04c660;
  --FriendReq-card_color: #000;
  --FriendReq-card_bg: #FFF;

  /* --- AddFriend Page --- */
  --AddFriend_bg: var(--Main-bg);
  --AddFriend-btn_color: var(--Profile-btn_color);
  --AddFriend-btn_bg: var(--Main-header_fake-bg);


  /* --- ki-header Component --- */
  --svg-arrow_stroke: var(--Main-color_primary);
  --ki-header-color: var(--Main-color_primary);
  --ki-header-bg: var(--Main-bg);

  /* --- ki-cell Component --- */
  --ki-cell-bg: var(--Main-header_fake-bg);
  --ki-color_primary: var(--Main-color_primary);
  --ki-color_secondary: var(--Main-color_secondary);

  /* --- ki-profile Component --- */
  --ki-profile-bg: var(--Main-header_fake-bg);
  --ki-color_primary: var(--Main-color_primary);
  --ki-color_secondary: var(--Main-color_secondary);

  /* --- main-tab Component --- */
  --main-tab-color: var(--Main-color_primary);
  --main-tab-bg: #f7f7f7;
  --main-tab-border_color: var(--Main-color_secondary); 

  /* --- Setting Component --- */
  --Setting-bg: var(--Main-bg);


  /* main-tab */
  --svg-fill: #f7f7f7;
  --svg-stroke: #000;

  /* Ki-Modal */
  --ki-modal-color: var(--Main-color_primary);
  --ki-modal-corlor_secondary: #58708d;
  --ki-modal-bg: #FFF;
  --ki-modal-border_color:  #e0e0e0;



}

:root[data-theme="dark"] {

  /* --- Main Page --- */
  --Main-color_primary: #d2d2d2;
  --Main-color_secondary: #959595;
  --Main-bg: #111;
  --Main-header_fake-bg: #191919;

  /* FriendRequest Page */
  --FriendReq-card_color: #d1d1d1;
  --FriendReq-card_bg: #2c2c2c;

  /* --- main-tab Component --- */
  --main-tab-bg: #1f1f1f;

  /* main-tab */
  --svg-fill: #1f1f1f;
  --svg-stroke: #d7d7d7;

  /* Ki-Modal */
  --ki-modal-corlor_secondary: #83909b;
  --ki-modal-bg: #2c2c2c;
  --ki-modal-border_color: #373737;
}

html, body, #app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
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

/* #app {
  transition: color 3s linear;
} */

/* *@rem+vw布局  动态改变font-size的值
 */
html {
  font-size: 16px;
}

@media screen and (min-width: 375px) {
  html {
    /* 设计图是375px时候 1rem = 16px  iPhone6的375px尺寸作为16px基准，414px正好18px大小, 600 20px */
    font-size: calc(100% + 2 * (100vw - 375px) / 39);
    font-size: calc(16px + 2 * (100vw - 375px) / 39);
  }
}

@media screen and (min-width: 414px) {
  html {
    /* 414px-1000px每100像素宽字体增加1px(18px-22px) */
    font-size: calc(112.5% + 4 * (100vw - 414px) / 586);
    font-size: calc(18px + 4 * (100vw - 414px) / 586);
  }
}

@media screen and (min-width: 600px) {
  html {
    /* 600px-1000px每100像素宽字体增加1px(20px-24px) */
    font-size: calc(125% + 4 * (100vw - 600px) / 400);
    font-size: calc(20px + 4 * (100vw - 600px) / 400);
  }
}

@media screen and (min-width: 1000px) {
  html {
    /* 1000px往后是每100像素0.5px增加 */
    font-size: calc(137.5% + 6 * (100vw - 1000px) / 1000);
    font-size: calc(22px + 6 * (100vw - 1000px) / 1000);
  }
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  /* background-color: yellow; */
}


.main-enter-active, .main-enter-to, .main-leave-active, .main-leave-to {
  position: absolute !important;
  left: 0;
  transform: translate3D(100%, 0, 0);
  top: 0;
  z-index: -1;
  transition: all var(--transition-time-short) cubic-bezier(.04, .69, .41, .98);
  will-change: transform;
}

/*
  分析:  shallow -> deep动画：原组件保持不动，新进组件从右到左滑动进来
         deep -> shallow动画：原组件从左到右滑动出去，新组件保持不动
 */
.slide-deep-enter-active {
  position: absolute !important;
  left: 100%;
  /* left: 0; */
  /* transform: translate3D(100%, 0, 0); */
  top: 0;
  z-index: 10;
  transition: all var(--transition-time) cubic-bezier(.04, .69, .41, .98);
  will-change: transform;
}
.slide-deep-enter-to {
  left: 0;
  /* transform: translate3d(0, 0, 0); */
}

.slide-deep-leave-active, .silde-deep-leave-from, .slide-deep-leave-to {
  position: absolute !important;
  left: 0;
  top: 0;
  z-index: 0;
  transition: all var(--transition-time-short) cubic-bezier(.04, .69, .41, .98);
}



.slide-shallow-leave-active {
  position: absolute !important;
  left: 0;
  top: 0;
  z-index: 10;
  transition: all var(--transition-time) cubic-bezier(.04, .69, .41, .98);
  /* will-change: transform; */
}
.slide-shallow-leave-to {
  left: 100%;
  /* transform: translate3d(100%, 0, 0); */
}

.slide-shallow-enter-active, .slide-shallow-enter-from, .slide-shallow-enter-to {
  position: fixed;
  left: 0%;
  top: 0;
  z-index: 0;
  transition: all var(--transition-time) cubic-bezier(.04, .69, .41, .98);
}


.border-line_top{
  position:relative;  
}
.border-line_top:before{
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  border-top: 1px solid #cdcdcd;
  z-index: 6;
  transform-origin:0% 0%;
  transform: scale(1, .25);
}
.border-line_bottom{
  position:relative;  
}
.border-line_bottom:after{
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  border-bottom: 1px solid #cdcdcd;
  z-index: 6;
  transform-origin: 0% 100%;
  transform: scale(1, .25);
}

.so-icon-QR_code {
  background-image: url('./assets/icon/icon-QR_code.png');
}

.so-icon-arrow_right {
  background-image: url('./assets/icon/icon-arrow_right.png');
}



</style>
