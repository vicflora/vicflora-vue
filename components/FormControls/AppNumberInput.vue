<template>
  <div>
    <div
      v-if="show"
      class="form-group"
    >
      <label :for="name">{{label}}</label>
      <input
        type="number"
        class="form-control"
        :id="name"
        :name="name"
        :value="value"
        :placeholder="placeholder"
        :disabled="disabled"
        @input="onInput"
      />
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
