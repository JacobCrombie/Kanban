import Vue from 'vue'
import Router from 'vue-router'
// @ts-ignore
import Home from '../pages/Home.vue'
// @ts-ignore
import Boards from '../pages/Boards.vue'
// @ts-ignore
import Board from '../pages/Board.vue'
// @ts-ignore
import { authGuard } from "@bcwdev/auth0-vue"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/boards',
      name: 'boards',
      component: Boards,
      beforeEnter: authGuard
    },
    {
      path: '/boards/:id',
      name: 'board',
      component: Board,
      props: true,
      beforeEnter: authGuard
    },
    {
      path: "*",
      redirect: '/'
    }
  ]
})