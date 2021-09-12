<template>
  <BRow>
    <BCol class="text-left">
      <div v-if="synonyms.length > 0">
        <h3>Synonyms</h3>
        <ul>
          <TaxonTabSynonymyItem
            v-for="synonym in synonyms"
            :key="synonym.id"
            :id="synonym.id"
            :full-name="synonym.taxonName.fullName"
            :authorship="synonym.taxonName.authorship"
          />
        </ul>
      </div>
      <div v-if="misapplications.length > 0">
        <h3>Misapplications</h3>
        <ul>
          <TaxonTabSynonymyItem
            v-for="misapplication in misapplications"
            :key="misapplication.id"
            :id="misapplication.id"
            :full-name="misapplication.taxonName.fullName"
            :authorship="misapplication.taxonName.authorship"
            :according-to="misapplication.accordingTo.title"
          />
        </ul>
      </div>
    </BCol>
  </BRow>
</template>

<script>
import TaxonTabSynonymyItem from "~/components/Taxon/TaxonTabSynonymyItem"

export default {
  name: "TaxonTabSynonymy",
  components: {
    TaxonTabSynonymyItem
  },
  props: {
    synonyms: {
      type: Array,
      required: false
    },
    misapplications: {
      type: Array,
      required: false
    }
  }
}
</script>