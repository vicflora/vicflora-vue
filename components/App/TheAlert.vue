<template>
  <div class="vf-alert">
    <b-alert 
      :show="showDismissibleAlert" 
      variant="danger" 
      dismissible
      @dismissed="onDismissed"
    >
      On <b>Thursday</b>, <b>July 14<sup>th</sup></b>, we will be rebuilding 
      VicFlora to hopefully put an end to the performance issues VicFlora has 
      been experiencing in the last few weeks. We hope to be able to do this 
      without disruption to service, but unforeseen circumstances might lead to 
      short outages during the day.
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