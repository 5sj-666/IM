// import defaultLang from './lang/en';
// import Vue from 'vue';
// import deepmerge from 'deepmerge';
// import Format from './format';
import en from './lang/en'
import zhCN from './lang/zh-CN'

// let lang = defaultLang;
// const format = Format(Vue);

// const localize = localstrogeLang => {
//   //设置语言，需要刷新页面才能变化。
//   switch (localstrogeLang) {
//     case "zh-CN":
//       lang = zhCN;
//       break;
//     default:
//       lang = en;
//   }
// };
// localize(localStorage.getItem("AOWU_LANGUAGE"));

// let merged = false;
// let i18nHandler = function () {
//   const vuei18n = Object.getPrototypeOf(this || Vue).$t;
//   if (typeof vuei18n === 'function' && !!Vue.locale) {
//     if (!merged) {
//       merged = true;
//       Vue.locale(
//         Vue.config.lang,
//         deepmerge(lang, Vue.locale(Vue.config.lang) || {}, { clone: true })
//       );
//     }
//     return vuei18n.apply(this, arguments);
//   }
// };

import { useStore } from 'vuex';
import { computed, watch, reactive } from 'vue';

// export const t = function (path, options) {

//     // const slang = Store.state.lang;
//     console.log("---t store lang:", Store);
//     var lang = zhCN;
//     // console.log("----t翻译函数:", path);
// //   let value = i18nHandler.apply(this, arguments);
// //   if (value !== null && value !== undefined) return value;
//     var value = "";
//     const array = path.split('.');
//     let current = lang;
//     // console.log("currenlang:", current, "--array", array);

//     for (let i = 0, j = array.length; i < j; i++) {
//         const property = array[i];
//         // console.log("---property:", property, "--current[property]: ", current[property], "---current: ", current);
//         value = current[property];
//         // console.log("--value: ", value);
//         // if (i === j - 1) return format(value, options);
//         if (i === j - 1) return value;
//         if (!value) return '';
//         current = value;
//     }
//     return '';
// };

export default function() {
  const Store = useStore();

  function t(path, options) {
     // const slang = Store.state.lang;
    console.log("---t store lang:", Store.state.lang);



    // var lang = zhCN;
    var lang = reactive(Store.state.lang === "en" ? {...en} : {...zhCN});
    // console.log("---lang: ", lang);


    //需要优化  目前无法实现实时更换语言功能(需要刷新页面)
    watch(()=>Store.state.lang, (newValue, oldValue) => { //直接监听
      // console.log("Store.state.lang改变了", newValue);
      if(newValue === "en") {
        lang = {...en};
      }else{
        lang = {...zhCN};
      }
      console.log("---local:　改变获取的lang：", lang);
    });


    var value = "";
    const array = path.split('.');
    let current = lang;
    // console.log("currenlang:", current, "--array", array);

    for (let i = 0, j = array.length; i < j; i++) {
      const property = array[i];
      // console.log("---property:", property, "--current[property]: ", current[property], "---current: ", current);
      value = current[property];
      // console.log("--value: ", value);
      // if (i === j - 1) return format(value, options);
      if (i === j - 1) return value;
      if (!value) return '';
      current = value;
    }
  }
 
  return {t};
}

// export const use = function (l) {
//   lang = l || lang;
// };

// export const i18n = function (fn) {
//   i18nHandler = fn || i18nHandler;
// };

// export default { use, t, i18n };
// export default { use, t };