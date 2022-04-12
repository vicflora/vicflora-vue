<template>
  <div class="taxon">
    <b-container v-if="taxonConcept">
      <taxon-edit-menu
        v-if="$store.getters['isLoggedIn']"
        :concept="taxonConcept"
      />
      <b-row v-if="taxonConcept.taxonomicStatus === 'ACCEPTED'">
        <b-col>
          <last-search-button v-if="lastSearch && Object.keys(lastSearch).length"/>
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
const Breadcrumbs = () => import("@/components/Taxon/TaxonBreadcrumbs")
const LastSearchButton = () => import("@/components/Taxon/TaxonLastSeachButton")
const TaxonName = () => import("@/components/Taxon/TaxonName")
const TaxonStatus = () => import("@/components/Taxon/TaxonStatus")
const TaxonTabs = () => import("@/components/Taxon/TaxonTabs")
const TaxonClassification = () => import("@/components/Taxon/TaxonClassification")
const TaxonAcceptedConceptLink = () => import("@/components/Taxon/TaxonAcceptedConceptLink")
const TaxonEditMenu = () => import("@/components/Taxon/TaxonEditMenu")
import taxonConceptQuery from "@/graphql/queries/taxonConceptQuery"

export default {
  name: "Taxon",
  components: {
    Breadcrumbs,
    LastSearchButton,
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
      lastSearch: null,
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
    this.lastSearch = this.$store.state.lastSearch
  },
}
</script>
