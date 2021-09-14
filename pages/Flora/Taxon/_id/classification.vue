<template>
  <TaxonTabClassification :concept="concept" />
</template>

<script>
import TaxonTabClassification from "~/components/Taxon/TaxonClassification"

export default {
  name: "TaxonClassification",
  components: {
    TaxonTabClassification
  },
  props: {
    concept: {
      type: Object,
      required: true
    }
  }
}
</script>