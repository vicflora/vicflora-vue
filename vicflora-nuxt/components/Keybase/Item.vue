<template>
  <span>
    <nuxt-link v-if="item.url" :to="`/flora/taxon/${taxon}`">
      {{ item.item_name }}
    </nuxt-link>

    <span v-else>{{ item.item_name }}</span>
    
    <nuxt-link
      v-if="item.to_key && !item.url"
      :to="`/flora/key/${item.to_key}`"
    >
      <span class="keybase-player-tokey"
        ><b-icon icon="arrow-right-square"></b-icon
      ></span>
    </nuxt-link>

    <span
      v-if="typeof item.link_to_item_name !== 'undefined'"
      class="keybase-item-shortcut"
    >
      :
      <nuxt-link
        v-if="linkToTaxon"
        :to="{ name: 'taxa', params: { taxon: linkToTaxon } }"
      >
        {{ item.link_to_item_name }}
      </nuxt-link>
      <span v-else>{{ item.link_to_item_name }}</span>
      <a
        v-if="typeof item.link_to_key !== 'undefined' && !linkToTaxon"
        :href="`#l_${item.link_to_item_name}`"
      >
        <span class="keybase-player-tokey"
          ><b-icon icon="arrow-right-square"></b-icon
        ></span>
      </a>
    </span>
  </span>
</template>

<script>
export default {
  props: ["item"],
  computed: {
    taxon() {
      return this.item.url
        ? this.item.url.substr(this.item.url.lastIndexOf("/") + 1)
        : false;
    },
    linkToTaxon() {
      return typeof this.item.link_to_url !== "undefined"
        ? this.item.link_to_url.substr(
            this.item.link_to_url.lastIndexOf("/") + 1
          )
        : false;
    }
  }
};
</script>
