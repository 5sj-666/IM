// import { createRouter, createWebHistory } from "vue-router";
import Login from "@/pages/login.vue";
import register from "@/pages/register.vue";
import Home from "@/pages/Home.vue";
import Main from "@/pages/Main.vue";
import NotFound from "@/pages/NotFound.vue"

import Dialogue from "@/pages/Chats/Dialogue.vue"
import Profile from "@/pages/Chats/Profile.vue"
import videoCall from "@/pages/Chats/VideoCall.vue"

const routes = [
  {
    path: "/",
    name: "Main",
    component: Main
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: register,
  },
  {
    path: "/Home",
    name: "Home",
    component: Home
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
    component: Dialogue
  },
  {
    path: "/dialogue/profile/:userId", // /users/:username
    name: "Profile",
    component: Profile
  },
  {
    path: "/dialogue/videoCall/:userId",
    name: "VideoCall",
    component: videoCall
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
