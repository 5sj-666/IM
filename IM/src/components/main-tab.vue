<template>
  <footer class="main-tab">
    <div
      class="main-tab-item"
      v-for="(tab,index) in tabList"
      :key="index"
      @click="changeTab(index)"
    >
      <svg-cell :color="tab.iconColor" :bgcolor="tab.iconBg" :type="tab.icon"></svg-cell>
      {{tab.name}}
    </div>
  </footer>
</template>

<script>
import SvgCell from "./svg-cell.vue";
import { watchEffect } from "vue";

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

function colorComputed(swipeParam, tabList) {
  if (swipeParam.step === "panmove") {
    if (
      (swipeParam.activeIndex <= 0 && swipeParam.progress > 0) ||
      (swipeParam.activeIndex >= 3 && swipeParam.progress < 0)
    ) {
      // console.log("main tab , 不执行阶段");
    } else {
      /**
       * color: #000 -> #21a469( 0->100% 100%->0% )
       * bg: #f7f7f7 -> #09c162( 0->50% 100%->50%)
       */
      let progress = swipeParam.progress;
      if (swipeParam.progress < 0) {
        tabList[swipeParam.activeIndex].iconColor = rgbComputed(
          [33, 164, 105],
          [0, 0, 0],
          Math.abs(progress)
        );
        tabList[swipeParam.activeIndex + 1].iconColor = rgbComputed(
          [0, 0, 0],
          [33, 164, 105],
          Math.abs(progress)
        );

        switch (true) {
          case progress > -0.5:
            tabList[swipeParam.activeIndex].iconBg = rgbComputed(
              [9, 193, 49],
              [247, 247, 247],
              Math.abs(progress) * 2
            );
            tabList[swipeParam.activeIndex + 1].iconBg = "#f7f7f7";
            break;
          case progress < -0.5 && progress > -1:
            tabList[swipeParam.activeIndex].iconBg = "#f7f7f7";
            tabList[swipeParam.activeIndex + 1].iconBg = rgbComputed(
              [247, 247, 247],
              [9, 193, 49],
              Math.abs(progress + 0.5) * 2
            );
            break;
        }
      } else if (swipeParam.progress > 0) {
        tabList[swipeParam.activeIndex].iconColor = rgbComputed(
          [33, 164, 105],
          [0, 0, 0],
          progress
        );
        tabList[swipeParam.activeIndex - 1].iconColor = rgbComputed(
          [0, 0, 0],
          [33, 164, 105],
          progress
        );
        switch (true) {
          case progress < 0.5:
            (tabList[swipeParam.activeIndex].iconBg = rgbComputed(
              [9, 193, 49],
              [247, 247, 247],
              progress * 2
            )),
              (tabList[swipeParam.activeIndex - 1].iconBg = "#f7f7f7");
            break;
          case progress > 0.5 && progress < 1:
            tabList[swipeParam.activeIndex].iconBg = "#f7f7f7";
            tabList[swipeParam.activeIndex - 1].iconBg = rgbComputed(
              [247, 247, 247],
              [9, 193, 49],
              (progress - 0.5) * 2
            );
        }
      }
    }

    //
  } else if (swipeParam.step === "panend") {
    // console.warn("main tab panend!!");
    for (let tab of tabList) {
      tab.iconColor = "#000";
      tab.iconBg = "#f7f7f7";
      // console.log("tab.iconColor:", tab.iconColor);
    }
    tabList[swipeParam.activeIndex].iconColor = "#21a469";
    tabList[swipeParam.activeIndex].iconBg = "#09c162";
    // console.warn(" colorComputed tabList", tabList);
  }
}

export default {
  name: "MainTab",
  components: {
    SvgCell
  },
  props: {
    tabList: {},
    swipeParam: {}
  },
  setup(props, ctx) {
    function changeTab(index) {
      // console.log("main-tab changeTab:", index);
      ctx.emit("changeTab", index);
    }

    watchEffect(
      () => {
        colorComputed(props.swipeParam, props.tabList);
        return props.swipeParam;
      } // 返回值的getter函数
    );

    return {
      changeTab
    };
  }
};
</script>

<style lang="stylus" scoped>
@import '../css/variable.styl';

.main-tab {
  box-sizing: border-box;
  position: absolute;
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
    transform: translateZ(0);
  }
}
</style>