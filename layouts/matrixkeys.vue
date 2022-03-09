<template>
  <div id="app">
    <header>
      <LucidKeyNavigationBar />
    </header>
    <div id="content">
      <Nuxt />
    </div>
    <div id="footer">
      <TheFooter :fluid="true" />
    </div>
  </div>
</template>

<script>
import TheFooter from "@/components/App/TheFooter"
import LucidKeyNavigationBar from "@/components/LucidKey/LucidKeyNavigationBar"

export default {
  name: "default",
  components: {
    LucidKeyNavigationBar,
    TheFooter
  }
}
</script>