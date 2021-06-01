<template>
  <div class="search-applied-query-term">
    <span class="m-facet-title">Query term:</span>
    <span>
      {{ term }}
      <BIcon
        v-if="term !== '*'"
        icon="x"
        font-scale="1.1"
        variant="danger"
        @click="removeq"
      />
    </span>
  </div>
</template>

<script>

import { searchMixin } from "@/mixins/searchMixins"

export default {
  name: "SearchAppliedQueryTerm",
  mixins: [searchMixin],
  props: {
    term: {
      type: String,
      required: true
    }
  },
  methods: {
    removeq: function() {
      this.$router.push({
        query: {
          q: `*`
        }
      })
      this.input = {
        ...this.input,
        q: `*`
      }
    }
  }
}
</script>