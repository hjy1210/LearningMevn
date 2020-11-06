import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Dishes from "./views/Dishes.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      component: () => import("./views/About.vue")
    },
    {
      path: "/chefs",
      name: "chefs",
      component: () => import("./views/Chefs.vue")
    },
    {
      path: "/chef/edit/:id",
      name: "chefedit",
      component: () => import("./views/Chefedit")
    },
    {
      path: "/dishes",
      name: "dishes",
      component: Dishes
    }
  ]
});
