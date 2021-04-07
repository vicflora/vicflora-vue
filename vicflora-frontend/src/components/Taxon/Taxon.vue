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
        :variables="{ id, imagesPage, specimenImagesPage }"
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
                    v-for="higherItem in data.taxonConceptByGUID.higherClassification.slice().sort((a, b) => a.depth - b.depth).slice(3)" 
                    :key="higherItem.id"
                    :href="'/flora/classification/taxon/' + higherItem.taxonConcept.guid">{{higherItem.taxonConcept.taxonName.fullName}}
                  </b-breadcrumb-item>
                  <!-- Siblings -->
                  <b-breadcrumb-item>
                    <div class="m-breadcrumb-selector-item">
                      <b-form-select v-model="urlId" size="sm">
                        <template #first>
                          <b-form-select-option :value="null" disabled>Select sibling...</b-form-select-option>
                        </template>
                        <b-form-select-option 
                          v-for="siblingItem in data.taxonConceptByGUID.siblings"
                          :key="siblingItem.id"
                          :value="siblingItem.guid"
                        >{{siblingItem.taxonName.fullName}}</b-form-select-option>
                      </b-form-select>
                    </div>
                  </b-breadcrumb-item>
                  <!-- Children -->
                   <b-breadcrumb-item v-if="data.taxonConceptByGUID.children.length !== 0">
                    <div class="m-breadcrumb-selector-item">
                      <b-form-select v-model="childrenSelected" size="sm">
                        <template #first>
                          <b-form-select-option :value="null" disabled>Select child...</b-form-select-option>
                        </template>
                        <b-form-select-option 
                          v-for="childItem in data.taxonConceptByGUID.children"
                          :key="childItem.id"
                          :value="childItem.guid"
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
                      data.taxonConceptByGUID.taxonTreeDefItem.rankId>=rankClass.genus
                        ? 'font-style:italic;'
                        : 'font-style:normal;'
                    "
                  >
                    {{ data.taxonConceptByGUID.taxonName.fullName }}
                  </h2>
                  <span class="m-authorship">{{ data.taxonConceptByGUID.taxonName.authorship }}</span>
                  <span v-if="data.taxonConceptByGUID.preferredVernacularName" class="m-vernacular-names">{{ data.taxonConceptByGUID.preferredVernacularName.name }}</span>
                </div>
                <div class="m-protologue" v-if="data.taxonConceptByGUID.taxonName.protologue">
                  <i>{{ data.taxonConceptByGUID.taxonName.protologue.title}}</i>
                  <b>{{ data.taxonConceptByGUID.taxonName.protologue.volume+': '}}</b>
                  <span>{{ data.taxonConceptByGUID.taxonName.protologue.pages}}</span>

                </div>
              </b-col>
            </b-row>
            <!-- Status -->
            <b-row class="m-row">
              <b-col class="text-left">
                <b-row v-if="data.taxonConceptByGUID.taxonomicStatus">
                  <b-col>
                    <p class="m-status-class">Taxonomic status:</p>
                    <span class="m-status-content">{{
                      data.taxonConceptByGUID.taxonomicStatus.name
                    }}</span>
                  </b-col>
                </b-row>

                <b-row v-if="data.taxonConceptByGUID.occurrenceStatus">
                  <b-col>
                    <p class="m-status-class">Occurrence status:</p>
                    <span class="m-status-content">{{
                      data.taxonConceptByGUID.occurrenceStatus.name
                    }}</span>
                  </b-col>
                </b-row>

                <b-row v-if="data.taxonConceptByGUID.establishmentMeans">
                  <b-col>
                    <p class="m-status-class">Establishment means:</p>
                    <span class="m-status-content">{{
                      data.taxonConceptByGUID.establishmentMeans.name
                    }}</span>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
            <!-- classification -->
            <b-row
              class="m-row"
              v-if="
                data.taxonConceptByGUID.taxonTreeDefItem.rankId < rankClass.family
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
                        v-if="data.taxonConceptByGUID.currentProfile"
                        lg="8"
                      >
                        <div
                          v-html="data.taxonConceptByGUID.currentProfile.profile"
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
                                data.taxonConceptByGUID.createdBy.name
                              }, ${data.taxonConceptByGUID.createdAt.slice(0, 10)}`
                            }}</span>
                          </div>
                          <!-- Updated info -->
                          <div>
                            <span class="m-description-title"
                              >Updated by:
                            </span>
                            <span>{{
                              `${
                                data.taxonConceptByGUID.modifiedBy.name
                              }, ${data.taxonConceptByGUID.updatedAt.slice(0, 10)}`
                            }}</span>
                          </div>
                        </div>
                        <div
                          class="m-row"
                          v-if="
                            data.taxonConceptByGUID.taxonTreeDefItem.name !==
                            'species'
                          "
                        >
                          <b-button variant="primary"
                            >Key to the
                            {{
                              getBtnText(
                                data.taxonConceptByGUID.taxonTreeDefItem.name
                              )
                            }}
                            of
                            {{ data.taxonConceptByGUID.taxonName.fullName }}</b-button
                          >
                        </div>
                      </b-col>
                      
                      <b-col lg="4" align-self="center" >
                        <!-- Hero img -->
                        <div class="m-heroimage-container" v-if="data.taxonConceptByGUID.heroImage">
                          <a  @click="() => data.taxonConceptByGUID.images.data.length>0?tabIndex=1:''">
                            <img                            
                              :src="
                                data.taxonConceptByGUID.heroImage.thumbnailUrl
                              "
                              alt="Hero Image"
                            >
                          </a>
                        </div>
                        
                        <!-- Map -->
                        <div href="#" class="m-heroimage-container" v-if="data.taxonConceptByGUID.bioregions.length!==0">
                          <a @click="() => data.taxonConceptByGUID.images.data.length>0?tabIndex=3:''">
                            <img
                              class="m-dictribution-map"
                              :src="data.taxonConceptByGUID.mapLinks.profileMap"
                              alt="Map"
                            >
                          </a>
                        </div>
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
              </b-tab>
              <b-tab title="Images" v-if="data.taxonConceptByGUID.images.data.length>0">
                   <div class="m-images" >
                        <p v-if="data.taxonConceptByGUID.images.data.length===0">No Images...</p>
                        <div v-else v-for="image in data.taxonConceptByGUID.images.data" 
                            :key="image.id" class="m-image-container" v-viewer="viewerOptions">
                          <b-img 
                            thumbnail
                            fluid
                            :src="image.thumbnailUrl"
                            :data-src="image.previewUrl"
                            :alt="`${data.taxonConceptByGUID.taxonName.fullName}. ${image.caption?image.caption:''}
                            ${image.subtype?image.subtype:''}: ${image.creator?image.creator:''}
                            ${image.rights?image.rights:''}
                            `"
                        >
                          </b-img>   
                        </div>                    
                  </div>          
                   
                    <div>
                      <b-pagination-nav
                        v-if="data.taxonConceptByGUID.images.paginatorInfo.total>24"
                        class="mt-3 mb-5"
                        v-model="imagesPage"
                        :number-of-pages="data.taxonConceptByGUID.images.paginatorInfo.total%24===0 ?data.taxonConceptByGUID.images.paginatorInfo.total/24:data.taxonConceptByGUID.images.paginatorInfo.total/24+1"
                        base-url="#"
                        first-number
                        last-number
                        align="center"
                      ></b-pagination-nav>
                    </div>
              </b-tab>
              <!-- Specimen images -->
              <b-tab title="Specimen Images" v-if="data.taxonConceptByGUID.specimenImages.data.length>0"
                >
               <div class="m-images">
                        <p v-if="data.taxonConceptByGUID.specimenImages.data.length===0">No Images...</p>
                        <div 
                            v-else v-for="image in data.taxonConceptByGUID.specimenImages.data" 
                            :key="image.id" class="m-image-container"
                            @click="()=>{specimenImagesModal=image}"
                            >
                          <b-img 
                            thumbnail
                            fluid   
                            :src="image.thumbnailUrl"
                            :data-src="image.previewUrl"
                            :alt="`${data.taxonConceptByGUID.taxonName.fullName}. ${image.caption?image.caption:''}
                            ${image.subtype?image.subtype:''}: ${image.creator?image.creator:''}
                            ${image.rights?image.rights:''}
                            `"  
                          >
                          </b-img>                                      
                        </div>  
                        <div class="modal m-modal-class" :style="'display:'+ `${specimenImagesModal?'flex':'none'}`" v-if="specimenImagesModal">                           
                            <div class="modal-content">
                              <div class="modal-header">
                                <h6 class="modal-title">{{specimenImagesModal.caption}}</h6>
                                <button type="button" class="close" @click="()=>{specimenImagesModal=null}">
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </div>
                              <div class="modal-body">
                                <iframe
                                class="m-modal-iframe"
                                :src="'https://vicflora.rbg.vic.gov.au/flora/specimen_image_viewer/'+specimenImagesModal.alaImageUuid">
                                </iframe>
                              </div>
                            </div>                           
                        </div>                    
                </div>       
                <div>
                  <b-pagination-nav
                    class="mt-3 mb-5"
                    v-if="data.taxonConceptByGUID.specimenImages.paginatorInfo.total>24"
                    v-model="imagesPage"
                    :number-of-pages="data.taxonConceptByGUID.specimenImages.paginatorInfo.total%24===0 ?data.taxonConceptByGUID.specimenImages.paginatorInfo.total/24:data.taxonConceptByGUID.specimenImages.paginatorInfo.total/24+1"
                    base-url="#"
                    first-number
                    last-number
                    align="center"
                  ></b-pagination-nav>
                </div>  
              </b-tab>
              <!-- Distribution -->
              <b-tab title="Distribution" v-if="data.taxonConceptByGUID.bioregions.length!==0">
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
                            :src="data.taxonConceptByGUID.mapLinks.distributionMap"
                            usemap="#vicflora_bioregion"
                            :alt="'Distribution of '+  data.taxonConceptByGUID.taxonName.fullName"
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
                        <p v-html="data.taxonConceptByGUID.mapLinks.mapSource"></p>
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
                      <tr v-for="bioregionItem in data.taxonConceptByGUID.bioregions" :key="bioregionItem.id">
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
      id: "6abc498a-70de-11e6-a989-005056b0018f",
      tabIndex: 1,
      siblingSelected:this.$route.params.id,
      childrenSelected:null,
      imagesPage:1,
      specimenImagesPage:1,
      specimenImagesModal:null,
      viewerOptions: {
        url: 'data-src'
      },
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
      }
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
                    path: "/flora/classification/taxon/"+ newVal,
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
