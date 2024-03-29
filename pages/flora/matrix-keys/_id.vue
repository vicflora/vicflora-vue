<template>
  <b-container id="lucid-player-container">
    <div v-if="matrixKey">
      <ol class="breadcrumb" v-if="matrixKey.taxonConcepts.length">
        <li v-for="item in matrixKey.taxonConcepts" :key="item.id" class="breadcrumb-item">
          <nuxt-link :to="`/flora/taxon/${item.id}`">{{ item.taxonName.fullName }}</nuxt-link>
        </li>
      </ol>
      <h3 class="key-title mt-1 mb-4">{{ matrixKey.title }}</h3>
      <p>
        <icon-button-link :to="`/pages/${$route.params.id}`" icon="info-circle" text="Description of characters" />
      </p>
    </div>
    <iframe :src="`/lucid-keys/${slug}`" />
  </b-container>
</template>

<script>
const IconButtonLink = () => import("@/components/App/AppIconButtonLink")
import matrixKeyQuery from "@/graphql/queries/matrixKeyQuery"

export default {
  name: 'MatrixKeyPage',
  components: {
    IconButtonLink,
  },
  head() {
    return {
      __dangerouslyDisableSanitizers: ['script'],
      title: this.pageTitle,
      script: [{ innerHTML: JSON.stringify(this.structuredData), type: 'application/ld+json' }],
    }
  },
  async asyncData({ $content, params }) {
    const markdown = await $content(`pages/${params.id.toLowerCase()}`).fetch()
    const pageTitle = `VicFlora: ${markdown.title}`

    const description = markdown.description.indexOf('\n') > -1 ?
      markdown.description.substr(markdown.description.indexOf('\n') + 1) :
      markdown.description

    const keywords = [
      "botany",
      "flora",
      "identification",
      "multi-access key",
      "Australia",
      "Victoria"
    ].concat(markdown.taxonomicScope)


    const structuredData = {
      "@context": "http://schema.org",
      "@type": "WebPage",
      headline: pageTitle,
      description: description,
      publisher: {
        "@type": "Organization",
        name: "Royal Botanic Gardens Victoria",
        url: "https://www.rbg.vic.gov.au"
      },
      license: "https://creativecommons.org/licenses/by/4.0/",
      keywords: keywords
    }

    if ('datePublished' in markdown) {
      structuredData.datePublished = markdown.datePublished
    }

    if ('dateModified' in markdown) {
      structuredData.dateModified = markdown.dateModified
    }

    return { pageTitle, structuredData, markdown }
  },
  data() {
    return {
      matrixKey: null,
      pageTitle: null,
      structuredData: null,
      markdown: null,
    }
  },
  apollo: {
    matrixKey: {
      query: matrixKeyQuery,
      result({ data, loading }) {
        if (!loading) {
          this.matrixKey = data.matrixKey
        }
      },
      skip: true,
    },
  },
  computed: {
    slug() {
      return this.$route.params.id
    }
  },
  created() {
    this.$apollo.queries.matrixKey.setVariables({ path: this.$route.path })
    this.$apollo.queries.matrixKey.skip = false
  }
}
</script>