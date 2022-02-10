import Vue from 'vue'
import VueRouter from 'vue-router'
import StopwatchView from '../views/StopwatchView.vue'
import TimerView from '../views/TimerView.vue'
import TasksView from '../views/TasksView.vue'
import SessionsView from '../views/SessionsView.vue'
import ColorsView from '../views/ColorsView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/stopwatch',
    name: 'StopwatchView',
    component: StopwatchView
  },
  {
    path: '/timer',
    name: 'TimerView',
    component: TimerView
  },
  {
    path: '/tasks',
    name: 'TasksView',
    component: TasksView,
  },
  {
    path: '/sessions',
    name: 'SessionsView',
    component: SessionsView,
  },
  {
    path: '/colors',
    name: 'ColorsView',
    component: ColorsView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
