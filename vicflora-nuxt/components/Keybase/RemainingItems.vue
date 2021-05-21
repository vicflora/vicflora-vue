<style lang="scss" scoped>
.m-children-li {
  margin-left: 20px;
  list-style: circle;
}
</style>
<template>
  <div class="keybase-player-remainingitems">
    <h3>{{ header }}</h3>
    <div v-if="remainingItems">
      <ul>
        <li v-for="item in remainingItems" :key="item.id" :class="item.parent_id?'m-children-li':''">
          <item :item="item" ></item>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Item from './Item'

export default {
  components: {
    Item
  },
  props: ['remainingItems'],
  computed: {
    header() {
      return `Remaining items (${ this.remainingItems.length })`
    }
  }
}
</script>
