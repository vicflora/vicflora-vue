<template>
  <div class="taxon">
    <b-container v-if="taxonConcept">
      <taxon-edit-menu
        v-if="$store.getters['isLoggedIn']"
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
        v-if="taxonConcept.taxonomicStatus === 'ACCEPTED' && taxonConcept.occurrenceStatus !== 'EXCLUDED'"
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
      <div v-else>
        <TaxonAcceptedConceptLink
          v-if="taxonConcept.acceptedConcept"
          :concept="taxonConcept.acceptedConcept"
        />
        <div v-if="taxonConcept.remarks" v-html="taxonConcept.remarks"></div>
      </div>
    </b-container>
    <b-container v-if="error">
      <b-row>
        <b-col>
          <ErrorMessage :error="error"/>
        </b-col>
      </b-row>
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
const ErrorMessage = () => import('@/components/App/AppErrorMessage')
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
    ErrorMessage,
  },
  head() {
    if (this.taxonConcept) {
      return {
        title: this.pageTitle,
        link: [
          {
            rel: "schema.dcterms",
            href: "http://purl.org/dc/terms/"
          },
          {
            rel: "schema.AGLSTERMS",
            href: "http://www.agls.gov.au/agls/terms/"
          }
        ],
        meta: [
          {
            name: "dcterms.title",
            content: this.pageTitle
          },
          {
            name: "dcterms.identifier",
            content: `https://vicflora.rbg.vic.gov.au${this.$route.path}`
          },
          {
            name: "dcterms.creator",
            content: "scheme=AGLSTERMS.AglsAgent; corporateName=Royal Botanic Gardens Victoria; address=Birdwood Avenue, Melbourne 3004; contact=+61 3 92522300"
          },
          {
            name: "dcterms.publisher",
            content: "scheme=AGLSTERMS.AglsAgent; corporateName=Royal Botanic Gardens Victoria; address=Birdwood Avenue, Melbourne 3004; contact=+61 3 92522300"
          },
          {
            name: "dcterms.description",
            content: `Treatment of ${this.taxonConcept.taxonName.fullName}`
          },
          {
            name: "dcterms.created",
            content: `scheme=dcterms.ISO8601; ${this.taxonConcept.createdAt}`
          },
          {
            name: "dcterms.modified",
            content: `scheme=dcterms.ISO8601; ${this.taxonConcept.createdAt}`
          },
          {
            name: "dcterms.language",
            content: "dcterms.RFC4646; en-AU"
          },
        ],
        script: [{ innerHTML: JSON.stringify(this.structuredData), type: 'application/ld+json' }],
      }
    }
  },
  data() {
    return {
      structuredData: {
        "@context": "http://schema.org",
        "@type": "Webpage",
        "headline": "",
        "datePublished": "",
        "dateModified": "",
        "publisher": {
          "@type": "Organization",
          "name": "Royal Botanic Gardens Victoria",
          "url": "https://www.rbg.vic.gov.au"
        },
        "keywords": [ "botany", "flora", "Australia", "Victoria" ]
      },
      taxonConcept: null,
      lastSearch: null,
      pageTitle: 'Flora of Victoria',
      error: null,
    }
  },
  apollo: {
    taxonConcept: {
      query: taxonConceptQuery,
      result({ data, loading }) {
        if (!loading) {
          $nuxt.$emit('progress-bar-stop')
          this.taxonConcept = data.taxonConcept
          this.pageTitle = `VicFlora: ${data.taxonConcept.taxonName.fullName}`
          this.structuredData.headline = `VicFlora: ${data.taxonConcept.taxonName.fullName}`
          this.structuredData.datePublished = data.taxonConcept.createdAt
          this.structuredData.dateModified = data.taxonConcept.updatedAt
          this.structuredData.keywords.push(data.taxonConcept.taxonName.fullName)
        }
      },
      error(error) {
        this.error = error
      },
      skip: true
    }
  },
  created() {
    this.$nuxt.$emit('progress-bar-start')
    this.$apollo.queries.taxonConcept.setVariables({id: this.$route.params.id})
    this.$apollo.queries.taxonConcept.skip = false
    this.lastSearch = this.$store.state.lastSearch

    this.$nuxt.$on('refetch-data-button-clicked', () => {
      console.log('Refetching data...')
      this.$apollo.queries.taxonConcept.refetch()
    })
  },
}
</script>
