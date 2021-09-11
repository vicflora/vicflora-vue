<template>
  <div class="vf-children">
    <hr class="m-hr-bottom" />
    <b-row>
      <b-col class="text-right">
        <b-icon icon="caret-down-fill"></b-icon>
        <span> Subordinate taxa</span>
      </b-col>
    </b-row>
    <TaxonClassificationItem
      v-for="child in childrenSorted"
      :key="child.id"
      :item="child"
      :depth="depth"
      :indent="indent"
      :pageType="pageType"
    >
      <NuxtLink :to="`/flora/${pageType}/${child.id}`">
        <span 
          :class="getNameClasses(child.taxonTreeDefItem.rankId)"
        >
          {{ child.taxonName.fullName }}
        </span>
        <span 
          v-if="child.taxonName.authorship" 
          class="m-author"
        >
          {{child.taxonName.authorship}}
        </span>
      </NuxtLink>
    </TaxonClassificationItem>
  </div>
</template>

<script>
import TaxonClassificationItem from "~/components/Taxon/TaxonClassificationItem"
import { classificationMixin } from "~/mixins/classificationMixin"
import { taxonNameClassesMixin } from "~/mixins/taxonMixins"


export default {
  name: "TaxonClassificationChildren",
  components: {
    TaxonClassificationItem
  },
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