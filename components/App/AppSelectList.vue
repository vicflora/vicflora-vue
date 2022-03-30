<template>
  <div class="form-group">
    <label for="name">{{ label }}</label>
      <select
        class="form-control"
        :id="name"
        :name="name"
        :multiple="multi"
        :value="value"
        @input="onInput">
        <option v-for="option in options" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>
  </div>
</template>

<script>
import { formControlPropsMixin } from "@/mixins/formMixins"

export default {
  name: 'AppSelectList',
  mixins: [
    formControlPropsMixin,
  ],
  props: {
    multi: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Array,
      required: true,
    },
  },
  methods: {
    onInput(event) {
      this.$emit('input', event.target.value)
    }
  }
}
</script>
