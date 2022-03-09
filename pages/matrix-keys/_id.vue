<template>
  <b-container fluid id="#lucid-player-iframe">
    <iframe style="width:100%;height:90vh;" :src="`/lucid-keys/${slug}`" />
  </b-container>
  
</template>

<script>
export default {
  layout: 'matrixkeys',
  computed:{
    slug(){
      return this.$route.params.id
    }
  }
}
</script>

