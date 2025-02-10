<template>
  <div
    v-if="taxonConceptInaturalistPhotos"
    class="result apollo"
  >
    <div
      class="m-images"
    >
      <div class="row text-center text-lg-start">
        <TaxonTabInaturalistPhotosThumbnail
          v-for="(image, index) in taxonConceptInaturalistPhotos.data"
          :key="image.id"
          :taxonConcept="concept"
          :image="image"
          :index="index"
        />
      </div>
      <div class="text-right">
        <b-button
          v-if="taxonConceptInaturalistPhotos.paginatorInfo.hasMorePages"
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
const TaxonTabInaturalistPhotosThumbnail = () => import("@/components/Taxon/TaxonTabInaturalistPhotosThumbnail")
const PhotoSwipeElement = () => import("@/components/App/AppPhotoSwipeElement")
import { imagePaginatorMixin } from "~/mixins/imagePaginatorMixin"
import { waitTillActivatedMixin } from "~/mixins/waitTillActivatedMixin"
import TaxonConceptInaturalistPhotosQuery from "~/graphql/queries/TaxonConceptInaturalistPhotosQuery"

const pageSize = 12

export default {
  name: "TaxonTabInaturalistPhotos",
  components: {
    TaxonTabInaturalistPhotosThumbnail,
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
    taxonConceptInaturalistPhotos: {
      query: TaxonConceptInaturalistPhotosQuery,
      skip: true,
      result({ loading, data }) {
        if (loading) {
          $nuxt.$emit('progress-bar-start')
        }
        else {
          $nuxt.$emit('progress-bar-stop')
          this.taxonConceptInaturalistPhotos = data.taxonConceptInaturalistPhotos
          this.thumbnails = data.taxonConceptInaturalistPhotos.data
          this.photoSwipeItems = data.taxonConceptInaturalistPhotos.data.map(item => this.createPhotoSwipeItem(item))
        }
      },
    }
  },
  data() {
    return {
      page: 1,
      thumbnails: [],
      photoSwipeItems: [],
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
          this.$apollo.queries.taxonConceptInaturalistPhotos.skip = false
        }
      }
    }
  },
  created() {
    this.$apollo.queries.taxonConceptInaturalistPhotos.setVariables({ ...this.variables })

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
      this.$apollo.queries.taxonConceptInaturalistPhotos.fetchMore({
        variables: this.variables,
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const newImages = fetchMoreResult.taxonConceptInaturalistPhotos.data
          const paginatorInfo = fetchMoreResult.taxonConceptInaturalistPhotos.paginatorInfo

          return {
            taxonConceptInaturalistPhotos: {
              __typename: previousResult.taxonConceptInaturalistPhotos.__typename,
              data: [...previousResult.taxonConceptInaturalistPhotos.data, ...newImages],
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
        w: image.w >= image.h ? 1024 : Math.floor(image.w * (1024 / image.h)),
        h: image.w >= image.h ? Math.floor(image.h * (1024 / image.w)) : 1024,
      }
      item.preview2048 = {
        src: image.originalImageUrl,
        w: image.w,
        h: image.h,
      }
      item.title = this.createCaption(image)
      return item
    },
    createCaption(image) {
      let caption = '<i>' + image.taxonConcepts[0].taxonName.fullName + '</i>'
      if (image.observations[0].identification.name != image.taxonConcepts[0].taxonName.fullName) {
        caption += ` (as <i>${image.observations[0].identification.name}</i>)`
      }
      caption += '. '
      caption += image.observations[0].placeGuess + ', ' + image.observations[0].observedOn
      caption += `&emsp;<a target="_blank" href="${image.observations[0].observationUrl}">iNaturalistAU</a><br>`

      let userName = image.observations[0].user.name ? image.observations[0].user.name : image.observations[0].user.login

      caption += 'Photo: ' + userName + '&emsp;'
      caption += `<a target="_blank" href="${image.license.licenseUrl}">${image.license.label}</a>`

      return caption
    }
  },
}
</script>
