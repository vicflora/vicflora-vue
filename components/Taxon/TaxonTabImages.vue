<template>
  <div
    v-if="taxonConceptImages"
    class="result apollo"
  >
    <div
      class="m-images"
    >
      <div class="row text-center text-lg-start">
        <TaxonTabImagesThumbnail
          v-for="(image, index) in taxonConceptImages.data"
          :key="image.id"
          :taxonConcept="concept"
          :image="image"
          :index="index"
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
    <PhotoSwipeElement
      ref="photoswipe"
      :items="photoSwipeItems"
    />
  </div>
</template>

<script>
const TaxonTabImagesThumbnail = () => import("@/components/Taxon/TaxonTabImagesThumbnail")
const PhotoSwipeElement = () => import("@/components/App/AppPhotoSwipeElement")
import { imagePaginatorMixin } from "~/mixins/imagePaginatorMixin"
import { waitTillActivatedMixin } from "~/mixins/waitTillActivatedMixin"
import TaxonConceptImagesQuery from "~/graphql/queries/taxonConceptImagesQuery"

const pageSize = 12

export default {
  name: "TaxonTabImages",
  components: {
    TaxonTabImagesThumbnail,
    PhotoSwipeElement,
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
      skip: true,
      result({ loading, data }) {
        if (loading) {
          $nuxt.$emit('progress-bar-start')
        }
        else {
          $nuxt.$emit('progress-bar-stop')
          this.taxonConceptImages = data.taxonConceptImages
          this.thumbnails = data.taxonConceptImages.data
          this.photoSwipeItems = data.taxonConceptImages.data.map(item => this.createPhotoSwipeItem(item))
        }
      },
    }
  },
  data() {
    return {
      page: 1,
      thumbnails: [],
      photoSwipeItems: []
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
  created() {
    this.$apollo.queries.taxonConceptImages.setVariables({ ...this.variables })

    this.$nuxt.$on('image-thumbnail-clicked', (index) => {
      this.$refs.photoswipe.open(index)
    })
  },
  beforeDestroy() {
    this.$nuxt.$off('image-thumbnail-clicked')
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
            thumbnails: [...this.thumbnails, ...newImages],
            photoSwipeItems: [...this.photoSwipeItems, ...newImages.map(item => this.createPhotoSwipeItem(item))]
          }
        }
      })
    },
    createPhotoSwipeItem(image) {
      let item = {}
      item.preview1024 = {
        src: image.previewUrl,
        w: Math.floor(image.w/2),
        h: Math.floor(image.h/2),
      }
      item.preview2048 = {
        src: image.highestResUrl,
        w: image.w,
        h: image.h,
      }
      item.title = image.caption
      return item
    },
  },
}
</script>
