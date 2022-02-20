<template>
  <article class="charts-page">
     <ki-header id="headerDom" :title="title" :iconBack="false" />
    <div class="chat-cell" v-for="(session, index) in sessions" :key="index" @click="Router.push(`/dialogue/${session.friendId}`)">
      <div class="chat-cell-avatar">
        <img :src="'/avatar/'+session.avatar" alt />
      </div>
      <div class="chat-cell-content-container" >
        <div class="chat-cell-title">{{session.friendId}}</div>
        <!-- <div class="chat-cell-content">contentcontentcontentcontentcontentcontentcontentcontent</div> -->
        <!-- <div class="chat-cell-content">{{ session && session.newestMsg ? session.newestMsg.content : ''}}</div> -->
        <div class="chat-cell-content" v-html="formatMsg(session && session.newestMsg ? session.newestMsg.content : '')"></div>
      </div>
      <div class="chat-cell-time">早上8:58</div>
    </div>
  </article>
</template>

<script>

import {onMounted, reactive, computed, watchEffect, toRaw } from "vue";
import { useRouter } from "vue-router";
import { useStore, mapState } from "vuex";

import emojiList from '@/assets/iconNames';

import kiHeader from "@/components/ki-header.vue";

export default {
  name: "Chats",
  components: {
    kiHeader,
  },
  props: {
    friendList: {
      type: Array,
      default: null
    },
    title: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    console.warn("----Chats: ", props)

    const Store = useStore();
    const Router = useRouter();

    let tables = computed(() => Store.state.idbStore.tables);
    // let friendList =  computed(() => props.friendList);

    let sessions = computed(() => {
      // 会话的所有信息
      let sessions = props.friendList.filter(item => tables.value.includes(item.friendId));
      // sessions.newestMsg = getNewestMsg()
      sessions = sessions.map(session => {
        try {
          getNewestMsg(session.friendId)
          .then(res => {session.newestMsg = res;});
          // debugger;
          return session;
        } catch (error) {
          // debugger;
          return session.newestMsg = {content: ""};
        }
      })
      // sessions;
      // debugger;
      // return props.friendList.filter(item => tables.value.includes(item.friendId))
      return sessions;
    });

    // onMounted(async ()=>{
    //   console.log("--------Chats Page onMounted------", Store);

    //   // 获取聊天的初始化内容的最后的一条
      
    //   let res = await Store.dispatch('idbStore/getData');
    //   debugger;

    // });


    // 首先去获取临时消息记录里， 如果没有临时记录，则去indexDB里获取，都没有则显示为空字符串
    /**
     * @description 获取最新的一条记录 
     *                  1. 首先去获取临时消息记录里， 
     *                  2. 如果没有临时记录，则去indexDB里获取，
     *                  3. 都没有则显示为空字符串
     * @param {String} recipient 与谁的聊天
     */
    async function getNewestMsg(recipient) {
      // debugger;
      // 临时聊天记录
      let tempMsg = Store.state.wsStore.msgHistory.filter((msg) => msg.sender === recipient || msg.recipient === recipient) || [];
      if(tempMsg.length > 0) {
        return JSON.parse(JSON.stringify(tempMsg[tempMsg.length -1]));
      }

      // 持久化数据
      let persistentMsg = await Store.dispatch('idbStore/getData', recipient);
      // debugger;
      return persistentMsg[persistentMsg.length - 1];
    }


    /**
     * @description 将特定字符提换为图片 
     *                  例子: [微笑] -> <img 
                                style="display: inline-block; width: 1.2rem; height: 1.2rem;transform: translateY(.3rem)" 
                                src=${'https://www.fffuture.top/emoji_smile.png'}
                                />
      * @param {String} text 要替换的字符串（即用户发送的消息）
      * @returns {String} 格式化之后的dom
      */
    function formatMsg(text) {
        try {
          text = text.replace(/\[[\u4e00-\u9fa5]+\]/g, replaceEmoji);
        } catch (error) {
          console.log('---formatMsg: ', error);
          text = '';
        }
        // debugger;
        return text;

        function replaceEmoji(param) {
            let target = emojiList.find(emoji => param === `[${emoji.CN}]`);
            console.log(target);
            if(target) {
                return `<img 
                            style="display: inline-block; width: 1rem; height: 1rem;transform: translateY(.3rem)" 
                            src=${'/emoji/emoji_' + target.EN + '.png'}
                        />`;
            }
            return param;
        }

    }


    return {
      tables,
      sessions,
      Router,

      formatMsg
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
  min-height: 1.2rem;
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
