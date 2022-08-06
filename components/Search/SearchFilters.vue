<template>
  <div class="search-filters">
    <div class="float-right">
      <SearchFilterConfig/>
    </div>
    <div
      class="m-subtitle"
      aria-controls="collapse-filter"
      @click="filtersFacet = !filtersFacet"
    >
      Filters
      <BIcon 
        v-if="filtersFacet"
        icon="caret-down-fill" 
      />
      <BIcon 
        v-else
        icon="caret-right-fill" 
      />
    </div>

    <BCollapse
      id="collapse-filter"
      v-model="filtersFacet"
      visible
    >
      <div
        v-for="facetField in data.search.facetFields"
        :key="facetField.fieldName"
      >
        <SearchFiltersFacetField
          v-if="facetField.facets.length>0"
          :key="key"
          :facetField="{ ...facetField }"
        />
      </div>
    </BCollapse>
  </div>
</template>

<script>
const SearchFilterConfig = () => import('@/components/Search/SearchFilterConfig')
const SearchFiltersFacetField = () => import("@/components/Search/SearchFiltersFacetField")

export default {
  name: "SearchFilters",
  components: {
    SearchFilterConfig,
    SearchFiltersFacetField,
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      filtersFacet: true,
      key: 0,
    }
  },
}
</script>