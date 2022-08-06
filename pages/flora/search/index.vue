<template>
  <BContainer class="m-search">
    <BRow>
      <BCol class="text-left">
        <div class="page-header">
          <h1>
            Search
          </h1>
        </div>
      </BCol>
    </BRow>

    <BRow v-if="search">
      <BCol
        lg="4"
        cols="12"
        class="text-left"
      >
        <div class="m-row">
          <SearchInput/>
        </div>
        <div class="m-row mt-3">
          <SearchExcludeHigherTaxa/>
        </div>

        <!-- Query -->
        <SearchApplied :q="q" :fq="fq"/>
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

  </BContainer>
</template>

<script>
const SearchInput = () => import("@/components/Search/SearchInput")
const SearchExcludeHigherTaxa = () => import("@/components/Search/SearchExcludeHigherTaxa")
const SearchApplied = () => import("@/components/Search/SearchApplied")
const SearchFilters = () => import("@/components/Search/SearchFilters")
const SearchResult = () => import("@/components/Search/SearchResult")
import { searchMixin, searchWatchMixin } from "@/mixins/searchMixins"
import SearchQuery from "@/graphql/queries/search.gql"

export default {
  name: "Search",
  components: {
    SearchExcludeHigherTaxa,
    SearchInput,
    SearchApplied,
    SearchFilters,
    SearchResult
  },
  mixins: [searchMixin, searchWatchMixin],
  head() {
    return {
      title: 'VicFlora – Search',
    }
  },
  data() {
    return {
      input: {
        q: "*",
        rows: 50,
        fq: [],
        page: 1,
        facetLimit: 20,
        facetField: [],
      }
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
          this.$store.dispatch('storeSearchParams', this.input)
        }
      },
      skip: true
    }
  },
  watch: {
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
    },
  },
  created() {

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
    $nuxt.$emit('progress-bar-start')

    if (window.innerWidth < 992) {
      this.filtersFacet = false
    }
    this.input.fq = this.fq
    this.input.page = "page" in this.$route.query
        && this.$route.query.page !== undefined
        ? parseInt(this.$route.query.page) : 1
  },
  methods: {
    onPageChange: function(pageNum) {
      this.input = {
        ...this.input,
        page: parseInt(pageNum)
      }
    }
  },
}
</script>
