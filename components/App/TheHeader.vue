<template>
  <header>
    <b-alert
      :show="true"
      variant="warning"
      dismissible
    >
      <strong>OUTAGE NOTICE:</strong> On <strong>Wednesday, May 17<sup>th</sup></strong>, at <strong>5 pm
      AEST</strong> (UTC+10), the Royal Botanic Gardens Victoria network will
      be down for an upgrade of the firewall and core switch. If everything
      goes well, Vicflora should be back up in about 20 minutes, but images
      may take up to two hours to re-appear. We apologise for the inconvenience.
    </b-alert>

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
