//indexDB工具

/**
 * 设想： 
 *      一个聊天用户对应一个 数据库的对象仓库（objectStore）,
 *      数据库名称跟应用名称保持一致： libre_自己的id（防止在同一个网页上登录不同用户，做基本隔离）
 *      对象仓库名称规律为：
 * 
 *      
 */


export const IDBUtil = {
    // openDB() {
    //     console.warn("---------打开indexDB-------");
    // }
    openDB,


    clearObjectStore,
}


/**
 * @description 打开数据库 
 * 
 *   */
// export function openDB() {
//     console.warn("--------openDB----------");
//     // var req = indexedDB.open(DB_NAME, DB_VERSION);
//     var req = indexedDB.open('MyTestDB');
//     req.onsuccess = function (evt) {
//         //   db = this.result;
//         // this.result = IDBDatabase = {name, objectStoreNames（包含所有的对象仓库名称）}
//         console.warn("---------openDb DONE----------", this.result);
//         for(let objectStore of this.result.objectStoreNames) {
//             console.log("---包含的objectStore: ", objectStore);
//         }
//     };

//     req.onerror = function (evt) {
//       console.error("---openDb:", evt.target.errorCode);
//     };

//     // req.onupgradeneeded = function (evt) {
//     // //   console.log("openDb.onupgradeneeded");
//     // //   var store = evt.currentTarget.result.createObjectStore(
//     // //     DB_STORE_NAME, { keyPath: 'id', autoIncrement: true });

//     // //   store.createIndex('biblioid', 'biblioid', { unique: true });
//     // //   store.createIndex('title', 'title', { unique: false });
//     // //   store.createIndex('year', 'year', { unique: false });
//     // };

// }


/**
 * @description 因为打开数据库是异步方式，所以在此使用promise
 * @resolve {object} db
 */
export function openDB() {
    return new Promise((res, reject)=>{
        var req = indexedDB.open('MyTestDB');
        req.onsuccess = function (evt) {
            //   db = this.result;
            // this.result = IDBDatabase = {name, objectStoreNames（包含所有的对象仓库名称）}
            // console.warn("---------openDb DONE----------", this.result);
            // for(let objectStore of this.result.objectStoreNames) {
            //     console.log("---包含的objectStore: ", objectStore);
            // }

            // if(localStorage.getItem("IDB_version")) {

            // }
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
    var tx = db.transaction(store_name, mode);
    tx.oncomplete = function(event) {
        // alert("All done!");
        console.log("---Main: getObjectStore: all done")
    };
    
    tx.onerror = function(event) {
        // 不要忘记错误处理！
        console.error("---IDB getObjectStore: ", event);
    };
    return tx.objectStore(store_name);
}

/**
 * @description 升级数据库
 * @param {number} version 
 * @parm {function} func 
 */
export function updateDB(func) {
    var req = indexedDB.open('MyTestDB', localStorage.getItem("IDB_version") + 1);
    req.onupgradeneeded = func.bind(this)(evt);
}



/**
 * @description 清空指定的对象仓库
 * @params {string} store_name
 */
export function clearObjectStore(store_name) {
    var store = getObjectStore(DB_STORE_NAME, 'readwrite');
    var req = store.clear();
    req.onsuccess = function(evt) {
      displayActionSuccess("Store cleared");
      displayPubList(store);
    };
    req.onerror = function (evt) {
      console.error("clearObjectStore:", evt.target.errorCode);
      displayActionFailure(this.error);
    };
}


//增 删 改 查
// export function addRecord(transaction, ) {
//    return new Promise((res, rej) => {

//    });
// }





// //indexDB实验
// if (!window.indexedDB) {
//     window.alert("浏览器不支持IndexDB");
// }

// var db;
// //打开数据库
// var requestDB = window.indexedDB.open("MyTestDB", 3);
// console.log("---requestDB: ", requestDB);

// requestDB.onerror = function(event) {
//   console.error("---requestDB: ", event);
// }
// requestDB.onsuccess = function(event) {
//   db = event.target.result;
//   console.warn("---requestDB success: ", event);

//   db.onerror = function(event) {
//     alert("数据库请求出错: ", event.target.errorCode);
//   }
// };

// //该事件仅在较新的浏览器中实现
// requestDB.onupgradeneeded = function(event) {
//   //保存IDBDateBase接口
//   var db = event.target.result;

//   //为该数据库创建一个对象仓库
//   var objectStore = db.createObjectStore("admin", {keyPath: "id"});

//   objectStore.transaction.oncomplete = function(event) {
//     // 将数据保存到新创建的对象仓库
//     var customerObjectStore = db.transaction("admin", "readwrite").objectStore("admin");
//     customerObjectStore.add({id: 1, name: "admin"})

//     // customerData.forEach(function(customer) {
//     //   customerObjectStore.add(customer);
//     // });
//   }

// }