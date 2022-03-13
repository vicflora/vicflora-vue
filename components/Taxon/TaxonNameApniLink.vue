<template>
  <span class="tn-apni-link">
    <a
      :href="`${apni.id}/api/apni-format`"
      target="_blank"
    >
      <small>APNI <BIconBoxArrowUpRight/></small>
    </a>
  </span>
</template>

<script>
export default {
  name: 'TaxonNameApniLink',
  props: {
    apni: {
      type: Object,
      required: true,
    }
  }
}
</script>