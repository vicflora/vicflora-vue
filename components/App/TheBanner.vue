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
import TheLoginBar from "@/components/App/TheLoginBar"

export default {
  name: 'TheBanner',
  components: {
    TheLoginBar,
  },
}
</script>