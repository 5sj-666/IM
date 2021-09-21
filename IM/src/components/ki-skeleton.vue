<template>
  <section class="ki-skeleton" v-if="modelValue">
  <!-- <section class="ki-skeleton" v-if="true"> -->
      <!-- 展示骨架屏 -->
      <div class="skeleton-contact" v-for="(item, i) in 10" :key="i">
        <div class="avatar"></div>
        <div class="name" :style="{animationDelay: i * 0.4 + 's'}"></div>
      </div>
  </section>
</template>

<script>
import { onMounted } from "vue";
export default {
  name: "KiSkeleton",
  props: {
    modelValue: Boolean
  },
  setup() {
    onMounted(() => {
      // console.log("onMounted");
    });
    return {};
  }
};
</script>

<style>
  .ki-skeleton {
    --skeleton-bg: #FFF;
    --skeleton-colouration: rgba(190, 190, 190, .2);
    /* --skeleton-colouration: #000; */

    position: fixed;
    width: 100%;
    height: 100%;
    background: #ededed;

    overflow: hidden;
    z-index: 100;
  }


  .skeleton-contact {
    margin-top: .5rem;
    box-sizing: border-box;
    padding: 0 1rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 6rem;
    /* background: orange; */
    background: var(--skeleton-bg);
  }

  .avatar {
    margin-right: 1rem;
    width: 4rem;
    height: 4rem;
    border-radius: .3rem;
    background-color: var(--skeleton-colouration);
  }

  .name {
    flex-grow: 1;
    height: 3rem;
    background-color: var(--skeleton-colouration);
    border-radius: 3rem;
    transform-origin: left center;
    animation: widthShrink 1.5s ease-out infinite alternate;
  }

  @keyframes widthShrink {
    from {
      transform: scale(1, 1);
    }

    to {
       transform: scale(.2, 1);
    }
  }

</style>