import Vue from "vue";
import VueRouter from "vue-router";
import CategoryView from "@/views/CategoryView.vue";
import Film from "@/views/info/Film.vue";
import Character from "@/views/info/Character.vue";
import Planet from "@/views/info/Planet.vue";
import Species from "@/views/info/Species.vue";
import Starship from "@/views/info/Starship.vue";
import Vehicle from "@/views/info/Vehicle.vue";
import About from "@/views/About.vue";
import Error404 from "@/views/Error404.vue";

Vue.use(VueRouter);

const router = new VueRouter({
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
      path: "/starships/:id",
      name: "StarshipInfo",
      component: Starship
    },
    {
      path: "/vehicles",
      name: "Vehicles",
      component: CategoryView
    },
    {
      path: "/vehicles/:id",
      name: "VehicleInfo",
      component: Vehicle
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
