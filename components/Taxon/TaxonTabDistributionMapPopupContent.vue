<template>
  <div class="m-popup">
    <div v-if="occurrences[page].properties !== undefined">
      <h5>{{occurrences[page].properties.scientificName}}</h5>
      <p><b>Catalog Number: </b>{{occurrences[page].properties.catalogNumber}}</p>
      <p><b>Occurrence Status: </b>{{occurrences[page].properties.occurrenceStatus}}</p>
      <p><b>Establishment Means: </b>{{occurrences[page].properties.establishmentMeans}}</p>
      <p class="text-right">
        <a  
          :href="`https://avh.ala.org.au/occurrences/${occurrences[page].properties.uuid}`"
          target="_blank"
        >AVH record</a>
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
import { popupContentMixin } from "@/mixins/mapMixins"

export default {
  name: 'TaxonTabDistributionMapPopupContent',
  mixins: [popupContentMixin],
  props: {
    occurrences: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/scss/custom_variables";

.m-popup {
  font-size: 14px;
  p {
    margin: 0;

    a {
      color: $primary;
    }
  }
  .m-btn-group{
    padding-top: 10px;
    display: flex;
    justify-content: space-between;
    .m-btn {
      display:inline-block;
      cursor:pointer;
    }
  }
}
</style>
