<template>
  <div v-html="imageMap"/>
</template>

<script>
import axios from "axios"

export default {
  name: "BioregionsImageMap",
  props: {
    params: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      defaultParams: {
        "service": "WMS",
        "version": "1.1.0",
        "request": "GetMap",
        "layers": "vicflora-mapper:bioregions",
        "styles": "vicflora-mapper:bioregions-image-map",
        "bbox": "140.8,-39.3,150.2,-33.8",
        "width": "600",
        "height": "361",
        "srs": "EPSG:4326",
        "format": "text/html",
      },
      imageMap: null,
    }
  },
  mounted() {
    let params = this.defaultParams
    if (this.params) {
      params = Object.assign({}, params, this.params)
    }

    let queryString = Object.keys(params)
        .map(key => `${key}=${encodeURI(params[key])}`)
        .join('&')

    axios.get(process.env.geoserverWms + '?' + queryString)
        .then(response => (this.imageMap = response.data))
  }


};
</script>
