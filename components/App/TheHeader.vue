<template>
  <header>
    <TheNavigationBar/>
    <TheBanner/>
  </header>
</template>

<script>
import TheNavigationBar from "@/components/App/TheNavigationBar"
import TheBanner from "@/components/App/TheBanner"

export default {
  name: "TheHeader",
  components: {
    TheNavigationBar,
    TheBanner
  }
  
}
</script>