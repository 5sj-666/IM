<template>
  <footer class="main-tab">
    <!-- <div class="main-tab-item" @click="changeTab(0)">
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="1.4rem" height="1.4rem" style="background: transparent" viewBox="0 0 100 100">
        <path d="M18 78 A 48 40, 0, 1, 1, 27 83.2 L 12 92Z" fill="#f7f7f7" stroke="rgb(0,0,0)" style="stroke-width: 6;" />
      </svg>
      微信
    </div> -->
    <div class="main-tab-item" @click="changeTab(0)">
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="1.4rem" height="1.4rem" style="background: transparent" viewBox="-2 -2 102 102">
        <!-- <path :class="['svg-color', 'svg-lweave']" d="M18 78 A 48 40, 0, 1, 1, 27 83.2 L 12 92Z"  :style="{strokeWidth: 6, fill: svgLeave.fill}" /> -->
        <!-- <path class="svg-color svg-leave" d="M18 78 A 48 40, 0, 1, 1, 27 83.2 L 12 92Z"  :style="{strokeWidth: 6}" /> -->
        <path :class="['svg-color', swiperIndex === 0 ? 'svg-leave' : '', swiperIndex === 1 && swiperProgress > 0 ? 'svg-enter' : '']" d="M18 78 A 48 40, 0, 1, 1, 27 83.2 L 12 92Z"  :style="{strokeWidth: 6}" />
      </svg>
      微信
    </div>
    
    <div class="main-tab-item" @click="changeTab(1)">
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="1.4rem" height="1.4rem" style="background: transparent" viewBox="-2 2 117 100">
        <path d="M4 98
              L 98 98
              Q 100 94, 94 90
              L 65 70
              Q 54 62, 60 55
              C 68 48, 70 45, 70 25
              C 68 -5, 32 -5, 30 25
              C 30 45, 32 48,  40 55
              Q 46 62, 35 70
              L 6 90
              Q 0 94, 2 98
              Z" 
              :class="['svg-color', swiperIndex === 1 ?  'svg-leave' : '', (swiperIndex === 2 && swiperProgress > 0) || (swiperIndex === 0 && swiperProgress < 0) ? 'svg-enter' : '' ]" style="stroke-width: 6;" stroke-linecap="round"
        />
        <line :class="['svg-color', swiperIndex === 1 ?  'svg-leave' : '', (swiperIndex === 2 && swiperProgress > 0) || (swiperIndex === 0 && swiperProgress < 0) ? 'svg-enter' : '' ]"  x1="80" y1="35" x2="120" y2="35" stroke-width="6" />
        <line :class="['svg-color', swiperIndex === 1 ?  'svg-leave' : '', (swiperIndex === 2 && swiperProgress > 0) || (swiperIndex === 0 && swiperProgress < 0) ? 'svg-enter' : '' ]"  x1="90" y1="52.5" x2="120" y2="52.5" stroke-width="6" />
        <line :class="['svg-color', swiperIndex === 1 ?  'svg-leave' : '', (swiperIndex === 2 && swiperProgress > 0) || (swiperIndex === 0 && swiperProgress < 0) ? 'svg-enter' : '' ]"  x1="100" y1="70" x2="120" y2="70" stroke-width="6" />
      </svg>
      联系人
    </div>

    <div class="main-tab-item" @click="changeTab(2)">
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="1.4rem" height="1.4rem" style="background: transparent" viewBox="0 0 100 100" >
        <circle :class="['svg-color', swiperIndex === 2 ?  'svg-leave' : '', (swiperIndex === 3 && swiperProgress > 0) || (swiperIndex === 1 && swiperProgress < 0) ? 'svg-enter' : '' ]" cx="50" cy="50" r="46.5" stroke-width="6"  />
        <polygon :class="['svg-color', swiperIndex === 2 ?  'svg-leave_inset' : '', (swiperIndex === 3 && swiperProgress > 0) || (swiperIndex === 1 && swiperProgress < 0) ? 'svg-enter_inset' : '' ]" points="25,75 40,40 75,25 60,60" style="stroke-width:4;"/>
      </svg>
      发现
    </div>

    <div class="main-tab-item" @click="changeTab(3)">
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="1.4rem" height="1.4rem" style="background: transparent" viewBox="-2 -2 103 103" >
        <path d="M4 98
              L 98 98
              Q 100 94, 94 90
              L 65 70
              Q 54 62, 60 55
              C 68 48, 70 45, 70 25
              C 68 -5, 32 -5, 30 25
              C 30 45, 32 48,  40 55
              Q 46 62, 35 70
              L 6 90
              Q 0 94, 2 98
              Z
          "
          :class="['svg-color', swiperIndex === 3 ?  'svg-leave' : '', swiperIndex === 2 && swiperProgress < 0 ? 'svg-enter' : '' ]" 
          style="stroke-width: 6;" stroke-linecap="round"
        />
      </svg>
      我
    </div>

  </footer>
</template>

