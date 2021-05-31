<template>
  <header>
    <TheNavigationBar/>
    <TheBanner/>
  </header>
</template>

<script>
import TheNavigationBar from "@/components/TheNavigationBar/TheNavigationBar"
import TheBanner from "@/components/TheBanner/TheBanner"

export default {
  name: "TheHeader",
  components: {
    TheNavigationBar,
    TheBanner
  }
  
}
</script>