<template>
  <div class="m-map">
    <client-only class="m-map">
      <l-map :zoom="zoom" :center="center">
        <l-control-layers
          position="topright"
        ></l-control-layers>
        <!-- <l-marker v-if="markerLatLng" :lat-lng="markerLatLng">
          <l-popup>
            <ChecklistTable :data="data" :layer="layer"></ChecklistTable>
          </l-popup>
        </l-marker> -->
        <l-tile-layer
          url="https://cartodb-basemaps-b.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
        ></l-tile-layer>

        <l-lwms-tile-layer
          v-for="layer in layers"
          :key="layer.name"
          :base-url="baseUrl"
          :visible="layer.visible"
          :name="layer.name"
          :layers="layer.layers"
          :transparent="layer.transparent"
          :service="layer.service"
          :version="layer.version"
          :request="layer.request"
          :srs="layer.srs"
          :format="layer.format"
          :styles="layer.styles"
          layer-type="base"
        />
      </l-map>
    </client-only>
  </div>
</template>
<script>
export default {
  name: "DistributionMap",
  data() {
    return {
      // layer: "Parks and Reserves",
      // ChecklistMapInfoQuery: null,
      zoom: 7,
      center: [-36.55, 145.20],
      // latitude: 0,
      // longitude: 0,
      layers: [
        {
          name: "Bioregions",
          // baseUrl: "https://data.rbg.vic.gov.au/geoserver/vicflora-mapper/wms",
          service: "WMS",
          version: "1.1.0",
          request: "GetMap",
          visible: true,
          layers: "vicflora-mapper:taxon_bioregions,vicflora-mapper:bioregions",
          srs: "EPSG:4326",
          format: "image/svg",
          styles: "polygon-establishment-means-transparent,",
          transparent: true
        },
        {
          name: "Local Government Areas",
          // baseUrl: "https://data.rbg.vic.gov.au/geoserver/vicflora-mapper/wms",
          service: "WMS",
          version: "1.1.0",
          request: "GetMap",
          visible: false,
          layers: "vicflora-mapper:taxon_local_government_areas,vicflora-mapper:local_government_areas",
          srs: "EPSG:4326",
          format: "image/svg",
          styles: "polygon-establishment-means-transparent,",
          transparent: true
        },
        {
          name: "Parks and Reserves",
          // baseUrl: `https://data.rbg.vic.gov.au/geoserver/vicflora-mapper/wms?cql_filter=taxon_id='0c8e21a6-fe09-4835-84e1-d9531ad24728' AND occurrence_status NOT IN ('doubtful', 'absent')`,
          service: "WMS",
          version: "1.1.0",
          request: "GetMap",
          visible: false,
          layers: "vicflora-mapper:taxon_park_reserves,vicflora-mapper:park_reserves",
          srs: "EPSG:4326",
          format: "image/svg",
          styles: "polygon-establishment-means-transparent,",
          transparent: true
        }
      ],
      // markerLatLng: [0, 0]
    }
  },
  computed: {
    cqlFilter: function() {
      return `taxon_concept_id='${this.$route.params.id}' AND occurrence_status NOT IN ('doubtful', 'absent');INCLUDE`
    },
    baseUrl: function() {
      return `https://data.rbg.vic.gov.au/geoserver/vicflora-mapper/wms?cql_filter=${this.cqlFilter}`
    }
  }
}
</script>

<style lang="scss" scoped>
.m-map {
  height: 650px;
  margin-bottom:20px;
}
</style>
