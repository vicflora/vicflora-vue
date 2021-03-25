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
                    v-for="higherItem in data.taxonConcept.higherClassification.slice().sort((a, b) => a.depth - b.depth).slice(3)" 
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
                   <b-breadcrumb-item v-if="data.taxonConcept.children.length !== 0">
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
                <div class="m-title">
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
                  <span class="m-authorship">{{ data.taxonConcept.taxonName.authorship }}</span>
                  <span v-if="data.taxonConcept.preferredVernacularName" class="m-vernacular-names">{{ data.taxonConcept.preferredVernacularName.name }}</span>
                </div>
                <div class="m-protologue" v-if="data.taxonConcept.taxonName.protologue">
                  <i>{{ data.taxonConcept.taxonName.protologue.title}}</i>
                  <b>{{ data.taxonConcept.taxonName.protologue.volume+': '}}</b>
                  <span>{{ data.taxonConcept.taxonName.protologue.pages}}</span>

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
              <b-tab title="Overview" active class="m-tab-title">
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
                      
                      <b-col md="4">
                        <!-- Hero img -->
                        <div class="m-heroimage-container" v-if="data.taxonConcept.heroImage">
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
                        </div>
                        
                        <!-- Map -->
                        <a href="#">
                          <b-img
                            class="m-dictribution-map"
                            thumbnail
                            fluid
                            :src="data.taxonConcept.mapLinks.profileMap"
                            alt="Map"
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
                        <div v-else v-for="image in data.taxonConcept.images" 
                            :key="image.id" class="m-image-container">
                          <b-img 
                            thumbnail
                            fluid
                            :src="
                              'https://data.rbg.vic.gov.au/cip/' +
                              image.previewUrl
                            "
                            :alt="`${data.taxonConcept.taxonName.fullName}. ${image.caption?image.caption:''}
                            ${image.subtype?image.subtype:''}: ${image.creator?image.creator:''}
                            ${image.rights?image.rights:''}
                            `"
                        >
                          </b-img>   
                        </div>
                          
                    </div>
              </b-tab>
              <!-- Specimen images -->
              <b-tab title="Specimen Images"
                >
                <div class="m-images" v-viewer>
                  <p v-if="data.taxonConcept.specimenImages.length===0">No Images...</p>
                </div>
              </b-tab>
              <!-- Distribution -->
              <b-tab title="Distribution">
                <b-row>
                  <b-col class="text-left">
                    <h4 class="m-distribution-title">Distribution</h4>
                  </b-col>
                </b-row>
                <b-row>
                  <!-- Map -->
                  <b-col lg="6" cols="12">
                    <div class="m-images">
                      <figure>
                        <div class="m-map-container">
                          <img
                            :src="data.taxonConcept.mapLinks.distributionMap"
                            usemap="#vicflora_bioregion"
                            :alt="'Distribution of '+  data.taxonConcept.taxonName.fullName"
                          >
                          <DistributionMapConfig></DistributionMapConfig>
                        </div>
                      </figure>
                      <div class="m-legend">
                        <b-dropdown id="dropdown-left" text="Legend" variant="primary" size="sm">
                          <b-dropdown-item>
                            <img src="https://vicflora.rbg.vic.gov.au/images/vicflora-map-legend.png">
                          </b-dropdown-item>
                        </b-dropdown>
                      </div>          
                    </div>
                    <b-row>
                      <b-col class="text-left">
                        <b>Source:</b>
                      </b-col>
                    </b-row>
                  </b-col> 
                  <!-- Map table -->
                  <b-col lg="6" cols="12" class="m-table">
                    <table>
                      <tr>
                        <th></th>
                        <th>Bioregion</th>
                        <th>Occurrence status</th>
                        <th>Establishment means</th>
                      </tr>
                      <tr v-for="bioregionItem in data.taxonConcept.bioregions" :key="bioregionItem.id">
                        <td><div class="m-table-color-box" :style="`background-color: ${bioregionItem.occurrenceStatus.name==='extinct'?'#e9aaff':'#a4f27d'};`"></div></td>
                        <td>{{bioregionItem.bioregion.properties.subregion}}</td>
                        <td>{{bioregionItem.occurrenceStatus.name}}</td>
                        <td>{{bioregionItem.establishmentMeans.name}}</td>
                      </tr>
                    </table>
                    <div class="text-right mt-4">
                      <b-link >Bioregions of Victoria</b-link>
                    </div>
                  </b-col>                
                </b-row>
                
              </b-tab>
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
import DistributionMapConfig from "../Distribution-map-config/Distribution-map-config";
import TaxonClassificationComponent from "../Taxon-classification-component/Taxon-classification-component";
import "viewerjs/dist/viewer.css";
import Viewer from "v-viewer";
import Vue from "vue";
Vue.use(Viewer);

export default {
  name: "Taxon",
  components: {
    TaxonClassificationComponent,
    DistributionMapConfig,
  },
  data() {
    return {
      id: "32066",
      tabIndex: 1,
      siblingSelected:this.$route.params.id,
      childrenSelected:null,
      viewerOptions: {
        inline: true,
        button: true,
        navbar: true,
        title: true,
        toolbar: true,
        tooltip: true,
        movable: true,
        zoomable: true,
        rotatable: true,
        scalable: true,
        transition: true,
        fullscreen: true,
        keyboard: true,
        url: 'data-source'
      },
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
