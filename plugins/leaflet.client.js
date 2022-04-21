import Vue from 'vue'
import { 
  LCircle,
  LCircleMarker,
  LControl, 
  LControlAttribution, 
  LControlLayers, 
  LControlScale,
  LControlZoom, 
  LFeatureGroup,
  LGeoJson,
  LIcon, 
  LIconDefault, 
  LImageOverlay, 
  LLayerGroup, 
  LMap,
  LMarker, 
  LPolygon,
  LPolyline,
  LPopup, 
  LRectangle,
  LTileLayer, 
  LTooltip, 
  LWMSTileLayer } from 'vue2-leaflet'
import LDraw from 'leaflet-draw'

Vue.component('l-circle', LCircle)
Vue.component('l-circle-marker', LCircleMarker)
Vue.component('l-control', LControl)
Vue.component('l-control-attribution', LControlAttribution)
Vue.component('l-control-layers', LControlLayers)
Vue.component('l-control-scale', LControlScale)
Vue.component('l-control-zoom', LControlZoom)
Vue.component('l-feature-group', LFeatureGroup)
Vue.component('l-geo-json', LGeoJson)
Vue.component('l-icon', LIcon)
Vue.component('l-icon-default', LIconDefault)
Vue.component('l-image-overlay', LImageOverlay)
Vue.component('l-layer-group', LLayerGroup)
Vue.component('l-map', LMap)
Vue.component('l-marker', LMarker)
Vue.component('l-polygon', LPolygon)
Vue.component('l-polyline', LPolyline)
Vue.component('l-popup', LPopup)
Vue.component('l-rectangle', LRectangle)
Vue.component('l-tile-layer', LTileLayer)
Vue.component('l-tooltip', LTooltip)
Vue.component('l-wms-tile-layer', LWMSTileLayer)

// Build icon assets.
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.imagePath = ''
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

const LeafletPlugin = {
  install(Vue, options) {
    // Expose Leaflet
    Vue.prototype.$L = L;
  }
};

Vue.use(LeafletPlugin)

export default async function ({ router, store }) {}
