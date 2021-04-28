<style lang="scss" scoped>
// the style file in the Taxon-tabs.scss
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
            v-if="data.taxonConcept.taxonTreeDefItem.name !== 'species'"
          >
            <b-button variant="primary"
              >Key to the
              {{ getBtnText(data.taxonConcept.taxonTreeDefItem.name) }}
              of
              {{ data.taxonConcept.taxonName.fullName }}</b-button
            >
          </div>
        </b-col>

        <b-col lg="4" align-self="center">
          <!-- Hero img -->
          <div class="m-heroimage-container" v-if="data.taxonConcept.heroImage">
            <a
              @click="
                () =>
                  data.taxonConcept.images.data.length > 0 ? (tabIndex = 1) : ''
              "
            >
              <img
                :src="data.taxonConcept.heroImage.thumbnailUrl"
                alt="Hero Image"
              />
            </a>
          </div>

          <!-- Map -->
          <div
            href="#"
            class="m-heroimage-container"
            v-if="data.taxonConcept.bioregions.length !== 0"
          >
            <a
              @click="
                () =>
                  data.taxonConcept.images.data.length > 0 ? (tabIndex = 3) : ''
              "
            >
              <img
                class="m-dictribution-map"
                :src="data.taxonConcept.mapLinks.profileMap"
                alt="Map"
              />
            </a>
          </div>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: "TaxonTabOverview",
  props: ["data"]
};
</script>
