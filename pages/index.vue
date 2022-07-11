<template>
  <div class="m-homepage">
    <BContainer>
      <BRow>
        <BCol 
          cols="12" 
          class="text-left" 
          lg="6"
        >
          <div class="m-introduction" v-html="homePage.intro"/>

          <CardDeck :cards="homePage.cards"/>

          <Highlights :highlights="newsItems"/>
        </BCol>

        
        <BCol cols="12" lg="6" align-self="center">
          <Carousel :slides="homePage.slides" class="m-carousel"/>
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
  async asyncData ({ $content }) {
    const homePage = await $content('home-page/index').fetch()
    const newsItems = await $content('articles')
      .only(['title', 'description', 'path', 'thumbnail'])
      .sortBy('created', 'desc')
      .limit(3)
      .fetch()

    return {
      homePage,
      newsItems
    }
  },
}
</script>