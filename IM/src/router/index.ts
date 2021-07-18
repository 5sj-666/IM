// import { createRouter, createWebHistory } from "vue-router";
import Login from "@/pages/login.vue";
import Register from "@/pages/Register.vue";
import Main from "@/pages/Main.vue";
import NotFound from "@/pages/NotFound.vue"

import Dialogue from "@/pages/Chats/Dialogue.vue"
import Profile from "@/pages/Chats/Profile.vue"
import videoCall from "@/pages/Chats/VideoCall.vue"

import Setting from "@/pages/Main/Mine/Setting.vue"

const routes = [
  {
    path: "/",
    name: "Main",
    component: Main,
    meta: { 
      keepAlive: true,
      rank: 1
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      rank: 0,
    }
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      rank: 1,
    }
  },
  {
    path: "/setting",
    name: "Setting",
    component: Setting,
    meta: {
      rank: 5
    }
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../pages/About.vue")
  },
  {
    path: "/dialogue/:userId",
    name: "Dialogue",
    component: Dialogue,
    meta: {
      rank: 3,
    }
  },
  {
    path: "/dialogue/profile/:userId", // /users/:username
    name: "Profile",
    component: Profile,
    meta: {
      rank: 2,
    }
  },
  {
    path: "/dialogue/videoCall/:userId",
    name: "VideoCall",
    component: videoCall,
    meta: {
      rank: 5,
    }
  },
  {
    path: "/notFound",
    name: "NotFound",
    component: () => import("../pages/NotFound.vue")
  },
  {
    path: "/*",
    component: NotFound,
  }
];

// const router = createRouter({
//   history: createWebHistory(process.env.BASE_URL),
//   routes
// });

// export default router;
export default routes;
