<template>
  <div class="vf-taxon-page-tabs">
    <b-tabs
      v-model="activeTab"
      @activate-tab="onInput"
    >
      <b-tab
        v-for="(tab, index) in tabs"
        :key="index"
        :item="tab"
        :title="tab.title"
      >
        <component
          :is="tab.component"
          :concept="concept"
          :activated="index === activeTab"
        />
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
const TaxonTabOverview = () => import("@/components/Taxon/TaxonTabOverview")
const TaxonClassification = () => import("@/components/Taxon/TaxonClassification")
const TaxonTabSynonymy = () => import("@/components/Taxon/TaxonTabSynonymy")
const TaxonTabImages = () => import("@/components/Taxon/TaxonTabImages")
const TaxonTabSpecimenImages = () => import("@/components/Taxon/TaxonTabSpecimenImages")
const TaxonTabInaturalistPhotos = () => import("@/components/Taxon/TaxonTabInaturalistPhotos")
const TaxonTabDistribution = () => import("@/components/Taxon/TaxonTabDistribution")
const TaxonTabReferences = () => import("@/components/Taxon/TaxonTabReferences")
const TaxonTabFloraLinks = () => import("@/components/Taxon/TaxonTabFloraLinks")
const TaxonTabPhenology = () => import("@/components/Taxon/TaxonTabPhenology")
import { rankMixin } from "@/mixins/taxonMixins"
import { watchRouteIdMixin } from "@/mixins/routeMixins"

export default {
  name: "TaxonTabs",
  components: {
    TaxonTabOverview,
    TaxonTabImages,
    TaxonTabSpecimenImages,
    TaxonTabInaturalistPhotos,
    TaxonTabDistribution,
    TaxonClassification,
    TaxonTabSynonymy,
    TaxonTabReferences,
    TaxonTabFloraLinks,
    TaxonTabPhenology,
  },
  mixins: [
    rankMixin,
    watchRouteIdMixin
  ],
  props: {
    concept: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      activeTab: 0,
      visitedTabs: []
    }
  },
  computed: {
    hasPhenologyTab() {
      const classItem = this.concept.higherClassification.filter(item => {
        return ['Magnoliopsida'].indexOf(item.taxonName.fullName)
      })
      const rankId = this.concept.taxonTreeDefItem.rankId
      return classItem.length > 0 && 
          (rankId === 140 || rankId === 180 || rankId >= 220)
    },
    tabs() {
      const tabs = []

      if (this.concept.currentProfile) {
        tabs.push({
          title: "Treatment",
          component: TaxonTabOverview
        })
      }

      tabs.push({
        title: "Classification",
        component: TaxonClassification
      })

      if (this.concept.synonymUsages.length ||
          this.concept.misapplications.length) {
        tabs.push({
          title: "Synonymy",
          component: TaxonTabSynonymy
        })
      }

      if (this.concept.taxonTreeDefItem.rankId >= this.rankClass['species']) {
        tabs.push({
          title: "Distribution",
          component: TaxonTabDistribution
        })
      }

      if (this.hasPhenologyTab) {
        tabs.push({
          title: "Phenology",
          component: TaxonTabPhenology
        })
      }

      if (this.concept.heroImage) {
        tabs.push({
          title: "Images",
          component: TaxonTabImages
        })
      }

      if (this.concept.hasSpecimenImages) {
        tabs.push({
          title: "Specimen images",
          component: TaxonTabSpecimenImages
        })
      }

      if (this.concept.hasInaturalistPhotos) {
        tabs.push({
          title: "iNaturalist photos",
          component: "TaxonTabInaturalistPhotos"
        })
      }

      if (this.concept.references.length) {
        tabs.push({
          title: "References",
          component: TaxonTabReferences
        })
      }

      if (this.concept.floraLinks.length) {
        tabs.push({
          title: "Other floras",
          component: TaxonTabFloraLinks
        })
      }

      return tabs

    }
  },
  created() {
    this.$nuxt.$on('hero-image-clicked', () => {
      this.onHeroImageClicked()
    })

    this.$nuxt.$on('profile-map-clicked', () => {
      this.onProfileMapClicked()
    })
  },
  beforeDestroy() {
    this.$nuxt.$off('hero-image-clicked')
    this.$nuxt.$off('profile-map-clicked')
  },
  methods: {
    onInput(value) {
      this.activeTab = value
      if(!this.visitedTabs.includes(value)){
        this.visitedTabs.push(value)
      }
    },
    onHeroImageClicked() {
      this.activeTab = this.tabs.map(item => item.title).indexOf('Images')
    },
    onProfileMapClicked() {
      this.activeTab = this.tabs.map(item => item.title).indexOf('Distribution')
    },
  }
}
</script>