<template>
  <article class="charts-page">
    <div class="chat-cell" v-for="(session, index) in sessions" :key="index" @click="Router.push(`/dialogue/${session.friendId}`)">
      <div class="chat-cell-avatar">
        <img :src="'/avatar/'+session.avatar" alt />
      </div>
      <div class="chat-cell-content-container" >
        <div class="chat-cell-title">{{session.friendId}}</div>
        <div class="chat-cell-content">contentcontentcontentcontentcontentcontentcontentcontent</div>
      </div>
      <div class="chat-cell-time">早上8:58</div>
    </div>
  </article>
</template>

<script>

import {onMounted, reactive, computed, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { useStore, mapState } from "vuex";

export default {
  name: "Chats",
  props: {
    friendList: {
      type: Array,
      default: null
    }
  },
  setup(props) {
    console.warn("----Chats: ", props)

    const Store = useStore();
    const Router = useRouter();

    let tables = computed(() => Store.state.idbStore.tables);
    // let friendList =  computed(() => props.friendList);

    let sessions = computed(() => {
      return props.friendList.filter(item => tables.value.includes(item.friendId))
    });

    onMounted(()=>{
      console.log("--------Chats Page onMounted------", Store);
    });

    return {
      tables,
      sessions,
      Router
    }

  }

  
};
</script>

<style scoped>


.charts-page {

  /* --Chats-color_primary: #0f0f0f;
  --Chats-color_secondary: #a4a4a4;
  --Chats-cell-bg: #FFF; */


  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  background-color: var(--charts-bg);
}

.chat-cell {
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 4.2rem;
  background: var(--Chats-cell-bg);
}

.chat-cell-avatar {
  box-sizing: border-box;
  padding-left: 0.26rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4.43rem;
  height: 100%;
}

img {
  width: 2.82rem;
  height: 2.82rem;
  border-radius: 0.26rem;
}


.chat-cell-content-container {
  box-sizing: border-box;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  min-width: 50%;
  height: 100%;
  background: var(--Charts-bg);
}

.chat-cell-title {
  text-align: left;
  font-size: 0.95rem;
  color: var(--Chats-color_primary);
  background-color: transparent;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.chat-cell-content {
  text-align: left;
  font-size: 0.76rem;
  color: var(--Chats-color_secondary);
  background-color: transparent;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.chat-cell-time {
  padding: 0.9rem 0.95rem 0 0.1rem;
  align-self: flex-start;
  font-size: 0.67rem;
  background: transparent;
  color: var(--Chats-color_secondary);
}

</style>
