<template>
  <div 
    v-if="taxonConceptImages" 
    class="result apollo"
  >
    <div 
      class="m-images" 
      v-viewer="viewerOptions"
    >
      <div class="row text-center text-lg-start">
        <TaxonTabImagesThumbnail 
          v-for="image in taxonConceptImages.data"
          :key="image.id"
          :taxonConcept="concept" 
          :image="image"
        />
      </div>
      <div class="text-right">
        <b-button 
          v-if="taxonConceptImages.paginatorInfo.hasMorePages"
          variant="primary" 
          @click="fetchMore"
        >
          Show more images
          <b-spinner 
            v-if="$apollo.loading"
            small
            label="loading..."
          />
        </b-button>
      </div>
    </div>

  </div>
</template>

<script>
import "viewerjs/dist/viewer.css"
import Viewer from "v-viewer"
import Vue from "vue"
import TaxonTabImagesThumbnail from "@/components/Taxon/TaxonTabImagesThumbnail"
import { imagePaginatorMixin } from "~/mixins/imagePaginatorMixin"
import { waitTillActivatedMixin } from "~/mixins/waitTillActivatedMixin"
import TaxonConceptImagesQuery from "~/graphql/queries/taxonConceptImagesQuery"

Vue.use(Viewer)

const pageSize = 12

export default {
  name: "TaxonTabImages",
  components: {
    TaxonTabImagesThumbnail,
  },
  mixins: [
    imagePaginatorMixin,
    waitTillActivatedMixin
  ],
  props: {
    concept: {
      type: Object,
      required: true
    }
  },
  apollo: {
    taxonConceptImages: {
      query: TaxonConceptImagesQuery,
      skip: true
    }
  },
  data() {
    return {
      page: 1,
      viewerOptions: {
        url: "data-src"
      }
    }
  },
  computed: {
    variables() {
      return {
        id: this.concept.id,
        first: pageSize,
        page: this.page
      }
    }
  },
  created() {
    this.$apollo.queries.taxonConceptImages.setVariables({ ...this.variables })
  },
  watch: {
    activated: {
      immediate: true,
      handler(activated) {
        if (activated) {
          this.$apollo.queries.taxonConceptImages.skip = false
        }
      }
    }
  },
  methods: {
    incrementPage() {
      this.page = this.page + 1
    },
    fetchMore() {
      this.incrementPage()
      this.$apollo.queries.taxonConceptImages.fetchMore({
        variables: this.variables,
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const newImages = fetchMoreResult.taxonConceptImages.data
          const paginatorInfo = fetchMoreResult.taxonConceptImages.paginatorInfo

          return {
            taxonConceptImages: {
              __typename: previousResult.taxonConceptImages.__typename,
              data: [...previousResult.taxonConceptImages.data, ...newImages],
              paginatorInfo: paginatorInfo,
            },
          }
        }
      })
    },
  },
}
</script>