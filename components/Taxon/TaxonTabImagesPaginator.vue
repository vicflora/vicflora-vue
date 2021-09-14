<template>
  <b-pagination 
    class="mt-3 mb-5"
    v-if="images.paginatorInfo.total > first"
    v-model="currentPage"
    :total-rows="images.paginatorInfo.total "
    :per-page="first"
    @change="onChange"
    align="center"
  />
</template>

<script>
export default {
  name: "TaxonTabImagesPaginator",
  props: {
    images: {
      type: Object,
      required: true
    },
    first: {
      type: Number,
      default: 24
    },
    page: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      currentPage: 1
    }
  },
  watch: {
    page: {
      immediate: true,
      handler(page) {
        this.currentPage = page
      }
    }
  },
  created() {
    this.currentPage = this.page
  },
  methods: {
    onChange: function(pageNum) {
      this.currentPage = pageNum
      this.$emit("page-changed", pageNum)
    }
  }
}
</script>