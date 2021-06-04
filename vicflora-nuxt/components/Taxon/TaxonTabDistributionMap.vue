<template>
  <div>
    <client-only>
      <l-map
        :zoom="6"
        :center="[-36.155, 144.81]"
        class="m-map"
      >
        <l-control-layers position="topright" style="text-align: start;"></l-control-layers>
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
          :base-url="layer.baseUrl"
          :visible="layer.visible"
          :name="layer.name"
          :layers="layer.layers"
          :transparent="layer.transparent"
          :service="layer.service"
          :version="layer.version"
          :request="layer.request"
          :srs="layer.srs"
          :format="layer.format"
          :bbox="layer.bbox"
          CQL_FILTER="taxon_id='0c8e21a6-fe09-4835-84e1-d9531ad24728' AND occurrence_status NOT IN ('doubtful', 'absent')"
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
          baseUrl: "https://data.rbg.vic.gov.au/geoserver/vicflora-mapper/wms",
          service: "WMS",
          version: "1.1.0",
          request: "GetMap",
          visible: true,
          layers: "vicflora-mapper:taxon_distribution_park_reserves",
          bbox: [
            140.962408733333,
            -39.2359698999998,
            149.975009666667,
            -33.981389858333
          ],
          srs: "EPSG:4326",
          format: "image/svg",
          transparent: true,
          CQL_FILTER:`taxon_id='0c8e21a6-fe09-4835-84e1-d9531ad24728' AND occurrence_status NOT IN ('doubtful', 'absent')`
          
        },
        {
          name: "Local Government Areas",
          baseUrl: "https://data.rbg.vic.gov.au/geoserver/vicflora-mapper/wms",
          service: "WMS",
          version: "1.1.0",
          request: "GetMap",
          visible: false,
          layers: "vicflora-mapper:taxon_distribution_local_government_areas",
          bbox: [
            140.962408733333,
            -39.2359698999998,
            149.975009666667,
            -33.981389858333
          ],
          srs: "EPSG:4326",
          format: "image/svg",
          transparent: true,
          CQL_FILTER: `taxon_id='0c8e21a6-fe09-4835-84e1-d9531ad24728' AND occurrence_status NOT IN ('doubtful', 'absent')`
        },
        {
          name: "Bioregions",
          baseUrl: "https://data.rbg.vic.gov.au/geoserver/vicflora-mapper/wms",
          service: "WMS",
          version: "1.1.0",
          request: "GetMap",
          visible: false,
          layers: " vicflora-mapper:taxon_distribution_bioregions",
          bbox: [
            140.962408733333,
            -39.2359698999998,
            149.975009666667,
            -33.981389858333
          ],
          srs: "EPSG:4326",
          format: "image/svg",
          transparent: true,
          CQL_FILTER: `taxon_id='0c8e21a6-fe09-4835-84e1-d9531ad24728' AND occurrence_status NOT IN ('doubtful', 'absent')`,
        }
      ],
      markerLatLng: [0, 0]
    };
  },
};
</script>

<style lang="scss" scoped>
.m-map {
  height: 363px;
  width:500px;
  margin-bottom:10px;
}
</style>
