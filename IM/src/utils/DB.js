//indexDB工具


const DBconnection = {
    open() {
        
    }
}

export default DBconnection;

export { DBconnection }



// var request = window.indexedDB.open('dialog');

// request.onerror = function (event) {
//   console.log('数据库打开报错');
// };
// let db = '';
// request.onsuccess = function (event) {
//   db = request.result;
//   console.log('数据库打开成功');
// }

// request.onupgradeneeded = function (event) {
//   let db = event.target.result;
//   var objectStore;
//   if (!db.objectStoreNames.contains('person1')) {
//     objectStore = db.createObjectStore('person1', 'name', 'test');
//     console.log("--objectStore: ", objectStore);
//   }
// }

// function add() {
//   var request = db.transaction(['person'], 'readwrite')
//     .objectStore('person')
//     .add({ id: 1, name: '张三', age: 24, email: 'zhangsan@example.com' });

//   request.onsuccess = function (event) {
//     console.log('数据写入成功');
//   };

//   request.onerror = function (event) {
//     console.log('数据写入失败');
//   }
// }

// add();