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

### 血泪教训： front-end分支 git rebase dev 之后没有执行--push-with-lease导致分支重复提交一大段; 2. front分支长达22次提交未rebase，导致后来rebase dev时候，需要疯狂合并，需要合并的次数达10+次。无
奈放弃rebase，在dev分支上直接使用merge


### 1rem = 16px; 设计图大小1080x2248; 1080 / 375 = 2.88; 16 * 2.88 = 46.08; 
### 在1080px设计图的情况下  1rem = 46.08px;

☑️ 文本信息发送
☑️ 视频通话
☑️ 语言切换(中文-英文)
☑️ 主题切换(普通模式-黑夜模式)
☑️ 路由过渡动画
🟦 聊天数据本地持久化(indexDB)
🟦 骨架屏与预渲染

🟦 登录/注册
🟦 
🟪 