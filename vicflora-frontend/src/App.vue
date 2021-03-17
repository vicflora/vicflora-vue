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
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
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
