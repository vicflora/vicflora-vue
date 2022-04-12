<template>
  <div class="col-lg-2 col-md-3 col-6 px-1">
    <figure class="thumbnail">
      <div>
        <b-img
          v-show="showImage === true"
          :src="image.thumbnailUrl"
          :data-src="image.previewUrl"
          :alt="getCaption(image)"
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
  name: "TaxonTabImagesThumbnail",
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
    getCaption(image) {
      let caption = this.taxonConcept.taxonName.fullName + "."
      if (image.caption) {
        caption += " " + image.caption
      }
      caption += image.subtype ? " " + image.subtype + ": " : ""
      caption += image.creator
      caption += image.rights ? ". " + image.rights : ''
    },
    onClick(e) {
      e.preventDefault()
      $nuxt.$emit(`${this.category}-thumbnail-clicked`, this.index)
    }
  }
};
</script>