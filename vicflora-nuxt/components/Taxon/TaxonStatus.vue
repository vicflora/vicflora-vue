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
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
    };
  }
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/custom_variables.scss";

.m-status-class {
  font-family: "goodsans-black";
  width: 180px;
  display: inline-flex;
  margin-bottom: 5px;
}

.m-status-content {
  text-transform: capitalize;
}
</style>