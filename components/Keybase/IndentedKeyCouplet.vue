<template>
  <ul class="keybase-couplet">
    <indented-key-lead
      v-for="lead in couplet.children"
      :lead="lead"
      :key="lead.lead_id"
    >
    </indented-key-lead>
  </ul>
</template>

<script>
import IndentedKeyLead from './IndentedKeyLead'

export default {
  name: 'indented-key-couplet',
  components: {
    IndentedKeyLead
  },
  props: ['couplet']
}
</script>
