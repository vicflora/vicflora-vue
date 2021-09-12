<template>
  <NuxtLink :to="to">
    <span :class="classes">{{ fullName }}</span>
    <span 
      v-if="authorship" 
      class="m-author"
    >
      {{ authorship }}
    </span>
  </NuxtLink>
</template>

<script>
export default {
  name: "TaxonClassificationNuxtLink",
  props: {
    classes: {
      type: [ String, Object ],
      default: "m-taxon-name"
    },
    to: {
      type: String,
      required: true
    },
    fullName: {
      type: String,
      required: true
    },
    authorship: {
      type: String,
      required: false
    }
  }
}
</script>