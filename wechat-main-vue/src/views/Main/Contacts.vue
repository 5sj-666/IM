<template>
  <article class="contacts-container">
    <!-- <div>Contacts</div> -->

    <section
      class="border-line_top border-line_bottom"
      v-for="(contactorArr,index) in contactsList"
      :key="index"
    >
      <so-cell
        v-for="(contactor,index) in contactorArr"
        :key="index"
        :name="contactor.name"
        :showNextIcon="contactor.showNextIcon"
        iconWidth="4.3"
        :isLast="index == contactorArr.length-1 ? true : false"
      >
        <template v-slot:default>
          <img
            style="width: 2.34rem;height: 2.34rem;border-radius:0.17rem 0.17rem;"
            :src="contactor.avatar"
          />
        </template>
      </so-cell>
    </section>
  </article>
</template>

<script>
import SoCell from "@/components/so-cell.vue";
import { reactive } from "vue";

export default {
  name: "Contacts",
  components: {
    SoCell
  },
  setup() {
    let contactsList = reactive([
      [
        {
          name: "aa",
          avatar: require("../../assets/img/avatar.jpg"),
          event: "",
          showNextIcon: false
        },
        {
          name: "aa",
          avatar: require("../../assets/img/avatar.jpg"),
          event: "",
          showNextIcon: false
        },
        {
          name: "aa",
          avatar: require("../../assets/img/avatar.jpg"),
          event: "",
          showNextIcon: false
        },
        {
          name: "aa",
          avatar: require("../../assets/img/avatar.jpg"),
          event: "",
          showNextIcon: false
        },
        {
          name: "aa",
          avatar: require("../../assets/img/avatar.jpg"),
          event: "",
          showNextIcon: false
        },
        {
          name: "aa",
          avatar: require("../../assets/img/avatar.jpg"),
          event: "",
          showNextIcon: false
        }
      ]
    ]);
    return {
      contactsList
    };
  }
};
</script>

<style lang="stylus" scoped>
@import '../../css/common.styl';
@import '../../css/variable.styl';

// $contacts-container-bg = #ededed;
.contacts-container {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  background-color: $contacts-container-bg;
}
</style>