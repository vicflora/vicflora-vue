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
    
    <ApolloQuery
      :query="require('@/graphql/queries/search.gql')"
      :variables="{ input }"
    >
      <template v-slot="{ result: { loading, error, data } }">
        <!-- Loading -->
        <div v-if="loading" class="loading apollo">Loading...</div>

        <!-- Error -->
        <div v-else-if="error" class="error apollo">An error occurred</div>

        <!-- Result -->
        <div v-else-if="data" class="result apollo">

          <BRow>
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
        </div>
        <!-- No result -->
        <div 
          v-else 
          class="no-result apollo"
        >
          <div 
            class="spinner-border mt-5 mb-1" 
            role="status"
          />
          <h5>Loading...</h5>
        </div>
      </template>
    </ApolloQuery>
  </BContainer>
</template>

<script>
import SearchInput from "@/components/Search/SearchInput"
import SearchExcludeHigherTaxa from "@/components/Search/SearchExcludeHigherTaxa"
import SearchApplied from "@/components/Search/SearchApplied"
import SearchFilters from "@/components/Search/SearchFilters"
import SearchResult from "@/components/Search/SearchResult" 

import { searchMixin } from "@/mixins/searchMixins"

export default {
  name: "Search",
  components: {
    SearchExcludeHigherTaxa,
    SearchInput,
    SearchApplied,
    SearchFilters,
    SearchResult
  },
  mixins: [searchMixin],
  data() {
    return {
      input: {
        q: "*",
        rows: 50,
        fq: [],
        page: 1,
        facetLimit: 20
      }
    }
  },
  watch: {
    fq: {
      immediate: true,
      handler: function() {
        this.input = {
          ...this.input,
          fq: this.$route.query.fq,
          page: 1
        }
      }
    },
    q: {
      immediate: true,
      handler: function() {
        this.input = {
          ...this.input,
          q: this.q,
          fq: "",
          page: 1
        }
      }
    },
    page: {
      immediate: true,
      handler: function() {
        this.input = {
          ...this.input,
          page: parseInt(this.page)
        }
      }
    }
  },
  mounted() {
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

<style lang="scss" scoped>
.m-search::v-deep {
  @import "./Search.scss";
}
</style>