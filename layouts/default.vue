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