<template>
  <div id="app">
    <div id="content">
      <div id="header">
        <Header></Header>
      </div>
      <div id="banner">
        <Banner></Banner>
      </div>
      <router-view />
    </div> 
    <div id="footer">
      <Footer></Footer>
    </div>
  </div>
</template>

<style lang="scss">
html, body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    display: flex;
    min-height: 100vh;
    flex-direction: column;
    }

#app {
  font-family: goodsans-thin, Helvetica, Arial, sans-serif;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  width: 100%;
  min-height: 100%;
  flex-direction: column;
}
#content {
  flex: 1;
}
#footer {
  height: auto;
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
