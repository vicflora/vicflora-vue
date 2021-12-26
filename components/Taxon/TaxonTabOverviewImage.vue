<template>
  <div
    class="m-heroimage-container"
    @click="onClick"
  >
    <img
      :src="src"
      :alt="alt"
      @load="loadImage"
      v-show="showImage === true"
    />
    <LoadingSpinner v-show="showImage === false" />
  </div>
</template>

<script>
import LoadingSpinner from "@/components/App/AppLoadingSpinner"

export default {
  name: "TaxonTabOverviewImage",
  components: {
    LoadingSpinner,
  },
  props: {
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      showImage: false,
    }
  },
  methods: {
    loadImage() {
      this.showImage = true
    },
    onClick() {
      this.$emit('image-clicked')
    },
  }
}
</script>

<style lang="scss">
@import "~/assets/scss/custom_variables.scss";

.m-heroimage-container:hover {
  cursor: pointer;
}

.m-heroimage-container {
  border-radius: 4px;
  border: $light solid 1px;
  background-color: white;
  height: 205px;
  width: 340px;
  margin-bottom: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3px 5px;

  img {
    max-height: 95%;
    max-width: 95%;
  }
}

.m-dictribution-map {
  margin-top: 8px;
}
</style>
