<template>
  <div>
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      img-width="1024"
      img-height="480"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <!-- Text slides with image -->
      <b-carousel-slide
        text="Illustration: Barley, Anita. ©2021 Royal Botanic Gardens Victoria. CC BY-NC-SA 4.0."
        img-src="https://data.rbg.vic.gov.au/cip/preview/image/public/4?maxsize=600"
      ></b-carousel-slide>

      <!-- Slides with custom text -->
      <b-carousel-slide img-src="https://data.rbg.vic.gov.au/cip/preview/image/public/20?maxsize=600"
         text="Illustration: Barley, Anita. ©2021 Royal Botanic Gardens Victoria. CC BY-NC-SA 4.0."
      >
      </b-carousel-slide>

      <!-- Slides with image only -->
      <b-carousel-slide img-src="https://data.rbg.vic.gov.au/cip/preview/image/public/12?maxsize=600"
        text="Illustration: Barley, Anita. ©2021 Royal Botanic Gardens Victoria. CC BY-NC-SA 4.0."
      ></b-carousel-slide>

       <b-carousel-slide img-src="https://data.rbg.vic.gov.au/cip/preview/image/public/14?maxsize=600"
        text="Illustration: Barley, Anita. ©2021 Royal Botanic Gardens Victoria. CC BY-NC-SA 4.0."
      ></b-carousel-slide>

       <b-carousel-slide img-src="https://data.rbg.vic.gov.au/cip/preview/image/public/2?maxsize=600"
        text="Illustration: Barley, Anita. ©2021 Royal Botanic Gardens Victoria. CC BY-NC-SA 4.0."
      ></b-carousel-slide>

      <b-carousel-slide img-src="https://data.rbg.vic.gov.au/cip/preview/image/public/6?maxsize=600"
        text="Illustration: Barley, Anita. ©2021 Royal Botanic Gardens Victoria. CC BY-NC-SA 4.0."
      ></b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script>
  export default {
    name: "Carousel",
    data() {
      return {
        slide: 0,
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