<template>
  <span v-html="protologueCitation"/>
</template>

<script>
export default {
  name: "TaxonNameProtologue",
  props: {
    protologue: {
      type: Object,
      required: true
    }
  },
  computed: {
    protologueCitation() {
      let citation = `<i>${this.protologue.title}</i>`
      if (this.protologue.volume !== undefined && this.protologue.volume) {
        citation += ` <b>${this.protologue.volume}</b>`
      }
      if (this.protologue.pages !== undefined && this.protologue.pages) {
        citation += `: ${this.protologue.pages}`
      }
      if (this.protologue.publicationYear !== undefined
          && this.protologue.publicationYear) {
        citation += ` (${this.protologue.publicationYear})`
      }
      return citation
    }
  }
}
</script>

<style lang="scss">
.m-protologue {
  .b-icon.bi {
    vertical-align: 0;
  }
}
</style>

