<template>
  <header>
    <TheNavigationBar/>
    <TheBanner/>
    <TheProgressBar/>
    <TheAlert/>
  </header>
</template>

<script>
const TheNavigationBar = () => import("@/components/App/TheNavigationBar")
const TheBanner = () => import("@/components/App/TheBanner")
const TheProgressBar = () => import("@/components/App/TheProgressBar")
const TheAlert = () => import("@/components/App/TheAlert")

export default {
  name: "TheHeader",
  components: {
    TheNavigationBar,
    TheBanner,
    TheProgressBar,
    TheAlert
  }

}
</script>
