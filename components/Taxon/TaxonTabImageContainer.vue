<template>
  <div>
    <b-img
      thumbnail
      fluid
      v-show="showImage === true"
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
      @load="loadImage"
    >
    </b-img>
    <b-spinner 
      v-show="showImage === false"
      label="Spinning" 
      variant="secondary"
    />
  </div>
</template>

<script>
export default {
  name: "TaxonTabImageContainer",
  props: {
    data: {
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
      }
  },
  methods: {
    loadImage() {
      this.showImage = true;
    }
  }
};
</script>

<style lang="scss" scoped>
div {
  img {
    max-width: 170px !important; 
    max-height: 175px !important;
    padding: 0;
    background-color: none;
    border: none;
    border-radius: none;
  }
}
</style>