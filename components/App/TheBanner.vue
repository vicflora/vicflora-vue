<template>
  <div class="m-banner">
    <BContainer>
      <div class="m-logo-title">
        <div class="m-logo-container">
          <a href="/">
            <img class="m-logo img-fluid" src="@/assets/images/rbgv-logo-pink-badge.png" alt="Logo" />
          </a>
        </div>
        <div>
          <a href="/">
            <div class="m-title">
              VICFLORA
              <span class="m-subtitle">Flora of Victoria</span>  
            </div>
          </a>  
        </div>                
      </div>
    </BContainer>
  </div>
</template>


<script>
export default {
  name: 'TheBanner',
}
</script>

<style lang="scss" scoped>
@import "~/assets/scss/custom_variables.scss";

.m-banner {
  background-color: $white; 
  padding: 10px 0;
  border-bottom: solid 1px $primary;

  span {
    color: $primary;
  }
  .m-logo-title {
    width: 100%;
    display: flex;
    align-items: flex-end;
    justify-items: left;
    justify-content: left;
    
    a {
      display: inline-block;
    }

    // .m-logo-container{
    //   max-width: 6vw;
    //   min-width: 70px;
    // }

    .m-logo{
      max-width: 6vw;
      min-width: 70px;
    }

    .m-title {
      color: $primary;
      display: inline-block;
      vertical-align: baseline;
      font-family: goodsans-regular;
      font-size: 3vw;
      letter-spacing: 1px;
      margin-left: 1vw;
      padding-bottom: 3px;
    }

    .m-subtitle {
      font-family: goodsans-thin;
      font-size: 20px;
      letter-spacing: -1px;
      color: $black;
      padding-bottom: 3px;
    }
  }
}

// @media screen and (max-width: 1200px) {
//   .m-subtitle {
//     display: none;
//   }
//   .m-title {
//     font-size: 3vw !important;
//   }
// }
</style>


