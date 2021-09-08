// const { hasUser, addUser } = require('../model/user.js');

// console.log("---hasUserTest---");

// hasUser("qqq");

const { hasUser, addUser, queryProfile } = require('../../src/model/user.js');


// test('model层: 查询undefined用户信息', async () => {
//     let result = await queryProfile(undefined);
//     // console.log("--result: ", result);
//     expect(result.profile).toMatch('未查询到该用户个人信息');
// });

// test('model层: 查询"admin"用户信息', async () => {
//     let result = await queryProfile("admin");
//     console.log("--result: ", result);
//     expect(result.account).toMatch('admin');
// })