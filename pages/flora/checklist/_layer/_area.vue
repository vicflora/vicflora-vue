<template>
  <div class="vf-checklist-page">
    <BContainer>
      <BRow class="mb-2">
        <BCol class="text-left">
          <div class="page-header">
            <h1>Checklist: {{ $route.params.area }}</h1>
          </div>
        </BCol>
      </BRow>
      <BRow>
        <BCol>
          <ChecklistMap
            :providedVisibleLayer="layer"
            :providedArea="selectedArea"
          />
        </BCol>
        <BCol>
          <BButton 
            v-b-toggle="'attribution'" 
            variant="primary"
            size="sm"
          >
            Attribution
            <span class="when-open"><b-icon-caret-down-fill></b-icon-caret-down-fill></span>
            <span class="when-closed"><b-icon-caret-right-fill></b-icon-caret-right-fill></span>
          </BButton>

          <BCollapse id="attribution">
            <div>&nbsp;</div>
            <NuxtContent :document="attribution"/>
          </BCollapse>
        </BCol>

      </BRow>

      <BRow v-if="$route.params.area && data && data.search.docs.length" class="checklist-search-result">
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



    </BContainer>
  </div>
</template>

<script>
import 'leaflet/dist/leaflet.css'
const ChecklistMap = () => import("@/components/Checklists/ChecklistMap")
const SearchApplied = () => import("@/components/Search/SearchApplied")
const SearchFilters = () => import("@/components/Search/SearchFilters")
const SearchResult = () => import("@/components/Search/SearchResult")
import { searchMixin, searchWatchMixin } from "@/mixins/searchMixins"
import { visibleLayerMixin, selectedAreaMixin } from "@/mixins/checklistMixins"
import SearchQuery from "@/graphql/queries/search"


export default {
  name: "AreaChecklist",
  components: {
    ChecklistMap,
    SearchApplied,
    SearchFilters,
    SearchResult,
  },
  mixins: [
    visibleLayerMixin, 
    selectedAreaMixin,
    searchMixin,
    searchWatchMixin,
  ],
  async asyncData( { params, $content }) {

    const { layer } = params

    let path = 'checklists/'
    switch (layer) {
      case 'bioregion':
        path += 'bioregions-layer'
        break
      case 'local-government-area':
        path += 'local-government-areas-layer'
        break
      case 'park-or-reserve':
        path += 'parks-and-reserves-layer'
        break
      case 'registered-aboriginal-party':
        path += 'registered-aboriginal-parties-layer'
        break
    }

    const attribution = await $content(path).fetch()
    
    const { area } = params
    const pageTitle = `VicFlora: Checklist of the flora of ${area}`
    
    const structuredData = {
      "@context": "http://schema.org",
      "@type": "Article",
      headline: pageTitle,
      description: `This checklist of the flora of ${area} is based on 
          occurrence records from the Australasian Virtual Herbarium (AVH) and 
          the Victorian Biodiversity Atlas (VBA). The checklist is dynamically 
          generated every time the page is entered, so is always 
          up-to-date.`.replace(/\s+/g, ' '),
      dateModified: new Date().toJSON().slice(0, 10),
      publisher: {
        '@type': 'Organization',
        name: 'Royal Botanic Gardens Victoria',
        url: 'https://www.rbg.vic.gov.au'
      },
      keywords: [ 'flora', 'checklist', 'Victoria', 'Australia', area ]
    }

    return {
      pageTitle,
      structuredData,
      attribution,
    }
  },
  data() {
    return {
      pageTitle: 'VicFlora: Checklist',
      structuredData: {},
      checklistArea: null,
      layer: "Parks and Reserves",
      selectedArea: {
        baseUrl: null,
        layers: null
      },
      input: {
        q: "*",
        rows: 50,
        fq: [],
        page: 1,
        facetLimit: 20
      },
      data: null,
      attribution: '',
      error: null,
    }
  },
  apollo: {
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
  head() {
    return {
      __dangerouslyDisableSanitizers: ['script'],
      title: this.pageTitle,
      script: [{ innerHTML: JSON.stringify(this.structuredData), type: 'application/ld+json' }],
    }
  },
  watch: {
    '$route': {
      deep: true,
      immediate: true,
      handler() {
        this.input = {
          q: this.getQ(),
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
    this.checklistArea = this.$route.params.area
    this.setVisibleLayer()

    this.$apollo.queries.search.setVariables({
      input: {
        ...this.input,
        facetField: this.$store.getters['search/getSelectedFilterFields']
      }
    })
    this.$apollo.queries.search.skip = false

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
  },
  methods: {
    getQ() {
      let q = '*'
      switch(this.$route.params.layer) {
        case 'park-or-reserve':
          q = `park_or_reserve:"${this.$route.params.area}"`
          break
        case 'bioregion':
          q = `bioregion:"${this.$route.params.area}"`
          break
        case 'local-government-area':
          q = `local_government_area:"${this.$route.params.area}"`
          break
        case 'registered-aboriginal-party':
          q = `registered_aboriginal_party:"${this.$route.params.area}"`
          break
      }
      return q
    }
  }
}
</script>