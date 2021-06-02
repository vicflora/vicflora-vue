<template>
    <b-breadcrumb-item :href="href">{{fullName}}</b-breadcrumb-item>
</template>

<script>
export default {
  name: "TaxonBreadcrumbsCrumb",
  props: {
    crumb: {
      type: Object,
      required: true
    }
  },
  computed: {
    fullName() {
      return this.crumb.taxonConcept.taxonName.fullName
    },
    href() {
      return this.crumb.taxonConcept.id
    }
  }
}
</script>