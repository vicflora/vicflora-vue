<template>
  <b-row>
    <b-col>
      <span class="m-status-class">{{ label }}:</span>
      <span class="m-status-content" v-html="value"/>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: "TaxonStatusItem",
  props: {
    label: {
      type: String,
      required: true
    },
    value: {
      type: [ String, Number ],
      required: true
    }
  }
}
</script>

<style lang="scss">
.m-status-class {
  width: 180px;
  display: inline-flex;
  margin-bottom: 5px;
  font-weight: bold;
}

.m-status-content {
  display: inline-block;
  vertical-align: top;
}
</style>
