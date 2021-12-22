<template>
  <div class="m-checklist">
    <b-container>
      <b-row class="mb-2">
        <b-col class="text-left">
          <div class="page-header">
            <h2 v-if="checklistArea && checklistArea!='*'">Checklist: {{ checklistArea }}</h2>
            <h2 v-else>Checklists</h2>
          </div>
          <p>
            Create your own checklist for any Victorian park or reserve in the
            <a href="https://www.environment.gov.au/land/nrs/science/capad"
              >Collaborative Australian Protected Area Database (CAPAD)
              <b-icon icon="box-arrow-up-right"></b-icon> </a
            >, based on occurrence data from
            <a href="https://avh.chah.org.au/"
              >Australia's Virtual Herbarium (AVH)
              <b-icon icon="box-arrow-up-right"></b-icon
            ></a>
            and the
            <a
              href="https://www.environment.vic.gov.au/biodiversity/victorian-biodiversity-atlas"
              >Victorian Biodiversity Atlas (VBA)
              <b-icon icon="box-arrow-up-right"></b-icon
            ></a>
            and using the taxonomy of VicFlora.
          </p>
          <p>
            Click on a point on the map below and a list of reserves will
            appear. Select a reserve and a checklist of vascular plant taxa
            will be generated below the map.
          </p>
        </b-col>
      </b-row>

      <BRow>
        <ChecklistPointData
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
          <SearchApplied :q="data.search.meta.params.q" :fq="data.search.meta.params.fq || []"/>
          <!-- Filters -->
          <SearchFilters :data="data"/>

        </BCol>

        <client-only>
          <SearchResult
            :data="data"
            @pageChanged="onPageChange"
          />
        </client-only>

      </BRow>

      <b-row class="checklist-source">
        <b-col>
          <h4>Source</h4>
          <ul class="m-ul">
            <li>
              <b>Protected areas: </b
              ><i>Collaborative Australian Protected Areas Database</i> (CAPAD)
              2014, Commonwealth of Australia 2014
            </li>
            <li>
              <b>Occurrence data:</b>
              <ul>
                <li>
                  AVH (2021). <i>Australia’s Virtual Herbarium</i>, Council of
                  Heads of Australasian Herbaria, (<a
                    href="http://avh.chah.org.au"
                    >http://avh.chah.org.au</a
                  >)
                </li>
                <li>
                  <i>Victorian Biodiversity Atlas</i>, © The State of Victoria,
                  Department of Environment and Primary Industries (published
                  Dec. 2014).
                </li>
              </ul>
            </li>
          </ul>
        </b-col>
      </b-row>

    </b-container>
  </div>
</template>

<script>
import 'leaflet/dist/leaflet.css'
import ChecklistMap from "@/components/Checklists/ChecklistMap"
import ChecklistPointData from "@/components/Checklists/ChecklistPointData"
import SearchApplied from "@/components/Search/SearchApplied"
import SearchFilters from "@/components/Search/SearchFilters"
import SearchResult from "@/components/Search/SearchResult"
import { searchMixin, searchWatchMixin } from "@/mixins/searchMixins"
import { selectedAreaMixin } from "@/mixins/checklistMixins"
import ChecklistMapInfoQuery from "@/graphql/queries/checklists"
import SearchQuery from "@/graphql/queries/search.gql"

const facetFields = [
  "name_type",
  "taxonomic_status",
  "taxon_rank",
  "occurrence_status",
  "establishment_means",
  "threat_status",
  "class",
  "order",
  "family",
  "media"
]

export default {
  name: "CheckList",
  components: {
    ChecklistMap,
    ChecklistPointData,
    SearchApplied,
    SearchFilters,
    SearchResult,
  },
  mixins: [searchMixin, searchWatchMixin, selectedAreaMixin],
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
        if (!loading) {
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
    input: {
      deep: true,
      handler: function() {
        this.$apollo.queries.search.refetch({
          input: {
            ...this.input,
            facetField: facetFields
          }
        })
      }
    }
  },
  created() {
    this.$apollo.queries.search.setVariables({
      input: {
        ...this.input,
        facetField: facetFields
      }
    })
    this.$apollo.queries.search.skip = false

    this.$nuxt.$on('visible-layer', layer => {
      this.setVisibleLayer(layer)
    })

    this.$nuxt.$on('map-clicked', latlng => {
      this.$apollo.queries.pointData.setVariables({
        latitude: latlng.lat,
        longitude: latlng.lng
      })
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
