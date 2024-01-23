<template>
  <article class="container static-content">
    <header class="m-title">
      <h1>{{ markdown.title }}</h1>
    </header>
    <!-- content -->
    <BRow>
      <BCol align-self="start" cols="9" class="text-left">
        <nuxt-content
          id="scrollspy-nested"
          :document="markdown"
          class="m-content"
        />
      </BCol>
      <!-- table of content -->
      <BCol align-self="start" cols="3">
        <TableOfContent :toc="markdown.toc"></TableOfContent>
      </BCol>
    </BRow>
  </article>
</template>

<script>
const TableOfContent = () => import("@/components/App/AppTableOfContent")
const CurrentDateComponent = () => import("@/components/global/CurrentDateComponent")
const CurrentYearComponent = () => import("@/components/global/CurrentYearComponent")
const BioregionsMap = () => import("@/components/global/BioregionsMap")
const BioregionsImageMap = () => import("@/components/global/BioregionsImageMap")
const MarkdownAlertComponent = () => import("@/components/global/MarkdownAlertComponent")
const MarkdownButtonLinkComponent = () => import("@/components/global/MarkdownButtonLinkComponent")
const MarkdownFigureComponent = () => import("@/components/global/MarkdownFigureComponent")
const NaturalRegionMapImage = () => import("@/components/global/NaturalRegionMapImage")

export default {
  name:"StaticContent",
  components: {
    TableOfContent,
    CurrentDateComponent,
    CurrentYearComponent,
    BioregionsMap,
    BioregionsImageMap,
    MarkdownAlertComponent,
    MarkdownButtonLinkComponent,
    MarkdownFigureComponent,
    NaturalRegionMapImage,
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

    const pageTitle = `VicFlora: ${markdown.title}—character descriptions`

    let description = markdown.description ? (markdown.description.indexOf('\n') > -1 ?
      markdown.description.substr(markdown.description.indexOf('\n') + 1) :
      markdown.description) : null

    if (markdown.category == 'Multi-access keys' ) {
      description = `Character descriptions for the ${markdown.title}`
    }

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
      pageTitle: null,
      structuredData: null,
    }
  },
}
</script>

<style lang="scss">
#content {
  h2, h3, h4, h5 {
    clear: both;
  }
}
</style>