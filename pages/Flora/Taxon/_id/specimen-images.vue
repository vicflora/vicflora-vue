<template>
  <TaxonTabSpecimenImages :concept="concept" />
</template>

<script>
import TaxonTabSpecimenImages from "~/components/Taxon/TaxonTabSpecimenImages"

export default {
  name: "TaxonSpecimenImages",
  components: {
    TaxonTabSpecimenImages
  },
  props: {
    concept: {
      type: Object,
      required: true
    }
  }
}
</script>