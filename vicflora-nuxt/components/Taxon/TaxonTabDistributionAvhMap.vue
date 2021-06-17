<template>
  <div class="m-map">
    <client-only>
      <l-map 
        :zoom="zoom"
        :center="center"
        :options="mapOptions"
      >
        <l-tile-layer
          :url="tileLayer.url"
          :attribution="tileLayer.attribution"
        />

        <l-wms-tile-layer
          :base-url="`${occurrenceLayer.baseUrl}?${queryString}`"
          :visible="occurrenceLayer.visible"
          :name="occurrenceLayer.name"
          :layers="occurrenceLayer.layers"
          :transparent="occurrenceLayer.transparent"
          :service="occurrenceLayer.service"
          :version="occurrenceLayer.version"
          :request="occurrenceLayer.request"
          :srs="occurrenceLayer.srs"
          :format="occurrenceLayer.format"
          :uppercase="occurrenceLayer.uppercase"
          :attribution="occurrenceLayer.attribution"
          layer-type="overlay"
        />

      </l-map>
    </client-only>

  </div>
</template>

<script>
import { tileLayerMixin, alaOccurrenceLayerMixin } from "@/mixins/mapMixins"

export default {
  name: "TaxonTabDistributionAvhMap",
  mixins: [tileLayerMixin, alaOccurrenceLayerMixin],
  props: {
    name: {
      type: String,
      required: true
    },
    rankId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      zoom: 4,
      center: [-26.4, 144.8],
      mapOptions: {
        name: "AVH map"
      },
      tileLayerAttribution: 
        'map data © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, imagery © <a href="https://cartodb.com/attributions">CartoDB</a>'

    }
  },
  computed: {
    q() {
      let field = this.rankId === 220 ? 'species' : 'taxon_name'
      return `${field}:"${this.name}"`
    }
  }
}
</script>

<style lang="scss" scoped>
.m-map {
  height: 650px;
  max-height: 70vh;
  margin-bottom: 20px;
  text-align: left !important;

  .leaflet-grab {
    cursor: auto;
  }
}

</style>