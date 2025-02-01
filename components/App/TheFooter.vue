<template>
  <footer class="m-footer vicflora-footer">
    <div class="vicflora-footer">
    <BContainer :fluid="fluid">
      <BRow>
        <BCol class="text-right">
          <nuxt-link class="m-copyright" to='/pages/copyright'>Copyright and citation</nuxt-link> &bull;
          <nuxt-link class="m-copyright" to='/pages/contact-us'>Contact us</nuxt-link> &bull;
          <nuxt-link class="m-copyright" to='/pages/acknowledgements'>Acknowledgements</nuxt-link>
        </BCol>
      </BRow>
    </BContainer>
    </div>

    <div class="rbgv-footer">
    <BContainer :fluid="fluid">
      <BRow>
        <BCol class="text-left">
          <div class="rbgv-website">
            <a href="https://www.rbg.vic.gov.au" target="_blank">
              <img src="@/assets/images/rbgv-logo-lg.svg" alt="RBGV logo"/>
            </a>
          </div>
        </BCol>
        <BCol class="text-right">
          <div class="social-media">
            <a href="https://www.instagram.com/royalbotanicgardensvic/" target="_blank">
              <BIconInstagram
                font-scale="1.5"
                class="m-media"
              />
            </a>
            <a href="https://www.facebook.com/BotanicGardensVictoria" target="_blank">
              <BIconFacebook
                font-scale="1.5"
                class="m-media"
              />
            </a>
            <a href="https://twitter.com/RBG_Victoria" target="_blank">
              <BIconTwitter
                font-scale="1.5"
                class="m-media"
              />
            </a>
            <a href="https://www.youtube.com/channel/UCSVV1rE_DbHr8MPzFu9g5WQ" target="_blank">
              <BIconYoutube
                font-scale="1.5"
                class="m-media"
              />
            </a>
          </div>
        </BCol>
      </BRow>
      <div class="acknowledgement-of-country">
        <div>
          <img 
            alt="Aboriginal, Torres Strait Islander and Progress Pride flags" 
            src="@/assets/images/inclusion-flags.png"
          />
        </div>
        <div>Royal Botanic Gardens Victoria acknowledges the Traditional Owners
        of the land on which we work and learn and pay our respects to their
        Elders past and present. Read more about how the Gardens values
        inclusion in our <a
        href="https://www.rbg.vic.gov.au/about-us/reconciliation-action-plan/">Reconciliation Action Plan</a>.
        </div>
      </div>
    </BContainer>
    </div>
  </footer>
</template>

<script>
export default {
   name: "TheFooter",
   props: {
     fluid: {
       type: Boolean,
       default: false,
     },
   },
}
</script>

<style lang="scss">
@import "~/assets/scss/custom_variables.scss";

.m-footer {
  padding: 15px;
  background-color: $light;
  span {
    color: white;
    font-size: small;
  }

  .container, .container-fluid {
    min-height: auto;
  }

  .m-sponsor-image {
    margin: 8px 10px;
  }

  .vicflora-footer {
    margin-left: -15px;
    margin-right: -15px;
    padding-bottom: .5rem;
    border-bottom: solid 1px $primary;
  }

  .rbgv-footer {
    // border-top: solid 1px $primary;
    padding-top: .5rem;
  }

  .rbgv-website img {
    max-height: 6rem;
  }
}

.acknowledgement-of-country>div {
  margin: 1rem 0;
}

@media only screen and (min-width: 768px) {
  .acknowledgement-of-country {
    display: flex;
    align-items:center;

    div:nth-child(2) {
      margin: 1rem 0 1rem 1rem;
    }
  }
}

</style>
