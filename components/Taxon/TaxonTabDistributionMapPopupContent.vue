<template>
  <div class="vf-distribution-map-popup">
    <div v-if="occurrences[page].properties !== undefined">
      <h5>{{occurrences[page].properties.acceptedNameUsage}}
      <span
        v-if="occurrences[page].properties.scientificName
            != occurrences[page].properties.acceptedNameUsage"
        style="display: block;"
      >
        <small>
          ({{ occurrences[page].properties.scientificName }})
        </small>
      </span>
      </h5>
      <p v-if="occurrences[page].properties.dataSource === 'AVH'">
        <b>Catalog number: </b>{{occurrences[page].properties.catalogNumber}}
      </p>
      <p v-else>
        <b>Catalog number: </b>VBA {{occurrences[page].properties.catalogNumber}}
      </p>
      <p><b>Collection:</b> {{ occurrences[page].properties.collection }}</p>
      <p><b>Recorded by:</b> {{ occurrences[page].properties.recordedBy }}</p>
      <p><b>Record number:</b> {{ occurrences[page].properties.recordNumber }}</p>
      <p><b>Event date:</b> {{ occurrences[page].properties.eventDate }}</p>

      <p
        v-if="occurrences[page].properties.dataSource === 'AVH'"
        class="text-right">
        <a
          :href="`https://avh.ala.org.au/occurrences/${occurrences[page].properties.uuid}`"
          target="_blank"
        >AVH record</a>
      </p>
      <p
        v-else
        class="text-right">
        <a
          :href="`https://biocache.ala.org.au/occurrences/${occurrences[page].properties.uuid}`"
          target="_blank"
        >VBA record</a>
      </p>
    </div>
    <div class="m-btn-group">
      <b-icon
        v-if="page!==0"
        icon="arrow-left-circle"
        aria-hidden="true"
        @click="goPrev"
        class="m-btn"
      />
      <div v-else></div>
      <div v-if="count > 1">{{ `${page + 1} of ${count}` }}</div>
      <div v-else></div>
      <b-icon
        v-if="page!==count-1"
        icon="arrow-right-circle"
        aria-hidden="true"
        @click="goNext"
        class="m-btn"
      />
      <div v-else></div>
    </div>
  </div>
</template>

<script>
import { BIcon, BIconArrowLeftCircle, BIconArrowRightCircle } from "bootstrap-vue"
import { popupContentMixin } from "@/mixins/mapMixins"

export default {
  name: 'TaxonTabDistributionMapPopupContent',
  components: {
    BIcon,
    BIconArrowLeftCircle,
    BIconArrowRightCircle,
  },
  mixins: [popupContentMixin],
  props: {
    occurrences: {
      type: Array,
      required: true
    }
  }
}
</script>