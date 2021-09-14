<template>
  <ApolloQuery
    :query="TaxonConceptSpecimenImagesQuery"
    :variables="{ id: id, first: 24, page: page }"
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
          <TaxonTabImagesPaginator 
            :images="data.taxonConcept.specimenImages"
            :first="first"
            :page="page"
            @pageChanged="onPageChanged"
          />
        </div>
      </div>
    </template>
  </ApolloQuery>
</template>

<script>
import TaxonTabImageContainer from "@/components/Taxon/TaxonTabImageContainer"
import TaxonTabImagesPaginator from "@/components/Taxon/TaxonTabImagesPaginator"
import TaxonConceptSpecimenImagesQuery from "~/graphql/queries/TaxonConceptSpecimenImagesQuery"
import { imagePaginatorMixin } from "~/mixins/imagePaginatorMixin"

export default {
  name: "TaxonTabSpecimenImages",
  components: {
    TaxonTabImageContainer,
    TaxonTabImagesPaginator
  },
  mixins: [
    imagePaginatorMixin
  ],
  data() {
    return {
      TaxonConceptSpecimenImagesQuery,
      specimenImagesModal: null,
    }
  },
  computed: {
    id: function() {
      return this.$route.params.id
    }
  }
}
</script>

<style lang="scss" scoped>
.m-images {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  .m-map-container {
    width: 480px;
    height: 290px;
  }

  .m-image-container {
    width: 175px;
    height: 180px;
    margin-bottom: 5px;
    margin-right: 5px;
    padding: 2px;
    background-color: #fff;
    border: 1px solid #dee2e6;
    border-radius: 0.25rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    img {
      max-width: 170px;
      max-height: 170px;
      padding: 0;
      background-color: none;
      border: none;
      border-radius: none;
    }
  }
}

.m-modal-class {
  background-color: fade-in($color: #00000069, $amount: 0);
  .modal-content {
    margin: 5vh 10vw;
    .modal-header {
      .modal-title {
        font-family: "goodsans-medium";
      }
    }
    .modal-body {
      .m-modal-iframe {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>