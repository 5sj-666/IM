<template>
  <section class="swiper-container">
    <section style="left:0;" class="swiper-item">
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

import { onMounted, computed } from "vue";

export default {
  name: "so-swiper",
  components: {},
  setup(props, ctx) {
    let activeIndex = 0;
    // let swiperContainer = document.querySelector(".swiper-container");
    // let swiperItem = document.getElementsByClassName("swiper-item");

    onMounted(() => {
      swipeEvent();
      console.warn("X:", x);
      // changeTab();
    });

    // function changeTab() {
    //   console.log("BB");
    //   for (let i = 0; i < swiperItem.length; i++) {
    //     swiperItem[i].style = "left:" + (i - activeIndex) * 100 + "%;";
    //     swiperItem[i].style.transition = "all .5s";
    //   }
    // }

    // console.log("this:", props, "ctx:", ctx);
    // ctx.emit("swipeEvent");

    let x = computed(() => {
      console.warn("activeIndex:", activeIndex);
      return activeIndex;
    });

    function swipeEvent() {
      let swiperContainer = document.querySelector(".swiper-container");
      let swiperItem = document.getElementsByClassName("swiper-item");
      let hammer = new Hammer(swiperContainer);

      hammer.on("panmove", function(e) {
        // console.log("progress:", e.deltaX / window.screen.width);
        //emit子传父
        ctx.emit("swipeEvent", {
          progress: e.deltaX / window.screen.width,
          activeIndex: activeIndex,
          step: "panmove"
        });

        if (
          (activeIndex <= 0 && e.deltaX > 0) ||
          (activeIndex >= 3 && e.deltaX < 0)
        )
          return;
        for (let i = 0; i < swiperItem.length; i++) {
          swiperItem[i].style.transition = "all 0s";
          swiperItem[i].style.transform = "translateX(" + e.deltaX + "px)";
        }
      });

      hammer.on("panend", function(e) {
        if (
          (activeIndex <= 0 && e.deltaX > 0) ||
          (activeIndex >= 3 && e.deltaX < 0)
        ) {
          //
        } else if (
          e.distance > window.screen.width / 3 ||
          Math.abs(e.overallVelocity) > 0.6
        ) {
          e.deltaX > 0
            ? (activeIndex = --activeIndex)
            : (activeIndex = ++activeIndex);
        }
        for (let i = 0; i < swiperItem.length; i++) {
          swiperItem[i].style = "left:" + (i - activeIndex) * 100 + "%;";
          swiperItem[i].style.transition = "all .5s";
        }

        ctx.emit("swipeEvent", {
          progress: e.deltaX / window.screen.width,
          activeIndex: activeIndex,
          step: "panend"
        });
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
