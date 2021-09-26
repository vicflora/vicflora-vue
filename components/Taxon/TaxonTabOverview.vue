<template>
  <div>
      <!-- Description -->
      <b-row class="m-row">
        <!-- text -->
        <!-- use .replaceAll() to replace the tags in HTML -->
        <b-col class="text-left" v-if="concept.currentProfile" :lg="hasAside ? 8 : 12">
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

        <b-col 
          v-if="hasAside"
          lg="4"
        >
          <!-- Hero img -->
          <TaxonTabOverviewImage 
            v-if="hasHeroImage"
            :src="concept.heroImage.previewUrl"
            :alt="`${concept.taxonName.fullName} (hero image)`"
            @image-clicked="onHeroImageClicked"
          />

          <!-- Map -->
          <TaxonTabOverviewImage 
            v-if="hasProfileMap"
            :src="concept.mapLinks.profileMap"
            :alt="`${concept.taxonName.fullName} (distribution map)`"
            @image-clicked="onProfileMapClicked"
          />
        </b-col>
      </b-row>
  </div>
</template>

<script>
import TaxonTabOverviewImage from "~/components/Taxon/TaxonTabOverviewImage"
import { rankMixin } from "~/mixins/taxonMixins"

export default {
  name: "TaxonTabOverview",
  components: {
    TaxonTabOverviewImage,
  },
  mixins: [
    rankMixin
  ],
  props: {
    concept: {
      type: Object,
      required: true
    }
  },
  computed: {
    hasHeroImage() {
      return this.concept.heroImage ? true : false
    },
    hasProfileMap() {
      return this.concept.taxonTreeDefItem.rankId >= this.rankClass['species']
    },
    hasAside() {
      return this.hasHeroImage || this.hasProfileMap
    }
  },
  // created() {
  //   if (!this.concept.currentProfile) {
  //     this.$router.push({
  //       name: "flora-taxon-id-classification",
  //       params: {
  //         id: this.$route.params.id
  //       }
  //     })
  //   }
  // },
  methods: {
    getBtnText: function(name) {
      switch (name) {
        case "family":
          return "genera";
        case "genus":
          return "species";
      }
    },
    onHeroImageClicked() {
      console.log('image clicked')
      this.$nuxt.$emit('hero-image-clicked')
    },
    onProfileMapClicked() {
      this.$nuxt.$emit('profile-map-clicked')
    },
  },
}
</script>