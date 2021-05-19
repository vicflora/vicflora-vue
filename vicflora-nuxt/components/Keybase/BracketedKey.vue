<template>
  <div id="keybase-bracketed" class="keybase-panel">
    <div class="keybase-bracketed-key">
      <div v-for="couplet in bracketedKey.children" class="keybase-couplet" :key="`l_${ couplet.children[0].parent_id}`" :id="`l_${ couplet.children[0].parent_id}`">
        <div v-for="lead in couplet.children" :key="lead.lead_id" class="keybase-lead">
          <span class="keybase-from-node">{{ lead.fromNode  }}</span>
          <span class="keybase-lead-text">{{ lead.title }}
            <span v-if="lead.toNode !== undefined" class="keybase-to-node">
              <a :href="`#l_${ lead.lead_id }`" @click="event =>event.preventDefault()">{{ lead.toNode }}</a>
            </span>
            <span v-else class="keybase-to-item">
              <item :item="getItem(lead.children[0].children[0].item_id)"></item>
            </span>
          </span>
        </div>
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
  props: ['bracketedKey', 'items'],
  methods: {
    getItem(id) {
      if (this.items.length) {
        return this.items.filter(item => {
          return item.item_id === id
        })[0]
      }
    }
  },
}
</script>
