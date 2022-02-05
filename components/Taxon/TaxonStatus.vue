<template>
  <div>
    <TaxonStatusItem
      v-if="concept.taxonomicStatus"
      :label="'Taxonomic status'"
      :value="taxonomicStatusEnum[concept.taxonomicStatus]"
    />

    <TaxonStatusItem
      v-if="concept.taxonomicStatus === 'ACCEPTED' && concept.occurrenceStatus"
      :label="'Occurrence status'"
      :value="occurrenceStatusEnum[concept.occurrenceStatus]"
    />

    <TaxonStatusItem
      v-if="concept.taxonomicStatus === 'ACCEPTED' && concept.establishmentMeans"
      :label="'Establishment means'"
      :value="establishmentMeansEnum[concept.establishmentMeans]"
    />

    <TaxonStatusItem
      v-if="concept.taxonomicStatus === 'ACCEPTED' && threatStatus"
      :label="'Threat status'"
      :value="threatStatus"
    />
  </div>
</template>

<script>
import TaxonStatusItem from "~/components/Taxon/TaxonStatusItem"
import taxonomicStatusEnum from "~/graphql/enums/taxonomicStatusEnum"
import occurrenceStatusEnum from "~/graphql/enums/occurrenceStatusEnum"
import establishmentMeansEnum from "~/graphql/enums/establishmentMeansEnum"
import iucnThreatStatusEnum from "~/graphql/enums/iucnThreatStatusEnum"
import vicAdvisoryEnum from "~/graphql/enums/vicAdvisoryEnum"

export default {
  name: "TaxonStatus",
  components: {
    TaxonStatusItem,
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
      establishmentMeansEnum,
    }
  },
  computed: {
    threatStatus() {
      if (this.concept !== undefined && (this.concept.epbc || this.concept.ffg
          || this.concept.vicAdvisory)) {
        let threatStatus = []
        if (this.concept.ffg) {
          threatStatus.push("<strong>FFG:</strong> " + iucnThreatStatusEnum[this.concept.ffg])
        }
        if (this.concept.epbc) {
          threatStatus.push("<strong>EPBC:</strong> " + iucnThreatStatusEnum[this.concept.epbc])
        }
        if (this.concept.vicAdvisory) {
          threatStatus.push("<strong>Vic. Advisory List:</strong> " + vicAdvisoryEnum[this.concept.vicAdvisory])
        }
        return threatStatus.join('; ')
      }
      return null
    }
  }
}
</script>
