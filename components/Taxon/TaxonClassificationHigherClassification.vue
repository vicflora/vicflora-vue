<template>
  <div class="higher-classification">
    <TaxonClassificationItem
      v-for="(higherItem, index) in higherTaxa"
      :key="higherItem.taxonConcept.id"
      :item="higherItem.taxonConcept"
      :depth="index"
      :indent="indent"
      :pageType="pageType"
    >
      <TaxonClassificationNuxtLink
        :to="`/flora/${pageType}/${higherItem.taxonConcept.id}`"
        :classes="getNameClasses(higherItem.taxonConcept.taxonTreeDefItem.rankId)"
        :full-name="higherItem.taxonConcept.taxonName.fullName"
        :authorship="higherItem.taxonConcept.taxonName.authorship"
      />
    </TaxonClassificationItem>
    <b-row>
      <b-col class="text-right">
        <b-icon icon="caret-up-fill"></b-icon>
        <span> Higher taxa</span>
      </b-col>
    </b-row>
    <hr class="m-hr-top" />
  </div>
</template>

<script>
import TaxonClassificationItem from "~/components/Taxon/TaxonClassificationItem"
import TaxonClassificationNuxtLink from "~/components/Taxon/TaxonClassificationNuxtLink"
import { classificationMixin } from "~/mixins/classificationMixin"
import { taxonNameClassesMixin } from "~/mixins/taxonMixins"

export default {
  name: "TaxonClassificationHigherClassification",
  components: {
    TaxonClassificationItem,
    TaxonClassificationNuxtLink
  },
  mixins: [
    classificationMixin,
    taxonNameClassesMixin
  ],
  props: {
    higherClassification: {
      type: Array,
      required: true
    }
  },
  computed: {
    higherTaxa() {
      return this.higherClassification.slice().sort((a, b) => a.depth - b.depth)
    }
  }
}
</script>