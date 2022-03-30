<template>
  <div class="form-group">
    <label :for="name">{{label}}</label>
    <input
      type="number"
      class="form-control"
      :id="name"
      :name="name"
      :value="value"
      @input="onInput"
      :placeholder="placeholder"
    />
  </div>
</template>

<script>
import { formControlPropsMixin } from "@/mixins/formMixins"

export default {
  name: 'AppNumberInput',
  mixins: [
    formControlPropsMixin,
  ],
  methods: {
    onInput(event) {
      this.$emit('input', event.target.value)
    }
  }
}
</script>
