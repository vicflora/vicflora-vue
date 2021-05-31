<template>
  <div class="highlights">
    <div class="m-highlight-title">
      <p>HIGHLIGHTS</p>
    </div>

    <BRow 
      v-for="item in highlights" 
      :key="item.index" 
      class="m-highlight"
    >
      <BCol 
        cols="3" 
        class="m-highlight-col"
      >
        <div>
          <img :src="item.img" class="m-highlight-image" alt=""/>
        </div>
      </BCol>
      <BCol 
        cols="9" 
        class="m-highlight-col"
      >
        <div 
          class="m-hightlight-1" 
          v-html="item.text"
        ></div> 
      </BCol>
    </BRow>
  </div>
</template>

<script>
export default {
  name: "TheHighlights",
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

<style lang="scss" scoped>
@import "~/assets/scss/custom_variables.scss";

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
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 0px;
  margin-right: 0px;

  .m-highlight-image {
    margin: 5px 0;
    width: 100px;
    height: 100px;
  }
}

.m-hightlight-new {
  color: red;
  font-family: "goodsans-black";
}
</style>

