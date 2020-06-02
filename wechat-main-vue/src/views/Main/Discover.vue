<template>
  <article class="discover-container">
    <!-- Discover -->
    <section
      class="border-line_top border-line_bottom"
      v-for="(discoverArr,index) in discoverList"
      :style="{marginTop:index=='0'?0:0.5+'rem'}"
      :key="index"
    >
      <so-cell
        v-for="(item,index) in discoverArr"
        :key="index"
        :name="item.name"
        :adTitle="item.adTitle"
        :isLast="index == discoverArr.length-1 ? true : false"
      >
        <template v-slot:default>
          <img style="width: 1.6rem;height: 1.6rem;" :src="item.icon" />
        </template>

        <template v-if="!!item.adImg" v-slot:SoAdImg>
          <img :src="item.adImg" style="width:1.8rem;height:1.8rem" alt />
        </template>
      </so-cell>
    </section>
  </article>
</template>

<script>
import SoCell from "@/components/so-cell.vue";

import { reactive } from "vue";

export default {
  components: {
    SoCell
  },
  setup() {
    const discoverList = reactive([
      [
        {
          name: "朋友圈",
          icon: require("../../assets/icon/discover-pinwheel.jpg"),
          event: ""
        }
      ],
      [
        {
          name: "扫一扫",
          icon: require("../../assets/icon/discover-shot.jpg"),
          event: ""
        }
      ],
      [
        {
          name: "看一看",
          icon: require("../../assets/icon/discover-flower.jpg"),
          event: ""
        },
        {
          name: "搜一搜",
          icon: require("../../assets/icon/discover-bloom.jpg"),
          event: ""
        }
      ],
      [
        {
          name: "购物",
          icon: require("../../assets/icon/discover-handbag.jpg"),
          event: ""
        },
        {
          name: "游戏",
          icon: require("../../assets/icon/discover-diamond.jpg"),
          event: "",
          adTitle: "欢迎回家，勇士",
          adImg: require("../../assets/icon/me-ad.png")
        }
      ],
      [
        {
          name: "小程序",
          icon: require("../../assets/icon/discover-S.jpg"),
          event: ""
        }
      ]
    ]);

    return {
      discoverList
    };
  }
};
</script>

<style lang="stylus" scoped>
@import '../../css/common.styl';
@import '../../css/variable.styl';

// $discover-container-color = #ededed;
.discover-container {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  background-color: #ededed;
}
</style>