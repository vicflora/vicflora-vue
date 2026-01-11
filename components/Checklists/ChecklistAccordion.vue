<template>
  <ClientOnly>
    <BCol>
      <div
        class="accordion"
        role="tablist"
      >
        <ChecklistAccordionCard
          v-for="(item, index) in layers"
          :key=index
          :layer="item"
          :index="index"
          :visible="layer === item.name"
          :areas="pointData ? pointData[item.dataField] : []"
        />
      </div>
    </BCol>
  </ClientOnly>
</template>

<script>
const ChecklistAccordionCard = () => import("@/components/Checklists/ChecklistAccordionCard")

export default {
  name: "ChecklistAccordion",
  components: {
    ChecklistAccordionCard,
  },
  props: {
    layer: {
      type: String,
      default: 'Parks and Reserves',
    },
    pointData: {
      type: [Array, Object],
      required: false,
    },
  },
  data() {
    return {
      visibleLayer: "Parks and Reserves",
      layers: [
        {
          name: 'Parks and Reserves',
          dataField: 'parksOrReserves',
          searchField: 'park_or_reserve',
        },
        {
          name: 'Bioregions',
          dataField: 'bioregions',
          searchField: 'bioregion',
        },
        {
          name: 'Local Government Areas',
          dataField: 'localGovernmentAreas',
          searchField: 'local_government_area',
        },
        {
          name: 'Registered Aboriginal Parties',
          dataField: 'registeredAboriginalParties',
          searchField: 'label',
        },
      ],
    }
  },
  created() {
    this.$nuxt.$on('accordion-collapse-shown', layer => {
      this.setVisibleLayer(layer)
    })
    this.$nuxt.$on('accordion-area-clicked', (field, value) => {
      this.setSearchTerm(field, value)
    })
  },
  mounted() {
    if ('q' in this.$route.query
        && this.$route.query !== undefined
        && this.$route.query !== '-*:*') {
      const q = this.$route.query.q
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
        case 'registered_aboriginal_party':
          layer = 'Registered Aboriginal Parties'
          break
      }
      this.visibleLayer = layer
    }
  },
  beforeDestroy() {
    this.$nuxt.$off('accordion-collapse-shown')
    this.$nuxt.$off('accordion-area-clicked')
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
    },
  },
}
</script>