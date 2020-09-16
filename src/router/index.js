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
    path: "/films/:id",
    name: "Film",
    props: true,
    component: () => import(/* webpackChunkName: "film" */ "../views/Film.vue")
  },
  {
    path: "/characters",
    name: "Characters",
    component: () =>
      import(/* webpackChunkName: "characters" */ "../views/Characters.vue")
  },
  {
    path: "/planets",
    name: "Planets",
    component: () =>
      import(/* webpackChunkName: "planets" */ "../views/Planets.vue")
  },
  {
    path: "/species",
    name: "Species",
    component: () =>
      import(/* webpackChunkName: "species" */ "../views/Species.vue")
  },
  {
    path: "/starships",
    name: "Starships",
    component: () =>
      import(/* webpackChunkName: "starships" */ "../views/Starships.vue")
  },
  {
    path: "/vehicles",
    name: "Vehicles",
    component: () =>
      import(/* webpackChunkName: "vehicles" */ "../views/Vehicles.vue")
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/404",
    name: "Error404",
    component: () =>
      import(/* webpackChunkName: "error404" */ "../views/Error404.vue")
  },
  {
    path: "*",
    redirect: "/404"
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
