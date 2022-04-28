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
      >
        <template slot="title"><FontAwesomeIcon :icon="tab.icon"/> {{ tab.title }}</template>
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
const TaxonTabEditData = () => import("@/components/Taxon/TaxonTabEditData")
const TaxonTabEditProfile = () => import("@/components/Taxon/TaxonTabEditProfile")
const TaxonTabEditDistribution = () => import("@/components/Taxon/TaxonTabEditDistribution")
const TaxonTabEditVernacularNames = () => import("@/components/Taxon/TaxonTabEditVernacularNames")
const TaxonTabEditReferences = () => import("@/components/Taxon/TaxonTabEditReferences")
const TaxonTabEditChanges = () => import("@/components/Taxon/TaxonTabEditChanges")
import { rankMixin } from "@/mixins/taxonMixins"
import { watchRouteIdMixin } from "@/mixins/routeMixins"

export default {
  name: "TaxonTabsEdit",
  components: {
    TaxonTabEditData,
    TaxonTabEditProfile,
    TaxonTabEditDistribution,
    TaxonTabEditVernacularNames,
    TaxonTabEditReferences,
    TaxonTabEditChanges,
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
    tabs() {
      const tabs = []
      tabs.push({
        title: "Data",
        icon: 'table',
        component: TaxonTabEditData,
      })

      if (this.concept && this.concept.taxonomicStatus === 'ACCEPTED') {
        tabs.push({
          title: "Profile",
          icon: 'file-pen',
          component: TaxonTabEditProfile,
        })

        // if (this.rankClass[this.concept.taxonRank.toUpperCase()] > 180) {
          tabs.push({
            title: "Distribution",
            icon: 'map-location',
            component: TaxonTabEditDistribution,
          })
        // }

        tabs.push({
          title: "Vernacular names",
          icon: 'globe',
          component: TaxonTabEditVernacularNames,
        })
        
        tabs.push({
          title: "References",
          icon: 'book',
          component: TaxonTabEditReferences,
        })
      }

      if (this.concept && this.concept.changes && this.concept.changes.length) {
        tabs.push({
          title: "Changes",
          icon: 'dice',
          component: TaxonTabEditChanges,
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