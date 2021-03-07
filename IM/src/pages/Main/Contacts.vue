<template>
  <article class="contacts-container">
    <!-- <div>Contacts</div> -->

    <section class="border-line_top border-line_bottom">
      <so-cell
        v-for="(item, index) in systemContacts"
        :key="index"
        :name="item.name"
        :showNextIcon="item.showNextIcon"
        iconWidth="4.3"
        :isLast="index == systemContacts.length - 1 ? true : false"
      >
        <template v-slot:default>
          <img
            style="width: 2.34rem;height: 2.34rem;border-radius:0.17rem 0.17rem;"
            :src="item.avatar"
          />
        </template>
      </so-cell>
    </section>

    <section
      class="border-line_top border-line_bottom"
      v-for="(contactorArr, index) in contactsList"
      :key="index"
    >
      <div class="contacts-letter">{{ contactorArr.letter }}</div>
      <so-cell
        v-for="(item, index) in contactorArr.contacts"
        :key="index"
        :name="item.name"
        :showNextIcon="item.showNextIcon"
        iconWidth="4.3"
        :isLast="index == contactorArr.length - 1 ? true : false"
      >
        <template v-slot:default>
          <img
            style="width: 2.34rem;height: 2.34rem;border-radius:0.17rem 0.17rem;"
            :src="item.avatar"
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
    const systemContacts = [
      {
        name: "新的朋友",
        avatar: require("../../assets/icon/contacts-add-friend.jpg"),
        event: "",
        showNextIcon: false
      },
      {
        name: "群聊",
        avatar: require("../../assets/icon/contacts-double-people.jpg"),
        event: "",
        showNextIcon: false
      },
      {
        name: "标签",
        avatar: require("../../assets/icon/contacts-tag.jpg"),
        event: "",
        showNextIcon: false
      },
      {
        name: "公众号",
        avatar: require("../../assets/icon/contacts-person.jpg"),
        event: "",
        showNextIcon: false
      }
    ];

    let contactsList = reactive([
      {
        letter: "A",
        contacts: [
          {
            name: "aa",
            avatar: require("../../assets/img/avatar.jpg"),
            event: "",
            showNextIcon: false
          }
        ]
      },
      {
        letter: "B",
        contacts: [
          {
            name: "bb",
            avatar: require("../../assets/img/avatar.jpg"),
            event: "",
            showNextIcon: false
          }
        ]
      }
    ]);
    return {
      systemContacts,
      contactsList
    };
  }
};
</script>

<style lang="stylus" scoped>
@import '../../css/common.styl';
@import '../../css/variable.styl';

// $contacts-container-bg = #ededed;
$contacts-letter-color = #818181;

.contacts-container {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  background-color: $contacts-container-bg;

  .contacts-letter {
    box-sizng: border-box;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    text-indent: 0.93rem;
    height: 1.9rem;
    width: 100%;
    color: $contacts-letter-color;
    font-size: 0.54rem;
  }
}
</style>
