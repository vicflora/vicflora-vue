<template>
  <div class="tc-status-item">
    <span :class="labelClass">{{ label }}:</span>
    <span v-if="typeof value === 'object'" class="m-status-content">
      <span v-b-popover.hover.bottom="value.description">
        {{ value.label }}
      </span>
    </span>
    <span v-else class="m-status-content" v-html="value"/>
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
  .tc-status-label {
    margin-bottom: 5px;
    font-weight: bold;

    &.tc-status-label-flex {
      width: 180px;
      display: inline-flex;
    }
  }

  .tc-status-content {
    display: inline-block;
    vertical-align: top;
  }

.popover.b-popover {
  font-family: "goodsans-thin";
  font-size: 80%;
}

</style>
