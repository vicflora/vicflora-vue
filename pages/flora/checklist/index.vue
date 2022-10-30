<template>
  <div class="vf-checklist-page">
    <b-container>
      <b-row class="mb-2">
        <b-col class="text-left">
          <div class="page-header">
            <h1 v-if="checklistArea && checklistArea!='*'">Checklist: {{ checklistArea }}</h1>
            <h1 v-else>Checklists</h1>
          </div>

          <div class="intro">
            <NuxtContent :document="intro"/>
          </div>
        </b-col>
      </b-row>

      <BRow>
        <ChecklistAccordion
          :layer="layer"
          :pointData="pointData"
        />

        <ChecklistMap
          :providedVisibleLayer="layer"
          :providedArea="selectedArea"
        />

      </BRow>


      <BRow v-if="$route.query.q && data && data.search.docs.length" class="checklist-search-result">
        <BCol
          lg="4"
          cols="12"
          class="text-left"
        >
          <!-- Query -->
          <SearchApplied 
            :q="data.search.meta.params.q" 
            :fq="data.search.meta.params.fq || []"
            :queryTermDeleteOption="false"
          />
          <!-- Filters -->
          <SearchFilters :data="data"/>

        </BCol>

        <client-only>
          <SearchResult :data="data"/>
        </client-only>

      </BRow>

      <b-row class="checklist-source">
        <b-col>
          <b-button 
            v-b-toggle="'attribution'" 
            variant="primary"
            size="sm"
          >
            Attribution
            <span class="when-open"><b-icon-caret-down-fill></b-icon-caret-down-fill></span>
            <span class="when-closed"><b-icon-caret-right-fill></b-icon-caret-right-fill></span>
          </b-button>

          <b-collapse id="attribution">
            <div>&nbsp;</div>
            <NuxtContent :document="attribution"/>
          </b-collapse>
        </b-col>
      </b-row>

    </b-container>
  </div>
</template>

<script>
import 'leaflet/dist/leaflet.css'
const ChecklistMap = () => import("@/components/Checklists/ChecklistMap")
const ChecklistAccordion = () => import("@/components/Checklists/ChecklistAccordion")
const SearchApplied = () => import("@/components/Search/SearchApplied")
const SearchFilters = () => import("@/components/Search/SearchFilters")
const SearchResult = () => import("@/components/Search/SearchResult")
import { searchMixin, searchWatchMixin } from "@/mixins/searchMixins"
import { selectedAreaMixin } from "@/mixins/checklistMixins"
import ChecklistMapInfoQuery from "@/graphql/queries/checklists"
import SearchQuery from "@/graphql/queries/search"

