<template>
  <footer class="main-tab">
    <!-- <div
      class="main-tab-item"
      v-for="(tab,index) in tabList"
      :key="index"
      @click="changeTab(index)"
    >-->
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
// import { effect } from "vue";
import { watchEffect } from "vue";

/**
 * @description 计算一个颜色值转换到另一个颜色过程中,不同阶段(progress)对应的不同颜色
 * @param
 * startRGB: 初始颜色
 * endRGB,  终点颜色
 * percent  什么程度
 */
function rgbComputed(startRGB, endRGB, percent) {
  if (percent >= 1) {
    return;
  }
  console.log(startRGB, endRGB, percent);

  let RGB =
    "rgb(" +
    Math.round(startRGB[0] + (endRGB[0] - startRGB[0]) * percent) +
    "," +
    Math.round(startRGB[1] + (endRGB[1] - startRGB[1]) * percent) +
    "," +
    Math.round(startRGB[2] + (endRGB[2] - startRGB[2]) * percent) +
    ")";

  console.log("targetRGB:", RGB);

  return RGB;
}

function colorComputed(swipeParam, tabList) {
  if (swipeParam.step === "panmove") {
    // console.warn("main tab panmove!!");
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
      // console.warn("******************************", swipeParam.progress);
      if (swipeParam.progress < 0) {
        rgbComputed([0, 0, 0], [100, 100, 100], 0.5);
        // tabList[swipeParam.activeIndex].iconColor =
        //   "rgb(" +
        //   Math.round(33 * (1 + swipeParam.progress)) +
        //   "," +
        //   Math.round(164 * (1 + swipeParam.progress)) +
        //   "," +
        //   Math.round(105 * (1 + swipeParam.progress)) +
        //   ")";
        tabList[swipeParam.activeIndex].iconColor = rgbComputed(
          [0, 0, 0],
          [33, 164, 105],
          1 + swipeParam.progress
        );
        tabList[swipeParam.activeIndex + 1].iconColor =
          "rgb(" +
          Math.round(33 * Math.abs(swipeParam.progress)) +
          "," +
          Math.round(164 * Math.abs(swipeParam.progress)) +
          "," +
          Math.round(105 * Math.abs(swipeParam.progress)) +
          ")";
        if (swipeParam.progress > -0.5) {
          tabList[swipeParam.activeIndex].iconBg =
            "rgb(" +
            Math.round(9 + 238 * Math.abs(swipeParam.progress) * 2) +
            "," +
            Math.round(193 + 54 * Math.abs(swipeParam.progress) * 2) +
            "," +
            Math.round(49 + 149 * Math.abs(swipeParam.progress) * 2) +
            ")";

          tabList[swipeParam.activeIndex + 1].iconBg = "#f7f7f7";
        } else if (swipeParam.progress < -0.5 && swipeParam.progress > -1) {
          tabList[swipeParam.activeIndex].iconBg = "#f7f7f7";
          tabList[swipeParam.activeIndex + 1].iconBg =
            "rgb(" +
            Math.round(247 - 238 * Math.abs(swipeParam.progress + 0.5) * 2) +
            "," +
            Math.round(247 - 54 * Math.abs(swipeParam.progress + 0.5) * 2) +
            "," +
            Math.round(247 - 149 * Math.abs(swipeParam.progress + 0.5) * 2) +
            ")";
        }
      } else if (swipeParam.progress > 0) {
        //
        tabList[swipeParam.activeIndex].iconColor =
          "rgb(" +
          Math.round(33 * (1 - swipeParam.progress)) +
          "," +
          Math.round(164 * (1 - swipeParam.progress)) +
          "," +
          Math.round(105 * (1 - swipeParam.progress)) +
          ")";
        tabList[swipeParam.activeIndex - 1].iconColor =
          "rgb(" +
          Math.round(33 * swipeParam.progress) +
          "," +
          Math.round(164 * swipeParam.progress) +
          "," +
          Math.round(105 * swipeParam.progress) +
          ")";
        if (swipeParam.progress < 0.5) {
          tabList[swipeParam.activeIndex].iconBg =
            "rgb(" +
            Math.round(9 + 238 * swipeParam.progress * 2) +
            "," +
            Math.round(193 + 54 * swipeParam.progress * 2) +
            "," +
            Math.round(49 + 149 * swipeParam.progress * 2) +
            ")";

          tabList[swipeParam.activeIndex - 1].iconBg = "#f7f7f7";
        } else if (swipeParam.progress > 0.5 && swipeParam.progress < 1) {
          tabList[swipeParam.activeIndex].iconBg = "#f7f7f7";
          tabList[swipeParam.activeIndex - 1].iconBg =
            "rgb(" +
            Math.round(247 - 238 * (swipeParam.progress - 0.5) * 2) +
            "," +
            Math.round(247 - 54 * (swipeParam.progress - 0.5) * 2) +
            "," +
            Math.round(247 - 149 * (swipeParam.progress - 0.5) * 2) +
            ")";
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
    transform: translateZ(0);
  }
}
</style>