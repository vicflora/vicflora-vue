<template>
  <TaxonTabSynonymy :concept="concept" />
</template>

<script>
import TaxonTabSynonymy from "~/components/Taxon/TaxonTabSynonymy"

export default {
  name: "TaxonSynonymy",
  components: {
    TaxonTabSynonymy
  },
  props: {
    concept: {
      type: Object,
      required: true
    }
  }
}
</script>