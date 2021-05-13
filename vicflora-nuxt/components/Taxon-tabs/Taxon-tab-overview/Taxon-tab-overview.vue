<style lang="scss" scoped>
// the style file in the Taxon-tabs.scss
@import "./Taxon-tab-overview.scss";
</style>

<template>
  <b-row>
    <b-col>
      <!-- Description -->
      <b-row class="m-row">
        <!-- text -->
        <!-- use .replaceAll() to replace the tags in HTML -->
        <b-col class="text-left" v-if="data.taxonConcept.currentProfile" lg="8">
          <div v-html="data.taxonConcept.currentProfile.profile"></div>
          <!-- Source -->
          <div class="m-row">
            <span class="m-description-title">Source: </span>
            <span> </span>
          </div>
          <!-- Created time -->
          <div class="m-row">
            <!-- Created info -->
            <div>
              <span class="m-description-title">Created by: </span>
              <span>{{
                `${
                  data.taxonConcept.createdBy.name
                }, ${data.taxonConcept.createdAt.slice(0, 10)}`
              }}</span>
            </div>
            <!-- Updated info -->
            <div>
              <span class="m-description-title">Updated by: </span>
              <span>{{
                `${
                  data.taxonConcept.modifiedBy.name
                }, ${data.taxonConcept.updatedAt.slice(0, 10)}`
              }}</span>
            </div>
          </div>
          <div
            class="m-row"
            v-if="data.taxonConcept.identificationKeys.length !== 0"
          >
            <div
              v-for="item in data.taxonConcept.identificationKeys"
              :key="item.id"
            >
              <a :href="`https://keybase.rbg.vic.gov.au/keys/show/${item.id}`" >
                <b-button variant="primary" class="mb-2">{{ item.title }}</b-button>
              </a>
            </div>
          </div>
        </b-col>

        <b-col lg="4">
          <!-- Hero img -->
          <div
            class="m-heroimage-container"
            v-if="data.taxonConcept.heroImage"
            @click="clickImage()"
          >
            <img
              :src="data.taxonConcept.heroImage.thumbnailUrl"
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
            v-if="data.taxonConcept.bioregions.length !== 0"
            @click="clickMap()"
          >
            <img
              class="m-dictribution-map"
              :src="data.taxonConcept.mapLinks.profileMap"
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
  props: ["data", "tabIndex"],
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
      if (this.data.taxonConcept.images.data.length > 0) {
        this.$emit("update:tabIndex", 1);
      }
    },
    clickMap: function() {
      if (this.data.taxonConcept.images.data.length > 0) {
        if (this.data.taxonConcept.specimenImages.data.length > 0) {
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
