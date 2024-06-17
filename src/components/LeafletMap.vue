<template>
  <div :id="mapId"></div>
</template>

<script setup lang="ts">
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { logInfo, logError } from '../utils/logger'

// The component's name:
// The component's setup:
const mapId: string = 'leaflet-map'
const mapOptions = ref({
  center: L.latLng(51.505, -0.09),
  zoom: 13,
  zoomControl: true,
  zoomAnimation: true,
  // maxBounds: L.latLngBounds(
  //   L.latLng(18.91619, -171.791110603),
  //   L.latLng(71.3577635769, -66.96466)
  // ),
  layers: []
})
const geoJsonData = ref(null)
const mapInstance = ref(null)
const layerControlInstance = ref(null)

watch(
  geoJsonData,
  // Watch the geojsonData var for changes:
  async (geoJsonData, prevGeoJsonData) => {
    console.log('testomundo', geoJsonData)
    if (geoJsonData) {
      try {
        // Add to the map:
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
        const geoJsonLayer = L.geoJSON(geoJsonData, {
          onEachFeature: onEachFeature
        }).addTo(mapInstance.value)
        // Add to the layer control:
        layerControlInstance.value.addOverlay(geoJsonLayer, 'Maryland geoJSON Layer')
        // Fit the bounds of geojson
        mapInstance.value.fitBounds(geoJsonLayer.getBounds())
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
    const tile = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      minZoom: 1,
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(leafletMap)
    // Create the layer control and add it to the map:
    layerControlInstance.value = L.control
      .layers({
        OpenStreetMap: tile
      })
      .addTo(leafletMap)
    // Add an event listener to the map:
    leafletMap.on('zoomstart', () => {
      logInfo('ZOOM STARTED')
    })
    mapInstance.value = leafletMap
  }
  // Fetch the data
  const fetchData = async () => {
    const url =
      'https://data.cityofnewyork.us/api/geospatial/tqmj-j8zm?method=export&format=GeoJSON'
    try {
      const response = await fetch(url)
      const data = await response.json()
      logInfo(data)
      const nycBoroughData = (geoJsonData.value = data)
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
