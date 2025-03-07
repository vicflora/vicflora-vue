<template>
  <div class="vf-alert">
    <b-alert
      :show="showDismissibleAlert"
      variant="warning"
      dismissible
    >
      In an effort to deal with the high number of requests to VicFlora we have
      moved the maps into a new subdomain. If the maps do not work, it might be
      that your browser is still trying to connect to the old map server.
      Clearing the browser's cache should clear that up. We hope that this
      change, together with other changes we made in the last few weeks, will
      bring about a positive change in user experience for VicFlora. Thanks to
      all our users for hanging in there.
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
