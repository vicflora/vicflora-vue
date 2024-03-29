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
  async asyncData({ app, params }) {
    const client = app.apolloProvider.defaultClient;
    const { id } = params;
    try {
      const res = await client.query({
        query: taxonConceptQuery,
        variables: {
          id: id,
        },
      })

      const { taxonConcept } = res.data
      const pageTitle = `VicFlora: ${taxonConcept.taxonName.fullName}`
      const dateModified = taxonConcept.currentProfile && taxonConcept.currentProfile.modified ? 
              taxonConcept.currentProfile.modified : taxonConcept.updatedAt.substr(0, 10)

      const articleData = {
        "@context": "http://schema.org",
        "@type": "WebPage",
        headline: `VicFlora: ${taxonConcept.taxonName.fullName}`,
        description: `VicFlora treatment of ${taxonConcept.taxonName.fullName}`,
        datePublished: taxonConcept.createdAt.substr(0, 10),
        dateModified: dateModified,
        publisher: {
          "@type": "Organization",
          name: "Royal Botanic Gardens Victoria",
          url: "https://www.rbg.vic.gov.au"
        },
        license: "https://creativecommons.org/licenses/by/4.0/",
        keywords: [ "botany", "flora", "Australia", "Victoria", taxonConcept.taxonName.fullName ]
      }

      const breadcrumbList = []
      if (taxonConcept.higherClassification) {
        taxonConcept.higherClassification.forEach((element, index) => {
          const item = {
            "@type": "ListItem",
            position: index + 1,
            name: element.taxonName.fullName,
            item: `${process.env.APP_URL}/flora/taxon/${element.id}`
          }
          breadcrumbList.push(item)
        })
      }

      let structuredData = articleData

      if (breadcrumbList.length) {
        const breadcrumbData = {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": breadcrumbList
        }
        structuredData = [
          articleData,
          breadcrumbData
        ]
      }

      const tabs = []
      if (taxonConcept.currentProfile) {
        tabs.push({
          title: 'Treatment',
          component: ''
        })
      }

      return {
        pageTitle,
        taxonConcept,
        structuredData,
        tabs
      }
    }
    catch(error) {
      return error
    }
  },
  data() {
    return {
      taxonConcept: null,
      pageTitle: "VicFlora",
      structuredData: {},
      lastSearch: null,
      error: null,
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
    this.lastSearch = this.$store.state.lastSearch
  },
}
</script>