<template>
  <b-breadcrumb>
    <!-- higherClassification -->
    <Crumb 
      v-for="crumb in breadcrumbs"
      :key="crumb.id"
      :crumb="crumb"
    />

    <!-- Siblings -->
    <b-breadcrumb-item class="vf-breadcrumb-item-siblings">
      <Siblings :siblings="data.taxonConcept.siblings"/>
    </b-breadcrumb-item>

    <!-- Children -->
    <b-breadcrumb-item 
      v-if="data.taxonConcept.children.length !== 0"
      class="vf-breadcrumb-item-children"
    >
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

<style lang="scss">
.breadcrumb {
  background-color: white;
  margin: 0;
  padding-left: 0;
  align-items: start;
}

.m-breadcrumb-selector-item {
  max-width: 200px;
  margin-left: 20px;
  margin-top: -47px;
}

.vf-breadcrumb-item-children .m-breadcrumb-selector-item {
  margin-left: 30px;
}

.breadcrumb-item + .vf-breadcrumb-item-children.breadcrumb-item::before {
  padding-left: 1rem;
}

.breadcrumb-item:first-child .m-breadcrumb-selector-item {
  margin-top: -5px;
  margin-left: 0;
}


</style>