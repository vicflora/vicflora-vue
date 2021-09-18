<template>
  <b-modal 
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
      <button
        class="btn btn-primary"
        :disabled="currentThumbnail === 0"
        @click="previousImage"
      >&lt;</button>
      <button
        v-if="currentThumbnail < images.length"
        class="btn btn-primary"
        :disabled="currentThumbnail === images.length - 1"
        @click="nextImage"
      >&gt;</button>
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

<style lang="scss">
.modal {
  iframe.m-modal-iframe {
    width: 100%;
    height: 100%;
  }

  .modal-content {
    height: 90vh;
  }
}
</style>
