<template>
  <BContainer class="m-search">
    <BRow>
      <BCol class="text-left">
        <div class="m-main-title">
          <h2>
            Search
          </h2>
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
import SearchInput from "@/components/Search/SearchInput"
import SearchExcludeHigherTaxa from "@/components/Search/SearchExcludeHigherTaxa"
import SearchApplied from "@/components/Search/SearchApplied"
import SearchFilters from "@/components/Search/SearchFilters"
import SearchResult from "@/components/Search/SearchResult"
import { searchMixin, searchWatchMixin } from "@/mixins/searchMixins"
import SearchQuery from "@/graphql/queries/search.gql"
import { FACET_FIELDS } from "@/constants/facet-fields"

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
  data() {
    return {
      input: {
        q: "*",
        rows: 50,
        fq: [],
        page: 1,
        facetLimit: 20,
        facetField: FACET_FIELDS,
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
          input: this.input
        })
      }
    },
  },
  created() {
    this.$apollo.queries.search.setVariables({
      input: this.input
    })
    this.$apollo.queries.search.skip = false
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
