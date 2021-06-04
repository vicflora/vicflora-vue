<template>
  <div class="m-map">
    <client-only class="m-map">
      <l-map :zoom="7" :center="[-36.155, 144.81]">
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
          layer-type="base"
        >
        </l-lwms-tile-layer>
      </l-map>
    </client-only>
  </div>
</template>
<script>
export default {
  name: "DistributionMap",
  data() {
    return {
      layer: "Parks and Reserves",
      ChecklistMapInfoQuery: null,
      latitude: 0,
      longitude: 0,
      layers: [
        {
          name: "Parks and Reserves",
          // baseUrl: `https://data.rbg.vic.gov.au/geoserver/vicflora-mapper/wms?cql_filter=taxon_id='0c8e21a6-fe09-4835-84e1-d9531ad24728' AND occurrence_status NOT IN ('doubtful', 'absent')`,
          service: "WMS",
          version: "1.1.0",
          request: "GetMap",
          visible: true,
          layers: "vicflora-mapper:taxon_distribution_park_reserves",
          srs: "EPSG:4326",
          format: "image/svg",
          transparent: true
        },
        {
          name: "Local Government Areas",
          // baseUrl: "https://data.rbg.vic.gov.au/geoserver/vicflora-mapper/wms",
          service: "WMS",
          version: "1.1.0",
          request: "GetMap",
          visible: false,
          layers: "vicflora-mapper:taxon_distribution_local_government_areas",
          srs: "EPSG:4326",
          format: "image/svg",
          transparent: true
        },
        {
          name: "Bioregions",
          // baseUrl: "https://data.rbg.vic.gov.au/geoserver/vicflora-mapper/wms",
          service: "WMS",
          version: "1.1.0",
          request: "GetMap",
          visible: false,
          layers: " vicflora-mapper:taxon_distribution_bioregions",
          srs: "EPSG:4326",
          format: "image/svg",
          transparent: true
        }
      ],
      markerLatLng: [0, 0]
    };
  },
  computed: {
    baseUrl: function() {
        return `https://data.rbg.vic.gov.au/geoserver/vicflora-mapper/wms?cql_filter=taxon_id='${this.$route.params.id}' AND occurrence_status NOT IN ('doubtful', 'absent')`;
      }
  }
};
</script>

<style lang="scss" scoped>
.m-map {
  height: 500px;
  margin-bottom:20px;
}
</style>
