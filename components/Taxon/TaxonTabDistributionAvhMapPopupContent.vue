<template>
  <div class="m-popup">
    <div>
      <p><b>{{ occurrences[page].raw_catalogNumber }}</b></p>
      <p>{{ occurrences[page].raw_scientificName }}</p>
      <p v-if="occurrences[page].collector !== undefined">{{ occurrences[page].collector }}
        <span v-if="occurrences[page].recordNumber !== undefined">{{ occurrences[page].recordNumber }}</span>
      </p>
      <p v-if="occurrences[page].eventDate !== undefined">{{ formatDate(occurrences[page].eventDate) }}</p>
      <p class="text-right">
        <a  
          :href="`https://avh.ala.org.au/occurrences/${occurrences[page].uuid}`"
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
  name: 'TaxonTabDistributionAvhMapPopupContent',
  mixins: [popupContentMixin],
  props: {
    occurrences: {
      type: Array,
      required: true
    }
  },
  methods: {
    formatDate(timestamp) {
      const date = new Date(timestamp)
      return date.getFullYear() + 
          '-' + date.getMonth().toString().padStart(2, '0') + 
          '-' + date.getDay().toString().padStart(2, '0')
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
