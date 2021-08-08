//indexDB工具

/**
 * 设想： 
 *      一个聊天用户对应一个 数据库的对象仓库（objectStore）,
 *      数据库名称跟应用名称保持一致： libre_自己的id（防止在同一个网页上登录不同用户，做基本隔离）
 *      对象仓库名称规律为：会话对象的id
 */

const IDBUtil = {
    openDB,
    updateDB,
    getObjectStore,
    add,
    clearObjectStore,
}

export default IDBUtil;

/**
 * @description 因为打开数据库是异步方式，所以在此使用promise
 * @resolve {object} db
 */
export function openDB() {
    const DB_Name = localStorage.getItem('userId');
    return new Promise((res, reject)=>{
        var req = indexedDB.open(DB_Name);
        req.onsuccess = function (evt) {
            try {
                localStorage.setItem("IDB_version", this.result.version);
            } catch (error) {
                console.error(error);
            }
            // resolve({connection: req, result: this.result});
            // db = this.result;
            res(this.result);
        };
        req.onerror = function (evt) {
            reject(evt);
            console.error("---openDb:", evt.target.errorCode);
        };
    })
    
}

/**
   * @param {string} store_name
   * @param {string} mode either "readonly" or "readwrite"
   */
export function getObjectStore(db, store_name, mode="readonly") {
    try {
        var tx = db.transaction(store_name, mode);
        tx.oncomplete = function(event) {
            console.log("---Main: getObjectStore: all done")
        };
        tx.onerror = function(event) {
            console.error("---IDB getObjectStore: ", event);
        };
        return tx.objectStore(store_name);

    } catch (error) {
        console.warn("---getObjectStore error: ", error);
        return null;
    }
}

/**
 * @description 向数据库添加数据
 * @param {*} msg 
 */
export async function add(db, msg) {
    console.warn("-----IDB add: ",db, "--msg: ",  msg);
    //先判断数据库中是否存在对应的数据对象
    //如果没有则创建对应的数据对象  如果有执行数据写入
    let objStoreList = [];
    // if(typeof(db) === 'object' &&  Reflect.has(db, 'objectStoreNames')) {
    for(let name of db.objectStoreNames) {
        console.log("---add name: ", name);
        objStoreList.push(name);
    }
    console.log("---objStoreList:", objStoreList);

    if(objStoreList.includes(msg.recipient)) {
        console.log("---utils idb 执行数据写入：");
        let objectStore = getObjectStore(db, msg.recipient, 'readwrite');
        objectStore.add(msg);
        return null;
    }else {
        db.close();
        db = await updateDB(msg.recipient);
        console.log("---add res:", db);
        let objectStore = getObjectStore(db, msg.recipient, 'readwrite');
        objectStore.add(msg);
        return db;
        // add(db, msg);
    }

}

/**
 * @description 升级数据库
 * @param {number} version 
 */
export function updateDB(storeName) {
    return new Promise((res, rej) => {
        var req = indexedDB.open(localStorage.getItem('userId'), parseInt(localStorage.getItem("IDB_version")) + 1);

        req.onsuccess = function (evt) {
            // console.log("----IDB: req success: ", evt);
            try {
                localStorage.setItem("IDB_version", this.result.version);
            } catch (error) {
                console.error(error);
            }
            res(this.result);
        };
        req.onerror = function (evt) {
            console.error("---updateDB:", evt.target.errorCode);
            rej(evt);
        };

        req.onupgradeneeded = function(event) {
            console.warn("---utils IDB: 创建对象仓库: ", objectStore, "---db: ", db);
            //保存IDBDateBase接口
            var db = event.target.result;
            //为该数据库创建一个对象仓库
            var objectStore = db.createObjectStore(storeName, { autoIncrement : true });
        }

    })

}

/**
 * @description 清空指定的对象仓库
 * @params {string} store_name
 */
export function clearObjectStore(store_name) {
    var store = getObjectStore(DB_STORE_NAME, 'readwrite');
    var req = store.clear();
    req.onsuccess = function(evt) {
        console.log("----clearObjectStore success----");
    };
    req.onerror = function (evt) {
      console.error("clearObjectStore:", evt.target.errorCode);
      displayActionFailure(this.error);
    };
}
