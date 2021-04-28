<style lang="scss" scoped>
@import "./Taxon-name.scss";
</style>
<template>
  <div>
    <div class="m-title">
      <h2
        class="m-name"
        :style="
          data.taxonConcept.taxonTreeDefItem.rankId >= rankClass.genus
            ? 'font-style:italic;'
            : 'font-style:normal;'
        "
      >
        {{ data.taxonConcept.taxonName.fullName }}
      </h2>
      <span class="m-authorship">{{
        data.taxonConcept.taxonName.authorship
      }}</span>
      <span
        v-if="data.taxonConcept.preferredVernacularName"
        class="m-vernacular-names"
        >{{ data.taxonConcept.preferredVernacularName.name }}</span
      >
    </div>
    <div class="m-protologue" v-if="data.taxonConcept.taxonName.protologue">
      <i>{{ data.taxonConcept.taxonName.protologue.title }}</i>
      <b>{{ data.taxonConcept.taxonName.protologue.volume + ": " }}</b>
      <span>{{ data.taxonConcept.taxonName.protologue.pages }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TaxonName",
  props: ["data"],
  data() {
    return {
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
