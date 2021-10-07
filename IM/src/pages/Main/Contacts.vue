<template>
  <article class="contacts-page">
    <!-- <div>Contacts</div> -->

    <section class="border-line_top border-line_bottom">
      <ki-cell
        v-for="(item, index) in systemContacts"
        :key="index"
        :name="item.name"
        :showNextIcon="item.showNextIcon"
        iconWidth="4.3"
        :isLast="index == systemContacts.length - 1 ? true : false"
        :style="{filter: index === 0 ? '' : 'grayscale(100%)'}"
        @click="sysEvent(index)"
      >
        <template v-slot:default>
          <!-- <img
            style="width: 2.34rem;height: 2.34rem;border-radius:0.17rem 0.17rem;"
            :src="item.avatar"
          /> -->
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 100 100" style="bwidth: 1.5rem; height: 1.5rem;">
            <g fill="transparent" stroke="orange" stroke-width="5" stroke-lineCap="round">
              <circle cx=50 cy=50 r=47 ></circle>
              <line id="minute" x1="50"  y1="15" x2="50" y2="50" />
              <line id="second" x1="85"  y1="50" x2="50" y2="50" />
            </g>
          </svg>
        </template>
      </ki-cell>
    </section>

    <ki-cell
        v-for="item in contactsList"
        :key="'contact' + item.id"
        :name="item.friendId"
        iconWidth="4.3"
        @click="Router.push('/dialogue/profile/'+item.friendId)"
    >
      <img
        style="width: 2.34rem;height: 2.34rem;border-radius:0.17rem 0.17rem;"
        :src="'/avatar/'+item.avatar"
      />
    </ki-cell>

  </article>
</template>

<script>
import kiCell from "@/components/ki-cell.vue";
import { onMounted, ref, toRefs, computed} from "vue";

import {useRouter} from 'vue-router'
import useI18n from "@/local/index"
// import Request from "@/utils/request"



export default {
  name: "Contacts",
  components: {
    kiCell
  },
  props: {
    friendList: {
      type: Array,
      default: null
    }
  },
  setup(props) {
    // console.warn("----Contacts props： ", props);
    const Router = useRouter();
    const  { t } = useI18n();

    const systemContacts = [
      {
        name: t("App.Main.Contacts.newFriends"),
        avatar: require("../../assets/icon/contacts-add-friend.jpg"),
        showNextIcon: false
      },
      {
        name: t("App.Main.Contacts.chatsOnlyFriends"),
        avatar: require("../../assets/icon/contacts-add-friend.jpg"),
        showNextIcon: false
      },
      {
        name: t("App.Main.Contacts.groupChat"),
        avatar: require("../../assets/icon/contacts-double-people.jpg"),
        showNextIcon: false
      },
      {
        name: t("App.Main.Contacts.tags"),
        avatar: require("../../assets/icon/contacts-tag.jpg"),
        showNextIcon: false
      },
      {
        name: t("App.Main.Contacts.officialAccounts"),
        avatar: require("../../assets/icon/contacts-person.jpg"),
        showNextIcon: false
      }
    ];

    const contactsList = computed(() => props.friendList);


    function sysEvent(index) {
      switch(index) {
        case 0 : 
          Router.push("/friendRequest");
          break;
      }
    }

    return {
      systemContacts,
      contactsList,
      Router,
      // toRefs(props)
      sysEvent
    };
  }
};
</script>

<style scoped>
  .contacts-container {
    --Contacts-bg: #ededed;
    /* --contacts-letter-color: #818181; */

    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
    background-color: var(-Contacts-bg);
  }

  /* .contacts-letter {
    box-sizing: border-box;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    text-indent: 0.93rem;
    height: 1.9rem;
    width: 100%;
    color: var(--contacts-letter-color);
    font-size: 0.54rem;
  } */

</style>
