<template>
  <div>
    <div
      v-if="show"
      class="form-group"
    >
      <label for="name">{{ label }}</label>
      <select
        class="form-control"
        :id="name"
        :name="name"
        :multiple="multi"
        :value="value || defaultValue"
        :disabled="disabled"
        @input="onInput"
      >
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
      <small
        v-if="description"
        class="vf-form-control-description"
      >{{ description }}</small>
    </div>
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
    defaultValue: {
      type: String,
      required: false,
    },
  },
  methods: {
    onInput(event) {
      this.$emit('input', event.target.value)
    }
  }
}
</script>
