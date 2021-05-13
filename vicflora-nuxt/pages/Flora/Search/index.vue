<style lang="scss" scoped>
.m-search::v-deep {
  @import "./Search.scss";
}
</style>

<template>
  <b-container class="m-search">
    <ApolloQuery
      :query="require('@/graphql/queries/search.gql')"
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
                <SearchInput></SearchInput>
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
                      <div>
                        <span class="m-facet-title">Query term:</span>
                        <span>
                          <!-- {{ q }} -->
                          {{ data.search.meta.params.q }}
                          <b-icon
                            v-if="q"
                            icon="x"
                            font-scale="1.1"
                            variant="danger"
                            @click="removeq"
                          ></b-icon>
                        </span>
                      </div>
                      <div v-if="fq.length > 0">
                        <span class="m-facet-title">Filter queries:</span>
                        <li
                          style="margin-left:10px;"
                          v-for="item in fq"
                          :key="item"
                        >
                          <span class="filter-queries-key">{{
                            facetName[item.split(":")[0]]
                              ? facetName[item.split(":")[0]]
                              : item.split(":")[0]
                          }}</span
                          >{{ `: ${item.split(":")[1]}` }}
                          <b-icon
                            v-if="item.split(':')[0] !== 'end_or_higher_taxon'"
                            icon="x"
                            font-scale="1.1"
                            variant="danger"
                            @click="removefqList(item)"
                          ></b-icon>
                        </li>
                      </div>
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

                  <b-collapse
                    visible
                    id="collapse-filter"
                    v-model="filtersFacet"
                  >
                    <b-card>
                      <div
                        v-for="facetField in data.search.facetFields"
                        :key="facetField.fieldName"
                      >
                        <FacetField
                          :facetFields="{ ...facetField }"
                          :removeFilterVal="removeFilterVal"
                          :key="key"
                        ></FacetField>
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
                <b-col align-self="baseline">
                  <div class="mt-0" style="display:inline-block">
                    <b-pagination-nav
                      style="align-items:center;"
                      size="sm"
                      v-model="currentPage"
                      :number-of-pages="
                        data.search.meta.pagination.lastPage === 0
                          ? 1
                          : data.search.meta.pagination.lastPage
                      "
                      base-url="#"
                      first-number
                      last-number
                    ></b-pagination-nav>
                  </div>
                </b-col>
                <b-col cols="3" align-self="baseline" class="text-right">
                  <b-btn size="sm" @click="toDownloadPage">Download</b-btn>
                </b-col>
              </b-row>

              <b-row
                v-for="item in data.search.docs"
                :key="item.id"
                class="m-item text-left"
              >
                <b-col class="text-left mr-auto" cols="auto">
                  <div
                    v-if="
                      item.taxonomicStatus &&
                        item.taxonomicStatus === 'accepted'
                    "
                  >
                    <n-link
                      :to="`/flora/taxon/${item.acceptedNameUsageId}`"
                      class="m-item-name-accepted"
                      :style="
                        rankClass[item.taxonRank] > 140
                          ? 'font-style: italic;'
                          : ''
                      "
                      >{{ item.acceptedNameUsage }}</n-link
                    >
                    <span class="m-item-author">{{
                      item.acceptedNameUsageAuthorship
                    }}</span>
                    <span class="m-item-vernacularname">{{
                      item.vernacularName
                    }}</span>
                  </div>

                  <div v-else>
                    <div
                      :style="
                        item.acceptedNameUsageId ? '' : 'margin-bottom: 10px;'
                      "
                    >
                      <n-link
                        :to="`/flora/taxon/${item.id}`"
                        class="m-item-name"
                        :style="
                          rankClass[item.taxonRank] > 140
                            ? 'font-style: italic;'
                            : ''
                        "
                        >{{ item.scientificName }}</n-link
                      >
                      <span class="m-item-author">{{
                        item.scientificNameAuthorship
                      }}</span>
                    </div>
                    <div v-if="item.acceptedNameUsageId">
                      <span>{{ `= ` }}</span>
                      <n-link
                        :to="`/flora/taxon/${item.acceptedNameUsageId}`"
                        class="m-item-name-accepted"
                        :style="
                          rankClass[item.taxonRank] > 140
                            ? 'font-style: italic;'
                            : ''
                        "
                        >{{ item.acceptedNameUsage }}</n-link
                      >
                      <span class="m-item-author">{{
                        item.acceptedNameUsageAuthorship
                      }}</span>
                      <span class="m-item-vernacularname">{{
                        item.vernacularName
                      }}</span>
                    </div>
                  </div>
                </b-col>
                <b-col cols="auto" class="m-responsive-disappear">
                  <span class="m-item-familyname">{{ item.family }}</span>
                </b-col>
              </b-row>

              <b-row align-v="baseline" class="mb-4">
                <b-col class="text-left" cols="3" align-self="baseline">
                </b-col>
                <b-col align-self="baseline">
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
        <div v-else class="no-result apollo">
          <div class="spinner-border mt-5 mb-1" role="status"></div>
          <h5>Loading...</h5>
        </div>
      </template>
    </ApolloQuery>
  </b-container>
