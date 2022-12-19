<template>
  <b-row class="justify-content-md-left m-row">
    <b-col
      cols="2"
      class="text-left"
    >
      <span class="m-taxon-treedefitem-name">
        {{ item.taxonTreeDefItem.name }}
      </span>
    </b-col>
    <div
      :style="
        `margin-left:${depth * indent}vw;`
      "
      class="text-left"
    >
      <slot></slot>
    </div>
  </b-row>
</template>

<script>

import { classificationMixin } from "~/mixins/classificationMixin"
import { taxonNameClassesMixin } from "~/mixins/taxonMixins"

export default {
  name: "TaxonClassificationItem",
  mixins: [
    classificationMixin,
  ],
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>
