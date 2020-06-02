import {
  registerMicroApps,
  addGlobalUncaughtErrorHandler,
  start
} from "qiankun";

import apps from "./apps";

/**
 * @description 注册微应用，并设置为应用的 lifeCycle
 */
registerMicroApps(apps, {
  beforeLoad: app => {
    console.warn("micro app before load!!!", app.name);
  },
  afterMount: app => {
    console.warn("micro app after mount!!!", app.name);
  }
});

/**
 * @description 添加全局的未捕获异常处理器
 */
addGlobalUncaughtErrorHandler(e => {
  console.error(e);
})

export default start;