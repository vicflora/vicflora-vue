<template>
  <div class="keybase-player-discardeditems">
    <h3>{{ header }}</h3>
    <div>
      <ul v-if="discardedItems">
        <li v-for="item in discardedItems" :key="item.id">
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
  props: ['discardedItems'],
  computed: {
    header() {
      return `Discarded items (${ this.discardedItems.length })`
    }
  }
}
</script>
