<template>
  <figure>
    <img :src="src">
    <figurecaption v-html="caption"></figurecaption>
  </figure>
</template>

<script>
export default {
  name: "MarkdownFigureCaption",
  props: {
    src: {
      type: String,
      required: true
    },
    caption: {
      type: String,
      required: false
    }
  }
}
</script>
