import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/films"
  },
  {
    path: "/films",
    name: "Films",
    component: () =>
      import(/* webpackChunkName: "films" */ "../views/Films.vue")
  },
  {
    path: "/characters",
    name: "Characters",
    component: () =>
      import(/* webpackChunkName: "characters" */ "../views/Characters.vue")
  },
  // {
  //   path: "/planets",
  //   name: "Planets",
  //   component: () =>
  //     import(/* webpackChunkName: "films" */ "../views/Films.vue")
  // },
  // {
  //   path: "/species",
  //   name: "Species",
  //   component: () =>
  //     import(/* webpackChunkName: "films" */ "../views/Films.vue")
  // },
  // {
  //   path: "/starships",
  //   name: "Starships",
  //   component: () =>
  //     import(/* webpackChunkName: "films" */ "../views/Films.vue")
  // },
  // {
  //   path: "/vehicles",
  //   name: "Vehicles",
  //   component: () =>
  //     import(/* webpackChunkName: "characters" */ "../views/Characters.vue")
  // },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
