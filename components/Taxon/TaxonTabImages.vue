<template>
  <ApolloQuery
    :query="TaxonConceptImagesQuery"
    :variables="{ id: id, first: first, page: page }"
  >
    <template v-slot="{ result: { loading, error, data } }">
      <!-- Loading -->
      <div v-if="loading" class="loading apollo">Loading...</div>

      <!-- Error -->
      <div v-else-if="error" class="error apollo">An error occurred</div>

      <!-- Result -->
      <div v-else-if="data" class="result apollo">
        <div class="m-images" v-viewer="viewerOptions">
          <p v-if="data.taxonConcept.images.length === 0">
            No Images...
          </p>
          <div
            v-else
            v-for="image in data.taxonConcept.images.data"
            :key="image.id"
            class="m-image-container"
          >
            <TaxonTabImageContainer :data="data" :image="image"></TaxonTabImageContainer>
          </div>
        </div>

        <div>
          <TaxonTabImagesPaginator 
            :images="data.taxonConcept.images"
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
import "viewerjs/dist/viewer.css"
import Viewer from "v-viewer"
import Vue from "vue"
import TaxonTabImageContainer from "@/components/Taxon/TaxonTabImageContainer"
import TaxonTabImagesPaginator from "@/components/Taxon/TaxonTabImagesPaginator"
import { imagePaginatorMixin } from "~/mixins/imagePaginatorMixin"
import TaxonConceptImagesQuery from "~/graphql/queries/taxonConceptImagesQuery"

Vue.use(Viewer)

export default {
  name: "TaxonTabImages",
  components: {
    TaxonTabImageContainer,
    TaxonTabImagesPaginator
  },
  mixins: [
    imagePaginatorMixin
  ],
  data() {
    return {
      TaxonConceptImagesQuery,
      viewerOptions: {
        url: "data-src"
      }
    };
  },
  computed: {
    id() {
      return this.$route.params.id
    }
  },
  
};
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
  }
}
</style>