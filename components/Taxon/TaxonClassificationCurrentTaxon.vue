<template>
  <TaxonClassificationItem
    :item="taxonConcept"
    :depth="depth"
    :indent="indent"
    :pageType="pageType"
  >
    <NuxtLink v-if="pageType==='classification'" :to="'/flora/taxon/' + taxonConcept.id">
      <span
        :class="getNameClasses(taxonConcept.taxonTreeDefItem.rankId)"
      >
        {{ taxonConcept.taxonName.fullName }}
      </span>
      <span 
        v-if="taxonConcept.taxonName.authorship"
        class="m-author"
      >
        {{taxonConcept.taxonName.authorship}}
      </span>
    </NuxtLink>
    <span v-else>
      <span
        :class="getNameClasses(taxonConcept.taxonTreeDefItem.rankId)"
      >
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
import { classificationMixin } from "~/mixins/classificationMixin"
import { taxonNameClassesMixin } from "~/mixins/taxonMixins"

export default {
  name: "TaxonClassificationCurrentTaxon",
  components: {
    TaxonClassificationItem
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