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
    >
      <TaxonStatusEndemic v-if="concept.taxonomicStatus === 'ACCEPTED' && concept.occurrenceStatus && concept.endemic"/>
    </TaxonStatusItem>

    <TaxonStatusItem
      v-if="concept.taxonomicStatus === 'ACCEPTED'
          && concept.occurrenceStatus && concept.occurrenceStatus !== 'EXCLUDED'
          && concept.establishmentMeans"
      :label="'Origin'"
      :value="establishmentMeansEnum[concept.establishmentMeans]"
    />

    <TaxonStatusItem
      v-if="concept.taxonomicStatus === 'ACCEPTED'
          && concept.occurrenceStatus && concept.occurrenceStatus !== 'EXCLUDED'
          && concept.degreeOfEstablishment"
      :label="'Degree of establishment'"
      :value="degreeOfEstablishmentEnum[concept.degreeOfEstablishment]"
    />

    <div 
      v-if="concept.taxonomicStatus === 'ACCEPTED' && concept.threatStatusAssessments.length"
      class="tc-status-item-group"
    >
      <span class="tc-status-label tc-status-label-flex">Threat status</span>
      <div 
        v-for="assessment, index in concept.threatStatusAssessments"
        :key="assessment.authority"
        class="tc-status-item-group-item"
      >
        <TaxonStatusItem
          :label="assessment.authority.code.toUpperCase()"
          :value="iucnThreatStatusEnum[assessment.iucnCategory.code]"
          :comment="(assessment.as ? 'as <i>' + assessment.as + '</i>' : '')"
          :inline="true"
        />
        <span v-if="index < concept.threatStatusAssessments.length - 1">&bull;&nbsp;</span>
      </div>
    </div>
  </div>
</template>

<script>
import TaxonStatusItem from "~/components/Taxon/TaxonStatusItem"
const TaxonStatusEndemic = () => import('~/components/Taxon/TaxonStatusEndemic')

import taxonomicStatusEnum from "~/graphql/enums/taxonomicStatusEnum"
import occurrenceStatusEnum from "~/graphql/enums/occurrenceStatusEnum"
import establishmentMeansEnum from "~/graphql/enums/establishmentMeansEnum"
import degreeOfEstablishmentEnum from "~/graphql/enums/degreeOfEstablishmentEnum"
import iucnThreatStatusEnum from "~/graphql/enums/iucnThreatStatusEnum"

export default {
  name: "TaxonStatus",
  components: {
    TaxonStatusItem,
    TaxonStatusEndemic,
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
    }
  },
  computed: {
    authorities() {
      const authorities = []
      if (this.concept !== undefined) {
        if (this.concept.ffg) {
          authorities.push('ffg')
        }
         if (this.concept.epbc) {
          authorities.push('epbc')
        }
     }
     return authorities
    },
  }
}
</script>
