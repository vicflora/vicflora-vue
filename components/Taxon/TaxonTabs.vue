<template>
  <div>
    <b-tabs v-model="tabIndex" content-class="mt-4 mb-3 m-row w-100">
      <b-tab title="Overview">
        <TaxonTabOverview
          :concept="concept"
          :tabIndex.sync="tabIndex"
        />
      </b-tab>

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

      <!-- Distribution -->
      <b-tab
        title="Distribution"
        v-if="concept.bioregions.length !== 0"
        lazy
      >
        <TaxonTabDistribution :concept="concept"/>
      </b-tab>

      <!-- Classification -->
      <b-tab title="Classification" lazy>
        <TaxonClassification/>
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

<style lang="scss" scoped>
.m-row {
  margin-bottom: 25px;
}

.m-images {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  .m-map-container {
    width: 480px;
    height: 290px;
  }

  .m-image-container {
    width: 177px;
    height: 177px;
    margin-bottom: 5px;
    margin-right: 5px;
    padding: 2px;
    background-color: #fff;
    border: 1px solid #dee2e6;
    border-radius: 0.25rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    img {
      max-width: 170px;
      max-height: 170px;
      padding: 0;
      background-color: none;
      border: none;
      border-radius: none;
    }
  }
}

.m-modal-class {
  background-color: fade-in($color: #00000069, $amount: 0);
  .modal-content {
    margin: 5vh 10vw;
    .modal-header {
      .modal-title {
        font-family: "goodsans-medium";
      }
    }
    .modal-body {
      .m-modal-iframe {
        width: 100%;
        height: 100%;
      }
    }
  }
}


.m-distribution-title {
  font-family: "goodsans-medium";
  margin-bottom: 20px;
}
</style>