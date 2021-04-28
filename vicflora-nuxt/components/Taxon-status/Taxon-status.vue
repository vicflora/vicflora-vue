<style lang="scss" scoped>
@import "./Taxon-status.scss";
</style>
<template>
  <div>
    <b-row v-if="data.taxonConcept.taxonomicStatus">
      <b-col>
        <p class="m-status-class">Taxonomic status:</p>
        <span class="m-status-content">{{
          data.taxonConcept.taxonomicStatus.name
        }}</span>
      </b-col>
    </b-row>

    <b-row v-if="data.taxonConcept.occurrenceStatus">
      <b-col>
        <p class="m-status-class">Occurrence status:</p>
        <span class="m-status-content">{{
          data.taxonConcept.occurrenceStatus.name
        }}</span>
      </b-col>
    </b-row>

    <b-row v-if="data.taxonConcept.establishmentMeans">
      <b-col>
        <p class="m-status-class">Establishment means:</p>
        <span class="m-status-content">{{
          data.taxonConcept.establishmentMeans.name
        }}</span>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "TaxonName",
  props: ["data"],
  data() {
    return {
    };
  }
};
</script>
