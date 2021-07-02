<template>
  <div class="m-map">
    <client-only>
      <l-map 
        :zoom="zoom"
        :center="center"
        :options="mapOptions"
        @click="onMapClick"
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
            <taxon-tab-distribution-avh-map-popup-content 
              :occurrences="occurrences" 
            />
          </l-popup>
        </l-marker>

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
import axios from "axios"
import TaxonTabDistributionAvhMapPopupContent 
    from "@/components/Taxon/TaxonTabDistributionAvhMapPopupContent"
import { tileLayerMixin, alaOccurrenceLayerMixin, iconMixin, popupMixin } 
    from "@/mixins/mapMixins"

export default {
  name: "TaxonTabDistributionAvhMap",
  components: {
    TaxonTabDistributionAvhMapPopupContent
  },
  mixins: [
    tileLayerMixin, 
    alaOccurrenceLayerMixin, 
    iconMixin,
    popupMixin 
  ],
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
      center: [-26.4, 136.0],
      mapOptions: {
        name: "AVH map"
      },
      tileLayerAttribution: 
        'map data © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, imagery © <a href="https://cartodb.com/attributions">CartoDB</a>',
      searchUrl: 'https://biocache.ala.org.au/ws/occurrences/search',
      mapClickLatLng: [],
      occurrences: [],
      marker: null,
      fl: [
        'id',
        'catalogue_number',
        'collector',
        'record_number',
        'occurrence_date',
        'raw_taxon_name'
      ]

    }
  },
  computed: {
    q() {
      let field = this.rankId === 220 ? 'species' : 'taxon_name'
      return `${field}:"${this.name}"`
    }
  },
  methods: {
    onMapClick(e) {
      console.log(e.latlng)
      this.marker = null
      this.occurrences = []
      this.mapClickLatLng = e.latlng
      axios.get(this.searchUrl, {
        params: {
          q: this.q,
          qc: this.qc,
          lat: this.mapClickLatLng.lat,
          lon: this.mapClickLatLng.lng,
          radius: 25,
          fl: this.fl.join(',')
        }
      }).then(({ data }) => {
        if (data.occurrences !== undefined && data.occurrences.length > 0) {
          this.occurrences = data.occurrences
          this.marker = this.mapClickLatLng
          this.openPopup()
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

</style>