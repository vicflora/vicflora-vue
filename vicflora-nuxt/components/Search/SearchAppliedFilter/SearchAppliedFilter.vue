<template>
    <li v-if="filterKey" style="margin-left:10px;">
      <span class="filter-queries-key">{{ filterLabel }}</span>: 
      {{ filterValue }}
      <BIcon
        v-if="filterKey !== 'end_or_higher_taxon'"
        icon="x"
        font-scale="1.1"
        variant="danger"
        @click="removeFilter"
      />
    </li>
</template>

<script>
import { facetMixin } from "@/mixins/searchMixins"

export default {
  name: "SearchAppliedFilter",
  mixins: [facetMixin],
  props: {
    filter: {
      type: String,
      required: true
    }
  },
  methods: {
    removeFilter: function() {
      const fq = this.$route.query.fq
      let newFq = ''
      if (typeof fq === 'object') {
        newFq = fq.filter(item => item !== this.filter)
      }
      this.$router.push({
        query: {
          ...this.$route.query,
          fq: newFq,
          page: 1
        }
      })
    }
  }
}
</script>