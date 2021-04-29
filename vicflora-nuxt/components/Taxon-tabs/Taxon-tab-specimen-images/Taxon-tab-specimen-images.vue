<style lang="scss" scoped>
@import "./Taxon-tab-specimen-images.scss";
</style>

<template>
  <ApolloQuery
    :query="require('@/graphql/queries/taxonSpecimenImages.gql')"
    :variables="{ id, specimenImagesPage }"
  >
    <template v-slot="{ result: { loading, error, data } }">
      <!-- Loading -->
      <div v-if="loading" class="loading apollo">Loading...</div>

      <!-- Error -->
      <div v-else-if="error" class="error apollo">An error occurred</div>

      <!-- Result -->
      <div v-else-if="data" class="result apollo">
        <div class="m-images">
          <p v-if="data.taxonConcept.specimenImages.data.length === 0">
            No Images...
          </p>
          <div
            v-else
            v-for="image in data.taxonConcept.specimenImages.data"
            :key="image.id"
            class="m-image-container"
            @click="
              () => {
                specimenImagesModal = image;
              }
            "
          >
            <TaxonTabImageContainer :data="data" :image="image"></TaxonTabImageContainer>
          </div>
          <div
            class="modal m-modal-class"
            :style="'display:' + `${specimenImagesModal ? 'flex' : 'none'}`"
            v-if="specimenImagesModal"
          >
            <div class="modal-content">
              <div class="modal-header">
                <h6 class="modal-title">
                  {{ specimenImagesModal.caption }}
                </h6>
                <button
                  type="button"
                  class="close"
                  @click="
                    () => {
                      specimenImagesModal = null;
                    }
                  "
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <iframe
                  class="m-modal-iframe"
                  :src="
                    'https://vicflora.rbg.vic.gov.au/flora/specimen_image_viewer/' +
                      specimenImagesModal.alaImageUuid
                  "
                >
                </iframe>
              </div>
            </div>
          </div>
        </div>
        <div>
          <b-pagination-nav
            class="mt-3 mb-5"
            v-if="data.taxonConcept.specimenImages.paginatorInfo.total > 24"
            v-model="imagesPage"
            :number-of-pages="
              data.taxonConcept.specimenImages.paginatorInfo.total % 24 === 0
                ? data.taxonConcept.specimenImages.paginatorInfo.total / 24
                : data.taxonConcept.specimenImages.paginatorInfo.total / 24 + 1
            "
            base-url="#"
            first-number
            last-number
            align="center"
          ></b-pagination-nav>
        </div>
      </div>
    </template>
  </ApolloQuery>
</template>

<script>
import TaxonTabImageContainer from "@/components/Taxon-tabs/Taxon-tab-image-container/Taxon-tab-image-container";

import "viewerjs/dist/viewer.css";
import Viewer from "v-viewer";
import Vue from "vue";
Vue.use(Viewer);

export default {
  name: "TaxonTabSpecimenImages",
  props: [],
  components:{TaxonTabImageContainer},
  data() {
    return {
      specimenImagesPage: 1,
      specimenImagesModal: null,
      viewerOptions: {
        url: "data-src"
      }
    };
  },
  computed: {
    id: function() {
      return this.$route.params.id;
    }
  },
};
</script>
