<template>
  <div id="indented-key-test">
    <tree-menu
      :label="tree.label"
      :nodes="tree.nodes"
      :depth="0"
    ></tree-menu>
  </div>
</template>

<script>
import TreeMenu from './TreeMenu'

export default {
  components: {
    TreeMenu
  },
  data() {
    return {
      tree: {
        label: 'root',
        nodes: [
          {
            label: 'item1',
            nodes: [
              {
                label: 'item1.1'
              },
              {
                label: 'item1.2',
                nodes: [
                  {
                    label: 'item1.2.1'
                  }
                ]
              }
            ]
          },
          {
            label: 'item2'
          }
        ]
      }
    }
  }
}
</script>
