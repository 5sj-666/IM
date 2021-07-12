<template>
  <router-view v-slot="{ Component }">
    <transition :name="transitionName" mode="default">
      <keep-alive :include="['Main']">
          <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue';


export default defineComponent({
  name: 'App',
  components: {
    // mainPage
  },
  data(){
    return {
      transitionName: "",
    }
  },
  watch: {
    '$route' (to, from) {
      // console.log("---app $route : to: ", to, "---from: ", from);
      if(to.path == from.path) {
        this.transitionName = "";
        return ;
      }
      this.transitionName = to.meta.rank > from.meta.rank ? 'slide-deep' : 'slide-shallow';
    }
  }


});
</script>

<style>
:root {
  --header-bg: rgb(237, 237, 237);

  --transition-time: .2s;
}

:root[data-theme="dark"] {
  --header-bg: rgb(33, 33, 33);
}

html, body, #app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

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




/*
  分析:  shallow -> deep动画：原组件保持不动，新进组件从右到左滑动进来
         deep -> shallow动画：原组件从左到右滑动出去，新组件保持不动
 */
.slide-deep-enter-active {
  position: absolute !important;
  left: 100%;
  top: 0;
  z-index: 100;
  transition: all var(--transition-time) linear;
}
.silde-deep-enter-from {
  position: absolute !important;
  left: 100%;
  top: 0;
  z-index: 100;
}
.slide-deep-enter-to {
  position: absolute !important;
  left: 0;
  top: 0;
  z-index: 100;
}

.slide-deep-leave-active {
  position: absolute !important;
  left: 0;
  top: 0;
  z-index: -1;
  transition: all var(--transition-time) ease-out;
}
.silde-deep-leave-from {
  position: absolute !important;
  left: 0;
  top: 0;
  z-index: -1;
}
.slide-deep-leave-to {
  position: absolute !important;
  left: 0;
  top: 0;
  z-index: -1;
}






.slide-shallow-leave-active {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 100;
  transition: all var(--transition-time) ease-in;
}
.slide-shallow-leave-from {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 100;
}
.slide-shallow-leave-to {
  position: absolute;
  left: 100%;
  z-index: 100;
}

.slide-shallow-enter-active {
  position: absolute;
  left: 0%;
  top: 0;
  z-index: 90;
  transition: all var(--transition-time) ease-in;
}
.slide-shallow-enter-from {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 90;
}
.slide-shallow-enter-to {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 90;
}


</style>
