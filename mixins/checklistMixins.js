export const visibleLayerMixin = {
  methods: {
    setVisibleLayer() {
      if ('q' in this.$route.query && this.$route.query.q !== undefined) {
        const q = this.$route.query.q
        console.log(q)
        const field = q.substring(0, q.indexOf(':'))
        let layer =''
        switch(field) {
          case 'bioregion':
            layer = 'Bioregions'
            break
          case 'local_government_area':
            layer = 'Local Government Areas'
            break
          default:
            layer = 'Parks and Reserves'
        }
        this.visibleLayer = layer
        this.setSelectedArea()
      }
    },
  },
}

export const selectedAreaMixin = {
  methods: {
    setSelectedArea() {
      if ('q' in this.$route.query && this.$route.query.q !== undefined) {
        let arr = this.$route.query.q.split(':')
        let field = arr[0]
        let area = arr[1].replace(/"/g, '')
        let baseUrl = process.env.geoserverWms
        let layers = 'vicflora-mapper:'

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
          default:
            baseUrl = null
            layers = null
        }
        this.selectedArea = {
          baseUrl: baseUrl,
          layers: layers
        }
      }
    },
  }
}
