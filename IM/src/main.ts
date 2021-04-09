import { createApp } from 'vue'
import App from './App.vue'

import { createRouter, createWebHistory } from "vue-router";
import routes from "./router";
import './registerServiceWorker'

// import image form "@/assets/logo.png"

Notification.requestPermission(function(result) {
    if (result === 'granted') {
      navigator.serviceWorker.ready.then(function(registration) {
        let message = {
          badge: '',
          body: "测试消息内容",
          // image: 
        };
        // registration.showNotification('Notification with ServiceWorker');
        registration.showNotification('title', message);
      });
    }
});

const router = createRouter({history: createWebHistory(), routes: routes});

createApp(App)
    .use(router)
    .mount('#app');
