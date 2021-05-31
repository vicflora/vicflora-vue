<template>
  <div v-if="filters && filters.length" class="search-applied-filters">
    <span class="m-facet-title">Applied filters:</span>
    <ul>
      <SearchAppliedFilter 
        v-for="item in filters" 
        :key="item"
        :filter="item"
      />
    </ul>
  </div>
</template>

<script>
import SearchAppliedFilter from "@/components/Search/SearchAppliedFilter/SearchAppliedFilter"
import { searchMixin } from "@/mixins/searchMixins"

export default {
  name: "SearchAppliedFilters",
  components: { SearchAppliedFilter },
  mixins: [searchMixin],
  props: {
    filters: {
      type: [Array, String],
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.search-applied-filters {
  &>ul {
    padding-left: 0;
    list-style-type: none;

    &>li {
      margin-left: 0 !important;
    }
  }
}
</style>