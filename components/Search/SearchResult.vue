<template>
  <div class="vf-search-result col col-lg-8">

    <SearchResultHeader :data="data"/>

    <SearchResultItem 
      v-for="item in data.search.docs"
      :key="item.id"
      :item="item"
    />
    <SearchResultFooter :data="data"/>
  </div>
</template>

<script>
const SearchResultNumberOfMatches = () => import("@/components/Search/SearchResultNumberOfMatches")
const SearchResultNav = () => import("@/components/Search/SearchResultNav")
const SearchResultItem = () => import("@/components/Search/SearchResultItem")
const SearchResultDownloadButton = () => import("@/components/Search/SearchResultDownloadButton")
const SearchResultHeader = () => import("@/components/Search/SearchResultHeader")
const SearchResultFooter = () => import("@/components/Search/SearchResultFooter")

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
}
</script>