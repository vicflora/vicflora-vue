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

          <BRow>
            <BCol 
              v-for="card in homePage.cards" 
              :key="card.title"
            >
              <b-card
                
                :title="card.title"
                :img-src="card.image"
                img-alt="Image"
                img-top
                tag="article"
              >
                <!-- <b-button 
                  v-for="link in card.links"
                  :key="link.text"
                  :href="link.href" 
                  variant="primary">{{ link.text }}
                </b-button> -->
                <h6 v-for="link in card.links" :key="link.text">
                  <NuxtLink :to="link.to">{{ link.text }} <FontAwesomeIcon icon="caret-right"/></NuxtLink>
                </h6>
              </b-card>
            </BCol>
          </BRow>     

          <highlights :highlights="newsItems"/>
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
    const newsItems = await $content('posts')
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