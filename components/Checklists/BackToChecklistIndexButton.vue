<template>
  <BButton 
    :to="{ name: 'checklist', query: query }"
    variant="outline-primary" 
    size="sm"
  >
    Find checklist
  </BButton>
</template>

<script>
export default {
  name: "BackToChecklistIndexButton",
  props: {
    query: {
      type: Object,
      required: true,
    },
  }
}
</script>