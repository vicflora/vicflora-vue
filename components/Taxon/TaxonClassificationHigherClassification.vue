<template>
  <div class="higher-classification">
    <b-row
      v-for="(higherItem, index) in higherTaxa"
      :key="higherItem.id"
      class="justify-content-md-left m-row"
    >
      <b-col cols="2" class="text-left">
        <span class="m-taxon-treedefitem-name">
          {{ higherItem.taxonConcept.taxonTreeDefItem.name }}
        </span>
      </b-col>
      <div :style="`margin-left:${index * indent}vw;`" class="text-left">
        <NuxtLink :to="`/flora/${pageType}/${higherItem.taxonConcept.id}`">
          <span
            :class="getNameClasses(higherItem.taxonConcept.taxonTreeDefItem.rankId)"
          >{{ higherItem.taxonConcept.taxonName.fullName }}</span
          >&nbsp;
          <span class="m-author">{{
            higherItem.taxonConcept.taxonName.authorship
          }}</span>
        </NuxtLink>
      </div>
    </b-row>
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
import { classificationMixin } from "~/mixins/classificationMixin"
import { taxonNameClassesMixin } from "~/mixins/taxonMixins"

export default {
  name: "TaxonClassificationHigherClassification",
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