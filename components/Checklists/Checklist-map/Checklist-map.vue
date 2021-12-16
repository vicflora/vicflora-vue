<template>
  <div>
    <b-row>
      <b-col>
        <client-only>
          <l-map
            :zoom="6"
            :center="[-36.155, 144.81]"
            class="m-map"
            @click="getPointData"
          >
            <l-control-layers position="topright"></l-control-layers>
            <l-marker v-if="markerLatLng" :lat-lng="markerLatLng">
              <l-popup>{{ latitude }} {{ longitude }}</l-popup>

            </l-marker>
            <l-tile-layer
              url="https://cartodb-basemaps-b.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
            ></l-tile-layer>

            <l-wms-tile-layer
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
            </l-wms-tile-layer>
          </l-map>
        </client-only>
      </b-col>
      <b-col>
        <ChecklistTable v-if="pointData" :pointData="pointData"></ChecklistTable>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import ChecklistTable from "@/components/Checklists/Checklist-table/Checklist-table"
import ChecklistMapInfoQuery from "@/graphql/queries/checklists"


export default {
  name: "CheckListMap",
  components: {
    ChecklistTable,
  },
  data() {
    return {
      layer: "Parks and Reserves",
      pointData: null,
      latitude: 0,
      longitude: 0,
      layers: [
        {
          name: "Parks and Reserves",
          baseUrl: "http://cygnus.rbg.vic.gov.au:8084/geoserver/vicflora-mapper/wms",
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
          format: "image/png",
          transparent: true,
        },
        {
          name: "Local Government Areas",
          baseUrl: "http://cygnus.rbg.vic.gov.au:8084/geoserver/vicflora-mapper/wms",
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
          format: "image/png",
          transparent: true
        },
        {
          name: "Bioregions",
          baseUrl: "http://cygnus.rbg.vic.gov.au:8084/geoserver/vicflora-mapper/wms",
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
          format: "image/png",
          transparent: true
        }
      ],
      markerLatLng: [0, 0]
    };
  },
  apollo: {
    pointData: {
      query: ChecklistMapInfoQuery,
      result({ data, loading }) {
        if (!loading) {
          this.pointData = data
        }
      },
      update(data) {
        this.pointData = data
      },
      skip: true,
    }
  },
  watch: {},
  methods: {
    getPointData: function(event) {
      this.addmarker(event.latlng)
      this.latitude = event.latlng.lat
      this.longitude = event.latlng.lng

      this.$apollo.queries.pointData.setVariables({ latitude: this.latitude, longitude: this.longitude })
      this.$apollo.queries.pointData.skip = false
    },
    addmarker: function({ lat, lng }) {
      this.markerLatLng = [lat, lng]
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
