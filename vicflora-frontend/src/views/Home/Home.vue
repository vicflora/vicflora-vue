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
                VICFLORA is a comprehensive and current guide to the wild plants of Victoria. With plant profiles, 
                identification tools and richly illustrated, the Royal Botanic Gardens Victoria provides this resource free-of-charge for land managers, 
                scientists, students and indeed anyone with an interest in Victorian plants.
              </div>
            </b-row>

            <b-row>
              <b-button block class="m-btn" variant="primary" >Search</b-button>
              <b-button block class="m-btn" variant="primary">Browse</b-button>
              <b-button block class="m-btn" variant="primary">Keys</b-button>
            </b-row>

            <b-row>
              <div class="m-highlight-title">
                <p>HIGHLIGHTS</p>
              </div>
            </b-row>

            <b-row class="m-highlight">
              <b-col cols="3" class="m-highlight-col">
                <div>
                  <img src="https://vicflora.rbg.vic.gov.au/images/home/lucid-logo-icon-150.png" class="m-highlight-image" alt=""/>
                </div>
              </b-col>
              <b-col cols="9" class="m-highlight-col">
                <div class="m-hightlight-1">
                  <h5><b><span class="m-hightlight-new">New</span> multi-access keys</b></h5>
                  New multi-access keys to <a href="https://vicflora.rbg.vic.gov.au/static/keys/fabaceae">Fabaceae</a> (excl. Acacia), 
                  <a href="https://vicflora.rbg.vic.gov.au/static/keys/cyperaceae">Cyperaceae</a> and 
                  <a href="https://vicflora.rbg.vic.gov.au/static/keys/juncaceae">Juncaceae</a> in Victoria.
                </div>   
              </b-col>
            </b-row>

            <b-row class="m-highlight">
              <b-col cols="3" class="m-highlight-col">
                <div>
                  <img src="https://vicflora.rbg.vic.gov.au/images/home/eucalcom.jpg" class="m-highlight-image" alt=""/>
                </div>
              </b-col>
              <b-col cols="9" class="m-highlight-col">
                <div class="m-hightlight-1">
                    <b>
                      <a href="https://vicflora.rbg.vic.gov.au/static/keys/eucalypts">
                        Multi-access key to the Eucalypts
                      </a>
                    </b>
                  <p>Check out our new multi-access key to the 159 species and infraspecific taxa of <i>Eucalyptus</i>, <i>Angophora</i> and <i>Corymbia</i> in Victoria.</p>
                </div>   
              </b-col>
            </b-row>

            <b-row class="m-highlight">
              <b-col cols="3" class="m-highlight-col">
                <div>
                  <img src="https://vicflora.rbg.vic.gov.au/images/home/microwal.jpg" class="m-highlight-image" alt=""/>
                </div>
              </b-col>
              <b-col cols="9" class="m-highlight-col">
                <div class="m-hightlight-1">
                  <b>
                    <a href="https://vicflora.rbg.vic.gov.au/static/keys/asteraceae">
                      Multi-access key to the Asteraceae
                    </a>
                  </b>   
                  <p>Check out our new multi-access key to the 618 species and infraspecific taxa of Asteraceae in Victoria.</p>
                </div>   
              </b-col>
            </b-row>
            
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
export default {
  name: 'Home',
  components: {
    Carousel,
  }
}
</script>
