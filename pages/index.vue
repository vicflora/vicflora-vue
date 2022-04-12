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

          <NuxtLink 
            to="/flora/search?q=**" 
            class="btn btn-lg btn-block btn-primary"
          >Search</NuxtLink>

          <NuxtLink 
            to="/flora/classification/6abc498a-70de-11e6-a989-005056b0018f" 
            class="btn btn-lg btn-block btn-primary"
          >Browse classification</NuxtLink>

          <a 
            href="https://keybase.rbg.vic.gov.au/keys/show/1903" 
            class="btn btn-lg btn-block btn-primary"
          >Keys</a>
          
          <highlights :highlights="homePage.highlights"/>
        </BCol>

        
        <b-col cols="12" lg="6" align-self="center">
          <Carousel :slides="homePage.slides" class="m-carousel"/>
        </b-col>
      </BRow>
    </BContainer>
  </div>
</template>

<script>
const Carousel = () => import("@/components/App/TheCarousel")
const Highlights = () => import("@/components/App/TheHighlights")

export default {
  name: "Home",
  components: {
    Carousel,
    Highlights
  },
  async asyncData ({ $content }) {
    const homePage = await $content('home-page/index').fetch()
    return {
      homePage
    }
  },
}
</script>