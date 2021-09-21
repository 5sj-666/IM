
self.addEventListener('fetch', function(event) {
  console.log('fetch监听实事件', event.request.url);
  // debugger;

  event.respondWith(
    caches.match(event.request)
    .then(function(response) {
      if (response) {
        console.log('找到fetch缓存:', response);

        return response;
      }
      console.log('cache中无相匹配缓存. 改为网络请求...');

      return fetch(event.request).then(function(response) {
        console.log('Response from network is:', response);

        return response;
      }).catch(function(error) {
        console.error('Fetching failed:', error);

        throw error;
      });
    })
  );
});