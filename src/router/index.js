import Vue from "vue";
import Router from "vue-router";

/* const Main = resolve => require(['@/components/Main.vue'], resolve)
const About = resolve => require(['@/components/About.vue'], resolve)
const Showcase = resolve => require(['@/components/Showcase.vue'], resolve) */

import Main from "@/components/Main.vue";
import About from "@/components/About.vue";
import Showcase from "@/components/Showcase.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      name: "main",
      path: "/",
      component: Main
    },
    {
      name: "about",
      path: "/about",
      component: About
    },
    {
      name: "showcase",
      path: "/showcase",
      component: Showcase
    }
  ]
});
