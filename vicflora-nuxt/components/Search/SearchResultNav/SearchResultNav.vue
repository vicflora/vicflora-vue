<template>
  <div class="mt-0 search-result-nav" style="display:inline-block">
    <BPaginationNav
      :value="currentPage"
      :no-page-detect="true"
      :number-of-pages="numberOfPages"
      :link-gen="linkGen"
      :use-router="false"
      style="align-items:center;"
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
  mixins: [searchMixin], 
  props: {
    activePage: {
      type: Number,
      default: 1
    },
    lastPage: {
      type: Number,
      required: true
    }
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
    q: {
      immediate: true,
      handler: function() {
        if ("page" in this.$route.query && this.$route.query.page !== undefined) {
          this.currentPage = this.$route.query.page
        }
      }
    },
    fq: {
      immediate: true,
      handler: function() {
        if ("page" in this.$route.query && this.$route.query.page !== undefined) {
          this.currentPage = this.$route.query.page
        }
      }
    },
    activePage: {
      immediate: true,
      handler: function(newVal) {
        this.currentPage = newVal
      }
    }
  },
  mounted: function() {
    if ("page" in this.$route.query && this.$route.query.page !== undefined) {
      this.currentPage = this.$route.query.page
    }
  },
  methods: {
    linkGen: function(pageNum) {
      return {
        path: "/flora/search",
        query: {
          ...this.$route.query,
          page: pageNum
        }
      }
    },
    onChange: function(pageNum) {
      this.currentPage = pageNum
      this.$emit("pageChanged", pageNum)
    }
  }
}
</script>