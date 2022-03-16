<template>
  <div >
    <span class="vf-identification-key-button"
      v-for="item in keys"
      :key="item.id"
    >
      <b-button 
        v-if="item.relativePath !== undefined"
        :to="item.relativePath" 
        variant="outline-primary"
      >{{ item.title }}</b-button>
      <b-button 
        v-else
        :to="`/flora/key/${item.id}`" 
          variant="outline-primary" 
      >{{ item.title }}</b-button>
    </span>
  </div>
</template>

<script>
export default {
  name: 'TaxonTabOverviewKeyButtons',
  props: {
    keys: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style lang="scss">
.vf-identification-key-button {
  display: inline-block;
  margin: 0.5rem 0.5rem 0.5rem 0;
}
</style>