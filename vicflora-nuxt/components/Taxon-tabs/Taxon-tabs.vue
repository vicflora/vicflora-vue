<style lang="scss" scoped>
@import "./Taxon-tabs.scss";
</style>
<template>
  <div>
    <b-tabs v-model="tabIndex" content-class="mt-4 mb-3 m-row w-100">
      <b-tab title="Overview">
        <TaxonTabOverview
          :data="data"
          :tabIndex.sync="tabIndex"
        ></TaxonTabOverview>
      </b-tab>
      <b-tab title="Images" v-if="data.taxonConcept.images.data.length > 0">
        <TaxonTabImages></TaxonTabImages>
      </b-tab>

      <!-- Specimen images -->
      <b-tab
        title="Specimen Images"
        v-if="data.taxonConcept.specimenImages.data.length > 0"
      >
        <TaxonTabSpecimenImages></TaxonTabSpecimenImages>
      </b-tab>
      <!-- Distribution -->
      <b-tab
        title="Distribution"
        v-if="data.taxonConcept.bioregions.length !== 0"
      >
        <TaxonTabDistribution :data="data"></TaxonTabDistribution>
      </b-tab>
      <!-- Classification -->
      <b-tab title="Classification" lazy>
        <TaxonClassificationComponent></TaxonClassificationComponent>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import DistributionMapConfig from "@/components/Distribution-map-config/Distribution-map-config";
import TaxonClassificationComponent from "@/components/Taxon-classification-component/Taxon-classification-component";

import TaxonTabOverview from "@/components/Taxon-tabs/Taxon-tab-overview/Taxon-tab-overview";
import TaxonTabImages from "@/components/Taxon-tabs/Taxon-tab-images/Taxon-tab-images";
import TaxonTabSpecimenImages from "@/components/Taxon-tabs/Taxon-tab-specimen-images/Taxon-tab-specimen-images";
import TaxonTabDistribution from "@/components/Taxon-tabs/Taxon-tab-distribution/Taxon-tab-distribution";

export default {
  name: "TaxonTabs",
  components: {
    TaxonTabOverview,
    TaxonTabImages,
    TaxonTabSpecimenImages,
    TaxonTabDistribution,
    TaxonClassificationComponent,
    DistributionMapConfig
  },
  props: ["data"],
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
};
</script>
