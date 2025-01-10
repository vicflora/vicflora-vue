<template>
  <div class="vf-alert">
    <b-alert
      :show="showDismissibleAlert"
      variant="danger"
      dismissible
      @dismissed="onDismissed"
    >
      Due to electrical works in the National Herbarium of Victoria there will
      be a power outage that affects almost all services in VicFlora on
      Friday, 10 January, from c. 6:30 am AEDT. We hope to have all services
      back up by 9:30 am. We apologise for the inconvenience.
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
