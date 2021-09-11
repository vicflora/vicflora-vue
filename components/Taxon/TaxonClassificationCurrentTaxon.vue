<template>
  <b-row class="justify-content-md-left">
    <b-col cols="2" class="text-left">
      <span class="m-taxon-treedefitem-name">
        {{ taxonConcept.taxonTreeDefItem.name }}
      </span>
    </b-col>
    <div
      :style="
        `margin-left:${(depth) * indent}vw;`
      "
      class="text-left"
    >
      <NuxtLink v-if="pageType==='classification'" :to="'/flora/taxon/' + taxonConcept.id">
        <span
          :class="getNameClasses(taxonConcept.taxonTreeDefItem.rankId)"
        >{{ taxonConcept.taxonName.fullName }}</span
        >&nbsp;<span class="m-author">{{
          taxonConcept.taxonName.authorship
        }}</span>
      </NuxtLink>
      <span v-else>
        <span
          class="m-taxon-name"
          :style="
            taxonConcept.taxonTreeDefItem.rankId >= rankClass.genus
              ? 'font-style:italic;'
              : 'font-style:normal;'
          "
          >{{ taxonConcept.taxonName.fullName }}</span
        >&nbsp;<span class="m-author">{{
          taxonConcept.taxonName.authorship
        }}</span>
      </span>
      
    </div>
  </b-row>
</template>

<script>
import { classificationMixin } from "~/mixins/classificationMixin"
import { taxonNameClassesMixin } from "~/mixins/taxonMixins"

export default {
  name: "TaxonClassificationCurrentTaxon",
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