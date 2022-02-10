<template>
  <div class="identification-keys">
    <div
      v-for="item in identificationKeys"
      :key="item.id"
    >
      <nuxt-link :to="`/flora/key/${item.id}`" >
        <b-button variant="primary" class="mb-2">{{ item.title }}</b-button>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaxonTabOverviewKeyButtons',
  props: {
    identificationKeys: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style lang="scss">
.identification-keys {
    margin-top: 15px;
}
</style>
