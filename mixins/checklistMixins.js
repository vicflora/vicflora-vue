export const visibleLayerMixin = {
  methods: {
    setVisibleLayer() {
      let field = ''

      if ('layer' in this.$route.params && 
          this.$route.params.layer !== undefined &&
          'area' in this.$route.params && 
          this.$route.params.area !== undefined) {
        field = this.$route.params.layer.replace(/-/g, '_')
      }
      else {
        if ('q' in this.$route.query && this.$route.query.q !== undefined) {
          const q = this.$route.query.q
          field = q.substring(0, q.indexOf(':'))
        }
      }
      let layer =''
      switch(field) {
        case 'bioregion':
          layer = 'Bioregions'
          break
        case 'local_government_area':
          layer = 'Local Government Areas'
          break
        case 'registered_aboriginal_party':
          layer = 'Registered Aboriginal Parties'
          break
        default:
          layer = 'Parks and Reserves'
      }
      this.visibleLayer = layer
      this.setSelectedArea()
    },
  },
}

export const selectedAreaMixin = {
  methods: {
    setSelectedArea() {
      let field = null
      let area = null
      let baseUrl = process.env.geoserverWms
      let layers = 'vicflora-mapper:'

      if ('layer' in this.$route.params && 
          this.$route.params.layer !== undefined &&
          'area' in this.$route.params && 
          this.$route.params.area !== undefined) {
        field = this.$route.params.layer.replace(/-/g, '_')
        area = this.$route.params.area
      }
      else {
        if ('q' in this.$route.query && this.$route.query.q !== undefined) {
          let arr = this.$route.query.q.split(':')
          field = arr[0]
          area = arr[1].replace(/"/g, '')
        }
      }

      switch (field) {
        case 'bioregion':
          baseUrl += `?cql_filter=bioregion%3D%27${area}%27`
          layers += 'bioregions'
          break
        case 'local_government_area':
          baseUrl += `?cql_filter=lga_name%3D%27${area}%27`
          layers += 'local_government_areas'
          break
        case 'park_or_reserve':
          baseUrl += `?cql_filter=name%3D%27${area}%27`
          layers += 'park_reserves'
          break
        case 'registered_aboriginal_party':
            baseUrl += `?cql_filter=name%3D%27${area}%27`
            layers += 'raps'
            break
        default:
          baseUrl = null
          layers = null
      }
      this.selectedArea = {
        baseUrl: baseUrl,
        layers: layers
      }
      this.$nuxt.$emit('selected-area-set', this.selectedArea)
    },
  }
}
