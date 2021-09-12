<template>
  <b-row>
    <b-col class="text-left m-item-name">
      <span class="m-status-class">Accepted in VicFlora as:</span>
      <NuxtLink 
        :to="`/flora/taxon/${concept.id}`"
        class="m-status-content"
      >
        <span class="m-taxon-name m-taxon-name-accepted m-taxon-name-italic">
          {{ concept.taxonName.fullName }}
        </span>
        <span class="vf-name-authorship">{{ concept.taxonName.authorship }}</span>
        
      </NuxtLink>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: "TaxonAcceptedConceptLink",
  props: {
    concept: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss">
.vf-name-authorship {
  color: initial;
}
</style>