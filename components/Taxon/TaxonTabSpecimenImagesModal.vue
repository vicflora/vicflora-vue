<template>
  <b-modal 
    id="specimen-images-modal"
    v-model="showModal"
    size="xl"
    ref="specimenImagesModal"
  >
    <template #modal-header>
        <h6 class="modal-title">
          {{ images[currentThumbnail].caption }}
        </h6>
        <button
          type="button"
          class="close"
          @click="showModal = !showModal"
        >
          <span aria-hidden="true">&times;</span>
        </button>
    </template>
    <template #default>
      <iframe
        class="m-modal-iframe"
        :src="
          'https://vicflora.rbg.vic.gov.au/flora/specimen_image_viewer/' +
            images[currentThumbnail].alaImageUuid
        "
      >
      </iframe>
    </template>
    <template #modal-footer>
      <b-button
        variant="primary"
        :disabled="currentThumbnail === 0"
        @click="previousImage"
      >&lt;</b-button>
      <b-button
        v-if="currentThumbnail < images.length"
        variant="primary"
        :disabled="currentThumbnail === images.length - 1"
        @click="nextImage"
      >&gt;</b-button>
    </template>
  </b-modal>
</template>

<script>
export default {
  name: "TaxonTabSpecimenImagesModal",
  props: {
    currentThumbnail: {
      type: Number,
      default: 0
    },
    images: {
      type: Array,
      required: true
    },
  },
  data() {
    return {
      showModal: false
    }
  },
  methods: {
    nextImage() {
      this.currentThumbnail++
    },
    previousImage() {
      this.currentThumbnail--
    }
  },
}
</script>