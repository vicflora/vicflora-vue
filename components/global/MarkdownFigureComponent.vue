<template>
  <figure>
    <img :src="src">
    <figcaption v-html="caption"></figcaption>
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
