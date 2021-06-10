<template>
  <!-- <ApolloQuery
    :query="require('@/graphql/queries/taxonConceptDistributionMap.gql')"
    :variables="{ id }"
  >
    <template v-slot="{ result: { loading, error, data } }">
      <div v-if="loading" class="loading apollo">Loading...</div>

      <div v-else-if="error" class="error apollo">
        An error occurred: {{ error }}
      </div>
      <div v-else-if="data" class="result apollo"> -->


        <div class="m-map">
          <client-only class="m-map">
            <l-map :zoom="zoom" :center="center">
              <l-control-layers position="topright"></l-control-layers>

              <l-tile-layer
                url="https://cartodb-basemaps-b.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
              ></l-tile-layer>

              <!-- <l-polygon :lat-lngs="data.taxonConcept.bioregions.geometry.coordinates" color="green"></l-polygon> -->

              

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

              <!-- occurences layers -->
              <l-lwms-tile-layer
                :base-url="occurrencesUrl"
                :visible="occurrencesLayer.visible"
                :name="occurrencesLayer.name"
                :layers="occurrencesLayer.layers"
                :transparent="occurrencesLayer.transparent"
                :service="occurrencesLayer.service"
                :version="occurrencesLayer.version"
                :request="occurrencesLayer.request"
                :srs="occurrencesLayer.srs"
                :format="occurrencesLayer.format"
              ></l-lwms-tile-layer>
            </l-map>
          </client-only>
        </div>


      <!-- </div>
      <div v-else class="no-result apollo">
        <div class="spinner-border mt-5 mb-1" role="status"></div>
        <h5>Loading...</h5>
      </div>
    </template> 
  </ApolloQuery> -->
</template>
<script>
export default {
  name: "DistributionMap",
  props: ["id"],
  data() {
    return {
      zoom: 7,
      center: [-36.55, 145.2],
      layers: [
        {
          name: "Bioregions",
          // baseUrl: this.baseUrl,
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
          // baseUrl: this.baseUrl,
          service: "WMS",
          version: "1.1.0",
          request: "GetMap",
          visible: false,
          layers:
            "vicflora-mapper:taxon_local_government_areas,vicflora-mapper:local_government_areas",
          srs: "EPSG:4326",
          format: "image/svg",
          styles: "polygon-establishment-means-transparent,",
          transparent: true
        },
        {
          name: "Parks and Reserves",
          // baseUrl: this.baseUrl,
          service: "WMS",
          version: "1.1.0",
          request: "GetMap",
          visible: false,
          layers:
            "vicflora-mapper:taxon_park_reserves,vicflora-mapper:park_reserves",
          srs: "EPSG:4326",
          format: "image/svg",
          styles: "polygon-establishment-means-transparent,",
          transparent: true
        }
      ],
      occurrencesLayer: {
        name: "Occurrences",
        // baseUrl: this.occurrencesUrl,
        service: "WMS",
        version: "1.1.0",
        request: "GetMap",
        visible: true,
        layers: "vicflora-mapper:taxon_occurrences",
        srs: "EPSG:4326",
        format: "image/svg",
        // styles: "polygon-establishment-means-transparent,",
        transparent: false
      }
    };
  },
  computed: {
    cqlFilter: function() {
      return `taxon_concept_id='${this.id}' AND occurrence_status NOT IN ('doubtful', 'absent');INCLUDE`;
    },
    baseUrl: function() {
      return `https://data.rbg.vic.gov.au/geoserver/vicflora-mapper/wms?cql_filter=${this.cqlFilter}`;
    },
    occurrencesCql: function() {
      return `taxon_concept_id='${this.id}' AND occurrence_status NOT IN ('doubtful', 'absent')`;
    },
    occurrencesUrl: function() {
      return `https://data.rbg.vic.gov.au/geoserver/vicflora-mapper/wms?cql_filter=${this.occurrencesCql}`;
    }
  }
};
</script>

<style lang="scss" scoped>
.m-map {
  height: 650px;
  max-height: 70vh;
  margin-bottom: 20px;
  text-align: left !important;
}
.leaflet-control-layers-base:v-deep {
  text-align: left !important;
}
</style>
