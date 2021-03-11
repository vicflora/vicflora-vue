<style lang="scss" scoped>
@import "./Home.scss";
</style>

<template>
  <div>
      <banner></banner>
      <div class="font">Contenttttt
        <b-dropdown id="dropdown-left" text="Left align" variant="melbourne" class="m-2">
          <b-dropdown-item href="#">Contenttt</b-dropdown-item>
          <b-dropdown-item href="#">Another action</b-dropdown-item>
          <b-dropdown-item href="#">Something else here</b-dropdown-item>
        </b-dropdown>
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
