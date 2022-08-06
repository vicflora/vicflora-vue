<template>
  <div>
    <BFormCheckbox
      :value="facet.fq.split(':')[1]"
      :label="facet.value"
      class="m-facetvalue"
      :checked="checked"
    >
      <span class="m-facet-value">{{ facet.value }} ({{ facet.count }})</span>
    </BFormCheckbox>
  </div>
</template>

<script>

import { searchMixin, facetMixin } from "@/mixins/searchMixins"

export default {
  name: "SearchFiltersFacet",
  mixins: [searchMixin, facetMixin],
  props: {
    facet: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      checked: false,
      filter: this.facet.fq
    }
  },
  computed: {
    filterKeys() {
      return this.fq.map(item => item.split(':')[0])
    }
  },
}
</script>