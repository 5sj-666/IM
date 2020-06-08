<template>
  <section class="swiper-container">
    <section style="left:0;" class="swiper-item" ref="swiper-item">
      <slot name="firstItem"></slot>
    </section>
    <section style="left:100%" class="swiper-item">
      <slot name="secondItem"></slot>
    </section>
    <section style="left:200%" class="swiper-item">
      <slot name="thirdItem"></slot>
    </section>
    <section style="left:300%" class="swiper-item">
      <slot name="fourthItem"></slot>
    </section>
  </section>
</template>

<script>
import Hammer from "hammerjs";

// import { onMounted, computed, watchEffect } from "vue";
import { onMounted, watchEffect, nextTick } from "vue";

export default {
  name: "so-swiper",
  props: {
    activeIndex: {
      type: Number,
      default: 1
    }
  },
  refs: {},
  setup(props, ctx) {
    onMounted(() => {
      console.log("VNodeProps:");
      BindPanEvent();
    });
    let activeIndex = 0;

    /**
     * @description 当点击activeIndex改变时候，向父组件提交swipeEvent事件：提醒main-tab做出相应改变
     */
    watchEffect(() => {
      //slideTo中需要获取dom节点，所以需要在nextTick函数重执行
      nextTick(() => {
        activeIndex = props.activeIndex;
        slideTo(activeIndex, 8);
        emitSwipeEvent(ctx, 0, activeIndex, "panend");
      });
      return props.activeIndex;
    });

    function BindPanEvent() {
      let swiperContainer = document.querySelector(".swiper-container");
      let hammer = new Hammer(swiperContainer);

      hammer.on("panmove", function(e) {
        //最左侧和最右侧不能再向左/右滑动，progress超过100%也阻止滑动（偶发性问题）
        if (
          (activeIndex <= 0 && e.deltaX > 0) ||
          (activeIndex >= 3 && e.deltaX < 0) ||
          Math.abs(e.deltaX / window.screen.width) > 1
        )
          return;
        progressTo(e.deltaX);
        let progress = e.deltaX / window.screen.width;
        emitSwipeEvent(ctx, progress, activeIndex, "panmove");
      });

      hammer.on("panend", function(e) {
        switch (true) {
          case (activeIndex <= 0 && e.deltaX > 0) ||
            (activeIndex >= 3 && e.deltaX < 0):
            break;
          //滑动超过宽度1/3或者滑动速度超过0.6 则切换页面
          case e.distance > window.screen.width / 3 ||
            Math.abs(e.overallVelocity) > 0.6:
            e.deltaX > 0
              ? (activeIndex = --activeIndex)
              : (activeIndex = ++activeIndex);
            break;
        }
        slideTo(activeIndex, 0.5);
        emitSwipeEvent(ctx, 0, activeIndex, "panend");
      });
    }

    function slideTo(index, time) {
      let swiperItem = document.getElementsByClassName("swiper-item");
      for (let i = 0; i < swiperItem.length; i++) {
        swiperItem[i].style = "left:" + (i - index) * 100 + "%;";
        swiperItem[i].style.transition = "all " + time + "s";
      }
    }

    function progressTo(progress) {
      let swiperItem = document.getElementsByClassName("swiper-item");
      for (let i = 0; i < swiperItem.length; i++) {
        swiperItem[i].style.transition = "all 0s";
        swiperItem[i].style.transform = "translateX(" + progress + "px)";
      }
    }

    function emitSwipeEvent(ctx, progress, activeIndex, step) {
      ctx.emit("swipeEvent", {
        progress: progress,
        activeIndex: activeIndex,
        step: step
      });
    }

    return {};
  }
};
</script>

<style lang="stylus" scoped>
.swiper-container {
  box-sizing: border-box;
  position: relative;
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;

  .swiper-item {
    box-sizing: border-box;
    position: absolute;
    top: 0;
    padding-top: 3rem;
    width: 100%;
    height: 100%;
    background-color: cyan;
  }
}
</style>
