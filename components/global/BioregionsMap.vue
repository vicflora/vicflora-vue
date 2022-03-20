<!--
 Copyright 2022 Royal Botanic Gardens Board
 
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
 
     http://www.apache.org/licenses/LICENSE-2.0
 
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
-->

<template>
  <figure>
    <img
      class="img-responsive"
      :src="url"
      alt="Bioregions of Victoria"
      usemap="#bioregions"
    />
  </figure>
</template>

<script>
export default {
  name: 'BioregionsMap',
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
        "layers": "vicflora-mapper:bioregions,vicflora-mapper:victoria_outline",
        "styles": "vicflora-mapper:victoria-bioregions,",
        "bbox": "140.8,-39.3,150.2,-33.8",
        "width": "600",
        "height": "361",
        "srs": "EPSG:4326",
        "format": "image/png",
      },
    }
  },
  computed: {
    url() {
      let params = this.defaultParams
      if (this.params) {
        params = Object.assign({}, params, this.params)
      }
      let queryString = Object.keys(params)
          .map(key => `${key}=${encodeURI(params[key])}`)
          .join('&')
      return process.env.geoserverWms + '?' + queryString
    }
  }
}
</script>