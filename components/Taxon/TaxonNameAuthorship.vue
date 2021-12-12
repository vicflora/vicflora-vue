<template>
  <span class="m-authorship">{{ authorship }}</span>
</template>

<script>
export default {
  name: "TaxonNameAuthorship",
  props: {
    authorship: {
      type: String,
      required: true
    }
  }
}
</script>