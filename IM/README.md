# libre

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### 在非HTTPS和localhost环境下  navigator.mediaDevices属性为undefined问题:
see (https://www.cnblogs.com/Wayou/p/using_MediaDevices_getUserMedia_wihtout_https.html)

### github提交记录增加表情: 
see (https://zhuanlan.zhihu.com/p/139600720)

### MDN信令与视频通话
see (https://developer.mozilla.org/zh-CN/docs/Web/API/WebRTC_API/Signaling_and_video_calling)

### 主题切换(修改:root的data-theme)
see (https://blog.csdn.net/ljw1412/article/details/107260239/)

### IndexDB教程
see (https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API/Using_IndexedDB)

### vue3版本css变量使用，无需显式声明vars，通过v-bind推断
see (https://github.com/vuejs/rfcs/pull/231)

### 血泪教训： front-end分支 git rebase dev 之后没有执行--push-with-lease导致分支重复提交一大段; 2. front分支长达22次提交未rebase，导致后来rebase dev时候，需要疯狂合并，需要合并的次数达10+次。无奈放弃rebase，在dev分支上直接使用merge，导致提交记录乱糟糟

### mysql 社区版安装教程
see (https://www.cnblogs.com/winton-nfs/p/11524007.html)

### 预渲染
see (https://zhuanlan.zhihu.com/p/337866915)

### vue的pwa 配置
see (https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa)

### workbox选择GenerateSW还是InjectManifest   项目中使用InjectManifest
see (https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin#which_plugin_to_use)


### 1rem = 16px; 设计图大小1080x2248; 1080 / 375 = 2.88; 16 * 2.88 = 46.08; 
### 在1080px设计图的情况下  1rem = 46.08px;

前端：
☑️ 文本/表情信息发送   
☑️ 视频通话   
☑️ 语言切换(中文-英文)   
☑️ 主题切换(普通模式-黑夜模式)   
☑️ 路由过渡动画   
🟦 聊天数据本地持久化(indexDB)[部分完成]   
☑️ 骨架屏与预渲染（简单实践）  
🟦 SVG图标[部分完成]   
🟦 聊天发送图片
🟦 service-worker 离线应用配置[部分完成]   

🟦 上传头像（优化点： 使用canvas做图片压缩）   
☑️ 添加好友   

☑️ 登录/注册   
☑️ Main页面swiper切换效果     
🟦 生产者-消费者模式使用   
🟦 建造者模式使用   
🟦 插入排序应用在Contacts页面联系人锚点跳转   


后端：   
☑️ 登录/注册   
☑️ 获取用户信息   
☑️ 获取好友列表   
☑️ 添加、删除好友   
🟦 删除好友   
☑️ JWT   
☑️ https   
☑️ 用户消息处理与转发   
☑️ MVC架构   
☑️ mySQL   
☑️ 获取掘金emoji表情脚本   

其他：   
☑️ coturn服务器搭建   
