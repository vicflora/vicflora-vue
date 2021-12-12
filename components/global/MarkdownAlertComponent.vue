<template>
  <div :class="classes" v-html="content"></div>
</template>

<script>
export default {
  name: "MarkdownAlertComponent",
  props: {
    content: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  computed: {
    classes: function() {
      return `alert alert-${this.type}`
    }
  }
}
</script>