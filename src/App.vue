



<template>
   <h1>Maps!</h1>
  <p>
    <strong>Current route path:</strong> {{ $route.fullPath }}
  </p>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/china">China</RouterLink>
    <RouterLink to="/new-york">New York</RouterLink>
  </nav>
  <main>
    <RouterView />
  </main>
</template>

<script setup lang="ts">
// Import components and add to components obj
import { RouterLink, RouterView } from 'vue-router'
import LeafletMap from './components/LeafletMap.vue'
</script>
