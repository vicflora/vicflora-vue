<template>
  <div>
    <b-container
      id="vf-browse-classification"
      class="m-container"
    >
      <b-row>
        <b-col class="text-left">
          <div class="page-header">
            <h1>Classification</h1>
          </div>
        </b-col>
      </b-row>
      <div v-if="taxonConcept">
        <TaxonClassificationHigherClassification
          :higherClassification="taxonConcept.higherClassification"
          :pageType="'classification'"
        />

        <!-- current taxon -->
        <TaxonClassificationCurrentTaxon
          :taxonConcept="taxonConcept"
          :depth="taxonConcept.higherClassification.length"
          :pageType="'classification'"
        />

        <!-- children -->
        <TaxonClassificationChildren
          :children="taxonConcept.children"
          :depth="taxonConcept.higherClassification.length + 1"
          :pageType="'classification'"
        />
      </div>
    </b-container>
  </div>
</template>

<script>
import TaxonClassificationHigherClassification from "~/components/Taxon/TaxonClassificationHigherClassification"
import TaxonClassificationCurrentTaxon from "~/components/Taxon/TaxonClassificationCurrentTaxon"
import TaxonClassificationChildren from "~/components/Taxon/TaxonClassificationChildren"
import taxonClassificationQuery from "@/graphql/queries/taxonClassificationQuery"

export default {
  name: "Classification",
  components: {
    TaxonClassificationHigherClassification,
    TaxonClassificationCurrentTaxon,
    TaxonClassificationChildren
  },
  head() {
    return {
      title: 'VicFlora – Classification',
    }
  },
  data(){
    return {
      taxonConcept: null,
    }
  },
  apollo: {
    taxonConcept: {
      query: taxonClassificationQuery,
      result({ loading, data }) {
        if (!loading) {
          $nuxt.$emit('progress-bar-stop')
          this.taxonConcept = data.taxonConcept
        }
      },
      skip: true,
    },
  },
  created() {
    this.$nuxt.$emit('progress-bar-start')
    this.$apollo.queries.taxonConcept.setVariables({id: this.$route.params.id})
    this.$apollo.queries.taxonConcept.skip = false
  },
}
</script>
