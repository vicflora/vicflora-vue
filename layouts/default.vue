<template>
  <div id="app">
    <div id="content">
      <TheHeader />
      <Nuxt />
    </div>
    <div id="footer">
      <TheFooter/>
    </div>
  </div>
</template>

<script>
import TheHeader from "@/components/App/TheHeader"
import TheFooter from "@/components/App/TheFooter"

export default {
  name: "default",
  components: {
    TheHeader,
    TheFooter
  }
}
</script>

<style>
@font-face {
  font-family: "goodsans-thin";
  src: local("goodsans-thin"),
    url(~assets/fonts/GoodSans-Thin.otf) format("truetype");
}
@font-face {
  font-family: "goodsans-regular";
  src: local("goodsans-regular"),
    url(~assets/fonts/GoodSans-Regular.otf) format("truetype");
}
@font-face {
  font-family: "goodsans-medium";
  src: local("goodsans-medium"),
    url(~assets/fonts/GoodSans-Medium.otf) format("truetype");
}
@font-face {
  font-family: "goodsans-light";
  src: local("goodsans-light"),
    url(~assets/fonts/GoodSans-Light.otf) format("truetype");
}
@font-face {
  font-family: "goodsans-bold";
  src: local("goodsans-bold"),
    url(~assets/fonts/GoodSans-Bold.otf) format("truetype");
}
@font-face {
  font-family: "goodsans-black";
  src: local("goodsans-black"),
    url(~assets/fonts/GoodSans-Black.otf) format("truetype");
}

html {
  font-family: "Source Sans Pro", "Segoe UI", "Helvetica Neue", Arial,
    sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

html, body {
  width: 100vw;
  height: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

body {
  overflow-x: hidden;
}

#app {
  font-family: goodsans-thin, Helvetica, Arial, sans-serif;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  width: 100vw;
  min-height: 100vh;
  flex-direction: column;
}

#content {
  width: 100%;
  flex: 1;
}
#footer {
  height: auto;
}
</style>

