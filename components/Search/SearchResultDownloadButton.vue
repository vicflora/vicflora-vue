<template>
  <BBtn 
    size="sm" 
    variant="primary" 
    @click="toDownloadPage"
  >
    Download
  </BBtn>
</template>

<script>
export default {
  name: "SearchResultDownloadButton",
  computed: {
    q() {
      if ('layer' in this.$route.params && 
          this.$route.params.layer !== undefined &&
          'area' in this.$route.params && 
          this.$route.params.area !== undefined) {

            switch (this.$route.params.layer) {
              case 'parkres':
                return `park_or_reserve:"${this.$store.getters['checklist/areaName']}"`
              case 'bioregion':
                return `bioregion:"${this.$store.getters['checklist/areaName']}"`
              case 'lga':
                return `local_government_area:"${this.$store.getters['checklist/areaName']}"`
              case 'rap':
                return `registered_aboriginal_party:"${this.$store.getters['checklist/areaName']}"`
            }
      }
      else {
        if ('q' in this.$route.query && this.$route.query.q !== undefined) {
          return this.$route.query.q
        }
      }
      return '*'
    },
    query() {
      return {
        ...this.$route.query,
        q: this.q
      }
    },
  },
  methods: {
    toDownloadPage: function() {
      this.$router.push({
        path: "/flora/Download",
        query: this.query
      });
    }
  }
}
</script>