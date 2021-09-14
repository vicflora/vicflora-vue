<template>
  <div class="vf-taxon-page-tabs">
    <b-nav 
      v-model="activeTab"
      tabs
    >
      <!-- <b-nav-item>'s with child routes. Note the trailing slash on the first <b-nav-item> -->
      <b-nav-item 
        v-if="concept.currentProfile"
        :to="`/flora/taxon/${concept.id}`"
        exact 
        exact-active-class="active"
      >Treatment</b-nav-item>

      <b-nav-item 
        :to="`/flora/taxon/${concept.id}/classification`" 
        exact 
        exact-active-class="active"
      >Classification</b-nav-item>

      <b-nav-item 
        v-if="concept.synonymUsages.length > 0 || concept.misapplications.length > 0"
        :to="`/flora/taxon/${concept.id}/synonymy`" 
        exact exact-active-class="active"
      >Synonymy</b-nav-item>

      <b-nav-item 
        v-if="concept.taxonTreeDefItem.rankId >= rankClass['species']"
        :to="`/flora/taxon/${concept.id}/distribution`" 
        exact exact-active-class="active"
      >Distribution</b-nav-item>

      <b-nav-item 
        v-if="concept.heroImage"
        :to="`/flora/taxon/${concept.id}/images`" 
        exact 
        exact-active-class="active"
      >Images</b-nav-item>

      <b-nav-item 
        v-if="concept.hasSpecimenImages"
        :to="`/flora/taxon/${concept.id}/specimen-images`" 
        exact 
        exact-active-class="active"
      >Specimen images</b-nav-item>
    </b-nav>

    <div class="tab-content">
      <nuxt-child :concept="concept"></nuxt-child>
    </div>
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
      activeTab: ""
    }
  },
  watch: {
    '$route.fullPath': {
      deep: true,
      immediate: true,
      handler(path) {
        let id = this.$route.params.id
        let hash = this.$route.hash
        this.activeTab = path.substring(path.indexOf(id) + id.length)
      }
    }
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