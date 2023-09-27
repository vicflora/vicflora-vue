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
import axios from 'axios'

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
  async asyncData({ params }) {
    if (process.server) {
      const url = 'http://solr:8983/solr/vicflora/select'
      const { id } = params
      try {
        const res = await axios.get(url, {
            params: {
              q: `id:${id}`,
              fl: 'id,scientific_name,description,created,modified'
            }
          }
        )
        const { response } = res.data
        if (response.numFound > 0) {
          const doc = response.docs[0]
          const pageTitle = `VicFlora: ${doc.scientific_name}`
          const structuredData = {
            "@context": "http://schema.org",
            "@type": "Webpage",
            "headline": pageTitle,
            "description": doc.description ? doc.description[0] : null,
            "datePublished": doc.created,
            "dateModified": doc.modified,
            "publisher": {
              "@type": "Organization",
              "name": "Royal Botanic Gardens Victoria",
              "url": "https://www.rbg.vic.gov.au"
            },
            "keywords": [ "botany", "flora", "Australia", "Victoria" ]
          }

          return {
            pageTitle,
            structuredData,
          }
        }
      }
      catch(error) {
        console.error(error)
      }
    }
  },
  data() {
    return {
      taxonConcept: null,
      lastSearch: null,
      pageTitle: 'Flora of Victoria',
      structuredData: {},
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
          this.structuredData = {
            "@context": "http://schema.org",
            "@type": "Webpage",
            "headline": this.pageTitle,
            "datePublished": this.taxonConcept.created,
            "dateModified": this.taxonConcept.modified,
            "publisher": {
              "@type": "Organization",
              "name": "Royal Botanic Gardens Victoria",
              "url": "https://www.rbg.vic.gov.au"
            },
            "keywords": [ "botany", "flora", "Australia", "Victoria" ]
          }
        }
      },
      error(error) {
        this.error = error
      },
      skip: true
    }
  },
  head() {
    return {
      __dangerouslyDisableSanitizers: ['script'],
      title: this.pageTitle,
      script: [{ innerHTML: JSON.stringify(this.structuredData), type: 'application/ld+json' }],
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
