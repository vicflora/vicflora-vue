<template>
  <div class="tree-menu">
    <div :style="indent">{{ label }}</div>
    <tree-menu
      v-for="node in nodes"
      :nodes="node.nodes"
      :label="node.label"
      :depth="depth + 1"
      :key="node.label"
    >
    </tree-menu>
  </div>
</template>

<script>
  export default {
    props: [ 'label', 'nodes', 'depth' ],
    name: 'tree-menu',
    computed: {
      indent() {
        return { transform: `translate(${this.depth * 50}px)` }
      }
    }
  }
</script>
