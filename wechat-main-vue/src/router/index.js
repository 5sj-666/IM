// import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Main from "@/views/Main";
import NotFound from "@/views/NotFound"

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
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/notFound",
    name: "NotFound",
    component: () => import("../views/NotFound.vue")
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
