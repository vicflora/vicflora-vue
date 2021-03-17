<style lang="scss">
  @import "../../assets/scss/custom_variables.scss";

  .m-highlight-title {
    margin-top: 15px;
    margin-bottom: -15px;
    p {
      color: $grey;
      font-family: "goodsans-black";
      font-size: larger;
    }
  }

  .m-highlight {
    padding: 0 !important;
    border: 1px solid $light !important;
    border-radius: 10px;
    text-align: left;
    margin-top: 10px;
    margin-bottom: 10px;
    .m-highlight-col{
      display: flex;
      justify-items: center;
      align-items: center;
    }
    .m-highlight-image {
      margin: 5px 0;
      width: 100px;
      height: 100px;
    }
  }

  .m-hightlight-1 {
    line-height: 17px;
    margin: 2% 0;
    p {
      margin: 0px !important;
      text-align: justify;
      text-justify: auto;
    }
    b {
      font-family: "goodsans-bold";
    }
  }

  .m-hightlight-new {
    color: red;
    font-family: "goodsans-black";
  }
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
              "New multi-access keys to <a href=\"https://vicflora.rbg.vic.gov.au/static/keys/fabaceae\">Fabaceae</a> (excl. Acacia), " +
              "<a href=\"https://vicflora.rbg.vic.gov.au/static/keys/cyperaceae\">Cyperaceae</a> and " + 
              "<a href=\"https://vicflora.rbg.vic.gov.au/static/keys/juncaceae\">Juncaceae</a> in Victoria."
        },
        {
          index: 1,
          img: "https://vicflora.rbg.vic.gov.au/images/home/eucalcom.jpg",
          text: "<b><a href=\"https://vicflora.rbg.vic.gov.au/static/keys/eucalypts\">Multi-access key to the Eucalypts</a></b>" +
              "<p>Check out our new multi-access key to the 159 species and infraspecific taxa of <i>Eucalyptus</i>, <i>Angophora</i> and <i>Corymbia</i> in Victoria.</p>"
        },
        {
          index: 2,
          img: "https://vicflora.rbg.vic.gov.au/images/home/microwal.jpg",
          text: "<b><a href=\"https://vicflora.rbg.vic.gov.au/static/keys/asteraceae\">Multi-access key to the Asteraceae</a></b>" +
              "<p>Check out our new multi-access key to the 618 species and infraspecific taxa of Asteraceae in Victoria.</p>"
        }
      ]
    }
  }
}
</script>
