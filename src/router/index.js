import Vue from "vue";
import VueRouter from "vue-router";
import CategoryView from "@/views/CategoryView.vue";
import Film from "@/views/info/Film.vue";
import Character from "@/views/info/Character.vue";
import Planet from "@/views/info/Planet.vue";
import Species from "@/views/info/Species.vue";
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
      name: "FilmInfo",
      component: Film
    },
    {
      path: "/people",
      name: "Characters",
      component: CategoryView
    },
    {
      path: "/people/:id",
      name: "CharacterInfo",
      component: Character
    },
    {
      path: "/planets",
      name: "Planets",
      component: CategoryView
    },
    {
      path: "/planets/:id",
      name: "PlanetInfo",
      component: Planet
    },
    {
      path: "/species",
      name: "Species",
      component: CategoryView
    },
    {
      path: "/species/:id",
      name: "SpeciesInfo",
      component: Species
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
