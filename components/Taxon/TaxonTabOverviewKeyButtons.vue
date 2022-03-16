<template>
  <b-row class="vf-identification-key-buttons">
    <b-col
      v-for="item in keys"
      :key="item.id"
    >
      <nuxt-link 
        v-if="item.relativePath !== undefined"
        :to="item.relativePath" >
        <b-button 
          variant="primary" 
        >{{ item.title }}</b-button>
      </nuxt-link>
      <nuxt-link
        v-else
        :to="`/flora/key/${item.id}`" 
      >
        <b-button 
          variant="primary" 
        >{{ item.title }}</b-button>
      </nuxt-link>
    </b-col>
  </b-row>
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
.vf-identification-key-buttons {
    margin-top: 15px;

    .col {
      margin: 0.5rem 0;
    }
}
</style>
