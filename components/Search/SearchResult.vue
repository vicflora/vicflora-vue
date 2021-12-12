<template>
  <div class="col col-lg-8">

    <!-- <BRow align-v="baseline">
      <BCol 
        class="text-left" 
        cols="3" 
        align-self="baseline"
      >
        <SearchResultNumberOfMatches :total="data.search.meta.pagination.total"/>
      </BCol>

      <BCol align-self="baseline">
        <SearchResultNav
            :activePage="activePage"
            :lastPage="data.search.meta.pagination.lastPage"
            @pageChanged="onPageChange"
        />
      </BCol>
      
      <BCol cols="3" 
        align-self="baseline" 
        class="text-right"
      >
        <SearchResultDownloadButton/>
      </BCol>
    </BRow> -->
    <SearchResultHeader :data="data" @pageChanged="onPageChange" />

    <SearchResultItem 
      v-for="item in data.search.docs"
      :key="item.id"
      :item="item"
    />

    <!-- <BRow align-v="baseline">
      <BCol 
        cols="3" 
        align-self="baseline"
        class="text-left"
      />

      <BCol align-self="baseline">
        <SearchResultNav
            :activePage="activePage"
            :lastPage="data.search.meta.pagination.lastPage"
            @pageChanged="onPageChange"
        />
      </BCol>

      <BCol 
        cols="3" 
        align-self="baseline" 
        class="text-right"
      />
    </BRow> -->
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

<style lang="scss">

</style>