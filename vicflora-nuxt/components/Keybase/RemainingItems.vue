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
      <div v-for="item in remainingItems" :key="item.id">
        <li v-if="!item.parent_id">
          <item :item="item"></item>
          <div v-if="getChild(item.item_id).length>0">
            <li v-for="child in getChild(item.item_id)" :key="child.item_id" class="m-children-li">
              <item :item="child"></item>
            </li>
          </div>
        </li>
        <!--  -->
      </div>
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
  data(){
    return{
    }
  },
  computed: {
    header() {
      return `Remaining items (${ this.remainingItems.length })`
    },
  },
  methods:{
    getChild(id){
      return this.remainingItems.filter(ele=>ele.parent_id===id)
    },
  },

}
</script>
