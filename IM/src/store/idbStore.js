import IDBUtil from '@/utils/IDBUtil.js';

const SET_DB = "SET_DB";
/**
 * @description indexDB的全局共享仓库，
 *              主要提供数据库的访问连接 和 对象仓库的访问连接
 */
const store = {
    namespaced: true,
    state: {
        name: 'indexDB store', // 当前用户是谁，比如admin，将其作为indexDB的名字, 实现在indexDB下存储不同用户的聊天记录
        db: {},  // indexDB连接
        tables: [], // indexDB中有聊天记录的用户id集合
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
                // debugger;
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

        },
        /**
         * @description 从数据库中获取数据, promise写法
         * @param {string} tableName 与谁的聊天记录
         * @return {Array<Message>} 聊天记录列表
         */
        async getData({state}, tableName = 'admin1') {
            // debugger;
            let objectStore = IDBUtil.getObjectStore(state.db, tableName, 'readonly');
            // debugger;
            let persistentMsg = [];

            return new Promise((res, rej) => {
                /**
                 * @description 游标获取数据时候，一直continue读取到结束时，最后会抛出个错误
                 */
                objectStore.openCursor(null, "prev").onsuccess = function(event) {
                    try {
                        var cursor = event.target.result;
                        // debugger;
                        // console.log("---游标", tableName, "---", cursor.primaryKey);

                        // cursor.target.result;
                        // return cursor.value;
                        if(cursor) {
                            persistentMsg.unshift(cursor.value);
                            cursor.continue();
                        }else {
                            res(persistentMsg);
                            // debugger;
                        }
                    } catch (error) {
                        // persistentMsg;
                        // debugger;
                        res(persistentMsg);
                        console.log("---结束catch---", tableName, "---", persistentMsg);
                        // debugger;
                    }
                    
                }
            })
  
        }
    },

}

export default store;