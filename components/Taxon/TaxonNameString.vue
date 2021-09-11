<template>
  <h2 :class="getNameClasses(rankId, taxonomicStatus)">
    {{ fullName }}  
  </h2>
</template>

<script>
import { rankMixin, taxonNameClassesMixin } from "@/mixins/taxonMixins"

export default {
  name: "TaxonNameString",
  mixins: [rankMixin, taxonNameClassesMixin],
  props: {
    fullName: {
      type: String,
      required: true
    },
    rankId: {
      type: Number,
      required: true
    },
    taxonomicStatus: {
      type: String,
      default: "ACCEPTED"
    }
  }
}
</script>