<style lang="scss" scoped>
// the style file in the Taxon.scss
</style>

<template>
  <div>
    <div class="m-images">
      <p v-if="data.taxonConcept.images.data.length === 0">
        No Images...
      </p>
      <div
        v-else
        v-for="image in data.taxonConcept.images.data"
        :key="image.id"
        class="m-image-container"
        v-viewer="viewerOptions"
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
    </div>

    <div>
      <b-pagination-nav
        v-if="data.taxonConcept.images.paginatorInfo.total > 24"
        class="mt-3 mb-5"
        v-model="imagesPage"
        :number-of-pages="
          data.taxonConcept.images.paginatorInfo.total % 24 === 0
            ? data.taxonConcept.images.paginatorInfo.total / 24
            : data.taxonConcept.images.paginatorInfo.total / 24 + 1
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
  name: "TaxonTabImages",
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