</template>

<script>
import FacetField from "@/components/Facets-collapse/Facets-collapse";
import SearchInput from "@/components/Search-input/Search-input";
export default {
  name: "Search",
  components: {
    FacetField,
    SearchInput
  },
  data() {
    return {
      exclusionCheckbox: false,
      key: 0,
      currentPage: 1,
      selectedFq: {},
      selectedFqList: {},
      removeFilterVal: "",
      input: {
        q: "**",
        rows: 50,
        page: 1,
        fq: this.$route.query.fq
      },
      inputText: "",
      search: "",
      rankClass: {
        life: -9999,
        kingdom: 10,
        phylum: 30,
        class: 60,
        superorder: 90,
        order: 100,
        family: 140,
        genus: 180,
        species: 220,
        subspecies: 230
      },
      filtersFacet: true,
      queryFacet: true,
      facetName: {
        name_type: "Type of name",
        taxonomic_status: "Taxonomic status",
        taxon_rank: "Taxon rank",
        occurrence_status: "Occurrence status",
        establishment_means: "Establishment means",
        threat_status: "Threat status",
        class: "Class",
        subclass: "Subclass",
        superorder: "Superorder",
        order: "Order",
        family: "Family",
        ibra_7_subregion: "Subregion",
        nrm_region: "Bioregion",
        media: "Media"
      }
    };
  },
  methods: {
    checkText: function() {
      this.$router.push({
        query: {
          q: `*${this.inputText}*`
        }
      });
      this.input = {
        ...this.input,
        q: `*${this.inputText}*`
      };
    },
    removeq: function() {
      this.inputText = "";
      this.$router.push({
        query: {
          q: `**`
        }
      });
      this.input = {
        ...this.input,
        q: `**`
      };
    },
    removefqList: function(val) {
      if (val[0] === "-") {
        this.$router.push({
          query: {
            q: this.q,
            fq: this.fq.filter(word => word !== val)
          }
        });
      }
      this.removeFilterVal = val;
    },
    toDownloadPage: function() {
      this.$router.push({
        path: "/flora/Download",
        query: this.$route.query
      });
    }
  },
  computed: {
    q: function() {
      return this.$route.query.q;
    },
    fq: function() {
      // more than 1 filter in fq
      if (typeof this.$route.query.fq === "object") {
        return this.$route.query.fq;
        //1 filter in fq
      } else if (typeof this.$route.query.fq === "string") {
        return [this.$route.query.fq];
        // null in fq
      } else {
        return "";
      }
    }
  },
  watch: {
    currentPage: function(newVal) {
      this.input = {
        ...this.input,
        page: newVal
      };
    },
    fq: {
      immediate: true,
      handler: function() {
        this.input = {
          ...this.input,
          fq: this.$route.query.fq
        };
      }
    },
    q: {
      immediate: true,
      handler: function() {
        this.input = {
          ...this.input,
          q: this.q
        };
      }
    },
    exclusionCheckbox: function(newVal, oldVal) {
      if (newVal === true && oldVal === false) {
        this.$router.push({
          query: {
            q: this.q,
            fq: [...this.fq, "end_or_higher_taxon:end"]
          }
        });
      }
      if (newVal === false && oldVal === true) {
        this.$router.push({
          query: {
            q: this.q,
            fq: this.fq.filter(word => word !== "end_or_higher_taxon:end")
          }
        });
      }
    }
  },
  mounted() {
    this.exclusionCheckbox = this.fq.includes("end_or_higher_taxon:end");
    // change the status of collapse
    if (window.innerWidth < 992) {
      this.filtersFacet = false;
    }
  }
};
</script>
