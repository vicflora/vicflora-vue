<style lang="scss" scoped>
@import "./Home.scss";
</style>
<template>
  <div>
      <banner></banner>
      <div class="font" style="font-size:50px">Content
      </div>
  </div>
</template>

<script>
import Banner from "../../components/Banner/Banner"
export default {
  name: 'Home',
  components: {
    Banner,

  }
}
</script>
