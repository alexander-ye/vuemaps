import { createRouter } from 'vue-router'

<template>
  <header>
    <h1>Great Wall of China</h1>
  </header>
  <main>
    <div style="width: 960px; height: 720px">
      <!-- <v-switch label="Show provinces"></v-switch>
      <v-switch label="Show Great Wall"></v-switch>
      <v-switch label="Show Great Wall Gates"></v-switch> -->
      <LeafletMap :map-of="'china'" 
      :start-lat-lng="new LatLng(32.5, 104.5)"
      />
    </div>
  </main>
</template>

<script setup lang="ts">
// Import components and add to components obj
import { LatLng } from 'leaflet';
import LeafletMap from '../components/LeafletMap.vue'

</script>
