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
      >
        <template v-slot:default>
          <img
            style="width: 2.34rem;height: 2.34rem;border-radius:0.17rem 0.17rem;"
            :src="item.avatar"
          />
        </template>
      </ki-cell>
    </section>

    <!-- {{contactsList}} -->


    <ki-cell
        v-for="item in contactsList"
        :key="'contact' + item.id"
        :name="item.friend"
        iconWidth="4.3"
        @click="Router.push('/dialogue/profile/'+item.friend)"
    >
      <img
        style="width: 2.34rem;height: 2.34rem;border-radius:0.17rem 0.17rem;"
        :src="'https://www.fffuture.top:443/avatar/'+item.avatar"
      />
    </ki-cell>

  </article>
</template>

<script>
import kiCell from "@/components/ki-cell.vue";
import { onMounted, ref} from "vue";

import {useRouter} from 'vue-router'
import useI18n from "@/local/index"
import Request from "@/utils/request"


// var request = window.indexedDB.open('dialog');

// request.onerror = function (event) {
//   console.log('数据库打开报错');
// };
// let db = '';
// request.onsuccess = function (event) {
//   db = request.result;
//   console.log('数据库打开成功');
// }

// request.onupgradeneeded = function (event) {
//   let db = event.target.result;
//   var objectStore;
//   if (!db.objectStoreNames.contains('person1')) {
//     objectStore = db.createObjectStore('person1', 'name', 'test');
//     console.log("--objectStore: ", objectStore);
//   }
// }

// function add() {
//   var request = db.transaction(['person'], 'readwrite')
//     .objectStore('person')
//     .add({ id: 1, name: '张三', age: 24, email: 'zhangsan@example.com' });

//   request.onsuccess = function (event) {
//     console.log('数据写入成功');
//   };

//   request.onerror = function (event) {
//     console.log('数据写入失败');
//   }
// }

// add();

export default {
  name: "Contacts",
  components: {
    kiCell
  },
  setup() {
    // console.log("---contact process.env.VUE_APP_AVATAR_URL: ", process.env.VUE_APP_AVATAR_URL);

    const Router = useRouter();
    const  { t } = useI18n();

    const systemContacts = [
      {
        name: t("App.Main.Contacts.newFriends"),
        avatar: require("../../assets/icon/contacts-add-friend.jpg"),
        event: "",
        showNextIcon: false
      },
      {
        name: t("App.Main.Contacts.chatsOnlyFriends"),
        avatar: require("../../assets/icon/contacts-add-friend.jpg"),
        event: "",
        showNextIcon: false
      },
      {
        name: t("App.Main.Contacts.groupChat"),
        avatar: require("../../assets/icon/contacts-double-people.jpg"),
        event: "",
        showNextIcon: false
      },
      {
        name: t("App.Main.Contacts.tags"),
        avatar: require("../../assets/icon/contacts-tag.jpg"),
        event: "",
        showNextIcon: false
      },
      {
        name: t("App.Main.Contacts.officialAccounts"),
        avatar: require("../../assets/icon/contacts-person.jpg"),
        event: "",
        showNextIcon: false
      }
    ];

    // let contactsList = reactive([
    //   {
    //     letter: "A",
    //     contacts: [
    //       {
    //         name: "aa",
    //         avatar: require("../../assets/img/avatar.jpg"),
    //         event: "",
    //         showNextIcon: false
    //       }
    //     ]
    //   },
    //   {
    //     letter: "B",
    //     contacts: [
    //       {
    //         name: "bb",
    //         avatar: require("../../assets/img/avatar.jpg"),
    //         event: "",
    //         showNextIcon: false
    //       }
    //     ]
    //   }
    // ]);


    const contactsList = ref([]);

    onMounted(()=>{
      getFriendList();
    })

    async function getFriendList() {
      // console.log("---getFriendList");
      let res = await Request.post("/api/friend/getFriendList");
      console.log("---getFriendList: ", res);
      // contactsList[0].contacts[0].name = res.data[0].id;
      if(res.ok) {
        contactsList.value = res.data;
        console.log("---getFriendList  contactsList: ", contactsList)
      }
      // console.log("--contactsList",contactsList)
    }
    
    return {
      systemContacts,
      contactsList,
      Router
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
