import { createRouter } from 'vue-router'

<template>
  <div style="display: flex; flex-direction: column; flex: 1">
    <header>
      <h1>Great Wall of China</h1>
    </header>
    <LeafletMap map-of="china" :start-lat-lng="new LatLng(32.5, 104.5)" />
  </div>
</template>

<script setup lang="ts">
// Import components and add to components obj
import { LatLng } from 'leaflet';
import LeafletMap from '../components/LeafletMap.vue';
</script>
