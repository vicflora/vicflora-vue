<template>
  <b-breadcrumb>
    <!-- higherClassification -->
    <!-- <b-breadcrumb-item
      v-for="higherItem in data.taxonConcept.higherClassification
        .slice()
        .sort((a, b) => a.depth - b.depth)
        .slice(3)"
      :key="higherItem.id"
      :href="'/flora/taxon/' + higherItem.taxonConcept.id"
      >{{ higherItem.taxonConcept.taxonName.fullName }}
    </b-breadcrumb-item> -->
    <Crumb 
      v-for="crumb in breadcrumbs"
      :key="crumb.id"
      :crumb="crumb"/>

    <!-- Siblings -->
    <b-breadcrumb-item>
      <Siblings :siblings="data.taxonConcept.siblings"/>
    </b-breadcrumb-item>

    <!-- Children -->
    <b-breadcrumb-item v-if="data.taxonConcept.children.length !== 0">
      <!-- <div class="m-breadcrumb-selector-item">
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
      </div> -->
      <Children :children="data.taxonConcept.children"/>
    </b-breadcrumb-item>
  </b-breadcrumb>
</template>

<script>
import Crumb from "@/components/Taxon/TaxonBreadcrumbsCrumb"
import Siblings from "@/components/Taxon/TaxonBreadcrumbsSiblings"
import Children from "@/components/Taxon/TaxonBreadcrumbsChildren"

export default {
  name: "TaxonBreadcrumbs",
  components: {
    Crumb,
    Siblings,
    Children
  },
  props: {
    data: {
      type: Object,
      required: true
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
    breadcrumbs() {
      return this.data.taxonConcept.higherClassification
        .slice()
        .sort((a, b) => a.depth - b.depth)
        .slice(3)
    }
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

<style lang="scss" scoped>
.m-breadcrumb-selector-item {
  margin-top: -10px;
  display: inline-block;
  .custom-select-sm {
    font-size: 11px;
  }
}
</style>