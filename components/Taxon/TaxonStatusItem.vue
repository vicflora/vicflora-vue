<template>
  <div class="tc-status-item">
    <span :class="labelClass">{{ label }}</span><span v-if="inline">:</span>
    <span
      v-if="typeof value === 'object'"
      class="m-status-content"
    >
      <span :id="`popover-target-${label.toLowerCase().replaceAll(' ', '-')}-${value.label.toLowerCase().replaceAll(' ', '-')}`">
        {{ value.label }}
      </span>
      <b-popover
        :target="`popover-target-${label.toLowerCase().replaceAll(' ', '-')}-${value.label.toLowerCase().replaceAll(' ', '-')}`"
        triggers="hover"
        placement="right"
        :delay="{ show: 100, hide: 300 }"
      >
        <template #title>{{ value.label }}</template>
        {{ value.description }}
      </b-popover>
    </span>
    <span v-else class="m-status-content" v-html="value"/>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TaxonStatusItem",
  props: {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: [ String, Number, Object ],
      required: true,
    },
    inline: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    labelClass() {
      return this.inline ? 'tc-status-label' : 'tc-status-label tc-status-label-flex'
    },
  },
}
</script>

<style lang="scss">
.m-status-content {
  cursor: default;
}
</style>
