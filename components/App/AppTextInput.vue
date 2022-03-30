<template>
  <div class="form-group">
    <label :for="name">{{label}}</label>
    <input
      type="text"
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
  name: 'AppTextInput',
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
