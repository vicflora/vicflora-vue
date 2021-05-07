<template>
  <b-button variant="outline-primary" :size="size"><a :href="href">{{button_text}}</a></b-button>
</template>

<script>
export default {
  name: "MarkdownButtonComponent",
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
  },
}
</script>