// import { createApp } from 'vue'
import { createStore } from 'vuex'
import Request from "@/utils/request";

import wsStore from "./wsStore.js";
import idbStore from './idbStore.js';

const SET_LANG = "SET_LANG";
const SET_PROFILE = "SET_PROFILE";

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
      profile: {
        userId: "",
        avatar: "",
        gender: null,
        name: "",
      }
    }
  },
  mutations: {
    /**
     * @description 设置语言
     * @param {*} state 
     * @param {object} payload {lang: string}
     */
    [SET_LANG](state, payload) {
      // console.log("---store: SET_LANG：payload ", payload);
      state.lang = payload.lang;
      localStorage.setItem("lang", payload.lang);
    },
    [SET_PROFILE](state, payload) {
      state.profile = payload;
      // state;
      // debugger;
    }
  }, 
  actions: {
    /**
     * @description 获取用户个人信息
     * 
     *  */
    async getProfile({commit}) {
      let res = await Request.get("/api/user/getProfile");

      if(res.ok) {
        commit(SET_PROFILE, res.profile)
      }
      // let param =  await Request.get("/api/user/getProfile", {userId: 'admin1'});
      // debugger;
      //SET_PROFILE
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