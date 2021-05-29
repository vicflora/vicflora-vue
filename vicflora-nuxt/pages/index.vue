<style lang="scss" scoped>
@import "./Home.scss";
</style>

<template>
  <div class="m-homepage">
    <b-container>
      <b-row>
        <b-col cols="12" class="text-left" lg="6">
          <div class="m-introduction">
            <b>VICFLORA</b> is a comprehensive and current guide to the wild
            plants of Victoria. With plant profiles, identification tools and
            richly illustrated, the Royal Botanic Gardens Victoria provides
            this resource free-of-charge for land managers, scientists,
            students and indeed anyone with an interest in Victorian plants.
          </div>

          <nuxt-link to="/flora/search?q=**" class="btn btn-lg btn-block btn-primary">Search</nuxt-link>

          <nuxt-link to="/flora/classification/6abc498a-70de-11e6-a989-005056b0018f" class="btn btn-lg btn-block btn-primary">Browse classification</nuxt-link>

          <a href="https://keybase.rbg.vic.gov.au/keys/show/1903" class="btn btn-lg btn-block btn-primary">Keys</a>
          <highlights></highlights>
        </b-col>

        
        <b-col cols="12" lg="6" align-self="center">
          <Carousel class="m-carousel"></Carousel>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Carousel from "@/components/Carousel/Carousel";
import Highlights from "@/components/Highlights/Highlights";

export default {
  name: "Home",
  components: {
    Carousel,
    Highlights,
  },
  data() {
    return {
      highlights: [
        {
          index: 0,
          img: "https://vicflora.rbg.vic.gov.au/images/home/lucid-logo-icon-150.png",
          text: "<h5><b><span class=\"m-hightlight-new\">New</span> multi-access keys</b></h5>" +
              "New multi-access keys to <a href=\"/keys/fabaceae\">Fabaceae</a> (excl. Acacia), " +
              "<a href=\"/keys/cyperaceae\">Cyperaceae</a> and " + 
              "<a href=\"/keys/juncaceae\">Juncaceae</a> in Victoria."
        },
        {
          index: 1,
          img: "https://vicflora.rbg.vic.gov.au/images/home/eucalcom.jpg",
          text: "<b><a href=\"keys/eucalypts\">Multi-access key to the Eucalypts</a></b>" +
              "<p>Check out our new multi-access key to the 159 species and infraspecific taxa of <i>Eucalyptus</i>, <i>Angophora</i> and <i>Corymbia</i> in Victoria.</p>"
        },
        {
          index: 2,
          img: "https://vicflora.rbg.vic.gov.au/images/home/microwal.jpg",
          text: "<b><a href=\"/keys/asteraceae\">Multi-access key to the Asteraceae</a></b>" +
              "<p>Check out our new multi-access key to the 618 species and infraspecific taxa of Asteraceae in Victoria.</p>"
        }
      ]
    }
  }

};
</script>
