// const path = require('path')
// function resolve (dir) {
//   return path.join(__dirname, dir)
// }

module.exports = {
    // publicPath: './',
    // assetsDir: './',
    // chainWebpack: config => {
    //   config.resolve.alias
    //     .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
    // },
      //vue-cli3.0 里面的 vue.config.js做配置
    devServer: {
      proxy: {
          '/api': {     //这里最好有一个 /
              target: 'http://localhost:3000',  // 后台接口域名
              ws: true,        //如果要代理 websockets，配置这个参数
              secure: false,  // 如果是https接口，需要配置这个参数
              changeOrigin: true,  //是否跨域
              pathRewrite:{
                  //'^/api':''
              }
          }
      }
    },
    
}