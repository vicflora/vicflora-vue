<style lang="scss" scoped>
// the style file in the Taxon.scss
</style>

<template>
  <div>
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
        <b-img
          thumbnail
          fluid
          :src="image.thumbnailUrl"
          :data-src="image.previewUrl"
          :alt="
            `${data.taxonConcept.taxonName.fullName}. ${
              image.caption ? image.caption : ''
            }
                            ${image.subtype ? image.subtype : ''}: ${
              image.creator ? image.creator : ''
            }
                            ${image.rights ? image.rights : ''}
                            `
          "
        >
        </b-img>
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

<script>
import "viewerjs/dist/viewer.css";
import Viewer from "v-viewer";
import Vue from "vue";
Vue.use(Viewer);

export default {
  name: "TaxonTabSpecimenImages",
  props: ["data"],
  data() {
    return {
      viewerOptions: {
        url: "data-src"
      }
    };
  }
};
</script>
