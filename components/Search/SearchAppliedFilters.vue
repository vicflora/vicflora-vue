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
const SearchAppliedFilter = () => import("@/components/Search/SearchAppliedFilter")
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