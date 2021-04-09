// import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Home.vue";
import Main from "@/pages/Main.vue";
import NotFound from "@/pages/NotFound.vue"

import Dialogue from "@/pages/Chats/Dialogue.vue"

const routes = [
  {
    path: "/",
    name: "Main",
    component: Main
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
    path: "/dialogue",
    name: "Dialogue",
    component: Dialogue
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
