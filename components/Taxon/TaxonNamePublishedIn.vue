<template>
  <div class="vf-name-published-in">
      <span 
        v-if="publishedIn.referenceType === 'PROTOLOGUE'"
        v-html="citation"
      ></span>
      <div v-else>
        <b>Published in:</b> <span id="published-in-popover-target">{{ publishedIn.quickRef }}</span>
        <b-popover target="published-in-popover-target" triggers="hover" placement="bottomright">
          <div v-html="publishedIn.citationHtml"></div>
        </b-popover>
      </div>
  </div>
</template>

<script>
export default {
  name: "TaxonNamePublishedIn",
  props: {
    publishedIn: {
      type: Object,
      required: true
    }
  },
  computed: {
    citation() {
      return this.publishedIn.citationHtml.replace('<p>', '').replace('</p>', '')
    },
  }
}
</script>

<style lang="scss">
.vf-name-published-in {
  display: inline-block;
}
</style>