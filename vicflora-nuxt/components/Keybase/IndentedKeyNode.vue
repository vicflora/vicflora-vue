<template>
  <li>
    <div v-if="['Couplet', 'Item'].indexOf(lead.title) === -1" class="keybase-lead">
      <span class="keybase-from-node">{{ lead.fromNode }}</span>
      <span class="keybase-lead-text">{{ lead.lead_text}}</span>
      <item
        v-if="lead.children[0].title === 'Item'"
        :item="lead.children[0].children[0]"
        class="keybase-to-item"
      ></item>
    </div>
    <div v-else>[{{ lead.title }}]</div>
    <ul v-if="lead.children && lead.children.length && lead.children[0].title === 'Couplet'">
      <indented-key-node
        v-for="node in lead.children[0].children"
        :node="node"
        :key="node.title"></indented-key-node>
    </ul>
  </li>
</template>

<script>
import Item from './Item'

export default {
  name: 'indented-key-node',
  components: {
    Item
  },
  props: ['node'],
  computed: {
    lead() {
      return this.node
    }
  }
}
</script>
