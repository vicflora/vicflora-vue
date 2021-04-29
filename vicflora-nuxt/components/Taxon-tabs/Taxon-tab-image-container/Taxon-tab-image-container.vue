<style lang="scss" scoped>
@import "Taxon-tab-image-container.scss";
</style>

<template>
<div>
    <b-img
      thumbnail
      fluid
      v-show="showImage === true"
      @load="loadImage"
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
    <b-spinner label="Spinning" v-show="showImage === false" variant="primary"></b-spinner>
</div>
</template>

<script>
export default {
  name: "TaxonTabImageContainer",
  props: ["data","image"],
  data(){
      return{
          showImage: false,
      }
  },
  methods: {
    loadImage() {
      this.showImage = true;
    }
  }
};
</script>
