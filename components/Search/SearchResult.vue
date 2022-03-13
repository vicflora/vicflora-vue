<template>
  <div class="vf-search-result col col-lg-8">

    <SearchResultHeader :data="data" @pageChanged="onPageChange" />

    <SearchResultItem 
      v-for="item in data.search.docs"
      :key="item.id"
      :item="item"
    />
    <SearchResultFooter :data="data" @pageChanged="onPageChange" />
  </div>
</template>

<script>
import SearchResultNumberOfMatches from "@/components/Search/SearchResultNumberOfMatches"
import SearchResultNav from "@/components/Search/SearchResultNav"
import SearchResultItem from "@/components/Search/SearchResultItem"
import SearchResultDownloadButton from "@/components/Search/SearchResultDownloadButton"
import SearchResultHeader from "@/components/Search/SearchResultHeader"
import SearchResultFooter from "@/components/Search/SearchResultFooter"

export default {
  name: "SearchResult",
  components: {
    SearchResultNumberOfMatches,
    SearchResultNav,
    SearchResultItem,
    SearchResultDownloadButton,
    SearchResultHeader,
    SearchResultFooter
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data: function() {
    return {
      activePage: 1
    }
  },
  mounted() {
    this.activePage = "page" in this.$route.query 
        && this.$route.query.page !== undefined 
        ? parseInt(this.$route.query.page) : 1
  },
  methods: {
    onPageChange: function(pageNum) {
      this.activePage = pageNum
      this.$emit("pageChanged", pageNum)
    }
  }
}
</script>