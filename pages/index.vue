<template>
  <div class="m-homepage">
    <BContainer>
      <BRow align-h="center">
        <BCol 
          cols="12" 
          class="text-left" 
          lg="12"
        >
          <div class="m-introduction" v-html="homePage.intro"/>

          <CardDeck :cards="homePage.cards"/>

          <Highlights :highlights="newsItems"/>
        </BCol>
      </BRow>
    </BContainer>
  </div>
</template>

<script>
const Carousel = () => import("@/components/App/TheCarousel")
const Highlights = () => import("@/components/App/TheHighlights")
const CardDeck = () => import("@/components/App/AppCardDeck")

export default {
  name: "Home",
  components: {
    Carousel,
    Highlights,
    CardDeck,
  },
  head() {
    return {
      __dangerouslyDisableSanitizers: ['script'],
      title: this.pageTitle,
      script: [{ innerHTML: JSON.stringify(this.structuredData), type: 'application/ld+json' }],
    }
  },
  async asyncData ({ $content }) {
    const homePage = await $content('home-page/index').fetch()

    const pageTitle = `VicFlora: ${homePage.title}`

    const structuredData = {
        "@context": "http://schema.org",
        "@type": "WebPage",
        headline: pageTitle,
        description: homePage.intro,
        publisher: {
          "@type": "Organization",
          name: "Royal Botanic Gardens Victoria",
          url: "https://www.rbg.vic.gov.au"
        },
        license: "https://creativecommons.org/licenses/by/4.0/",
        keywords: [ "botany", "flora", "Australia", "Victoria" ]
      }

    if ('datePublished' in homePage) {
      structuredData.datePublished = homePage.datePublished
    }

    if ('dateModified' in homePage) {
      structuredData.dateModified = homePage.dateModified
    }

    const newsItems = await $content('articles')
      .only(['title', 'description', 'path', 'thumbnail'])
      .sortBy('created', 'desc')
      .limit(3)
      .fetch()

    return {
      pageTitle,
      structuredData,
      homePage,
      newsItems,
    }
  },
  data() {
    return {
      pageTitle: null,
      structuredData: null,
      homePage: null,
    }
  }
}
</script>

<style lang="scss">
.m-introduction {
  font-size: 120%;
  padding: 1.5rem 0;
}
</style>