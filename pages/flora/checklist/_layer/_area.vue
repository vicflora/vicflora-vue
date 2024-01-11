<script>
import 'leaflet/dist/leaflet.css'
const ChecklistMap = () => import("@/components/Checklists/ChecklistMap")
const SearchApplied = () => import("@/components/Search/SearchApplied")
const SearchFilters = () => import("@/components/Search/SearchFilters")
const SearchResult = () => import("@/components/Search/SearchResult")
import { searchMixin, searchWatchMixin } from "@/mixins/searchMixins"
import { visibleLayerMixin, selectedAreaMixin } from "@/mixins/checklistMixins"
import SearchQuery from "@/graphql/queries/search"
import bioregionBySlugQuery from "@/graphql/queries/bioregionBySlugQuery"
import localGovernmentAreaBySlugQuery from "@/graphql/queries/localGovernmentAreaBySlugQuery"
import parkReserveBySlugQuery from "@/graphql/queries/parkReserveBySlugQuery"
import registeredAboriginalPartyBySlugQuery from "@/graphql/queries/registeredAboriginalPartyBySlugQuery"


export default {
  name: "ChecklistPage",
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
  async asyncData({ app, params, $content }) {
    const client = app.apolloProvider.defaultClient
    const { layer } = params
    let featureQuery = null

    let path = 'checklists/'
    switch (layer) {
      case 'bioregion':
        featureQuery = bioregionBySlugQuery
        path += 'bioregions-layer'
        break
      case 'local-government-area':
        featureQuery = localGovernmentAreaBySlugQuery
        path += 'local-government-areas-layer'
        break
      case 'park-or-reserve':
        featureQuery = parkReserveBySlugQuery
        path += 'parks-and-reserves-layer'
        break
      case 'registered-aboriginal-party':
        featureQuery = registeredAboriginalPartyBySlugQuery
        path += 'registered-aboriginal-parties-layer'
        break
    }

    try {
      const res = await client.query({
        query: featureQuery,
        variables: {
          slug: params.area
        }
      })

      const { feature } = res.data

      let areaName = null
      if ('properties' in feature) {
        areaName = feature.properties.name
      }

      const pageTitle = `VicFlora: Checklist of the flora of ${areaName}`

      const description = `This checklist of the flora of ${areaName} is based 
            on occurrence records from the Australasian Virtual Herbarium (AVH) 
            and the Victorian Biodiversity Atlas (VBA). Records from these data 
            sources are obtained from the Atlas of Living Australia (ALA) every 
            week. Identifications on these records are matched to taxon concepts 
            that are currently accepted in VicFlora every night. The checklist 
            is newly generated every time the page is entered, so is always 
            up-to-date.`
        .replace(/\s+/g, ' ')

      const structuredData = {
        "@context": "http://schema.org",
        "@type": "WebPage",
        headline: pageTitle,
        description: description,
        dateModified: new Date().toJSON().slice(0, 10),
        publisher: {
          '@type': 'Organization',
          name: 'Royal Botanic Gardens Victoria',
          url: 'https://www.rbg.vic.gov.au'
        },
        license: "https://creativecommons.org/licenses/by/4.0/",
        keywords: ['flora', 'checklist', 'Victoria', 'Australia', areaName]
      }

      const attribution = await $content(path).fetch()

      return {
        areaName,
        pageTitle,
        description,
        structuredData,
        attribution,
      }
    }
    catch (error) {
      return error
    }
  },
  data() {
    return {
      pageTitle: 'VicFlora: Checklist',
      description: null,
      areaName: null,
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
      result({ data, loading }) {
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
  computed: {
    formattedDescription() {
      return this.description.replace(this.areaName, `<b>${this.areaName}</b>`)
        .replace('Australasian Virtual Herbarium', '<i>Australasian Virtual Herbarium</i>')
        .replace('Victorian Biodiversity Atlas', '<i>Victorian Biodiversity Atlas</i>')
        .replace('Atlas of Living Australia', '<i>Atlas of Living Australia</i>')
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
      handler: function () {
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
    this.checklistArea = this.areaName
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

    this.$store.dispatch('checklist/storeAreaName', this.areaName)
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
      switch (this.$route.params.layer) {
        case 'park-or-reserve':
          q = `park_or_reserve:"${this.areaName}"`
          break
        case 'bioregion':
          q = `bioregion:"${this.areaName}"`
          break
        case 'local-government-area':
          q = `local_government_area:"${this.areaName}"`
          break
        case 'registered-aboriginal-party':
          q = `registered_aboriginal_party:"${this.areaName}"`
          break
      }
      return q
    }
  }
}
</script>

<template>
  <div class="vf-checklist-page">
    <BContainer>
      <BRow class="mb-2">
        <BCol class="text-left">
          <div class="page-header">
            <h1>Checklist: {{ areaName }}</h1>
          </div>
          <p v-if="formattedDescription !== undefined" v-html="formattedDescription" />
          <p v-else>{{ description }}</p>
        </BCol>
      </BRow>
      <BRow>
        <BCol>
          <ChecklistMap :providedVisibleLayer="layer" :providedArea="selectedArea" />
        </BCol>
        <BCol>
          <BButton v-b-toggle="'attribution'" variant="primary" size="sm">
            Attribution
            <span class="when-open"><b-icon-caret-down-fill></b-icon-caret-down-fill></span>
            <span class="when-closed"><b-icon-caret-right-fill></b-icon-caret-right-fill></span>
          </BButton>

          <BCollapse id="attribution" visible>
            <div>&nbsp;</div>
            <NuxtContent :document="attribution" />
          </BCollapse>
        </BCol>

      </BRow>

      <BRow v-if="$route.params.area && data && data.search.docs.length" class="checklist-search-result">
        <BCol lg="4" cols="12" class="text-left">
          <!-- Query -->
          <SearchApplied :q="data.search.meta.params.q" :fq="data.search.meta.params.fq || []"
            :queryTermDeleteOption="false" />
          <!-- Filters -->
          <SearchFilters :data="data" />

        </BCol>

        <client-only>
          <SearchResult :data="data" />
        </client-only>
      </BRow>



    </BContainer>
  </div>
</template>