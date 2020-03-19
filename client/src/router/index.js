import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Lobby from "../views/Lobby.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/lobby",
    name: "Lobby",
    component: Lobby
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
