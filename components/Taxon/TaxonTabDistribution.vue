<template>
  <div v-if="load">
    <b-row>
      <b-col cols="12">
        <b-nav pills>
          <b-nav-item
            :active="showMap === 'Victoria'"
            @click="toggleMap('Victoria')"
          >Victoria</b-nav-item>

          <b-nav-item
            :active="showMap === 'Australia'"
            @click="toggleMap('Australia')"
          >Australia</b-nav-item>
        </b-nav>
      </b-col>
    </b-row>
    <b-row v-if="showMap==='Victoria'">
      <!-- Map -->
      <b-col cols="12" class="text-left">
        <distribution-map
          :taxonConceptId="concept.id"
          @layer="switchLayer($event)"
        />

        <TaxonTabDistributionLegend class="vf-distribution-tab-section" />

        <distribution-table
          v-if="layer != 'None'"
          :tableData="tableData"
          :layer="layer"
          class="vf-distribution-tab-section"
        />

        <TaxonTabDistributionSources
          :sources="concept.mapLinks.mapSource"
           class="vf-distribution-tab-section"
        />

      </b-col>
    </b-row>
    <b-row v-if="showMap==='Australia'">
      <b-col cols="12" class="text-left">
        <distribution-avh-map
          :name="concept.taxonName.fullName"
          :rankId="concept.taxonTreeDefItem.rankId"
        />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import DistributionMapConfig from "~/components/Distribution-map-config/Distribution-map-config"
import DistributionMap from "~/components/Taxon/TaxonTabDistributionMap"
import DistributionAvhMap from "~/components/Taxon/TaxonTabDistributionAvhMap"
import DistributionTable from "~/components/Taxon/TaxonTabDistributionTable"
import TaxonTabDistributionLegend from "~/components/Taxon/TaxonTabDistributionLegend"
import TaxonTabDistributionSources from "~/components/Taxon/TaxonTabDistributionSources"
import { waitTillActivatedMixin } from "~/mixins/waitTillActivatedMixin"
import TaxonConceptBioregionsQuery from "~/graphql/queries/taxonConceptBioregionsQuery"
import TaxonConceptLocalGovernmentAreasQuery from "~/graphql/queries/taxonConceptLocalGovernmentAreasQuery"
import TaxonConceptParkReservesQuery from "~/graphql/queries/taxonConceptParkReservesQuery"

export default {
  name: "TaxonTabDistribution",
  components: {
    DistributionMapConfig,
    DistributionMap,
    DistributionAvhMap,
    DistributionTable,
    TaxonTabDistributionLegend,
    TaxonTabDistributionSources,
  },
  mixins: [
    waitTillActivatedMixin
  ],
  props: {
    concept: {
      type: Object,
      required: true
    }
  },
  apollo: {
    taxonConceptBioregions: {
      query: TaxonConceptBioregionsQuery,
      result ({ data, loading }) {
        if (!loading) {
          this.tableData = data.taxonConceptBioregions
        }
      },
      skip: true,
    },
    taxonConceptLocalGovernmentAreas: {
      query: TaxonConceptLocalGovernmentAreasQuery,
      result ({ data, loading }) {
        if (!loading) {
          this.tableData = data.taxonConceptLocalGovernmentAreas
        }
      },
      skip: true,
    },
    taxonConceptParkReserves: {
      query: TaxonConceptParkReservesQuery,
      result ({ data, loading }) {
        if (!loading) {
          this.tableData = data.taxonConceptParkReserves
        }
      },
      skip: true,
    },
  },
  data(){
    return {
      tabIndex: 0,
      layer: "None",
      showMap: "Victoria",
      taxonConceptBioregions: [],
      taxonConceptLocalGovernmentAreas: [],
      taxonConceptParkReserves: [],
      tableData: [],
    }
  },
  computed: {
    variables() {
      return {
        taxonConceptId: this.concept.id,
      }
    }
  },
  created() {
    this.$apollo.queries.taxonConceptBioregions.setVariables({ ...this.variables })
    this.$apollo.queries.taxonConceptLocalGovernmentAreas.setVariables({ ...this.variables })
    this.$apollo.queries.taxonConceptParkReserves.setVariables({ ...this.variables })
  },
  methods:{
    switchLayer: function(newLayer){
      this.layer = newLayer
      switch(newLayer) {
        case 'Bioregions':
          if (this.taxonConceptBioregions.length) {
            this.tableData = this.taxonConceptBioregions
          }
          else {
            this.$apollo.queries.taxonConceptBioregions.skip = false
          }
          break
        case 'Local Government Areas':
          if (this.taxonConceptLocalGovernmentAreas.length) {
            this.tableData = this.taxonConceptLocalGovernmentAreas
          }
          else {
            this.$apollo.queries.taxonConceptLocalGovernmentAreas.skip = false
          }
          break
        case 'Parks and Reserves':
          if (this.taxonConceptParkReserves.length) {
            this.tableData = this.taxonConceptParkReserves
          }
          else {
            this.$apollo.queries.taxonConceptParkReserves.skip = false
          }
          break
      }
    },
    toggleMap: function(map) {
      this.showMap = map
    },
  },
}
</script>

<style lang="scss">
.vf-distribution-tab-section {
  margin-bottom: 1rem;
}
</style>
