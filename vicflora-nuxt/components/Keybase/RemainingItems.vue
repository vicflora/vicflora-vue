<template>
  <div class="keybase-player-remainingitems">
    <h3>{{ header }}</h3>
    <div>
      <ul v-if="remainingItems">
        <li v-for="item in remainingItems" :key="item.id">
          <item :item="item"></item>
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
