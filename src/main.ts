import { createApp } from 'vue';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { createRouter, type RouterOptions, createWebHistory } from 'vue-router';
import App from './App.vue';
import Home from './pages/Home.vue';
import NewYork from './pages/NewYork.vue';
import BayArea from './pages/BayArea.vue';
import China from './pages/China.vue';

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/new-york',
    name: 'New York City',
    component: NewYork,
  },
  {
    path: '/bay-area',
    name: 'Bay Area',
    component: BayArea,
  },
  {
    path: '/china',
    name: 'China',
    component: China,
  },
];

const routerOptions: RouterOptions = {
  routes,
  history: createWebHistory(),
};

const router = createRouter(routerOptions);
const vuetify = createVuetify({
  components,
  directives,
});
createApp(App).use(router).use(vuetify).mount('#app');

// NOTE: FOR SAFE BUILD COMMAND: //"run-p type-check \"build-only {@}\" --",
