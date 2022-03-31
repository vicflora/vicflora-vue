<template>
  <div>
  <b-button 
    v-b-toggle="'sources'" 
    variant="primary"
    size="sm"
  >
    Sources
    <span class="when-open"><b-icon-caret-down-fill></b-icon-caret-down-fill></span>
    <span class="when-closed"><b-icon-caret-right-fill></b-icon-caret-right-fill></span>
  </b-button>

  <b-collapse id="sources">
    <p v-html="sources"></p>
  </b-collapse>
  </div>
</template>

<script>
export default {
  name: "TaxonTabDistributionSources",
  props: {
    sources: {
      type: String,
      required: true,
    },
  },
}
</script>