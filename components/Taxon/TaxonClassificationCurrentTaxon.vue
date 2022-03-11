<template>
  <TaxonClassificationItem
    :item="taxonConcept"
    :depth="depth"
    :indent="indent"
    :pageType="pageType"
    class="vf-classification-current-taxon"
  >
    <TaxonClassificationNuxtLink
      v-if="pageType==='classification'"
      :to="`/flora/taxon/${taxonConcept.id}`"
      :classes="getNameClasses(taxonConcept.taxonTreeDefItem.rankId)"
      :full-name="taxonConcept.taxonName.fullName"
      :authorship="taxonConcept.taxonName.authorship"
    />
    <span v-else>
      <span :class="getNameClasses(taxonConcept.taxonTreeDefItem.rankId)">
        {{ taxonConcept.taxonName.fullName }}
      </span>
      <span 
        v-if="taxonConcept.taxonName.authorship" 
        class="m-author"
      >
        {{taxonConcept.taxonName.authorship}}
      </span>
    </span>
  </TaxonClassificationItem>
</template>

<script>
import TaxonClassificationItem from "~/components/Taxon/TaxonClassificationItem"
import TaxonClassificationNuxtLink from "~/components/Taxon/TaxonClassificationNuxtLink"
import { classificationMixin } from "~/mixins/classificationMixin"
import { taxonNameClassesMixin } from "~/mixins/taxonMixins"

export default {
  name: "TaxonClassificationCurrentTaxon",
  components: {
    TaxonClassificationItem,
    TaxonClassificationNuxtLink
  },
  mixins: [
    classificationMixin,
    taxonNameClassesMixin
  ],
  props: {
    taxonConcept: {
      type: Object,
      required: true
    }
  }
}
</script>