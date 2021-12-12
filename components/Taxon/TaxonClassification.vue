<template>
  <div id="vf-taxon-classification">
    <ApolloQuery
      :query="taxonConceptQuery"
      :variables="{ id }"
    >
      <template v-slot="{ result: { loading, error, data } }">
        <!-- Loading -->
        <div v-if="loading" class="loading apollo">Loading...</div>

        <!-- Error -->
        <div v-else-if="error" class="error apollo">{{ error }}</div>

        <!-- Result -->
        <div v-else-if="data" class="result apollo">
          <!-- higher classification -->
          <TaxonClassificationHigherClassification 
            :higherClassification="data.taxonConcept.higherClassification" 
          />

          <!-- current taxon -->
          <TaxonClassificationCurrentTaxon 
            :taxonConcept="data.taxonConcept"
            :depth="data.taxonConcept.higherClassification.length"
          />

          <!-- children -->
          <TaxonClassificationChildren 
            :children="data.taxonConcept.children"
            :depth="data.taxonConcept.higherClassification.length + 1"
          />

        </div>

        <!-- No result -->
        <div v-else class="no-result apollo">
          <div class="spinner-border mt-5 mb-1" role="status"></div>
          <h5>Loading...</h5>
        </div>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
import taxonConceptQuery from "@/graphql/queries/taxonConceptQuery"
import TaxonClassificationHigherClassification from "~/components/Taxon/TaxonClassificationHigherClassification"
import TaxonClassificationCurrentTaxon from "~/components/Taxon/TaxonClassificationCurrentTaxon"
import TaxonClassificationChildren from "~/components/Taxon/TaxonClassificationChildren"
import { watchRouteIdMixin } from "~/mixins/routeMixins"

export default {
  name: "TaxonClassification",
  components: {
    TaxonClassificationHigherClassification,
    TaxonClassificationCurrentTaxon,
    TaxonClassificationChildren
  },
  mixins: [watchRouteIdMixin],
  data() {
    return {
      taxonConceptQuery
    }
  }
}
</script>
