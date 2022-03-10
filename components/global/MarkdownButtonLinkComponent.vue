<template>
  <b-button 
    variant="primary" 
    :size="size" 
    :href="href"
    :class="classes"
  >{{button_text}}</b-button>
</template>

<script>
export default {
  name: "MarkdownButtonLinkComponent",
  props: {
    href:{
      type:String,
      required: true,
    },
    button_text:{
      type:String,
      required: true,
    },
    size:{
      type:String,
      required: true,
    },
    target:{
      type:String,
      required: true,
    },
    classes: {
      type: String,
      default: 'matrix-key-button-link'
    }
  },
}
</script>