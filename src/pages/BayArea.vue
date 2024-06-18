import { createRouter } from 'vue-router'

<template>
  <header>
    <h1>Bay Area Counties</h1>
  </header>
  <main>
    <div style="width: 960px; height: 720px">
      <LeafletMap
        map-of="bay-area"
        :start-lat-lng="new LatLng(37.5, -122.25)"
      />
    </div>
  </main>
</template>

<script setup lang="ts">
// Import components and add to components obj
import { LatLng } from 'leaflet';
import LeafletMap from '../components/LeafletMap.vue';
</script>
