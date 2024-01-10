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
        return `${this.$route.params.layer.replace(/-/g, '_')}:"${this.$route.params.area}"`
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