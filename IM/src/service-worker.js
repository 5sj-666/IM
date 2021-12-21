
// // import {registerRoute} from 'workbox-routing';
// // import {CacheFirst} from 'workbox-strategies';
// // import 'workbox'
// import {setCacheNameDetails} from 'workbox-core';

// setCacheNameDetails({
//   prefix: 'my-app',
//   suffix: 'v1'
// });






// // 原生写法
// self.addEventListener('fetch', function(event) {
//   console.log('fetch监听实事件', event.request.url);
//   // debugger;

//   event.respondWith(
//     caches.match(event.request)
//     .then(function(response) {
//       if (response) {
//         console.log('找到fetch缓存:', response);

//         return response;
//       }
//       console.log('cache中无相匹配缓存. 改为网络请求...');

//       return fetch(event.request).then(function(response) {
//         console.log('Response from network is:', response);

//         return response;
//       }).catch(function(error) {
//         console.error('Fetching failed:', error);

//         throw error;
//       });
//     })
//   );
// });



// // workbox.core.setCacheNameDetails({
// //   prefix: 'IM',
// //   suffix: 'v1.0.0',
// // });
// // /*
// // * vue-cli3.0通过workbox-webpack-plagin 来实现相关功能，我们需要加入
// // * 以下语句来获取预缓存列表和预缓存他们，也就是打包项目后生产的html，js，css等* 静态文件
// // */
// // workbox.precaching.precacheAndRoute(self.__precacheManifest || []);

// // // 对我们请求的数据进行缓存，
// // // 缓存策略：一共五种
// // // networkFirst：网络优先策略，优先尝试通过网络获取资源，如果获取失败则使用缓存中的资源
// // // cacheFirst：缓存优先策略，优先使用缓存中的资源，如果缓存中没有相关资源，则进行网络请求获取资源
// // // networkOnly：只使用网络请求获取资源
// // // cacheOnly：只使用缓存中的资源
// // // stateWhileRevalidate：如果缓存有数据，直接返回缓存中的资源，让界面快速加载，然后再发起网络请求更新相关资源并进行缓存
// // workbox.routing.registerRoute(
// //   new RegExp('.*/.*'),
// //   workbox.strategies.networkFirst()
// // );




// console.warn("----111111111111111-----");


// // registerRoute(
// //     '/emoji/emoji_awesome.png',
// //     new CacheFirst()
// // );



importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.1.1/workbox-sw.js')

workbox.loadModule('workbox-precaching')
workbox.loadModule('workbox-routing')
workbox.loadModule('workbox-strategies')
workbox.loadModule('workbox-expiration')
workbox.loadModule('workbox-cacheable-response')

const { cleanupOutdatedCaches, precacheAndRoute } = workbox.precaching
const { registerRoute } = workbox.routing
const { CacheFirst, StaleWhileRevalidate, NetworkFirst } = workbox.strategies
const { ExpirationPlugin } = workbox.expiration
const { CacheableResponsePlugin } = workbox.cacheableResponse;

const DAY_IN_SECONDS = 24 * 60 * 60
const MONTH_IN_SECONDS = DAY_IN_SECONDS * 30

// precache
cleanupOutdatedCaches()
// const assetsToCache = self.__WB_MANIFEST || []; //__precacheManifest



let userDefine = [
  {
    "revision": "eae1c196bca331e7f2ae2faab80175c9",
    "url": "/emoji/emoji_a_red_envelope.png"
  },
]


const assetsToCache = [...self.__precacheManifest, ...userDefine] || [];
// debugger;
precacheAndRoute(assetsToCache)

// registerRoute(
//     '/emoji/emoji_awesome.png',
//     new StaleWhileRevalidate()
// );

// Cache page navigations (html) with a Network First strategy
registerRoute(
  // Check to see if the request is a navigation to a new page
  new RegExp('/api/*/'),
  // Use a Network First caching strategy
  new NetworkFirst({
    // Put all cached files in a cache named 'pages'
    cacheName: 'api',
    plugins: [
      // Ensure that only requests that result in a 200 status are cached
      new CacheableResponsePlugin({
        statuses: [200],
      }),
    ],
  }),
);

// routes
registerRoute(/\.(?:js|css)$/, new StaleWhileRevalidate())
registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  new CacheFirst({
    cacheName: 'images-cache',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 250,
        maxAgeSeconds: MONTH_IN_SECONDS
      })
    ]
  })
)

self.addEventListener('message', (event) => {
  if (event && event.data) {
    console.debug(`Skipping waiting...`, event.data)
    if (event.data === 'SKIP_WAITING') {
      console.debug(`Skipping waiting...`)
      self.skipWaiting()
      self.clients.claim()
    }
  }
})