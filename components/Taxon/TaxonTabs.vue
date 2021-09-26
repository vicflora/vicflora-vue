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
import TaxonTabOverview from "@/components/Taxon/TaxonTabOverview"
import TaxonClassification from "@/components/Taxon/TaxonClassification"
import TaxonTabSynonymy from "@/components/Taxon/TaxonTabSynonymy"
import TaxonTabImages from "@/components/Taxon/TaxonTabImages"
import TaxonTabSpecimenImages from "@/components/Taxon/TaxonTabSpecimenImages"
import TaxonTabDistribution from "@/components/Taxon/TaxonTabDistribution"
import { rankMixin } from "@/mixins/taxonMixins"
import { watchRouteIdMixin } from "@/mixins/routeMixins"

export default {
  name: "TaxonTabs",
  components: {
    TaxonTabOverview,
    TaxonTabImages,
    TaxonTabSpecimenImages,
    TaxonTabDistribution,
    TaxonClassification,
    TaxonTabSynonymy
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
      console.log('Hero image clicked')
      this.activeTab = this.tabs.map(item => item.title).indexOf('Images')
    },
    onProfileMapClicked() {
      this.activeTab = this.tabs.map(item => item.title).indexOf('Distribution')
    },
  }
}
</script>

<style lang="scss">

.vf-taxon-page-tabs {
  margin: 25px 0;
}

.m-distribution-title {
  font-family: "goodsans-medium";
  margin-bottom: 20px;
}

.tab-content>div {
  padding-top: 15px;
}
</style>