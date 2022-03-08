<template>
  <footer class="m-footer">
    <BContainer>
      <BRow>
        <BCol class="text-left">
          <nuxt-link class="m-copyright" to='/pages/copyright'>Copyright and citation</nuxt-link> &bull;
          <nuxt-link class="m-copyright" to='/pages/contact-us'>Contact us</nuxt-link> &bull;
          <nuxt-link class="m-copyright" to='/pages/acknowledgements'>Acknowledgements</nuxt-link>

        </BCol>

        <BCol class="text-right">
          <div class="social-media">
            <a href="https://www.instagram.com/royalbotanicgardensvic/">
              <BIconInstagram 
                font-scale="1.5" 
                class="m-media"
              />
            </a>  
            <a href="https://www.facebook.com/BotanicGardensVictoria">
              <BIconFacebook 
                font-scale="1.5" 
                class="m-media"
              />
            </a>      
            <a href="https://twitter.com/RBG_Victoria">
              <BIconTwitter 
                font-scale="1.5" 
                class="m-media"
              />
            </a>
          </div>
        </BCol>
      </BRow>
    </BContainer>
  </footer>
</template>

<script>
export default {
   name: "TheFooter",
}
</script>

<style lang="scss" scoped>
@import "~/assets/scss/custom_variables.scss";

.m-footer {
    padding: 15px;   
    background-color: $light;
    span {
        color: white;
        font-size: small;  
    }
    .m-sponsor-image {
        margin: 8px 10px;
    }
}


.container {
    min-height: auto;
}
</style>
