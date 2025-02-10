<template>
  <div class="col-lg-2 col-md-3 col-6 px-1">
    <figure class="thumbnail">
      <div>
        <b-img
          v-show="showImage === true"
          :src="image.thumbnailUrl"
          :data-src="image.previewUrl"
          @load="loadImage"
          @click="onClick"
        >
        </b-img>
        <LoadingSpinner v-show="showImage === false" />
      </div>
    </figure>
  </div>
</template>

<script>
const LoadingSpinner = () => import("@/components/App/AppLoadingSpinner")

export default {
  name: "TaxonTabInaturalistPhotosThumbnail",
  components: {
    LoadingSpinner,
  },
  props: {
    taxonConcept: {
      type: Object,
      required: true
    },
    image: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      default: 'image',
    }
  },
  data(){
      return{
          showImage: false,
          containerHeight: 120
      }
  },
  methods: {
    loadImage(value) {
      this.showImage = true;
    },
    getCaption(caption) {
      return caption.replace('<br/>', '. ').replace(/<[^>]*>?/gm, '')
    },
    onClick(e) {
      e.preventDefault()
      $nuxt.$emit(`${this.category}-thumbnail-clicked`, this.index)
    }
  }
};
</script>