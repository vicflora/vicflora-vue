<template>
  <div class="m-protologue">
    <i>{{ protologue.title }}</i>
    <b>{{ protologue.volume + ": " }}</b>
    <span>{{ protologue.pages }}</span>
  </div>
</template>

<script>
export default {
  name: "TaxonNameProtologue",
  props: {
    protologue: {
      type: Object,
      required: true
    }
  }
}
</script>