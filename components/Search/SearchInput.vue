<template>
  <div class=".m-search-input">
    <VueTypeaheadBootstrap
      class="mb-4 search-input-type-ahead"
      size="sm"
      v-model="query"
      :data="[query, ...nameTypeAhead]"
      :serializer="item => item"
      placeholder="Enter taxon name..."
      @input="searchWords"
      @keyup.enter="search"
      :maxMatches="100"
    >
      <template slot="append">
        <BButton 
          size="sm" 
          variant="primary"
        >
          <BIcon 
            icon="search" 
            font-scale="1" 
            @click="search"
          />
        </BButton>
      </template>
    </VueTypeaheadBootstrap>
  </div>
</template>

<script>
import VueTypeaheadBootstrap from "vue-typeahead-bootstrap";
import { debounce } from "lodash";

import gql from "graphql-tag";
var nameTypeAheadGql = gql`
  query nameTypeAhead($q: String!) {
    nameTypeAhead(q: $q)
  }
`;

export default {
  name: "SearchInput",
  components: { VueTypeaheadBootstrap },
  data() {
    return {
      nameTypeAhead: [],
      query: ""
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler: function() {
        if (typeof this.$route.query.q === "string") {
          this.query = this.$route.query.q
            .replace(/[*]/g, "")
            .replace(/\\ /g, " ")
        }
      }
    }
  },
  methods: {
    search: function() {
      this.$router.push({
        path: "/flora/search",
        query: {
          q: `*${this.query}*`.replace(/ /g, "\\ ")
        }
      })
    },
    searchWords: debounce(function() {
      this.$apollo.addSmartQuery("nameTypeAhead", {
        query: nameTypeAheadGql,
        variables: {
          q: `${this.query}`
        },
        result({ data }) {
          return data;
        },
        error(error) {
          console.error("We've got an error!", error)
        }
      })
    }, 1000)
  }
}
</script>

<style lang="scss" scoped>
.mb-4.search-input-type-ahead::v-deep {
  margin-bottom: 0 !important;
  text-align: left;
  font-size: small;
  .list-group-item {
    padding: 5px 10px;
    color: #000;
  }
}
</style>
