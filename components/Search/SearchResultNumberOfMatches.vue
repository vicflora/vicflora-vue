<template>
  <span>{{ total }} matches</span>
</template>

<script>
export default {
  name: "SearchResultNumberOfMatches",
  props: {
    total: {
      type: Number,
      required: true
    }
  }
}
</script>