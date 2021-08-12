<template>
  <article class="discover-container">
    <!-- Discover -->
    <section
      class="border-line_top border-line_bottom"
      v-for="(discoverArr, index) in discoverList"
      :style="{ marginTop: index == '0' ? 0 : 0.5 + 'rem' }"
      :key="index"
    >
      <ki-cell
        v-for="(item, index) in discoverArr"
        :key="index"
        :name="item.name"
        :adTitle="item.adTitle"
        :isLast="index == discoverArr.length - 1 ? true : false"
        :disable="true"
      >
        <template v-slot:default>
          <!-- <img style="width: 1.6rem;height: 1.6rem;" :src="item.icon" /> -->
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 100 100" style="bwidth: 1.5rem; height: 1.5rem;">
            <g fill="transparent" stroke="orange" stroke-width="5" stroke-lineCap="round">
              <circle cx=50 cy=50 r=47 ></circle>
              <line id="minute" x1="50"  y1="15" x2="50" y2="50" />
              <line id="second" x1="85"  y1="50" x2="50" y2="50" />
            </g>
          </svg>
        </template>

        <!-- <template v-if="!!item.adImg" v-slot:SoAdImg>
          <img :src="item.adImg" style="width:1.8rem;height:1.8rem" alt />
        </template> -->
      </ki-cell>
    </section>
  </article>
</template>

<script>
import KiCell from "@/components/ki-cell.vue";

import { reactive } from "vue";
import useI18n from "@/local/index"

export default {
  components: {
    KiCell
  },
  setup() {
    const {t} = useI18n();
    const discoverList = reactive([
      [
        {
          name: t("App.Main.Discover.moments"),
          icon: require("../../assets/icon/discover-pinwheel.jpg"),
        }
      ],
      [
        {
          name: t("App.Main.Discover.scan"),
          icon: require("../../assets/icon/discover-shot.jpg"),
        }
      ],
      [
        {
          name: t("App.Main.Discover.topStories"),
          icon: require("../../assets/icon/discover-flower.jpg"),
        },
        {
          name: t("App.Main.Discover.search"),
          icon: require("../../assets/icon/discover-bloom.jpg"),
        }
      ],
      [
        {
          name: t("App.Main.Discover.liveStreams"),
          icon: require("../../assets/icon/discover-handbag.jpg"),
        },
        {
          name: t("App.Main.Discover.games"),
          icon: require("../../assets/icon/discover-diamond.jpg"),
          adTitle: "欢迎回家，勇士",
          adImg: require("../../assets/icon/me-ad.png")
        }
      ],
      [
        {
          name: t("App.Main.Discover.miniPrograms"),
          icon: require("../../assets/icon/discover-S.jpg"),
        }
      ]
    ]);

    return {
      discoverList
    };
  }
};
</script>

<style scoped>
  .discover-container {
    /* --Discover-bg: #ededed; */
    
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
    background-color: var(--Discover-bg, #ededed);
  }
</style>
