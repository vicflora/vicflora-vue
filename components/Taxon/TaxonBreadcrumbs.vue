<template>
  <b-breadcrumb>
    <!-- higherClassification -->
    <Crumb
      v-for="item in concept.higherClassification"
      :key="item.id"
      :taxonConcept="item"
    />

    <!-- Siblings -->
    <b-breadcrumb-item class="vf-breadcrumb-item-siblings">
      <label
        class="sr-only"
        for="select-sibling"
      >Sibling</label>
      <Siblings :siblings="concept.siblings"/>
    </b-breadcrumb-item>

    <!-- Children -->
    <b-breadcrumb-item
      v-if="concept.children.length !== 0"
      class="vf-breadcrumb-item-children"
    >
      <label
        class="sr-only"
        for="select-child"
      >Child</label>
      <Children :children="concept.children"/>
    </b-breadcrumb-item>
  </b-breadcrumb>
</template>

<script>
const Crumb = () => import("@/components/Taxon/TaxonBreadcrumbsCrumb")
const Siblings = () => import("@/components/Taxon/TaxonBreadcrumbsSiblings")
const Children = () => import("@/components/Taxon/TaxonBreadcrumbsChildren")

export default {
  name: "TaxonBreadcrumbs",
  components: {
    Crumb,
    Siblings,
    Children
  },
  props: {
    concept: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      childrenSelected: null
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