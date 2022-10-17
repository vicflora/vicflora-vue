<template>
  <BRow align-v="baseline">
    <BCol 
      cols="3" 
      align-self="baseline"
      class="text-left"
    />

    <BCol align-self="baseline">
      <SearchResultNav :pagination="data.search.meta.pagination"/>
    </BCol>

    <BCol 
      cols="3" 
      align-self="baseline" 
      class="text-right"
    />
  </BRow>
</template>

<script>
const SearchResultNav = () => import("@/components/Search/SearchResultNav")

import { searchResultPaginationMixin } from "@/mixins/searchMixins"

export default {
  name: "SearchResultFooter",
  mixins: [searchResultPaginationMixin],
  components: {
    SearchResultNav,
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
}
</script>