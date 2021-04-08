<style lang="scss" scoped>
.m-search::v-deep {
  @import "./Search.scss";
}
</style>

<template>
  <b-container class="m-search">
    <ApolloQuery
      :query="require('../../graphql/queries/search.gql')"
      :variables="{ input }"
    >
      <template v-slot="{ result: { loading, error, data } }">
        <!-- Loading -->
        <div v-if="loading" class="loading apollo">Loading...</div>

        <!-- Error -->
        <div v-else-if="error" class="error apollo">An error occurred</div>

        <!-- Result -->
        <div v-else-if="data" class="result apollo">
          <b-row>
            <b-col class="text-left">
              <div class="m-main-title">
                <h2>
                  Search
                </h2>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col lg="4" cols="12" class="text-left">
              <div class="m-row">
                <b-input-group>
                  <b-form-input
                    v-model="inputText"
                    size="sm"
                    @change="checkText"
                    placeholder="Enter taxon name..."
                  ></b-form-input>
                  <b-input-group-append>
                    <b-button size="sm">
                      <b-icon font-scale="1" icon="search" />
                    </b-button>
                  </b-input-group-append>
                </b-input-group>
              </div>
              <div class="m-row">
                <b-form-checkbox v-model="exclusionCheckbox">
                  Exclude higher taxa
                </b-form-checkbox>
              </div>
              <!-- Query -->
              <div>
                <div>
                  <span
                    aria-controls="collapse-query"
                    @click="queryFacet = !queryFacet"
                    class="m-subtitle"
                    
                >
                    Query
                    <b-icon icon="caret-down-fill" v-if="queryFacet"></b-icon>
                    <b-icon icon="caret-right-fill" v-else></b-icon>
                  </span>

                  <b-collapse visible id="collapse-query" v-model="queryFacet">
                    <b-card>
                        <span class="m-facet-title">Query term:</span>
                        <span>
                           {{input.q}} 
                           <b-icon icon="x" font-scale="1.1" variant="danger"></b-icon>
                        </span>
                        
                    </b-card>
                  </b-collapse>
                </div>
              </div>
              <!-- Filters -->
              <div>
                <div>
                  <span 
                  class="m-subtitle" 
         
                  aria-controls="collapse-filter"
                 @click="filtersFacet = !filtersFacet"
                  >
                    Filters
                    <b-icon icon="caret-down-fill" v-if="filtersFacet"></b-icon>
                    <b-icon icon="caret-right-fill" v-else></b-icon>
                  </span>

                  <b-collapse  visible id="collapse-filter" v-model="filtersFacet">
                    <b-card>
                        <div v-for="facetField in data.search.facetFields" :key="facetField.fieldName" >
                            <!-- <p class="m-facet-title mb-1 mt-3">{{facetName[facetField.fieldName]}}</p>
                            <p class="mb-1"
                            v-for="facet in facetField.facets" :key="facet.value">
                                {{facet.value}}
                            </p> -->
                            <FacetField :facetField="facetField"></FacetField>
                        </div>
                    </b-card>
                  </b-collapse>
                </div>
              </div>

            </b-col>

            <b-col lg="8" cols="12">
              <b-row align-v="baseline">
                <b-col class="text-left" cols="3" align-self="baseline">
                  <span>{{ data.search.meta.pagination.total }} matches</span>
                </b-col>
                <b-col align-self="baseline" >
                  <div class="mt-0" style="display:inline-block">
                    <b-pagination-nav
                      style="align-items:center;"
                      size="sm"
                      v-model="currentPage"
                      :number-of-pages="data.search.meta.pagination.lastPage"
                      base-url="#"
                      first-number
                      last-number
                    ></b-pagination-nav>
                  </div>
                </b-col>
                <b-col cols="3" align-self="baseline" class="text-right">
                  <b-btn size="sm">Download</b-btn>
                </b-col>
              </b-row>
              <b-row>
                <b-col class="text-left mb-4" cols="12">
                  <b-row v-for="item in data.search.docs" :key="item.id" class="m-item">
                      <b-col cols="8">
                          <a :href="`/flora/classification/taxon/${item.id}`" class="m-item-name" :style="rankClass[item.taxonRank]>140?'font-style: italic;':''">{{ item.scientificName }}</a>
                          <span class="m-item-author">{{ item.scientificNameAuthorship }}</span>
                          <span class="m-item-vernacularname">{{ item.vernacularName }}</span>
                      </b-col>
                      <b-col class="text-right">
                          <span class="m-item-familyname">{{ item.family }}</span>
                      </b-col>
                  </b-row>
                </b-col>
              </b-row>

              <b-row align-v="baseline" class="mb-4">
                <b-col class="text-left" cols="3" align-self="baseline">
                </b-col>
                <b-col align-self="baseline" >
                  <div class="mt-0" style="display:inline-block">
                    <b-pagination-nav
                      style="align-items:center;"
                      size="sm"
                      v-model="currentPage"
                      :number-of-pages="data.search.meta.pagination.lastPage"
                      base-url="#"
                      first-number
                      last-number
                    ></b-pagination-nav>
                  </div>
                </b-col>
                <b-col cols="3" align-self="baseline" class="text-right">
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </div>
        <!-- No result -->
        <div v-else class="no-result apollo">No result :(</div>
      </template>
    </ApolloQuery>
  </b-container>
</template>

<script>
import FacetField from "../../components/Facets-collapse/Facets-collapse"
export default {
  name: "Search",
  components: {
      FacetField,
      },
  data() {
    return {
      exclusionCheckbox: false,
      currentPage: 1,
      input: {
        q: "**",
        rows: 50,
        page: 1,
      },
      inputText: "",
      search: "",
      rankClass:{
        life: -9999,
        kingdom: 10,
        phylum: 30,
        class:60,
        superorder:90,
        order:100,
        family:140,
        genus:180,
        species:220,
        subspecies: 230,
      },
      filtersFacet:true,
      queryFacet:true,
    };
  },
  methods: {
    checkText: function() {
    //   if (this.inputText.length < 2) {
    //     return;
    //   }
      this.input = {
        ...this.input,
        q: `*${this.inputText}*`,
      };

    },
  },
  computed: {
    // input:function(){
    // }
  },
  watch: {
    currentPage: function(newVal) {
      this.input = {       
          ...this.input,
          page: newVal,
      }
    },
  },
};
</script>
