<template>
  <div id="keybase-indented">
    <div class="keybase-indented-key">
      <ul>
        <indented-key-node v-if="indentedKey" v-for="node in indentedKey.children" :node="node" :key="node.title"></indented-key-node>
      </ul>
    </div>
  </div>
</template>

<script>
import IndentedKeyNode from './IndentedKeyNode'

export default {
  components: {
    IndentedKeyNode
  },
  props: ['indentedKey']
}
</script>
