<template>
  <header>
    <TheNavigationBar/>
    <TheBanner/>
    <TheProgressBar/>
  </header>
</template>

<script>
const TheNavigationBar = () => import("@/components/App/TheNavigationBar")
const TheBanner = () => import("@/components/App/TheBanner")
const TheProgressBar = () => import("@/components/App/TheProgressBar")

export default {
  name: "TheHeader",
  components: {
    TheNavigationBar,
    TheBanner,
    TheProgressBar
  }

}
</script>
