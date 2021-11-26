<template>
  <b-button 
    :toggle="collapseElement"
    variant="primary"
    size="sm"
  >
    <slot></slot>
    <span class="when-open"><b-icon-caret-down-fill></b-icon-caret-down-fill></span>
    <span class="when-closed"><b-icon-caret-right-fill></b-icon-caret-right-fill></span>
  </b-button>
</template>

<script>
export default {
  name: "TaxonTabDistributionCollapseButton",
  props: {
    collapseElement: {
      type: String,
      required: true,
    },
  }
}
</script>

<style lang="scss">
.collapsed > .when-open,
.not-collapsed > .when-closed {
  display: none;
}
</style>