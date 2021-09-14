<template>
  <TaxonTabOverview :concept="concept" />
</template>

<script>
import TaxonTabOverview from "~/components/Taxon/TaxonTabOverview"

export default {
  name: "TaxonTreatment",
  components: {
    TaxonTabOverview
  },
  props: {
    concept: {
      type: Object,
      required: true
    }
  }
}
</script>