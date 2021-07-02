<template>
  <h2 :class="classes">
    {{ fullName }}  
  </h2>
</template>

<script>
import { rankMixin } from "@/mixins/taxonMixins"

export default {
  name: "TaxonNameString",
  mixins: [rankMixin],
  props: {
    fullName: {
      type: String,
      required: true
    },
    rankId: {
      type: Number,
      required: true
    }
  },
  computed: {
    classes() {
      let classes = []
      classes.push('m-name')
      if (this.rankId >= this.rankClass.genus) {
        classes.push('italic')
        return classes
      }
    }
  }
}
</script>