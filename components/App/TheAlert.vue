<template>
  <div class="vf-alert">
    <b-alert 
      :show="showDismissibleAlert" 
      variant="danger" 
      dismissible
      @dismissed="onDismissed"
    >
      Due to planned maintenance and an expected power outage at Melbourne 
      Gardens, Vicflora will be offline from <b>Wednesday, August 21<sup>st</sup>, 
      5 pm</b> till <b>Thursday, August 22<sup>nd</sup>, 8 am</b>. We apologise for the 
      inconvenience.
    </b-alert>
  </div>
</template>

<script>
export default {
  name: 'TheAlert',
  data() {
    return {
      showDismissibleAlert: true
    }
  },
}
</script>