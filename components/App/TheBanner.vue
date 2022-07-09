<template>
  <div class="m-banner">
    <BContainer>
      <TheLoginBar/>
      <div class="m-logo-title">
        <div class="m-logo-container">
          <a href="/">
            <img class="m-logo img-fluid" src="@/assets/images/rbgv-logo-pink-badge.png" alt="Logo" />
          </a>
        </div>
        <div class="m-title-container">
          <div class="m-title">
            <a href="/">
              VICFLORA
              <span class="m-subtitle">Flora of Victoria</span>  
            </a>  
          </div>
        </div>                
      </div>
    </BContainer>
  </div>
</template>


<script>
const TheLoginBar = () => import("@/components/App/TheLoginBar")

export default {
  name: 'TheBanner',
  components: {
    TheLoginBar,
  },
}
</script>

<style lang="scss" scoped>
.m-logo-container, .m-title-container {
  white-space: nowrap;
}
</style>