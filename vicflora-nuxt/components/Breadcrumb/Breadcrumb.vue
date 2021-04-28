<style lang="scss" scoped>
@import "./Breadcrumb.scss";
</style>

<template>
  <b-breadcrumb>
    <!-- higherClassification -->
    <b-breadcrumb-item
      v-for="higherItem in data.taxonConcept.higherClassification
        .slice()
        .sort((a, b) => a.depth - b.depth)
        .slice(3)"
      :key="higherItem.id"
      :href="'/flora/taxon/' + higherItem.taxonConcept.id"
      >{{ higherItem.taxonConcept.taxonName.fullName }}
    </b-breadcrumb-item>
    <!-- Siblings -->
    <b-breadcrumb-item>
      <div class="m-breadcrumb-selector-item">
        <b-form-select v-model="urlId" size="sm">
          <template #first>
            <b-form-select-option :value="null" disabled
              >Select sibling...</b-form-select-option
            >
          </template>
          <b-form-select-option
            v-for="siblingItem in data.taxonConcept.siblings"
            :key="siblingItem.id"
            :value="siblingItem.id"
            >{{ siblingItem.taxonName.fullName }}</b-form-select-option
          >
        </b-form-select>
      </div>
    </b-breadcrumb-item>
    <!-- Children -->
    <b-breadcrumb-item v-if="data.taxonConcept.children.length !== 0">
      <div class="m-breadcrumb-selector-item">
        <b-form-select v-model="childrenSelected" size="sm">
          <template #first>
            <b-form-select-option :value="null" disabled
              >Select child...</b-form-select-option
            >
          </template>
          <b-form-select-option
            v-for="childItem in data.taxonConcept.children"
            :key="childItem.id"
            :value="childItem.id"
            >{{ childItem.taxonName.fullName }}</b-form-select-option
          >
        </b-form-select>
      </div>
    </b-breadcrumb-item>
  </b-breadcrumb>
</template>

<script>

export default {
  name: "Breadcrumb",
  props: ["data"],
  data(){
      return {
          childrenSelected: null,
      }
  },
  computed: {
    urlId: {
      get: function() {
        return this.$route.params.id;
      },
      set: function(newVal) {
        this.$router.push({
          path: "/flora/taxon/" + newVal,
        });
      },
    },
  },
  watch: {
    urlId: {
      immediate: true,
      handler: function() {
        this.childrenSelected = null;
      },
    },
    childrenSelected: {
      handler: function(newVal) {
        if (this.childrenSelected !== null) {
          this.$router.push({
            path: "/flora/taxon/" + newVal,
          });
        }
      },
    },
  },
  beforeUpdate: function() {
    this.childrenSelected = null;
  },
};
</script>
