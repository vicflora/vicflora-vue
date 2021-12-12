<template>
  <div>
    <b-form-select 
      v-model="taxonId" 
      size="sm" 
      class="m-breadcrumb-selector-item"
    >
      <template #first>
        <b-form-select-option :value="null" disabled
          >Select sibling...</b-form-select-option
        >
      </template>

      <b-form-select-option
        v-for="sibling in siblings"
        :key="sibling.id"
        :value="sibling.id"
      >{{ sibling.taxonName.fullName }}</b-form-select-option>

    </b-form-select>
  </div>
</template>

<script>
export default {
  name: "TaxonBreadcrumbsSiblings",
  props: {
    siblings: {
      type: Array,
      required: true
    }
  },
  computed: {
    taxonId: {
      get: function() {
        return this.$route.params.id
      },
      set: function(newVal) {
        this.$router.push({
          path: "/flora/taxon/" + newVal,
        })
      },
    }
  }
}
</script>