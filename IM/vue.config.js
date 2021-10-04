const path = require('path')
// function resolve (dir) {
//   return path.join(__dirname, dir)
// }
const PrerenderSPAPlugin = require('Prerender-spa-plugin');
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;

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
              // target: 'https://www.fffuture.top:443',  // 后台接口域名
              ws: true,        //如果要代理 websockets，配置这个参数
              secure: false,  // 如果是https接口，需要配置这个参数
              changeOrigin: true,  //是否跨域
              pathRewrite:{
                  //'^/api':''
              }
          },
          '/avatar': {
            target: 'https://www.fffuture.top:443', 
            secure: true,
          },
          '/emoji': {
            target: 'https://www.fffuture.top:443', 
            secure: true,
          }
      }
    },

    //预渲染配置
    configureWebpack: config => {
      if(process.env.NODE_ENV !== 'production') return;
      return {
        plugins: [
          new PrerenderSPAPlugin({
            //生成文件的路径，也可以与webpack打包的一致。
            // 下面这句话非常重要
            // 这个目录只能有一级，如果目录层次大于一级，在生成的时候不会有任何错误，但在预渲染的时候只会卡着不动。
            staticDir: path.join(__dirname, 'dist'),
            // 对应自己的路由文件，如果没有配置这段，也不会进行预编译
            routes: ['/', '/login'],
            renderer: new Renderer({
              inject: {
                foo: 'bar'
              },
              headless: false,
              renderAfterDocumentEvent: 'render-event'
            })
          })
        ]
      }
    },
 
    pwa: {
      name: 'My App test',
      themeColor: '#4DBA87',
      msTileColor: '#000000',
      appleMobileWebAppCapable: 'yes',
      appleMobileWebAppStatusBarStyle: 'black',
  
      // configure the workbox plugin
      workboxPluginMode: 'InjectManifest',
      workboxOptions: {
        // swSrc is required in InjectManifest mode.
        swSrc: './service-worker.js',
        // ...other Workbox options...
      }
    }
    
    
}