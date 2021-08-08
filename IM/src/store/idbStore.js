import {openDB, getObjectStore, updateDB, add} from '@/utils/IDB.js'

const SET_DB = "SET_DB";
/**
 * @description indexDB的全局共享仓库，
 *              主要提供数据库的访问连接 和 对象仓库的访问连接
 */
const store = {
    namespaced: true,
    state: {
        name: 'indexDB store',
        db: {}
    },
    getters: {},
    mutations: {
        SET_DB(state, payload) {
            if(Reflect.has(payload, 'db')) {
                state.db = payload.db;
                console.log("----idbStore mutation: db: ", state.db);
            }
        }
    },
    actions: {
        /**
         * @description 初始化数据库
         * @param {*} context 
         * @param {*} payload 
         */
        async initIDB(context, payload) {
            console.log("----initIDB----");
            let db = {};
            try {
                db = await openDB();
                context.commit('SET_DB', {db})
                console.log("----initIDB End----");
            } catch (error) {
                console.error("----idbStor: action: getDB: ", error);
            }
            
        },
        /**
         * @description 将数据存入数据库  //如果不存在对应的对象仓库，写入数据必然是错误的，此时应该新建对应的数据对象， 然后再次尝试写入数据
         * @param {*} context 
         * @param {*} payload 
         */
        async add(context, letter) {
            let db = await add(context.state.db, letter);
            console.log("---idbStore add: ", db);
            // context.commit("wsStore/")
            if(db) {
                context.commit('SET_DB', {db});
            }

        }
    },

}

export default store;