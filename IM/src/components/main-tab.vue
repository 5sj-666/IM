<template>
  <footer class="main-tab">
    <div class="main-tab-item" @click="clickTab(0)">
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="1.4rem" height="1.4rem" style="background: transparent" viewBox="-2 -2 102 102">
        <path d="M18 78 A 48 40, 0, 1, 1, 27 83.2 L 12 92Z" 
              :class="['svg-color', 
                        ScrollPct >= 0 && ScrollPct <= 0.33 ? 'svg-leave' : '',
                        ScrollPct <= 0 ? 'svg-active' : ''
                      ]" 
        />
      </svg>
      {{t('App.Main.chats')}}
    </div>
    
    <div class="main-tab-item" @click="clickTab(1)">
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="1.4rem" height="1.4rem" style="background: transparent" viewBox="-2 2 117 100">
        <g :class="['svg-color', 
                    ScrollPct > 0.333 && ScrollPct < 0.667 ?  'svg-leave' : '', 
                    ScrollPct === 0.333 ? 'svg-active' : '',
                    ScrollPct < 0.333 ? 'svg-enter' : '' ]">
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
          />
          <line  x1="80" y1="35" x2="120" y2="35" />
          <line  x1="90" y1="52.5" x2="120" y2="52.5" />
          <line  x1="100" y1="70" x2="120" y2="70" />
        </g>
      </svg>
      {{t('App.Main.contact')}}
    </div>

    <div class="main-tab-item" @click="clickTab(2)">
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="1.4rem" height="1.4rem" style="background: transparent" viewBox="0 0 100 100" >
        <circle cx="50" cy="50" r="46.5" 
          :class="['svg-color',  
            ScrollPct > 0.667 && ScrollPct < 1 ?  'svg-leave' : '', 
            ScrollPct === 0.667 ? 'svg-active' : '',
            ScrollPct > 0.333 && ScrollPct <= 0.667 ? 'svg-enter' : '' ]" />
        <polygon points="25,75 40,40 75,25 60,60" 
        :class="['svg-color', 
                  ScrollPct > 0.667 && ScrollPct < 1 ?  'svg-leave_inset' : '', 
                  ScrollPct === 0.667 ? 'svg-active_inset' : '',
                  ScrollPct > 0.333 && ScrollPct < 0.667 ? 'svg-enter_inset' : '' ]" />
      </svg>
      {{t('App.Main.discover')}}
    </div>

    <div class="main-tab-item" @click="clickTab(3)">
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
          :class="['svg-color', 
                    ScrollPct >= 0.667  ? 'svg-enter' : '' , ScrollPct === 1 ? 'svg-leave' : '',
                    ScrollPct >= 1 ? 'svg-active' : '',
            ]"
        />
      </svg>
      {{t('App.Main.mine')}}
    </div>

  </footer>
</template>

