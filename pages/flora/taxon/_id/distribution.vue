<template>
  <TaxonTabDistribution :concept="concept" />
</template>

<script>
import TaxonTabDistribution from "~/components/Taxon/TaxonTabDistribution"

export default {
  name: "TaxonDistribution",
  components: {
    TaxonTabDistribution
  },
  props: {
    concept: {
      type: Object,
      required: true
    }
  }
}
</script>