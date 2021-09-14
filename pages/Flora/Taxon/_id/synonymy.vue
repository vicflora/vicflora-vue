<template>
  <TaxonTabSynonymy 
    :synonyms="concept.synonymUsages" 
    :misapplications="concept.misapplications"
  />
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