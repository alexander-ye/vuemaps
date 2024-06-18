<template>
   <h1>Maps!</h1>
  <nav style="display: flex; flex-direction: row; gap: 8px;">
    <RouterLink to="/" style="text-decoration: none; ">Home</RouterLink>
    <RouterLink to="/china" style="text-decoration: none; ">China</RouterLink>
    <RouterLink to="/new-york" style="text-decoration: none; ">New York</RouterLink>
  </nav>
  <main>
    <RouterView :key="$route.path"/>
  </main>
</template>

<script setup lang="ts">
// Import components and add to components obj
import { RouterLink, RouterView } from 'vue-router'
import LeafletMap from './components/LeafletMap.vue'
</script>
