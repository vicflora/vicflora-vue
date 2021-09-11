<template>
  <div class="vf-children">
    <hr class="m-hr-bottom" />
    <b-row>
      <b-col class="text-right">
        <b-icon icon="caret-down-fill"></b-icon>
        <span> Subordinate taxa</span>
      </b-col>
    </b-row>
    <b-row
      v-for="child in childrenSorted"
      :key="child.id"
      class="justify-content-md-left m-row"
    >
      <b-col 
        cols="2" 
        class="text-left"
      >
        <span class="m-taxon-treedefitem-name">
          {{ child.taxonTreeDefItem.name }}
        </span>
      </b-col>
      <div
        :style="
          `margin-left:${depth * indent}vw;`
        "
        class="text-left"
      >
        <NuxtLink :to="`/flora/${pageType}/${child.id}`">
          <span :class="getNameClasses(child.taxonTreeDefItem.rankId)">{{ child.taxonName.fullName }}</span
          >&nbsp;<span class="m-author">{{
            child.taxonName.authorship
          }}</span>
        </NuxtLink>
      </div>
    </b-row>
  </div>
</template>

<script>
import { classificationMixin } from "~/mixins/classificationMixin"
import { taxonNameClassesMixin } from "~/mixins/taxonMixins"

export default {
  name: "TaxonClassificationChildren",
  mixins: [
    classificationMixin, 
    taxonNameClassesMixin
  ],
  props: {
    children: {
      type: Array,
      required: true
    }
  },
  computed: {
    childrenSorted() {
      return this.children
        .slice()
        .sort((a, b) => {
          let fa = a.taxonName.fullName.toLowerCase(),
            fb = b.taxonName.fullName.toLowerCase()
          if (fa < fb) {
            return -1
          }
          if (fa > fb) {
            return 1
          }
          return 0
        })
    }
  }
}
</script>