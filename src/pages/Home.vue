import { createRouter } from 'vue-router'

<template>
  <div style="display: flex; flex-direction: column; flex: 1">
    <header>
      <h1>World Map</h1>
    </header>
    <LeafletMap width="100%" height="100%" />
  </div>
</template>

<script setup lang="ts">
// Import components and add to components obj
import LeafletMap from '../components/LeafletMap.vue';
</script>
