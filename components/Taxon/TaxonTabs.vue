<template>
  <div class="vf-taxon-page-tabs">
    <b-tabs v-model="tabIndex" content-class="mt-4 mb-3 m-row w-100">

      <!-- Overview tab — renamed to 'Treatment' -->
      <b-tab title="Treatment">
        <TaxonTabOverview
          :concept="concept"
          :tabIndex.sync="tabIndex"
        />
      </b-tab>

      <!-- Classification tab -->
      <b-tab title="Classification" lazy>
        <TaxonClassification/>
      </b-tab>

      <!-- Distribution tab -->
      <b-tab
        title="Distribution"
        v-if="concept.bioregions.length !== 0"
        lazy
      >
        <TaxonTabDistribution :concept="concept"/>
      </b-tab>

      <!-- Images tab -->
      <b-tab title="Images" v-if="concept.images.data.length > 0" lazy>
        <TaxonTabImages/>
      </b-tab>

      <!-- Specimen images -->
      <b-tab
        title="Specimen Images"
        v-if="concept.specimenImages.data.length > 0"
        lazy
      >
        <TaxonTabSpecimenImages/>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import TaxonClassification from "@/components/Taxon/TaxonClassification"
import TaxonTabOverview from "@/components/Taxon/TaxonTabOverview"
import TaxonTabImages from "@/components/Taxon/TaxonTabImages"
import TaxonTabSpecimenImages from "@/components/Taxon/TaxonTabSpecimenImages"
import TaxonTabDistribution from "@/components/Taxon/TaxonTabDistribution"

export default {
  name: "TaxonTabs",
  components: {
    TaxonTabOverview,
    TaxonTabImages,
    TaxonTabSpecimenImages,
    TaxonTabDistribution,
    TaxonClassification
  },
  props: {
    concept: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      tabIndex: 0,

      rankClass: {
        life: -9999,
        kingdom: 10,
        phylum: 30,
        class: 60,
        superorder: 90,
        order: 100,
        family: 140,
        genus: 180,
        species: 220,
        subspecies: 230
      }
    };
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
</style>