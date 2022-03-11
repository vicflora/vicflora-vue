<template>
    <b-breadcrumb-item :to="`/flora/taxon/${taxonConcept.id}`">
      {{taxonConcept.taxonName.fullName}}
    </b-breadcrumb-item>
</template>

<script>

export default {
  name: "TaxonBreadcrumbsCrumb",
  props: {
    taxonConcept: {
      type: Object,
      required: true
    }
  }
}
</script>