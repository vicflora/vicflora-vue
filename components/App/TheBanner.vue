<template>
  <div class="m-banner">
    <BContainer>
      <TheLoginBar/>
      <a href="/">
        <div class="m-logo-title d-flex">
            <div class="m-logo-container">
                <img 
                  class="m-logo img-fluid" 
                  src="@/assets/images/rbgv-logo-pink-badge.png" 
                  alt="Royal Botanic Garedns Victoria logo" 
                />
            </div>
            <div class="m-title-container">
                <span class="m-title">AusFunga</span>
                <span class="m-subtitle">Fungi of Australia</span>  
            </div>                
        </div>
      </a>
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