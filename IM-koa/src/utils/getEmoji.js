
/**
 * @author wsj
 * @description 从掘金评论里获取emoji表情图片，从有道翻译移动版获取emoji名字的英文翻译。最终输出是带有对应释义名称的emoji图片集合
 * @param {*}  
 * @returns 
 */


var fs = require('fs');
const fetch = require('node-fetch');
const cheerio = require('cheerio');

/**
 * @description 翻译函数，多个单词使用小写并下划线隔开，例子：微笑你好 -> Smile hello -> smile_hello
 * @param {string} word 需要翻译的中文
 * @param {number} duration 延长请求时间，防止被识别为爬虫
 * @returns {Promise} 翻译完成的英文
 */
function translate(word, duration) {
    console.log("---输入： ",word);
    return new Promise((resolve, reject) => {
      if(!word) resolve("empty_input");

      setTimeout(() => {
        fetch(`https://m.youdao.com/translate?inputtext=${encodeURI(word)}&type=ZH_CN2EN`)
        .then(res => res.text())
        .then(body => {
          const $ = cheerio.load(body);
          let name = ($(".generate #translateResult").text() + "").trim();
          resolve((name+"").toLowerCase().replace(/ /g, '_').replace(/\,/g, ""));
        })
        .catch(err => {
          console.log("---err: ", err);
          // reject(false);
          resolve("empty_input")
        })
      }, duration)

    })
}
  
  /**
   * @description 获取并保存包含emoji相关信息的js文件，比如emoji名字和地址
   */
  function saveJSFile() {
    return new Promise(async (resolve, reject) => {
      try {
        fs.writeFile("./emoji/jsFile.js", "111", err => {
          if(!err) console.log("创建jsFile.js成功~");
        });
        const dest = fs.createWriteStream('./emoji/jsFile.js');
        let res = await fetch('https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/90efd53.js');
        let reader = res.body.pipe(dest);
        reader.on('finish', () => {resolve("success");});
      } catch (error) {
        reject("false");
      }
    })
    
  }

  async function getImgNames() {
    let res = await saveJSFile();
    console.log("--res:", res);
    if(res !== "success") return res;

    return new Promise(async (resolve, reject) => {
      // let res = "success";
      try {
          var hugeString = JSON.stringify(fs.readFileSync('./emoji/jsFile.js', 'utf-8'));
          console.log("---hugeString", hugeString);
          //正则表达式 过滤匹配相关的图片字符串
          let namesCN = hugeString.match(/{source:\\\".{1,10}]/g);
          namesCN = namesCN.map(value => (value+"").replace(/{source:\\\"\[|]/g, ""));

          let names = hugeString.match(/jj_emoji.{1,20}png/g);
          let nameList = [];
          transList = [];
          for(let i in names) {
            if(names[i]) {
                nameList.push({
                  url: `https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/img/${names[i]}`,
                  CN: namesCN[i],
                  EN: await translate(namesCN[i], 2000),
                })
            }
          }
          // console.log("---nameList:", nameList);
          fs.writeFile("./emoji/names.js", JSON.stringify(nameList), err => {
            console.log("err: ", err);
            if(!err) console.log("--名称写入成功 success~");
          });
          resolve('success');
      }catch (error) {
        reject(error)
      }
    })
  }

  const { imgArr } = require('../../emoji/names.js');

  async function saveImg() {
      let fetchList = [];
      for(let item of imgArr) fetchList.push(fetch(item.url));
      
      // console.log("---fetchList: ", fetchList);
      return new Promise((resolve, reject) => {
        try {
          let i = 0;
          Promise.allSettled(fetchList)
          .then(results => results.forEach((result) => {
            if(result.status === "fulfilled") {
              let dest = fs.createWriteStream(`./emojiEN/emoji_${imgArr[i].EN}.png`);
              result.value.body.pipe(dest);
              i++;
              console.log(`保存${imgArr[i].CN}${imgArr[i].EN}成功`);
            }else {
              console.log(`保存${imgArr[i].CN}${imgArr[i].EN}失败`, err);

            }
          }))
          .catch(err=> {
            console.log("--保存表情失败： ", err);
          });
          resolve("saved");

        } catch (error) {
          reject('---error')
        }
      });
  }
  

module.exports = {
  saveJSFile,
  getImgNames,
  translate,
  saveImg
}