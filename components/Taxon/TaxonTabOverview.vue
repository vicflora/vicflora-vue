<template>
  <b-row>
    <b-col>
      <!-- Description -->
      <b-row class="m-row">
        <!-- text -->
        <!-- use .replaceAll() to replace the tags in HTML -->
        <b-col class="text-left" v-if="concept.currentProfile" lg="8">
          <div v-html="concept.currentProfile.profile"></div>
          <!-- Source -->
          <div class="m-row">
            <span class="m-description-title">Source: </span>
            <span> </span>
          </div>
          <!-- Created time -->
          <div class="m-row">
            <!-- Created info -->
            <div v-if="concept.createdBy && concept.createdAt">
              <span class="m-description-title">Created by: </span>
              <span >{{
                `${
                  concept.createdBy.name
                }, ${concept.createdAt.slice(0, 10)}`
              }}</span>
            </div>
            <!-- Updated info -->
            <div v-if="concept.modifiedBy && concept.updatedAt">
              <span class="m-description-title">Updated by: </span>
              <span >{{
                `${
                  concept.modifiedBy.name
                }, ${concept.updatedAt.slice(0, 10)}`
              }}</span>
            </div>
          </div>
          <div
            class="m-row"
            v-if="concept.identificationKeys.length !== 0"
          >
            <div
              v-for="item in concept.identificationKeys"
              :key="item.id"
            >
              <nuxt-link :to="`/flora/key/${item.id}`" >
                <b-button variant="primary" class="mb-2">{{ item.title }}</b-button>
              </nuxt-link>
            </div>
          </div>
        </b-col>

        <b-col lg="4">
          <!-- Hero img -->
          <div
            class="m-heroimage-container"
            v-if="concept.heroImage"
            @click="clickImage()"
          >
            <img
              :src="concept.heroImage.thumbnailUrl"
              alt="Hero Image"
              @load="loadHeroImage"
              v-show="showHeroImage === true"
            />
            <b-spinner
              label="Spinning"
              v-show="showHeroImage === false"
              variant="primary"
            ></b-spinner>
          </div>

          <!-- Map -->
          <div
            href="#"
            class="m-heroimage-container"
            v-if="concept.bioregions.length !== 0"
            @click="clickMap()"
          >
            <img
              class="m-dictribution-map"
              :src="concept.mapLinks.profileMap"
              alt="Map"
              @load="loadMapImage"
              v-show="showMapImage === true"
            />
            <b-spinner
              label="Spinning"
              v-show="showMapImage === false"
              variant="primary"
            ></b-spinner>
          </div>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: "TaxonTabOverview",
  props: {
    concept: {
      type: Object,
      required: true
    },
    tabIndex: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      showHeroImage: false,
      showMapImage: false
    };
  },
  methods: {
    getBtnText: function(name) {
      switch (name) {
        case "family":
          return "genera";
        case "genus":
          return "species";
      }
    },
    clickImage: function() {
      if (this.concept.images.data.length > 0) {
        this.$emit("update:tabIndex", 1);
      }
    },
    clickMap: function() {
      if (this.concept.images.data.length > 0) {
        if (this.concept.specimenImages.data.length > 0) {
          this.$emit("update:tabIndex", 3);
        } else {
          this.$emit("update:tabIndex", 2);
        }
      } else {
        this.$emit("update:tabIndex", 1);
      }
    },
    loadHeroImage() {
      this.showHeroImage = true;
    },
    loadMapImage() {
      this.showMapImage = true;
    }
  }
};
</script>

<style lang="scss" scoped>
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
