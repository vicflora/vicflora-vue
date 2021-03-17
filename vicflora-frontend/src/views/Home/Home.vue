<style lang="scss" scoped>
@import "./Home.scss";
</style>

<template>
  <div class="m-homepage">
      <b-container>
        <b-row>
          <b-col cols="12" class="text-left" lg="6">
            <b-row>
              <div class="m-introduction">
                <b>VICFLORA</b> is a comprehensive and current guide to the wild plants of Victoria. With plant profiles, 
                identification tools and richly illustrated, the Royal Botanic Gardens Victoria provides this resource free-of-charge for land managers, 
                scientists, students and indeed anyone with an interest in Victorian plants.
              </div>
            </b-row>

            <b-row>
              <b-button block class="m-btn" size="lg" variant="primary" >Search</b-button>
              <b-button block class="m-btn" size="lg" variant="primary">Browse classification</b-button>
              <b-button block class="m-btn" size="lg" variant="primary">Keys</b-button>
            </b-row>

            <highlights></highlights>

          </b-col>
          <b-col cols="12" lg="6">
            <Carousel class="m-carousel"></Carousel>
          </b-col>
        </b-row>

      </b-container>
  </div>
</template>

<script>
import Carousel from "../../components/Carousel/Carousel"
import Highlights from "../../components/Home/Highlights"
export default {
  name: 'Home',
  components: {
    Carousel,
    Highlights
  }
}
</script>
