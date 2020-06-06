<template>
  <footer class="main-tab">
    <div
      class="main-tab-item"
      v-for="(tab,index) in tabList"
      :key="index"
      @click="changeTab(index)"
    >
      <svg-cell :color="tab.iconColor" :bgcolor="tab.iconBg" :type="tab.icon"></svg-cell>
      {{tab.name}} {{swipeParam.activeIndex}}
    </div>
  </footer>
</template>

<script>
import SvgCell from "./svg-cell.vue";
// import { effect } from "vue";
import { watch } from "vue";

function colorComputed(swipeParam, tabList) {
  if (swipeParam.step === "panmove") {
    //
  } else if (swipeParam.step === "panend") {
    for (let tab of tabList) {
      tab.iconColor = "#000";
      tab.iconBg = "#f7f7f7";
      console.log("tab.iconColor:", tab.iconColor);
    }
    tabList[swipeParam.activeIndex].iconColor = "#000";
    tabList[swipeParam.activeIndex].iconBg = "#f00";
    console.warn(" colorComputed tabList", tabList);
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
  setup(props) {
    console.log("Main tab props:", props.tabList);
    console.log("Main tab props:", props.swipeParam);
    // effect
    // let TabList = reactive(props.tabList);

    watch(
      () => {
        console.log("--------");
        colorComputed(props.swipeParam, props.tabList);
        return props.swipeParam.progress;
      } // 返回值的getter函数
    );

    return {};
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