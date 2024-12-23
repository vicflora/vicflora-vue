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
      Tuesday, 24 December, from c. 7:30 am AEDT. We hope to have all services
      back up by 9 am. We apologise for the inconvenience.
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
