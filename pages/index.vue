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
import Carousel from "@/components/App/TheCarousel"
import Highlights from "@/components/App/TheHighlights"

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

<style lang="scss" scoped>
@import "@/assets/scss/custom_variables.scss";

.m-homepage {
  background-color: white;
  .m-introduction {
    margin-top: 15px;
    margin-bottom: 15px;
    text-align: justify;
    text-justify: auto;
  }
  .m-btn {
    display: block;
    margin-top: 5px;
    margin-bottom: 5px;
    a {
      color: white;
    }
    a:hover {
      text-decoration: none;
    }
  }
  .m-carousel {
    margin: 15px 5px;
    border-radius: 10px;
  }
  .container {
    min-height: auto;
  }

  .btn-primary {
    background-color: $light;
    border-color: $light;
    color: $primary;
    font-weight: bold;
  }
}
</style>