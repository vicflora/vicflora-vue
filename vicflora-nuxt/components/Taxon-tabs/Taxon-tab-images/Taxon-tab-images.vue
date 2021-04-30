<style lang="scss" scoped>
@import "./Taxon-tab-images.scss";
</style>

<template>
  <ApolloQuery
    :query="require('@/graphql/queries/taxonImages.gql')"
    :variables="{ id, imagesPage }"
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
  </ApolloQuery>
</template>

<script>
import "viewerjs/dist/viewer.css";
import Viewer from "v-viewer";
import Vue from "vue";
import TaxonTabImageContainer from "@/components/Taxon-tabs/Taxon-tab-image-container/Taxon-tab-image-container";

Vue.use(Viewer);

export default {
  name: "TaxonTabImages",
  components: {
    TaxonTabImageContainer
  },

  data() {
    return {
      imagesPage: 1,
      
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
