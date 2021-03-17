<template>
  <div id="app">
    <div id="header">
      <Header></Header>
    </div>
    <div id="banner">
      <Banner></Banner>
    </div>
    <router-view/>
    <div id="footer">
      <Footer></Footer>
    </div>
  </div>
</template>

<style lang="scss">
#app {
  font-family: goodsans-thin, Helvetica, Arial, sans-serif;
<<<<<<< HEAD
  font-size: 14px;
}
</style>

<script>
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import Banner from "./components/Banner/Banner"
export default {
  name: 'App',
  components: {
    Header,
    Footer,
    Banner,
  }
}
</script>
