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
import { watch, reactive } from 'vue';

export default function() {
  const Store = useStore();

  var lang = reactive(Store.state.lang === "en" ? {...en} : {...zhCN});
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

  function t(path, options) {
    // console.log("---t store lang:", Store.state.lang);

    // var lang = reactive(Store.state.lang === "en" ? {...en} : {...zhCN});
    // console.log("---lang: ", lang);


    


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

  /**
   * @description 获取语言的js文件
   */
  function getLangObj(path="") {
    return path ? t(path) : lang;
  }
 
  return {t, getLangObj};
}