export default {
  name: "CheckList",
  components: {
    ChecklistMap,
    ChecklistAccordion,
    SearchApplied,
    SearchFilters,
    SearchResult,
  },
  mixins: [searchMixin, searchWatchMixin, selectedAreaMixin],
  async asyncData({ $content }) {
    const intro = await $content('checklists/index').fetch()
    const attribution = await $content('checklists/attribution').fetch()
    return { intro, attribution }
  },
  head() {
    return {
      title: 'VicFlora – Checklist',
    }
  },
  data() {
    return {
      checklistArea: null,
      input: {
        q: "*",
        rows: 50,
        fq: [],
        page: 1,
        facetLimit: 20
      },
      data: null,
      pointData: null,
      layer: "Parks and Reserves",
      selectedArea: {
        baseUrl: null,
        layers: null
      }
    }
  },
  apollo: {
    pointData: {
      query: ChecklistMapInfoQuery,
      result({ data, loading }) {
        if (!loading) {
          this.pointData = data
          let q = '-*:*'
          if (this.layer == 'Bioregions' && data.bioregions.length) {
            q = `bioregion:"${data.bioregions[0].properties.name}"`
          }
          if (this.layer == 'Local Government Areas' && data.localGovernmentAreas.length) {
            q = `local_government_area:"${data.localGovernmentAreas[0].properties.name}"`
          }
          if (this.layer == 'Parks and Reserves' && data.parksOrReserves.length) {
            q = `park_or_reserve:"${data.parksOrReserves[0].properties.name}"`
          }
          if (this.layer == 'Registered Aboriginal Parties' && data.registeredAboriginalParties.length) {
            q = `registered_aboriginal_party:"${data.registeredAboriginalParties[0].properties.name}"`
          }
          this.$router.push({
            query: {
              ...this.$route.query,
              q: q,
              fq: [],
              page: 1
            }
          })
        }
      },
      update(data) {
        this.areas = data
      },
      skip: true,
    },
    search: {
      query: SearchQuery,
      result ({ data, loading }) {
        if (loading) {
          $nuxt.$emit('progress-bar-start')
        }
        else {
          $nuxt.$emit('progress-bar-stop')
          this.data = data
        }
      },
      skip: true
    }
  },
  watch: {
    '$route.query.q': {
      handler(q) {
        if (q && q != '-*:*') {
          this.checklistArea = q.substring(q.indexOf(':')+1).replace(/"/g, '')
          this.setSelectedArea()
        }
      },
      deep: true,
      immediate: true,
    },
    selectedArea: {
      handler() {
        $nuxt.$emit('selected-area-set', this.selectedArea)
      },
      deep: true,
    },
    '$route': {
      deep: true,
      immediate: true,
      handler() {
        this.input = {
          q: this.$route.query.q ? this.$route.query.q : "*",
          rows: 50,
          fq: this.$route.query.fq ? this.$route.query.fq : [],
          page: this.$route.query.page ? parseInt(this.$route.query.page) : 1,
          facetLimit: 20,
          facetField: [],
        }
      }
    },
    input: {
      deep: true,
      handler: function() {
        this.$apollo.queries.search.refetch({
          input: {
            ...this.input,
            facetField: this.$store.getters['search/getSelectedFilterFields']
          }
        })
      }
    }
  },
  created() {
    this.$apollo.queries.search.setVariables({
      input: {
        ...this.input,
        facetField: this.$store.getters['search/getSelectedFilterFields']
      }
    })
    this.$apollo.queries.search.skip = false

    this.$nuxt.$on('visible-layer', layer => {
      this.setVisibleLayer(layer)
    })

    this.$nuxt.$on('map-clicked', latlng => {
      const variables = {
        latitude: latlng.lat,
        longitude: latlng.lng
      }
      console.log(JSON.stringify(variables, null, 2))
      this.$apollo.queries.pointData.setVariables(variables)
      this.$apollo.queries.pointData.skip = false
    })

    this.$nuxt.$on('search-term', (payload) => {
      this.input.q = payload.q
      this.input.fq = []
      this.input.page = 1
      this.checklistArea = payload.area
      this.$router.push({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          q: payload.q,
          fq: [],
          page: 1
        }
      })
    })

    this.$nuxt.$on('search-filter-config-changed', () => {
      this.$apollo.queries.search.refetch({
        input: {
          ...this.input,
          facetField: this.$store.getters['search/getSelectedFilterFields']
        }
      })
    })
  },
  mounted() {
    if (window.innerWidth < 992) {
      this.filtersFacet = false
    }
    this.input.page = "page" in this.$route.query
        && this.$route.query.page !== undefined
        ? parseInt(this.$route.query.page) : 1

    if ('q' in this.$route.query
        && this.$route.query.q !== undefined
        && this.$route.query.q !== '-*.*') {
      const q = this.$route.query.q
      const field = q.substring(0, q.indexOf(':'))
      switch(field) {
        case 'park_or_reserve':
          this.layer = 'Parks and Reserves'
          break
        case 'bioregion': {
          this.layer = 'Bioregions'
          break
        }
        case 'local_government_area':
          this.layer = 'Local Government Areas'
          break
      }
    }
  },
  beforeDestroy() {
    this.$nuxt.$off('search-term')
    this.$nuxt.$off('map-clicked')
  },
  methods: {
    onPageChange: function(pageNum) {
      this.input = {
        ...this.input,
        page: parseInt(pageNum)
      }
    },
    setVisibleLayer(layer) {
      this.layer = layer
      let field = 'park_or_reserve'
      let value = ''
      if (layer == 'Parks and Reserves') {
        if (this.pointData && this.pointData.parksOrReserves.length) {
          field = 'park_or_reserve'
          value = this.pointData.parksOrReserves[0].properties.name
        }
      }
      if (layer == 'Bioregions') {
        if (this.pointData && this.pointData.bioregions.length) {
          field = 'bioregion'
          value = this.pointData.bioregions[0].properties.name
        }
      }
      if (layer == 'Local Government Areas') {
        if (this.pointData && this.pointData.localGovernmentAreas.length) {
          field = 'local_government_area'
          value = this.pointData.localGovernmentAreas[0].properties.name
        }
      }
      if (value) {
        this.$router.push({
          query: {
            ...this.$route.query,
            q: `${field}:"${value}"`,
            fq: [],
            page: 1
          }
        })
      }
      else {
        this.$router.push({
          query: {
            ...this.$route.query,
            q: '-*:*'
          }
        })
      }
    },
  },
}
</script>

<style lang="scss">
.checklist-search-result, .checklist-source {
  margin-top: 30px;
}
</style>
