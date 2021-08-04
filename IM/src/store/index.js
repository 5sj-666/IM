// import { createApp } from 'vue'
import { createStore } from 'vuex'

import wsStore from "./wsStore.js";
import idbStore from './idbStore.js';

const SET_LANG = "SET_LANG" 

// 创建一个新的 store 实例
const store = createStore({
  modules: {
    wsStore,
    idbStore
  },
  state() {
    return {
      // lang: "en", //"en"
      lang: localStorage.getItem("lang") || "zhCN", //"en"
    }
  },
  mutations: {
    /**
     * @description 设置语言
     * @param {*} state 
     * @param {object} payload {lang: string}
     */
    [SET_LANG](state, payload) {
      console.log("---store: SET_LANG：payload ", payload);
      state.lang = payload.lang;
      localStorage.setItem("lang", payload.lang);
    }
  }
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