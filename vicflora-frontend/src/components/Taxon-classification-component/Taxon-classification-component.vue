<style lang="scss" scoped>
@import "./Taxon-classification-component.scss";
</style>

<template>
  <div>
    <ApolloQuery
      :query="require('../../graphql/queries/taxonConcept.gql')"
      :variables="{ id }"
    >
      <template v-slot="{ result: { loading, error, data } }">
        <!-- Loading -->
        <div v-if="loading" class="loading apollo">Loading...</div>

        <!-- Error -->
        <div v-else-if="error" class="error apollo">{{ error }}</div>

        <!-- Result -->
        <div v-else-if="data" class="result apollo">
          <!-- higherClass -->
          <b-row
            v-for="(higherItem,
            index) in data.taxonConcept.higherClassification
              .slice()
              .sort((a, b) => a.depth - b.depth)"
            :key="higherItem.id"
            class="justify-content-md-left m-row"
          >
            <b-col cols="2" class="text-left">
              <span class="m-taxon-treedefitem-name">
                {{ higherItem.taxonConcept.taxonTreeDefItem.name }}
              </span>
            </b-col>
            <div :style="`margin-left:${index * 3}vw;`" class="text-left">
              <a
                :href="
                  '/flora/classification/taxon/' + higherItem.taxonConcept.id
                "
              >
                <span
                  class="m-taxon-name"
                  :style="
                    higherItem.taxonConcept.taxonTreeDefItem.rankId >=
                    rankClass.genus
                      ? 'font-style:italic;'
                      : 'font-style:normal;'
                  "
                  >{{ higherItem.taxonConcept.taxonName.fullName }}</span
                >&nbsp;
                <span class="m-author">{{
                  higherItem.taxonConcept.taxonName.authorship
                }}</span>
              </a>
            </div>
          </b-row>
          <b-row>
            <b-col class="text-right">
              <b-icon icon="caret-up-fill"></b-icon>
              <span> Higher taxa</span>
            </b-col>
          </b-row>
          <hr class="m-hr-top" />

          <!-- Item -->
          <b-row class="justify-content-md-left">
            <b-col cols="1" class="text-left">
              <span class="m-taxon-treedefitem-name">
                {{ data.taxonConcept.taxonTreeDefItem.name }}
              </span>
            </b-col>
            <div
              :style="
                `margin-left:${(data.taxonConcept.higherClassification.length +
                  1) *
                  3}vw;`
              "
              class="text-left"
            >
              <a :href="'/flora/classification/taxon/' + data.taxonConcept.id">
                <span
                  class="m-taxon-name"
                  :style="
                    data.taxonConcept.taxonTreeDefItem.rankId >= rankClass.genus
                      ? 'font-style:italic;'
                      : 'font-style:normal;'
                  "
                  >{{ data.taxonConcept.taxonName.fullName }}</span
                >&nbsp;
                <span class="m-author">{{
                  data.taxonConcept.taxonName.authorship
                }}</span>
              </a>
            </div>
          </b-row>
          <hr class="m-hr-bottom" />
          <b-row>
            <b-col class="text-right">
              <b-icon icon="caret-down-fill"></b-icon>
              <span> Subordinate taxa</span>
            </b-col>
          </b-row>
          <!-- Child class -->
          <b-row
            v-for="childItem in data.taxonConcept.children
              .slice()
              .sort((a, b) => {
                let fa = a.taxonName.fullName.toLowerCase(),
                  fb = b.taxonName.fullName.toLowerCase();

                if (fa < fb) {
                  return -1;
                }
                if (fa > fb) {
                  return 1;
                }
                return 0;
              })"
            :key="childItem.id"
            class="justify-content-md-left m-row"
          >
            <b-col cols="1" class="text-left">
              <span class="m-taxon-treedefitem-name">
                {{ childItem.taxonTreeDefItem.name }}
              </span>
            </b-col>
            <div
              :style="
                `margin-left:${(data.taxonConcept.higherClassification.length +
                  2) *
                  3}vw;`
              "
              class="text-left"
            >
              <b-link :to="'/flora/classification/taxon/' + childItem.id">
                <span
                  class="m-taxon-name"
                  :style="
                    childItem.taxonTreeDefItem.rankId >= rankClass.genus
                      ? 'font-style:italic;'
                      : 'font-style:normal;'
                  "
                  >{{ childItem.taxonName.fullName }}</span
                >&nbsp;
                <span class="m-author">{{
                  childItem.taxonName.authorship
                }}</span>
              </b-link>
            </div>
          </b-row>
        </div>

        <!-- No result -->
        <div v-else class="no-result apollo">
          <div class="spinner-border mt-5 mb-1" role="status"></div>
          <h5>Loading...</h5>
        </div>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
import gql from "graphql-tag";
export default {
  name: "TaxonClassificationComponent",
  data() {
    return {
      taxonConcept: "",
      higherItemNum: 0,
      id: "6abc498a-70de-11e6-a989-005056b0018f",
      indentNum: 0,
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
      },
    };
  },
  //Apollo-specific options
  fragments: {
    taxonConceptFields: gql`
      fragment taxonConceptFields on TaxonConcept {
        id
        taxonName {
          id
          fullName
          authorship
        }
      }
    `,
  },
  computed: {
    urlId: function() {
      return this.$route.params.id;
    },
  },
  watch: {
    urlId: {
      immediate: true,
      handler: function(val) {
        this.id = val;
      },
    },
  },
};
</script>
