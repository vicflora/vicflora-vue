<template>
  <li v-if="lead.title">
    <div class="keybase-lead">
      <span class="keybase-from-node">{{ lead.fromNode }}</span>
      <span class="keybase-lead-text">{{ lead.lead_text }}</span>
    </div>
    <indented-key-couplet v-for="couplet in lead.children" :key="couplet.parent_id"></indented-key-couplet>
  </li>
</template>

<script>
import IndentedKeyCouplet from './IndentedKeyCouplet'

export default {
  name: 'indented-key-lead',
  components: {
    IndentedKeyCouplet
  },
  props: ['lead']
}
</script>
