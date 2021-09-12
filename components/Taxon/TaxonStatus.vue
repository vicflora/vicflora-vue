<template>
  <div>
    <TaxonStatusItem
      v-if="concept.taxonomicStatus"
      :label="'Taxonomic status'"
      :value="taxonomicStatusEnum[concept.taxonomicStatus]"
    />

    <TaxonStatusItem
      v-if="concept.occurrenceStatus"
      :label="'Occurrence status'"
      :value="occurrenceStatusEnum[concept.occurrenceStatus]"
    />
    
    <TaxonStatusItem
      v-if="concept.establishmentMeans"
      :label="'Establishment means'"
      :value="establishmentMeansEnum[concept.establishmentMeans]"
    />
  </div>
</template>

<script>
import TaxonStatusItem from "~/components/Taxon/TaxonStatusItem"
import taxonomicStatusEnum from "~/graphql/enums/taxonomicStatusEnum"
import occurrenceStatusEnum from "~/graphql/enums/occurrenceStatusEnum"
import establishmentMeansEnum from "~/graphql/enums/establishmentMeansEnum"

export default {
  name: "TaxonStatus",
  components: {
    TaxonStatusItem
  },
  props: {
    concept: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      taxonomicStatusEnum,
      occurrenceStatusEnum,
      establishmentMeansEnum
    };
  }
};
</script>