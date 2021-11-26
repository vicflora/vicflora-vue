<template>
  <div class="m-map" @click="getLayer">
    <client-only class="m-map">
      <l-map
        :zoom="zoom"
        :center="center"
        @click="getOccurrences"
        :options="mapOptions"
      >
        <l-marker v-if="marker" :lat-lng="marker" ref="marker">
          <l-icon 
            :icon-url="icon.url"
            :icon-size="icon.size" 
            :shadow-size="icon.size"
          />
          <l-popup 
            ref="popup" 
            :lat-lng="marker"
            :options="popupOptions"
          >
            <taxon-tab-distribution-map-popup-content 
              :occurrences="taxonOccurrencesAtPoint.data"/>
          </l-popup>
        </l-marker>
        
        <l-control-layers position="topright"/>

        <l-tile-layer
          url="https://cartodb-basemaps-b.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
        />

        <l-wms-tile-layer
          name="None"
          base-url=""
          layer-type="base"
          :visible="true"
        />

        <l-wms-tile-layer
          v-for="layer in baseLayers"
          :key="layer.name"
          :base-url="baseLayerUrl"
          :visible="layer.visible"
          :name="layer.name"
          :layers="layer.layers"
          :transparent="layer.transparent"
          :opacity="layer.opacity"
          :service="layer.service"
          :version="layer.version"
          :request="layer.request"
          :srs="layer.srs"
          :format="layer.format"
          :styles="layer.styles"
          :attribution="layer.attribution"
          layer-type="base"
        />

        <l-wms-tile-layer
          :base-url="occurrenceLayerUrl"
          :visible="occurrenceLayer.visible"
          :name="occurrenceLayer.name"
          :layers="occurrenceLayer.layers"
          :transparent="occurrenceLayer.transparent"
          :service="occurrenceLayer.service"
          :version="occurrenceLayer.version"
          :request="occurrenceLayer.request"
          :srs="occurrenceLayer.srs"
          :format="occurrenceLayer.format"
          :styles="occurrenceLayer.styles"
          layer-type="overlay"
        />
      </l-map>
    </client-only>
  </div>
</template>

<script>
import { baseLayersMixin, iconMixin, popupMixin } from "@/mixins/mapMixins"
import "leaflet/dist/leaflet.css"
import TaxonTabDistributionMapPopupContent 
    from "@/components/Taxon/TaxonTabDistributionMapPopupContent"
import { taxonOccurrencesAtPointQuery } 
    from "@/graphql/queries/taxonOccurrencesAtPointQuery.gql"

export default {
  name: "DistributionMap",
  components: {
    TaxonTabDistributionMapPopupContent
  },
  mixins: [
    baseLayersMixin, 
    iconMixin,
    popupMixin
  ],
  props: {
    taxonConceptId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      visibleLayer: "None",
      zoom: 7,
      marker: null,
      center: [-36.55, 145.2],
      occurrenceLayer: {
        name: "Occurrences",
        service: "WMS",
        version: "1.1.0",
        request: "GetMap",
        visible: true,
        layers: "vicflora-mapper:taxon_occurrences",
        srs: "EPSG:4326",
        format: "image/png",
        transparent: true,
        styles: "vicflora-mapper:vicflora_point",
      },
      mapOptions: {
        name: "Victoria map"
      },
      taxonOccurrencesAtPoint: []
    }
  },
  computed: {
    cqlFilter: function() {
      return `taxon_concept_id='${this.taxonConceptId}' ` + 
          `AND occurrence_status NOT IN ('doubtful', 'absent') ` +
          `AND establishment_means NOT IN ('cultivated')`
    },
    occurrenceLayerUrl: function() {
      return `http://vicflora.test:65000/geoserver/vicflora-mapper/wms?` +
          `cql_filter=${this.cqlFilter}`
    },
    baseLayerUrl: function() {
      return `http://vicflora.test:65000/geoserver/vicflora-mapper/wms?` +
          `cql_filter=${this.cqlFilter};INCLUDE`
    }
  },
  mounted() {
    this.$emit("layer", this.visibleLayer)
  },
  methods: {
    getLayer(event) {
      if (event.target.labels) {
        if (event.target.labels[0].innerText.trim() !== "Occurrences") {
          this.visibleLayer = event.target.labels[0].innerText.trim()
          this.$emit("layer", this.visibleLayer)
        }
      }
    },
    getOccurrences(event) {
      this.marker = null
      let mapClick = event.latlng
      this.$apollo.addSmartQuery('taxonOccurrencesAtPoint', {
        query: taxonOccurrencesAtPointQuery,
        variables: {
          taxonConceptId: this.taxonConceptId,
          latitude: mapClick.lat,
          longitude: mapClick.lng
        },
        update(data) {
          return data.taxonOccurrencesAtPoint
        },
        result({ data, loading }) {
          if (!loading) {
            if (data.taxonOccurrencesAtPoint.data.length > 0) {
              this.marker = mapClick
              this.openPopup()
            }
          }
        }
      })
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
.leaflet-control-layers-base:v-deep {
  text-align: left !important;
}
.m-popup-detail{
  min-width:250px;
}
</style>
