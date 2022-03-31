<template>
  <div class="higher-classification">
    <TaxonClassificationItem
      v-for="(item, index) in higherClassification"
      :key="item.id"
      :item="item"
      :depth="index"
      :indent="indent"
      :pageType="pageType"
    >
      <TaxonClassificationNuxtLink
        :to="`/flora/${pageType}/${item.id}`"
        :classes="getNameClasses(item.taxonTreeDefItem.rankId)"
        :full-name="item.taxonName.fullName"
        :authorship="item.taxonName.authorship"
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
}
</script>