<template>
  <div class="search-applied">
    <div
      aria-controls="collapse-query"
      @click="queryFacet = !queryFacet"
      class="m-subtitle"
    >
      Query
      <BIcon 
        v-if="queryFacet"
        icon="caret-down-fill" 
      />
      <BIcon 
        v-else
        icon="caret-right-fill" 
      />
    </div>

    <BCollapse 
      id="collapse-query" 
      v-model="queryFacet"
      visible 
    >
      <SearchAppliedQueryTerm :term="q" :deleteOption="queryTermDeleteOption"/>
      <SearchAppliedFilters :filters="fq"/>
    </BCollapse>
  </div>
</template>

<script>
const SearchAppliedQueryTerm = () => import("@/components/Search/SearchAppliedQueryTerm")
const SearchAppliedFilters = () => import("@/components/Search/SearchAppliedFilters")

export default {
  name: "SearchApplied",
  components: {
    SearchAppliedQueryTerm,
    SearchAppliedFilters
  },
  props: {
    q: {
      type: String,
      required: true
    },
    fq: {
      type: Array,
      required: true
    },
    queryTermDeleteOption: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      queryFacet: true
    }
  }
}
</script>