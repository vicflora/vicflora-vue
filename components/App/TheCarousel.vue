<template>
  <div>
    <BCarousel
      id="carousel-1"
      v-model="currentSlide"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      img-width="515"
      img-height="670"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <BCarouselSlide 
        v-for="slide in slides" 
        :key="slide.index" 
        :img-src="slide.imgSource" 
        :text="slide.caption"
      />
    </BCarousel>
  </div>
</template>

<script>
  export default {
    name: "TheCarousel",
    props: {
      slides: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
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