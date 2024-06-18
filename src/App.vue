<template>
  <h1>Maps!</h1>
  <nav style="display: flex; flex-direction: row; gap: 8px">
    <RouterLink to="/" style="text-decoration: none">Home</RouterLink>
    <RouterLink to="/new-york" style="text-decoration: none"
      >New York</RouterLink
    >
    <RouterLink to="/bay-area" style="text-decoration: none"
      >Bay Area</RouterLink
    >
    <RouterLink to="/china" style="text-decoration: none">China</RouterLink>
  </nav>
  <main>
    <RouterView :key="$route.fullPath" />
  </main>
</template>

<script setup lang="ts">
// Import components and add to components obj
import { RouterLink, RouterView } from 'vue-router';
import LeafletMap from './components/LeafletMap.vue';
</script>

<style>
html,
body,
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

#app {
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>
