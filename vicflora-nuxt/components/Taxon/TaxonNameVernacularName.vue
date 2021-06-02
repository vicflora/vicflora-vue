<template>
  <span class="m-vernacular-names" >{{ vernacularName }}</span>
</template>

<script>
export default {
  name: "TaxonNameVernacularName",
  props: {
    vernacularName: {
      type: String,
      required: true
    }
  }
}
</script>