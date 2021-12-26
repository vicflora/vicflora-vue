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
import LoadingSpinner from "@/components/App/AppLoadingSpinner"

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
    onClick() {
      this.$emit('thumbnail-clicked')
    }
  }
};
</script>

<style lang="scss">
.m-images {
  &>.row {
    margin-left: -0.25rem;
    margin-right: -0.25rem;
  }

  .thumbnail {
    width: 100%;
    border: solid 1px #cccccc;
    border-radius: 4px;
    position: relative;
    margin-bottom: 8px;

    &:before {
      content: "";
      display: block;
      padding-top: 100%;
    }

    &>div {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      margin: 4px;
    }
  }
}

</style>