<script>
// import SvgCell from "./svg-cell.vue";
import { reactive, ref, onActivated, mounted } from "vue";
// import mitt from "mitt";
import EventBus from "@/utils/eventBus.js"
import useI18n from "@/local/index";


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
  components: { },
  props: { },
  setup(props, ctx) {

    let swiperProgress = ref(0);

    const { t } = useI18n();

    let ScrollPct = ref(0);

    EventBus.on('scrollX', payload => {
      ScrollPct.value = payload.ScrollPct;
      getColor((ScrollPct.value * 3) % 1);
      // console.log("---ScrollPct: ", ScrollPct.value, "--pagePct: ", ScrollPct.value * 3);
    });

    function clickTab(index) {
      // console.log("---main-tab: clickTab: ", index);
      EventBus.emit('clickTab', {tab: index});
    }


    onActivated(() => {
      let dom = document.querySelector('.main-tab').style;
      if(localStorage.getItem('theme') && localStorage.getItem('theme') === "dark") {
        dom.setProperty( '--svg-active_fill', 'rgb(9, 194, 93)');
        dom.setProperty( '--svg-active_stroke', 'rgb(9, 194, 93)');
        dom.setProperty( '--svg-active-stroke_inset', 'rgb(31, 31, 31)');
      }else {
        dom.setProperty( '--svg-active_fill', 'rgb(33, 164, 105)');
        dom.setProperty( '--svg-active_stroke', 'rgb(33, 164, 105)');
        dom.setProperty( '--svg-active-stroke_inset', 'rgb(247, 247, 247)');
      }
    });

    /**
     * @description 根据index和progress计算 svg图标的颜色，这里只需要两个颜色 进入和出去两个页面的图标颜色
     * index这个序号的svg一定是离开的图标，而progress为正的话，表示向右滑动， 为负表示向左滑动
     */
    function getColor(progress) {
      progress = Math.abs(progress);
      let dom = document.querySelector('.main-tab').style;

      let stroke_normal = [0, 0, 0],
          fill_normal = [247, 247, 247],
          stroke_checked = [33, 164, 105],
          fill_checked = [33, 164, 105],
          stroke_inset_normal = [0, 0, 0],
          stroke_inset_checked = [247, 247, 247];

      if(localStorage.getItem('theme') && localStorage.getItem('theme') === "dark") {
        stroke_normal = [215, 215, 215];
        fill_normal = [31, 31, 31];
        stroke_checked = [9, 194, 93];
        fill_checked = [9, 194, 93];
        stroke_inset_normal = [215, 215, 215];
        stroke_inset_checked = [31, 31, 31];
      }

      try {
        /*
          选中状态的图标： 滑动时候时候为离开(.svg-leave)状态：stroke: [33, 164, 105] -> [0, 0, 0]; fill: [33, 164, 105] -> [247, 247, 247]; stoke_inset:  [247, 247, 247]-> [0, 0, 0]
          要滑向的图标为 进入状态（.svg-enter）: stroke: [0, 0, 0] -> [33, 164, 105]; fill: [247, 247, 247] -> [33, 164, 105]; stroke_inset: [0, 0, 0] -> [247, 247, 247]
        */
        // console.log("---修改css变量");
        dom.setProperty( '--svg-leave_fill', rgbComputed( fill_checked, fill_normal, progress) );
        dom.setProperty( '--svg-leave_stroke', rgbComputed( stroke_checked, stroke_normal, progress) );
        dom.setProperty( '--svg-leave_stroke_inset', rgbComputed( stroke_inset_checked, stroke_inset_normal, progress) );

        dom.setProperty( '--svg-enter_fill', rgbComputed( fill_normal, fill_checked, progress) );
        dom.setProperty( '--svg-enter_stroke', rgbComputed( stroke_normal, stroke_checked, progress) );
        dom.setProperty( '--svg-enter_stroke_inset', rgbComputed( stroke_inset_normal, stroke_inset_checked, progress) );

      } catch (error) {
         console.error("---修改css变量 error:", error);
      }

    }

    return {
      ScrollPct,
      swiperProgress,
      clickTab,
      t
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
  /* --svg-leave_stroke: rgb(20, 36, 29); */
  --svg-leave_stroke: rgb(33, 164, 105);
  --svg-leave_stroke_inset: rgb(247, 247, 247);

  --svg-active_fill: rgb(33, 164, 105);
  --svg-active_stroke: rgb(33, 164, 105);
  --svg-active-stroke_inset: rgb(247, 247, 247);

  --svg-enter_fill: rgb(247, 247, 247);
  --svg-enter_stroke: rgb(0, 0, 0);
  --svg-enter_stroke_inset: rgb(0, 0, 0);


  box-sizing: border-box;
  position: fixed;
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
  stroke-width: 5;
  stroke-linecap: round;
}

.svg-enter {
  fill: var(--svg-enter_fill);
  stroke: var(--svg-enter_stroke);
}
.svg-leave {
  fill: var(--svg-leave_fill);
  stroke: var(--svg-leave_stroke);
}

.svg-active {
  fill: var(--svg-active_fill);
  stroke: var(--svg-active_stroke)
}
.svg-active_inset {
  stroke: var(--svg-active-stroke_inset);
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
  outline: 0;
}

</style>