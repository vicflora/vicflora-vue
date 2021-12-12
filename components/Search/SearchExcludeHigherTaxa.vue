<template>
  <BFormCheckbox 
    v-model="exclusionCheckbox">
    Exclude higher taxa
  </BFormCheckbox>
</template>

<script>
import { searchMixin } from "@/mixins/searchMixins"

export default {
  name: "SearchExcludeHigherTaxa",
  mixins: [searchMixin],
  data() {
    return {
      exclusionCheckbox: false
    }
  },
  watch: {
    exclusionCheckbox: function(newVal, oldVal) {
      if (newVal === true && oldVal === false) {
        if (this.fq.indexOf('end_or_higher_taxon:end') === -1) {
          this.$router.push({
            query: {
              q: this.q,
              fq: [...this.fq, "end_or_higher_taxon:end"]
            }
          })
        }
      }
      if (newVal === false && oldVal === true) {
        this.$router.push({
          query: {
            q: this.q,
            fq: this.fq.filter(item => item !== "end_or_higher_taxon:end")
          }
        })
      }
    }
  },
  mounted() {
    this.exclusionCheckbox = this.fq.includes("end_or_higher_taxon:end")
  }
}
</script>