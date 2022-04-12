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
const TheHeader = () => import("@/components/App/TheHeader")
const TheFooter = () => import("@/components/App/TheFooter")

export default {
  name: "default",
  components: {
    TheHeader,
    TheFooter
  }
}
</script>