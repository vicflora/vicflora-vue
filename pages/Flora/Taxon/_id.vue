<template>
  <div class="taxon">
    <b-container>
      <ApolloQuery
        :query="require('@/graphql/queries/taxonConceptQuery.gql')"
        :variables="{ id }"
      >
        <template v-slot="{ result: { loading, error, data } }">
          <!-- Loading -->
          <div v-if="loading" class="loading apollo">Loading...</div>

          <!-- Error -->
          <div v-else-if="error" class="error apollo">An error occurred</div>

          <!-- Result -->
          <div v-else-if="data" class="result apollo">
            <!-- Breadcrumb -->
            <b-row v-if="data.taxonConcept.taxonomicStatus === 'ACCEPTED'">
              <b-col>
                <Breadcrumbs :data="data"/>
              </b-col>
            </b-row>
            <!-- Name -->
            <b-row>
              <b-col class="text-left">
                <TaxonName :concept="data.taxonConcept"/>
              </b-col>
            </b-row>
            <!-- Status -->
            <b-row class="m-row">
              <b-col class="text-left">
                <TaxonStatus :concept="data.taxonConcept"/>
              </b-col>
            </b-row>
            <b-row 
              v-if="data.taxonConcept.taxonomicStatus === 'ACCEPTED'"
              class="m-row">
              <b-col>
                <TaxonTabs
                  :concept="data.taxonConcept"
                  class="w-100"
                  @imagesPage="
                    $event => {
                      this.imagesPage = $event;
                    }
                  "
                  @specimenImagesPage="
                    $event => {
                      this.specimenImagesPage = $event;
                    }
                  "
                />
              </b-col>
            </b-row>
            <TaxonAcceptedConceptLink
              v-else-if="data.taxonConcept.acceptedConcept"
              :concept="data.taxonConcept.acceptedConcept"
            />

          </div>

          <!-- No result -->
          <div v-else class="no-result apollo">
            <div class="spinner-border mt-5 mb-1" role="status"></div>
            <h5>Loading...</h5>
          </div>
        </template>
      </ApolloQuery>
    </b-container>
  </div>
</template>

<script>
import Breadcrumbs from "@/components/Taxon/TaxonBreadcrumbs"
import TaxonName from "@/components/Taxon/TaxonName"
import TaxonStatus from "@/components/Taxon/TaxonStatus"
import TaxonTabs from "@/components/Taxon/TaxonTabs"
import TaxonClassification from "@/components/Taxon/TaxonClassification"
import TaxonAcceptedConceptLink from "~/components/Taxon/TaxonAcceptedConceptLink"

export default {
  name: "Taxon",
  components: {
    Breadcrumbs,
    TaxonName,
    TaxonStatus,
    TaxonTabs,
    TaxonClassification,
    TaxonAcceptedConceptLink
  },
  data() {
    return {
      id: null,
    }
  },
  watch: {
    '$route.params.id': {
      deep: true,
      immediate: true,
      handler: function(val) {
        this.id = val
      }
    }
  },
  mounted() {
    this.id = this.$route.params.id
  }
}
</script>