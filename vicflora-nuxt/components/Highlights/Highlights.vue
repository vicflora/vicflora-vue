<style lang="scss" scoped>
 @import "./Highlights.scss";
</style>

<template>
  <div class="highlights">
    <b-row>
      <div class="m-highlight-title">
        <p>HIGHLIGHTS</p>
      </div>
    </b-row>

    <div v-for="item in highlights" :key="item.index">
    <b-row class="m-highlight">
      <b-col cols="3" class="m-highlight-col">
        <div>
          <img :src="item.img" class="m-highlight-image" alt=""/>
        </div>
      </b-col>
      <b-col cols="9" class="m-highlight-col">
        <div class="m-hightlight-1" v-html="item.text"></div>   
      </b-col>
    </b-row>
    </div>
  </div>

</template>

<script>
export default {
  name: 'Highlights',
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
}
</script>
