<style lang="scss" scoped>
@import "./Carousel.scss";
</style>

<template>
  <div>
    <b-carousel
      id="carousel-1"
      v-model="currentSlide"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      img-width="530"
      img-height="690"
      style="text-shadow: 1px 1px 2px #333;"
      class="m-carousel-container"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <b-carousel-slide v-for="slide in slides" :key="slide.index" :img-src="slide.imgSource" :text="slide.caption"></b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script>
  export default {
    name: "Carousel",
    data() {
      return {
        slides: [
          {
            index: 0,
            imgSource: "https://data.rbg.vic.gov.au/cip/preview/image/public/4?maxsize=600",
            caption: "Illustration: Barley, Anita. ©2021 Royal Botanic Gardens Victoria. CC BY-NC-SA 4.0."
          },
          {
            index: 1,
            imgSource: "https://data.rbg.vic.gov.au/cip/preview/image/public/20?maxsize=600",
            caption: "Illustration: Barley, Anita. ©2021 Royal Botanic Gardens Victoria. CC BY-NC-SA 4.0."
          },
          {
            index: 2,
            imgSource: "https://data.rbg.vic.gov.au/cip/preview/image/public/12?maxsize=600",
            caption: "Illustration: Barley, Anita. ©2021 Royal Botanic Gardens Victoria. CC BY-NC-SA 4.0."
          },
          {
            index: 3,
            imgSource: "https://data.rbg.vic.gov.au/cip/preview/image/public/14?maxsize=600",
            caption: "Illustration: Barley, Anita. ©2021 Royal Botanic Gardens Victoria. CC BY-NC-SA 4.0."
          },
          {
            index: 4,
            imgSource: "https://data.rbg.vic.gov.au/cip/preview/image/public/2?maxsize=600",
            caption: "Illustration: Barley, Anita. ©2021 Royal Botanic Gardens Victoria. CC BY-NC-SA 4.0."
          },
          {
            index: 5,
            imgSource: "https://data.rbg.vic.gov.au/cip/preview/image/public/6?maxsize=600",
            caption: "Illustration: Barley, Anita. ©2021 Royal Botanic Gardens Victoria. CC BY-NC-SA 4.0."
          }
        ],
        currentSlide: 2,
        sliding: null
      }
    },
    methods: {
      onSlideStart() {
        this.sliding = true
      },
      onSlideEnd() {
        this.sliding = false
      }
    }
  }
</script>