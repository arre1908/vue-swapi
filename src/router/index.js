import Vue from "vue";
import VueRouter from "vue-router";
import Films from "@/views/Films.vue";
import Film from "@/views/info/Film.vue";
import Characters from "@/views/Characters.vue";
import Planets from "@/views/Planets.vue";
import Species from "@/views/Species.vue";
import Starships from "@/views/Starships.vue";
import Vehicles from "@/views/Vehicles.vue";
import About from "@/views/About.vue";
import Error404 from "@/views/Error404.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/films"
  },
  {
    path: "/films",
    name: "Films",
    component: Films
  },
  {
    path: "/films/:id",
    name: "Film",
    props: true,
    component: Film
  },
  {
    path: "/people",
    name: "Characters",
    component: Characters
  },
  {
    path: "/planets",
    name: "Planets",
    component: Planets
  },
  {
    path: "/species",
    name: "Species",
    component: Species
  },
  {
    path: "/starships",
    name: "Starships",
    component: Starships
  },
  {
    path: "/vehicles",
    name: "Vehicles",
    component: Vehicles
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
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
