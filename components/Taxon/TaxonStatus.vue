<template>
  <div>
    <b-row v-if="concept.taxonomicStatus">
      <b-col>
        <p class="m-status-class">Taxonomic status:</p>
        <span class="m-status-content">{{
          taxonomicStatusEnum[concept.taxonomicStatus]
        }}</span>
      </b-col>
    </b-row>

    <b-row v-if="concept.occurrenceStatus">
      <b-col>
        <p class="m-status-class">Occurrence status:</p>
        <span class="m-status-content">{{
          occurrenceStatusEnum[concept.occurrenceStatus]
        }}</span>
      </b-col>
    </b-row>

    <b-row v-if="concept.establishmentMeans">
      <b-col>
        <p class="m-status-class">Establishment means:</p>
        <span class="m-status-content">{{
          establishmentMeansEnum[concept.establishmentMeans]
        }}</span>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import taxonomicStatusEnum from "~/graphql/enums/taxonomicStatusEnum"
import occurrenceStatusEnum from "~/graphql/enums/occurrenceStatusEnum"
import establishmentMeansEnum from "~/graphql/enums/establishmentMeansEnum"

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
      taxonomicStatusEnum,
      occurrenceStatusEnum,
      establishmentMeansEnum
    };
  }
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/custom_variables.scss";

.m-status-class {
  width: 180px;
  display: inline-flex;
  margin-bottom: 5px;
  font-weight: bold;
}
</style>