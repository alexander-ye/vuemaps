import { createRouter } from 'vue-router'

<template>
  <header>
    <h1>Great Wall of China</h1>
  </header>
  <main>
    <div style="width: 960px; height: 720px"><LeafletMap :map-of="'china'" /></div>
  </main>
</template>

<script setup lang="ts">
// Import components and add to components obj
import LeafletMap from '../components/LeafletMap.vue'
</script>
