<template>
  <div class="m-map">
    <client-only class="m-map">
      <l-map
        ref="map"
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
            v-if="!disableMapPopups"
            ref="popup"
            :lat-lng="marker"
            :options="popupOptions"
          >
            <taxon-tab-distribution-map-popup-content
              :occurrences="taxonOccurrencesAtPoint.data"/>
          </l-popup>
        </l-marker>

        <l-tile-layer
          url="https://cartodb-basemaps-b.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
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
import { iconMixin, popupMixin } from "@/mixins/mapMixins"
import "leaflet/dist/leaflet.css"
import TaxonTabDistributionMapPopupContent
    from "@/components/Taxon/TaxonTabDistributionMapPopupContent"
import { taxonOccurrencesAtPointQuery }
    from "@/graphql/queries/taxonOccurrencesAtPointQuery.gql"
import 'leaflet-draw/dist/leaflet.draw.css'

export default {
  name: "TaxonTabEditDistributionMap",
  components: {
    TaxonTabDistributionMapPopupContent
  },
  mixins: [
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
      taxonOccurrencesAtPoint: [],
      disableMapPopups: false,
    }
  },
  computed: {
    cqlFilter: function() {
      return `taxon_concept_id='${this.taxonConceptId}' ` +
          `AND occurrence_status NOT IN ('doubtful', 'absent') ` +
          `AND establishment_means NOT IN ('cultivated')`
    },
    occurrenceLayerUrl: function() {
      return process.env.geoserverWms +
          `?cql_filter=${this.cqlFilter}`
    },
  },
  mounted() {
    this.$emit("layer", this.visibleLayer)

    this.$nextTick(() => {
      const L = this.$L
      const map = this.$refs.map.mapObject

      const drawnCharacters = new L.CharacterGroup().addTo(map)

      const shapeOptions = {
        polylineID: false,
        color: 'gray',
        fillColor: 'gray',
        weight: 2,
        fillOpacity: 0.5,
        lineCap: 'round',
        lineJoin: 'bevel',
        dashArray: '',
        opacity: 1,
      }

      const drawError = {
        color: 'orange',
        timeout: 2000,
        message: '<strong>Not allowed<strong>',
      }

      const drawControl = new L.Control.Draw({
        draw: {
          polyline: false,
          polygon: {
            allowIntersection: false,
            drawError: drawError,
            showArea: true,
            metric: true,
            repeatMode: false,
            shapeOptions: shapeOptions,
          },
          rectangle: {
            allowIntersection: false,
            drawError: drawError,
            showArea: true,
            metric: true,
            repeatMode: false,
            shapeOptions: shapeOptions,
          },
          circle: false,
          marker: false,
          circlemarker: false,
        },
        edit: {
          featureGroup: drawnCharacters,
          remove: true,
        },
      })
      // Add all draw shapes on the map
      map.addControl(drawControl);

      const wktFromGeoJSON = (geojson) => {
        const type = geojson.geometry.type.toUpperCase()
        return type + ' (' +
          geojson.geometry.coordinates.map((ring) => {
            return '(' + ring.map(p => {
              return p[0] + ' ' + p[1]
            }).join(', ') + ')'
          }).join(', ') + ')'
      }

      const getPopupContent = (layer) => {
        let msg = '<div>'
        const geojson = layer.toGeoJSON()
        msg += `<pre style="max-height:150px;overflow-y:auto">${JSON.stringify(geojson.geometry, null, 2)}</pre>`
        const wkt = wktFromGeoJSON(geojson)
        msg += `<p>${wkt}</p>`
        msg += '</div>'
        return msg
      }

      map.on(L.Draw.Event.DRAWSTART, () => {
        this.disableMapPopups = true
      })

      map.on(L.Draw.Event.DRAWSTOP, () => {
        this.disableMapPopups = false
      })

      map.on(L.Draw.Event.CREATED, (event) => {
        const layer = event.layer
        const content = getPopupContent(layer)
        if (content !== null) {
          layer.bindPopup(content)
        }
        layer.addTo(map)
        drawnCharacters.addLayer(layer)
        layer.openPopup()
      })

      map.on(L.Draw.Event.EDITED, (event) => {
        const layers = event.layers
        let content = null
        layers.eachLayer((layer) => {
          content = getPopupContent(layer)
          if (content !== null) {
            layer.setPopupContent(content)
          }
        })
      })
    })
  },
  methods: {
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