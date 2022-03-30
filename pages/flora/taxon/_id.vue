<template>
  <div class="taxon">
    <b-container v-if="taxonConcept">
      <taxon-edit-menu
        v-if="$store.getters['isLoggedIn']"
        :concept="taxonConcept"
      />
      <b-row v-if="taxonConcept.taxonomicStatus === 'ACCEPTED'">
        <b-col>
          <Breadcrumbs :concept="taxonConcept"/>
        </b-col>
      </b-row>
      <!-- Name -->
      <b-row>
        <b-col class="text-left">
          <TaxonName :concept="taxonConcept"/>
        </b-col>
      </b-row>
      <!-- Status -->
      <b-row class="m-row">
        <b-col class="text-left">
          <TaxonStatus :concept="taxonConcept"/>
        </b-col>
      </b-row>
      <b-row
        v-if="taxonConcept.taxonomicStatus === 'ACCEPTED'"
        class="m-row">
        <b-col>
          <TaxonTabs
            :concept="taxonConcept"
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
        v-else-if="taxonConcept.acceptedConcept"
        :concept="taxonConcept.acceptedConcept"
      />
    </b-container>
  </div>
</template>

<script>
import Breadcrumbs from "@/components/Taxon/TaxonBreadcrumbs"
import TaxonName from "@/components/Taxon/TaxonName"
import TaxonStatus from "@/components/Taxon/TaxonStatus"
import TaxonTabs from "@/components/Taxon/TaxonTabs"
import TaxonClassification from "@/components/Taxon/TaxonClassification"
import TaxonAcceptedConceptLink from "@/components/Taxon/TaxonAcceptedConceptLink"
import TaxonEditMenu from "@/components/Taxon/TaxonEditMenu"
import taxonConceptQuery from "@/graphql/queries/taxonConceptQuery"

export default {
  name: "Taxon",
  components: {
    Breadcrumbs,
    TaxonName,
    TaxonStatus,
    TaxonTabs,
    TaxonClassification,
    TaxonAcceptedConceptLink,
    TaxonEditMenu,
  },
  data() {
    return {
      taxonConcept: null,
    }
  },
  apollo: {
    taxonConcept: {
      query: taxonConceptQuery,
      result({ data, loading }) {
        if (!loading) {
          $nuxt.$emit('progress-bar-stop')
          this.taxonConcept = data.taxonConcept
        }
      },
      skip: true
    }
  },
  created() {
    this.$nuxt.$emit('progress-bar-start')
    this.$apollo.queries.taxonConcept.setVariables({id: this.$route.params.id})
    this.$apollo.queries.taxonConcept.skip = false
  },
}
</script>
