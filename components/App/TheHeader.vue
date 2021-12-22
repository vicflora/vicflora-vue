<template>
  <header>
    <TheNavigationBar/>
    <TheBanner/>
    <TheProgressBar/>
  </header>
</template>

<script>
import TheNavigationBar from "@/components/App/TheNavigationBar"
import TheBanner from "@/components/App/TheBanner"
import TheProgressBar from "@/components/App/TheProgressBar"

export default {
  name: "TheHeader",
  components: {
    TheNavigationBar,
    TheBanner,
    TheProgressBar
  }

}
</script>
