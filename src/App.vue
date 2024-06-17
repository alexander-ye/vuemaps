<template>
  <header>
    <h1>The Boroughs of New York</h1>
  </header>
  <main>
    <div style="width: 960px; height: 720px"><LeafletMap /></div>
  </main>
</template>

<script setup lang="ts">
// Import components and add to components obj
import LeafletMap from './components/LeafletMap.vue'
</script>
