<template>
  <div class="mt-0 search-result-nav" style="display:inline-block">
    <BPagination
      v-model="pagination.currentPage"
      :total-rows="pagination.total"
      per-page="50"
      size="sm"
      first-number
      last-number
      @change="onChange"
    />
  </div>
</template>

<script>
import { searchMixin } from "@/mixins/searchMixins"

export default {
  name: "SearchResultNav",
  props: {
    pagination: {
      type: Object,
      required: true,
    },
  },
  data: function() {
    return {
      currentPage: 1
    }
  },
  computed: {
    numberOfPages: function() {
      return this.lastPage === 0 ? 1 : this.lastPage
    }
  },
  watch: {
    '$route': {
      deep: true,
      immediate: true,
      handler() {
        if (this.$route.query.page) {
          this.pagination.currentPage = this.$route.query.page
        }
      }
    }
  },
  mounted: function() {},
  methods: {
    onChange: function(pageNum) {
      this.$router.push({
        name: this.$route.name,
        params: this.$route.params,
        query: {
          ...this.$route.query,
          page: pageNum,
        },
      })
    }
  }
}
</script>
