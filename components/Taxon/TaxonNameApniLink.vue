<template>
  <span class="tn-apni-link">
    <a
      :href="`${apni.id}/api/apni-format`"
      target="_blank"
    >
      <small>{{ title }} <BIconBoxArrowUpRight/></small>
    </a>
  </span>
</template>

<script>
import { BIcon, BIconBoxArrowUpRight } from "bootstrap-vue"

export default {
  name: 'TaxonNameApniLink',
  components: {
    BIcon,
    BIconBoxArrowUpRight,
  },
  props: {
    apni: {
      type: Object,
      required: true,
    }
  },
  computed: {
    title() {
      return this.apni.id.indexOf('ausmoss') > 0 ? 'AusMoss' : 'APNI'
    }
  },
}
</script>