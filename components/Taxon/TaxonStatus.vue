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
      v-if="concept.taxonomicStatus === 'ACCEPTED' && concept.degreeOfEstablishment"
      :label="'Degree of Establishment'"
      :value="degreeOfEstablishmentEnum[concept.degreeOfEstablishment]"
    />

    <div
      v-if="concept.taxonomicStatus === 'ACCEPTED' && threatStatus"
      class="tc-status-item-group"
    >
      <span class="tc-status-label tc-status-label-flex">Threat status</span>
      <div
        v-for="authority, index in authorities"
        :key="authority"
        class="tc-status-item-group-item"
      >
        <TaxonStatusItem
          v-if="authority === 'ffg'"
          :label="'FFG'"
          :value="iucnThreatStatusEnum[concept.ffg]"
          :inline="true"
        />
        <TaxonStatusItem
          v-if="authority === 'epbc'"
          :label="'EPBC'"
          :value="iucnThreatStatusEnum[concept.epbc]"
          :inline="true"
        />
        <TaxonStatusItem
          v-if="authority === 'vicAdvisory'"
          :label="'Vic. Advisory'"
          :value="vicAdvisoryEnum[concept.vicAdvisory]"
          :inline="true"
        />
        <span v-if="index < authorities.length - 1">&bull;&nbsp;</span>
      </div>
    </div>

  </div>
</template>

<script>
import TaxonStatusItem from "~/components/Taxon/TaxonStatusItem"
import taxonomicStatusEnum from "~/graphql/enums/taxonomicStatusEnum"
import occurrenceStatusEnum from "~/graphql/enums/occurrenceStatusEnum"
import establishmentMeansEnum from "~/graphql/enums/establishmentMeansEnum"
import degreeOfEstablishmentEnum from "~/graphql/enums/degreeOfEstablishmentEnum"
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
      degreeOfEstablishmentEnum,
      iucnThreatStatusEnum,
      vicAdvisoryEnum,
      authorities: ['ffg', 'epbc', 'vicAdvisory'],
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
    },
  }
}
</script>

<style lang="scss">
.tc-status-item-group {
  .tc-status-item-group-item {
    display: inline-block;
  }
  .tc-status-item {
    display: inline-block;
  }
}
</style>
