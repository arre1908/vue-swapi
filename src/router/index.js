import Vue from "vue";
import VueRouter from "vue-router";
import CategoryView from "@/views/CategoryView.vue";
import Film from "@/views/info/Film.vue";
import Character from "@/views/info/Character.vue";
import Planet from "@/views/info/Planet.vue";
import About from "@/views/About.vue";
import Error404 from "@/views/Error404.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: "/films"
    },
    {
      path: "/films",
      name: "Films",
      component: CategoryView
    },
    {
      path: "/films/:id",
      name: "Film",
      component: Film
    },
    {
      path: "/people",
      name: "Characters",
      component: CategoryView
    },
    {
      path: "/people/:id",
      name: "Character",
      component: Character
    },
    {
      path: "/planets",
      name: "Planets",
      component: CategoryView
    },
    {
      path: "/planets/:id",
      name: "Planet",
      component: Planet
    },
    {
      path: "/species",
      name: "Species",
      component: CategoryView
    },
    {
      path: "/starships",
      name: "Starships",
      component: CategoryView
    },
    {
      path: "/vehicles",
      name: "Vehicles",
      component: CategoryView
    },
    {
      path: "/about",
      name: "About",
      component: About
    },
    {
      path: "/404",
      name: "Error404",
      component: Error404
    },
    {
      path: "*",
      redirect: "/404"
    }
  ]
});

export default router;
