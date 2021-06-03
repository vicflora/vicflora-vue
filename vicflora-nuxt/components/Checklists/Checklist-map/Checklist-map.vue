<style scoped>
@import "./Checklist-map.scss";
</style>
<template>
  <ApolloQuery
    :query="require('@/graphql/queries/checklists.gql')"
    :variables="{ latitude, longitude }"
  >
    <template v-slot="{ result: { loading, error, data } }">
      <!-- Loading -->
      <div v-if="loading" class="loading apollo">Loading...</div>

      <!-- Error -->
      <div v-else-if="error" class="error apollo">An error occurred</div>

      <!-- Result -->
      <div v-else-if="data" class="result apollo">
        <b-row class="mb-2 text-left">
          <b-col class="text-left" md="7">
            <div id="map-wrap" @click="getLayer">
              <client-only>
                <l-map
                  :zoom="6"
                  :center="[-36.155, 144.81]"
                  class="m-map"
                  @click="getCoordinate"
                >
                  <l-control-layers position="topright"></l-control-layers>
                  <l-marker v-if="markerLatLng" :lat-lng="markerLatLng">
                    <l-popup>
                      <ChecklistTable
                        :data="data"
                        :layer="layer"
                      ></ChecklistTable>
                    </l-popup>
                  </l-marker>
                  <l-tile-layer
                    url="https://cartodb-basemaps-b.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
                  ></l-tile-layer>

                  <l-lwms-tile-layer
                    v-for="layer in layers"
                    :key="layer.name"
                    :base-url="layer.baseUrl"
                    :visible="layer.visible"
                    :name="layer.name"
                    :layers="layer.layers"
                    :transparent="layer.transparent"
                    :service="layer.service"
                    :version="layer.version"
                    :request="layer.request"
                    :bbox="layer.bbox"
                    :srs="layer.srs"
                    :format="layer.format"
                    layer-type="base"
                  >
                  </l-lwms-tile-layer>
                </l-map>
              </client-only>
            </div>
          </b-col>
          <!-- table -->
          <b-col v-if="latitude !== 0">
            <ChecklistTable :data="data" :layer="layer"></ChecklistTable>
          </b-col>
        </b-row>
      </div>
      <!-- No result -->
      <div v-else class="no-result apollo">
        <div class="spinner-border mt-5 mb-1" role="status"></div>
        <h5>Loading...</h5>
      </div>
    </template>
  </ApolloQuery>
</template>
<script>
import ChecklistTable from "@/components/Checklists/Checklist-table/Checklist-table";
export default {
  name: "CheckListMap",
  components: {
    ChecklistTable
  },
  data() {
    return {
      layer: "Parks and Reserves",
      ChecklistMapInfoQuery: null,
      latitude: 0,
      longitude: 0,
      layers: [
        {
          name: "Parks and Reserves",
          baseUrl: "https://data.rbg.vic.gov.au/geoserver/vicflora-mapper/wms",
          service: "WMS",
          version: "1.1.0",
          request: "GetMap",
          visible: true,
          layers: "vicflora-mapper:park_reserves",
          bbox: [
            140.962408733333,
            -39.2359698999998,
            149.975009666667,
            -33.981389858333
          ],
          srs: "EPSG:4326",
          format: "image/svg",
          transparent: true,
        },
        {
          name: "Local Government Areas",
          baseUrl: "https://data.rbg.vic.gov.au/geoserver/vicflora-mapper/wms",
          service: "WMS",
          version: "1.1.0",
          request: "GetMap",
          visible: false,
          layers: "vicflora-mapper:local_government_areas",
          bbox: [
            140.962408733333,
            -39.2359698999998,
            149.975009666667,
            -33.981389858333
          ],
          srs: "EPSG:4326",
          format: "image/svg",
          transparent: true
        },
        {
          name: "Bioregions",
          baseUrl: "https://data.rbg.vic.gov.au/geoserver/vicflora-mapper/wms",
          service: "WMS",
          version: "1.1.0",
          request: "GetMap",
          visible: false,
          layers: "vicflora-mapper:bioregions",
          bbox: [
            140.962408733333,
            -39.2359698999998,
            149.975009666667,
            -33.981389858333
          ],
          srs: "EPSG:4326",
          format: "image/svg",
          transparent: true
        }
      ],
      markerLatLng: [0, 0]
    };
  },
  watch: {},
  methods: {
    getCoordinate: function(event) {
      //{lat: -34.64620136014536, lng: 141.61376953125003}
      this.addmarker(event.latlng);
      this.latitude = event.latlng.lat;
      this.longitude = event.latlng.lng;
    },
    addmarker: function({ lat, lng }) {
      this.markerLatLng = [lat, lng];
    },
    getLayer(event) {
      if (event.target.labels) {
        // console.log(event.target.labels[0].innerText.trim());
        this.layer = event.target.labels[0].innerText.trim();
      }
    }
  }
};
</script>
