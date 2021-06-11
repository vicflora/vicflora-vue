<template>
  <div>
    <b-row>
      <b-col class="text-left">
        <h4 class="m-distribution-title">Distribution</h4>
      </b-col>
    </b-row>
    <b-row>
      <!-- Map -->
      <b-col cols="12">
        <distribution-map :id="concept.id" @layer="switchLayer($event)"></distribution-map>
      </b-col>
      <distribution-table :concept="concept" :layer="layer"></distribution-table>
    </b-row>
    <b-row>
      <b-col class="text-left">
        <b>Source:</b>
        <p v-html="concept.mapLinks.mapSource"></p>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import DistributionMapConfig from "../Distribution-map-config/Distribution-map-config.vue";
import DistributionMap from "@/components/Taxon/TaxonTabDistributionMap.vue";
import DistributionTable from "@/components/Taxon/TaxonTabDistributionTable.vue";

export default {
  components: { DistributionMapConfig, DistributionMap, DistributionTable},
  name: "TaxonTabDistribution",
  props: {
    concept: {
      type: Object,
      required: true
    }
  },
  data(){
    return {
      layer:"Bioregions",
    }
  },
  methods:{
    switchLayer:function(newLayer){
      this.layer = newLayer
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/custom_variables.scss";

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

.m-legend {
  margin-left: -60px;
}

@media screen and (max-width: 1200px) {
  .m-legend {
    margin-left: 0;
    margin-bottom: 20px;
  }
}


</style>
