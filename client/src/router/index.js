import Vue from 'vue'
import VueRouter from 'vue-router'
import Rooms from '../views/Rooms.vue'
import Room from '../views/Room.vue'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  {
    path: '/rooms',
    name: 'Rooms',
    component: Rooms
  },
  {
    path: '/rooms/:id',
    name: 'Room',
    component: Room
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
