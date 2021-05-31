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
  methods: {
    toDownloadPage: function() {
      this.$router.push({
        path: "/flora/Download",
        query: this.$route.query
      });
    }
  }
}
</script>