<template>
  <div>
      <!-- Description -->
      <b-row class="m-row">
        <!-- text -->
        <!-- use .replaceAll() to replace the tags in HTML -->
        <b-col class="text-left" v-if="concept.currentProfile" :lg="hasAside ? 8 : 12">
          <div
            class="current-profile"
            v-html="concept.currentProfile.profile"
          />

          <TaxonTabOverviewAttribution :concept="concept" />

          <TaxonTabOverviewKeyButtons
            v-if="concept.identificationKeys.length !== 0"
            :identificationKeys="concept.identificationKeys"
          />
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
import TaxonTabOverviewAttribution from "~/components/Taxon/TaxonTabOverviewAttribution"
import TaxonTabOverviewKeyButtons from "~/components/Taxon/TaxonTabOverviewKeyButtons"
import TaxonTabOverviewImage from "~/components/Taxon/TaxonTabOverviewImage"
import { rankMixin } from "~/mixins/taxonMixins"

export default {
  name: "TaxonTabOverview",
  components: {
    TaxonTabOverviewAttribution,
    TaxonTabOverviewKeyButtons,
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
  mounted() {
    let elements = document.getElementsByClassName('current-profile')[0]
        .getElementsByClassName('scientific_name')

    for (let i = 0, n = elements.length; i < n; i++) {
      let sciname = elements[i].innerHTML
      if (sciname.trim().indexOf(' ') > -1) {
        sciname = `<em>${ sciname }</em>`
        sciname = sciname.replace(' subsp. ', '</em> subsp. <em>')
        sciname = sciname.replace(' var. ', '</em> var. <em>')
        sciname = sciname.replace(' f. ', '</em> f. <em>')
      }
      elements[i].innerHTML = sciname
    }
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
    onHeroImageClicked() {
      this.$nuxt.$emit('hero-image-clicked')
    },
    onProfileMapClicked() {
      this.$nuxt.$emit('profile-map-clicked')
    },
  },
}
</script>
