<template>
    <b-breadcrumb-item :to="`/flora/taxon/${crumb.taxonConcept.id}`">
      {{crumb.taxonConcept.taxonName.fullName}}
    </b-breadcrumb-item>
</template>

<script>

export default {
  name: "TaxonBreadcrumbsCrumb",
  props: {
    crumb: {
      type: Object,
      required: true
    }
  }
}
</script>