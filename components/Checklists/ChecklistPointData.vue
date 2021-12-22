<template>
  <BCol>
    <div
      class="accordion"
      role="tablist"
    >
      <b-card
        no-body
        class="mb-1"
      >
        <b-card-header
          header-tag="header"
          class="p-1"
          role="tab"
        >
          <b-button
            block
            v-b-toggle.accordion-1
            :variant="visibleLayer=='Parks and Reserves' ? 'primary' : 'light'"
          >
            Parks or reserves
          </b-button>
        </b-card-header>
        <b-collapse
          id="accordion-1"
          :visible="visibleLayer=='Parks and Reserves'"
          accordion="checklist-layer-accordion"
          role="tabpanel"
          @shown="setVisibleLayer('Parks and Reserves')"
        >
          <b-card-body>
            <b-card-text>
              <table
                v-if="pointData" class="table table-sm">
                <tbody>
                  <tr
                    v-for="item in pointData.parksOrReserves"
                    :key="item.id"
                  >
                    <td>
                      <a href="#" @click.stop="setSearchTerm('park_or_reserve', item.properties.name)">{{ item.properties.name }}</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </b-card-text>
          </b-card-body>
        </b-collapse>
      </b-card>

      <b-card
        no-body
        class="mb-1"
      >
        <b-card-header
          header-tag="header"
          class="p-1"
          role="tab"
        >
          <b-button
            block
            v-b-toggle.accordion-2
            :variant="visibleLayer=='Bioregions' ? 'primary' : 'light'"
          >
            Bioregions
          </b-button>
        </b-card-header>
        <b-collapse
          id="accordion-2"
          :visible="visibleLayer=='Bioregions'"
          accordion="checklist-layer-accordion"
          role="tabpanel"
          @shown="setVisibleLayer('Bioregions')"
        >
          <b-card-body>
            <b-card-text>
              <table
                v-if="pointData"
                class="table table-sm"
              >
                <tbody>
                  <tr
                    v-for="item in pointData.bioregions"
                    :key="item.id"
                  >
                    <td><a href="#" @click.stop="setSearchTerm('bioregion', item.properties.name)">{{ item.properties.name }} ({{ item.properties.code }})</a></td>
                  </tr>
                </tbody>
              </table>
            </b-card-text>
          </b-card-body>
        </b-collapse>
      </b-card>

      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button
            block
            v-b-toggle.accordion-3
            :variant="visibleLayer=='Local Government Areas' ? 'primary' : 'light'"
          >Local Government Areas</b-button>
        </b-card-header>
        <b-collapse
          id="accordion-3"
          :visible="visibleLayer=='Local Government Areas'"
          accordion="checklist-layer-accordion"
          role="tabpanel"
          @shown="setVisibleLayer('Local Government Areas')"
        >
          <b-card-body>
            <b-card-text>
              <table v-if="pointData" class="table table-sm">
                <tbody>
                  <tr v-for="item in pointData.localGovernmentAreas" :key="item.id">
                    <td><a href="#" @click.stop="setSearchTerm('local_government_area', item.properties.name)">{{ item.properties.name }}</a></td>
                  </tr>
                </tbody>
              </table>
            </b-card-text>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>
  </BCol>
</template>

<script>
export default {
  name: "ChecklistPointData",
  props: {
    layer: {
      type: String,
      default: 'Parks and Reserves'
    },
    pointData: {
      type: [Array, Object],
      required: false,
    },
  },
  data() {
    return {
      visibleLayer: "Parks and Reserves"
    }
  },
  mounted() {
    if ('q' in this.$route.query
        && this.$route.query !== undefined
        && this.$route.query !== '-*:*') {
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
        case 'park_or_reserve':
          layer = 'Parks and Reserves'
          break
      }
      this.visibleLayer = layer
    }
  },
  methods: {
    setVisibleLayer(layer) {
      if (this.visibleLayer !== layer) {
        this.visibleLayer = layer
        $nuxt.$emit('visible-layer', layer)
      }
    },
    setSearchTerm(field, value) {
      $nuxt.$emit('search-term', {
        q: `${field}:"${value}"`,
        area: value
      })
    }
  }
}
</script>
