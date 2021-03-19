<style lang="scss" scoped>
@import "./Taxon.scss";
</style>

<template>
  <div>
    <b-container>
      <ApolloQuery
        :query="require('../../graphql/queries/taxonConcept-description.gql')"
        :variables="{ id }"
      >
        <template v-slot="{ result: { loading, error, data } }">
          <!-- Loading -->
          <div v-if="loading" class="loading apollo">Loading...</div>

          <!-- Error -->
          <div v-else-if="error" class="error apollo">An error occurred</div>

          <!-- Result -->
          <div v-else-if="data" class="result apollo">
            <!-- Breadcrumb -->
            <b-row>
              Breadcrumb
            </b-row>
            <!-- Name -->
            <b-row>
              <b-col class="text-left">
                <div>
                  <h2 class="m-name">
                    {{ data.taxonConcept.taxonName.fullName }}
                  </h2>
                </div>
              </b-col>
            </b-row>
            <!-- Status -->
            <b-row class="m-row">
              <b-col class="text-left">
                <b-row v-if="data.taxonConcept.taxonomicStatus">
                  <b-col>
                    <p class="m-status-class">Taxonomic status:</p>
                    <span class="m-status-content">{{
                      data.taxonConcept.taxonomicStatus.name
                    }}</span>
                  </b-col>
                </b-row>

                <b-row v-if="data.taxonConcept.occurrenceStatus">
                  <b-col>
                    <p class="m-status-class">Occurrence status:</p>
                    <span class="m-status-content">{{
                      data.taxonConcept.occurrenceStatus.name
                    }}</span>
                  </b-col>
                </b-row>

                <b-row v-if="data.taxonConcept.establishmentMeans">
                  <b-col>
                    <p class="m-status-class">Establishment means:</p>
                    <span class="m-status-content">{{
                      data.taxonConcept.establishmentMeans.name
                    }}</span>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
            <!-- classification -->
            <b-row
              class="m-row"
              v-if="
                data.taxonConcept.taxonTreeDefItem.name !== 'family' &&
                  data.taxonConcept.taxonTreeDefItem.name !== 'genus' &&
                  data.taxonConcept.taxonTreeDefItem.name !== 'species' &&
                  data.taxonConcept.taxonTreeDefItem.name !== 'subspecies' &&
                  data.taxonConcept.taxonTreeDefItem.name !== 'variety'
              "
            >
              <b-col class="text-left">
                <p class="m-status-class">Classification</p>
                <TaxonClassificationComponent></TaxonClassificationComponent>
              </b-col>
            </b-row>

            <b-tabs v-model="tabIndex" content-class="mt-4 mb-3 m-row" v-else>
                <b-tab title="Overview">
                    <b-row>
                        <b-col>
                            <!-- Description -->
                            <b-row class="m-row">
                            <!-- text -->
                            <b-col
                                class="text-left"
                                v-if="data.taxonConcept.currentProfile"
                            >
                                <div
                                v-html="data.taxonConcept.currentProfile.profile"
                                ></div>
                                <!-- Source -->
                                <div class="m-row">
                                    <span class="m-description-title">Source: </span>
                                    <span>
                                        
                                    </span>
                                </div>
                                <!-- Created time -->
                                <div class="m-row">
                                    <!-- Created info -->
                                    <div>
                                        <span class="m-description-title">Created by: </span>
                                        <span>{{`${data.taxonConcept.createdBy.name}, ${data.taxonConcept.createdAt.slice(0,10)}`}}</span>
                                    </div>
                                    <!-- Updated info -->
                                    <div>
                                        <span class="m-description-title">Updated by: </span>
                                        <span>{{`${data.taxonConcept.modifiedBy.name}, ${data.taxonConcept.updatedAt.slice(0,10)}`}}</span>
                                    </div>
                                </div>
                                <div class="m-row" v-if="data.taxonConcept.taxonTreeDefItem.name !== 'species'">
                                    <b-button variant="primary">Key to the {{getBtnText(data.taxonConcept.taxonTreeDefItem.name)}} of {{data.taxonConcept.taxonName.fullName}}</b-button>
                                </div>
                            </b-col>
                            <!-- img -->
                            <b-col md="4">
                                <a>
                                    <b-img @click="tabIndex++" thumbnail fluid :src="'https://data.rbg.vic.gov.au/cip/'+data.taxonConcept.heroImage.previewUrl" alt="Hero Image"></b-img>
                                </a>
                            </b-col>
                            </b-row>
                        </b-col>
                    </b-row>
                </b-tab>
                <b-tab title="Images" lazy><b-alert show>I'm lazy mounted too!</b-alert></b-tab>           
                <b-tab title="Specimen Images" lazy><b-alert show>I'm lazy mounted too!</b-alert></b-tab>
                <b-tab title="Classification" lazy><b-alert show>I'm lazy mounted too!</b-alert></b-tab>
                </b-tabs>

          </div>

          <!-- No result -->
          <div v-else class="no-result apollo">Loading...No result</div>
        </template>
      </ApolloQuery>
    </b-container>
  </div>
</template>

<script>
import TaxonClassificationComponent from "../Taxon-classification-component/Taxon-classification-component";
export default {
  name: "Taxon",
  components: {
    TaxonClassificationComponent,
  },
  data() {
    return {
      id: "32066",
      tabIndex: 1,
    };
  },
  methods: {
    getBtnText: function (name){
                    switch(name){
                        case 'family': return 'genera';
                        case 'genus' : return 'species';
                    }
    },
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
