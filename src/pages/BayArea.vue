import { createRouter } from 'vue-router'

<template>
  <div style="display: flex; flex-direction: column; flex: 1">
    <header>
      <h1>Bay Area Counties</h1>
    </header>
    <LeafletMap map-of="bay-area" :start-lat-lng="new LatLng(37.5, -122.25)" />
  </div>
</template>

<script setup lang="ts">
// Import components and add to components obj
import { LatLng } from 'leaflet';
import LeafletMap from '../components/LeafletMap.vue';
</script>
