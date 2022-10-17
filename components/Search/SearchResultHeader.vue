<template>
  <BRow align-v="baseline">
    <BCol 
      class="text-left" 
      cols="3" 
      align-self="baseline"
    >
      <SearchResultNumberOfMatches :total="data.search.meta.pagination.total"/>
    </BCol>

    <BCol align-self="baseline">
      <SearchResultNav :pagination="data.search.meta.pagination"/>
    </BCol>
    
    <BCol cols="3" 
      align-self="baseline" 
      class="text-right"
    >
      <SearchResultDownloadButton/>
    </BCol>
  </BRow>
</template>

<script>
const SearchResultNumberOfMatches = () => import("@/components/Search/SearchResultNumberOfMatches")
const SearchResultNav = () => import("@/components/Search/SearchResultNav")
const SearchResultDownloadButton = () => import("@/components/Search/SearchResultDownloadButton")

import { searchMixin, searchResultPaginationMixin } from "@/mixins/searchMixins"

export default {
  name: "SearchResultHeader",
  mixins: [searchMixin, searchResultPaginationMixin],
  components: {
    SearchResultNumberOfMatches,
    SearchResultNav,
    SearchResultDownloadButton
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
}
</script>