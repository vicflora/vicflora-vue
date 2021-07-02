<template>
  <div>
    <b-row v-if="concept.taxonomicStatus">
      <b-col>
        <p class="m-status-class">Taxonomic status:</p>
        <span class="m-status-content">{{
          concept.taxonomicStatus.name
        }}</span>
      </b-col>
    </b-row>

    <b-row v-if="concept.occurrenceStatus">
      <b-col>
        <p class="m-status-class">Occurrence status:</p>
        <span class="m-status-content">{{
          concept.occurrenceStatus.name
        }}</span>
      </b-col>
    </b-row>

    <b-row v-if="concept.establishmentMeans">
      <b-col>
        <p class="m-status-class">Establishment means:</p>
        <span class="m-status-content">{{
          concept.establishmentMeans.name
        }}</span>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "TaxonStatus",
  props: {
    concept: {
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