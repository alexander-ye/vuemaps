<template>
  <p v-if="mapsLoading">Loading...</p>
  <div :id="mapId"></div>
</template>

<script setup lang="ts">
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { onMounted, onUnmounted,ref,  shallowRef, watch } from 'vue'
import { logInfo, logError } from '../utils/logger'
import { CHINA_GREAT_WALL_DIRECTIONS, CHINA_GREAT_WALL_PASSES } from '@/data/geojsonsources';
import {TILE_MAP_SRC} from '@/data/tilemapvariants';


const props = defineProps({
  mapOf: {
    type: String,
  }
  })

// The component's setup:
const mapId: string = 'leaflet-map'
const mapOptions = shallowRef({
  center: L.latLng(90, 45),
  zoom: 13,
  zoomControl: true,
  zoomAnimation: true,
  // maxBounds: L.latLngBounds(
  //   L.latLng(18.91619, -171.791110603),
  //   L.latLng(71.3577635769, -66.96466)
  // ),
  layers: []
})
const geoJsonData = shallowRef([])
const mapsLoading = ref(true);
const mapInstance = shallowRef(null)
const layerControlInstance = shallowRef(null)

watch(
  geoJsonData,
  // Watch the geojsonData var for changes:
  async (geoJsonData, prevGeoJsonData) => {
    if (geoJsonData?.length) {
      try {
         // onEachFeature for the geoJSON layer
         const onEachFeature = (feature, layer) => {
          if (layer) {
            if (feature.properties && feature.properties.name) {
              layer.bindPopup(feature.properties.name)
              layer.on('mouseover', () => {
                layer.openPopup()
              })
              layer.on('mouseout', () => {
                layer.closePopup()
              })
            }
          } else {
            logInfo('Invalid layer:', feature)
          }
        }
        geoJsonData.forEach((geoJson) => {
          // Add to the map:
          const geoJsonLayer = L.geoJSON(geoJson, {
            onEachFeature: onEachFeature,
            style: geoJson.style ?? {}
          }).addTo(mapInstance.value)
          // Add to the layer control:
          layerControlInstance.value.addOverlay(geoJsonLayer, 'Maryland geoJSON Layer')
          // Fit the bounds of geojson
          mapInstance.value.fitBounds(geoJsonLayer.getBounds())
        })
      } catch (err) {
        logError(err, err.message)
      }
    }
  }
)

onMounted(() => {
  // Initialize map function:
  const initMap = () => {
    // Create the leaflet map
    const leafletMap = L.map(mapId, mapOptions.value)
    // Create the tile layer and add it to the map:
    const tile = L.tileLayer(
      TILE_MAP_SRC['stadiawatercolor'].url, {
      minZoom: 1,
      maxZoom: 16,
      attribution: TILE_MAP_SRC['stadiawatercolor'].attribution
    }).addTo(leafletMap)
    // Create the layer control and add it to the map:
    layerControlInstance.value = L.control
      .layers({
        OpenStreetMap: tile
      })
      .addTo(leafletMap)
    // Add an event listener to the map:
    leafletMap.on('zoomstart', () => {
    })
    mapInstance.value = leafletMap
  }
  // Fetch the data
  const fetchData = async () => {
    try {
      const fetchedGeoJsonData = []
      switch (props.mapOf) {
        case 'new-york':
          const response = await fetch('https://data.cityofnewyork.us/api/geospatial/tqmj-j8zm?method=export&format=GeoJSON')
          const data = await response.json()
          fetchedGeoJsonData.push(data)
          logInfo('fetched data:', fetchedGeoJsonData)
          geoJsonData.value = fetchedGeoJsonData;
          break
        case 'china':
          for await (const [key, value] of Object.entries(CHINA_GREAT_WALL_DIRECTIONS).concat(Object.entries(CHINA_GREAT_WALL_PASSES))) {
            const response = await fetch(value)
            const data = await response.json()
            fetchedGeoJsonData.push({...data,
              "style": {
                "color": "#ff7800",
                "__comment": "all SVG styles allowed",
                "stroke-width":"10",
              },
            })
          }
          const chineseProvinces = await fetch('https://raw.githubusercontent.com/longwosion/geojson-map-china/master/china.json').then((response) => response.json())
          fetchedGeoJsonData.push(chineseProvinces)
          logInfo('fetched data:', fetchedGeoJsonData)
          geoJsonData.value = fetchedGeoJsonData;
          break
        default:
          break
      }
      mapsLoading.value = false;
      
    } catch (err) {
      logError('err', err)
    }
  }

  // Init the map and fetch the data:
  initMap()
  fetchData()
})

// Destroy map if unmounted:
onUnmounted(() => {
  if (mapInstance.value) {
    mapInstance.value.remove()
  }
})
</script>

<style scoped>
#leaflet-map {
  height: 100%;
  width: 100%;
}
</style>
