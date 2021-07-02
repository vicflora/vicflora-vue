<template>
  <img :src="src" alt="map" />
</template>

<script>
export default {
  props: {
    regions: {
      type: Array,
      required: true
    }
  },
  computed: {
    src: function() {
      const base_url = "https://data.rbg.vic.gov.au/geoserver/vicflora/wms?service=WMS&version=1.1.0&request=GetMap&layers=vicflora:vic_boundaries,vicflora:vicflora_bioregion&styles=polygon,red_polygon&bbox=140.96179,-39.19847,149.97651,-33.98057&width=480&height=278&srs=EPSG:4326&format=image%2Fsvg"
      const regionString = this.regions.map(reg => "'" + reg + "'").join(',')
      const cqlFilter = `INCLUDE;sub_name_7 IN (${regionString})`
      return `${base_url}&cql_filter=${encodeURI(cqlFilter)}`
    }
  }
}
</script>