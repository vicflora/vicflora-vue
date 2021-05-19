<template>
  <span>
    <router-link v-if="item.url" :to="{ name: 'taxa', params: { taxon: taxon } }">
      {{ item.item_name }}
    </router-link>
    <span v-else>{{ item.item_name }}</span>
    <router-link v-if="item.to_key && !item.url" :to="{ name: 'keys', params: { key: item.to_key } }">
      <span class="keybase-player-tokey"><i class="fa fa-arrow-right"></i></span>
    </router-link>
    <span v-if="typeof item.link_to_item_name !== 'undefined'" class="keybase-item-shortcut">
      :
      <router-link v-if="linkToTaxon" :to="{ name: 'taxa', params: { taxon: linkToTaxon } }">
        {{ item.link_to_item_name }}
      </router-link>
      <span v-else>{{ item.link_to_item_name }}</span>
      <router-link v-if="typeof item.link_to_key !== 'undefined' && !linkToTaxon" :to="{ name: 'keys', params: { key: item.link_to_key } }">
        <span class="keybase-player-tokey"><i class="fa fa-arrow-right"></i></span>
      </router-link>
    </span>
  </span>
</template>

<script>
export default {
  props: ['item'],
  computed: {
    taxon() {
      return (this.item.url) ? this.item.url.substr(this.item.url.lastIndexOf('/') + 1) : false
    },
    linkToTaxon() {
      return (typeof this.item.link_to_url !== 'undefined')
          ? this.item.link_to_url.substr(this.item.link_to_url.lastIndexOf('/') + 1) : false
    }
  }
}
</script>