<script>
// import SvgCell from "./svg-cell.vue";
import { reactive, ref } from "vue";
// import mitt from "mitt";
import EventBus from "@/utils/eventBus.js"

/**
 * @description 计算一个颜色值转换到另一个颜色过程中,不同阶段(progress)对应的不同颜色
 * @param {String} startRGB初始颜色
 * @param {String} endRGBS终点颜色
 * percent  什么程度
 */
function rgbComputed(startRGB, endRGB, percent) {
  if (percent >= 1) {
    percent = 1;
  }
  // console.log(startRGB, endRGB, percent);
  let RGB =
    "rgb(" +
    Math.round(startRGB[0] + (endRGB[0] - startRGB[0]) * percent) +
    "," +
    Math.round(startRGB[1] + (endRGB[1] - startRGB[1]) * percent) +
    "," +
    Math.round(startRGB[2] + (endRGB[2] - startRGB[2]) * percent) +
    ")";
  // console.log("targetRGB:", RGB);
  return RGB;
}



export default {
  name: "MainTab",
  components: {
    // SvgCell
  },
  props: {
    // tabList: {},
    // swipeParam: {},
  },
  setup(props, ctx) {

    let swiperIndex = ref(1);
    let swiperProgress = ref(0);

    EventBus.on('swipeEvent',  payload => {
      swiperIndex.value = payload.activeIndex;
      swiperProgress.value = payload.progress;

      getColor(payload.activeIndex, payload.progress, payload.step);
      console.warn("---main-tab EventBus:  swipeEvent", payload)
    });



    function changeTab(index) {
      // console.log("main-tab changeTab:", index);
      ctx.emit("changeTab", index);
    }

    /**
     * @description 根据index和progress计算 svg图标的颜色，这里只需要两个颜色 进入和出去两个页面的图标颜色
     * 
     * index这个序号的svg一定是离开的图标，而progress为正的话，表示向右滑动， 为负表示向左滑动
     * 
     */
    function getColor(index, progress) {

      progress = Math.abs(progress);

      let dom = document.querySelector('.main-tab').style;
      try {
        /*
          选中状态的图标： 滑动时候时候为离开(.svg-leave)状态：stroke: [33, 164, 105] -> [0, 0, 0]; fill: [33, 164, 105] -> [247, 247, 247]; stoke_inset:  [247, 247, 247]-> [0, 0, 0]
          要滑向的图标为 进入状态（.svg-enter）: stroke: [0, 0, 0] -> [33, 164, 105]; fill: [247, 247, 247] -> [33, 164, 105]; stroke_inset: [0, 0, 0] -> [247, 247, 247]
        */
        // console.log("---修改css变量");
        dom.setProperty( '--svg-leave_fill', rgbComputed( [33, 164, 105], [247, 247, 247], progress) );
        dom.setProperty( '--svg-leave_stroke', rgbComputed( [33, 164, 105] , [0, 0, 0], progress) );
        dom.setProperty( '--svg-leave_stroke_inset', rgbComputed( [247, 247, 247], [0, 0, 0], progress) );

        dom.setProperty( '--svg-enter_fill', rgbComputed( [247, 247, 247], [33, 164, 105], progress) );
        dom.setProperty( '--svg-enter_stroke', rgbComputed( [0, 0, 0] , [33, 164, 105], progress) );
        dom.setProperty( '--svg-enter_stroke_inset', rgbComputed( [0, 0, 0] , [247, 247, 247], progress) );
      } catch (error) {
         console.error("---修改css变量 error:", error);
      }




    }

    return {
      changeTab,

      swiperIndex,
      swiperProgress,
    };
  }
};
</script>

<style scoped>


.main-tab {
  /* --main-tab-color: #000;
  --main-tab-bg: #f7f7f7;
  --main-tab-border_color: #d6d6d6; */

  --svg-leave_fill: rgb(33, 164, 105);
  --svg-leave_stroke: rgb(33, 164, 105);
  --svg-leave_stroke_inset: rgb(247, 247, 247);

  --svg-enter_fill: rgb(247, 247, 247);
  --svg-enter_stroke: rgb(0, 0, 0);
  --svg-enter_stroke_inset: rgb(0, 0, 0);


  box-sizing: border-box;
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  width: 100%;
  height: 3.26rem;
  color: var(--main-tab-color, #000);
  font-size: 0.65rem;
  background-color: var(--main-tab-bg, #f7f7f7);
  z-index: 10;
}


.svg-color {
  fill: var(--svg-fill);
  stroke: var(--svg-stroke);
}

.svg-enter {
  fill: var(--svg-enter_fill);
  stroke: var(--svg-enter_stroke);
}
.svg-leave {
  fill: var(--svg-leave_fill);
  stroke: var(--svg-leave_stroke);
}

.svg-enter_inset {
  stroke: var(--svg-enter_stroke_inset);
}
.svg-leave_inset {
  stroke: var(--svg-leave_stroke_inset);
}

.main-tab:after {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  border-top: 1px solid var(--main-tab-border_color, #d6d6d6);
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
  transform: translateZ(0);
}

</style>