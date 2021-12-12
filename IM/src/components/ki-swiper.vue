<template>
  <!-- <article class="ki-swiper" @scroll.stop="scroll" ref="swiperEle"> -->
  <article class="ki-swiper" @scroll.passive="scroll" ref="swiperEle">
    <!-- <section class="ki-swiper-container"> -->
      <section class="ki-swiper-item">
        <slot name="firstItem"></slot>
      </section>
      <section class="ki-swiper-item">
        <slot name="secondItem"></slot>
      </section>
      <section class="ki-swiper-item" >
        <slot name="thirdItem"></slot>
      </section>
      <section class="ki-swiper-item">
        <slot name="fourthItem"></slot>
      </section>
    <!-- </section> -->

  </article>
</template>
<script>
import { onMounted, ref } from '@vue/runtime-core';
import EventBus from "@/utils/eventBus.js"

export default {
  name: 'ki-swiper',
  setup(props, ctx) {

    onMounted(()=> {
      // console.log('--swiperEle: ', swiperEle);
    });

    const windowWidth = document.body.clientWidth;
    const swiperEle = ref(null);
    // clickTab
    EventBus.on("clickTab", payload => {
      swiperEle.value.scrollTo({
        left: payload.tab * windowWidth,
      });
    });

    function scroll(e) {
      EventBus.emit("scrollX", {
        ScrollPct: parseInt( e.target.scrollLeft / (windowWidth * 3) * 1000) /1000
      })
    }

    return {
      swiperEle,
      scroll,
    }

  }

}
</script>
<style>
.ki-swiper {
  display: flex;
  flex-flow: row nowrap;
  min-width: 100%;
  height: 100%;
  /* background: orange; */
  overflow: auto;
  direction: ltr;
  scroll-snap-type: x mandatory;
}
.ki-swiper-item {
  scroll-snap-align: center;
  flex: none;
  width: 100vw;
  height: 100%;
  scroll-snap-stop: always;
}
</style>
