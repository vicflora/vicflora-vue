<template>
  <div>
    <!-- Result -->
    <div
      v-if="taxonConceptSpecimenImages"
      class="result apollo"
    >
      <div class="m-images">
        <div class="row text-center text-lg-start">
          <TaxonTabImagesThumbnail
            v-for="(image, index) in taxonConceptSpecimenImages.data"
            :key="image.id"
            :index=index
            :taxonConcept="concept"
            :image="image"
            category="specimen-image"
          />
        </div>
        <div class="text-right">
          <b-button
            v-if="taxonConceptSpecimenImages.paginatorInfo.hasMorePages"
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
        <TaxonTabSpecimenImagesModal
          :show="specimenImagesModal"
          :current-thumbnail="currentThumbnail"
          :images="taxonConceptSpecimenImages.data"
          ref="specimenImagesModalThumbnail"
        />
      </div>
    </div>
  </div>
</template>

<script>
const TaxonTabImagesThumbnail = () => import("@/components/Taxon/TaxonTabImagesThumbnail")
import TaxonTabSpecimenImagesModal from "~/components/Taxon/TaxonTabSpecimenImagesModal"
import TaxonConceptSpecimenImagesQuery from "~/graphql/queries/taxonConceptSpecimenImagesQuery"
import { waitTillActivatedMixin } from "~/mixins/waitTillActivatedMixin"

const pageSize = 12

export default {
  name: "TaxonTabSpecimenImages",
  components: {
    TaxonTabImagesThumbnail,
    TaxonTabSpecimenImagesModal
  },
  mixins: [
    waitTillActivatedMixin
  ],
  props: {
    concept: {
      type: Object,
      required: true
    }
  },
  apollo: {
    taxonConceptSpecimenImages: {
      query: TaxonConceptSpecimenImagesQuery,
      skip: true
    }
  },
  data() {
    return {
      currentThumbnail: null,
      specimenImagesModal: false,
      page: 1,
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
    this.$apollo.queries.taxonConceptSpecimenImages.setVariables({ ...this.variables })

    this.$nuxt.$on('specimen-image-thumbnail-clicked', (index) => {
      this.onThumbnailClicked(index)
    })
  },
  beforeDestroy() {
    this.$nuxt.$off('specimen-image-thumbnail-clicked')
  },
  watch: {
    activated: {
      immediate: true,
      handler(activated) {
        if (activated) {
          this.$apollo.queries.taxonConceptSpecimenImages.skip = false
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
      this.$apollo.queries.taxonConceptSpecimenImages.fetchMore({
        variables: this.variables,
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const newImages = fetchMoreResult.taxonConceptSpecimenImages.data
          const paginatorInfo = fetchMoreResult.taxonConceptSpecimenImages.paginatorInfo

          return {
            taxonConceptSpecimenImages: {
              __typename: previousResult.taxonConceptSpecimenImages.__typename,
              data: [...previousResult.taxonConceptSpecimenImages.data, ...newImages],
              paginatorInfo: paginatorInfo,
            },
          }
        }
      })
    },
    onThumbnailClicked(image) {
      this.currentThumbnail = image
      this.$refs.specimenImagesModalThumbnail.showModal = true
    },
  },
}
</script>
