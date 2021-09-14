<template>
  <b-pagination-nav
    class="mt-3 mb-5"
    v-if="images.paginatorInfo.total > first"
    v-model="currentPage"
    :number-of-pages="
      images.paginatorInfo.total % first === 0
        ? images.paginatorInfo.total / first
        : images.paginatorInfo.total / first + 1
    "
    use-router
    base-url="?page="
    first-number
    last-number
    align="center"
    @change="onChange"
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
  mounted() {
    this.currentPage = this.page
  },
  methods: {
    onChange: function(pageNum) {
      this.currentPage = pageNum
      this.$emit("pageChanged", pageNum)
    }
  }
}
</script>