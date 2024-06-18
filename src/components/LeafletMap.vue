<template>
  <div
    v-if="mapsLoading"
    style="display: column; flex-direction: row; align-items: center; gap: 4px"
  >
    <v-progress-linear indeterminate></v-progress-linear>
    <p>Loading...</p>
  </div>
  <div>
    <v-table :density="'compact'">
      <thead>
        <tr>
          <th style="width: 120px">Coordinate</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Latitude</td>
          <td>{{ location?.lat ?? 'Unknown' }}</td>
        </tr>
        <tr>
          <td>Longitude</td>
          <td>{{ location?.lng ?? 'Unknown' }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>
  <div :id="mapId"></div>
</template>

<script setup lang="ts">
import 'leaflet/dist/leaflet.css';
import L, { LatLng } from 'leaflet';
import { onMounted, onUnmounted, ref, shallowRef, watch } from 'vue';
import { logInfo, logError } from '../utils/logger';
import { fetchJsonAsync } from '@/utils/serverApi';
import {
  CHINA_GREAT_WALL_DIRECTIONS,
  CHINA_GREAT_WALL_PASSES,
} from '@/data/geojsonsources';
import { TILE_MAP_SRC } from '@/data/tilemapvariants';

const props = defineProps({
  mapOf: {
    type: String,
  },
  startLatLng: {
    type: LatLng,
    default: new LatLng(37, 240),
  },
});

// The component's setup:
const mapId: string = 'leaflet-map';
const mapOptions = shallowRef({
  center: L.latLng(props.startLatLng.lat, props.startLatLng.lng),
  zoom: 7,
  zoomControl: true,
  zoomAnimation: true,
  // maxBounds: L.latLngBounds(
  //   L.latLng(18.91619, -171.791110603),
  //   L.latLng(71.3577635769, -66.96466)
  // ),
  layers: [],
});
const location = ref(null);
const geoJsonData = shallowRef([]);
const mapsLoading = ref(true);
const mapInstance = shallowRef(null);
const layerControlInstance = shallowRef(null);

watch(mapsLoading, async (mapsLoading, prevMapsLoading) => {
  if (!mapInstance.value) return;
  if (mapsLoading) {
    mapInstance.value._handlers.forEach(function (handler) {
      handler.disable();
    });
  } else {
    mapInstance.value._handlers.forEach(function (handler) {
      handler.enable();
    });
  }
});

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
              layer.bindPopup(feature.properties.name);
              layer.on('mouseover', () => {
                layer.openPopup();
              });
              layer.on('mouseout', () => {
                layer.closePopup();
              });
            }
          } else {
            logInfo('Invalid layer:', feature);
          }
        };
        geoJsonData.forEach((geoJson) => {
          // Add to the map:
          const geoJsonLayer = L.geoJSON(geoJson, {
            onEachFeature: onEachFeature,
            style: geoJson.style ?? {},
          }).addTo(mapInstance.value);
          // Add to the layer control:
          layerControlInstance.value.addOverlay(
            geoJsonLayer,
            geoJsonLayer.key ?? 'Feature Layer'
          );
          // Fit the bounds of geojson
          mapInstance.value.fitBounds(geoJsonLayer.getBounds());
        });
      } catch (err) {
        logError(err, err.message);
      }
    }
  }
);

onMounted(() => {
  // Initialize map function:
  const initMap = () => {
    // Create the leaflet map
    const leafletMap = L.map(mapId, mapOptions.value);
    // Create the tile layer and add it to the map:
    const tile = L.tileLayer(TILE_MAP_SRC['openstreetmap_base'].url, {
      minZoom: 1,
      maxZoom: 16,
      attribution: TILE_MAP_SRC['openstreetmap_base'].attribution,
    }).addTo(leafletMap);
    // Create the layer control and add it to the map:
    layerControlInstance.value = L.control
      .layers({
        OpenStreetMap: tile,
      })
      .addTo(leafletMap);
    // Add an event listener to the map:
    leafletMap.on('zoomstart', () => {});
    mapInstance.value = leafletMap;
    location.value = mapInstance.value.getCenter();
    mapInstance.value.on('move', (e) => {
      location.value = mapInstance.value.getCenter();
    });
    // mapInstance.value.on("click", function(e){
    //     new L.Marker([e.latlng.lat, e.latlng.lng]).addTo(mapInstance.value);
    // })
  };
  // Fetch the data
  const fetchData = async () => {
    try {
      const fetchedGeoJsonData = [];
      switch (props.mapOf) {
        case 'bay-area':
          fetchedGeoJsonData.push(
            await fetchJsonAsync(
              'https://data.sfgov.org/resource/wamw-vt4s.geojson'
            )
          );
          geoJsonData.value = fetchedGeoJsonData;
          break;
        case 'new-york':
          fetchedGeoJsonData.push(
            await fetchJsonAsync(
              'https://data.cityofnewyork.us/api/geospatial/tqmj-j8zm?method=export&format=GeoJSON'
            )
          );
          geoJsonData.value = fetchedGeoJsonData;
          break;
        case 'china':
          // .concat(Object.entries(CHINA_GREAT_WALL_PASSES))
          for await (const [key, value] of Object.entries(
            CHINA_GREAT_WALL_DIRECTIONS
          )) {
            const response = await fetch(value);
            const data = await response.json();
            fetchedGeoJsonData.push({
              ...data,
              style: {
                color: '#ff7800',
                __comment: 'all SVG styles allowed',
                'stroke-width': '10',
              },
              key: key,
            });
          }
          const chineseProvinces = await fetch(
            'https://raw.githubusercontent.com/longwosion/geojson-map-china/master/china.json'
          ).then((response) => response.json());
          fetchedGeoJsonData.push(chineseProvinces);
          logInfo('fetched data:', fetchedGeoJsonData);
          geoJsonData.value = fetchedGeoJsonData;
          break;
        default:
          break;
      }
      mapsLoading.value = false;
    } catch (err) {
      logError('err', err);
    }
  };

  // Init the map and fetch the data:
  initMap();
  fetchData();
});

// Destroy map if unmounted:
onUnmounted(() => {
  if (mapInstance.value) {
    mapInstance.value.remove();
  }
});
</script>

<style scoped>
#leaflet-map {
  height: 100%;
  width: 100%;
}
</style>
