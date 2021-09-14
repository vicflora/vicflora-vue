<template>
  <div>
    <b-container 
      id="vf-browse-classification" 
      class="m-container"
    >
      <b-row>
        <b-col class="text-left">
          <div class="m-title">
            <h2>Classification</h2>
          </div>
        </b-col>   
      </b-row>
      <div>
        <ApolloQuery
          :query="taxonClassificationQuery"
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
                :pageType="'classification'" 
              />

              <!-- current taxon -->
              <TaxonClassificationCurrentTaxon 
                :taxonConcept="data.taxonConcept"
                :depth="data.taxonConcept.higherClassification.length"
                :pageType="'classification'" 
              />

              <!-- children -->
              <TaxonClassificationChildren 
                :children="data.taxonConcept.children"
                :depth="data.taxonConcept.higherClassification.length + 1"
                :pageType="'classification'" 
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
    </b-container>
  </div>
</template>

<script>
import taxonClassificationQuery from "@/graphql/queries/taxonClassificationQuery"
import TaxonClassificationHigherClassification from "~/components/Taxon/TaxonClassificationHigherClassification"
import TaxonClassificationCurrentTaxon from "~/components/Taxon/TaxonClassificationCurrentTaxon"
import TaxonClassificationChildren from "~/components/Taxon/TaxonClassificationChildren"
import { watchRouteIdMixin } from "~/mixins/routeMixins"

export default {
  name: "Classification",
  components: {
    TaxonClassificationHigherClassification,
    TaxonClassificationCurrentTaxon,
    TaxonClassificationChildren
  },
  mixins: [watchRouteIdMixin],
  data(){
    return {
      taxonCClassificationQuery
    }
  },
}
</script>
