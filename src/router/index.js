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
      component: CategoryView,
      props: {
        title: "Films",
        path: "films/"
      }
    },
    {
      path: "/films/:id",
      name: "Film",
      component: Film,
      props: true
    },
    {
      path: "/people",
      name: "Characters",
      component: CategoryView,
      props: {
        title: "Characters",
        path: "people/"
      }
    },
    {
      path: "/people/:id",
      name: "Character",
      component: Character,
      props: true
    },
    {
      path: "/planets",
      name: "Planets",
      component: CategoryView,
      props: {
        title: "Planets",
        path: "planets/"
      }
    },
    {
      path: "/planets/:id",
      name: "Planet",
      component: Planet,
      props: true
    },
    {
      path: "/species",
      name: "Species",
      component: CategoryView,
      props: {
        title: "Species",
        path: "species/"
      }
    },
    {
      path: "/starships",
      name: "Starships",
      component: CategoryView,
      props: {
        title: "Starships",
        path: "starships/"
      }
    },
    {
      path: "/vehicles",
      name: "Vehicles",
      component: CategoryView,
      props: {
        title: "Vehicles",
        path: "vehicles/"
      }
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
