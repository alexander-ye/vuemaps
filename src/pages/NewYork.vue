import { createRouter } from 'vue-router'

<template>
  <div style="display: flex; flex-direction: column; flex: 1">
    <header>
      <h1>Boroughs of New York</h1>
    </header>
    <LeafletMap map-of="new-york" :start-lat-lng="new LatLng(40.5, -74)" />
  </div>
</template>

<script setup lang="ts">
// Import components and add to components obj
import { LatLng } from 'leaflet';
import LeafletMap from '../components/LeafletMap.vue';
</script>
