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
// import mitt from "mitt";
import EventBus from "@/utils/eventBus.js"

// import { onMounted, computed, watchEffect } from "vue";
import { onMounted, watchEffect, nextTick } from "vue";

export default {
  name: "kiSwiper",
  props: {
    activeIndex: {
      type: Number,
      default: 1
    }
  },
  setup(props, ctx) {

    EventBus.on("clickTab", param => {
      console.log("---ki-swiper: changeTab param: ", param);
      // activeIndex = param.tab;
      slideTo(param.tab, 0);

      activeIndex = param.tab;

      // ctx.emit("swipeEvent", {
      //   progress: 0,
      //   activeIndex: param.tab,
      //   step: 'panEnd'
      // });


      EventBus.emit('swipeEvent', {
        progress: 0,
        activeIndex: param.tab,
        step: 'panEnd'
      });

    })

    // let x = new setupComponent();
    // console.log("window ", window);
    onMounted(() => {
      // console.log("VNodeProps:");
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
        slideTo(activeIndex, 0);
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
          //到了边界之后不做位移处理
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
        slideTo(activeIndex, 0.25);
        emitSwipeEvent(ctx, 0, activeIndex, "panend");
      });
    }

    function slideTo(index, time) {
      let swiperItem = document.getElementsByClassName("swiper-item");
      for (let i = 0; i < swiperItem.length; i++) {
        // swiperItem[i].style = "left:" + (i - index) * 100 + "%;";
        swiperItem[i].style = `left: ${(i-index) * 100}%`;
        // swiperItem[i].style.transition = "all " + time + "s" + "ease-out";
        swiperItem[i].style.transition = `all ${time}s ease-out` ;
      }
    }

    function progressTo(progress) {
      let swiperItem = document.getElementsByClassName("swiper-item");
      for (let i = 0; i < swiperItem.length; i++) {
        swiperItem[i].style.transition = "all .0s ease-out";
        swiperItem[i].style.transform = "translateX(" + progress + "px)";
      }
    }

    function emitSwipeEvent(ctx, progress, activeIndex, step) {
      ctx.emit("swipeEvent", {
        progress: progress,
        activeIndex: activeIndex,
        step: step
      });

      EventBus.emit('swipeEvent', {
        progress: progress,
        activeIndex: activeIndex,
        step: step
      });

    }

    return {};
  }
};
</script>

<style scoped>
.swiper-container {
  box-sizing: border-box;
  position: relative;
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  will-change: transform;
}
.swiper-container .swiper-item {
    box-sizing: border-box;
    position: absolute;
    top: 0;
    /* padding-top: 3rem; */
    width: 100%;
    height: 100%;
    /* background-color: cyan; */
    transition: all .0s ease-out;
    will-change: transform;
}
</style>
