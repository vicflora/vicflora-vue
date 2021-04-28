<style lang="scss" scoped>
// the style file in the Taxon.scss
</style>

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
        <div class="m-images">
          <figure>
            <div class="m-map-container">
              <img
                :src="data.taxonConcept.mapLinks.distributionMap"
                usemap="#vicflora_bioregion"
                :alt="'Distribution of ' + data.taxonConcept.taxonName.fullName"
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
        </div>
        <b-row>
          <b-col class="text-left">
            <b>Source:</b>
            <p v-html="data.taxonConcept.mapLinks.mapSource"></p>
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
            v-for="bioregionItem in data.taxonConcept.bioregions"
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
            <td>
              {{ bioregionItem.bioregion.properties.subregion }}
            </td>
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
export default {
  name: "TaxonTabDistribution",
  props: ["data"],
  data() {
    return {};
  }
};
</script>
