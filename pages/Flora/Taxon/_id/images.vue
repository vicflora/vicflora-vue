<template>
  <TaxonTabImages :concept="concept" />
</template>

<script>
import TaxonTabImages from "~/components/Taxon/TaxonTabImages"

export default {
  name: "TaxonImages",
  components: {
    TaxonTabImages
  },
  props: {
    concept: {
      type: Object,
      required: true
    }
  }
}
</script>