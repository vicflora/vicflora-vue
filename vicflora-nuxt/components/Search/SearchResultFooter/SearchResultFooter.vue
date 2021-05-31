<template>
  <BRow align-v="baseline">
    <BCol 
      cols="3" 
      align-self="baseline"
      class="text-left"
    />

    <BCol align-self="baseline">
      <SearchResultNav
          :activePage="activePage"
          :lastPage="data.search.meta.pagination.lastPage"
          @page-change="onPageChange"
      />
    </BCol>

    <BCol 
      cols="3" 
      align-self="baseline" 
      class="text-right"
    />
  </BRow>
</template>

<script>
import SearchResultNav from "@/components/Search/SearchResultNav/SearchResultNav"

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
  }
}
</script>