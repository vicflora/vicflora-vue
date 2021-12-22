<template>
  <BRow v-if="search">
    <BCol
      lg="4"
      cols="12"
      class="text-left"
    >
      <!-- Query -->
      <SearchApplied :q="input.q" :fq="input.fq"/>
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
</template>

<script>
import SearchApplied from "@/components/Search/SearchApplied"
import SearchFilters from "@/components/Search/SearchFilters"
import SearchResult from "@/components/Search/SearchResult"
import { searchMixin, searchWatchMixin } from "@/mixins/searchMixins"
import SearchQuery from "@/graphql/queries/search.gql"

export default {
  name: "ChecklistTaxa",
  components: {
    SearchApplied,
    SearchFilters,
    SearchResult
  },
  mixins: [searchMixin, searchWatchMixin],
  data() {
    return {
      input: {
        q: "*",
        rows: 50,
        fq: [],
        page: 1,
        facetLimit: 20
      },
      data: null
    }
  },
  apollo: {
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
  created() {
    this.$nuxt.$on('search-term', (payload) => {
      this.input.q = payload
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
  beforeDestroy() {
    this.$nuxt.$off('search-term')
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
