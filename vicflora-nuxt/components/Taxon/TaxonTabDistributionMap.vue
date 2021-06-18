<template>
  <div class="m-map" @click="getLayer">
    <client-only class="m-map">
      <l-map
        :zoom="zoom"
        :center="center"
        @click="getCoordinate"
        :options="mapOptions"
      >
        <l-marker :lat-lng="markerLatLng">
          <l-popup>
            <!-- <popup-detail :layer="visibleLayer" :taxonConceptId="id" :latitude="-38.0833" :longitude="144.2833"></popup-detail> -->
            <popup-detail :layer="visibleLayer" :taxonConceptId="id" :latitude="markerLatLng[0]" :longitude="markerLatLng[1]" class="m-popup-detail"></popup-detail>
          </l-popup>
        </l-marker>
        <l-control-layers position="topright"></l-control-layers>


        <l-tile-layer
          url="https://cartodb-basemaps-b.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
        ></l-tile-layer>

        <l-wms-tile-layer
          name="None"
          base-url=""
          layer-type="base"
          :visible="true"
        />

        <l-wms-tile-layer
          v-for="layer in baseLayers"
          :key="layer.name"
          :base-url="baseUrl"
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

        <!-- occurences layers -->
        <l-wms-tile-layer
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
          layer-type="overlay"
        />
      </l-map>
    </client-only>
  </div>
</template>

<script>
import { baseLayersMixin } from "@/mixins/mapMixins";
import "leaflet/dist/leaflet.css";
import popupDetail from "@/components/Taxon/TaxonTabDistributionMapPopupDetail"

export default {
  name: "DistributionMap",
  mixins: [baseLayersMixin],
  components:{popupDetail},
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      visibleLayer: "None",
      zoom: 7,
      markerLatLng:[0,0],
      center: [-36.55, 145.2],
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
      },
      mapOptions: {
        name: "Victoria map"
      }
    };
  },
  computed: {
    cqlFilter: function() {
      return `taxon_concept_id='${this.id}' AND occurrence_status NOT IN ('doubtful', 'absent') AND establishment_means NOT IN ('cultivated');INCLUDE`;
    },
    baseUrl: function() {
      return `https://data.rbg.vic.gov.au/geoserver/vicflora-mapper/wms?cql_filter=${this.cqlFilter}`;
    },
    occurrencesCql: function() {
      return `taxon_concept_id='${this.id}' AND occurrence_status NOT IN ('doubtful', 'absent') AND establishment_means NOT IN ('cultivated')`;
    },
    occurrencesUrl: function() {
      return `https://data.rbg.vic.gov.au/geoserver/vicflora-mapper/wms?cql_filter=${this.occurrencesCql}`;
    }
  },
  mounted() {
    this.$emit("layer", this.visibleLayer);
  },
  methods: {
    getLayer(event) {
      if (event.target.labels) {
        // console.log(event.target.labels[0].innerText.trim());
        if (event.target.labels[0].innerText.trim() !== "Occurrences") {
          this.visibleLayer = event.target.labels[0].innerText.trim();
          this.$emit("layer", this.visibleLayer);
        }
      }
    },
    getCoordinate: function(event) {
      //{lat: -34.64620136014536, lng: 141.61376953125003}
      this.addmarker(event.latlng);
      this.latitude = event.latlng.lat;
      this.longitude = event.latlng.lng;
    },
    addmarker: function({ lat, lng }) {
      this.markerLatLng = [lat, lng];
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
