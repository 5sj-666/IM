import {openDB, getObjectStore} from '@/utils/IDB.js'

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
        async add(context, payload) {
            console.log("---执行添加数据到indexDB操作");
            let store = getObjectStore(context.state.db, 'admin', 'readwrite');
            store.add({'id': parseInt(Math.random() * 10000), test: "vuex Test Add"});
        }
    },

}

export default store;