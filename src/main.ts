import { createApp } from 'vue'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createRouter, type RouterOptions, createMemoryHistory } from 'vue-router'
import App from './App.vue'
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
const vuetify = createVuetify({
  components,
  directives,
})
createApp(App).use(router).use(vuetify).mount('#app')
