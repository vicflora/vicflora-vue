<template>
  <div id="app">
    <div id="header">
      <Header></Header>
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
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

<script>
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
export default {
  name: 'App',
  components: {
    Header,
    Footer,
  }
}
</script>
