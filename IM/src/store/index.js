// import { createApp } from 'vue'
import { createStore } from 'vuex'

import wsStore from "./wsStore.js"

// 创建一个新的 store 实例
const store = createStore({
  modules: {
    wsStore,
  },
  // state () {
  //   return {
  //     count: 0
  //   }
  // },
  // mutations: {
  //   increment (state) {
  //     state.count++
  //   }
  // },
  // actions: {
  //   increment (state) {
  //     // state.count++
  //   }
  // }
})

export default store;