<style lang="scss" scoped>
.taxon::v-deep {
  @import "./Taxon.scss";
}
</style>

<template>
  <div class="taxon">
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
              <b-col>
                <b-breadcrumb>
                  <!-- higherClassification -->
                  <b-breadcrumb-item 
                    v-for="higherItem in data.taxonConcept.higherClassification.slice().sort((a, b) => a.depth - b.depth)" 
                    :key="higherItem.id"
                    :href="'/flora/classification/taxon/' + higherItem.taxonConcept.id">{{higherItem.taxonConcept.taxonName.fullName}}
                  </b-breadcrumb-item>
                  <!-- Siblings -->
                  <b-breadcrumb-item>
                    <div class="m-breadcrumb-selector-item">
                      <b-form-select v-model="urlId" size="sm">
                        <template #first>
                          <b-form-select-option :value="null" disabled>Select sibling...</b-form-select-option>
                        </template>
                        <b-form-select-option 
                          v-for="siblingItem in data.taxonConcept.siblings"
                          :key="siblingItem.id"
                          :value="siblingItem.id"
                        >{{siblingItem.taxonName.fullName}}</b-form-select-option>
                      </b-form-select>
                    </div>
                  </b-breadcrumb-item>
                  <!-- Children -->
                   <b-breadcrumb-item>
                    <div class="m-breadcrumb-selector-item">
                      <b-form-select v-model="childrenSelected" size="sm">
                        <template #first>
                          <b-form-select-option :value="null" disabled>Select child...</b-form-select-option>
                        </template>
                        <b-form-select-option 
                          v-for="childItem in data.taxonConcept.children"
                          :key="childItem.id"
                          :value="childItem.id"
                        >{{childItem.taxonName.fullName}}</b-form-select-option>
                      </b-form-select>
                    </div>
                  </b-breadcrumb-item>
                </b-breadcrumb>
              </b-col>
            </b-row>
            <!-- Name -->
            <b-row>
              <b-col class="text-left">
                <div>
                  <h2
                    class="m-name"
                    :style="
                      data.taxonConcept.taxonTreeDefItem.name === 'genus' ||
                      data.taxonConcept.taxonTreeDefItem.name === 'species' ||
                      data.taxonConcept.taxonTreeDefItem.name ===
                        'subspecies' ||
                      data.taxonConcept.taxonTreeDefItem.name === 'variety'
                        ? 'font-style:italic;'
                        : 'font-style:normal;'
                    "
                  >
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
            <!-- Tabs -->
            <b-tabs v-model="tabIndex" content-class="mt-4 mb-3 m-row" v-else>
              <b-tab title="Overview" active>
                <b-row>
                  <b-col>
                    <!-- Description -->
                    <b-row class="m-row">
                      <!-- text -->
                      <!-- use .replaceAll() to replace the tags in HTML -->
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
                          <span> </span>
                        </div>
                        <!-- Created time -->
                        <div class="m-row">
                          <!-- Created info -->
                          <div>
                            <span class="m-description-title"
                              >Created by:
                            </span>
                            <span>{{
                              `${
                                data.taxonConcept.createdBy.name
                              }, ${data.taxonConcept.createdAt.slice(0, 10)}`
                            }}</span>
                          </div>
                          <!-- Updated info -->
                          <div>
                            <span class="m-description-title"
                              >Updated by:
                            </span>
                            <span>{{
                              `${
                                data.taxonConcept.modifiedBy.name
                              }, ${data.taxonConcept.updatedAt.slice(0, 10)}`
                            }}</span>
                          </div>
                        </div>
                        <div
                          class="m-row"
                          v-if="
                            data.taxonConcept.taxonTreeDefItem.name !==
                            'species'
                          "
                        >
                          <b-button variant="primary"
                            >Key to the
                            {{
                              getBtnText(
                                data.taxonConcept.taxonTreeDefItem.name
                              )
                            }}
                            of
                            {{ data.taxonConcept.taxonName.fullName }}</b-button
                          >
                        </div>
                      </b-col>
                      <!-- img -->
                      <b-col md="4">
                        <a href="#">
                          <b-img
                            @click="() => tabIndex++"
                            thumbnail
                            fluid
                            :src="
                              'https://data.rbg.vic.gov.au/cip/' +
                              data.taxonConcept.heroImage.previewUrl
                            "
                            alt="Hero Image"
                          ></b-img>
                        </a>
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
              </b-tab>
              <b-tab title="Images">
                   <div class="m-images" v-viewer>
                        <p v-if="data.taxonConcept.images.length===0">No Images...</p>
                        <b-img
                            v-else
                            class="m-image"
                            v-for="image in data.taxonConcept.images" :key="image.id"
                            thumbnail
                            fluid
                            :src="
                              'https://data.rbg.vic.gov.au/cip/' +
                              image.previewUrl
                            "
                            :alt="image.id"
                        ></b-img>              
                    </div>
              </b-tab>
              <b-tab title="Specimen Images"
                >
                <div class="m-images" v-viewer>
                  <p v-if="data.taxonConcept.specimenImages.length===0">No Images...</p>
                </div>
                </b-tab
              >
              <b-tab title="Classification" lazy
                >
                <TaxonClassificationComponent></TaxonClassificationComponent>
              </b-tab
              >
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
import "viewerjs/dist/viewer.css";
import Viewer from "v-viewer";
import Vue from "vue";
Vue.use(Viewer);

export default {
  name: "Taxon",
  components: {
    TaxonClassificationComponent,
  },
  data() {
    return {
      id: "32066",
      tabIndex: 1,
      siblingSelected:this.$route.params.id,
      childrenSelected:null,
    };
  },
  methods: {
    getBtnText: function (name) {
      switch (name) {
        case "family":
          return "genera";
        case "genus":
          return "species";
      }
    },
  },
  computed: {
    urlId: {
      get:function () {
          return this.$route.params.id;
        },
      set: function(newVal){
        this.$router.push({
                  path: "/flora/classification/taxon/"+newVal,
        });
      }
    },
  },
  watch: {
    urlId: {
      immediate: true,
      handler: function (val) {
        this.childrenSelected = null
        this.id = val;
      },
    },
    childrenSelected:{
      handler: function(newVal){
        if(this.childrenSelected !== null){
          this.$router.push({
                    path: "/flora/classification/taxon/"+newVal,
          })
          window.location.reload();
        }
      }   
    }
  },
  beforeUpdate:function(){
    this.childrenSelected = null
  }
};
</script>
