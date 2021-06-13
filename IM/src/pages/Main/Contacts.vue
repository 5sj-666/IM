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

    <!-- {{contactsList}} -->


    <so-cell
        v-for="item in contactsList"
        :key="'contact' + item.id"
        :name="item.friend"
        iconWidth="4.3"
        @click="Router.push('/dialogue/profile/'+item.friend)"
    >
      <!-- <template v-slot:default> -->
          <img
            style="width: 2.34rem;height: 2.34rem;border-radius:0.17rem 0.17rem;"
            :src="'http://localhost:3000/avatar/'+item.avatar"
          />
        <!-- </template> -->
    </so-cell>




    <!-- <section
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
        @click="Router.push('/dialogue/profile/'+item.name)"
      >
        <template v-slot:default>
          <img
            style="width: 2.34rem;height: 2.34rem;border-radius:0.17rem 0.17rem;"
            :src="item.avatar"
          />
        </template>
      </so-cell>
    </section> -->
  </article>
</template>

<script>
import SoCell from "@/components/so-cell.vue";
import { onMounted, ref } from "vue";

import {useRouter} from 'vue-router'

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
    SoCell
  },
  setup() {
    const Router = useRouter();

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
