import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, type RouterOptions, createMemoryHistory } from 'vue-router'

import Home from './pages/Home.vue'
import China from './pages/China.vue'
import NewYork from './pages/NewYork.vue'

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/china',
    component: China
  },
  {
    path: '/new-york',
    component: NewYork
  }
]

const routerOptions: RouterOptions = {
  routes,
  history: createMemoryHistory()
}

const router = createRouter(routerOptions)

createApp(App).use(router).mount('#app')
