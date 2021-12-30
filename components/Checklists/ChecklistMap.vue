<template>
  <b-col>
    <client-only>
      <l-map
        :zoom="6"
        :center="[-36.155, 144.81]"
        class="m-map"
        @click="mapClicked"
      >
        <!-- <l-control-layers position="topright"/> -->
        <l-marker v-if="markerLatLng" :lat-lng="markerLatLng">
          <l-popup>{{ latitude }} {{ longitude }}</l-popup>

        </l-marker>
        <l-tile-layer
          url="https://cartodb-basemaps-b.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
        ></l-tile-layer>

        <l-wms-tile-layer
          :key="overlay.name"
          :base-url="baseUrl"
          :name="overlay.name"
          :layers="overlay.layers"
          transparent
          service="WMS"
          version="1.1.0"
          request="GetMap"
          :bbox="[
            140.962408733333,
            -39.2359698999998,
            149.975009666667,
            -33.981389858333
          ]"
          srs="EPSG:4326"
          format="image/png"
          visible
          layer-type="base"
        >
        </l-wms-tile-layer>

        <l-wms-tile-layer
          v-if="selectedArea.baseUrl"
          :key="selectedArea.baseUrl"
          :base-url="selectedArea.baseUrl"
          name="Selected Area"
          :layers="selectedArea.layers"
          transparent
          service="WMS"
          version="1.1.0"
          request="GetMap"
          :bbox="[
            140.962408733333,
            -39.2359698999998,
            149.975009666667,
            -33.981389858333
          ]"
          srs="EPSG:4326"
          format="image/png"
          styles="vicflora-mapper:polygon-red"
          visible
        />
      </l-map>
    </client-only>
  </b-col>
</template>

<script>
import { WMS_SERVICE } from '@/constants/wms-service'
import { visibleLayerMixin, selectedAreaMixin } from "~/mixins/checklistMixins"

export default {
  name: "CheckListMap",
  mixins: [
    visibleLayerMixin,
    selectedAreaMixin
  ],
  props: {
    providedArea: {
      type: Object,
      required: true
    },
    providedVisibleLayer: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      visibleLayer: "Parks and Reserves",
      pointData: null,
      latitude: 0,
      longitude: 0,
      layers: [
        {
          name: "Parks and Reserves",
          layers: "vicflora-mapper:park_reserves",
        },
        {
          name: "Local Government Areas",
          layers: "vicflora-mapper:local_government_areas",
        },
        {
          name: "Bioregions",
          layers: "vicflora-mapper:bioregions",
        }
      ],
      overlay: {
        name: "Parks and Reserves",
        layers: "vicflora-mapper:park_reserves",
      },
      markerLatLng: [0, 0],
      baseUrl: WMS_SERVICE,
      selectedArea: {
        baseUrl: null,
        layers: null,
      },
    }
  },
  watch: {
    '$route.query.q': {
      handler(q) {
        if (q.substring(0, 1) === '-') {
          this.selectedArea.baseUrl = null
          this.selectedArea.layers = null
        }
      }
    },
    visibleLayer: {
      handler(layer) {
        this.setOverlay(layer)
      },
      immediate: true
    }
  },
  created() {
    this.$nuxt.$on('visible-layer', (visibleLayer) => {
      this.visibleLayer = visibleLayer
    })
    this.$nuxt.$on('selected-area-set', (selectedArea) => {
      this.selectedArea.baseUrl = selectedArea.baseUrl,
      this.selectedArea.layers = selectedArea.layers
    })
  },
  mounted() {
    this.setVisibleLayer()
    // this.setSelectedArea()
  },
  beforeDestroy() {
    this.$nuxt.$off('visible-layer')
    this.$nuxt.$off('selected-area-set')
  },
  methods: {
    mapClicked: function(event) {
      this.addmarker(event.latlng)
      this.latitude = event.latlng.lat
      this.longitude = event.latlng.lng
      $nuxt.$emit('map-clicked', event.latlng)
    },
    addmarker: function({ lat, lng }) {
      this.markerLatLng = [lat, lng]
    },
    setOverlay(layer) {
      let overlay = this.layers.filter(item => item.name == layer)[0]
      this.overlay.name = overlay.name
      this.overlay.baseUrl = overlay.baseUrl
      this.overlay.layers = overlay.layers
    },
  },
}
</script>

<style scoped>
.m-map {
  height: 363px;
  width: 635px;
  text-align: left !important;
}

.m-map:hover {
  cursor: pointer;
}

.m-topic {
  font-family: "goodsans-regular";
  margin: 10px 0;
  font-size: medium;
}
.m-table-fontsize {
  font-size: small;
}

.m-popup-topic {
font-family: "goodsans-regular";
  margin-bottom: 10px;
  font-size: x-small;
}

.m-popup-table-fontsize {
    font-size: xx-small;
}

</style>
