<template>
  <div>
    <b-row>
      <b-col class="text-left">
        <h4 class="m-distribution-title">Distribution</h4>
      </b-col>
    </b-row>
    <b-row>
      <!-- Map -->
      <b-col lg="6" cols="12">
        <distribution-map></distribution-map>
        <!-- <ChecklistMap></ChecklistMap> -->

        <!-- <div class="m-images">
          <figure>
            <div class="m-map-container">
              <img
                :src="concept.mapLinks.distributionMap"
                usemap="#vicflora_bioregion"
                :alt="'Distribution of ' + concept.taxonName.fullName"
              />
              <DistributionMapConfig></DistributionMapConfig>
            </div>
          </figure>

          <div class="m-legend">
            <b-dropdown
              id="dropdown-left"
              text="Legend"
              variant="primary"
              size="sm"
            >
              <b-dropdown-item>
                <img
                  src="https://vicflora.rbg.vic.gov.au/images/vicflora-map-legend.png"
                />
              </b-dropdown-item>
            </b-dropdown>
          </div> 
        </div> -->
        <b-row>
          <b-col class="text-left">
      
            <b>Source:</b>
            <p v-html="concept.mapLinks.mapSource"></p>
          </b-col>
        </b-row>
      </b-col>
      <!-- Map table -->
      <b-col lg="6" cols="12" class="m-table">
        <table>
          <tr>
            <th></th>
            <th>Bioregion</th>
            <th>Occurrence status</th>
            <th>Establishment means</th>
          </tr>
          <tr
            v-for="bioregionItem in concept.bioregions"
            :key="bioregionItem.id"
          >
            <td>
              <div
                class="m-table-color-box"
                :style="
                  `background-color: ${
                    bioregionItem.occurrenceStatus.name === 'extinct'
                      ? '#e9aaff'
                      : '#a4f27d'
                  };`
                "
              ></div>
            </td>
            <td>{{ bioregionItem.bioregion.properties.name }}</td>
            <td>{{ bioregionItem.occurrenceStatus.name }}</td>
            <td>{{ bioregionItem.establishmentMeans.name }}</td>
          </tr>
        </table>

        <div class="text-right mt-4">
          <b-link>Bioregions of Victoria</b-link>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import DistributionMapConfig from '../Distribution-map-config/Distribution-map-config.vue';
import DistributionMap from '@/components/Taxon/TaxonTabDistributionMap.vue';

import ChecklistMap from "@/components/Checklists/Checklist-map/Checklist-map"
export default {
  components: { DistributionMapConfig, DistributionMap, ChecklistMap },
  name: "TaxonTabDistribution",
  props: {
    concept: {
      type: Object,
      required: true
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

.m-table {
  table {
    border-collapse: collapse;
    width: 100%;
  }
  .m-table-color-box {
    height: 15px;
    width: 30px;
    background-color: yellowgreen;
    border: 1px solid $grey;
  }

  td,
  th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 6px;
  }
  th {
    font-family: "goodsans-thin";
    color: white;
    background-color: $grey;
  }
}
</style>