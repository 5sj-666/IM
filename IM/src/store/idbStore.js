import IDBUtil from '@/utils/IDBUtil.js';

const SET_DB = "SET_DB";
/**
 * @description indexDB的全局共享仓库，
 *              主要提供数据库的访问连接 和 对象仓库的访问连接
 */
const store = {
    namespaced: true,
    state: {
        name: 'indexDB store',
        db: {}, 
        tables: [], //
    },
    getters: {},
    mutations: {
        /**
         * @description 设置state.db属性,它是一个数据库连接
         * @param {*} state 
         * @param {*} payload 
         */
        [SET_DB](state, payload) {
            if(Reflect.has(payload, 'db')) {
                state.db = payload.db;
                // state.tables = payload.db
                console.warn("---idbStore objectStoreNames values: ", Object.values(payload.db.objectStoreNames));
                state.tables = Object.values(payload.db.objectStoreNames);
                // console.log("----idbStore mutation: db: ", state.db);
            }
        }
    },
    actions: {
        /**
         * @description 初始化数据库
         * @param {*} context 
         * @param {*} payload 
         */
        async initIDB({ commit }, payload) {
            console.log("----initIDB----");
            let db = {};
            try {
                db = await IDBUtil.openDB();
                commit('SET_DB', {db})
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
        async add({commit, state}, letter) {
            let db = await IDBUtil.add(state.db, letter);
            // console.log("---idbStore add: ", db);
            //如果返回不为null， 即表示升级了数据库版本，此时需要更新state.db
            if(db) commit('SET_DB', {db});

        }
    },

}

export default store;